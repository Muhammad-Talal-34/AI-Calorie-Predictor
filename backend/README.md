# Smart Fitness Lab - Backend API (Django + Machine Learning)

This is the backend service for the Smart Fitness Lab application. It serves a highly optimized XGBoost regression model through a Django REST Framework (DRF) API. 

The backend receives biometric and workout data from the React frontend, processes it through the pre-trained machine learning model, and returns the estimated calorie expenditure in real-time.

## 🚀 Tech Stack
* **Framework:** Django, Django REST Framework (DRF)
* **Machine Learning:** XGBoost (`XGBRegressor`), Scikit-Learn
* **Data Handling:** Pandas, NumPy
* **Cross-Origin:** `django-cors-headers`

## 🧠 Model Performance
The predictive engine is an XGBoost model trained on human physiological data (Heart Rate, Body Temperature, Duration, etc.). 
* **R² Score:** `0.9996` (Near-perfect variance explanation)
* **Mean Absolute Error (MAE):** `0.87` (Predictions are accurate to within less than 1 calorie on average).

## 📁 Folder Structure
```text
backend/
├── api/                  # Main API app containing views and routing
├── backend_core/         # Django project settings and CORS config
├── calorie_model.pkl     # Serialized XGBoost model
├── manage.py             # Django entry point
└── requirements.txt      # Python dependencies


Local Setup Instructions
Navigate to the backend directory:

Bash
cd backend
Create and activate a virtual environment (Recommended):

Bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
Install the dependencies:

Bash
pip install -r requirements.txt
Start the development server:

Bash
python manage.py runserver
The API will now be running at http://localhost:8000/.