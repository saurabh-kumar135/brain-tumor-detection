#!/bin/bash
cat > .env <<'ENVEOF'
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/brain-tumor-detection?retryWrites=true&w=majority&appName=Cluster0
SESSION_SECRET=your-secret-key-change-in-production
PORT=3001
NODE_ENV=development
PYTHON_PATH=python
ML_MODEL_PATH=../ml-model/models/brain_tumor_model.h5
ENVEOF
echo "✅ .env file updated successfully!"
echo "⚠️  Remember to update MONGODB_URI and SESSION_SECRET with your actual values!"
