# 🚀 GitPulse

GitPulse is a web application that analyzes a developer's GitHub profile and repositories, visualizes programming language usage, and generates AI-powered insights about the developer's coding activity.

The application fetches GitHub profile data, repository information, and uses Google Gemini AI to generate an intelligent summary of the developer's work.

---

## ✨ Features

* 🔎 Search any GitHub username
* 👤 Display GitHub profile information
* 📦 Show repository details
* 📊 Language usage visualization (Pie Chart)
* 🤖 AI-generated developer insights using Google Gemini
* ⚡ Fast and responsive UI
* 🎨 Clean modern interface

---

## 🛠 Tech Stack

Frontend:

* React
* TypeScript
* Vite

Libraries:

* Recharts (for charts)
* Framer Motion (animations)

APIs:

* GitHub REST API
* Google Gemini AI API

---

## 📂 Project Structure

```
src
 ├── components
 │   ├── AIAnalysis.tsx
 │   ├── LanguageChart.tsx
 │   ├── ProfileHeader.tsx
 │   └── RepoCard.tsx
 │
 ├── services
 │   ├── githubService.ts
 │   └── geminiService.ts
 │
 ├── App.tsx
 ├── main.tsx
 ├── types.ts
 └── index.css
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/KaivalyaR-N/GitPulse.git
cd GitPulse
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root folder:

```
VITE_GEMINI_API_KEY=your_gemini_api_key
```

You can generate the API key from Google AI Studio.

### 4️⃣ Run the project

```
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 📊 How It Works

1. User enters a GitHub username.
2. The app fetches profile and repository data from the GitHub API.
3. Repository languages are analyzed and visualized.
4. Google Gemini generates an AI-based summary of the developer profile.

---

## 🔐 Environment Variables

```
VITE_GEMINI_API_KEY
```

Make sure `.env` is added to `.gitignore`.

---

## 🌐 Future Improvements

* GitHub contribution graph
* Repository popularity metrics
* Developer skill scoring
* Dark/Light mode toggle
* Export developer report

---

## 👨‍💻 Author

**Kaivalya Ranjit Narvekar**

GitHub:
https://github.com/KaivalyaR-N

---

## ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub!
