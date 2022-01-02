import { useEffect, useState } from 'react';
import skClient from 'socket.io-client';
import { useForm } from 'react-hook-form';
import { usePainel } from '../../contexts/painel';
import { TextField, Button } from '@mui/material';

const ENDPOINT = 'http://localhost:3333';

export default function ControlePage () {
  const [skConn, setSkConn] = useState(null);
  const { register, handleSubmit } = useForm();
  const { painel } = usePainel();

  useEffect(() => {
    const sk = skClient(ENDPOINT);
    sk.emit('enter in room', { painel });
    sk.on("enter a user", data => {
      console.log('data >>>', data);
    })
    setSkConn(sk);
  }, [painel]);

  function onSubmit (data) {
    skConn.emit('call password', { ...data, painel });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Local"
        { ...register('local') }
      />
      <TextField
        label="Senha"
        { ...register('senha') }
      />
      <Button
        variant="contained"
        type="submit"
      >
        Chamar
      </Button>
    </form>
  )
}
