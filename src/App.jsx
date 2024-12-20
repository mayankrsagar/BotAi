import {
  createContext,
  useState,
} from 'react';

import { Outlet } from 'react-router-dom';

// import './App.css'
export  const AppContext = createContext();
function App() {
 
  // const [chats, setChats] = useState(() => localStorage.getItem("chats") || []);
  const [currentChats, setCurrentChats]=useState([]);
  const [allConversations, setAllConversations]=useState(()=>{
    return JSON.parse(localStorage.getItem("allConversation"))||[]
  });
  return (
    <>
      <AppContext.Provider value={{currentChats, setCurrentChats, allConversations, setAllConversations}}>
      <Outlet />
      </AppContext.Provider>
    </>
  );
}

export default App;
