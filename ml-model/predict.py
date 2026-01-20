"""
Brain Tumor Detection - Prediction Script
Loads trained model and makes predictions on MRI images
"""

import sys
import json
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import os

def preprocess_image(image_path):
    """
    Preprocess MRI image for model prediction
    """
    try:
        # Read image
        img = cv2.imread(image_path)
        
        if img is None:
            raise ValueError(f"Could not read image from {image_path}")
        
        # Resize to model input size
        img = cv2.resize(img, (224, 224))
        
        # Normalize pixel values to [0, 1]
        img = img / 255.0
        
        # Add batch dimension
        img = np.expand_dims(img, axis=0)
        
        return img
    
    except Exception as e:
        print(json.dumps({'error': f'Image preprocessing failed: {str(e)}'}))
        sys.exit(1)

def predict_tumor(image_path, model_path=None):
    """
    Predict if brain MRI scan contains a tumor
    """
    try:
        # Get absolute path to model
        if model_path is None:
            script_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(script_dir, 'models', 'brain_tumor_model.h5')
        
        # Load model
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model not found at {model_path}")
        
        model = load_model(model_path)
        
        # Preprocess image
        processed_img = preprocess_image(image_path)
        
        # Make prediction
        prediction = model.predict(processed_img, verbose=0)[0][0]
        
        # Prepare result
        result = {
            'hasTumor': bool(prediction > 0.5),
            'confidence': float(prediction),
            'prediction': 'Tumor Detected' if prediction > 0.5 else 'No Tumor',
            'confidencePercentage': f'{prediction * 100:.2f}%'
        }
        
        return result
    
    except Exception as e:
        return {'error': f'Prediction failed: {str(e)}'}

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No image path provided'}))
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(json.dumps({'error': f'Image not found: {image_path}'}))
        sys.exit(1)
    
    # Make prediction
    result = predict_tumor(image_path)
    
    # Output as JSON
    print(json.dumps(result))
