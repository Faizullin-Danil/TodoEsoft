import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; 


import UserService from '../services/usersApi';
import { useAuth } from '../contexts/AuthContext';
const userService = new UserService();



const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const timerError = (textError: string) => {
    setError(textError)
    setTimeout(() => {setError('')}, 2000);
  }

  const handleLogin = async () => {
    if (!username || !password) {
      timerError('Пожалуйста, заполните все поля')

      return;
    }

    const loginData = {
      login: username,
      password: password,
    };

    const response = await userService.login(loginData);

    if (response.data) {
      navigate('/tasks'); 
      setAuth(true)
    } else {
      timerError(response)
    }
    console.log(response)
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      timerError('Пожалуйста, заполните все обязательные поля');
      return;
    }
  
    if (password !== confirmPassword) {
      timerError('Пароли не совпадают');
      return;
    }
  
    if (username.length < 5) {
      timerError('Логин должен содержать минимум 5 символов');
      return;
    }
  
    if (password.length < 6) {
      timerError('Пароль должен содержать минимум 6 символов');
      return;
    }
  
    setError(null);
  
    const regData = {
      name: firstName,
      lastname: lastName,
      patronymic: patronymic || '',
      login: username,
      password: password,
    };
  
    const response = await userService.registration(regData);

    if (response.data) {
      navigate('/tasks'); 
      setAuth(true)
    } else {
      setError(response)
    }
    // console.log(response)
  };
  
  

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 5,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          {isRegistering ? 'Регистрация' : 'Авторизация'}
        </Typography>

        {isRegistering && (
          <>
            <TextField
              label="Имя"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Фамилия"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Отчество (не обязательно)"
              variant="outlined"
              fullWidth
              value={patronymic}
              onChange={(e) => setPatronymic(e.target.value)}
              sx={{ mb: 2 }}
            />
          </>
        )}

        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        {isRegistering && (
          <TextField
            label="Повторите пароль"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError(null);
            setUsername('')
            setPassword('')
          }}
          sx={{ mb: 2 }}
        >
          {isRegistering ? 'Уже зарегистрированы?' : 'Нет аккаунта? Зарегистрируйтесь'}
        </Button>

        <Button
          variant="contained"
          fullWidth
          onClick={isRegistering ? handleRegister : handleLogin}
        >
          {isRegistering ? 'Зарегистрироваться' : 'Войти'}
        </Button>
      </Box>
    </Container>
  );
};

export default AuthPage;
