import { useRef, useEffect, useState } from 'react';
import skClient from 'socket.io-client';
import { usePainel } from '../../contexts/painel';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import '../../utils/extenso';

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
      output.push('preferencial');
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
        if (oldCalls.length >= 3) {
          return [call, ...oldCalls.slice(0, -1)]
        }
        return [call, ...oldCalls]
      });
      getAudio(senha);
    })
  }, [painel]);

  return (
    <Box>
      <Box>
        <Box>
          { call?.nome }
        </Box>
        <Box>
          { call?.senha }
        </Box>
      </Box>
      <Box>
        <Box>
          { call?.local }
        </Box>
      </Box>
      <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Nome
              </TableCell>
              <TableCell>
                Senha
              </TableCell>
              <TableCell>
                Local
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              calls.map((call, index) => (
                <TableRow key={index}>
                  <TableCell>
                    { call.nome }
                  </TableCell>
                  <TableCell>
                    { call.senha }
                  </TableCell>
                  <TableCell>
                    { call.local }
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      <audio>
        <source src="../../sons/cem.wav" type="audio/wav" />
      </audio>
    </Box>
  )
}
