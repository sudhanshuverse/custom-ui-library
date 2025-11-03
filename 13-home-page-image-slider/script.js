class SyncedSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        this.slides = this.slider.querySelectorAll('.slide');
        this.progress = this.slider.querySelector('.progress-bar');
        this.prevBtn = this.slider.querySelector('.nav-btn.prev');
        this.nextBtn = this.slider.querySelector('.nav-btn.next');
        this.dotsContainer = this.slider.querySelector('.dots');
        this.current = 0;
        this.total = this.slides.length;
        this.delay = 6000;
        this.isAnimating = false;

        this.createDots();
        this.updateDots();
        this.bindEvents();
        this.updateButtonPreviews();
        this.startProgress();
    }

    createDots() {
        for (let i = 0; i < this.total; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.manualGoTo(i));
            this.dotsContainer.appendChild(dot);
        }
        this.dots = this.dotsContainer.querySelectorAll('.dot');
    }

    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.manualNext());
        this.prevBtn.addEventListener('click', () => this.manualPrev());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.manualNext();
            if (e.key === 'ArrowLeft') this.manualPrev();
        });
        this.progress.addEventListener('animationend', () => {
            this.next();
        });
    }

    goTo(index, direction = 'right') {
        if (this.isAnimating || index === this.current) return;
        this.isAnimating = true;

        const currentSlide = this.slides[this.current];
        const nextSlide = this.slides[(index + this.total) % this.total];
        const offset = direction === 'right' ? '100%' : '-100%';

        this.slides.forEach(slide => slide.classList.remove('exiting'));

        nextSlide.style.transition = 'none';
        nextSlide.style.transform = `translateX(${offset})`;
        nextSlide.style.opacity = '1';
        nextSlide.classList.add('active');

        requestAnimationFrame(() => {
            currentSlide.classList.add('exiting');
            nextSlide.style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';
            currentSlide.style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';
            currentSlide.style.transform = direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)';
            nextSlide.style.transform = 'translateX(0)';
        });

        const caption = nextSlide.querySelector('.caption-box');
        caption.style.animation = 'none';
        void caption.offsetWidth;
        caption.style.animation = 'boxSlideIn 1.4s cubic-bezier(0.77, 0, 0.175, 1) forwards';

        setTimeout(() => {
            currentSlide.classList.remove('active', 'exiting');
            currentSlide.style.transition = '';
            currentSlide.style.transform = '';
            this.current = (index + this.total) % this.total;
            this.updateDots();
            this.updateButtonPreviews();
            this.resetProgress();
            this.isAnimating = false;
        }, 1000);
    }

    manualGoTo(index) {
        this.clearProgress();
        this.goTo(index);
    }

    next() {
        this.goTo(this.current + 1, 'right');
    }

    prev() {
        this.goTo(this.current - 1, 'left');
    }

    manualNext() {
        this.clearProgress();
        this.next();
    }

    manualPrev() {
        this.clearProgress();
        this.prev();
    }

    updateDots() {
        this.dots.forEach((dot, i) => dot.classList.toggle('active', i === this.current));
    }

    updateButtonPreviews() {
        const nextIndex = (this.current + 1) % this.total;
        const prevIndex = (this.current - 1 + this.total) % this.total;
        this.nextBtn.querySelector('img').src = this.slides[nextIndex].querySelector('img').src;
        this.prevBtn.querySelector('img').src = this.slides[prevIndex].querySelector('img').src;
    }

    startProgress() {
        this.progress.style.animation = `progress ${this.delay}ms linear forwards`;
    }

    resetProgress() {
        this.progress.style.animation = 'none';
        void this.progress.offsetWidth;
        this.progress.style.animation = `progress ${this.delay}ms linear forwards`;
    }

    clearProgress() {
        this.progress.style.animation = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SyncedSlider('.slider');
});