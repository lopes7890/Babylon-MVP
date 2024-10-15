import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/BookDetail.css';

function BookDetail() {
  const { id } = useParams(); // Obtém o ID do livro da URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
          // `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do livro:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) return <p>Carregando...</p>;

  const { volumeInfo } = book;

  return (
    <div className="book-detail">
      <h2>{volumeInfo.title}</h2>
      <img src={volumeInfo.imageLinks?.thumbnail} alt={volumeInfo.title} />
      <h3>{volumeInfo.authors?.join(', ')}</h3>
      <p><strong>Data de Publicação:</strong> {volumeInfo.publishedDate}</p>
      <p><strong>Editora:</strong> {volumeInfo.publisher}</p>
      <p><strong>Descrição:</strong> <span dangerouslySetInnerHTML={{ __html: volumeInfo.description }} /></p>
      <p><strong>Categoria:</strong> {volumeInfo.categories?.join(', ')}</p>
      <p><strong>Número de Páginas:</strong> {volumeInfo.pageCount}</p>
      <p><strong>Idioma:</strong> {volumeInfo.language}</p>
      <p><strong>ISBN:</strong> {volumeInfo.industryIdentifiers?.map(identifier => identifier.identifier).join(', ')}</p>
      <a href={volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
        Visualizar no Google Books
      </a>
    </div>
  );
}

export default BookDetail;
