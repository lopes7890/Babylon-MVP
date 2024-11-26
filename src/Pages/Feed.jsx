import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaCamera } from 'react-icons/fa';
import './css/Feed.css';
import perfil from '../assets/perfil_padrao.png';

function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Usuário_123',
      avatar: perfil,
      content: 'quero um livro',
      image: null,
      likes: 10,
      comments: [],
    },
    {
      id: 2,
      user: 'Usuário_123',
      avatar: perfil,
      content: 'O livro tal me faz refletir sobre o fato de que nada faz sentido nessa vida!!!!',
      image: null,
      likes: 5,
      comments: [],
    },
  ]);

  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState(null);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePostSubmit = () => {
    if (newPost.trim() || newImage) {
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          user: 'Usuário_123',
          avatar: perfil,
          content: newPost,
          image: newImage,
          likes: 0,
          comments: [],
        },
      ]);
      setNewPost('');
      setNewImage(null);
    }
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId, comment) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  return (
    <div className="feed-container">
      <h2>Publicações:</h2>
      <div className="new-post">
        <div className="new-post-header">
          <div className="avatar" style={{ backgroundImage: `url(${perfil})` }}></div>
          <textarea
            value={newPost}
            onChange={handlePostChange}
            placeholder="escreva algo"
          />
        </div>
        {newImage && (
          <div className="new-post-image-preview">
            <img src={newImage} alt="Preview" />
          </div>
        )}
        <div className="new-post-actions">
          <label className="file-input-label">
            <FaCamera className="file-input-icon" />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <button onClick={handlePostSubmit}>Publicar</button>
        </div>
      </div>
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <div
                className="avatar"
                style={{ backgroundImage: `url(${post.avatar})` }}
              ></div>
              <span className="user">{post.user}</span>
            </div>
            <p>{post.content}</p>
            {post.image && (
              <img src={post.image} alt="Post" className="post-image" />
            )}
            <div className="post-actions">
              <button onClick={() => handleLike(post.id)}>
                <FaThumbsUp /> Like ({post.likes})
              </button>
              <button
                onClick={() => handleComment(post.id, 'Comentário Exemplo')}
              >
                <FaComment /> Comentar ({post.comments.length})
              </button>
            </div>
            {post.comments.length > 0 && (
              <div className="post-comments">
                {post.comments.map((comment, index) => (
                  <p key={index} className="comment">
                    {comment}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
