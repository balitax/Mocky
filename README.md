# Mocky - Dummy Data API Generator

> A powerful client-side web application for generating realistic mock datasets instantly. Perfect for prototyping, testing, and development.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📖 Usage](#-usage)
- [🏗️ Project Structure](#️-project-structure)
- [🎨 Customization](#-customization)
- [🛠️ Tech Stack](#️-tech-stack)
- [📝 Example Output](#-example-output)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🎯 10 Dataset Types
- **User Profiles** - Complete user data with names, emails, roles, avatars
- **Product Catalog** - E-commerce products with prices, categories, stock
- **Blog Posts** - Articles with titles, content, tags, engagement metrics
- **Comments** - User comments with timestamps and relationships
- **Classroom Schedules** - Educational schedules with subjects, teachers, rooms
- **Companies** - Business data with revenue, employees, industry info
- **Addresses** - Full addresses with coordinates
- **Transactions** - Financial transactions with payment methods
- **Events** - Event details with dates, capacity, pricing
- **Custom Dataset** - Define your own JSON templates

### 🚀 Core Capabilities
- ✅ **100% Client-Side** - No backend required, works offline
- ✅ **Flexible Count** - Generate 1-500 items per dataset
- ✅ **Enhanced Relational Mode** - Three output modes for complex relationships
  - **Single Mode** - Foreign keys only (traditional database style)
  - **Nested Mode** - Embedded related objects (GraphQL style)
  - **Multi Mode** - All related datasets in one response
- ✅ **Custom JSON Editor** - 300px editor with line numbers & beautify
- ✅ **Multiple Export Formats** - JSON, CSV, XML, TypeScript interface
- ✅ **Export Options** - Copy to clipboard or download files
- ✅ **Mock API Preview** - Dynamic endpoint URLs
- ✅ **Input Validation** - Smart error handling with toast notifications
- ✅ **Modern UI** - Clean, responsive design

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚀 Deployment

Mocky is a static web application that can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag & drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Surge**: Run `surge dist` for instant deployment

The app works entirely client-side with no backend requirements.

## 📖 Usage

### Basic Generation
1. Select a dataset type from the dropdown
2. Enter the number of items (1-500)
3. Click "Generate JSON"
4. Copy or download the data

### Generate with Relations
Enable relational mode to generate complete, interconnected datasets:

**Three Output Modes:**

1. **Single Mode** - Foreign keys only
   ```json
   [{ "id": "prod_1", "sellerId": "usr_1", "name": "Laptop" }]
   ```

2. **Nested Mode** - Embedded objects
   ```json
   [{
     "id": "prod_1",
     "sellerId": "usr_1",
     "user": { "id": "usr_1", "name": "John Doe" },
     "name": "Laptop"
   }]
   ```

3. **Multi Mode** - All related datasets
   ```json
   {
     "products": [{ "id": "prod_1", "sellerId": "usr_1" }],
     "users": [{ "id": "usr_1", "name": "John Doe" }]
   }
   ```

**Supported Relationships:**
- Products → Users (3:1 ratio)
- Posts → Users (5:1 ratio)
- Comments → Posts + Users (5:1 ratio)
- Transactions → Users (10:1 ratio)

### Custom Datasets
1. Select "Custom Dataset"
2. Enter your JSON template in the editor
3. Use "Beautify JSON" to format
4. Generate - each item gets a unique ID

**Example Template:**
```json
{
  "name": "Example Item",
  "status": "active",
  "priority": 1
}
```

## 🏗️ Project Structure

```
mocky/
├── src/
│   ├── components/          # React components
│   │   ├── Layout.jsx       # Main layout wrapper
│   │   ├── ControlPanel.jsx # Generation controls
│   │   ├── JsonViewer.jsx   # JSON display with actions
│   │   ├── ApiPreview.jsx   # Mock endpoint preview
│   │   └── Toast.jsx        # Notification system
│   ├── data-engine/         # Data generation logic
│   │   ├── generators/      # 10 dataset generators
│   │   │   ├── users.js
│   │   │   ├── products.js
│   │   │   ├── posts.js
│   │   │   ├── comments.js
│   │   │   ├── schedules.js
│   │   │   ├── companies.js
│   │   │   ├── addresses.js
│   │   │   ├── transactions.js
│   │   │   ├── events.js
│   │   │   └── custom.js
│   │   └── index.js         # Main generation entry
│   ├── utils/
│   │   └── randomizers.js   # Helper functions
│   ├── App.jsx              # Main app component
│   └── index.css            # Tailwind styles
├── tailwind.config.js       # Custom green theme
└── package.json
```

## 🎨 Customization

### Change Theme Color
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

### Add New Dataset Type
1. Create generator in `src/data-engine/generators/yourtype.js`
2. Import in `src/data-engine/index.js`
3. Add case in switch statement
4. Add option in `src/components/ControlPanel.jsx`

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4
- **Language**: JavaScript (ES6+)
- **Build Tool**: Vite
- **Data Engine**: Custom relational data generator
- **No external APIs** - Pure client-side generation

## 📝 Example Output

```json
[
  {
    "id": "comp_x7k2m9p",
    "name": "Tech Solutions Inc.",
    "industry": "Technology",
    "founded": 2015,
    "employees": 250,
    "revenue": 5000000,
    "isPublic": true,
    "website": "https://techsolutionsinc.com",
    "headquarters": "San Francisco",
    "createdAt": "2024-03-15T10:30:00.000Z"
  }
]
```

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to:
- Report bugs
- Suggest new dataset types
- Propose UI improvements

## 📄 License

MIT License - Feel free to use this project for your own purposes.

## 🙏 Acknowledgments

Built with modern web technologies and a focus on developer experience. Perfect for:
- Frontend developers testing UI components
- Backend developers mocking API responses
- QA teams generating test data
- Designers prototyping with realistic content

---

**Made with ❤️ using React + Vite + Tailwind CSS**
