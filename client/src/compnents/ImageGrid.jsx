export default function ImageGrid({ images, selected, toggle }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 10,
      marginTop: 20
    }}>
      {images.map(img => (
        <div key={img.id} style={{ position: 'relative' }}>
          <img
            src={img.urls.small}
            style={{ width: '100%', borderRadius: 4 }}
          />
          <input
            type="checkbox"
            checked={selected.has(img.id)}
            onChange={() => toggle(img.id)}
            style={{
              position: 'absolute', top: 8, left: 8, width: 20, height: 20
            }}
          />
        </div>
      ))}
    </div>
  );
}
