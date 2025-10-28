import React from 'react';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  onName: (person: string) => void;
  onBorn: (person: string) => void;
  onDied: (person: string) => void;
  onQuery: (prop: string) => void;
  menu: (isOpen: boolean) => void;
};

const DropdownMenuComponent: React.FC<Props> = ({
  people,
  onName,
  onBorn,
  onDied,
  onQuery,
  menu,
}) => {
  return (
    <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
      <div className="dropdown-content">
        {people.map((ppl, i) => (
          <div
            className="dropdown-item"
            key={i}
            style={{ cursor: 'pointer' }}
            data-cy="suggestion-item"
            onClick={() => {
              onName(ppl.name);
              onBorn(String(ppl.born));
              onDied(String(ppl.died));
              onQuery('');
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
