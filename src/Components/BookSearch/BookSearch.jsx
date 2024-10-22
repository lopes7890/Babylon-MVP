import React, { useState } from 'react';
import axios from 'axios';
import './BookSearch.css'

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      try {
        const response = await axios.post(
          'https://babylon-mvp-backend.onrender.com/busca',  
          { titulo: query }  
        );
        setBooks(response.data); 
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
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
        <button className='btn' type="submit">Buscar</button>
      </form>
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
