import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="auth-page">
            <div className="container" style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                    🧠 Brain Tumor Detection System
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
                    AI-Powered Medical Imaging Analysis for Hospitals
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/signup" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                        Register Your Hospital
                    </Link>
                    <Link to="/login" className="btn btn-secondary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                        Login
                    </Link>
                </div>
                <div style={{ marginTop: '3rem', maxWidth: '800px', margin: '3rem auto' }}>
                    <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Features</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
                        <div className="auth-card">
                            <h3>🎯 High Accuracy</h3>
                            <p>78% test accuracy with 97% tumor detection sensitivity</p>
                        </div>
                        <div className="auth-card">
                            <h3>⚡ Fast Analysis</h3>
                            <p>Get results in under 2 seconds</p>
                        </div>
                        <div className="auth-card">
                            <h3>🔒 Secure</h3>
                            <p>Hospital-only access with encrypted sessions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
