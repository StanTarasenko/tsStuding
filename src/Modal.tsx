import React, { FC, useState } from 'react';

interface IModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  date: Date;
  status: boolean;
  onSave: (updatedTitle: string, updatedContent: string) => void;
}

const Modal: FC<IModalProps> = ({ open, onClose, title, content, date, status, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  if (!open) return null;

  const handleSave = () => {
    onSave(editedTitle, editedContent);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '100%',
      }}>
        <h2>Edit Todo</h2>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Title"
          style={{ width: '90%', marginBottom: '10px', padding: '8px' }}
        />
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          placeholder="Content"
          style={{ width: '90%', marginBottom: '10px', padding: '8px', height: '80px' }}
        />
        <p>Date: {date.toLocaleDateString()}</p>
        <p>Status: {status ? 'Completed' : 'Pending'}</p>
        <button 
          onClick={handleSave} 
          style={{ marginRight: '10px', background: 'dodgerblue', color: 'white' }}
        >
          Save
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
