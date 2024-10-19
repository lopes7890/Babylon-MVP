import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaExclamationCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCalendarAlt,
  FaVenusMars,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa'; // Ícones adicionados
import './css/LoginSinup.css';
import { useLogged } from '../contexts/loggedContext';
import useGetQueryParameters from '../utils/useGetQueryParameters';

function LoginSignup() {
  const { login, setUserData } = useLogged();
  const [isSignup, setIsSignup] = useState(false);
  const [auth] = useGetQueryParameters('auth');

  useEffect(() => {
    if (auth === 'signup') setIsSignup(true);
  }, [auth]);

  const [formData, setFormData] = useState({
    nome: '',
    gmail: '',
    telefone: '',
    senha: '',
    idade: '',
    genero: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignup(!isSignup);
    setErrorMessage('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      const responseParsed = JSON.parse(text);

      if (response.ok) {
        setErrorMessage('');
        alert(
          isSignup
            ? 'Conta criada com sucesso!'
            : 'Login realizado com sucesso!'
        );

        if (isSignup) {
          setUserData({
            ...formData,
            senha: null,
          });
        } else {
          setUserData({
            ...formData,
            senha: null,
            nome: responseParsed.usuario,
          });
        }

        login();
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
              {/* Inputs de cadastro com ícones */}
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="gmail"
                  placeholder="Gmail"
                  value={formData.gmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <FaPhone className="input-icon" />
                <input
                  type="text"
                  name="telefone"
                  placeholder="Telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'} // Alterna entre texto e senha
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="toggle-password-icon"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="toggle-password-icon"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              <div className="input-group">
                <FaCalendarAlt className="input-icon" />
                <input
                  type="number"
                  name="idade"
                  placeholder="Idade"
                  value={formData.idade}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <FaVenusMars className="input-icon" />
                <input
                  type="text"
                  name="genero"
                  placeholder="Gênero"
                  value={formData.genero}
                  onChange={handleChange}
                  required
                />
              </div>
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
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="gmail"
                  placeholder="Gmail"
                  value={formData.gmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'} // Alterna entre texto e senha
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="toggle-password-icon"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="toggle-password-icon"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
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
