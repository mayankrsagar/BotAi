import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home/Home';
import NotFound from './pages/PastConversation/PastConversation';
import PastConversation from './pages/PastConversation/PastConversation.jsx';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> }, 
      { path: 'pastConversation', element: <PastConversation /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />, // Handle unknown routes
  },
]);

// Render the application with the RouterProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
