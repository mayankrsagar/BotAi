import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Typography,
} from '@mui/material';

import { AppContext } from '../../App';
import conversationIcon from '../../assets/conversationIcon.png';
import newChatIcon from '../../assets/newChat.png';

const NewConversation = () => {
  const { setCurrentChats } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNewChat = () => {
    setCurrentChats([]);
    localStorage.setItem("currentChats", JSON.stringify([])); 
    navigate("/");
  };

  const handlePastConversations = () => {
    navigate("/pastConversation");
  };

  return (
    <React.Fragment>
      {/* New Chat Section */}
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          backgroundColor: "#D7C7F4",
          justifyContent: "center",
          padding: "1rem",
          cursor: "pointer",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#C6B6E4",
          },
        }}
        onClick={handleNewChat}
      >
        <Avatar alt="Conversation Icon" src={conversationIcon} />
        <Typography variant="h5" fontWeight="500">
          New Chat
        </Typography>
        <Avatar alt="New Chat Icon" src={newChatIcon} sx={{ width: 24, height: 24 }} />
      </Box>

      {/* Past Conversations Section */}
      <Typography
        variant="h5"
        fontWeight="500"
        sx={{
          backgroundColor: "#D7C7F4",
          margin: "1rem",
          borderRadius: "8px",
          textAlign: "center",
          padding: "0.5rem",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#C6B6E4",
          },
        }}
        onClick={handlePastConversations}
      >
        Past Conversations
      </Typography>
    </React.Fragment>
  );
};

export default NewConversation;
