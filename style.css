// ============================================
// Operating Systems Exam Prep - JavaScript
// ============================================

// Global variables
let completedQuizzes = new Set();
let quizScores = {};

// ============================================
// Initialize on page load
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupSidebarToggle();
    setupSmoothScroll();
    loadProgress();
    updateProgressBar();
});

// ============================================
// Navigation Setup
// ============================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close sidebar on mobile
            const sidebar = document.querySelector('.sidebar');
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Set initial active link
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
}

// ============================================
// Sidebar Toggle for Mobile
// ============================================

function setupSidebarToggle() {
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        const sidebar = document.querySelector('.sidebar');
        const toggleBtn = document.querySelector('.toggle-sidebar');
        
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// ============================================
// Smooth Scrolling
// ============================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// Quiz Submission
// ============================================

function submitQuiz(quizId, correctAnswers) {
    const quiz = document.getElementById(quizId);
    if (!quiz) return;

    const questions = quiz.querySelectorAll('.quiz-question');
    let score = 0;
    let answered = 0;

    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        const correctAnswer = question.querySelector('.correct-answer');

        if (selectedOption) {
            answered++;
            const selectedValue = selectedOption.value;
            
            if (selectedValue === correctAnswers[index]) {
                score++;
                // Highlight correct answer
                selectedOption.parentElement.style.background = '#dcfce7';
                selectedOption.parentElement.style.borderColor = '#10b981';
            } else {
                // Highlight incorrect answer
                selectedOption.parentElement.style.background = '#fee2e2';
                selectedOption.parentElement.style.borderColor = '#ef4444';
            }
        }

        // Show correct answer
        if (correctAnswer) {
            correctAnswer.style.display = 'block';
        }
    });

    if (answered === 0) {
        alert('Please answer all questions before submitting!');
        return;
    }

    // Store quiz result
    const quizNumber = quizId.replace('quiz', '');
    completedQuizzes.add(quizNumber);
    quizScores[quizId] = {
        score: score,
        total: correctAnswers.length,
        percentage: Math.round((score / correctAnswers.length) * 100)
    };

    // Save progress
    saveProgress();

    // Show results
    showQuizResults(quizId, score, correctAnswers.length);

    // Update progress bar
    updateProgressBar();

    // Disable submit button
    const submitBtn = quiz.querySelector('.submit-quiz');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.textContent = 'Quiz Submitted ✓';
    }
}

// ============================================
// Show Quiz Results
// ============================================

function showQuizResults(quizId, score, total) {
    const percentage = Math.round((score / total) * 100);
    
    // Create results message
    const message = `
        Quiz Results:
        Correct: ${score}/${total}
        Score: ${percentage}%
        
        ${percentage >= 80 ? '🎉 Excellent work!' : percentage >= 60 ? '👍 Good job!' : '📚 Keep studying!'}
    `;

    // Show alert
    alert(message);

    // Log to console
    console.log(`Quiz ${quizId} - Score: ${percentage}%`);
}

// ============================================
// Progress Tracking
// ============================================

function updateProgressBar() {
    const totalQuizzes = 11; // 10 chapters + 1 final
    const completed = completedQuizzes.size;
    const percentage = Math.round((completed / totalQuizzes) * 100);

    const progressPercent = document.getElementById('progressPercent');
    const progressFill = document.getElementById('progressFill');

    if (progressPercent) {
        progressPercent.textContent = percentage;
    }

    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
}

// ============================================
// Local Storage - Save Progress
// ============================================

function saveProgress() {
    const progressData = {
        completedQuizzes: Array.from(completedQuizzes),
        quizScores: quizScores,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('osExamProgress', JSON.stringify(progressData));
}

// ============================================
// Local Storage - Load Progress
// ============================================

function loadProgress() {
    const savedData = localStorage.getItem('osExamProgress');
    
    if (savedData) {
        try {
            const progressData = JSON.parse(savedData);
            completedQuizzes = new Set(progressData.completedQuizzes);
            quizScores = progressData.quizScores;
            
            // Restore quiz states
            Object.keys(quizScores).forEach(quizId => {
                const quiz = document.getElementById(quizId);
                if (quiz) {
                    const submitBtn = quiz.querySelector('.submit-quiz');
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.style.opacity = '0.6';
                        submitBtn.style.cursor = 'not-allowed';
                        submitBtn.textContent = 'Quiz Submitted ✓';
                    }
                }
            });
        } catch (e) {
            console.error('Error loading progress:', e);
        }
    }
}

