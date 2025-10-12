// Main JavaScript file for the home page (index.html)
// This file handles course loading, progress tracking, and localStorage management

// Global variables
let courses = [];
let completedCourses = [];

// Initialize the application when the page loads
document.addEventListener("DOMContentLoaded", function () {
  loadCompletedCourses();
  loadCourses();
  setupProgressLink();
});

// Load courses from JSON file
async function loadCourses() {
  try {
    const response = await fetch("courses.json");
    if (!response.ok) {
      throw new Error("Failed to load courses");
    }
    const data = await response.json();
    courses = data.courses;
    displayCourses();
    updateProgressDisplay(); // Update progress AFTER courses are loaded
  } catch (error) {
    console.error("Error loading courses:", error);
    displayError("Failed to load courses. Please refresh the page.");
  }
}

// Display courses on the page
function displayCourses() {
  const coursesGrid = document.getElementById("courses-grid");

  if (!coursesGrid) {
    console.error("Courses grid element not found");
    return;
  }

  if (courses.length === 0) {
    coursesGrid.innerHTML = '<div class="loading">No courses available.</div>';
    return;
  }

  coursesGrid.innerHTML = courses
    .map((course) => createCourseCard(course))
    .join("");
}

// Create HTML for a course card
function createCourseCard(course) {
  const isCompleted = completedCourses.includes(course.id);
  const completedClass = isCompleted ? "completed" : "";

  return `
        <div class="course-card ${completedClass}" data-course-id="${course.id}">
            <h3 class="course-title">${course.title}</h3>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <span class="course-difficulty">${course.difficulty}</span>
                <span class="course-duration">${course.duration}</span>
            </div>
            <a href="course.html?id=${course.id}" class="btn btn-primary">View Details</a>
        </div>
    `;
}

// Load completed courses from localStorage
function loadCompletedCourses() {
  try {
    const stored = localStorage.getItem("completedCourses");
    completedCourses = stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading completed courses:", error);
    completedCourses = [];
  }
}

// Save completed courses to localStorage
function saveCompletedCourses() {
  try {
    localStorage.setItem("completedCourses", JSON.stringify(completedCourses));
  } catch (error) {
    console.error("Error saving completed courses:", error);
  }
}

// Update progress display
function updateProgressDisplay() {
  const completedCount = document.getElementById("completed-count");
  const totalCount = document.getElementById("total-count");
  const progressPercentage = document.getElementById("progress-percentage");

  if (completedCount) {
    completedCount.textContent = completedCourses.length;
  }

  if (totalCount) {
    totalCount.textContent = courses.length;
  }

  if (progressPercentage) {
    const percentage =
      courses.length > 0
        ? Math.round((completedCourses.length / courses.length) * 100)
        : 0;
    progressPercentage.textContent = `${percentage}%`;
  }
}

// Mark a course as completed (called from course details page)
function markCourseAsCompleted(courseId) {
  if (!completedCourses.includes(courseId)) {
    completedCourses.push(courseId);
    saveCompletedCourses();
    updateProgressDisplay();

    // Update the course card if we're on the home page
    const courseCard = document.querySelector(`[data-course-id="${courseId}"]`);
    if (courseCard) {
      courseCard.classList.add("completed");
    }
  }
}

// Mark a course as incomplete (called from course details page)
function markCourseAsIncomplete(courseId) {
  const index = completedCourses.indexOf(courseId);
  if (index > -1) {
    completedCourses.splice(index, 1);
    saveCompletedCourses();
    updateProgressDisplay();

    // Update the course card if we're on the home page
    const courseCard = document.querySelector(`[data-course-id="${courseId}"]`);
    if (courseCard) {
      courseCard.classList.remove("completed");
    }
  }
}

// Display error message
function displayError(message) {
  const coursesGrid = document.getElementById("courses-grid");
  if (coursesGrid) {
    coursesGrid.innerHTML = `
            <div class="loading" style="color: #e74c3c;">
                ${message}
            </div>
        `;
  }
}

// Setup progress link click handler
function setupProgressLink() {
  const progressLink = document.getElementById("progress-link");
  if (progressLink) {
    progressLink.addEventListener("click", function (e) {
      e.preventDefault();
      showProgressModal();
    });
  }
}

// Show progress modal (simple alert for now)
function showProgressModal() {
  const completedCount = completedCourses.length;
  const totalCount = courses.length;

  // If courses haven't loaded yet, show a message
  if (totalCount === 0) {
    alert("Loading course data... Please try again in a moment.");
    return;
  }

  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  alert(
    `Your Learning Progress:\n\nCompleted: ${completedCount}/${totalCount} courses (${percentage}%)\n\nKeep up the great work! 🎉`
  );
}

// Export functions for use in other files
window.markCourseAsCompleted = markCourseAsCompleted;
window.markCourseAsIncomplete = markCourseAsIncomplete;
window.completedCourses = completedCourses;
