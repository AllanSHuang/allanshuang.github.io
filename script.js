document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');
    let currentIndex = 0;
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            e.target.classList.add('active');
            
            // Get the target section
            const targetId = e.target.getAttribute('href').substring(1);
            const targetIndex = Array.from(sections).findIndex(
                section => section.id === targetId
            );
            
            if (targetIndex === currentIndex) return;
            
            // Determine direction of transition
            const isMovingRight = targetIndex > currentIndex;
            
            // Get current and target sections
            const currentSection = sections[currentIndex];
            const targetSection = sections[targetIndex];
            
            // Remove previous animation classes
            sections.forEach(section => {
                section.classList.remove('slide-in-right', 'slide-in-left', 'fade-out');
            });
            
            // Add animations
            currentSection.classList.add('fade-out');
            targetSection.classList.add(isMovingRight ? 'slide-in-right' : 'slide-in-left');
            
            // Modify header animation for section changes
            if (targetId === 'about') {
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
                header.classList.remove('header-scroll-hidden'); // Reset scroll state
            } else {
                header.classList.remove('header-visible');
                header.classList.add('header-hidden');
            }
            
            // Slide to target section
            document.querySelector('.sections-container').style.transform = 
                `translateX(-${targetIndex * 100}vw)`;
            
            // Update current index
            currentIndex = targetIndex;
        });
    });
    
    // Set initial active states
    sections[0].classList.add('active');
    navLinks[0].classList.add('active');
    header.classList.add('header-visible');

    // Add More button functionality
    document.querySelectorAll('.more-btn').forEach(button => {
        button.addEventListener('click', () => {
            const details = button.previousElementSibling;
            const isExpanded = details.classList.contains('expanded');
            
            details.classList.toggle('expanded');
            details.classList.toggle('visible');
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
    let lastScrollTop = 0;

    aboutSection.addEventListener('scroll', () => {
        const scrollTop = aboutSection.scrollTop;
        const header = document.querySelector('header');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.classList.add('header-scroll-hidden');
        } else {
            // Scrolling up
            header.classList.remove('header-scroll-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}); 