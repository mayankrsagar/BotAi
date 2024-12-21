
Chat Application with Vite + React
This is a bot-like chat application built using Vite, React, and MUI (Material-UI). It uses localStorage as the backend to persist chats and stores responses fetched via an external API (like OpenAI) for conversational purposes.

Features
New Chat:

Start a fresh conversation by clicking the New Chat tab.
Clears the current chat but keeps it accessible in the Past Conversations tab.
Persist Chats:

Ongoing chats stay persistent across reloads.
Chats are saved to localStorage so they remain intact.
Past Conversations:

View saved chats under the Past Conversations tab.
Chats saved via the Save button appear here.
Feedback & Ratings:

Click the BotAI logo next to responses to:
Give feedback on the AI's responses.
Add a rating (e.g., 1–5 stars).
Feedback is displayed with the response.
Home Navigation:

Return to the home page by clicking the BotAI logo on the navigation bar.

Installation
Clone the repository:

git clone git@github.com:mayankrsagar/BotAi.git or https://github.com/mayankrsagar/BotAi.git
cd BotAi
Install dependencies:

npm install
Start the development server:

npm run dev