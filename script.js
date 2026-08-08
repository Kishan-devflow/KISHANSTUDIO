/**
 * Lumina Engineering Portfolio - Kishan C
 * Interactive JS Suite
 */

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initScrollObservers();
    initCursorGlow();
    initBackToTop();
});

/* Typewriter Effect for Hero Subtitle */
const roles = [
    "Aspiring Computer Science Engineer",
    "Frontend Developer Intern @ Money Factory",
    "Full Stack Web Enthusiast",
    "Problem Solver & Tech Explorer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterSpeed = 80;
const backspaceSpeed = 40;
const pauseTime = 2000;

function initTypewriter() {
    const target = document.getElementById('typewriter-text');
    if (!target) return;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            target.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            target.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, pauseTime);
            return;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        const nextSpeed = isDeleting ? backspaceSpeed : typewriterSpeed;
        setTimeout(type, nextSpeed);
    }

    type();
}

/* Mouse Glow Effect for Desktop */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    window.addEventListener('mousemove', (e) => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
}

/* Mobile Navigation Toggle */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    if (!menu) return;

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        if (icon) icon.textContent = 'close';
    } else {
        menu.classList.add('hidden');
        if (icon) icon.textContent = 'menu';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    if (menu) menu.classList.add('hidden');
    if (icon) icon.textContent = 'menu';
}

/* Scroll Active Link & Back To Top Observer */
function initScrollObservers() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100');
            }
        }
    });
}

function initBackToTop() {
    // Already setup in click handler
}

/* About Section Tab Switcher */
function switchAboutTab(tabName) {
    const contents = document.querySelectorAll('.about-tab-content');
    const buttons = document.querySelectorAll('.about-tab-btn');

    contents.forEach(content => content.classList.add('hidden'));
    buttons.forEach(btn => btn.classList.remove('active-tab', 'text-primary'));

    const targetContent = document.getElementById(`about-content-${tabName}`);
    const targetButton = document.getElementById(`tab-${tabName}`);

    if (targetContent) targetContent.classList.remove('hidden');
    if (targetButton) targetButton.classList.add('active-tab');
}

/* Skills Category Filter */
function filterSkills(category) {
    const cards = document.querySelectorAll('.skill-card');
    const buttons = document.querySelectorAll('.skill-filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active-filter');
        btn.classList.add('text-on-surface-variant');
    });

    event.target.classList.add('active-filter');
    event.target.classList.remove('text-on-surface-variant');

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            card.classList.add('animate-fadeIn');
        } else {
            card.style.display = 'none';
        }
    });
}

/* Projects Category Filter */
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.project-filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active-filter');
        btn.classList.add('text-on-surface-variant');
    });

    event.target.classList.add('active-filter');
    event.target.classList.remove('text-on-surface-variant');

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

/* Modal Helpers */
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.remove('opacity-100');
        document.body.style.overflow = 'auto';
    }
}

/* Resume Modal */
function openResumeModal() { openModal('resume-modal'); }
function closeResumeModal() { closeModal('resume-modal'); }

