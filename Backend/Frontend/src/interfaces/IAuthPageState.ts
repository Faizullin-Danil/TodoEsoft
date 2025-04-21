export interface AuthPageState {
  firstName: string;
  lastName: string;
  patronymic: string;
  username: string;
  password: string;
  confirmPassword: string;
  error: string | null;
}