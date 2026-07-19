import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page-container not-found-container">
      <h1>404 &mdash; Page Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="home-link">
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
