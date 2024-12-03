import React, { useEffect, useState } from "react";
import "./css/BookClub.css";

function BookClub() {
  const [bookClub, setBookClub] = useState({ name: "", book: {}, members: [] });
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch("https://babylon-mvp-backend.onrender.com/club")
      .then((response) => response.json())
      .then((data) => setBookClub(data))
      .catch((error) =>
        console.error("Erro ao buscar clube do livro:", error)
      );
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
        setBookClub((prevClub) => ({ ...prevClub, book }));
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
          <div
            className="book-cover"
            onClick={() => handleBookClick(bookClub.book)}
          >
            <p>{bookClub.book.name || "Nenhum livro selecionado"}</p>
          </div>
        </div>
        <div className="club-members">
          <p>Integrantes:</p>
          <ul>
            {bookClub.members.map((member, index) => (
              <li key={index}>
                <img
                  src={`https://placehold.co/50x50`}
                  alt={`Foto de ${member.name}`}
                  className="member-avatar"
                />
                {member.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedBook && (
        <div className="book-details">
          <h3>Detalhes do Livro Selecionado</h3>
          <p><strong>Nome:</strong> {selectedBook.name}</p>
          <p><strong>Autor:</strong> {selectedBook.author}</p>
          <p><strong>Descrição:</strong> {selectedBook.description}</p>
        </div>
      )}
    </div>
  );
}

export default BookClub;
