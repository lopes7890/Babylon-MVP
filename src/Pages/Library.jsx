import React, { useEffect, useState } from 'react';
import styles from './css/Library.module.css';
import CardBookClub from '../Components/bookClub/CardBookClub';
import { FaPlus } from 'react-icons/fa'; // Ícone para o botão de criar clube

function Library() {
  const [library, setLibrary] = useState([]);
  const [bookClubs, setBookClubs] = useState([]);
  const [userClubs, setUserClubs] = useState([]);
  const [newClubName, setNewClubName] = useState('');
  const [loading, setLoading] = useState(true); // Adicionado estado de carregamento

  useEffect(() => {
    Promise.all([
      fetch('https://babylon-mvp-backend.onrender.com/clube').then((res) =>
        res.json()
      ),
      fetch('https://babylon-mvp-backend.onrender.com/biblioteca').then((res) =>
        res.json()
      ),
      fetch('https://babylon-mvp-backend.onrender.com/userClubs').then((res) =>
        res.json()
      ),
    ])
      .then(([clubs, library, userClubs]) => {
        setBookClubs(clubs);
        setLibrary(library);
        setUserClubs(userClubs);
      })
      .catch((error) => console.error('Erro ao buscar dados:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleCreateClub = () => {
    if (newClubName.trim() === '') {
      alert('O nome do clube não pode estar vazio.');
      return;
    }

    fetch('https://babylon-mvp-backend.onrender.com/clube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newClubName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Clube criado com sucesso!');
          setBookClubs((prevClubs) => [...prevClubs, data.club]);
          setNewClubName('');
        } else {
          console.error('Erro ao criar clube:', data.message);
        }
      })
      .catch((error) => console.error('Erro ao criar clube:', error));
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.libraryContainer}>
      <div className={styles.section + ' ' + styles.library}>
        <h3>Sua biblioteca:</h3>
        <div className={styles.books}>
          {library.map((book, index) => (
            <div key={index} className={styles.containerBook}>
              <div className={styles.bookCover}></div>
              <p className={styles.nomeClub}>{book.nome}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section + ' ' + styles.bookClub}>
        <h3>Seus Clubes do Livro</h3>
        {userClubs.length > 0 ? (
          userClubs.map((club, index) => (
            <CardBookClub key={index} styles={styles} dados={club} />
          ))
        ) : (
          <p>Você ainda não participa de nenhum clube.</p>
        )}

        <h3>Clubes Disponíveis</h3>
        {bookClubs.length > 0 ? (
          bookClubs.map((club, index) => (
            <CardBookClub key={index} styles={styles} dados={club} />
          ))
        ) : (
          <p>Nenhum clube disponível no momento.</p>
        )}

        <div className={styles.createClubSection}>
          <input
            type="text"
            placeholder="Nome do novo clube"
            value={newClubName}
            onChange={(e) => setNewClubName(e.target.value)}
            className={styles.clubInput}
          />
          <button
            className={styles.createClubButton}
            onClick={handleCreateClub}
          >
            <FaPlus /> Criar Clube
          </button>
        </div>
      </div>
    </div>
  );
}

export default Library;
