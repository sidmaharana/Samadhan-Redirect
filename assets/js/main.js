/* SAMADHAN 2025-26 - Main JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Countdown Timer - Finale: 4 January 2026, 9:00 AM IST
    const countdownDate = new Date('January 4, 2026 09:00:00 GMT+0530').getTime();
    let celebrationTriggered = false;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Trigger celebration animation only once
            if (!celebrationTriggered) {
                triggerCelebration();
                celebrationTriggered = true;
            }
        }
    }

    function triggerCelebration() {
        // Add celebration class to countdown section
        const countdownSection = document.querySelector('.countdown-section');
        if (countdownSection) {
            countdownSection.classList.add('celebration-active');
        }

        // Create confetti elements
        createConfetti();
        
        // Add pulsing animation to countdown timer
        const countdownTimer = document.getElementById('countdownTimer');
        if (countdownTimer) {
            countdownTimer.classList.add('celebration-pulse');
        }

        // Show celebration message
        showCelebrationMessage();
        
        // Remove celebration effects after 10 seconds
        setTimeout(() => {
            if (countdownSection) {
                countdownSection.classList.remove('celebration-active');
            }
            if (countdownTimer) {
                countdownTimer.classList.remove('celebration-pulse');
            }
            removeConfetti();
        }, 10000);
    }

    function createConfetti() {
        const colors = ['#F7AC2D', '#003C64', '#E9EAEC', '#FFD700', '#FF6B6B', '#4ECDC4'];
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confettiContainer);

        // Create multiple confetti pieces
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                animation: confetti-fall ${2 + Math.random() * 3}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                transform: rotate(${Math.random() * 360}deg);
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            `;
            confettiContainer.appendChild(confetti);
        }
    }

    function removeConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        if (confettiContainer) {
            confettiContainer.remove();
        }
    }

    function showCelebrationMessage() {
        const message = document.createElement('div');
        message.className = 'celebration-message';
        message.innerHTML = `
            <h2>🎉 SAMADHAN 2025-26 HAS BEGUN! 🎉</h2>
            <p>The finale is happening now at IIT Delhi!</p>
        `;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: celebration-bounce 0.6s ease-out;
            border: 3px solid var(--accent);
        `;
        document.body.appendChild(message);

        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Image Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetAutoSlide();
        });
    });

    startAutoSlide();

    // Statistics Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    if (target >= 1000) {
                        stat.textContent = Math.floor(current).toLocaleString();
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target >= 1000) {
                        stat.textContent = target.toLocaleString();
                    } else {
                        stat.textContent = target;
                    }
                }
            };
            updateCounter();
        });
    }

    // Intersection Observer for stats animation
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateStats();
                    statsAnimated = true;
                }
            });
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // Video play button (placeholder functionality)
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            alert('Video player would open here. Replace with actual YouTube embed or video player.');
        });
    }

    // Interactive Timeline
    const timelinePhases = document.querySelectorAll('.timeline-phase');
    timelinePhases.forEach(phase => {
        const details = phase.querySelector('.phase-details');
        
        // Initially hide details using CSS properties for transition
        details.style.opacity = '0';
        details.style.visibility = 'hidden';
        details.style.transform = 'translateY(10px)'; // Start slightly below

        phase.addEventListener('mouseenter', () => {
            details.style.opacity = '1';
            details.style.visibility = 'visible';
            details.style.transform = 'translateY(0)';
        });

        phase.addEventListener('mouseleave', () => {
            details.style.opacity = '0';
            details.style.visibility = 'hidden';
            details.style.transform = 'translateY(10px)';
        });

        if (phase.classList.contains('finale-phase')) {
            const scheduleButton = phase.querySelector('.view-schedule-btn');
            if (scheduleButton) {
                scheduleButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.querySelector(scheduleButton.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }
        }
    });
});
