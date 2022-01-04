import { useForm } from 'react-hook-form';

export default function PainelForm ({ select, options }) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="global-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Painel de Senha</h3>
          <div className="card-text">
            <form onSubmit={handleSubmit(select)}>
              <div className="form-group">
                <label htmlFor="inputPainel">
                  Selecione um painel
                </label>
                <select
                  id="inputPainel"
                  className="form-select form-control"
                  { ...register('painel', { required: true }) }
                >
                  {
                    options.map((option, index) => (
                      <option value={option.value} key={index}>{option.label}</option>
                    ))
                  }
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
              >
                Selecionar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
