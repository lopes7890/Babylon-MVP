import React, { useState } from 'react';
import axios from 'axios';
import './BookSearch.css';

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://babylon-mvp-backend.onrender.com/busca?titulo=${query}`
        );
        console.log(response.data);
        setBooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
      setLoading(false);
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
        <button className="btn" type="submit" disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Buscar'}
        </button>
      </form>
      <div className="book-results">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="book-item">
              <h3>{book.titulo}</h3>
              <p>{book.autor}</p>
              <img
                src={book.capa || 'url_da_imagem_padrao.jpg'}
                alt={book.titulo}
                className="book-image"
                onError={(e) => { e.target.src = 'url_da_imagem_padrao.jpg'; }} // Fallback para imagem padrão
              />
              <a
                href={book.livro}
                target="_blank"
                rel="noopener noreferrer"
                className="read-link"
              >
                Ler Livro
              </a>
            </div>
          ))
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default BookSearch;
