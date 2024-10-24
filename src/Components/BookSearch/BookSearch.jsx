import React, { useState } from 'react';
import axios from 'axios';
import { FiRefreshCw } from 'react-icons/fi';  
import './BookSearch.css';

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null); 
    if (query) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://babylon-mvp-backend.onrender.com/busca?titulo=${query}`
        );

        if (Array.isArray(response.data) && response.data.length > 0) {
          setBooks(response.data); 
        } else {
          setBooks([]); 
          setError(`Nenhum resultado encontrado para o livro "${query}".`); 
        }
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        setError('Erro ao buscar livros. Tente novamente mais tarde.');
        setBooks([]); 
      }
      setLoading(false);
    } else {
      setError('Por favor, insira um termo de busca.'); 
    }
  };

  const handleReload = () => {
    setQuery('');  // Limpa a pesquisa
    setBooks([]);  // Limpa os livros
    setError(null); // Limpa os erros
  };

  return (
    <div className="book-search">
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Buscar livros"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FiRefreshCw 
            className="reload-icon" 
            onClick={handleReload} 
            size={24} 
            title="Recarregar" 
          />
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Buscar'}
        </button>
      </form>
      
      {error && <p className="error-message">{error}</p>}
      
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
                onError={(e) => { e.target.src = 'url_da_imagem_padrao.jpg'; }} 
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
        ) : !loading && !error && query && ( 
          <p>Seus resultados aparecerão aqui</p>
        )}
      </div>
    </div>
  );
}

export default BookSearch;
