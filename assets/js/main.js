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

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if(daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if(hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if(minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if(secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

        } else {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if(daysEl) daysEl.textContent = '00';
            if(hoursEl) hoursEl.textContent = '00';
            if(minutesEl) minutesEl.textContent = '00';
            if(secondsEl) secondsEl.textContent = '00';
            
            // Trigger celebration animation only once
            if (!celebrationTriggered) {
                triggerCelebration();
                celebrationTriggered = true;
            }
        }
    }

    if (document.getElementById('days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
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

    // Image Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        currentSlide = (index + slides.length) % slides.length;

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

    if (slides.length > 0) {
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
    }


    // Statistics Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            let start = 0;
            const stepTime = 16; // roughly 60fps
            const steps = duration / stepTime;
            const increment = target / steps;

            const updateCounter = () => {
                start += increment;
                if (start < target) {
                    stat.textContent = Math.floor(start).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            };
            updateCounter();
        });
    }

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
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // Video play button functionality
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const storyVideo = document.getElementById('storyVideo');
    const videoContainer = document.querySelector('.video-container');
    
    if (videoPlayBtn && storyVideo) {
        videoPlayBtn.addEventListener('click', () => {
            videoContainer.classList.add('playing');
            storyVideo.controls = true;
            storyVideo.play();
        });
        
        storyVideo.addEventListener('pause', () => {
            if (storyVideo.currentTime === 0 || storyVideo.ended) {
                videoContainer.classList.remove('playing');
            }
        });
        
        storyVideo.addEventListener('ended', () => {
            videoContainer.classList.remove('playing');
            storyVideo.currentTime = 0;
        });
    }

    // Hero Banner Animation - No Blank Gaps Between Images
    const heroImages = document.querySelectorAll('.hero-bg-image');
    let currentImageIndex = 0;
    let animationInterval;

    // Configuration for seamless overlapping transitions
    const FADE_IN_DURATION = 1500;   // 1.5 seconds fade in
    const DISPLAY_DURATION = 3000;   // 3 seconds at full opacity
    const FADE_OUT_DURATION = 1500;  // 1.5 seconds fade out
    const OVERLAP_TIMING = FADE_IN_DURATION + DISPLAY_DURATION - 500; // Start next image 500ms before current starts fading out

    // Initialize all background images
    function initializeHeroImages() {
        heroImages.forEach((image, index) => {
            const bgImage = image.getAttribute('data-bg');
            image.style.backgroundImage = `url('${bgImage}')`;
            
            // Optimize for smooth transitions
            image.style.willChange = 'opacity';
            image.style.backfaceVisibility = 'hidden';
            image.style.transform = 'translate3d(0, 0, 0)';
            image.style.filter = 'none';
            image.style.mixBlendMode = 'normal';
            image.style.transition = 'none';
            
            // All images start at minimum opacity except first
            if (index === 0) {
                image.style.opacity = '0.2'; // Start at low opacity, not zero
                image.style.zIndex = '2';
                // Start first image fade-in immediately
                startImageCycle(image, 0);
            } else {
                image.style.opacity = '0.2'; // Minimum opacity to prevent gaps
                image.style.zIndex = '1';
            }
        });
    }

    // Complete fade cycle: fade-in → display → fade-out (but not to zero)
    function startImageCycle(image, delay = 0) {
        setTimeout(() => {
            // Phase 1: Fade in from low to high opacity
            image.style.zIndex = '3'; // Bring to front during fade-in
            image.style.transition = `opacity ${FADE_IN_DURATION}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
            
            requestAnimationFrame(() => {
                image.style.opacity = '1'; // Fade to full opacity
            });

            // Phase 2: Stay at full opacity
            setTimeout(() => {
                // Phase 3: Fade out but not to zero - fade to low opacity
                image.style.transition = `opacity ${FADE_OUT_DURATION}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
                
                requestAnimationFrame(() => {
                    image.style.opacity = '0.2'; // Fade to low opacity, not zero
                });

                // Clean up after fade-out completes
                setTimeout(() => {
                    image.style.zIndex = '1'; // Send to back
                    image.style.transition = 'none';
                }, FADE_OUT_DURATION + 50);

            }, DISPLAY_DURATION);

        }, delay);
    }

    // Start the seamless overlapping animation
    function startSeamlessAnimation() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion || heroImages.length <= 1) {
            return;
        }

        let imageIndex = 0;

        // Start continuous overlapping cycles
        animationInterval = setInterval(() => {
            imageIndex = (imageIndex + 1) % heroImages.length;
            const nextImage = heroImages[imageIndex];
            
            // Start next image cycle with overlap to prevent gaps
            startImageCycle(nextImage, 0);
            
        }, OVERLAP_TIMING); // Start next image before current finishes
    }

    // Cleanup function
    function stopSeamlessAnimation() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
    }

    // Initialize and start animation
    if (heroImages.length > 0) {
        initializeHeroImages();
        
        // Start seamless animation
        setTimeout(() => {
            startSeamlessAnimation();
        }, 100);
    }

    // Performance optimization
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSeamlessAnimation();
        } else if (heroImages.length > 1) {
            setTimeout(() => {
                initializeHeroImages();
                startSeamlessAnimation();
            }, 500);
        }
    });

    // Initialize and start animation
    if (heroImages.length > 0) {
        initializeHeroImages();
        
        // Start seamless animation
        setTimeout(() => {
            startSeamlessAnimation();
        }, 100);
    }

    // Performance optimization
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSeamlessAnimation();
        } else if (heroImages.length > 1) {
            setTimeout(() => {
                initializeHeroImages();
                startSeamlessAnimation();
            }, 500);
        }
    });

    // Hero Title Character Animation Enhancement
    const heroChars = document.querySelectorAll('.hero-title .char');
    
    // Add ripple effect on character hover
    heroChars.forEach((char, index) => {
        char.addEventListener('mouseenter', () => {
            // Create ripple effect on nearby characters
            const nearbyChars = Array.from(heroChars).slice(
                Math.max(0, index - 2), 
                Math.min(heroChars.length, index + 3)
            );
            
            nearbyChars.forEach((nearbyChar, nearbyIndex) => {
                const delay = Math.abs(nearbyIndex - 2) * 50; // Center character has no delay
                setTimeout(() => {
                    nearbyChar.style.transform = `translateY(-${5 + Math.random() * 5}px) scale(${1.1 + Math.random() * 0.1})`;
                    // Only change color on direct hover, not ripple effect
                    if (nearbyIndex === 2) { // Center character (the one being hovered)
                        nearbyChar.style.color = `hsl(${45 + Math.random() * 20}, 85%, ${60 + Math.random() * 20}%)`;
                    }
                }, delay);
            });
        });
        
        char.addEventListener('mouseleave', () => {
            // Reset character to white after hover
            setTimeout(() => {
                char.style.transform = '';
                char.style.color = 'var(--text-light)'; // Reset to white
            }, 200);
        });
        
        // Add random sparkle effect (keeping white color)
        if (Math.random() > 0.7) {
            setTimeout(() => {
                char.style.animation += ', sparkle 2s ease-in-out infinite';
            }, 2000 + Math.random() * 3000);
        }
    });

    // Add sparkle animation dynamically (white glow)
    const sparkleKeyframes = `
        @keyframes sparkle {
            0%, 100% { 
                text-shadow: 2px 2px 8px rgba(0,0,0,0.7), 0 0 15px rgba(255, 255, 255, 0.3); 
            }
            50% { 
                text-shadow: 2px 2px 8px rgba(0,0,0,0.7), 0 0 25px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.3); 
            }
        }
    `;
    
    // Inject sparkle animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = sparkleKeyframes;
    document.head.appendChild(styleSheet);

    // Hero Tagline and Subtitle Character Animation Enhancement
    const taglineChars = document.querySelectorAll('.hero-tagline .char');
    const subtitleChars = document.querySelectorAll('.hero-subtitle .char');
    
    // Add subtle hover effects for tagline (no color change)
    taglineChars.forEach((char, index) => {
        char.addEventListener('mouseenter', () => {
            char.style.transform = `translateY(-8px) scale(1.15) rotateZ(${Math.random() * 10 - 5}deg)`;
        });
        
        char.addEventListener('mouseleave', () => {
            setTimeout(() => {
                char.style.transform = '';
            }, 150);
        });
    });
    
    // Add subtle hover effects for subtitle (no color change)
    subtitleChars.forEach((char, index) => {
        char.addEventListener('mouseenter', () => {
            char.style.transform = `translateY(-5px) scale(1.1) rotateZ(${Math.random() * 6 - 3}deg)`;
        });
        
        char.addEventListener('mouseleave', () => {
            setTimeout(() => {
                char.style.transform = '';
            }, 150);
        });
    });

    // --- NEW, CONSOLIDATED INTERACTIVE TIMELINE LOGIC ---
    const timeline = document.querySelector('.interactive-timeline');
    if (timeline) {
        const timelineContainer = timeline.querySelector('.timeline-container');
        const phases = Array.from(timeline.querySelectorAll('.timeline-phase'));
        const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        const deactivateAll = () => {
            phases.forEach(p => p.classList.remove('is-active'));
            timeline.classList.remove('timeline-expanded');
        };

        if (isTouchDevice()) {
            // TAP/CLICK logic for Touch Devices
            phases.forEach(phase => {
                phase.addEventListener('click', (e) => {
                    // Prevent closing when clicking on links within the details
                    if (e.target.closest('a') || e.target.closest('button')) {
                        return;
                    }
                    
                    const wasActive = phase.classList.contains('is-active');
                    deactivateAll();
                    if (!wasActive) {
                        phase.classList.add('is-active');
                        timeline.classList.add('timeline-expanded');
                    }
                });
            });
        } else {
            // HOVER logic for Desktop Devices
            phases.forEach(phase => {
                phase.addEventListener('mouseenter', () => {
                    // Quick deactivation and reactivation to avoid flickering
                    if (!phase.classList.contains('is-active')) {
                       deactivateAll();
                       phase.classList.add('is-active');
                       timeline.classList.add('timeline-expanded');
                    }
                });
            });

            if (timelineContainer) {
                timelineContainer.addEventListener('mouseleave', () => {
                    deactivateAll();
                });
            }
        }
    }

    // Partners Carousel Touch/Mobile Interaction
    const partnersCarousel = document.querySelector('.partners-carousel');
    if (partnersCarousel) {
        let touchStartTime = 0;
        let isPaused = false;

        // Pause animation on touch/tap for mobile
        partnersCarousel.addEventListener('touchstart', () => {
            touchStartTime = Date.now();
            partnersCarousel.style.animationPlayState = 'paused';
            isPaused = true;
        });

        partnersCarousel.addEventListener('touchend', () => {
            const touchDuration = Date.now() - touchStartTime;
            // Resume animation after a short delay, unless it was a long press
            setTimeout(() => {
                if (isPaused && touchDuration < 2000) {
                    partnersCarousel.style.animationPlayState = 'running';
                    isPaused = false;
                }
            }, 500);
        });

        // Handle mouse events for desktop (already handled by CSS :hover)
        partnersCarousel.addEventListener('mouseenter', () => {
            partnersCarousel.style.animationPlayState = 'paused';
        });

        partnersCarousel.addEventListener('mouseleave', () => {
            partnersCarousel.style.animationPlayState = 'running';
            isPaused = false;
        });
    }

    // Theme Read More Functionality
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const description = this.previousElementSibling;
            if (description && description.classList.contains('theme-description')) {
                description.classList.toggle('expanded');
                if (description.classList.contains('expanded')) {
                    this.textContent = 'Read Less';
                } else {
                    this.textContent = 'Read More';
                }
            }
        });
    });
});



    // Lazy Loading Images with Intersection Observer
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preload hero background images
    const heroBackgrounds = document.querySelectorAll('.hero-bg-image[data-bg]');
    heroBackgrounds.forEach((el, index) => {
        const bgUrl = el.getAttribute('data-bg');
        if (index === 0) {
            // Load first image immediately
            el.style.backgroundImage = `url('${bgUrl}')`;
            el.classList.add('active');
        } else {
            // Preload other images in background
            const img = new Image();
            img.src = bgUrl;
            img.onload = () => {
                el.style.backgroundImage = `url('${bgUrl}')`;
            };
        }
    });
