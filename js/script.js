document.addEventListener('DOMContentLoaded', () => {
    // Add initial-load class to body
    document.body.classList.add('initial-load');
    
    // Remove the class after animations complete
    setTimeout(() => {
        document.body.classList.remove('initial-load');
    }, 3500);

    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    let currentIndex = 0;
    
    // Reset any existing animations on nav items
    const navItems = document.querySelectorAll('nav li');
    navItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
    });
    
    // Apply sequential animations
    navItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    // Utility function to reset section details
    function resetSectionDetails(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        // Reset expanded states
        section.querySelectorAll('.project-details').forEach(detail => {
            detail.classList.remove('expanded', 'visible');
        });
        // Reset buttons
        section.querySelectorAll('.more-btn').forEach(btn => {
            btn.textContent = 'More';
            btn.classList.remove('active');
        });
        
        // Special handling for skills section
        if (sectionId === 'skills') {
            const skillCategories = section.querySelectorAll('.skill-category');
            
            // Add fade-out animation
            skillCategories.forEach((category, index) => {
                setTimeout(() => {
                    category.style.opacity = '0';
                    category.style.transform = 'translateX(-50px)';
                }, index * 100);
            });
            
            // Remove skills-visible class after animations complete
            setTimeout(() => {
                section.classList.remove('skills-visible');
            }, skillCategories.length * 100 + 400);
        }
    }
    
    // Hide certification section during transitions
    function handleCertificationVisibility(targetId, targetIndex) {
        const certSection = document.getElementById('certifications');
        const certIndex = Array.from(sections).findIndex(section => section.id === 'certifications');
        
        // If we're not coming from or going to the certification section, but we'll pass through it
        if (targetId !== 'certifications' && currentIndex !== certIndex && 
            ((currentIndex < certIndex && targetIndex > certIndex) || 
             (currentIndex > certIndex && targetIndex < certIndex))) {
            
            // Immediately hide the certification section
            certSection.style.opacity = '0';
            certSection.style.visibility = 'hidden';
            certSection.style.transition = 'none';
            
            // Reset all animations
            const title = certSection.querySelector('.subsection-title');
            const certCards = certSection.querySelectorAll('.certification-card');
            
            if (title) title.style.opacity = '0';
            certCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateX(100px)';
            });
            
            // Make it visible again after transition is complete
            setTimeout(() => {
                certSection.style.opacity = '1';
                certSection.style.visibility = 'visible';
            }, 700);
        }
    }
    
    // Animate certification section when entering it
    function animateCertificationSection() {
        const certSection = document.getElementById('certifications');
        const title = certSection.querySelector('.subsection-title');
        const certCards = certSection.querySelectorAll('.certification-card');
        
        // Always cancel any existing transitions first
        title.style.transition = 'none';
        certCards.forEach(card => {
            card.style.transition = 'none';
        });
        
        // Reset animations to starting positions
        title.style.opacity = '0';
        title.style.transform = 'translateY(-30px)';
        
        certCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(100px)';
        });
        
        // Force reflow to ensure styles take effect before adding transitions
        void certSection.offsetWidth;
        
        // Schedule the animations
        setTimeout(() => {
            // First animate the title
            title.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
            
            // Then animate the cards after title animation completes
            setTimeout(() => {
                certCards.forEach(card => {
                    card.style.transition = "transform 2s cubic-bezier(0.19, 1, 0.22, 1), opacity 2s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.4s ease, border-color 0.4s ease";
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                });
            }, 500);
        }, 300);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add the transitioning class to body to hide scrollbars
            document.body.classList.add('transitioning-sections');
            
            const targetId = e.target.getAttribute('href').substring(1);
            const targetIndex = Array.from(sections).findIndex(
                section => section.id === targetId
            );
            
            // Handle certification section visibility
            handleCertificationVisibility(targetId, targetIndex);
            
            // Skip if already on the target section
            if (targetIndex === currentIndex) return;
            
            // Reset current section if needed
            if (currentIndex < sections.length) {
                const currentSectionId = sections[currentIndex].id;
                resetSectionDetails(currentSectionId);
            }
            
            // Remove active class from all links and add to clicked link
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            
            const isMovingRight = targetIndex > currentIndex;
            const currentSection = sections[currentIndex];
            const targetSection = sections[targetIndex];
            
            // Reset all sections' animations
            sections.forEach(section => {
                section.classList.remove('slide-in-right', 'slide-in-left', 'fade-out');
            });
            
            // Apply animations
            currentSection.classList.add('fade-out');
            targetSection.classList.add(isMovingRight ? 'slide-in-right' : 'slide-in-left');
            
            // Modify header animation
            if (targetId === 'about') {
                header.classList.remove('nav-hidden');
                header.classList.add('header-visible');
            } else {
                header.classList.add('nav-hidden');
                header.classList.remove('header-visible');
            }
            
            // Slide to target section
            document.querySelector('.sections-container').style.transform = 
                `translateX(-${targetIndex * 100}vw)`;
            
            // Reset About section scroll position
            if (currentIndex === 0 && targetId !== 'about') {
                setTimeout(() => {
                    const aboutSection = document.getElementById('about');
                    aboutSection.scrollTop = 0;
                }, 600);
            }
            
            currentIndex = targetIndex;

            // Update section active states
            setTimeout(() => {
                sections.forEach(section => {
                    section.classList.toggle('active', section.id === targetId);
                });
                sections.forEach(section => {
                    section.classList.remove('transitioning');
                });
            }, 600);

            // Animate certification section if that's the target
            if (targetId === 'certifications') {
                animateCertificationSection();
            }

            // Remove the transitioning class after transition completes
            setTimeout(() => {
                document.body.classList.remove('transitioning-sections');
            }, 650);
        });
    });
    
    // Set initial active states
    sections[0].classList.add('active');
    navLinks[0].classList.add('active');
    header.classList.add('header-visible');

    // Add More button functionality for all sections
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

    // Create an Intersection Observer for skills section
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('skills-visible', entry.isIntersecting);
        });
    }, {
        threshold: 0.2
    });
    observer.observe(skillsSection);

    // Header visibility on scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            header.classList.add('header-hidden');
        } else if (window.scrollY === 0) {
            header.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    });

    // Reset section state when leaving view
    const sectionsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                const section = entry.target;
                section.querySelectorAll('.project-details.visible').forEach(detail => 
                    detail.classList.remove('visible'));
                section.querySelectorAll('.more-btn').forEach(btn => 
                    btn.textContent = 'More');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => sectionsObserver.observe(section));

    // Handle scroll events for all scrollable sections
    const scrollableSections = [
        {id: 'skills', element: skillsSection},
        {id: 'experience', element: document.getElementById('experience')},
        {id: 'projects', element: document.getElementById('projects')},
        {id: 'certifications', element: document.getElementById('certifications')}
    ];
    
    scrollableSections.forEach(({element}) => {
        if (!element) return;
        
        let lastScrollTop = 0;
        element.addEventListener('scroll', () => {
            const scrollTop = element.scrollTop;
            
            // Only show nav when completely at top
            nav.classList.toggle('nav-hidden', scrollTop > 0);
            
            lastScrollTop = scrollTop;
        });
    });

    // Special scroll handling for about section
    const aboutSection = document.getElementById('about');
    let lastAboutScrollTop = 0;
    aboutSection.addEventListener('scroll', () => {
        const scrollTop = aboutSection.scrollTop;
        
        if (scrollTop > lastAboutScrollTop && scrollTop > 50) {
            header.classList.add('header-scroll-hidden');
            nav.classList.add('nav-hidden');
        } else if (scrollTop === 0) {
            header.classList.remove('header-scroll-hidden');
            nav.classList.remove('nav-hidden');
        }
        
        lastAboutScrollTop = scrollTop;
    });

    // Video handling
    const video = document.getElementById('bgVideo');
    if (video) {
        video.addEventListener('ended', () => {
            video.pause();
            video.currentTime = video.duration - 0.1;
            video.style.opacity = '0.6';
            
            setTimeout(() => {
                if (video.currentTime < video.duration - 0.1) {
                    video.currentTime = video.duration - 0.1;
                    video.pause();
                }
            }, 50);
        });

        video.addEventListener('play', () => {
            video.style.opacity = '0.8';
        });
    }

    // Set sections-container width
    document.querySelector('.sections-container').style.width = '600%';
}); 