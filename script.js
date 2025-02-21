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
            
            // Animate header based on target section
            if (targetId === 'about') {
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
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
}); 