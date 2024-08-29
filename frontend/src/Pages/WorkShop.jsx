import React, { useEffect, useState } from 'react';
import './css/WorkShop.css';
import { Link } from 'react-router-dom';

function WorkShop() {
  const [projects, setProjects] = useState([]);
  const [publishedBooks, setPublishedBooks] = useState([]);

  // Fetching projects and published books from the backend
  useEffect(() => {
    // Fetch user's projects
    fetch('/api/user-projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data.projects || []);
        setPublishedBooks(data.publishedBooks || []);
      })
      .catch(error => console.error('Erro ao buscar projetos:', error));
  }, []);

  // Function to handle creating a new project
  const createNewProject = () => {
    fetch('/api/user-projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: 'Novo Projeto' }),
    })
      .then(response => response.json())
      .then(newProject => {
        setProjects([...projects, newProject]);
      })
      .catch(error => console.error('Erro ao criar novo projeto:', error));
  };

  return (
    <div className="workshop-container">
      <h2>Oficina de criação:</h2>
      <div className="workshop-buttons">
        <Link to={`https://pt.anotepad.com/`}><button className="new-project-btn" onClick={createNewProject}>+ Novo projeto</button></Link>
        <Link to="/published-books">
          <button className="published-books-btn">Livros publicados</button>
        </Link>
      </div>
      <div className="projects-section">
        <h3>Seus projetos:</h3>
        <div className="projects">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="project">
                <div className="book-cover" style={{ backgroundImage: `url(${project.coverUrl})` }}></div>
                <p>{project.title}</p>
              </div>
            ))
          ) : (
            <p>Você ainda não tem projetos. Clique em "Novo projeto" para começar.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkShop;
