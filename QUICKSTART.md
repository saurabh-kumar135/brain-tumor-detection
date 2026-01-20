# 🚀 Quick Start Guide - Brain Tumor Detection

## ⏱️ Total Time: 1-2 hours

Follow these steps to train your model and run the complete application.

---

## 📥 Step 1: Download Dataset (5 minutes)

1. Go to Kaggle: https://www.kaggle.com/datasets/navoneel/brain-mri-images-for-brain-tumor-detection
2. Click "Download" (you'll need a Kaggle account - it's free!)
3. Extract the ZIP file
4. You'll get two folders: `yes/` and `no/`
5. Create this structure:

```
brain-tumor-detection/ml-model/data/
├── yes/    (paste tumor images here)
└── no/     (paste no-tumor images here)
```

**Quick command:**

```bash
cd /home/saurabh-kumar123/Desktop/Desktop/express/brain-tumor-detection/ml-model
mkdir -p data/yes data/no
# Then copy the downloaded images to these folders
```

---

## 🐍 Step 2: Install Python Dependencies (2 minutes)

```bash
cd /home/saurabh-kumar123/Desktop/Desktop/express/brain-tumor-detection/ml-model
pip install -r requirements.txt
```

**This installs:**

- TensorFlow
- Keras
- OpenCV
- NumPy, Pandas
- Matplotlib, Seaborn
- Jupyter

---

## 🧠 Step 3: Train the Model (30-60 minutes)

### Option A: Using Jupyter Notebook (Recommended)

```bash
cd /home/saurabh-kumar123/Desktop/Desktop/express/brain-tumor-detection/ml-model
jupyter notebook
```

1. Open `notebooks/train_model.ipynb`
2. Run all cells (Cell → Run All)
3. Wait for training to complete (~30-60 min)
4. Model will be saved to `models/brain_tumor_model.h5`

### Option B: Using Google Colab (Faster with GPU)

1. Upload `train_model.ipynb` to Google Colab
2. Upload your dataset to Google Drive
3. Update paths in notebook
4. Run with GPU (Runtime → Change runtime type → GPU)
5. Training takes ~15-20 minutes with GPU!
6. Download the trained model

---

## 🖥️ Step 4: Set Up Backend (1 minute)

```bash
cd /home/saurabh-kumar123/Desktop/Desktop/express/brain-tumor-detection/backend
npm install
```

---

## 🎨 Step 5: Set Up Frontend (1 minute)

```bash
cd /home/saurabh-kumar123/Desktop/Desktop/express/brain-tumor-detection/client
npm install
```

---

## 🚀 Step 6: Run the Application

### Terminal 1 - Backend

```bash
cd /home/saurabh-kumar123/Desktop/Desktop/express/brain-tumor-detection/backend
npm start
```

**You should see:**

```
🚀 Brain Tumor Detection API running on port 3001
📍 http://localhost:3001
```

### Terminal 2 - Frontend

```bash
cd /home/saurabh-kumar123/Desktop/Desktop/express/brain-tumor-detection/client
npm run dev
```

**You should see:**

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

---

## 🧪 Step 7: Test the Application

1. Open browser: `http://localhost:5173`
2. Click "Click to upload MRI scan"
3. Select a brain MRI image from your dataset
4. Click "Analyze MRI Scan"
5. See the prediction result!

---

## 📊 Expected Results

After training, you should see:

- **Training Accuracy**: ~95%
- **Test Accuracy**: ~90-92%
- **Prediction Time**: <1 second

---

## 🐛 Troubleshooting

### Problem: "Module not found: tensorflow"

**Solution:**

```bash
pip install tensorflow
```

### Problem: "Python not found"

**Solution:**
Make sure Python 3.8+ is installed:

```bash
python --version
# or
python3 --version
```

### Problem: "Model file not found"

**Solution:**
Make sure you completed Step 3 and the model was saved to:
`ml-model/models/brain_tumor_model.h5`

### Problem: "CORS error in frontend"

**Solution:**
Make sure backend is running on port 3001

### Problem: "Out of memory during training"

**Solution:**

- Reduce batch size in notebook (change `BATCH_SIZE = 16`)
- Or use Google Colab with GPU

---

## ✅ Checklist

- [ ] Downloaded dataset from Kaggle
- [ ] Extracted to `ml-model/data/yes` and `ml-model/data/no`
- [ ] Installed Python dependencies
- [ ] Trained model using Jupyter notebook
- [ ] Model saved to `models/brain_tumor_model.h5`
- [ ] Installed backend dependencies
- [ ] Installed frontend dependencies
- [ ] Backend running on port 3001
- [ ] Frontend running on port 5173
- [ ] Successfully tested prediction!

---

## 🎉 Next Steps

Once everything works:

1. Push to GitHub
2. Deploy backend to Render
3. Deploy frontend to Vercel
4. Add live demo link to resume!

---

## 💡 Tips

- **Use Google Colab** for faster training (free GPU!)
- **Save your model** after training
- **Test with multiple images** to verify accuracy
- **Take screenshots** for your portfolio

---

**Need help?** Check the main README.md or the implementation plan!
