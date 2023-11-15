import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Drawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const LOGOUT_URL ='/logout';

const NavBar = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      axios.get(LOGOUT_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }); 
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
    }
    
    navigate('/');
  }

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970"}}>
        { 
          isMatch? (
              <Box 
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px'}}
              >
                <Typography sx={{ ml: '20px', mr: '50px', fontWeight: 'bold'}}>APP_NAME</Typography>
                <Drawer />
              </Box>
          ) : (
            <Toolbar>
              <Drawer />
              <Typography sx={{ ml: '20px', mr: '50px', fontWeight: 'bold'}}>APP_NAME</Typography>
              <Tabs 
                textColor='inherit' 
                value={value} 
                onChange={(e, value) => setValue(value)} 
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "white"
                  }
                }}
              >
                <Tab label='Home'/>
                <Tab label='About' />
                <Tab label='Services' />
                <Tab label='Contact' />
              </Tabs>
              
              {user ? (
                <Box sx={{ marginLeft: "auto" }}>
                  <Typography sx={{ ml: 'auto'}} variant='contained' >Hello, {user.first_name}</Typography>
                  <Button sx={{ marginLeft: "30px" }} variant='contained' onClick={handleLogout}>Logout{" "}</Button>
                </Box>
              ) : (
                <Box sx={{ marginLeft: "auto" }}>
                  <Button sx={{ marginLeft: "auto" }} variant='contained' href='/login'>Login{" "}</Button>
                  <Button sx={{ marginLeft: "10px" }} variant='contained' href='/signUp'>Sign Up{" "}</Button>
                </Box>
              )}
            </Toolbar>
          )
        }
      </AppBar>
    </React.Fragment>
  )
}

export default NavBar;