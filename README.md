# BookXprt - Employee Management System

A modern, full-featured employee management application built with React, TypeScript, and Material-UI.

### Project Overview

BookXprt is a comprehensive employee management system that allows users to manage employee records with features including:

- **Authentication** - Secure login system with form validation
- **Employee CRUD Operations** - Add, view, edit, and delete employee records
- **Advanced Filtering** - Search employees by name and filter by gender/status
- **Image Upload** - Employee photo upload with base64 conversion and preview
- **Status Management** - Toggle employee active/inactive status with visual indicators
- **Print Functionality** - Generate printable employee cards
- **Dashboard Overview** - View statistics including total, active, and inactive employee counts
- **Responsive Design** - Professional UI that works across all device sizes

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Material-UI (MUI) v7** - Component library and design system
- **React Hook Form** - Form management with Zod validation
- **TanStack Query (React Query)** - Data fetching and caching
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **Day.js** - Date handling
- **React-to-Print** - Print functionality

### Backend
- **JSON Server** - Mock REST API for development

### Build Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Concurrently** - Run multiple commands simultaneously

##  Steps to Run the Project Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation & Setup
**Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookxprt
Install dependencies

Start the development server

This command will start both:

Vite dev server (Frontend) on http://localhost:5173
JSON Server (Backend API) on http://localhost:3000
Open the application

Navigate to http://localhost:5173 in your browser
Login with credentials:
Email: bhanu@gmail.com
Password: Chinna@123
Available Scripts
npm run dev - Start both frontend and backend servers
npm run dev:client - Start only the Vite dev server
npm run dev:server - Start only the JSON Server
npm run build - Build for production
npm run lint - Run ESLint
npm run lint:fix - Fix ESLint errors automatically
npm run format - Format code with Prettier
npm run preview - Preview production build locally

Known Issues
Toggle Status Flicker: When toggling employee status between Active/Inactive, there may be a slight UI flicker due to the query refetch mechanism. This is a known issue and will be addressed in a future update.

Features in Detail
Authentication
Form validation with error messages
Session management with localStorage
Protected routes
Employee Management
Full CRUD operations
Image upload with preview
Real-time search with debouncing
Multi-filter support (gender, status)
Confirmation dialogs for destructive actions
Success/error notifications
Dashboard
Employee statistics overview
Visual cards with icons and color coding
Activity rate calculation
User Experience
Loading states and skeletons
Empty states with helpful messages
Responsive design for all screen sizes
Professional Material Design UI
Smooth transitions and animations
