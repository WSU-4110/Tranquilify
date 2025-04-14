# Tranquilify

Tranquilify is a comprehensive mental health application designed to provide users with various tools and resources to improve their mental wellbeing, track their mood, and connect with professional therapists.

## Technologies Used

### Backend
- **Spring Boot**: Java-based framework used to create a stand-alone, production-grade Spring-based application
- **PostgreSQL**: Advanced open-source relational database for data persistence
- **Spring Security**: Authentication and access control framework
- **JPA/Hibernate**: ORM (Object Relational Mapping) for database interaction
- **RESTful API**: For communication between frontend and backend

### Frontend
- **React Native**: Cross-platform mobile application framework
- **Expo**: Platform for making universal native apps for Android, iOS, and the web
- **React Navigation**: Routing and navigation for React Native apps
- **React Native Paper**: Material Design implementation for React Native

### Real-time Communication
- **Firebase Realtime Database**: NoSQL cloud database for real-time data synchronization
- **Firebase Authentication**: User authentication integration

### Third-party Integrations
- **Zoom API**: For scheduling and generating meeting links
- **AI Integration**: For AI-powered therapist conversations

## Features

### Mood Tracking
The mood tracking feature allows users to:
- Log their daily mood state
- View mood trends over time through visualizations
- Add notes to each mood entry
- Generate insights based on mood patterns

### Breathing Exercises
Interactive breathing exercises designed to:
- Help users manage stress and anxiety
- Provide guided breathing sessions of varying lengths
- Offer different breathing techniques (box breathing, 4-7-8 technique, etc.)
- Track progress and consistency

### Journal
The journaling feature enables users to:
- Create and save personal journal entries
- Add timestamps to entries
- Search through past entries
- Use prompts for guided journaling sessions

### Messaging
Real-time messaging capabilities include:
- Direct chat with licensed therapists
- AI-powered therapist conversations for 24/7 support
- Secure and private messaging
- Message history and conversation threads

### Scheduling
The scheduling system allows users to:
- Book appointments with therapists
- Receive Zoom meeting links for virtual sessions
- Get reminders for upcoming appointments
- Reschedule or cancel appointments

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Java 11 or higher
- PostgreSQL
- Firebase account
- Expo CLI

### Installation

#### Backend Setup
1. Clone the repository
2. Navigate to the backend directory
3. Configure PostgreSQL connection in `application.properties`
4. Run the Spring Boot application:

```
./gradlew bootRun
```

#### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies:

```
npm install
```

#### Configure Firebase:
- Create a Firebase project
- Add your Firebase configuration to the project
- Set up Realtime Database rules

### Start the Expo development server:

```
npx expo start
```

# Authors
* Ali Abdi (hj2182@wayne.edu)
* Abdalaa Zwen (hl4371@wayne.edu)
* Hiba Rababeh (hj0207@wayne.edu)
* Khadija Husan (hk4830@wayne.edu)
* Zachary Marabeas (gx4993@wayne.edu)
