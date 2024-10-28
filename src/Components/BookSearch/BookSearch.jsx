import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiRefreshCw, FiX } from "react-icons/fi";
import "./BookSearch.css";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open"); // Remove when component unmounts
    };
  }, [isModalOpen]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setIsModalOpen(false);
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
        console.error("Erro ao buscar livros:", error);
        setError("Erro ao buscar livros. Tente novamente mais tarde.");
        setBooks([]);
      }
      setLoading(false);
      setIsModalOpen(true);
    } else {
      setError("Por favor, insira um termo de busca.");
      setIsModalOpen(true);
    }
  };

  const handleReload = () => {
    setQuery("");
    setBooks([]);
    setError(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="book-search">
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Buscar livros"
            value={query}
            onChange={handleInputChange}
            aria-label="Campo de busca para livros"
            autoComplete="off"
          />
          <FiRefreshCw
            className="reload-icon"
            onClick={handleReload}
            size={24}
            title="Recarregar"
            role="button"
            aria-label="Recarregar busca"
          />
        </div>
        {query && (
          <button
            className="btn"
            type="submit"
            disabled={loading}
            aria-label="Buscar livros"
          >
            {loading ? <div className="spinner"></div> : "Buscar"}
          </button>
        )}
      </form>

      {isModalOpen && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div
              id="close-modal"
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
              aria-label="Fechar modal"
            >
              <FiX size={24} />
            </div>

            {error && <p className="error-message">{error}</p>}
            <div className="book-results">
              {books.length > 0
                ? books.map((book, index) => (
                    <div key={index} className="book-item">
                      <h3>{book.titulo}</h3>
                      <p>{book.autor}</p>
                      <img
                        src={book.capa || "url_da_imagem_padrao.jpg"}
                        alt={book.titulo}
                        className="book-image"
                        onError={(e) => {
                          e.target.src = "url_da_imagem_padrao.jpg";
                        }}
                      />
                      <a
                        href={book.livro}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="read-link"
                        aria-label={`Ler ${book.titulo}`}
                      >
                        Ler Livro
                      </a>
                    </div>
                  ))
                : !loading &&
                  !error &&
                  query && <p>Seus resultados aparecerão aqui</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookSearch;
