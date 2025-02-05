# Installation Guide

## Prerequisites

1. **Navigate to the Backend Directory**:
   - Go to the backend folder of the project.

2. **Setup Environment Variables**:
   - In the backend folder, find the `.env` file. This file contains environment variables used for database configuration.
   - You will need to replace the following fields with your own credentials:
     - `DB_USERNAME`: Your database username
     - `DB_PASSWORD`: Your database password

   Ensure you save the `.env` file after editing these variables.

3. **PostgreSQL**:
   - You need to have **PostgreSQL** installed and running on your machine. The application connects to a PostgreSQL database, so ensure it is set up and accessible with the correct credentials.

## Understanding the Spring Boot Code

For a deeper understanding of how the Spring Boot application is structured and works, we recommend visiting the official [Spring Boot website](https://spring.io/projects/spring-boot). You will find detailed documentation and guides there.

Additionally, here’s a useful YouTube tutorial to help you get familiar with Spring Boot development:

[Spring Boot Tutorial - YouTube](https://www.youtube.com/watch?v=vtPkZShrvXQ)

## Dependency Management with Gradle

This project uses **Gradle** as the build tool and dependency manager, not Maven. Ensure you have **Gradle** installed on your machine. You can download it from the official site: [Gradle Installation](https://gradle.org/install/).

## Additional Notes

- Ensure you have **Java** and **Gradle** installed to run the Spring Boot application.
- Make sure your **PostgreSQL database** is up and running before starting the backend server.
