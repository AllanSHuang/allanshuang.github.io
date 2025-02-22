document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');
    let currentIndex = 0;
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = e.target.getAttribute('href').substring(1);
            const targetIndex = Array.from(sections).findIndex(
                section => section.id === targetId
            );
            
            if (targetIndex === currentIndex) return;
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            e.target.classList.add('active');
            
            const isMovingRight = targetIndex > currentIndex;
            const currentSection = sections[currentIndex];
            const targetSection = sections[targetIndex];
            
            sections.forEach(section => {
                section.classList.remove('slide-in-right', 'slide-in-left', 'fade-out');
            });
            
            currentSection.classList.add('fade-out');
            targetSection.classList.add(isMovingRight ? 'slide-in-right' : 'slide-in-left');
            
            // Modify header animation for section changes
            if (targetId === 'about') {
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
                header.classList.remove('header-scroll-hidden');
            } else {
                header.classList.remove('header-visible');
                header.classList.add('header-hidden');
            }
            
            // Slide to target section
            document.querySelector('.sections-container').style.transform = 
                `translateX(-${targetIndex * 100}vw)`;
            
            // Reset About section after transition if we're leaving it
            if (currentIndex === 0 && targetId !== 'about') {
                // Wait for transition to complete
                setTimeout(() => {
                    const aboutSection = document.getElementById('about');
                    aboutSection.scrollTop = 0;
                    header.classList.remove('header-scroll-hidden');
                }, 600); // Match this with your transition duration
            }
            
            currentIndex = targetIndex;
        });
    });
    
    // Set initial active states
    sections[0].classList.add('active');
    navLinks[0].classList.add('active');
    header.classList.add('header-visible');

    // Add More button functionality for both Experience and Project sections
    document.querySelectorAll('.more-btn').forEach(button => {
        button.addEventListener('click', () => {
            const details = button.previousElementSibling;
            const isExpanded = details.classList.contains('expanded');
            
            // First add expanded class to enable animation
            if (!isExpanded) {
                details.classList.add('expanded');
                // Small delay to trigger the animation
                setTimeout(() => {
                    details.classList.add('visible');
                }, 10);
            } else {
                // Remove visible first to trigger fade out
                details.classList.remove('visible');
                // Wait for animation to complete before removing expanded
                setTimeout(() => {
                    details.classList.remove('expanded');
                }, 500);
            }
            
            button.textContent = isExpanded ? 'More' : 'Less';
            button.classList.toggle('active');
        });
    });

    // Add this to your existing DOMContentLoaded event listener
    const skillsSection = document.getElementById('skills');

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('skills-visible');
            } else {
                entry.target.classList.remove('skills-visible');
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    // Start observing the skills section
    observer.observe(skillsSection);

    // Reset animations when leaving the section
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (link.getAttribute('href') !== '#skills') {
                skillsSection.classList.remove('skills-visible');
            }
        });
    });

    // Add scroll handler for About section
    const aboutSection = document.getElementById('about');
    const nav = document.querySelector('nav');
    
    aboutSection.addEventListener('scroll', () => {
        const scrollTop = aboutSection.scrollTop;
        
        // Only show nav when completely at top, hide when scrolling down
        if (scrollTop > 0) {
            nav.classList.add('nav-hidden');
        } else if (scrollTop === 0) {
            nav.classList.remove('nav-hidden');
        }
    });

    let lastScrollY = window.scrollY;

    // Handle header visibility on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            // Scrolling down
            header.classList.add('header-hidden');
        } else if (window.scrollY === 0) {
            // At the top
            header.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    });

    // Reset section state when leaving
    const sectionsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Reset state when section is not visible
                const section = entry.target;
                const details = section.querySelectorAll('.project-details.visible, .experience-details.visible');
                details.forEach(detail => detail.classList.remove('visible'));
                const moreButtons = section.querySelectorAll('.more-btn');
                moreButtons.forEach(btn => btn.textContent = 'More');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => sectionsObserver.observe(section));

    // Handle nav visibility for Experience and Projects sections
    const experienceSection = document.getElementById('experience');
    const projectsSection = document.getElementById('projects');
    const nav = document.querySelector('nav');
    
    [experienceSection, projectsSection].forEach(section => {
        let lastScrollTop = 0;
        
        section.addEventListener('scroll', () => {
            const scrollTop = section.scrollTop;
            
            // Only show nav when completely at top, hide when scrolling down
            if (scrollTop > 0) {
                nav.classList.add('nav-hidden');
            } else if (scrollTop === 0) {
                nav.classList.remove('nav-hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    });
}); 