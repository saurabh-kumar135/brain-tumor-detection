import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { hospital, logout, isAuthenticated } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="navbar-brand">
                    🧠 Brain Tumor Detection
                </Link>
                <div className="navbar-links">
                    {isAuthenticated ? (
                        <>
                            <span className="nav-link">Welcome, {hospital?.hospitalName}</span>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <button onClick={handleLogout} className="btn btn-logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
