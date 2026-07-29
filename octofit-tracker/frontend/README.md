# Octofit Tracker Frontend

This React 19 app uses react-router-dom and calls backend API endpoints from the presentation tier.

## Environment variable

Define VITE_CODESPACE_NAME in a local env file, for example .env.local:

VITE_CODESPACE_NAME=your-codespace-name

When VITE_CODESPACE_NAME is defined, the frontend builds API URLs like:

https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/

If VITE_CODESPACE_NAME is not set, the app safely falls back to:

http://localhost:8000/api/users/
