import React, { Fragment } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Typography,
} from '@mui/material';

import styles from './Navbar.module.css';

const Navbar = ({ toggleDrawer }) => {
  const navigation=useNavigate();
  return (
    <Fragment>
      <Box
        className={styles.navbar}
        sx={{
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          zIndex: 10,
          width: "100%",
          height: "64px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          cursor:"pointer"
        }}
      >
        <MenuIcon
          sx={{ cursor: "pointer", display: { xs: "block", md: "none" } }}
          onClick={toggleDrawer(true)}
        />
        <Link to="/" style={{textDecoration:"none"}}>
        <Typography variant="h5" fontWeight="bold">
          Bot AI
        </Typography></Link>
        
      </Box>
    </Fragment>
  );
};

export default Navbar;
