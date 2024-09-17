import styled from 'styled-components';

export const DropdownContainer = styled.div<{ $isOpen: boolean }>`
  position: relative;
  width: 295px;
  border: 1px solid ${(props) => (props.$isOpen ? '#666666' : '#d1d5db')};
  border-radius: 8px;
  box-sizing: content-box;
`;

export const DropdownSelect = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  background-color: #f9fafb;
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  ${(props) => (props.$isOpen ? 'border-bottom: 1px solid #666666' : '')}
`;

export const DropdownMenu = styled.div`
  width: 100%;
  padding: 10px 0;
  background-color: #fff;
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #666666;
  border-radius: 0 0 8px 8px;
  z-index: 1000;
`;

export const DropdownSearch = styled.input`
  width: 95%;
  padding: 8px 4px;
  margin-bottom: 12px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #f9fafb;
  box-sizing: border-box;
`;

export const DropdownList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DropdownItem = styled.li`
  width: 100%;
  cursor: pointer;
  text-align: left;
  padding: 3px 16px;

  &:hover {
    background-color: #f5f5f5;
  }
`;
