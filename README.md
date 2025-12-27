# RBAC Permissions Web Application

A React-based web application demonstrating Role-Based Access Control (RBAC) with JWT authentication using httpOnly cookies.

## Project Description

This project is a frontend web application that implements a comprehensive Role-Based Access Control (RBAC) system. It demonstrates how to manage user permissions based on roles, restrict access to specific routes and UI components, and handle secure authentication with automatic token refresh.

The application provides different levels of access to various dashboard sections based on the user's assigned role (Client, Moderator, or Admin).

## Features

### Core Features

- **User Authentication**: Login system with JWT token-based authentication stored in httpOnly cookies
- **Role-Based Access Control (RBAC)**: Three user roles with different permission levels
  - **Client**: Basic access (Dashboard, Support)
  - **Moderator**: Intermediate access (Dashboard, Support, Messages)
  - **Admin**: Full access (Dashboard, Support, Messages, Revenue, Admin Tools)
- **Protected Routes**: Route-level permission checking with automatic redirect to Access Denied page
- **Permission-Based UI Rendering**: Conditional rendering of tabs and components based on user permissions
- **Automatic Token Refresh**: Seamless token renewal when access token expires (410 status code)
- **Logout Functionality**: Secure logout with token cleanup

### Developer Features

- **Custom RBAC Hook**: `usePermission` hook for easy permission checking throughout the application
- **RBAC Route Component**: Reusable `RbacRoute` component for protecting routes
- **Centralized Permission Configuration**: Single source of truth for roles and permissions in `rbacConfig.js`
- **Axios Interceptors**: Automatic request/response handling for authentication and token refresh
- **Error Handling**: Centralized error display with toast notifications

## Authentication & Authorization

### Authentication

This application uses **JWT tokens stored in httpOnly cookies** for authentication. When a user logs in, the backend server sets JWT tokens (access token and refresh token) as httpOnly cookies, which are automatically sent with every API request through the `withCredentials: true` setting in Axios.

**Key Points:**
- User credentials are sent to `/v1/users/login` endpoint
- JWT tokens are stored in httpOnly cookies by the server (not accessible via JavaScript)
- Cookies are automatically included in all requests
- User information (email, role) is stored in localStorage for UI rendering only
- Automatic token refresh when access token expires (HTTP 410 status)
- Secure logout clears cookies on the server side

### Authorization

Authorization is handled through a permission-based system:
- Each user has an assigned role (Client, Moderator, Admin)
- Each role has specific permissions defined in `rbacConfig.js`
- The `usePermission` hook checks if the user's role includes a required permission
- Routes are protected using the `RbacRoute` component
- UI elements (tabs, buttons) are conditionally rendered based on permissions

## Frontend Structure

### Frontend Responsibilities

The React frontend is responsible for:

- **UI Rendering**: Displaying login forms, dashboard, and role-specific content
- **Client-Side Routing**: Managing navigation between pages with React Router
- **Permission Checks**: Evaluating user permissions before rendering protected routes/components
- **API Communication**: Making authenticated requests to the backend using Axios
- **Token Management**: Handling automatic token refresh through Axios interceptors
- **User Experience**: Providing feedback through toast notifications and loading states

### Key Components

- `App.jsx`: Main routing configuration with protected and public routes
- `RbacRoute.jsx`: Permission-based route guard component
- `Login.jsx`: User authentication interface
- `Dashboard.jsx`: Main dashboard with role-based tabs
- `usePermission.js`: Custom hook for permission checking
- `authorizedAxios.js`: Configured Axios instance with authentication interceptors
- `rbacConfig.js`: RBAC configuration with roles, permissions, and mappings

## Backend

This is a frontend-only repository. The backend API (expected at `http://localhost:8017`) should provide:

- **Authentication endpoints**:
  - `POST /v1/users/login` - User login with JWT cookie setup
  - `DELETE /v1/users/logout` - User logout with cookie cleanup
  - `PUT /v1/users/refresh_token` - Access token refresh
- **Protected endpoints**:
  - `GET /v1/dashboards/access` - Get authenticated user information
- **JWT Token Management**: Issue and validate JWT tokens stored as httpOnly cookies
- **Role Assignment**: Assign roles to users and include role information in API responses

## Tech Stack

- **React** 19.2.3 - UI framework
- **React Router DOM** 7.11.0 - Client-side routing
- **Material-UI** 7.3.6 - UI component library
- **Axios** 1.13.2 - HTTP client
- **React Hook Form** 7.69.0 - Form management
- **React Toastify** 11.0.5 - Notification system
- **Vite** 7.3.0 - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js >= 20.x

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── apis/              # API endpoint functions
├── components/core/   # Core reusable components (RbacRoute)
├── config/            # RBAC configuration
├── hooks/             # Custom React hooks (usePermission)
├── pages/             # Page components
├── utils/             # Utility functions (authorizedAxios, constants)
└── App.jsx            # Main app component with routing
```

## Author

**Hwinkdev**  
YouTube: [@hwinkdev.official](https://www.youtube.com/@hwinkdev.official)
