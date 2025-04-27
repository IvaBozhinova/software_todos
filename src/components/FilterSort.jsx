import React from 'react';

const FilterSort = ({ users, filterUser, setFilterUser, sortOrder, setSortOrder, todos }) => (
  <div className="filters">
    <label>
      Filter by Username:
      <select value={filterUser} onChange={e => setFilterUser(e.target.value)}>
        <option value="">All</option>
        {users.map(user => (
          <option key={user.id} value={user.username}>{user.username}</option>
        ))}
      </select>
    </label>

    <label>
      Sort by Title:
      <select value={sortOrder} onChange={(e) => {
        //When value is changed, set all todos' new flag to false
        todos.forEach(todo => {
          todo.new = false;
        });

        setSortOrder(e.target.value)
      }}>
        <option value="asc">Title: asc</option>
        <option value="desc">Title: desc</option>
      </select>
    </label>
  </div>
);
export default FilterSort;