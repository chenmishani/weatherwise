import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="brand-logo" aria-label="WeatherWise Home">
          🌤️ WeatherWise
        </Link>
        <nav className="main-nav" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
