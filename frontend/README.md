```markdown
# Smart Fitness Lab - Frontend UI (React + Vite)

This is the client-side application for the Smart Fitness Lab. It is a premium, dashboard-style web interface built with React. It features a dark-themed, glassmorphism UI that visualizes machine learning predictions from the Django backend.

Aside from predicting calories, the UI includes a dynamic "Nutrition Logic Engine" that recommends specific local recovery meals (Light, Moderate, or High-intensity) based on the user's primary goal (Weight Loss vs. Muscle Gain) and total energy expended.

## 🚀 Tech Stack
* **Core:** React (initialized via Vite for lightning-fast HMR)
* **Styling:** Custom Vanilla CSS (Glassmorphism, CSS Grid/Flexbox layouts)
* **API Communication:** Native Fetch API

## ✨ Key Features
* **Split-Screen Dashboard:** Clean separation between the input form and the generated analytics.
* **Energy Equivalents:** Converts raw calories into understandable real-world metrics (e.g., slices of bread, cups of tea).
* **Dynamic Recovery Plans:** Renders different food recommendations dynamically based on the XGBoost prediction result.
* **Local Asset Management:** Fully functional offline rendering using local static images for zero-latency load times.

## 🖼️ Local Images Setup Note
To keep the app fast and prevent broken image links from external CDNs, this app uses local static assets. 
Before running the app, ensure you have placed the 12 required `.jpg` food images into the `public/images/` directory.

## ⚙️ Local Setup Instructions

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend