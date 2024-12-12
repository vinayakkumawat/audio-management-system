# Audio Management System User Guide

## Overview
The Audio Management System is a web application for managing and playing audio files sent by users from a mobile app. It features a priority-based queue system, user management, and real-time updates.

## Features

### Authentication
- Login with admin credentials
- Update admin profile and password
- Secure session management

### Audio Queue Management
- Three-tier priority queue system
- Automatic queue progression
- 10-minute audio expiry
- Real-time audio updates

### User Management
- Create, edit, and delete user accounts
- View user list and details
- Manage mobile app access

### Testing Interface
- Upload test audio files
- Simulate mobile app behavior
- Monitor WebSocket connections

## Queue System

### Priority Levels
1. First Queue: Latest incoming audios (highest priority)
2. Second Queue: Previously played audios from first queue
3. Third Queue: Previously played audios from second queue

### Audio Lifecycle
- New audios enter the first queue
- After playing, audios move to the next queue
- Audios expire after 10 minutes
- Expired audios in third queue are automatically removed

## WebSocket Integration
- Real-time audio updates
- Automatic connection management
- Event-based communication
- Connection status monitoring

## Security Features
- Rate limiting
- Input sanitization
- Secure session handling
- CORS protection