export default function Table ({ calls }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col border border-1">Nome</th>
          <th scope="col border border-1">Senha</th>
          <th scope="col">Local</th>
        </tr>
      </thead>
      <tbody>
        {
          calls.map((call, index) => (
            <tr key={index} className={ index % 2 ? "table-primary text-uppercase" : "text-uppercase" }>
              <td>{call.nome}</td>
              <td>{call.senha}</td>
              <td>{call.local}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}