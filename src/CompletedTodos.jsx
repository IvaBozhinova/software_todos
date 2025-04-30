import React from 'react';


const CompletedTodos = ({
  completedTodos,
  onUncomplete,
  sortOrder,
  visibleCount,
  onLoadMore,
  filterUser
}) => {

  const filteredTodos = completedTodos.filter(todo => todo.completed && (filterUser ? todo.username === filterUser : true));

  const sortedCompletedTodos = filteredTodos.sort((a, b) => {
    return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
  });

  const visibleTodos = sortedCompletedTodos.slice(0, visibleCount);

  return (
    <div className="completed-list">
      <h2>Completed Todos</h2>
      <h3 className="todo-count">Count: {filteredTodos.length}</h3>

      <ul>
        {visibleTodos.sort((a, b) => {
          if (sortOrder === 'asc') {
            return new Date(a.completedAt) - new Date(b.completedAt);
          } else {
            return new Date(b.completedAt) - new Date(a.completedAt);
          }
        }).map(todo => (
          <li key={`c-${todo.id}`}>
            <h3>{todo.title}</h3>
            <p><em>{`Completed by: ${todo.username}`}</em></p>
            <p><em>Completed at: {new Date(todo.completedAt).toLocaleString()}</em></p>
            <button
              className="uncomplete-btn"
              onClick={() => onUncomplete(todo.id)}>
              Uncomplete
            </button>
          </li>
        ))}
      </ul>
      <br></br>
      {visibleTodos.length < sortedCompletedTodos.length && (
        <button
          className="load-more"
          onClick={onLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CompletedTodos;