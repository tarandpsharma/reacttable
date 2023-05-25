import React, {useState} from 'react';
import '../Table.css';
const Filtered = ({ onFilter }) => {
    
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
      onFilter(event.target.value);
    };
  
    
    return (
      <>
      <h3 style={{color: 'lightgray'}}> Search Your Word here...</h3>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search..."
        className="filter1"
      />
      </>
    );
  };
  export default Filtered;