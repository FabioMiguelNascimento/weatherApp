import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from 'react';
import './SearchBar.scss';

export function SearchBar({ onSearch, locationText }) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = async () => {
    await onSearch(inputValue);
    setInputValue("");
    inputRef.current?.blur();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="input-container">
      <input
        ref={inputRef}
        type="text"
        value={isFocused ? inputValue : locationText}
        placeholder="Insira a cidade..."
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <FontAwesomeIcon 
        icon={faMagnifyingGlass} 
        className="search-icon"
        onClick={handleSearch}
      />
    </div>
  );
}
