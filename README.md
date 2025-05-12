# Numu Parent App

<!-- ![Numu Parent App Screenshot](./assets/images/wecare.png) -->

Numu Parent App is a modern mobile application for parents to manage their children, receive therapist matches live.

## Features

- 🔒 Secure authentication with Firebase
- 👶 Manage children profiles and their concerns
- 👩‍⚕️ View and accept/decline therapist matches
- 📅 Track therapist-child relationships
- ⚡️ Built with Expo for fast development and hot reloads

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:Ibranista/numu-parent-app.git
```

### 2. Install dependencies

```bash
npm install # or pnpm install or yarn
```

### 3. Configure environment variables

Copy the example environment file and fill in your Firebase and API credentials:

```bash
cp example.env .env
```

Edit `.env` and set the required values (see `example.env` for guidance).

### 4. Run the development server

```bash
npx expo start
```

The app will be available in Expo Go or your chosen simulator.

## Project Structure

- `app/` - Main app source code (screens, navigation)
- `features/` - Redux slices and thunks for app features
- `components/` - Reusable UI components
- `assets/` - Images and fonts
- `schema/` - Form validation schemas
- `store/` - Redux store configuration
- `services/` - API service helpers

## Notes

- Make sure you have a Firebase project set up and the correct credentials in your `.env` file.
- For API integration, ensure your backend is running and accessible at the URL specified in your environment variables.
- This app uses [redux-persist](https://github.com/rt2zz/redux-persist) for state persistence with AsyncStorage.
