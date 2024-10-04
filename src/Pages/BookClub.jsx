import React, { useEffect, useState } from "react";
import "./css/BookClub.css";

function BookClub() {
  const [bookClub, setBookClub] = useState({ name: "", book: {}, members: [] });
  const [selectedBook, setSelectedBook] = useState(null);

  // Função para buscar os dados do clube do livro do backend
  useEffect(() => {
    fetch("/api/book-club")
      .then((response) => response.json())
      .then((data) => setBookClub(data))
      .catch((error) => console.error("Erro ao buscar clube do livro:", error));
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);

    fetch("/api/book-club/select-book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Livro selecionado salvo com sucesso:", data);
        setBookClub((prevClub) => ({ ...prevClub, book: book }));
      })
      .catch((error) =>
        console.error("Erro ao salvar o livro selecionado:", error)
      );
  };

  return (
    <div className="book-club-container">
      <h3>Clube do Livro: {bookClub.name}</h3>
      <div className="club-info">
        <div className="club-book">
          <p>Livro Atual:</p>
          <div className="book-cover">
            <p>{bookClub.book.name || "Nenhum livro selecionado"}</p>
          </div>
        </div>
        <div className="club-members">
          <p>Integrantes:</p>
          <ul>
            {bookClub.members.map((member, index) => (
              <li key={index}>
                <span className={`icon member${index + 1}`}></span>{" "}
                {member.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Exibir detalhes do livro selecionado */}
      {selectedBook && (
        <div className="book-details">
          <h3>Detalhes do Livro Selecionado</h3>
          <p>Nome: {selectedBook.name}</p>
          <p>Autor: {selectedBook.author}</p>
          <p>Descrição: {selectedBook.description}</p>
        </div>
      )}
    </div>
  );
}

export default BookClub;
