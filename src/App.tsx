import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';

import classNames from 'classnames';
import { DropdownMenu } from './components/DropdownMenu';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setApliedQuery] = useState('');
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [personName, setPersonName] = useState('');
  const [personBorn, setPersonBorn] = useState('');
  const [personDied, setPersonDied] = useState('');

  const timerId = useRef(0);
  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    setPersonName('');
    setPersonBorn('');
    setPersonDied('');

    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setApliedQuery(event.target.value);
    }, 300);
  };

  const filteredPeople = useMemo(() => {
    if (appliedQuery) {
      return peopleFromServer.filter(ppl =>
        ppl.name
          .toLowerCase()
          .trim()
          .includes(appliedQuery.toLowerCase().trim()),
      );
    }

    return peopleFromServer;
  }, [appliedQuery]);

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {personName && personBorn && personDied
            ? `${personName} (${personBorn} - ${personDied})`
            : `No selected person`}
        </h1>

        <div
          className={classNames('dropdown', {
            'dropdown is-active': menuIsOpen,
          })}
        >
          <div className="dropdown-trigger">
            <input
              ref={inputField}
              value={query}
              type="text"
              placeholder="Enter a part of the name"
              className="input"
              data-cy="search-input"
              onChange={handleQueryChange}
              onFocus={() => setMenuIsOpen(true)}
            />
          </div>

          <DropdownMenu
            people={filteredPeople}
            onName={setPersonName}
            onBorn={setPersonBorn}
            onDied={setPersonDied}
            onQuery={setQuery}
            menu={setMenuIsOpen}
          />
        </div>

        {filteredPeople.length === 0 && (
          <div
            className="
            notification
            is-danger
            is-light
            mt-3
            is-align-self-flex-start
          "
            role="alert"
            data-cy="no-suggestions-message"
          >
            <p className="has-text-danger">No matching suggestions</p>
          </div>
        )}
      </main>
    </div>
  );
};
