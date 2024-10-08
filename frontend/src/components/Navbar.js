import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  tableBodyClasses
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BookIcon from '@mui/icons-material/Book';
import BarChartIcon from '@mui/icons-material/BarChart';

const Navbar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = () => {
    navigate('/profile');
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, link: '/home' },
    { text: 'Events', icon: <EventIcon />, link: '/events' },
    { text: 'Quizzes', icon: <EmojiEventsIcon />, link: '/quizzes' },
    {text: 'Training', icon: <BookIcon />, link: '/training'},
    { text: 'Manage', icon: <AdminPanelSettingsIcon />, link: '/' },
    { text: 'Insights', icon: <BarChartIcon />, link: '/insights' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white', 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: isSmallScreen ? '0 10px' : '0 20px', 
        }}
      >
        <Toolbar>
          {/* Menu Icon for Drawer */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              marginRight: 2,
              color: '#333',
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo / Title */}
          {isSmallScreen ? null : (
            <Typography
              variant="h6"
              component={Link}
              to="/home"
              sx={{
                color: 'black',
                textDecoration: 'none',
                flexGrow: 1,
                fontWeight: 'bold',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Circular logo */}
              <Box
                component="img"
                src="https://cdn.prod.website-files.com/5dbfd0c08b3107b843917e24/6017ba951aa635c7c910d37e_Zubin%20Logo.png"
                alt="zubin"
                sx={{
                  width: 75,
                  height: 75,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '10px',
                }}
              />
              The Zubin Foundation
            </Typography>
          )}
          {user ? (<Box sx={{width:65, 
            display:'flex', 
            flexDirection:'row', 
            justifyContent:'center', 
            backgroundColor: '#FDDA0D', 
            borderRadius:'20px',
            boxShadow: '0 0 5px 5px lightyellow',}}>
            <Typography variant="body1" sx={{color: '#FFF', fontSize: 14}}>
            2750 
            </Typography>
            <StarIcon sx={{fontSize: 18, color:'#FFF'}}/>
          </Box>) : null}
          {/* Profile Icon - Floated right on small screens */}
          {user ? (
            <Box sx={{ ml: isSmallScreen ? 'auto' : 'none' }}>
              <IconButton onClick={handleProfileMenuOpen}>
                <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundImage: `url("profile.jpg")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ ml: isSmallScreen ? 'auto' : 'none' }}>
              <Button
                component={Link}
                to="/login"
                variant="text"
                sx={{ marginRight: 2 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="text"
              >
                Signup
              </Button>
            </Box>
          )}          
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 250,
            backgroundColor: '#ffffff',
            height: '100%',
          }}
          role="presentation"
          onClick={handleDrawerToggle}
        >
          {!isSmallScreen ? null : (
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{
              color: '#333',
              textDecoration: 'none',
              flexGrow: 1,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 600,
              fontSize: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            {/* Logo and text in a vertical stack */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                mt: 4,
                mb: 3,
              }}
            >
              {/* Circular logo */}
              <Box
                component="img"
                src="https://cdn.prod.website-files.com/5dbfd0c08b3107b843917e24/6017ba951aa635c7c910d37e_Zubin%20Logo.png"
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  objectFit: 'cover', 
                  marginBottom: '2px',
                }}
              />
              
              {/* Text below the logo */}
              <Typography
                sx={{
                  fontSize: '100%',
                  fontWeight: 'bold',
                  ml: 2.5,
                }}
              >
                The Zubin Foundation
              </Typography>
            </Box>  
          </Typography>      
          )}
          <List>
            {menuItems.map((item, index) => (
              (((item.text === "Manage" || item.text === "Insights") && user?.isAdmin===false) || (!user && (item.text === "Manage" || item.text === "Insights") )) ? null: (
                <ListItem
                  button
                  key={index}
                  component={Link}
                  to={item.link}
                  sx={{
                    '&:hover': {
                      borderRight: '5px solid #f9ef1f',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#01a9ff', marginRight: '-15px' }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: 'rgb(70, 70, 70)',
                      fontSize: '1rem',
                    }}
                  />
                </ListItem>
              )
            ))}
          </List>
        </Box>
      </Drawer>

      <Box sx={{ marginTop: '64px' }}>
      </Box>
    </Box>
  );
};

export default Navbar;
