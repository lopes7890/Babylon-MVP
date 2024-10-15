import React, { useEffect, useState } from "react";
import { FaSearch, FaBook, FaSpinner } from "react-icons/fa";
import "./RadomBooks.css";

const RandomBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 100) + 1;
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://gutendex.com/books/?page=${randomPage}&page_size=10`
        );
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setBooks(data.results);
        }

        setLoading(false);
      } catch (error) {
        setError("Erro ao encontrar livros");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const authorMatch = book.authors?.some((author) =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return titleMatch || authorMatch;
  });

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

      <div className="search-container">
        <input
          type="text"
          placeholder="Procure por um livro ou autor"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <FaSearch className="search-icon" />
      </div>

      <ul className="books-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <li key={index} className="book-item">
              <h3 className="book-title">
                <FaBook className="book-icon" />
                {book.title}
              </h3>
              <p className="book-authors">
                Authors:{" "}
                {book.authors?.map((a) => a.name).join(", ") ||
                  "Unknown Author"}
              </p>
              <a
                href={book.formats["text/html"] || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="book-link"
              >
                Read
              </a>
              <img
                src={book.formats["image/jpeg"] || "default-image-link.jpg"}
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
