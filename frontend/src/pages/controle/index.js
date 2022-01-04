import { useEffect, useState } from 'react';
import skClient from 'socket.io-client';
import { useForm } from 'react-hook-form';
import { usePainel } from '../../contexts/painel';

const ENDPOINT = 'http://localhost:3333';

export default function ControlePage () {
  const [skConn, setSkConn] = useState(null);
  const { register, handleSubmit } = useForm();
  const { painel } = usePainel();

  useEffect(() => {
    const sk = skClient(ENDPOINT);
    sk.emit('enter in room', { painel });
    sk.on("enter a user", data => {})
    setSkConn(sk);
  }, [painel]);

  function onSubmit (data) {
    skConn.emit('call password', { ...data, painel });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label htmlFor="inputLocal">Local</label>
        <input { ...register('local', { required: true }) } />
      </div>
      <div className="form-control">
        <label htmlFor="inputSenha">Senha</label>
        <input { ...register('senha', { required: true }) } />
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
      >
        Chamar
      </button>
    </form>
  )
}
