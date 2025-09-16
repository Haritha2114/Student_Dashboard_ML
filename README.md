# Student_Dashboard_ML

A data-driven student analytics dashboard built using **Next.js** and **Python** for analysis and machine learning. This project uses a synthetic student dataset to analyze cognitive skills, predict assessment scores, and cluster students into learning personas.

---

## 🚀 Project Overview

### Dataset
The synthetic dataset includes the following fields:

- `student_id`: Unique identifier
- `name`: Student name
- `class`: Class/section
- `comprehension`, `attention`, `focus`, `retention`: Cognitive skill scores
- `assessment_score`: Overall performance score
- `engagement_time`: Time spent on learning activities

---

### Tasks & Features

1. **Data Analysis & ML**
   - Analyze correlations between cognitive skills and performance.
   - Build a simple ML model (e.g., Random Forest, Linear Regression) to predict `assessment_score`.
   - Cluster students into learning personas (e.g., high performers, balanced learners).

2. **Next.js Dashboard**
   - **Overview stats**: Average scores, skill summaries.
   - **Charts**:
     - Bar chart: Skill vs assessment score.
     - Scatter chart: Attention vs performance.
     - Radar chart: Individual student profile.
   - **Student Table**: Searchable and sortable table of students.
   - **Insights Section**: Key findings from analysis.

---

## 📂 Deliverables

- **Jupyter Notebook**: Data analysis, correlations, ML model, and clustering.
- **Next.js Dashboard**: Interactive visualizations and student table.

---

## 💻 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Haritha2114/Student_Dashboard_ML.git
cd Student_Dashboard_ML

## 2. Python environment (analysis + ML)

```bash
# Optionally create a virtual environment
python -m venv venv

# Activate environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt


### 3. Next.js dashboard
```bash
cd web
npm install

### 4. Run the dashboard
```bash
# Default port 3000
npm run dev

# Or specify a custom port if 3000 is in use
npx next dev -p 3001


Open your browser at http://localhost:3000
 (or your chosen port) to view the dashboard.

---


**⚡ Usage**

Explore correlations and ML predictions in the Jupyter Notebook.

Use the dashboard to visualize skill performance and student clusters.

Search, sort, and filter students in the table.

Gain insights from charts and persona analysis.

**🛠 Tech Stack**

Python: Pandas, NumPy, scikit-learn, Matplotlib/Seaborn

Next.js: React-based dashboard

Charting: Chart.js or Recharts (bar, scatter, radar)

JSON: Processed data storage for dashboard
