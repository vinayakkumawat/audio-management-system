# Audio Management System API Documentation

## Authentication

### Login
- **POST** `/api/auth/login`
- **Body**: `{ username: string, password: string }`
- **Response**: `{ token: string, admin: { id: string, username: string } }`

### Update Profile
- **PUT** `/api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ username?: string, currentPassword: string, newPassword?: string }`
- **Response**: `{ message: string }`

## User Management

### Create User
- **POST** `/api/users`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ username: string }`
- **Response**: User object

### Get Users
- **GET** `/api/users`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of user objects

### Update User
- **PUT** `/api/users/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ username: string }`
- **Response**: Updated user object

### Delete User
- **DELETE** `/api/users/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: 204 No Content

## WebSocket Events

### Connection
- Event: `connect`
- Authentication required via session

### New Audio
- Event: `new_audio`
- Payload: Audio object
- Direction: Client → Server → All Clients

### Audio Removed
- Event: `audio_removed`
- Payload: Audio ID
- Direction: Client → Server → All Clients

### Error
- Event: `error`
- Payload: Error message
- Direction: Server → Client