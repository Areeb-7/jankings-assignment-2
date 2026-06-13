import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const services = [
    'Salon',
    'Professional cleaning',
    'Professional bathroom cleaning',
    'Full home cleaning',
    'Carpenters',
    'Massage for men',
    'Spa luxe',
    'Washing machine repair',
    'Electricians',
    'RO repair',
  ];

  // Filter suggestions based on query
  const filteredSuggestions =
    query.trim() === ''
      ? services // Show all services if query is empty
      : services.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );

  const handleFocus = () => {
    setDropdownOpen(true);
  };

  const handleBlur = () => {
    // Delay closing to allow item selection
    setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search for services (e.g., Spa, Cleaning)"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {isDropdownOpen && (
        <div className="dropdown">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <div key={index} className="dropdown-item">
                {suggestion}
              </div>
            ))
          ) : (
            <div className="dropdown-item">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
