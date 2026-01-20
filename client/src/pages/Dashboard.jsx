import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
    const { hospital } = useAuth();
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
            setPrediction(null);
            setError('');
        }
    };

    const handleAnalyze = async () => {
        if (!selectedImage) {
            setError('Please select an image first');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const response = await axios.post('http://localhost:3001/api/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            setPrediction(response.data.prediction);
        } catch (err) {
            setError(err.response?.data?.error || 'Prediction failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleNewScan = () => {
        setSelectedImage(null);
        setPreview(null);
        setPrediction(null);
        setError('');
    };

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <h1>Welcome, {hospital?.hospitalName}</h1>
                    <p>Upload MRI scans for brain tumor detection</p>
                </div>

                <div className="dashboard-content">
                    <div className="upload-section">
                        {!preview ? (
                            <div className="upload-area" onClick={() => document.getElementById('file-input').click()}>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    style={{ display: 'none' }}
                                />
                                <div>
                                    <h2>📁 Upload MRI Scan</h2>
                                    <p>Click to select an MRI image</p>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                                        Supported formats: JPG, PNG
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="upload-area has-image">
                                <img src={preview} alt="MRI Preview" className="image-preview" />
                                <div style={{ marginTop: '1rem' }}>
                                    {!prediction && (
                                        <>
                                            <button onClick={handleAnalyze} className="btn btn-primary" disabled={loading}>
                                                {loading ? 'Analyzing...' : '🔍 Analyze MRI Scan'}
                                            </button>
                                            <button onClick={handleNewScan} className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
                                                Upload Different Image
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-error" style={{ marginTop: '1rem' }}>
                                {error}
                            </div>
                        )}

                        {loading && (
                            <div className="loading">
                                <div className="spinner"></div>
                                <p>Analyzing MRI scan...</p>
                            </div>
                        )}

                        {prediction && (
                            <div className={`result-card ${prediction.hasTumor ? 'tumor' : 'no-tumor'}`}>
                                <h2 className="result-title">
                                    {prediction.hasTumor ? '⚠️ Tumor Detected' : '✅ No Tumor Detected'}
                                </h2>
                                
                                <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
                                    <strong>Prediction:</strong> {prediction.prediction}
                                </p>

                                <div>
                                    <p style={{ marginBottom: '0.5rem' }}>
                                        <strong>Confidence Level:</strong>
                                    </p>
                                    <div className="confidence-bar">
                                        <div 
                                            className="confidence-fill" 
                                            style={{ width: prediction.confidencePercentage }}
                                        >
                                            {prediction.confidencePercentage}
                                        </div>
                                    </div>
                                </div>

                                <div className="disclaimer">
                                    <strong>⚕️ Medical Disclaimer:</strong> This is an AI-assisted diagnostic tool. 
                                    Results should be verified by qualified medical professionals. 
                                    This tool is not a substitute for professional medical diagnosis.
                                </div>

                                <button onClick={handleNewScan} className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                                    Analyze New Scan
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
