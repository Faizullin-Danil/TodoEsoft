import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const Header = () => {
  const { auth, setAuth } = useAuth();

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
      {/* <Link to='/tasks'>
        <Button sx={{ color: 'white', '&:focus': { outline: 'none' } }}>
          Задачи
        </Button>
      </Link> */}

        {auth && <Link to='/'>
          <Button onClick={() => setAuth(false)} sx={{ color: 'white', '&:focus': { outline: 'none' } }}>
            Выйти
          </Button>
        </Link>}
    </Box>
  );
};

export default Header;
