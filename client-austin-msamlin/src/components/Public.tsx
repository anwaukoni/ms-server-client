import { Link } from 'react-router-dom';

const Public = () => (
  <section className="public">
    <header>
      <h1>Welcome to App!</h1>
    </header>
    <footer>
      <Link to="/login">Login</Link>
    </footer>
  </section>
);
export default Public;
