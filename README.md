[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

# Task Management System API Documentation

## Overview

Welcome to the Task Management System API documentation. This document outlines the endpoints and methods available for interacting with the Task Management System API. The API provides functionality for managing tasks and user authentication.

## Base URL

All API endpoints are prefixed with `/api`.

## Authentication

The API uses Bearer Authentication with JWT tokens. Include the token in the `Authorization` header as follows:

## Description

For database used **MySql** with **Sequelize**.

## Table of Contents

- [Installation](#installation)
- [Endpoints](#endpoints)
  - [Users Authentication](#users-authentication)
    - [Registration](#registration)
    - [Login](#login)
    - [User Info](#user-info)
  - [Tasks API Endpoints](#tasks-api-endpoints)
    - [Create task](#create-task)
    - [List users tasks](#list-users-tasks)
    - [Get user task](#get-user-task)
    - [Update user task](#update-user-task)
    - [Update user task status](#update-user-task-status)
    - [Delete user task](#delete-user-task)
    - [Swagger documentation](#swagger-documentation)
- [Features](#features)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Tigran-85/task-managment
    cd task-managment
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run migrations:
    ```bash
    npm run db-create-users - // creates users table 
    ```
    ```bash
    npm run db-create-tasks - // creates tasks table
    ```

4. Install Mysql database and create database with name `task-managment`

5. ```bash
    npm run db-migrate - // run migration and create tables
    ```


## Running the Application

1. Start the application in development mode:
    ```bash
    npm run dev
    ```
2. The application will be running at `http://localhost:5000`.


# Endpoints

## Users Authentication

### Registration

- **Endpoint:** `/api/auth/signup`
- **Method:** `POST`
- **Body:**
    - `firstName`: Must contain at least 3 characters and maximum 30 characters.
    - `lastName`: Must contain at least 3 characters and maximum 30 characters..
    - `email`: Must be valid email.
    - `password`: Must contain at least 1 uppercase, 3 lowercase, 2 numbers and 1 special character.


### Login

- **Endpoint:** `/api/auth/signin`
- **Method:** `POST`
- **Body:**
    - `email`: Must be valid email.
    - `password`: Must contain at least 5 characters  

## User Info

- **Endpoint:** `/api/auth/info`
- **Method:** `GET`
 
## Tasks API Endpoints

### Create task

- **Endpoint:** `/api/tasks/create`
- **Method:** `POST`
- **Authentication Required:** Bearer {token}
- **Body:**
    - `title`: Must contain at least 3 characters and maximum 50 characters.
    - `description`: Must contain at least 3 characters and maximum 50 characters.

### List users tasks

- **Endpoint:** `/api/tasks`
- **Method:** `GET`
- **Authentication Required:** Bearer {token}

### Get user task

- **Endpoint:** `/api/tasks/{id}`
- **Method:** `GET`
- **Authentication Required:** Bearer {token}
- **Path Parameters:**
    - `id`: Unique identifier of the user task.

### Update user task

- **Endpoint:** `/api/tasks/{id}`
- **Method:** `PUT`
- **Authentication Required:** Bearer {token}
- **Query Parameters:**
    - `id`: Unique identifier of the task.
- **Body:**
    - `title`: Must contain at least 3 characters and maximum 50 characters.
    - `description`: Must contain at least 3 characters and maximum 50 characters.

### Update user task status

- **Endpoint:** `/api/tasks/status/{id}`
- **Method:** `PUT`
- **Authentication Required:** Bearer {token}
- **Query Parameters:**
    - `id`: Unique identifier of the task.
- **Body:**
    - `status`: Must be either completed or not_completed.

### Delete user task

- **Endpoint:** `/api/tasks/delete/{id}`
- **Method:** `DELETE`
- **Authentication Required:** Bearer {token}
- **Query Parameters:**
    - `id`: Unique identifier of the task.

### Swagger documentation

- **Endpoint:** `/api/docs`
- **Method:** `GET`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.