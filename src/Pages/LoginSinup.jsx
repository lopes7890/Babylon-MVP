import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginSinup.css';

function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    phone: '',
    password: '',
    age: '',
    gender: '',
  });

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignup(!isSignup);
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
      ? 'https://babylon-mvp-backend.onrender.com/user'
      : 'https://babylon-mvp-backend.onrender.com/login';

    // const url = isSignup
    //   ? 'http://localhost:8080/user'
    //   : 'http://localhost:8080/login';

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
        const data = text ? JSON.parse(text) : {};
        alert(
          isSignup
            ? 'Conta criada com sucesso!'
            : 'Login realizado com sucesso!'
        );

        navigate('/');
      } else {
        const data = text ? JSON.parse(text) : {};
        alert(data.message || 'Ocorreu um erro.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar os dados.');
    }
  };

  return (
    <div className="login-signup-container">
      <div className="form-wrapper">
        {isSignup ? (
          <div className="form-section">
            <h2>Crie sua Conta</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
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
                name="phone"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Idade"
                value={formData.idade}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="gender"
                placeholder="Gênero"
                value={formData.genero}
                onChange={handleChange}
                required
              />
              <button type="submit">Criar Conta</button>
            </form>
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
                name="password"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
              <button type="submit">Entrar</button>
            </form>
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
