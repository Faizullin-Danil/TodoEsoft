import { Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname === '/'; // если ты так назвал свою страницу авторизации

  return (
    <Box 
      sx={{
        display: 'flex',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: '50px',
        px: 2,
        zIndex: 1000,
      }}
    >
      {!isAuthPage && auth && (
        <Link to='/'>
          <Button
            onClick={() => {
              setAuth(false);
              localStorage.clear();
            }}
            sx={{ color: 'white', '&:focus': { outline: 'none' } }}
          >
            Выйти
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default Header;
