export default function TopSearches({ items }) {
  return (
    <div style={{
      background: '#eef', padding: 10, borderRadius: 4, marginBottom: 20
    }}>
      <strong>Top searches:</strong>
      {items.map(x => ` ${x.term}(${x.count}) `)}
    </div>
  );
}
