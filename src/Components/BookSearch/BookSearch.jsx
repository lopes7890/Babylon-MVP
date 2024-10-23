import React, { useState } from 'react';
import axios from 'axios';
import './BookSearch.css';

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (query) {
      try {
        const response = await axios.get(
          `https://babylon-mvp-backend.onrender.com/busca?titulo=${query}`
        );

        console.log('Response data:', response);
        console.log('Response data:', response.data); // Log da resposta

        // Verifica se a resposta é um array e não está vazia
        if (Array.isArray(response.data) && response.data.length > 0) {
          setBooks(response.data);
        } else {
          setErrorMessage(`Nenhum livro encontrado para a pesquisa: ${query}`);
        }
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        setErrorMessage('Erro ao buscar livros. Tente novamente.');
      }
    } else {
      setErrorMessage('Por favor, insira um título para buscar.');
    }
  };

  return (
    <div className="book-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar livros"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn" type="submit">
          Buscar
        </button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}{' '}
      {/* Exibe a mensagem de erro */}
      <div className="book-results">
        {books.map((book, index) => (
          <div key={index} className="book-item">
            <h3>{book.titulo}</h3>
            <p>{book.autor}</p>
            <a href={book.livro} target="_blank" rel="noreferrer">
              Ler o livro
            </a>
            <img src={book.capa} alt={book.titulo} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
