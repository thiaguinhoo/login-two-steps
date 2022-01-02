import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function LoginForm ({ login }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(login)}>
      <TextField
        label="Usuário"
        variant="outlined"
        { ...register('jwtusername', { required: true }) }
      />
      <Button variant="contained" type="submit" size="large">Entrar</Button>
    </form>
  );
}
