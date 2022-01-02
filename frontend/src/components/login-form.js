import { useForm } from 'react-hook-form';

export default function LoginForm ({ login }) {
  const { register, handleSubmit } = useForm();

  return (
    <div class="global-container">
      <div class="card login-form">
      <div class="card-body">
        <h3 class="card-title text-center">Painel de Senha</h3>
        <div class="card-text">
          <form onSubmit={handleSubmit(login)}>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label for="inputUser">Usuário</label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="inputUser"
                aria-describedby="userHelp"
                { ...register('jwtusername', { required: true })}
              />
            </div>
            <div className="form-group">
              <label for="inputPassword">Senha</label>
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
