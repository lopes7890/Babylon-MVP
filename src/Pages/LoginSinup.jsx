import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
} from 'react-icons/fa';
import './css/LoginSinup.css';
import { useLogged } from '../contexts/loggedContext';
import useGetQueryParameters from '../utils/useGetQueryParameters';

function LoginSignup() {
  const { login, setUserData } = useLogged();
  const [isSignup, setIsSignup] = useState(false);
  const [auth] = useGetQueryParameters('auth');

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^\d]/g, ''); // Aceita apenas números
    setFormData({
      ...formData,
      telefone: formattedValue,
    });
  };

  // Função para remover caracteres especiais e permitir apenas letras e espaços
  const handleNameChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
    setFormData({
      ...formData,
      nome: formattedValue,
    });
  };

  // Função para validar o campo de gênero (apenas letras)
  const handleGenderChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^a-zA-Z]/g, ''); // Aceita apenas letras
    setFormData({
      ...formData,
      genero: formattedValue,
    });
  };

  // Trocar para a pagina de cadastro caso se o usuario tiver clicado no botao de cadastro
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

      const data = await response.json();
      if (response.ok) {
        setErrorMessage('');
        toast.success(
          isSignup
            ? 'Conta criada com sucesso!'
            : 'Login realizado com sucesso!'
        );
        setUserData({
          ...formData,
          nome: data.usuario,
          senha: null,
          token: data.token,
        });
        login();
        navigate('/');
      } else if (response.status === 409) {
        // Erro 409 para conflito de dados (e-mail ou telefone já cadastrados)
        toast.error(data.message); // Esperando que o backend retorne uma mensagem apropriada
      } else {
        toast.error('Ocorreu um erro ao processar a sua solicitação.');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao enviar os dados. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="login-signup-container">
      <ToastContainer />
      <div className="form-wrapper">
        {isSignup ? (
          <div className="form-section">
            <h2>Crie sua Conta</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleNameChange}
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
                  onChange={handlePhoneChange}
                  required
                />
              </div>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
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
                  onChange={handleGenderChange}
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
                  type={showPassword ? 'text' : 'password'}
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
