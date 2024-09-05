import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Salvar Foto de Perfil</h2>
        <p>Você deseja salvar a nova foto de perfil?</p>
        <div className="modal-buttons">
          <button onClick={onSave}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
