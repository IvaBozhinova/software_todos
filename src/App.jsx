import React, { useState, useEffect } from 'react';
import FilterSort from './components/FilterSort';
import CompletedTodos from './CompletedTodos';
import UncompletedTodos from './UncompletedTodos';
import FilterSort2 from './components/FilterSort2';
import TodoForm from './TodoForm';
import './styles.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [visibleUncompletedCount, setVisibleUncompletedCount] = useState(5);
  const [visibleCompletedCount, setVisibleCompletedCount] = useState(5);

  const [completedTodos, setCompletedTodos] = useState([]);
  const [completedSortOrder, setCompletedSortOrder] = useState('asc');
  const [uncompletedTodos, setUncompletedTodos] = useState([]);
  const [theme, setTheme] = useState('light');

  // Add new todo
  const addTodo = (newTodo) => {
    newTodo = {
      ...newTodo,
      id: Date.now(),
      completed: false,
    };

   // setTodos((prevTodos) => [...prevTodos, newTodo]);
    setUncompletedTodos((prevUncompleted) => [newTodo, ...prevUncompleted]);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      document.body.className = 'light';
    }
  }, []);

  const toggleTheme = () => {
    const sNewTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(sNewTheme);
    document.body.className = sNewTheme;
    localStorage.setItem('theme', sNewTheme);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users");
        const usersData = await usersResponse.json();

        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();

        data.forEach((oData => {
          oData.username = usersData.find(user => user.id == oData.userId).username;
        }));

        const completed = data
          .filter(todo => todo.completed)
          .map(todo => ({ ...todo, completedAt: new Date() }));

        const uncompleted = data.filter(todo => !todo.completed);

        setCompletedTodos(completed);
        setUncompletedTodos(uncompleted);

        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);

  const handleComplete = id => {
    const todo = uncompletedTodos.find(t => t.id === id);
    if (!todo) return;

    const updated = {
      ...todo,
      completed: true,
      completedAt: new Date()
    };

    setUncompletedTodos(prev => prev.filter(t => t.id !== id));
    setCompletedTodos(prev => [updated, ...prev]);
  };
  const handleUncomplete = id => {
    const todo = completedTodos.find(t => t.id === id);
    if (!todo) return;

    const updated = {
      ...todo,
      completed: false,
      completedAt: null
    };

    setCompletedTodos(prev => prev.filter(t => t.id !== id));
    setUncompletedTodos(prev => [updated, ...prev]);
  };

  const handleLoadMoreUncompleted = () => {
    setVisibleUncompletedCount(prev => prev + 5);
  };

  const handleLoadMoreCompleted = () => {
    setVisibleCompletedCount(prev => prev + 5);
  };

  return (
    <div className={`app-container ${theme}`}>

      <button 
        onClick={toggleTheme} 
        className="theme-toggle" >
        {theme === 'light' ? '🌙 Тъмна тема' : '☀️ Светла тема'}
      </button>

      <div className="left-side">
        <div>
          <TodoForm onSubmit={addTodo}
           users={users} />
        </div>

        <FilterSort
          users={users}
          filterUser={filterUser}
          setFilterUser={setFilterUser}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          todos={uncompletedTodos} />
        <UncompletedTodos
          todos={uncompletedTodos}
          onComplete={handleComplete}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          filterUser={filterUser}
          setFilterUser={setFilterUser}
          visibleCount={visibleUncompletedCount}
          onLoadMore={handleLoadMoreUncompleted} />
      </div>

      <div className="right-side">
        <FilterSort2
          setSortOrder={setCompletedSortOrder} />
        <CompletedTodos
          sortOrder={completedSortOrder}
          completedTodos={completedTodos}
          onUncomplete={handleUncomplete}
          visibleCount={visibleCompletedCount}
          onLoadMore={handleLoadMoreCompleted}
          filterUser={filterUser} />
      </div>
    </div>
  );
};

export default App;