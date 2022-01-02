import { useForm } from 'react-hook-form';
import { MenuItem, Button, TextField, Box, Paper } from '@mui/material';

export default function PainelForm ({ select, options }) {
  const { register, handleSubmit } = useForm();

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f3f3f3"
    >
      <Paper
        style={{
          width: 450,
          padding: "24px 48px 32px",
          display: 'flex',
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
        }}
      >
      <form onSubmit={handleSubmit(select)}>
        <Box>
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
        </Box>
        <Box>
          <Button
            variant="contained"
            size="large"
            type="submit"
            fullWidth
          >
            Selecionar
          </Button>
          </Box>
      </form>
      </Paper>
    </Box>
  )
}
