/* Hero Banner Fix for Deployment Issues */

document.addEventListener('DOMContentLoaded', function() {
    // Wait for page to fully load before starting animations
    window.addEventListener('load', function() {
        initializeHeroAnimation();
        initializeTextAnimations();
    });
});

// Robust hero image animation with error handling
function initializeHeroAnimation() {
    const heroContainer = document.querySelector('.hero-bg-container');
    const heroImages = document.querySelectorAll('.hero-bg-image');
    
    if (!heroContainer || heroImages.length === 0) {
        console.warn('Hero elements not found');
        return;
    }

    let loadedImages = 0;
    let currentImageIndex = 0;
    
    // Preload all images with error handling
    heroImages.forEach((imageDiv, index) => {
        const imagePath = imageDiv.getAttribute('data-bg');
        
        if (!imagePath) {
            console.error(`No data-bg attribute found for image ${index}`);
            loadedImages++;
            return;
        }
        
        const img = new Image();
        
        img.onload = function() {
            imageDiv.style.backgroundImage = `url('${imagePath}')`;
            loadedImages++;
            console.log(`Loaded: ${imagePath}`);
            
            // Start animation when all images are loaded
            if (loadedImages === heroImages.length) {
                startHeroSlideshow();
            }
        };
        
        img.onerror = function() {
            console.error(`Failed to load: ${imagePath}`);
            // Set fallback gradient
            imageDiv.style.background = 'linear-gradient(135deg, #003C64 0%, #002a47 100%)';
            loadedImages++;
            
            if (loadedImages === heroImages.length) {
                startHeroSlideshow();
            }
        };
        
        img.src = imagePath;
        
        // Initialize styles
        imageDiv.style.opacity = index === 0 ? '1' : '0';
        imageDiv.style.zIndex = index === 0 ? '2' : '1';
    });
    
    // Fallback: start animation after 3 seconds even if some images fail
    setTimeout(() => {
        if (loadedImages < heroImages.length) {
            console.warn('Some images failed to load, starting animation anyway');
            startHeroSlideshow();
        }
    }, 3000);
    
    function startHeroSlideshow() {
        if (heroImages.length <= 1) return;
        
        // Mark container as JavaScript-controlled
        heroContainer.classList.add('js-active');
        
        setInterval(() => {
            const currentImage = heroImages[currentImageIndex];
            const nextIndex = (currentImageIndex + 1) % heroImages.length;
            const nextImage = heroImages[nextIndex];
            
            // Fade out current
            currentImage.style.transition = 'opacity 1.5s ease-in-out';
            currentImage.style.opacity = '0';
            currentImage.style.zIndex = '1';
            
            // Fade in next
            nextImage.style.transition = 'opacity 1.5s ease-in-out';
            nextImage.style.opacity = '1';
            nextImage.style.zIndex = '2';
            
            currentImageIndex = nextIndex;
        }, 4000);
    }
}

// Simplified text animations with error handling
function initializeTextAnimations() {
    const heroChars = document.querySelectorAll('.hero-title .char, .hero-tagline .char, .hero-subtitle .char');
    
    if (heroChars.length === 0) {
        console.warn('No character elements found for animation');
        return;
    }
    
    // Add staggered animation delays
    heroChars.forEach((char, index) => {
        char.style.animationDelay = `${index * 0.1}s`;
        char.classList.add('animate-char');
    });
}