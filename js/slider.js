let currentSlide = 0;
const slides = document.querySelectorAll('.slider .banner-img');

function showSlides() {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    currentSlide++;

    if (currentSlide > slides.length) {
        currentSlide = 1;
    }

    slides[currentSlide - 1].classList.add('active');

    setTimeout(showSlides, 10000);
}

window.onload = showSlides;