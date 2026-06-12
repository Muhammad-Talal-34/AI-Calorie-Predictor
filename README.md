# 🧬 Smart Fitness Lab: AI-Powered Biometric Analysis

An end-to-end, full-stack machine learning web application that predicts physiological energy expenditure (calories burned) based on real-time biometric data and provides dynamic, goal-oriented recovery protocols.

## 💡 About the Project

Most fitness calculators rely on generic formulas. I built the Smart Fitness Lab to bridge the gap between raw data and actionable health insights. The core of the application is a custom-trained **XGBoost Regression Model** served via a Django REST API, which interacts with a premium, glassmorphism-styled React dashboard.

Instead of just outputting a number, the application acts as an automated fitness coach. It converts raw calorie data into relatable "energy equivalents" (e.g., slices of bread, cups of tea) and dynamically generates a post-workout nutrition plan based on the user's primary fitness goal and workout intensity.

### 🏆 Machine Learning Performance
The model was trained on thousands of rows of human biometric data (Heart Rate, Body Temperature, Duration) combined with baseline demographics.
* **R² Score:** `0.9996` (Explains ~99.9% of the variance in the dataset)
* **Mean Absolute Error (MAE):** `0.87` (Predictions are mathematically accurate to within less than 1 calorie on average).

## 🛠️ Tech Stack

**Frontend (Client)**
* **React.js (Vite):** Chosen for lightning-fast HMR and optimized production builds.
* **Vanilla CSS3:** Custom Glassmorphism UI, CSS Grid/Flexbox architectures, and CSS Variables for state-based theme switching.

**Backend (API & Engine)**
* **Python & Django REST Framework (DRF):** Robust API routing and secure cross-origin resource sharing (CORS).
* **Machine Learning:** `scikit-learn`, `xgboost`, `pandas`, `joblib` for model serialization.

## ✨ Key Features

* **Real-time AI Inference:** Sub-second prediction times via the Django DRF endpoint.
* **Dynamic Recovery Engine:** Algorithmically selects 1 of 3 distinct post-workout dietary protocols (Light, Moderate, Heavy) based on the exact calculated burn and the user's defined goal (Weight Loss, Maintain, Muscle Gain).
* **Cinematic Dashboard UI:** Built from scratch without UI libraries. Features frosted glass panels, responsive grids, and high-contrast accessibility.
* **Live Theme Switcher:** Uses CSS custom properties to allow users to toggle between 3 cinematic accent colors (Cyan, Neon Green, Hot Pink) instantly.

## 📁 Repository Architecture

This is a monorepo containing both the frontend and backend services:

```text
AI-Calorie-Predictor/
├── backend/                  # Django REST API & ML Engine
│   ├── api/                  # Prediction views and routing
│   ├── backend_core/         # Django settings & CORS config
│   └── calorie_model.pkl     # Serialized XGBoost regression model
│
├── frontend/                 # React Vite Application
│   ├── public/images/        # High-res local static assets for fast load times
│   ├── src/App.jsx           # Main React logic and API fetching
│   └── src/App.css           # Premium Glassmorphism styling & themes
│
└── README.md                 # Project documentation


## 🚀 How to Run Locally

To get this project running on your local machine, you will need to start both the Django backend and the React frontend.

### Prerequisites
* Python 3.8+
* Node.js (v16+)

### 1. Start the Django Backend
Open a terminal, navigate to the project root, and run:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver```


2. Start the React Frontend
Open a new terminal window, navigate to the project root, and run:

Bash
cd frontend
npm install
npm run dev
The UI will start at http://localhost:5173


