import React, { FC, useState } from 'react';

interface ITableRow {
  id: string;
  title: string;
  content: string;
  date: Date;
  status: boolean;
  onRowClick: (id: string) => void;
}

const TableRow: FC<ITableRow> = ({ id, title, content, date, status, onRowClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onClick={() => {
        console.log('current id', id);
        onRowClick(id);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: '20px',
        width: '100%',
        padding: '15px 0',
        borderBottom: '1px solid #ddd',
        cursor: 'pointer',
        backgroundColor: isHovered ? 'lightgray' : 'white',
      }}
    >
      <div style={{ flex: 1, textAlign: 'left' }}>{title}</div>
      <div style={{ flex: 2, textAlign: 'left' }}>{content}</div>
      <div style={{ flex: 1, textAlign: 'center' }}>{date.toLocaleDateString()}</div>
      <div style={{ flex: 1, textAlign: 'center' }}>{status ? 'Completed' : 'Pending'}</div>
      <div style={{ flex: 1 }} />
    </div>
  );
};

export default TableRow;
