export default function History({ items }) {
  return (
    <div style={{ marginTop: 30 }}>
      <h4>Your recent searches:</h4>
      <ul>
        {items.map(h => (
          <li key={h._id}>{h.term} @ {new Date(h.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}
