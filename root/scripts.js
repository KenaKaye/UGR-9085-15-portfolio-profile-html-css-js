const slides = document.querySelectorAll('.carousel .slide');
const totalSlides = slides.length;
let currentIndex = 1; // Start at the first real slide (after the clone)
const carouselInner = document.querySelector('.carousel-inner');

// Clone the first and last slides for smooth looping
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);
carouselInner.appendChild(firstSlide); // Append clone of the first slide to the end
carouselInner.insertBefore(lastSlide, carouselInner.firstChild); // Insert clone of the last slide to the start

// Update totalSlides because of the clones
const updatedSlides = document.querySelectorAll('.carousel .slide');
const updatedTotalSlides = updatedSlides.length;

document.querySelector('.prev').addEventListener('click', () => {
    showSlide(currentIndex - 1);
});

document.querySelector('.next').addEventListener('click', () => {
    showSlide(currentIndex + 1);
});

function showSlide(index) {
    // Adjust index for circular navigation
    if (index < 0) {
        index = updatedTotalSlides - 2; // Go to the second last slide (before clone)
        setTimeout(() => {
            carouselInner.style.transition = 'none'; // Disable transition for immediate jump
            carouselInner.style.transform = `translateX(-${index * 100}%)`;
            // Wait for the jump and reset the transition for smooth sliding
            setTimeout(() => {
                carouselInner.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    } else if (index >= updatedTotalSlides - 1) {
        index = 1; // Go to the second slide (after clone)
        setTimeout(() => {
            carouselInner.style.transition = 'none'; // Disable transition for immediate jump
            carouselInner.style.transform = `translateX(-${index * 100}%)`;
            // Wait for the jump and reset the transition for smooth sliding
            setTimeout(() => {
                carouselInner.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    }

    // Update the position of the carousel using translateX
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
}

// Initialize the first slide position
showSlide(currentIndex); // Start at the real first slide (not the clone)


// Lightbox for Hobbies Page
const hobbyImages = document.querySelectorAll('.hobby img');
const lightbox = document.createElement('div');
const lightboxImg = document.createElement('img');

lightbox.id = 'lightbox';
lightbox.style.position = 'fixed';
lightbox.style.top = '0';
lightbox.style.left = '0';
lightbox.style.width = '100%';
lightbox.style.height = '100%';
lightbox.style.background = 'rgba(0, 0, 0, 0.8)';
lightbox.style.display = 'flex';
lightbox.style.justifyContent = 'center';
lightbox.style.alignItems = 'center';
lightbox.style.visibility = 'hidden';
lightbox.style.opacity = '0';
lightbox.style.transition = 'opacity 0.3s ease';

lightboxImg.style.maxWidth = '90%';
lightboxImg.style.maxHeight = '90%';
lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

hobbyImages.forEach(image => {
    image.addEventListener('click', () => {
        lightboxImg.src = image.src;
        lightbox.style.visibility = 'visible';
        lightbox.style.opacity = '1';
    });
});

lightbox.addEventListener('click', () => {
    lightbox.style.visibility = 'hidden';
    lightbox.style.opacity = '0';
});

// Contact Form Validation
const form = document.querySelector('#contact-form');

form.addEventListener('submit', (event) => {
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (!name || !email || !message) {
        event.preventDefault();
        alert('Please fill out all fields before submitting.');
    } else if (!validateEmail(email)) {
        event.preventDefault();
        alert('Please enter a valid email address.');
    }
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

