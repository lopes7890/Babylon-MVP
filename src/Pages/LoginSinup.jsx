import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';
import './css/LoginSinup.css';

function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    telefone: '',
    senha: '',
    idade: '',
    genero: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // Novo estado para armazenar a mensagem de erro

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignup(!isSignup);
    setErrorMessage(''); // Limpa a mensagem de erro ao alternar
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? 'https://babylon-mvp-backend.onrender.com/usuario'
      : 'https://babylon-mvp-backend.onrender.com/login';

    const body = JSON.stringify(formData);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const text = await response.text();

      if (response.ok) {
        setErrorMessage(''); // Limpa a mensagem de erro no sucesso
        alert(
          isSignup
            ? 'Conta criada com sucesso!'
            : 'Login realizado com sucesso!'
        );
        navigate('/');
      } else {
        const data = text ? JSON.parse(text) : {};
        setErrorMessage(
          data.message || 'Ocorreu um erro ao processar a sua solicitação.'
        );
      }
    } catch (error) {
      console.error('Erro:', error);
      setErrorMessage('Erro ao enviar os dados. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="login-signup-container">
      <div className="form-wrapper">
        {isSignup ? (
          <div className="form-section">
            <h2>Crie sua Conta</h2>
            <form onSubmit={handleSubmit}>
              {/* Inputs de cadastro */}
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="gmail"
                placeholder="Gmail"
                value={formData.gmail}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="telefone"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="idade"
                placeholder="Idade"
                value={formData.idade}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="genero"
                placeholder="Gênero"
                value={formData.genero}
                onChange={handleChange}
                required
              />
              <button type="submit">Criar Conta</button>
            </form>
            {errorMessage && (
              <div className="error-message">
                <FaExclamationCircle className="error-icon" />
                {errorMessage}
              </div>
            )}
            <p className="switch-link">
              Já tem uma conta?{' '}
              <button onClick={handleToggle}>Faça login aqui</button>
            </p>
          </div>
        ) : (
          <div className="form-section">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="gmail"
                placeholder="Gmail"
                value={formData.gmail}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
              <button type="submit">Entrar</button>
            </form>
            {errorMessage && (
              <div className="error-message">
                <FaExclamationCircle className="error-icon" />
                {errorMessage}
              </div>
            )}
            <p className="switch-link">
              Não tem uma conta?{' '}
              <button onClick={handleToggle}>Crie uma aqui</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSignup;
