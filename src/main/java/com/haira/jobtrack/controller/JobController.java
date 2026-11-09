package com.haira.jobtrack.controller;
import com.haira.jobtrack.entity.Job;
import com.haira.jobtrack.service.JobService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;

@RestController
// set common url path=>"/jobs"
@RequestMapping("/jobs")
public class JobController {
    private final JobService jobService;
    public JobController(JobService jobService)
    {
        this.jobService=jobService;
    }
    @PostMapping
    public Job createJob(@Valid @RequestBody Job job) {
        return jobService.createJob(job);
    }
    @GetMapping
public List<Job> getAllJobs() {
    return jobService.getAllJobs();
}
// url contains job ID 
@GetMapping("/{id}")
public Job getJobById(@PathVariable Long id) {
    return jobService.getJobById(id);
}
    @DeleteMapping("/{id}")
public void deleteJob(@PathVariable Long id) {
    jobService.deleteJob(id);
}
@PutMapping("/{id}")
public Job updateJob(
        @PathVariable Long id,
        @Valid //this line for validation required for job role
        @RequestBody Job job) {
       return jobService.updateJob(id, job);
}
}
