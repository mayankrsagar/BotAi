import {
  Fragment,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import {
  Avatar,
  Box,
  Rating,
  Typography,
} from '@mui/material';

import { AppContext } from '../../App';
import conversationIcon from '../../assets/conversationInsideIcon.png';
import me from '../../assets/me.png';

const PastChats = () => {
  const [allChats, setAllChats] = useState([]);
  const [filteredChats,setFilteredChats]=useState(()=>{
    return JSON.parse(localStorage.getItem("allConversations"))||[];
  });
  const { allConversations } = useContext(AppContext);
const [sorting,setSorting]=useState("All")
  useEffect(() => {
    const storedChats = localStorage.getItem("allConversations");
    setAllChats(storedChats ? JSON.parse(storedChats) : allConversations);
  }, [allConversations]);

const handleSelect=(e)=>{
  const {value}=e.target;
  setSorting(value);
  if(value==="All"){
    setFilteredChats(allChats);
  }else{
    const filteredRating=allChats.filter(ele=>String(ele.rating)===value[0]);
    setFilteredChats(filteredRating);
  }

}

  return (
    <Fragment>
      <Box sx={{position:"fixed", top:"4rem"}}>
        <select name="rating" id="rating" value={sorting} onChange={handleSelect}>
          {["All","1 Star","2 Star","3 Star", "4 Star", "5 Star"].map(ele=>(
            <option key={ele} value={ele}>
               {ele} Stars
            </option>
          ))}
        </select>
      </Box>
      {filteredChats.length === 0 ? (
        <Link to="/" style={{ textDecoration: "none", color: "#D7C7F4" }}>
          Click here to start a new conversation
        </Link>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", margin: "5rem 0 1rem 2rem" }}>
          {filteredChats.map((chat, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              {/* User's Conversation */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar src={me} alt="User Avatar" />
                <Box sx={{ marginLeft: 2 }}>
                  <Typography variant="h6">You</Typography>
                  <Typography variant="body1">{chat.question}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {chat.time}
                  </Typography>
                </Box>
              </Box>

              {/* Bot's Conversation */}
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                <Avatar src={conversationIcon} alt="Bot Avatar" />
                <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
                  <Typography variant="h6">Soul AI</Typography>
                  <Typography variant="body1">{chat.answer}</Typography>
                  {chat.rating && <Rating name="read-only" value={chat.rating} readOnly />}
                  {chat.feedbackValue && (
                    <Typography variant="body1" sx={{ fontWeight: "bold", marginTop: 1 }}>
                      {chat.feedbackValue}
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary">
                    {chat.time}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Fragment>
  );
};

export default PastChats;
