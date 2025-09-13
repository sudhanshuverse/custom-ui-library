let currentSlide = 0;
const slides = document.querySelectorAll( '.slide' );
const totalSlides = slides.length;

function updateSlider () {
    slides.forEach( ( slide, index ) => {
        slide.classList.remove(
            'center', 'left', 'right',
            'leave-left', 'leave-right',
            'enter-left', 'enter-right'
        );

        if ( index === currentSlide ) {
            slide.classList.add( 'center' );
        } else if ( index === ( currentSlide + 1 ) % totalSlides ) {
            slide.classList.add( 'right' );
        } else if ( index === ( currentSlide - 1 + totalSlides ) % totalSlides ) {
            slide.classList.add( 'left' );
        } else {
            if (
                ( index < currentSlide && currentSlide - index <= totalSlides / 2 ) ||
                ( index > currentSlide && index - currentSlide > totalSlides / 2 )
            ) {
                slide.classList.add( 'leave-left' );
            } else {
                slide.classList.add( 'leave-right' );
            }
        }
    } );
}

function nextSlide () {
    currentSlide = ( currentSlide + 1 ) % totalSlides;
    updateSlider();
}

// Auto-slide every 3 seconds
setInterval( nextSlide, 3000 );
