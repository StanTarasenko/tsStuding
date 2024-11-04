// src/todo.ts
export class TodoItem {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isCompleted: boolean;
    requireConfirmation: boolean;
  
    constructor(title: string, content: string, requireConfirmation = false) {
      this.id = TodoItem.generateId();
      this.title = title;
      this.content = content;
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.isCompleted = false;
      this.requireConfirmation = requireConfirmation;
    }
  
    static generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  
    markAsCompleted() {
      this.isCompleted = true;
      this.updatedAt = new Date();
    }
  
    edit(title: string, content: string) {
      if (this.requireConfirmation && !window.confirm('Are you sure you want to edit this note?')) {
        return;
      }
      this.title = title;
      this.content = content;
      this.updatedAt = new Date();
    }
  }
  
  export class TodoList {
    items: TodoItem[] = [];
  
    addItem(title: string, content: string, requireConfirmation = false) {
      const newItem = new TodoItem(title, content, requireConfirmation);
      this.items.push(newItem);
      return newItem;
    }
  
    deleteItem(id: string) {
      this.items = this.items.filter(item => item.id !== id);
    }
  
    getItemById(id: string) {
      return this.items.find(item => item.id === id) || null;
    }
  
    markItemAsCompleted(id: string) {
      const item = this.getItemById(id);
      if (item) {
        item.markAsCompleted();
      }
    }

    getItemsBySearchValue(value: string) {
      const lowerCaseValue = value.toLowerCase();
      return this.items.filter(item =>
        item.title.toLowerCase().includes(lowerCaseValue) ||
        item.content.toLowerCase().includes(lowerCaseValue)
      );
    }

    sortItemsByDate(isAsc: boolean = true): TodoItem[] {
      return [...this.items].sort((a, b) => {
        return isAsc
          ? a.createdAt.getTime() - b.createdAt.getTime()
          : b.createdAt.getTime() - a.createdAt.getTime();
      });
    }
  
    sortItemsByStatus(isAsc: boolean = true): TodoItem[] {
      return [...this.items].sort((a, b) => {
        return isAsc
          ? Number(a.isCompleted) - Number(b.isCompleted)
          : Number(b.isCompleted) - Number(a.isCompleted);
      });
    }
  }
  