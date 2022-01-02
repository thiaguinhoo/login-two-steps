import { Link } from 'react-router-dom';

export default function Home () {
  return (
    <div>
      <div>
        <Link to="/controle">Controle</Link>
      </div>
      <div>
        <Link to="/painel">Painel</Link>
      </div>
    </div>
  )
}
