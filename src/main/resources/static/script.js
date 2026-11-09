 // Show a message at the top of the page
 let allJobs = [];
function showMessage(text, isError) {
    const messageBox = document.getElementById("message");
    messageBox.textContent = text;
    if (isError) {
        messageBox.style.color = "red";
    } else {
        messageBox.style.color = "green";
    }
}
   

// 1. Get all jobs from the backend and show them in the table
async function loadJobs() {
    const response = await fetch("/jobs");
    allJobs = await response.json();
    showJobs(allJobs)
}
 function showJobs(jobs) {
    const tableBody = document.getElementById("jobTable");
    tableBody.innerHTML = "";

    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        const row = document.createElement("tr");

        row.appendChild(makeCell(job.jobid));
        row.appendChild(makeCell(job.company));
        row.appendChild(makeCell(job.jobRole));
        row.appendChild(makeCell(job.status));

        const actions = document.createElement("td");
        actions.appendChild(makeButton("Edit", "update", job.jobid, editJob));
        actions.appendChild(makeButton("Delete", "delete", job.jobid, deleteJob));
        row.appendChild(actions);

        tableBody.appendChild(row);
    }
}

// Make a table cell that holds plain text
function makeCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
}

// Make a button that calls a function with the job id
function makeButton(label, className, id, action) {
    const button = document.createElement("button");
    button.textContent = label;
    button.className = className;
    button.addEventListener("click", function () {
        action(id);
    });
    return button;
}

// 2. Click Edit: get one job and put its values into the form
async function editJob(id) {
    const response = await fetch("/jobs/" + id);
    const job = await response.json();

    document.getElementById("jobid").value = job.jobid;
    document.getElementById("company").value = job.company;
    document.getElementById("jobRole").value = job.jobRole;
    document.getElementById("status").value = job.status;

    document.getElementById("saveBtn").textContent = "Update Job";
    document.getElementById("cancelBtn").style.display = "inline-block";
}

// 3. Clear the form and go back to "Add" mode
function clearForm() {
    document.getElementById("jobForm").reset();
    document.getElementById("jobid").value = "";
    document.getElementById("saveBtn").textContent = "Add Job";
    document.getElementById("cancelBtn").style.display = "none";
}

// 4. Click Add or Update: send the data to the backend
document.getElementById("jobForm").addEventListener("submit", async function (event) {
    event.preventDefault();  // stop the page from reloading

    const id = document.getElementById("jobid").value;

    // Collect the values from the form
    const job = {
        company: document.getElementById("company").value,
        jobRole: document.getElementById("jobRole").value,
        status: document.getElementById("status").value
    };

    // No id means a new job (POST). An id means update (PUT).
    let url = "/jobs";
    let method = "POST";
    if (id !== "") {
        url = "/jobs/" + id;
        method = "PUT";
    }

    const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job)
    });

    if (response.ok) {
        if (id !== "") {
            showMessage("Job updated", false);
        } else {
            showMessage("Job added", false);
        }
        clearForm();
        loadJobs();
    } else {
        showMessage("Something went wrong", true);
    }
});

// Cancel button clears the form
document.getElementById("cancelBtn").addEventListener("click", clearForm);

// 5. Click Delete: remove the job, then refresh the table
async function deleteJob(id) {
    if (!confirm("Delete this job?")) {
        return;
    }

    const response = await fetch("/jobs/" + id, { method: "DELETE" });

    if (response.ok) {
        showMessage("Job deleted", false);
        loadJobs();
    } else {
        showMessage("Delete failed", true);
    }

}
// Run when the page opens
loadJobs();
// Search box: any typing re-runs both filters
document.getElementById("SearchBox").addEventListener("input", function () {
    applyFilters();
});

// Status dropdown: any change re-runs both filters
document.getElementById("statusFilter").addEventListener("change", function () {
    applyFilters();
});

// Keeps only the jobs that match BOTH the search text and the status
function applyFilters() {
    const text = document.getElementById("SearchBox").value.toLowerCase();
    const chosen = document.getElementById("statusFilter").value;

    const matches = allJobs.filter(function (job) {
        const matchesText = job.company.toLowerCase().includes(text);
        const matchesStatus = chosen === "all" || job.status.toLowerCase() === chosen;
        return matchesText && matchesStatus;
    });

    showJobs(matches);
}