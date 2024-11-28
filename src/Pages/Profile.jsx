import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt, FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Profile.css';
import Modal from '../Components/Modal/Modal';
import perfil from '../assets/perfil_padrao.png';
import useLogged from '../contexts/loggedContext';

function Profile() {
  const [userData, setUserData] = useState({
    balance: 0,
  });
  const [bestSeller, setBestSeller] = useState({});
  const [publishedBooks, setPublishedBooks] = useState([]);
  const [newAvatar, setNewAvatar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, userData: dadosUsuario } = useLogged();

  useEffect(() => {
    fetch('https://babylon-mvp-backend.onrender.com/api/user-profile')
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        setBestSeller(data.bestSeller);
        setPublishedBooks(data.publishedBooks);

        // Salvar avatar no localStorage
        if (data.user.avatarUrl) {
          localStorage.setItem('avatarUrl', data.user.avatarUrl);
        }
      })
      .catch((error) =>
        console.error('Erro ao buscar dados do perfil:', error)
      );
  }, []);

  useEffect(() => {
    // Recuperar avatar do localStorage
    const storedAvatarUrl = localStorage.getItem('avatarUrl');
    if (storedAvatarUrl) {
      setUserData((prevState) => ({
        ...prevState,
        avatarUrl: storedAvatarUrl,
      }));
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData((prevState) => ({
        ...prevState,
        avatarUrl: reader.result,
      }));

      // Salvar avatar no localStorage
      localStorage.setItem('avatarUrl', reader.result);
    };
    reader.readAsDataURL(file);

    setIsModalOpen(true);
  };

  const saveAvatar = () => {
    if (newAvatar) {
      const formData = new FormData();
      formData.append('file', newAvatar);

      fetch('https://babylon-mvp-backend.onrender.com/imagem', {
        method: 'POST',
        headers: { authorization: dadosUsuario.token },
        body: formData,
      })
        .then((response) => response.json())
        .then(() => {
          toast.success('Avatar atualizado com sucesso!');
          setIsModalOpen(false);
        })
        .catch((error) => {
          toast.error('Erro ao atualizar o avatar.');
          console.error('Erro ao atualizar o avatar:', error);
        });
    }
  };

  const handleWithdraw = () => {
    toast.success('Saque realizado com sucesso!');
  };

  return (
    <div className="profile-container">
      <div className="user-info">
        <div className="infos-initial">
          <span className="userName">
            {isLoggedIn ? dadosUsuario.nome : 'Faça login'}
          </span>
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${userData.avatarUrl || perfil})`,
            }}
          >
            <input
              type="file"
              id="avatar-upload"
              onChange={handleAvatarChange}
              hidden
            />
            <label htmlFor="avatar-upload" className="avatar-edit-icon">
              <FaCloudUploadAlt className="icon-upload" />
            </label>
          </div>
        </div>
        <h2>{userData.name}</h2>
        <div className="stats">
          <p>
            Seguidores: <strong>{userData.followers || 0}</strong>
          </p>
          <p>
            Seguindo: <strong>{userData.following || 0}</strong>
          </p>
        </div>
        <div className="balance">
          <p>
            Saldo:{' '}
            {userData.balance.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <button onClick={handleWithdraw}>Sacar</button>
        </div>
      </div>

      <div className="best-seller">
        <h3>Mais Vendido</h3>
        <div
          className="book-cover"
          style={{ backgroundImage: `url(${bestSeller.coverUrl})` }}
        ></div>
        <p>{bestSeller.title}</p>
      </div>

      <div className="published-books">
        <h3>Livros Publicados</h3>
        <div className="books">
          {publishedBooks.map((book, index) => (
            <div
              key={index}
              className="book-cover"
              style={{ backgroundImage: `url(${book.coverUrl})` }}
            >
              <p>{book.title}</p>
              <FaEdit className="icon-edit" />
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveAvatar}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default Profile;
