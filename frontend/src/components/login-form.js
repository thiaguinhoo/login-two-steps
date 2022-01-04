import { useForm } from 'react-hook-form';

export default function LoginForm ({ login }) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="global-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Painel de Senha</h3>
          <div className="card-text">
            <form onSubmit={handleSubmit(login)}>
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label htmlFor="inputUser" className="form-label">Usuário</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="inputUser"
                  aria-describedby="userHelp"
                  { ...register('jwtusername', { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword" className="form-label">Senha</label>
                <a href="#/" style={{ float: 'right', fontSize: '12px' }}>
                  Esqueceu a senha?
                </a>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="inputPassword"
                  { ...register('jwtpassword', { required: true })}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
              >
                Próximo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
