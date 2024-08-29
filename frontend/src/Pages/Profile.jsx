import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import editar from "../assets/profile_edit.png";
import Modal from "../Components/Modal/Modal"; // Importa o componente Modal
import perfil from "../assets/perfil_padrao.png";

function Profile() {
  const [userData, setUserData] = useState({});
  const [bestSeller, setBestSeller] = useState({});
  const [publishedBooks, setPublishedBooks] = useState([]);
  const [newAvatar, setNewAvatar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/user-profile")
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

    setIsModalOpen(true); // Mostra o modal ao selecionar uma nova imagem
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
        .then((data) => {
          alert("Avatar atualizado com sucesso!");
          setIsModalOpen(false); // Fecha o modal após salvar o avatar
        })
        .catch((error) => console.error("Erro ao atualizar o avatar:", error));
    }
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
            <img className="editar" src={editar} alt="Editar avatar" />
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
          <button onClick={() => alert("Saque realizado!")}>Sacar</button>
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
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveAvatar}
      />
    </div>
  );
}

export default Profile;
