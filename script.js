document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
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
            
            // Slide to target section
            document.querySelector('.sections-container').style.transform = 
                `translateX(-${targetIndex * 100}vw)`;
        });
    });
}); 