import React, { useEffect, useState } from 'react';
import { TodoItem, TodoList } from './todo';
import TableRow from './TableRow';
import Modal from './Modal';

const App: React.FC = () => {
  const [todoList, setTodoList] = useState(() => {
    const savedItems = localStorage.getItem('todoItems');
    const list = new TodoList();
    if (savedItems) {
      JSON.parse(savedItems).forEach((item: TodoItem) => list.addItem(item.title, item.content, item.isCompleted));
    }
    return list;
  });
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState<TodoItem[]>(todoList.items);
  const [selectedItem, setSelectedItem] = useState<TodoItem | null>(null);
  const [isDateSortedAsc, setIsDateSortedAsc] = useState(true);
  const [isStatusSortedAsc, setIsStatusSortedAsc] = useState(true);

  const saveToLocalStorage = (items: TodoItem[]) => {
    localStorage.setItem('todoItems', JSON.stringify(items));
  };

  const handleRowClick = (id: string) => {
    const item = todoList.getItemById(id);
    if (item) {
      setSelectedItem(item);
    }
  };

  const handleAddItem = () => {
    if (title.trim() && content.trim()) {
      todoList.addItem(title, content);
      setItems([...todoList.items]);
      setTitle('');
      setContent('');
      saveToLocalStorage(todoList.items);
    } else {
      alert('Title and content cannot be empty');
    }
  };

  const handleDeleteItem = (id: string) => {
    todoList.deleteItem(id);
    setItems([...todoList.items]);
    saveToLocalStorage(todoList.items);
  };

  const handleMarkAsCompleted = (id: string) => {
    todoList.markItemAsCompleted(id);
    setItems([...todoList.items]);
    saveToLocalStorage(todoList.items);
  };

  const handleSaveEdit = (updatedTitle: string, updatedContent: string) => {
    if (selectedItem) {
      selectedItem.title = updatedTitle;
      selectedItem.content = updatedContent;
      setItems([...todoList.items]);
      setSelectedItem(null);
    }
  };

  const handleSearchByValue = (value: string) => {
    setSearchValue(value);
    const filteredArr = todoList.getItemsBySearchValue(value);
    setItems(filteredArr);
  };

  const handleSortByDate = () => {
    const sortedItems = todoList.sortItemsByDate(isDateSortedAsc);
    setItems(sortedItems);
    setIsDateSortedAsc(!isDateSortedAsc);
  };

  const handleSortByStatus = () => {
    const sortedItems = todoList.sortItemsByStatus(isStatusSortedAsc);
    setItems(sortedItems);
    setIsStatusSortedAsc(!isStatusSortedAsc);
  };

  useEffect(() => {
    saveToLocalStorage(todoList.items);
  }, [todoList.items]);

  useEffect(() => {
    if (!searchValue) {
      setItems([...todoList.items]);
    }
  }, [searchValue]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List</h1>

      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px'}}>
        <div>Search by title or content</div>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => handleSearchByValue(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1 }}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ flex: 2 }}
        />
        <button onClick={handleAddItem} style={{ flex: 0.5 }}>Add Todo</button>
      </div>

      <div style={{
        display: 'flex',
        fontWeight: 'bold',
        padding: '10px',
        borderBottom: '2px solid #333',
      }}>
        <div style={{ flex: 1 }}>Title</div>
        <div style={{ flex: 2 }}>Content</div>
        <div style={{ flex: 1, textAlign: 'center' }} onClick={handleSortByDate}>
          Created Date {isDateSortedAsc ? '△' : '▽'}
        </div>
        <div style={{ flex: 1, textAlign: 'center' }} onClick={handleSortByStatus}>
          Status {isStatusSortedAsc ? '△' : '▽'}
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>Actions</div>
      </div>

      <div>
        {items.map(item => (
          <div 
            key={item.id} 
            style={{
              display: 'flex', 
              alignItems: 'center',
              padding: '10px',
              marginBottom: '10px'
            }}
          >
            <TableRow 
              id={item.id}
              title={item.title} 
              content={item.content} 
              date={item.createdAt} 
              status={item.isCompleted}
              onRowClick={handleRowClick}
            />
            <div style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              gap: '10px', 
              position: 'absolute',
              right: '1%',
            }}>
              <button 
                onClick={() => handleMarkAsCompleted(item.id)} 
                style={{ 
                  padding: '5px',
                  borderRadius: '3px',
                  background: item.isCompleted ? 'gray' : 'green',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Mark as Completed
              </button>
              <button 
                onClick={() => handleDeleteItem(item.id)} 
                style={{ 
                  padding: '5px',
                  borderRadius: '3px',
                  background: 'brown',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <Modal 
          open={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          title={selectedItem.title}
          content={selectedItem.content}
          date={selectedItem.createdAt}
          status={selectedItem.isCompleted}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default App;
