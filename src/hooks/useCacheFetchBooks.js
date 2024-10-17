export default function useFetchCachedBooks({
  setBooks,
  setError,
  setLoading,
  withCache,
}) {
  const randomPage = Math.floor(Math.random() * 100) + 1;

  const storedBooks = window.localStorage.getItem('storedBooks'); // dados dos livros armazenados
  let updateStoredBooks = true; // condicao que ira definir se os livros do fetch devem ser renderizados na tela
  let makeRequest = true; // Condicao que ira definir se o fetch deve ser feito

  try {
    if (storedBooks && withCache) {
      // const { books, timestamp } = JSON.parse(storedBooks);
      const parsedBooks = JSON.parse(storedBooks);

      if (parsedBooks && parsedBooks.books && parsedBooks.timestamp) {
        const { books, timestamp } = parsedBooks;
        // Obter o tempo em milessegundos do momento em que esses dados foram armazenados;

        const temp = 1000 * 60 * 10; // Tempo em milessegundos em que o cache sera valido
        const timeNow = new Date().getTime(); // time de agora
        const cacheValid = timestamp + temp > timeNow; // validacao do cache

        setBooks(books);
        if (cacheValid) makeRequest = false;
        updateStoredBooks = false;
        setLoading(false);
      }
    }
  } catch (erro) {
    console.error(
      `Erro ao obter produtos armazenados em localStorage. Erro: ${erro}`
    );

    // Se der erro, entao o fetch deve ser feito e os livros devem ser renderizados.
    updateStoredBooks = true;
    makeRequest = true;
  }

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://gutendex.com/books/?page=${randomPage}&page_size=10`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        // Armazenando o resultado no localStorage
        window.localStorage.setItem(
          'storedBooks',
          JSON.stringify({
            books: data.results,
            page: randomPage,
            timestamp: new Date().getTime(),
          })
        );

        if (updateStoredBooks) setBooks(data.results);
      }

      setLoading(false);
    } catch (error) {
      if (updateStoredBooks) {
        setError('Erro ao encontrar livros');
      } else {
        console.error(`Erro ao obter produtos. Erro: ${error}`);
      }

      setLoading(false);
    }
  };

  if (makeRequest) fetchBooks();
}
