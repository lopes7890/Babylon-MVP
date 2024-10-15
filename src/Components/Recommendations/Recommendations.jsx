import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Recommendations.css'

import RandomBooks from '../RandomBooks/RandomBooks';
function Recommendations() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
        );
        setBooks(response.data.items);
      } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="recommendations-page">
      <h2>Recomendações</h2>
      <div className="book-list">
        {books.map((book) => (
          <Link to={`/book/${book.id}`} key={book.id} className="book-item">
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(', ')}</p>
          </Link>
        ))}
      
        <RandomBooks/>
      </div>
    </div>
  );
}

export default Recommendations;
