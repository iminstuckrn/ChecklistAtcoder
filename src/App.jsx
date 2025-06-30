import React, { useEffect, useState } from 'react';

function App() {
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/problems.json')
      .then(res => res.json())
      .then(data => setProblems(data));
  }, []);

  const toggleDone = (title) => {
    const current = localStorage.getItem(title) === 'true';
    localStorage.setItem(title, !current);
    setProblems([...problems]);
  };

  const isDone = (title) => localStorage.getItem(title) === 'true';

  const filteredProblems = problems.filter(p =>
    filter === 'All' || p.difficulty === filter
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📝 CP Checklist</h1>
      <label>
        Filter:
        <select onChange={e => setFilter(e.target.value)} value={filter}>
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </label>
      <ul>
        {filteredProblems.map((p, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={isDone(p.title)}
              onChange={() => toggleDone(p.title)}
            />
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: '10px',
                textDecoration: isDone(p.title) ? 'line-through' : 'none',
                color: isDone(p.title) ? 'gray' : 'black'
              }}
            >
              {p.title} [{p.difficulty}]
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
