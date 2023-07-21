# 🚀 Doable - Task Management System

Welcome to **Doable**! 🌟

Doable is a fun and elegant task management system designed to help you stay organized and boost your productivity. With drag and drop functionality, a calendar view for tasks, and future plans for a stats view, Doable is here to make your life easier.

## 📝 Features

- **Task Management**: Easily create, update, and delete tasks.
- **Drag and Drop**: Organize your tasks effortlessly with drag and drop functionality.
- **Calendar View**: Get a clear overview of your tasks with the integrated calendar.
- **Productivity Stats** (Coming Soon): Measure and analyze your productivity.

## 🛠️ Getting Started

To set up the Doable app locally, follow these steps:

### Prerequisites

- Node.js (>= 12.0.0)
- npm (>= 6.0.0) or yarn (>= 1.0.0)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/doable.git
   cd doable
   ```

2. **Install dependencies**:

   If you're using npm:

   ```bash
   npm install
   ```

   If you're using yarn:

   ```bash
   yarn install
   ```

3. **Firebase Configuration**:

   To enable authentication and backend functionalities, you need to set up Firebase. Create a Firebase project and obtain the necessary credentials (apiKey, authDomain, projectId, etc.).

   - For Firebase Auth: Update the Firebase configuration in `src/auth/firebaseConfig.js`.

   - For Firebase Backend: Update the Firebase configuration in `src/firebase/firebaseConfig.js`.

4. **Start the development server**:

   If you're using npm:

   ```bash
   npm run dev
   ```

   If you're using yarn:

   ```bash
   yarn dev
   ```

   The development server will be available at `http://localhost:3000`.

5. **Build the app**:

   When you're ready to deploy or test the production build:

   If you're using npm:

   ```bash
   npm run build
   ```

   If you're using yarn:

   ```bash
   yarn build
   ```

   The production-ready files will be available in the `dist` directory.

## 🚀 Technologies Used

- Frontend Framework: React with TypeScript
- Styling: Tailwind CSS
- Build Tool: Vite
- Authentication: Firebase Auth
- Backend: Firebase

## 🤝 Contributing

We welcome contributions to make Doable even better! Feel free to open issues and submit pull requests.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

🌟 Happy task management with Doable! 🌟
