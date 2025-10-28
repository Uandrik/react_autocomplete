import React from 'react';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  onSelected: (person: Person) => void;
  onQuery: (prop: string) => void;
  menu: (isOpen: boolean) => void;
};

const DropdownMenuComponent: React.FC<Props> = ({
  people,
  onSelected,
  onQuery,
  menu,
}) => {
  return (
    <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
      <div className="dropdown-content">
        {people.map(ppl => (
          <div
            className="dropdown-item"
            key={ppl.slug}
            style={{ cursor: 'pointer' }}
            data-cy="suggestion-item"
            onClick={() => {
              onSelected(ppl);
              onQuery(ppl.name);
              menu(false);
            }}
          >
            <p className="has-text-link">{ppl.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DropdownMenu = React.memo(DropdownMenuComponent);
