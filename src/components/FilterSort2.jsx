
import React from 'react';

const FilterSort2 = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="filters">
      <label>Sort by Completed Date:</label>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default FilterSort2;
