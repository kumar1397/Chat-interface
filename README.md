# React Chat Interface

## Overview
This project is a fully functional chat interface built using React. The application mimics the layout and functionality of ChatGPT, supporting Markdown rendering, maintaining conversation history, and integrating with an AI API for chat responses.

## Features
- **Chat Interface**: A user-friendly interface that replicates the ChatGPT experience.
- **API Integration**: Fetch chat responses using an Mistral API  with proper error handling.
- **Markdown Support**: Enables rendering of Markdown-formatted responses.
- **State Management**: Maintains conversation history within the app context.
- **Sidebar with Chat Threads**: Allows users to switch between multiple conversations easily.


## Tech Stack
- **Frontend**: Next.js for frontend UI, Tailwind CSS for styling purposes
- **Backend**: Express.js for crud operations
- **State Management**: Zustand
- **AI API**: used Mistal api keys
.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-chat-interface.git
   cd react-chat-interface
   ```
2. Install dependencies for frontend:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm run dev
   ```
4. Install dependencies for backend:
   ```bash
   cd server
   npm install
   ```
5. Create an `.env` file in server directory and add your API key:
   ```env
   MISTRAL_API_KEY=your_api_key_here
   ```

6. Start the backend server:
   ```bash
   
   node server.js
   ```

## Usage
1. Type a message in the chat input box.
2. Receive AI-generated responses in real-time.
3. View and switch between multiple chat threads using the sidebar.
4. click on the delete button to delete any previous conversation.