// Image Optimization and Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
    // Add lazy loading to images that don't have it (except hero animation images and carousel images)
    const imagesToLazyLoad = document.querySelectorAll('img:not([loading]):not(.hero-bg-image):not(.logo-img):not(.carousel-slide img)');
    
    imagesToLazyLoad.forEach(img => {
        // Skip if it's a hero animation image or carousel image
        const src = img.getAttribute('src');
        if (src && !src.includes('hero-bg') && !src.includes('hero-banner') && !src.includes('slider-')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // Intersection Observer for better lazy loading support (exclude carousel images)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        // Observe all lazy images except carousel images
        const lazyImages = document.querySelectorAll('img[loading="lazy"]:not(.carousel-slide img)');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Ensure carousel images are immediately visible
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    carouselImages.forEach(img => {
        img.classList.add('loaded');
        img.style.opacity = '1';
    });

    // WebP support detection
    function supportsWebP() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    // Add WebP class to body if supported
    supportsWebP().then(supported => {
        if (supported) {
            document.body.classList.add('webp');
        }
    });

    // Preload critical images (non-hero)
    const criticalImages = [
        'assets/images/logo.png',
        'assets/images/slider-01.png'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Image error handling and fallback
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            const img = e.target;
            // Don't apply fallback to hero animation images
            if (!img.src.includes('hero-bg') && !img.src.includes('hero-banner')) {
                img.style.display = 'none';
                console.warn('Image failed to load:', img.src);
            }
        }
    }, true);
});