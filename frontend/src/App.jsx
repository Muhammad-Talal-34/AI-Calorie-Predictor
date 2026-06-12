import { useState } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('cyan');
  const [formData, setFormData] = useState({
    gender: 'Male',
    age: 25,
    height: 170,
    weight: 70,
    duration: 30,
    heart_rate: 100,
    body_temp: 38.5,
    goal: 'Weight Loss'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      setResult(data.calories_burned);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
    
    setLoading(false);
  };

  const getNutritionPlan = () => {
    let plan = { text: "", foods: [] };
    
    if (result < 150) {
      plan.text = `Target: ${formData.goal}. Light activity detected. Focus on hydration and light snacks.`;
      plan.foods = [
        { title: "Mineral Water", desc: "Rehydrate immediately.", img: "/images/water.jpg" },
        { title: "Green Tea", desc: "Antioxidant boost.", img: "/images/green_tea.jpg" },
        { title: "Fresh Apple", desc: "Quick simple carbs.", img: "/images/apple.jpg" },
        { title: "Almonds", desc: "Healthy fats.", img: "/images/almonds.jpg" }
      ];
    } else if (result >= 150 && result <= 300) {
      plan.text = `Target: ${formData.goal}. Moderate activity detected. Replenish energy levels safely.`;
      plan.foods = [
        { title: "Electrolyte Water", desc: "Crucial for rehydration.", img: "/images/electrolyte.jpg" },
        { title: "Fresh Banana", desc: "Restores glycogen fast.", img: "/images/banana.jpg" },
        { title: "Boiled Eggs", desc: "Essential amino acids.", img: "/images/eggs.jpg" },
        { title: "Greek Yogurt", desc: "Slow digesting protein.", img: "/images/yogurt.jpg" }
      ];
    } else {
      plan.text = `Target: ${formData.goal}. High intensity burn. Full recovery protocol required.`;
      plan.foods = [
        { title: "Protein Shake", desc: "Fast absorbing protein.", img: "/images/protein_shake.jpg" },
        { title: "Sweet Potato", desc: "Complex carbs recovery.", img: "/images/sweet_potato.jpg" },
        { title: "Grilled Chicken", desc: formData.goal === 'Weight Loss' ? "Keep portions lean." : "High protein load.", img: "/images/chicken.jpg" },
        { title: "White Rice", desc: "Quick energy spike.", img: "/images/rice.jpg" }
      ];
    }
    return plan;
  };

  return (
    <div className={`app-wrapper theme-${theme}`}>
      
      {/* NAVBAR */}
      <nav className="top-navbar">
        <div className="nav-logo">
          <span className="logo-icon">🧬</span> Smart Fitness Lab
        </div>
        <div className="theme-switcher">
          <span>Theme:</span>
          <button onClick={() => setTheme('cyan')} className={`color-dot cyan ${theme === 'cyan' ? 'active' : ''}`}></button>
          <button onClick={() => setTheme('green')} className={`color-dot green ${theme === 'green' ? 'active' : ''}`}></button>
          <button onClick={() => setTheme('pink')} className={`color-dot pink ${theme === 'pink' ? 'active' : ''}`}></button>
        </div>
      </nav>

      {/* FULL SCREEN MAIN CONTAINER (No outer cards) */}
      <div className="main-full-container">
        
        <div className="header">
          <h1>Biometric Engine</h1>
          <p>AI-Powered Calorie Analysis</p>
        </div>
        
        <form onSubmit={handleSubmit} className="premium-form">
          <div className="form-section">
            <h3>👤 Personal Profile</h3>
            <div className="input-grid">
              <div className="input-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="input-group">
                <label>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Weight (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="form-section">
            <h3>🏃 Workout Metrics</h3>
            <div className="input-grid">
              <div className="input-group">
                <label>Duration (min)</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Avg Heart Rate</label>
                <input type="number" name="heart_rate" value={formData.heart_rate} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Body Temp (°C)</label>
                <input type="number" name="body_temp" step="0.1" value={formData.body_temp} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Primary Goal</label>
                <select name="goal" value={formData.goal} onChange={handleChange}>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Maintain">Maintain Weight</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="predict-btn" disabled={loading}>
            {loading ? "Processing Data..." : "Calculate Calorie Burn"}
          </button>
        </form>

        {/* DASHBOARD RESULTS (Floating on Background) */}
        {result !== null && (
          <div className="results-container fade-in">
            
            <hr className="divider" />

            <div className="score-display">
              <h2>{result} <span className="unit">kcal</span></h2>
              <p className="subtitle">Total Energy Expended</p>
            </div>

            <div className="content-section">
              <h4>🔥 Energy Equivalents</h4>
              <div className="eq-cards">
                <div className="eq-card">
                  <span className="eq-icon">🫓</span>
                  <div className="eq-info">
                    <span className="eq-value">{(result / 100).toFixed(1)}</span>
                    <span className="eq-label">Slices of Bread</span>
                  </div>
                </div>
                <div className="eq-card">
                  <span className="eq-icon">🍔</span>
                  <div className="eq-info">
                    <span className="eq-value">{(result / 250).toFixed(1)}</span>
                    <span className="eq-label">Cheeseburgers</span>
                  </div>
                </div>
                <div className="eq-card">
                  <span className="eq-icon">☕</span>
                  <div className="eq-info">
                    <span className="eq-value">{(result / 80).toFixed(1)}</span>
                    <span className="eq-label">Sugary Coffees</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-section">
              <h4>🥗 Comprehensive Recovery Plan</h4>
              <p className="goal-text">{getNutritionPlan().text}</p>
              
              <div className="premium-food-grid">
                {getNutritionPlan().foods.map((food, index) => (
                  <div className="food-image-card" key={index}>
                    <div className="image-wrapper">
                      <img src={food.img} alt={food.title} />
                    </div>
                    <div className="food-info">
                      <span className="food-title">{food.title}</span>
                      <span className="food-desc">{food.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default App