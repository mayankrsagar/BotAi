import React, {
  Fragment,
  useState,
} from 'react';

import { Drawer } from '@mui/material';
import Grid from '@mui/material/Grid2';

import Navbar from '../../components/Navbar/Navbar';
import NewConversation from '../../components/New Conversation/NewConversation';
import PastChats from '../../components/PastChats/PastChats';

const PastConversation = () => {
const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

    return (
        <Fragment>
          <Grid
            container
            spacing={2}
            sx={{ height: "100vh", position: "relative" }}
          >
            <Drawer
              open={open}
              onClose={toggleDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "240px", // Set width of the drawer
                  boxSizing: "border-box",
                },
              }}
            >
              <NewConversation />
            </Drawer>
    
            {/* Sidebar for larger screens */}
            <Grid
              item={true}
              xs={0}
              md={3}
              sx={{
                display: { xs: "none", md: "block" },
                backgroundColor: "#f9f9f9",
                position: "sticky",
                top: 0, 
                overflowY: "auto", 
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <NewConversation />
            </Grid>
            <Grid
              item={true}
              size={{ xs: 12, md: 9 }}
              sx={{
                background:
                  "linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)",
                width:"100%"
                }}
            >
              <Navbar toggleDrawer={toggleDrawer} />
              <PastChats />
            </Grid>
          </Grid>
        </Fragment>
      );
}

export default PastConversation