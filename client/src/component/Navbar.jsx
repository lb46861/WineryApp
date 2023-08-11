import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import styles from '../css/Navbar.module.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LOGIN_PATH, REGISTRATION_PATH } from '../utils/constants';


import jwtDecode from 'jwt-decode';



function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState()

  const handleLogoutClick = (e) => {
    e.preventDefault()
    localStorage.removeItem('jwt')
    setUser(null);
    navigate(LOGIN_PATH)
  }

  useEffect(() => {
    if (localStorage['jwt']) {
      const decodedToken = jwtDecode(localStorage['jwt']);
      setUser({
        ...decodedToken
      });
    }
    else setUser(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage['jwt']]);


  return (
    <>
      <AppBar
        className='navbar'
        color='primary'
        elevation={0}
        position='relative'
      >
         <Toolbar className={styles.toolbar}>
          <Typography
            className={styles.title}
            color='inherit'
            variant='h6'
            ml={10}
          >
            Winery &nbsp;

            {(user) && (
              (user.role ==='administrator')
                ? (
                  <>
                    <Button color='inherit' variant='text' component={Link} to={`/`}> Home</Button>
                    <Button color='inherit' variant='text' component={Link} to={`/wine`}> Add Wine</Button>
                    <Button color='inherit' variant='text' component={Link} to={`/producer`}> Add Producer</Button>
                  </>
                )
                : <Button color='inherit' variant='text' component={Link} to={`/`}> Home</Button>
            )
            }
          </Typography>
          <Typography mr={10}>
            {user
              ? <Button onClick={handleLogoutClick} color='inherit' variant='outlined'>Logout</Button>
              : <>
              <Button color='inherit' variant='outlined' component={Link} to={LOGIN_PATH}>Login</Button> &nbsp;
              <Button color='inherit' variant='outlined' component={Link} to={REGISTRATION_PATH}>Register</Button>
              </>
            }
          </Typography>

        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar; 