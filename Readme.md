#DOCUMENTATION OF THE PROJECT

https://docs.google.com/document/d/1b3VrXoYMeWqCg23wZ5ZHlC1fPHO1rqfg52tRQCdZckM/edit?tab=t.0#heading=h.z6ne0og04bp5

API DOCUMENTATION OF THE PINGPAL (POSTMAN)

https://documenter.getpostman.com/view/39168811/2sAYJ6DfSc










                                        PINGPAL INDEX


1.Abstract
2.Existing project drawbacks
3.Overcome the problems
4.Overview
5. DB Design 
6. Tech Stack used 
7. API Documentation 
8. Walkthrough of the project - functionalities of your project from initial - final process ( screenshot - and functions ) 
-> this documentation should be uploaded in the frontend github link in README or as doc link in README

https://documenter.getpostman.com/view/39168811/2sAYJ6DfSc

API documentation should be submitted in the backend github link
DB design also can be added 






PingPal: Real-Time Chat Application

 1. Abstract
PingPal is a modern real-time chat application designed to facilitate seamless communication among users. It supports both individual and group chats, file sharing, notifications, and user profiles. With features like message search, chat history, and user status, PingPal aims to enhance user experience and functionality for both casual and professional use cases. The system is built using the MERN stack, ensuring scalability and reliability.

2. Existing Project Drawbacks
Existing chat applications face several limitations:
- Lack of real-time responsiveness due to outdated technologies.
- Poor scalability for large groups or high-traffic scenarios.
- Limited file-sharing capabilities, often with size or format restrictions.
- Absence of robust search functionalities, making it hard to locate past messages.
- Inadequate content moderation and administrative tools.




 3. Overcome the Problems
PingPal addresses these drawbacks with:
- Real-time communication powered by **Socket.io**, ensuring instant message delivery.
- Scalable architecture using the **MERN stack**.
- Comprehensive file-sharing capabilities with type and size restrictions.
- Advanced message search with filters for efficient retrieval.
- Administrative tools for user and group management, as well as content moderation.

 4. Overview
PingPal offers the following core functionalities:
- **Real-Time Messaging**: Instant one-on-one and group chats.
- **Group Chat Management**: Creation and membership controls for group chats.
- **File Sharing**: Multimedia and document exchange with upload/download features.
- **Notifications**: Real-time and push notifications for message updates.
- **User Profiles**: Customizable user profiles with status updates.
- **Message Search and Chat History**: Advanced search and filtering of past conversations.
- **Admin Tools**: User management, group moderation, and analytics.





5. Database Design
 MongoDB Schema
1. **Users**:
   - `_id`: ObjectId
   - `username`: String (unique, required)
   - `email`: String (unique, required)
   - `password`: String (hashed, required)
   - `status`: String (e.g., online, offline, away)
   - `profilePicture`: String

2. **Messages**:
   - `_id`: ObjectId
   - `sender`: ObjectId (ref: Users)
   - `content`: String
   - `room`: String
   - `timestamp`: Date



 6. Tech Stack Used
- **Frontend**: ReactJS with TailwindCSS for responsive and modern UI design.
- **Backend**: Node.js with Express.js for API development.
- **Database**: MongoDB for scalable and flexible data storage.
- **Real-Time Communication**: Socket.io for WebSocket-based instant messaging.
- **Authentication**: JWT for secure user sessions.

7. API Documentation
### Authentication Routes
1. `POST /api/auth/register`
   - **Description**: Registers a new user.
   - **Payload**:
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**:
     ```json
     { "message": "User registered successfully" }
     ```

2. `POST /api/auth/login`
   - **Description**: Logs in a user.
   - **Payload**:
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**:
     ```json
     { "token": "string", "user": { "username": "string" } }
     ```

### Chat Routes
1. `POST /api/chat/send`
   - **Description**: Sends a message.
   - **Payload**:
     ```json
     {
       "sender": "ObjectId",
       "content": "string",
       "room": "string"
     }
     ```
   - **Response**:
     ```json
     { "message": "Message sent successfully" }
     ```

2. `GET /api/chat/history/:room`
   - **Description**: Retrieves chat history for a room.
   - **Response**:
     ```json
     [
       { "sender": "ObjectId", "content": "string", "timestamp": "Date" }
     ]
     ```




8. Walkthrough of the Project
 Initial Setup
- **Login/Register Page**: Secure user authentication with form validation.
- **Dashboard**: Overview of available chats and user status.

Core Functionalities
1. Real-Time Messaging:
   - Users can send and receive messages instantly.
   - Typing indicators and read receipts included.

2. Group Chats:
   - Create groups, add members, and manage settings.

3. **File Sharing**:
   - Upload and download images, videos, and documents with preview support.

4. **Notifications**:
   - Real-time notifications for new messages and mentions.




FUNCTIONS
1. Login Page:
   - Secure login form.
   - ![Login Page Screenshot](path/to/login-screenshot.png)

2. Chat Window:
   - Real-time messaging interface.
   - ![Chat Window Screenshot](path/to/chat-screenshot.png)

3. Group Management:
   - Group creation and member management UI.
   - ![Group Management Screenshot](path/to/group-screenshot.png)

4. Admin Dashboard:
   - User activity and flagged content monitoring.
   - ![Admin Dashboard Screenshot](path/to/admin-screenshot.png)
 Conclusion
PingPal provides a robust and modern solution for real-time communication, addressing common drawbacks in existing applications. Its features ensure seamless user interaction, efficient management, and a superior chat experience.

