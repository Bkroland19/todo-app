# My Tasks App

## Overview

**My Tasks App** is a task management application that allows users to create, edit, delete, and mark tasks as completed. The app leverages modern React features, including hooks and context, to manage state and ensure a seamless user experience.
The primary goal of the app is to help users efficiently manage their daily tasks and track their progress. It provides a simple and intuitive user interface with functionality for task creation, modification, and completion tracking.

---

## Table of Contents

- [Project Setup](#project-setup)
- [App Purpose](#app-purpose)
- [App Structure](#app-structure)
- [Design Decisions](#design-decisions)
- [Running Tests](#running-tests)

---

## Project Setup

To set up this project locally, follow these steps:

## Project Structure

To set up this project locally, follow these steps:
```
└── 📁src
    └── 📁assets
        └── react.svg
    └── 📁components
        └── Button.tsx
        └── ErrorMessage.tsx
        └── index.ts
        └── Modal.tsx
        └── Navbar.tsx
        └── TaskForm.tsx
        └── TaskItem.tsx
    └── 📁context
        └── TaskContext.tsx
    └── 📁hooks
        └── index.ts
        └── useModal.ts
        └── useTasks.ts
    └── 📁types
        └── index.ts
    └── App.css
    └── App.test.tsx
    └── App.tsx
    └── index.css
    └── main.jsx
```

## Design Decisions 
Implemented KISS and SOLID principles to maintain a clean and readable code.

To set up this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone git@github.com:Bkroland19/todo-app.git
cd todo-app

### To startup the mockapi server run this can be accessed on http://localhost:5000/tasks
npm run mock-api

### Run Frontend ,this can be accessed on http://localhost:5173/
npm install
npm run dev

### Run tests
npm run test




