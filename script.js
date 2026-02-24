// ========================================
// DOM ELEMENTS
// ========================================

const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav-link');
const chapters = document.querySelectorAll('.chapter');

// ========================================
// MENU TOGGLE FUNCTIONS
// ========================================

/**
 * Open the sidebar menu
 */
function openMenu() {
    sidebar.classList.add('show');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

/**
 * Close the sidebar menu
 */
function closeMenu() {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = 'auto'; // Allow scrolling
}

/**
 * Toggle the sidebar menu
 */
function toggleMenu() {
    if (sidebar.classList.contains('show')) {
        closeMenu();
    } else {
        openMenu();
    }
}

// ========================================
// CHAPTER NAVIGATION
// ========================================

/**
 * Show a specific chapter and hide others
 * @param {string} chapterId - The ID of the chapter to show
 */
function showChapter(chapterId) {
    // Hide all chapters
    chapters.forEach(chapter => {
        chapter.classList.remove('active');
    });

    // Show the selected chapter
    const selectedChapter = document.getElementById(chapterId);
    if (selectedChapter) {
        selectedChapter.classList.add('active');
        
        // Scroll to top of content
        window.scrollTo(0, 0);
    }

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-chapter') === chapterId) {
            link.classList.add('active');
        }
    });

    // Close menu on mobile after selection
    if (window.innerWidth <= 768) {
        closeMenu();
    }

    // Save to localStorage for persistence
    localStorage.setItem('lastChapter', chapterId);
}

// ========================================
// EVENT LISTENERS
// ========================================

/**
 * Menu button click - toggle sidebar
 */
menuBtn.addEventListener('click', toggleMenu);

/**
 * Close button click - close sidebar
 */
closeBtn.addEventListener('click', closeMenu);

/**
 * Overlay click - close sidebar
 */
overlay.addEventListener('click', closeMenu);

/**
 * Navigation link clicks - show chapter
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const chapterId = link.getAttribute('data-chapter');
        showChapter(chapterId);
    });
});

/**
 * Close menu when pressing Escape key
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// ========================================
// RESPONSIVE BEHAVIOR
// ========================================

/**
 * Handle window resize
 */
window.addEventListener('resize', () => {
    // Close menu on desktop
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

/**
 * Prevent scrolling when menu is open
 */
function preventScroll(e) {
    if (sidebar.classList.contains('show')) {
        e.preventDefault();
    }
}

document.addEventListener('touchmove', preventScroll, { passive: false });

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize the app
 */
function init() {
    // Load last viewed chapter from localStorage
    const lastChapter = localStorage.getItem('lastChapter');
    if (lastChapter && document.getElementById(lastChapter)) {
        showChapter(lastChapter);
    } else {
        // Default to first chapter
        showChapter('sync');
    }

    // Log that app is ready
    console.log('OS Exam Prep App Loaded ✓');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Search functionality (bonus feature)
 * @param {string} query - Search query
 */
function searchTopics(query) {
    const lowerQuery = query.toLowerCase();
    const results = [];

    chapters.forEach(chapter => {
        const topics = chapter.querySelectorAll('.topic');
        topics.forEach(topic => {
            const text = topic.textContent.toLowerCase();
            if (text.includes(lowerQuery)) {
                results.push({
                    chapter: chapter.id,
                    topic: topic.querySelector('h3').textContent,
                    element: topic
                });
            }
        });
    });

    return results;
}

/**
 * Highlight search results
 * @param {string} query - Search query
 */
function highlightSearchResults(query) {
    const results = searchTopics(query);
    
    // Clear previous highlights
    document.querySelectorAll('.highlight').forEach(el => {
        el.classList.remove('highlight');
    });

    // Highlight results
    results.forEach(result => {
        result.element.style.backgroundColor = '#fef3c7';
        result.element.style.borderLeftColor = '#f59e0b';
    });

    return results;
}

/**
 * Print current chapter
 */
function printChapter() {
    const activeChapter = document.querySelector('.chapter.active');
    if (activeChapter) {
        window.print();
    }
}

/**
 * Export chapter as text
 */
function exportChapterAsText() {
    const activeChapter = document.querySelector('.chapter.active');
    if (activeChapter) {
        const text = activeChapter.textContent;
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'chapter.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

/**
 * Keyboard shortcuts:
 * - 1: Go to Chapter 1 (Synchronization)
 * - 2: Go to Chapter 2 (Deadlocks)
 * - 3: Go to Chapter 3 (Memory Management)
 * - 4: Go to Chapter 4 (Virtual Memory)
 * - m: Toggle menu
 * - p: Print current chapter
 */
document.addEventListener('keydown', (e) => {
    // Only if not typing in an input
    if (e.target === document.body) {
        switch(e.key) {
            case '1':
                showChapter('sync');
                break;
            case '2':
                showChapter('deadlock');
                break;
            case '3':
                showChapter('memory');
                break;
            case '4':
                showChapter('virtual');
                break;
            case 'm':
                toggleMenu();
                break;
            case 'p':
                printChapter();
                break;
        }
    }
});

// ========================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ========================================

/**
 * Smooth scroll to element
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

/**
 * Log performance metrics
 */
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page Load Time: ${pageLoadTime}ms`);
});

// ========================================
// ERROR HANDLING
// ========================================

/**
 * Global error handler
 */
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});
