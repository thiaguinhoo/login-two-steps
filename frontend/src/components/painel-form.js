import { useForm } from 'react-hook-form';
import { MenuItem, Button, TextField } from '@mui/material';

export default function PainelForm ({ select, options }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(select)}>
      <TextField
        select
        label="Painel"
        helperText="Selecione o painel"
        { ...register('painel', { required: true }) }
      >
        {options.map((option, index) => (
          <MenuItem key={ index } value={ option.value }>
            { option.label }
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        size="large"
        type="submit"
      >
        Selecionar
      </Button>
    </form>
  )
}
