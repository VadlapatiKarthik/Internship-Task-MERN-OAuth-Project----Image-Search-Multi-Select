import React, { useEffect, useState } from 'react';
import { fetchUser, loginProviders, logout,
         searchImages, getHistory, getTopSearches } from './services/api';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import SelectedCounter from './components/SelectedCounter';
import History from './components/History';
import TopSearches from './components/TopSearches';

export default function App() {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [topSearches, setTopSearches] = useState([]);

  useEffect(() => {
    fetchUser().then(({ data }) => setUser(data));
    refreshMeta();
  }, []);

  function refreshMeta() {
    getHistory().then(setHistory);
    getTopSearches().then(setTopSearches);
  }

  async function onSearch(term) {
    const imgs = await searchImages(term);
    setImages(imgs);
    setSelected(new Set());
    refreshMeta();
  }

  if (user === null) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <h2>Please log in</h2>
        <button onClick={loginProviders.google}>Google</button>
        <button onClick={loginProviders.facebook}>Facebook</button>
        <button onClick={loginProviders.github}>GitHub</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <button onClick={() => logout().then(() => setUser(null))}>Logout</button>
      <h3>Welcome, {user.name}</h3>
      <TopSearches items={topSearches} />
      <SearchBar onSearch={onSearch} />
      <SelectedCounter count={selected.size} />
      <ImageGrid
        images={images}
        selected={selected}
        toggle={id => {
          const s = new Set(selected);
          s.has(id) ? s.delete(id) : s.add(id);
          setSelected(s);
        }}
      />
      <History items={history} />
    </div>
  );
}
