# JobTrack - Job Application Tracker

A full-stack web app for tracking job applications. Users create an account, log in, and manage their own applications: add, view, edit, delete, search, filter, sort, and export.

## Tech Stack
- **Backend:** Java 21, Spring Boot 4, Spring Data JPA, Spring Security
- **Database:** MySQL
- **Security:** BCrypt password hashing, session login, protected endpoints
- **Frontend:** HTML, CSS, JavaScript, served by Spring Boot

## Features
- Sign up and log in with accounts stored in MySQL
- Passwords are hashed with BCrypt, never stored in plain text
- Each user sees and manages only their own applications
- Add, view, update, and delete applications
- Track company, role, status, applied date, and notes
- Validation: company and role cannot be blank, with clear messages
- Missing application returns 404 with a clear message
- Search by company, filter by status, and sort by any column
- Summary counters and a status bar chart
- Export all applications to a CSV file
- Logout, login error messages, and protected pages

## Project Structure
- `controller`: REST endpoints (`JobController`, `AuthController`)
- `service`: business logic, including ownership checks (`JobService`, `UserService`)
- `repository`: database access (`JobRepository`, `UserRepository`)
- `entity`: table mappings (`Job`, `AppUser`)
- `config`: security rules and the password encoder (`SecurityConfig`)
- `exception`: custom 404 error and the global error handler

## How Security Works
- Spring Security protects `/jobs` and the main page. Logged-out users are sent to the login page.
- Login checks usernames against the `users` table, using `JobTrackUserDetailsService`.
- Job ownership is set from the logged-in user on the server, never from the browser.

## API Endpoints
| Method | URL | Purpose |
|---|---|---|
| POST | `/auth/signup` | Create an account |
| GET | `/jobs` | Get the logged-in user's jobs |
| GET | `/jobs/{id}` | Get one of the user's jobs |
| POST | `/jobs` | Add a job |
| PUT | `/jobs/{id}` | Update one of the user's jobs |
| DELETE | `/jobs/{id}` | Delete one of the user's jobs |

## How to Run
1. Install MySQL and create the database:
   ```sql
   CREATE DATABASE jobtrack;
   ```
2. Set your database password as an environment variable. In PowerShell:
   ```powershell
   $env:DB_PASSWORD="your_password"
   ```
3. Start the app:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
4. Open `http://localhost:8080/` and sign up for an account.

The real database password is never stored in the code. `application.properties` reads it from the `DB_PASSWORD` environment variable.

## Planned Features
- Forgot password and email verification
- Deployment to a cloud host
- Reminders for applications with no update in two weeks

## Author
Haira
