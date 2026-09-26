export default function AdSlot({ size = 'banner', label = 'Advertisement' }) {
  // Placeholder for now — once your AdSense account is approved, replace the
  // inner <div> with your actual <ins class="adsbygoogle"> snippet for this slot.
  const dimensions = {
    banner: { width: '100%', maxWidth: 728, height: 90 },
    rectangle: { width: 300, height: 250 },
    leaderboard: { width: '100%', maxWidth: 970, height: 90 }
  }[size];

  return (
    <div className="ad-slot">
      <div
        style={{
          ...dimensions,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f2f2f2',
          border: '1px dashed #ccc',
          color: '#999',
          fontSize: '0.75rem'
        }}
      >
        {label}
      </div>
    </div>
  );
}