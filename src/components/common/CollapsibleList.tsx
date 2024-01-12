import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  children: React.ReactNode;
  toggleIconElement?: React.ReactNode;
}

const CollapsibleList = ({ toggleIconElement, title, children }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <ul>
      <ListHeader
        isCollapsed={isCollapsed}
        onClick={() => setIsCollapsed(prev => !prev)}
      >
        {toggleIconElement ? (
          toggleIconElement
        ) : (
          <FontAwesomeIcon
            icon={faChevronRight}
            size="sm"
            className="toggle-menu-icon"
          />
        )}
        <h2>{title}</h2>
      </ListHeader>
      {!isCollapsed && <>{children}</>}
    </ul>
  );
};

export default CollapsibleList;

const ListHeader = styled.ul<{ isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  font-size: ${props => props.theme.fontSize.small};
  &:hover {
    background-color: rgb(230, 230, 230);
    svg {
      opacity: 1;
    }
  }
  svg {
    opacity: 0;
    color: ${({ theme }) => theme.iconColor};
    padding: 0 5px;
    transform: ${props => (props.isCollapsed ? 'rotate(90deg)' : 'none')};
    &:hover {
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;
