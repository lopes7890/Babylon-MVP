import React, { useEffect, useState } from "react";
import { FaUpload, FaEdit } from "react-icons/fa"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "./css/Profile.css";
import Modal from "../Components/Modal/Modal";
import perfil from "../assets/perfil_padrao.png";

function Profile() {
  const [userData, setUserData] = useState({});
  const [bestSeller, setBestSeller] = useState({});
  const [publishedBooks, setPublishedBooks] = useState([]);
  const [newAvatar, setNewAvatar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://babylon-mvp-backend.onrender.com/api/user-profile")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        setBestSeller(data.bestSeller);
        setPublishedBooks(data.publishedBooks);
      })
      .catch((error) =>
        console.error("Erro ao buscar dados do perfil:", error)
      );
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
    };
    reader.readAsDataURL(file);

    setIsModalOpen(true);
  };

  const saveAvatar = () => {
    if (newAvatar) {
      const formData = new FormData();
      formData.append("avatar", newAvatar);

      fetch("/api/user-profile/avatar", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(() => {
          toast.success("Avatar atualizado com sucesso!"); 
          setIsModalOpen(false); 
        })
        .catch((error) => {
          toast.error("Erro ao atualizar o avatar."); 
          console.error("Erro ao atualizar o avatar:", error);
        });
    }
  };

  const handleWithdraw = () => {
    // Simulação de saque
    toast.success("Saque realizado com sucesso!"); // Notificação de sucesso ao sacar
  };

  return (
    <div className="profile-container">
      <div className="user-info">
        <div
          className="avatar"
          style={{
            backgroundImage: `url(${userData.avatarUrl || perfil})`,
          }}
        >
          <input type="file" id="avatar-upload" onChange={handleAvatarChange} />
          <label htmlFor="avatar-upload" className="avatar-edit-icon">
            <FaUpload className="icon-upload" /> {/* Ícone de upload */}
          </label>
        </div>
        <h2>{userData.name}</h2>
        <div className="stats">
          <p>
            <strong>{userData.followers}</strong> seguidores
          </p>
          <p>
            <strong>{userData.following}</strong> Seguindo
          </p>
        </div>
        <div className="balance">
          <p>Saldo: R${userData.balance}</p>
          <button onClick={handleWithdraw}>Sacar</button>
        </div>
      </div>

      <div className="best-seller">
        <h3>Mais vendido!!</h3>
        <div
          className="book-cover"
          style={{ backgroundImage: `url(${bestSeller.coverUrl})` }}
        ></div>
        <p>{bestSeller.title}</p>
      </div>

      <div className="published-books">
        <h3>Livros publicados:</h3>
        <div className="books">
          {publishedBooks.map((book, index) => (
            <div
              key={index}
              className="book-cover"
              style={{ backgroundImage: `url(${book.coverUrl})` }}
            >
              <p>{book.title}</p>
              <FaEdit className="icon-edit" /> {/* Ícone de edição */}
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveAvatar}
      />

      {/* Container do Toastify */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default Profile;
