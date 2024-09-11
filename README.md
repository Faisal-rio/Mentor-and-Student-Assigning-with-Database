# Mentor-Student Assignment System

A Node.js and MongoDB-based system for managing mentor and student assignments. The system provides APIs to create mentors, assign students to mentors, and retrieve assignment details.

## Technologies

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Tools:** Postman (for testing)

## Setup

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/mentor-student-app.git
cd mentor-student-app
npm install
run node index.js

API Endpoints
1. Create Mentor

POST /api/mentors
2. Create Student
POST /api/students

3. Assign Multiple Students to a Mentor
POST /api/mentors/:mentorId/students

4. Get Students Without a Mentor
GET /api/students/no-mentor

5. Assign/Change Mentor for a Student
PUT /api/students/:studentId/mentor

6. Get All Students for a Mentor
GET /api/mentors/:mentorId/students

7. Get Assigned Mentor for a Student
GET /api/students/:studentId/mentor
```
