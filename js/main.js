(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top & Progress Circle
    $(document).ready(function () {
        var progressPath = document.querySelector('.progress-wrap path');

        if (progressPath) {
            var pathLength = progressPath.getTotalLength();

            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            }

            updateProgress();
            $(window).scroll(updateProgress);

            $('.progress-wrap').on('click', function (event) {
                event.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, 550);
                return false;
            });
        }
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Specialities Banner carousel
    $(".specialities-banner-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: false,
        rtl: true,
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            1024: { items: 2 }
        }
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Features Banner Carousel
    (function () {
        const carousel = document.querySelector('.features-carousel');
        if (!carousel) return; // Exit if element not found

        const dots = document.querySelectorAll('.dot');
        const cardWidth = window.innerWidth > 1200 ? 'calc(33.333% - 16px)' : 'calc(50% - 12px)';
        let currentIndex = 0;
        let autoplayInterval;

        function updateCarousel(index) {
            currentIndex = index % 4;

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });

            // Calculate offset based on screen size
            let offset = 0;
            if (window.innerWidth > 1200) {
                offset = currentIndex * 33.333;
            } else if (window.innerWidth > 768) {
                offset = currentIndex * 50;
            } else {
                offset = currentIndex * 100;
            }

            carousel.style.animation = 'none';
            carousel.offsetHeight; // Trigger reflow
            carousel.style.transform = `translateX(calc(-${offset}vw))`;
            carousel.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        function nextCard() {
            updateCarousel(currentIndex + 1);
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextCard, 5000);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoplay();
                updateCarousel(index);
                startAutoplay();
            });
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCarousel(currentIndex);
            }, 250);
        });

        // Initialize
        updateCarousel(0);
        startAutoplay();
    })();

    // Check scroll position for floating buttons
    $(window).scroll(function () {
        var scrollPos = $(this).scrollTop();
        // Use a simple threshold of 100px for guaranteed visibility after initial scroll
        var threshold = 100;

        if (scrollPos > threshold) {
            $('.floating-sidebar').addClass('show-sidebar');
        } else {
            $('.floating-sidebar').removeClass('show-sidebar');
        }
    });


    // Floating Sidebar Buttons - Removed in favor of static HTML

})(jQuery);