# AI Personal Finance Advisor 📊 💰

A modern, interactive personal finance management application powered by Google's Gemini AI. Get intelligent insights, visualize your financial data, and receive personalized financial advice through an intuitive chat interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.1-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF)

## ✨ Features

- 📈 **Interactive Dashboard**: Visualize your financial data with beautiful charts powered by Recharts
- 🤖 **AI-Powered Insights**: Get personalized financial advice using Google's Gemini AI
- 💬 **Chat Interface**: Natural conversation interface for financial queries
- 📊 **Real-time Analysis**: Dynamic financial data processing and visualization
- 🎯 **Smart Recommendations**: AI-driven financial recommendations and insights

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fi-ai-personal-finance-advisor.git
   cd fi-ai-personal-finance-advisor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1
- **Language**: TypeScript
- **Build Tool**: Vite
- **AI Integration**: Google Gemini AI
- **Charts**: Recharts
- **Development Tools**: 
  - TypeScript
  - Vite
  - Node.js

## 📁 Project Structure

```
fi-ai-personal-finance-advisor/
├── components/
│   ├── ChartRenderer.tsx    # Chart visualization component
│   ├── ChatInterface.tsx    # AI chat interface
│   ├── Dashboard.tsx        # Main dashboard view
│   ├── Icons.tsx           # UI icons
│   ├── LoadingSpinner.tsx  # Loading animations
│   └── Welcome.tsx         # Welcome screen
├── services/
│   ├── geminiService.ts    # Gemini AI integration
│   └── mcpService.ts       # Financial data service
├── App.tsx                 # Main application component
├── types.ts               # TypeScript type definitions
└── vite.config.ts        # Vite configuration
```

## 🔨 Build

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ 
