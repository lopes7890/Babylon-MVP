// import React, { useState } from 'react';
// import axios from 'axios';
// import './BookSearch.css'
// function BookSearch() {
//   const [query, setQuery] = useState('');
//   const [books, setBooks] = useState([]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (query) {
//       try {
//         const response = await axios.get(
//           `https://www.googleapis.com/books/v1/volumes?q=${query}`
//         );
//         setBooks(response.data.items);
//       } catch (error) {
//         console.error('Erro ao buscar livros:', error);
//       }
//     }
//   };

//   return (
//     <div className="book-search">
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Buscar livros"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button className='btn' type="submit">Buscar</button>
//       </form>
//       <div className="book-results">
//         {books.map((book) => (
//           <div key={book.id} className="book-item">
//             <h3>{book.volumeInfo.title}</h3>
//             <p>{book.volumeInfo.authors?.join(', ')}</p>
//             <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BookSearch;
