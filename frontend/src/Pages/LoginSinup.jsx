// LoginSignup.jsx
import React, { useState } from 'react';
import './css/LoginSinup.css';

function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);

  const handleToggle = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="login-signup-container">
      <div className="form-wrapper">
        {isSignup ? (
          <div className="form-section">
            <h2>Crie sua Conta</h2>
            <form>
              <input type="text" placeholder="Nome" required />
              <input type="email" placeholder="E-mail" required />
              <input type="password" placeholder="Senha" required />
              <button type="submit">Criar Conta</button>
            </form>
            <p className="switch-link">
              Já tem uma conta? <button onClick={handleToggle}>Faça login aqui</button>
            </p>
          </div>
        ) : (
          <div className="form-section">
            <h2>Login</h2>
            <form>
              <input type="email" placeholder="E-mail" required />
              <input type="password" placeholder="Senha" required />
              <button type="submit">Entrar</button>
            </form>
            <p className="switch-link">
              Não tem uma conta? <button onClick={handleToggle}>Crie uma aqui</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSignup;
