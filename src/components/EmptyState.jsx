function EmptyState({ icon = 'ℹ️', title, message }) {
  return (
    <div className="empty-state-panel">
      {icon && (
        <span className="empty-state-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {title && <h3 className="empty-state-title">{title}</h3>}
      {message && <p className="empty-state-message">{message}</p>}
    </div>
  );
}

export default EmptyState;