function printResume() {
    const resumeElement = document.getElementById('resume-document');
    if (!resumeElement) {
        showToast('Downloading Kishan_C_Resume.pdf...', 'download');
        return;
    }
    const printWindow = window.open('', '', 'width=800,height=900');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Kishan C - Resume</title>
            <style>
                body { font-family: 'Arial', sans-serif; padding: 40px; color: #111; line-height: 1.5; }
                h1 { text-align: center; margin-bottom: 5px; font-size: 28px; }
                .contact { text-align: center; font-size: 13px; color: #444; margin-bottom: 20px; }
                h2 { font-size: 14px; border-bottom: 1.5px solid #222; padding-bottom: 3px; margin-top: 20px; letter-spacing: 1px; text-transform: uppercase; }
                p, li { font-size: 13px; }
                ul { padding-left: 20px; margin-top: 5px; }
                .flex-row { display: flex; justify-content: space-between; align-items: baseline; }
            </style>
        </head>
        <body>
            <h1>KISHAN C</h1>
            <div class="contact">
                Phone: +91 99866 16337 | Email: kishankishu9128@gmail.com<br/>
                LinkedIn: linkedin.com/in/kishan-c-dev | GitHub: github.com/Kishan-devflow
            </div>
            
            <h2>Technical Skills</h2>
            <p><strong>Languages:</strong> Python, Java, C++</p>
            <p><strong>Backend Frameworks:</strong> FastAPI, Django, Flask</p>
            <p><strong>Databases:</strong> PostgreSQL, MySQL, MongoDB, Redis</p>
            
            <h2>Internship Experience</h2>
            <div class="flex-row">
                <strong>Frontend Developer Intern - Money Factory</strong>
                <span>Feb – June 2026</span>
            </div>
            <ul>
                <li>Developed responsive web interfaces using React.js, HTML, CSS, and JavaScript.</li>
                <li>Collaborated with the development team on UI improvements and feature enhancements.</li>
                <li>Gained hands-on experience with Git, GitHub, and modern frontend development practices.</li>
                <li>Integrated APIs and databases to develop dynamic web applications.</li>
            </ul>

            <h2>Education</h2>
            <div class="flex-row">
                <div>
                    <strong>Impact Polytechnic, Bengaluru</strong><br/>
                    Computer Science and Engineering (CSE)<br/>
                    CGPA: 8.0/10.0
                </div>
                <div style="text-align: right;">
                    May 2023 – June 2026<br/>
                    Bengaluru, Karnataka, India
                </div>
            </div>
            <script>
                window.onload = function() { window.print(); window.close(); };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function downloadResumeSimulated() {
    printResume();
}

/* Experience Modal */
function openExperienceDetailModal() { openModal('exp-modal'); }
function closeExperienceDetailModal() { closeModal('exp-modal'); }

/* Certificate Modal */
function openCertificateModal() { openModal('cert-modal'); }
function closeCertificateModal() { closeModal('cert-modal'); }

/* Contact Modal & Submission */
function openContactModal() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    showToast(`Thank you, ${name}! Your message has been sent.`, 'check_circle');
    e.target.reset();
}

/* Project Detail Modal Content Generator */
const projectData = {
    portfolio: {
        title: "Personal Portfolio Website",
        category: "Web Engineering / UI",
        tech: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Glassmorphism"],
        description: "A state-of-the-art personal showcase constructed following the Lumina Engineering design system specifications. Designed with deep-space palette tokens, glassmorphism containers, responsive bento grids, and interactive micro-animations.",
        features: [
            "Lumina dark design system with glowing particle background visuals",
            "Bento grid career roadmap and skills filter system",
            "Interactive modal drawers for projects, resume, and experience details",
            "Responsive layout adapted for desktop, tablet, and mobile displays"
        ],
        icon: "person_pin",
        color: "text-primary",
        liveUrl: "https://kishanstudio.vercel.app/",
        githubUrl: "https://github.com/Kishan-devflow/KISHANSTUDIO"
    },
    amazon: {
        title: "Amazon Clone",
        category: "Full Stack E-Commerce",
        tech: ["React.js", "FastAPI", "PostgreSQL", "Tailwind CSS"],
        description: "A full-stack e-commerce web application replicating Amazon's core user workflows. Features real-time item catalog searching, shopping cart state management, checkout simulation, and user authentication.",
        features: [
            "Dynamic product search and filtering across categories",
            "Cart state persistence with price calculations & coupon discounts",
            "REST API backend written with Python FastAPI and PostgreSQL",
            "Responsive product card grid with hover zoom previews"
        ],
        icon: "shopping_cart",
        color: "text-secondary",
        liveUrl: "https://amazonclone-rust-three.vercel.app/",
        githubUrl: "https://github.com/Kishan-devflow/amazonclone"
    },
    netflix: {
        title: "Netflix Clone",
        category: "Frontend Web App",
        tech: ["JavaScript", "TMDB API", "HTML5", "CSS Flexbox"],
        description: "A responsive media streaming frontend inspired by Netflix. Connects directly to The Movie Database (TMDB) API to fetch trending movies, high-rating TV shows, trailer previews, and category rails.",
        features: [
            "Live RESTful integration with TMDB API",
            "Dynamic banner hero featuring top-rated trending movies",
            "Horizontal scrollable category rails for genres and original content",
            "Interactive video modal playback overlay"
        ],
        icon: "movie",
        color: "text-red-400",
        liveUrl: "https://netflix-clone-rocket-30.vercel.app/",
        githubUrl: "https://github.com/Kishan-devflow/netflix-clone"
    },
    calculator: {
        title: "Web Calculator",
        category: "Web Application",
        tech: ["JavaScript", "HTML5", "CSS3", "UI Design"],
        description: "A sleek, responsive web calculator application supporting arithmetic operations, keyboard inputs, operator memory, and glassmorphic button feedback.",
        features: [
            "Real-time expression evaluation and arithmetic operations",
            "Keyboard accessibility and tap target optimizations",
            "Clean dark glassmorphism UI layout",
            "Responsive execution across mobile and desktop devices"
        ],
        icon: "calculate",
        color: "text-tertiary",
        liveUrl: "https://web-calculator-orpin.vercel.app/",
        githubUrl: "https://github.com/Kishan-devflow/web-calculator"
    }
};

function openProjectModal(key) {
    const data = projectData[key];
    if (!data) return;

    const body = document.getElementById('project-modal-body');
    body.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
            <span class="material-symbols-outlined text-4xl ${data.color}">${data.icon}</span>
            <div>
                <h3 class="font-space text-2xl font-bold text-on-surface">${data.title}</h3>
                <p class="font-mono text-xs text-secondary">${data.category}</p>
            </div>
        </div>

        <p class="font-inter text-sm text-on-surface-variant leading-relaxed mb-4">
            ${data.description}
        </p>

        <div class="mb-4">
            <h4 class="font-mono text-xs text-primary uppercase tracking-wider mb-2 font-semibold">Key Highlights & Features</h4>
            <ul class="space-y-1.5 font-inter text-xs text-on-surface-variant list-disc pl-5">
                ${data.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </div>

        <div class="mb-6">
            <h4 class="font-mono text-xs text-primary uppercase tracking-wider mb-2 font-semibold">Technologies Used</h4>
            <div class="flex flex-wrap gap-2">
                ${data.tech.map(t => `<span class="bg-surface-container px-3 py-1 rounded-full font-mono text-xs text-on-surface border border-white/10">${t}</span>`).join('')}
            </div>
        </div>

        <div class="flex flex-wrap gap-3">
            <a href="${data.liveUrl}" target="_blank" rel="noopener" class="flex-1 bg-gradient-to-r from-primary to-secondary text-on-primary font-mono text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all">
                <span>Live Demo</span>
                <span class="material-symbols-outlined text-sm">open_in_new</span>
            </a>
            <a href="${data.githubUrl}" target="_blank" rel="noopener" class="px-5 border border-white/10 text-on-surface font-mono text-xs rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">code</span>
                <span>GitHub</span>
            </a>
            <button onclick="closeModal('project-modal')" class="px-5 border border-white/10 text-on-surface-variant font-mono text-xs rounded-xl hover:bg-white/5 transition-colors">
                Close
            </button>
        </div>
    `;

    openModal('project-modal');
}

function closeProjectModal() {
    closeModal('project-modal');
}

/* Toast Notifications */
function showToast(message, icon = 'check_circle') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    if (!toast) return;

    if (toastMessage) toastMessage.textContent = message;
    if (toastIcon) toastIcon.textContent = icon;

    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');

    setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none');
        toast.classList.remove('opacity-100');
    }, 3000);
}

/* Clipboard Copy Helper */
function copyToClipboard(text, successMsg) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg, 'content_copy');
    }).catch(() => {
        showToast('Copied to clipboard!', 'content_copy');
    });
}
