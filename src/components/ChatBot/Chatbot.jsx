import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {
  Avatar,
  Box,
  Button,
  Modal,
  Paper,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { AppContext } from '../../App';
import bulb from '../../assets/bulb.png';
import conversationIcon from '../../assets/conversationInsideIcon.png';
import me from '../../assets/me.png';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Chatbot = () => {
  const [chatId, setChatId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setChatId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setChatId(null);
    setOpen(false);
  };
  const [feedbackValue, setFeedbackValue] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const { currentChats, setCurrentChats ,setAllConversations,allConversations } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const lastChatRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const completion = await puter.ai.chat(userQuery);
      const date = new Date();
      const formattedDate = new Intl.DateTimeFormat("en-in", {
        dateStyle: "medium",
      }).format(date);
      const formattedTime = new Intl.DateTimeFormat("en-in", {
        timeStyle: "short",
      }).format(date);
      const sanitizedAnswer = completion.message.content.replaceAll("**", " ");

      setCurrentChats((prev) => [
        ...prev,
        {
          question: userQuery,
          answer: sanitizedAnswer,
          date: formattedDate,
          time: formattedTime,
          id: Date.now(),
        },
      ]);
      setUserQuery("");
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = (id, value) => {
    const updatedChats = currentChats.map((chat) =>
      chat.id === id ? { ...chat, rating: value } : chat
    );
    setCurrentChats(updatedChats);
  };

  const handleFeedBack = () => {
    const chatwithFeedBack = currentChats.map((chat) => {
      if (chatId === chat.id) {
        return { ...chat, feedbackValue: feedbackValue };
      } else return chat;
    });
    setCurrentChats(chatwithFeedBack);
    setChatId(null);
    setOpen(false);
    // alert("success in adding feedback")
  };

  const saveChats = () => {
    localStorage.setItem("currentChats", JSON.stringify(currentChats));
    const updatedConversations = [...allConversations, ...currentChats];
    setAllConversations(updatedConversations);
    localStorage.setItem("allConversations", JSON.stringify(updatedConversations));
    alert("Chat history saved!");
  };

  // useEffect(() => {
  //   const savedChats = JSON.parse(localStorage.getItem("currentChats")) || [];
  //   setCurrentChats(savedChats);
  // }, []);

  useEffect(() => {
    if (lastChatRef.current) {
      lastChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChats]);

  return (
    <Box
    sx={{
      width: "100%",
      backgroundColor: "#f5f5f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100%",
      paddingTop: "64px", // Matches the height of the navbar
      marginBottom: "10rem",
      position: "relative",
    }}
    >



      {currentChats.length === 0 ? (
        <Fragment>
          {/* Title */}
          <Typography variant="h4" sx={{ marginBottom: 3 }}>
            How Can I Help You Today?
          </Typography>

          {/* Icon Placeholder */}
          <Box
            sx={{
              width: 80,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Avatar
              src={conversationIcon}
              sx={{ width: "100%", height: "100%" }}
            ></Avatar>
          </Box>

          {/* Options */}
          <Grid container spacing={2} justifyContent="center">
            {[
              "Hi, what is the weather",
              "Hi, what is my location",
              "Hi, what is the temperature",
              "Hi, how are you",
            ].map((text, index) => (
              <Grid item={true} xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    ":hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <Typography variant="subtitle1">{text}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Get immediate AI generated response
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Fragment>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {currentChats.map((chat, index) => (
            <Box
              key={chat.id}
              sx={{ marginBottom: 2 }}
              ref={index === currentChats.length - 1 ? lastChatRef : null}
            >
              {/* My conversation */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar src={me} />
                <Box sx={{ marginLeft: 2 }}>
                  <Typography variant="h6">You</Typography>
                  <Typography variant="body1">{chat.question}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {chat.time}
                  </Typography>
                </Box>
              </Box>
              {/* Bot conversation */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 2,
                  ":hover .actions": { visibility: "visible" },
                }}
              >
                <Avatar src={conversationIcon} />
                <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
                  <Typography variant="h6">Soul AI</Typography>
                  <Typography variant="body1">{chat.answer}</Typography>
                  {chat.rating && (
                    <Rating
                      name="read-only"
                      value={chat.rating}
                      onChange={(event, newValue) =>
                        handleRating(chat.id, newValue)
                      }
                    />
                  )}
                  <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                    {chat.feedbackValue}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {chat.time}
                  </Typography>
                  <Box
                    className="actions"
                    sx={{
                      visibility: "hidden",
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: 1,
                    }}
                  >
                    <ThumbUpOutlinedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRating(chat.id, 5)}
                    />
                    <ThumbDownOutlinedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleOpen(chat.id)}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {loading ? (
        <Typography variant="h1">Loading</Typography>
      ) : (
        <Fragment>
          {/* Input Section */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: 4,
              width: "100%",
              maxWidth: 600,
              gap: "5px",
              position: "fixed",
              bottom: 0,
              padding: "1rem",
              zIndex: 1000,
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type your question here..."
              sx={{ marginRight: 2, backgroundColor: "white" }}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              required
            />
            <Button
              variant="contained"
              sx={{ background: "#D7C7F4" }}
              type="submit"
            >
              Ask
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ background: "#D7C7F4" }}
              onClick={saveChats}
            >
              Save Chats
            </Button>
          </Box>
        </Fragment>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex" }}>
            <Avatar src={bulb} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Provide Additional Feedback
            </Typography>
          </Box>
          <textarea
            style={{ width: "100%", height: "100%" }}
            value={feedbackValue}
            onChange={(e) => setFeedbackValue(e.target.value)}
          />
          <Button
            variant="filled"
            sx={{ background: "#D7C7F4" }}
            onClick={() => handleFeedBack()}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Chatbot;
