import React, { useState, useEffect, useRef } from 'react';
import {
  DropdownContainer,
  DropdownMenu,
  DropdownSelect,
  DropdownSearch,
  DropdownItem,
  DropdownList,
} from './Dropdown.styles';

export interface DropdownValue {
  value: string;
  text: string;
}

interface DropdownProps {
  data: DropdownValue[];
  renderOption?: (option: DropdownValue) => React.ReactNode;
  renderSelected?: (selected: DropdownValue | null) => React.ReactNode;
  onSearch?: (query: string) => Promise<DropdownValue[]> | DropdownValue[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  data,
  renderOption = (option) => <span>{option.text}</span>,
  renderSelected = (selected) => (
    <span>{selected ? selected.text : 'Select...'}</span>
  ),
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownValue | null>(
    null
  );
  const [filteredData, setFilteredData] = useState<DropdownValue[]>(data);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (onSearch) {
      const result = onSearch(searchQuery);
      if (result instanceof Promise) {
        result.then((data) => setFilteredData(data));
      } else {
        setFilteredData(result);
      }
    } else {
      const filtered = data.filter((item) =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data, onSearch]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: DropdownValue) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer className="dropdown" ref={dropdownRef} $isOpen={isOpen}>
      <DropdownSelect
        className="dropdown-selected"
        onClick={toggleDropdown}
        tabIndex={0}
        $isOpen={isOpen}
      >
        {renderSelected(selectedOption)}
      </DropdownSelect>

      {isOpen && (
        <DropdownMenu className="dropdown-menu">
          <DropdownSearch
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="dropdown-search"
          />
          <DropdownList className="dropdown-list">
            {filteredData.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="dropdown-option"
              >
                {renderOption(option)}
              </DropdownItem>
            ))}
          </DropdownList>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};
