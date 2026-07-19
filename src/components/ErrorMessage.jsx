function ErrorMessage({ message, type = 'general' }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`error-banner error-banner-${type}`} role="alert">
      <span className="error-icon" aria-hidden="true">
        ⚠️
      </span>
      <span className="error-text">{message}</span>
    </div>
  );
}

export default ErrorMessage;