// ============================================
// Reset Progress
// ============================================

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        localStorage.removeItem('osExamProgress');
        completedQuizzes.clear();
        quizScores = {};
        updateProgressBar();
        location.reload();
    }
}

// ============================================
// Export Progress Report
// ============================================

function exportProgressReport() {
    let report = 'Operating Systems Exam Preparation - Progress Report\n';
    report += '=' .repeat(50) + '\n\n';
    report += `Generated: ${new Date().toLocaleString()}\n\n`;

    report += 'Quiz Results:\n';
    report += '-'.repeat(50) + '\n';

    Object.keys(quizScores).forEach(quizId => {
        const result = quizScores[quizId];
        report += `${quizId}: ${result.score}/${result.total} (${result.percentage}%)\n`;
    });

    report += '\n' + '-'.repeat(50) + '\n';
    const avgScore = Object.values(quizScores).length > 0
        ? Math.round(Object.values(quizScores).reduce((sum, q) => sum + q.percentage, 0) / Object.values(quizScores).length)
        : 0;
    report += `Overall Average: ${avgScore}%\n`;
    report += `Quizzes Completed: ${completedQuizzes.size}/8\n`;

    // Download report
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
    element.setAttribute('download', 'os-exam-progress-report.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// ============================================
// Keyboard Navigation
// ============================================

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save/export progress
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportProgressReport();
    }

    // Escape to close sidebar
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }
});

// ============================================
// Responsive Adjustments
// ============================================

window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('active');
    }
});

// ============================================
// Accessibility Enhancements
// ============================================

// Add keyboard support for radio buttons
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            this.checked = true;
        }
    });
});

// ============================================
// Performance Optimization
// ============================================

// Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Utility Functions
// ============================================

// Get quiz statistics
function getQuizStatistics() {
    const stats = {
        totalQuizzes: 11,
        completedQuizzes: completedQuizzes.size,
        completionPercentage: Math.round((completedQuizzes.size / 11) * 100),
        averageScore: 0,
        highestScore: 0,
        lowestScore: 100
    };

    if (Object.keys(quizScores).length > 0) {
        const scores = Object.values(quizScores).map(q => q.percentage);
        stats.averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        stats.highestScore = Math.max(...scores);
        stats.lowestScore = Math.min(...scores);
    }

    return stats;
}

// Print statistics to console
function printStatistics() {
    const stats = getQuizStatistics();
    console.table(stats);
}

// ============================================
// Event Listeners for Quiz Questions
// ============================================

document.addEventListener('change', function(e) {
    if (e.target.type === 'radio') {
        // Update visual feedback when option is selected
        const label = e.target.parentElement;
        const question = label.closest('.quiz-question');
        
        // Remove previous selection styling
        question.querySelectorAll('label').forEach(l => {
            if (!l.querySelector('input:checked')) {
                l.style.background = '';
                l.style.borderColor = '';
            }
        });
    }
});

// ============================================
// Accessibility - Focus Management
// ============================================

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Ensure focus is visible
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles
const style = document.createElement('style');
style.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// ============================================
// Console Welcome Message
// ============================================

console.log('%cWelcome to OS Exam Preparation!', 'font-size: 20px; color: #2563eb; font-weight: bold;');
console.log('%cUse printStatistics() to see your progress', 'font-size: 14px; color: #64748b;');
console.log('%cUse resetProgress() to clear all data', 'font-size: 14px; color: #64748b;');
console.log('%cUse exportProgressReport() to download your results', 'font-size: 14px; color: #64748b;');
