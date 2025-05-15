import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  return (
    <form onSubmit={e => { e.preventDefault(); onSearch(term); }}>
      <input
        value={term}
        onChange={e => setTerm(e.target.value)}
        placeholder="Search images..."
        style={{ width: '80%', padding: 8 }}
      />
      <button type="submit">Search</button>
    </form>
  );
}
