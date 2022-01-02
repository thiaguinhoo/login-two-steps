import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../../components/login-form';
import PainelForm from '../../components/painel-form';
import { useAuth } from '../../contexts/auth';
import { usePainel } from '../../contexts/painel';
import { api } from '../../services/api';

export default function LoginPage () {

  const [isSelectPainel, setIsSelectPainel] = useState(false);
  const [paineisOptions, setPaineisOptions] = useState([]);
  const { setAuth } = useAuth();
  const { setPainelData } = usePainel();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, [])

  async function login (data) {
    const req = await api();
    try {
      const res = await req.post('/', data);
      if (res.status === 200) {
        const { tokenKey } = res.data;
        localStorage.setItem("@App:Token_Key", tokenKey);
        const resGet = await req.get('/get-painel', {
          headers: {
            tokenKey
          }
        })
        setIsSelectPainel(true);
        setPaineisOptions(resGet.data);
      }
    } catch (err) {}
  }

  function select (data) {
    setPainelData(data.painel);
    setAuth(true);
    navigate('/home');
  }

  if (isSelectPainel) {
    return (
      <PainelForm
        select={ select }
        options={ paineisOptions }
      />
    )
  }

  return (
    <LoginForm login={ login } />
  );
}
