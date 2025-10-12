// Course details page JavaScript (course.js)
// This file handles course details display, completion tracking, and localStorage management

// Global variables
let currentCourse = null;
let completedCourses = [];

// Initialize the application when the page loads
document.addEventListener("DOMContentLoaded", function () {
  loadCompletedCourses();
  loadCourseDetails();
});

// Get course ID from URL parameters
function getCourseIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id"));
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

// Load and display course details
async function loadCourseDetails() {
  const courseId = getCourseIdFromUrl();

  if (!courseId) {
    displayError("Invalid course ID");
    return;
  }

  try {
    const response = await fetch("courses.json");
    if (!response.ok) {
      throw new Error("Failed to load courses");
    }
    const data = await response.json();
    const course = data.courses.find((c) => c.id === courseId);

    if (!course) {
      displayError("Course not found");
      return;
    }

    currentCourse = course;
    displayCourseDetails(course);
    checkCompletionStatus(courseId);
  } catch (error) {
    console.error("Error loading course details:", error);
    displayError("Failed to load course details. Please try again.");
  }
}

// Display course details on the page
function displayCourseDetails(course) {
  const courseDetails = document.getElementById("course-details");

  if (!courseDetails) {
    console.error("Course details element not found");
    return;
  }

  const isCompleted = completedCourses.includes(course.id);

  courseDetails.innerHTML = `
        <div class="course-header">
            <h1>${course.title}</h1>
            <p class="course-description">${course.fullDescription}</p>
        </div>
        
        <div class="course-info">
            <div class="course-info-item">
                <h3>Duration</h3>
                <p>${course.duration}</p>
            </div>
            <div class="course-info-item">
                <h3>Difficulty</h3>
                <p>${course.difficulty}</p>
            </div>
            <div class="course-info-item">
                <h3>Lessons</h3>
                <p>${course.lessons.length} modules</p>
            </div>
        </div>
        
        <div class="lessons-section">
            <h2>Course Curriculum</h2>
            <ul class="lessons-list">
                ${course.lessons
                  .map(
                    (lesson) => `
                    <li class="lesson-item">
                        <h3>${lesson.title}</h3>
                        <p>${lesson.description}</p>
                    </li>
                `
                  )
                  .join("")}
            </ul>
        </div>
        
        <div class="course-actions">
            ${
              isCompleted
                ? `<button class="btn btn-danger" onclick="markAsIncomplete()">Mark as Incomplete</button>`
                : `<button class="btn btn-success" onclick="markAsCompleted()">Mark as Completed</button>`
            }
        </div>
    `;
}

// Check and display completion status
function checkCompletionStatus(courseId) {
  const completionSection = document.getElementById("completion-section");
  const isCompleted = completedCourses.includes(courseId);

  if (completionSection) {
    completionSection.style.display = isCompleted ? "block" : "none";
  }
}

// Mark course as completed
function markAsCompleted() {
  if (!currentCourse) {
    console.error("No current course to mark as completed");
    return;
  }

  const courseId = currentCourse.id;

  if (!completedCourses.includes(courseId)) {
    completedCourses.push(courseId);
    saveCompletedCourses();

    // Update the UI
    displayCourseDetails(currentCourse);
    checkCompletionStatus(courseId);

    // Show success message
    showNotification("Course marked as completed! 🎉", "success");

    // Update progress on home page if it exists
    if (window.markCourseAsCompleted) {
      window.markCourseAsCompleted(courseId);
    }
  }
}

// Mark course as incomplete
function markAsIncomplete() {
  if (!currentCourse) {
    console.error("No current course to mark as incomplete");
    return;
  }

  const courseId = currentCourse.id;
  const index = completedCourses.indexOf(courseId);

  if (index > -1) {
    completedCourses.splice(index, 1);
    saveCompletedCourses();

    // Update the UI
    displayCourseDetails(currentCourse);
    checkCompletionStatus(courseId);

    // Show info message
    showNotification("Course marked as incomplete", "info");

    // Update progress on home page if it exists
    if (window.markCourseAsIncomplete) {
      window.markCourseAsIncomplete(courseId);
    }
  }
}

// Display error message
function displayError(message) {
  const courseDetails = document.getElementById("course-details");
  if (courseDetails) {
    courseDetails.innerHTML = `
            <div class="loading" style="color: #e74c3c;">
                ${message}
            </div>
        `;
  }
}

// Show notification message
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.backgroundColor = "#27ae60";
      break;
    case "error":
      notification.style.backgroundColor = "#e74c3c";
      break;
    case "info":
    default:
      notification.style.backgroundColor = "#3498db";
      break;
  }

  // Add to page
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle progress link click
document.addEventListener("DOMContentLoaded", function () {
  const progressLink = document.getElementById("progress-link");
  if (progressLink) {
    progressLink.addEventListener("click", function (e) {
      e.preventDefault();
      showProgressModal();
    });
  }
});

// Show progress modal
function showProgressModal() {
  const completedCount = completedCourses.length;
  const totalCount = 3; // We know there are 3 courses total
  const percentage = Math.round((completedCount / totalCount) * 100);

  alert(
    `Your Learning Progress:\n\nCompleted: ${completedCount}/${totalCount} courses (${percentage}%)\n\nKeep up the great work! 🎉`
  );
}
