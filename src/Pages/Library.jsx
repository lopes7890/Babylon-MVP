import React, { useEffect, useState } from 'react';
import styles from './css/Library.module.css';
import CardBookClub from '../Components/bookClub/CardBookClub';

function Library() {
  const [library, setLibrary] = useState([]);
  const [bookClub, setBookClub] = useState({ name: '', book: {}, members: [] });

  const [selectedBook, setSelectedBook] = useState(null); // Estado para o livro selecionado

  // Função para buscar os dados da biblioteca do backend
  useEffect(() => {
    fetch('https://babylon-mvp-backend.onrender.com/clube')
      .then((response) => response.json())
      .then((data) => setBookClub(data))
      .catch((error) => console.error('Erro ao buscar biblioteca:', error));

    fetch('https://babylon-mvp-backend.onrender.com/biblioteca')
      .then((response) => response.json())
      .then((data) => setLibrary(data))
      .catch((error) => console.error('Erro ao buscar clube do livro:', error));
  }, []);

  // Função para lidar com o clique no livro e enviar os dados ao backend
  const handleBookClick = (book) => {
    setSelectedBook(book); // Define o livro selecionado no estado

    // Enviar livro clicado ao backend
    fetch('https://babylon-mvp-backend.onrender.com/book/:title', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookId: book.id }), // Manda o ID do livro
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Livro salvo com sucesso:', data);
        } else {
          console.error('Erro ao salvar livro:', data.message);
        }
      })
      .catch((error) =>
        console.error('Erro ao comunicar com o backend:', error)
      );
  };

  return (
    <div className={styles.libraryContainer}>
      <div className={styles.section + ' ' + styles.library}>
        <h3>Sua biblioteca:</h3>
        <div className={styles.books}>
          {library.map((book, index) => (
            <div className={styles.containerBook}>
              <div
                key={index}
                className={styles.bookCover}
                onClick={() => handleBookClick(book)} // Adiciona evento de clique
              ></div>
              <p className={styles.nomeClub}>{book.nome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Exibir detalhes do livro selecionado */}
      {selectedBook && (
        <div className={styles.bookDetails}>
          <h3>Detalhes do Livro</h3>
          <p>Nome: {selectedBook.name}</p>
          <p>Autor: {selectedBook.author}</p>
          <p>Descrição: {selectedBook.description}</p>
        </div>
      )}

      <div className={styles.section + ' ' + styles.bookClub}>
        <h3>Clube do livro: {bookClub.name}</h3>
        {bookClub.length > 0 ? (
          bookClub.map((club) => {
            return <CardBookClub styles={styles} dados={club} />;
          })
        ) : (
          <h1>Voce nao esta em nenhum clube</h1>
        )}
      </div>
    </div>
  );
}

export default Library;
