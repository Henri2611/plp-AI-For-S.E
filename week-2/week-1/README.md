# Mini E-Learning Platform

A simple, responsive e-learning platform built with HTML, CSS, and JavaScript. This prototype demonstrates course listing, detailed course views, and progress tracking using localStorage.

## 🌐 Live Demo
- Experience the platform live here:
👉 **[Live Demo](https://plp-ai-for-s-e.vercel.app/)**

- You can explore all features directly in your browser — no installation required!

## 🚀 Features

- **Course Listing**: Browse available courses on the home page
- **Course Details**: View detailed course information and curriculum
- **Progress Tracking**: Mark courses as completed with visual indicators
- **Persistent Storage**: Progress is saved using localStorage
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimal design with hover effects and animations

## 📁 Project Structure

```
/project-root
├── index.html          # Home page with course listing
├── course.html         # Course details page
├── style.css          # Main stylesheet with responsive design
├── script.js          # JavaScript for home page functionality
├── course.js          # JavaScript for course details page
├── courses.json       # Course data (titles, descriptions, lessons)
└── README.md          # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Running the Project

#### Option 1: Using a Local Web Server (Recommended)

1. **Using Python** (if installed):

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **Using Node.js** (if installed):

   ```bash
   npx http-server
   ```

3. **Using Live Server** (VS Code extension):

   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

4. **Using any other local server**:
   - Place all files in your web server's document root
   - Access via `http://localhost:8000` (or your server's URL)

#### Option 2: Direct File Opening (Limited Functionality)

1. Open `index.html` directly in your browser
2. **Note**: Some features may not work due to CORS restrictions when loading JSON files

## 🎯 How to Use

### Home Page (`index.html`)

- View all available courses
- See your learning progress summary
- Click "View Details" to explore a course
- Completed courses show with a green checkmark

### Course Details Page (`course.html`)

- View full course description and curriculum
- See all lessons/modules in the course
- Mark courses as completed/incomplete
- Progress is automatically saved

### Progress Tracking

- Your completion status is saved in browser localStorage
- Progress persists between browser sessions
- Visual indicators show completed courses
- Progress summary displays completion statistics

## 🎨 Design Features

- **Responsive Grid Layout**: Courses display in a responsive grid
- **Hover Effects**: Interactive buttons and cards with smooth transitions
- **Visual Completion Indicators**: Green checkmarks and color changes for completed courses
- **Modern Typography**: Clean, readable fonts and spacing
- **Gradient Backgrounds**: Subtle gradients for visual appeal
- **Mobile-First Design**: Optimized for all screen sizes

## 🔧 Technical Details

### Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Flexbox/Grid layouts, animations, responsive design
- **Vanilla JavaScript**: ES6+ features, Fetch API, localStorage
- **JSON**: Data storage format

### Key JavaScript Features

- **Fetch API**: Loading course data from JSON file
- **localStorage**: Persistent progress tracking
- **URL Parameters**: Course ID passing between pages
- **Event Handling**: Interactive buttons and navigation
- **Error Handling**: Graceful error messages and fallbacks

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🚀 Future Enhancements

This prototype could be extended with:

- User authentication system
- Course ratings and reviews
- Search and filtering functionality
- Course categories and tags
- Video integration
- Quiz and assessment features
- Certificate generation
- Social features (discussions, forums)

## 🐛 Troubleshooting

### Common Issues

1. **Courses not loading**:

   - Ensure you're running the project through a web server
   - Check browser console for CORS errors
   - Verify `courses.json` file exists and is valid

2. **Progress not saving**:

   - Check if localStorage is enabled in your browser
   - Clear browser cache and try again
   - Ensure JavaScript is enabled

3. **Styling issues**:
   - Verify `style.css` is properly linked
   - Check for CSS syntax errors
   - Ensure responsive design is working on your device

### Browser Console

- Open Developer Tools (F12) to see any error messages
- Check the Console tab for JavaScript errors
- Use the Network tab to verify file loading

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Happy Learning! 🎓**
