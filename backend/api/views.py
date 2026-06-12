from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import joblib
import os

# Load the model once when the server starts
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'calorie_model.pkl')
model = joblib.load(MODEL_PATH)

@api_view(['POST'])
def predict_calories(request):
    try:
        # 1. Get data sent from React
        data = request.data
        
        # 2. Convert Gender text to number (Male=0, Female=1)
        gender_val = 0 if data['gender'] == 'Male' else 1
        
        # 3. Format data exactly how XGBoost expects it
        input_data = pd.DataFrame([[
            gender_val, 
            int(data['age']), 
            float(data['height']), 
            float(data['weight']), 
            int(data['duration']), 
            int(data['heart_rate']), 
            float(data['body_temp'])
        ]], columns=['Gender', 'Age', 'Height', 'Weight', 'Duration', 'Heart_Rate', 'Body_Temp'])
        
        # 4. Make prediction
        prediction = model.predict(input_data)[0]
        
        # 5. Send result back to React
        return Response({'calories_burned': round(float(prediction), 2)})
        
    except Exception as e:
        return Response({'error': str(e)}, status=400)