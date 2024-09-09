import React, { useEffect, useState } from 'react';
import './css/Library.css'; // Certifique-se de criar o arquivo Library.css

function Library() {
  const [library, setLibrary] = useState([]);
  const [bookClub, setBookClub] = useState({ name: '', book: {}, members: [] });
  const [selectedBook, setSelectedBook] = useState(null); // Estado para o livro selecionado

  // Função para buscar os dados da biblioteca do backend
  useEffect(() => {
    fetch('https://babylon-mvp-backend.onrender.com/api/library') 
      .then(response => response.json())
      .then(data => setLibrary(data.books))
      .catch(error => console.error('Erro ao buscar biblioteca:', error));

    fetch('/api/book-club')
      .then(response => response.json())
      .then(data => setBookClub(data))
      .catch(error => console.error('Erro ao buscar clube do livro:', error));
  }, []);

  // Função para lidar com o clique no livro
  const handleBookClick = (book) => {
    setSelectedBook(book); // Define o livro selecionado
  };

  return (
    <div className="library-container">
      <div className="section library">
        <h3>Sua biblioteca:</h3>
        <div className="books">
          {library.map((book, index) => (
            <div 
              key={index} 
              className="book-cover" 
              onClick={() => handleBookClick(book)} // Adiciona evento de clique
            >
              <p>{book.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Exibir detalhes do livro selecionado */}
      {selectedBook && (
        <div className="book-details">
          <h3>Detalhes do Livro</h3>
          <p>Nome: {selectedBook.name}</p>
          <p>Autor: {selectedBook.author}</p>
          <p>Descrição: {selectedBook.description}</p>
        </div>
      )}

      <div className="section book-club">
        <h3>Clube do livro: {bookClub.name}</h3>
        <div className="club-info">
          <div className="club-book">
            <p>Livro:</p>
            <div className="book-cover">
              <p>{bookClub.book.name}</p>
            </div>
          </div>
          <div className="club-members">
            <p>Integrantes:</p>
            <ul>
              {bookClub.members.map((member, index) => (
                <li key={index}>
                  <span className={`icon member${index + 1}`}></span> {member.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
