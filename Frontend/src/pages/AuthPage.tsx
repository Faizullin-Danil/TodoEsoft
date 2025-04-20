import { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { AuthPageState } from '../interfaces/IAuthPageState';
import { useNavigate } from 'react-router-dom'; 
import UserService from '../services/usersApi';
import { useAuth } from '../contexts/AuthContext';

const userService = new UserService();

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [formData, setFormData] = useState<AuthPageState>({
    firstName: '',
    lastName: '',
    patronymic: '',
    username: '',
    password: '',
    confirmPassword: '',
    error: null,
  });

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const timerError = (textError: string) => {
    setFormData(prevState => ({ ...prevState, error: textError }));
    setTimeout(() => setFormData(prevState => ({ ...prevState, error: null })), 2000);
  }

  const handleLogin = async () => {
    const { username, password } = formData;
    
    if (!username || !password) {
      timerError('Пожалуйста, заполните все поля');
      return;
    }

    const loginData = {
      login: username,
      password: password,
    };

    const response = await userService.login(loginData);

    if (response.data) {
      navigate('/tasks'); 
      setAuth(true);
    } else {
      timerError(response.message || 'Ошибка при авторизации');
    }
  };

  const handleRegister = async () => {
    const { firstName, lastName, patronymic, username, password, confirmPassword } = formData;

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

    setFormData(prevState => ({ ...prevState, error: null }));

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
      setAuth(true);
    } else {
      setFormData(prevState => ({ ...prevState, error: response.message || 'Ошибка при регистрации' }));
    }
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
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Фамилия"
              variant="outlined"
              fullWidth
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Отчество (не обязательно)"
              variant="outlined"
              fullWidth
              value={formData.patronymic}
              onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
              sx={{ mb: 2 }}
            />
          </>
        )}

        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          sx={{ mb: 2 }}
        />

        {isRegistering && (
          <TextField
            label="Повторите пароль"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            sx={{ mb: 2 }}
          />
        )}

        {formData.error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {formData.error}
          </Typography>
        )}

        <Button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setFormData({
              ...formData,
              error: null,
              username: '',
              password: '',
            });
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
