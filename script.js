document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
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
            
            // Slide to target section
            document.querySelector('.sections-container').style.transform = 
                `translateX(-${targetIndex * 100}vw)`;
            
            // Update current index
            currentIndex = targetIndex;
        });
    });
    
    // Set initial active state
    sections[0].classList.add('active');
    navLinks[0].classList.add('active');
}); 