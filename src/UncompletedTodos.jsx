import React from 'react';

const UncompletedTodos = ({
  todos,
  onComplete,
  filterUser,
  sortOrder,
  visibleCount,
  onLoadMore
}) => {
  const filteredTodos = todos.filter(todo => !todo.completed && (filterUser ? todo.username === filterUser : true));

  const sortedUncompletedTodos = [...filteredTodos].sort((a, b) => {
    //Priority is when new flag is set
    if (a.new && !b.new) {
      return -1;
    }
    if (!a.new && b.new) {
      return 1;
    }

    // If no new flag is present, sort alphabetically
    return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
  });

  const visibleTodos = sortedUncompletedTodos.slice(0, visibleCount);

  return (
    <div>
      <h2>Uncompleted Todos</h2>
      <ul className="uncompleted-list">
        {visibleTodos.map(todo => (
          <li key={`u-${todo.id}`}
              className="todo-task" 
              style={{ color: todo?.dueDate && new Date(todo.dueDate) < new Date() ? "red" : "black" }} >
            <h3>{todo.title}</h3>
            <p><em>{`Opened by: ${todo.username}`}</em></p>
            <button 
              onClick={() => onComplete(todo.id)}>
              Complete
            </button>
          </li>
        ))}
      </ul>
      <br />
      {visibleTodos.length < sortedUncompletedTodos.length && (
        <button 
          className="load-more" 
          onClick={onLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default UncompletedTodos;