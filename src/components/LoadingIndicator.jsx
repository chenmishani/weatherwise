function LoadingIndicator({ message = 'Loading...', size = 'medium' }) {
  return (
    <div
      className={`loading-container loading-${size}`}
      role="status"
      aria-live="polite"
    >
      <span className="loading-spinner" aria-hidden="true" />
      <span className="loading-text">{message}</span>
    </div>
  );
}

export default LoadingIndicator;
