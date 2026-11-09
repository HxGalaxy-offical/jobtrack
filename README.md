# JobTrack - Job Application Tracker

A full-stack web app to track job applications: add, view, edit, delete, search, and filter by status.

## Tech Stack
- **Backend:** Java 21, Spring Boot 4, Spring Data JPA
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript (served by Spring Boot)

## Features
- Add, view, update, and delete job applications
- Validation: company and job role cannot be blank (400 with clear messages)
- Missing job returns 404 with a clear message
- Search by company name
- Filter by status
- Data is saved in MySQL and survives restarts

## Project Structure
- `controller`: REST endpoints (`JobController`)
- `service`: business logic (`JobService`)
- `repository`: database access (`JobRepository`)
- `entity`: the `Job` table mapping
- `exception`: custom 404 error and global error handler

## API Endpoints
| Method | URL | Purpose |
|---|---|---|
| GET | `/jobs` | Get all jobs |
| GET | `/jobs/{id}` | Get one job |
| POST | `/jobs` | Add a job |
| PUT | `/jobs/{id}` | Update a job |
| DELETE | `/jobs/{id}` | Delete a job |

## How to Run
1. Create a MySQL database: `CREATE DATABASE jobtrack;`
2. Set your database password as an environment variable:
   - PowerShell: `$env:DB_PASSWORD="your_password"`
3. Run the app:
   - `.\mvnw.cmd spring-boot:run`
4. Open `http://localhost:8080/`

## Planned Features
- User login and sign-up with hashed passwords
- Protected API so only logged-in users can see their jobs
- Status badges and sorting

## Author
Haira M A K
