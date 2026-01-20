#!/bin/bash
cat > .env << 'ENVEOF'
MONGODB_URI=mongodb+srv://saurabh3:CRUDABCSAURABH3@cluster0.fktslxn.mongodb.net/brain-tumor-detection?retryWrites=true&w=majority&appName=Cluster0
SESSION_SECRET=brain-tumor-detection-secret-key-change-in-production
PORT=3001
NODE_ENV=development
PYTHON_PATH=python
ML_MODEL_PATH=../ml-model/models/brain_tumor_model.h5
ENVEOF
echo "✅ .env file updated successfully!"
