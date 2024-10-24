import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaSearch, FaBook, FaSpinner, FaSlidersH } from 'react-icons/fa';
import './RadomBooks.css';
import limitarCaracteres from '../../utils/limitCharacters.js';
import useFetchCachedBooks from '../../hooks/useCacheFetchBooks';

const RandomBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const containerTools = useRef(undefined);
  const searchFilter = useRef(undefined);

  const handleFilter = useCallback(() => {
    setShowFilter((valorAtual) => {
      const novoValor = !valorAtual;

      if (containerTools.current) {
        if (novoValor) containerTools.current.style.marginBottom = '70px';
        else containerTools.current.style.marginBottom = '0px';
      }

      return novoValor;
    });
  }, []);

  useEffect(() => {
    // Função para buscar os livros em cache
    useFetchCachedBooks({ setBooks, setError, setLoading, withCache: true });
  }, []);

  // Filtrando os livros de acordo com a query de busca
  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const authorMatch = book.authors?.some((author) =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return titleMatch || authorMatch;
  });

  // Para fins de depuração, exibe os livros carregados
  console.log('Books loaded:', books);

  if (loading) {
    return (
      <div className="loading">
        <FaSpinner className="loading-icon" />
        <p>Carregando livros...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="books-container">
      <h2 className="books-title">Livros</h2>

      <div className="container-tools" ref={containerTools}>
        <FaSlidersH className="tools-icon" onClick={handleFilter} />
        {showFilter && (
          <div className="popup-tools">
            <div className="search-center">
              <div
                className="search-container"
                onClick={() => {
                  searchFilter.current.focus();
                }}
              >
                <input
                  type="text"
                  placeholder="Filtre os livros que estão atualmente carregados"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  ref={searchFilter}
                />
                <FaSearch className="search-icon" />
              </div>
            </div>
          </div>
        )}
      </div>

      <ul className="books-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <li key={index} className="book-item">
              <h3 className="book-title">
                <FaBook className="book-icon" />
                {limitarCaracteres(book.title)}
              </h3>
              <p className="book-authors">
                Authors:{' '}
                {book.authors?.map((a) => a.name).join(', ') ||
                  'Unknown Author'}
              </p>
              <div className="align-to-the-end"></div>
              <a
                href={book.formats['text/html'] || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="book-link"
              >
                Read
              </a>
              <img
                src={book.formats['image/jpeg'] || 'default-image-link.jpg'}
                alt={`Cover of ${book.title}`}
                className="book-image"
              />
            </li>
          ))
        ) : (
          <li className="no-results">Nenhum livro encontrado.</li>
          
        )}
      </ul>
    </div>
  );
};

export default RandomBooks;
