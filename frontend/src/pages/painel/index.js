import { useEffect, useState } from 'react';
import skClient from 'socket.io-client';

import { usePainel } from '../../contexts/painel';
import '../../utils/extenso';
import Table from './table';

const ENDPOINT = 'http://localhost:3333';

export default function PainelPage () {
  const { painel } = usePainel();
  const [calls, setCalls] = useState([]);
  const [call, setCall] = useState({});
  const [cc, setCC] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);

  function playAudio (data) {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 3000);
  }

  function execute () {
    if (cc.length > 0) {
      if (!isExecuting) {
        console.log('Executing ...');
        playAudio(cc[0]);
      }
    }
  }

  useEffect(() => {
    execute();
  }, [cc]);

  function getAudio (senha) {
    let output = [];
    let outSenha = senha
    if (senha[0] === 'C') {
      output.push('complementares');
      outSenha = outSenha.substring(1, outSenha.length);
    } else if (senha[0] === 'P') {
      output.push('Preferencial');
      outSenha = outSenha.substring(1, outSenha.length);
    }
    output = [...output, ...outSenha.extenso().split(' ')];
    setCC((oldCC) => [...oldCC, output]);
  }

  useEffect(() => {
    const sk = skClient(ENDPOINT);
    
    sk.emit('enter in room', { painel });

    sk.on('received password', data => {
      const [senha, nome] = data.senha.split("_");
      const call = { senha, nome, local: data.local };
      setCall(call);
      setCalls((oldCalls) => {
        if (oldCalls.length >= 5) {
          return [call, ...oldCalls.slice(0, -1)]
        }
        return [call, ...oldCalls]
      });
      getAudio(senha);
    })
  }, [painel]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-sm text-center border border-1 text-uppercase">
          { call.nome }
        </div>
        <div className="col-sm text-center border border-1 text-uppercase">
          { call.senha }
        </div>
      </div>
      <div className="row">
        <div className="text-end border border-1 text-uppercase">
          { call.local }
        </div>
      </div>
      <Table calls={calls} />
    </div>
  )
}
