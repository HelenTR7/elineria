// WINDOW WIDTH DETECT
let currentWidth = $(window).width();
$(window).on('resize', function () {
    currentWidth = $(window).width();
});

//App
const Application = {
    init: function() {
        this.events();
    },
    events: function() {
        !window.reinit && (window.reinit = {});

        //main events
        this.eventList.lazyImgs();
        this.eventList.svgPolifill();
        this.eventList.mask();

        //app events
        this.eventList.productImgs();
        this.eventList.nav();
        this.eventList.sliders();
        this.eventList.connectedSliders();
        this.eventList.formstyler();
    },
    eventList: {
        lazyImgs: function(){

            let callback_loaded = function(el) {
                const $img = $(el),
                      $img_wrap = $img.closest('.lazy-img-wrap');
                $img_wrap.addClass('loaded');
            };

            new LazyLoad({
                elements_selector: ".lazy-img",
                threshold: 0,
                callback_loaded: callback_loaded,
            });
        },
        svgPolifill: function () {
            // svg sprites
            svg4everybody && svg4everybody();
        },
        mask: function() {
            $("[type=tel]").inputmask({
                mask: '+7 (999) 99-99-99',
                "clearIncomplete": false,
                "showMaskOnHover": false,
                "showMaskOnFocus": true,
                "clearMaskOnLostFocus": true
            });
        },

        productImgs: function(){
            $('[data-color-num]').on('click touch', function(){
                let _this = $(this),
                    dotNum = _this.attr('data-color-num'),
                    imgsList = _this.closest('.product-item').find('.product-item__img-wrap');
                    imgsList.removeClass('active');
                    imgsList.eq(dotNum).addClass('active');
            })
        },
        nav: function (){
            $('.burger').on('click touch', function () {
                let _this = $(this);
                _this.toggleClass('active');
                $('.drop-nav').toggleClass('active').slideToggle();
                $('.header').toggleClass('header--open');
            });
            $('.drop-nav .nav-item-subnav .icon').on('click touch', function () {
                let _this = $(this);
                _this.closest('.nav-link-wr').toggleClass('active').next().slideToggle();
            });
        },
        sliders: function(){
            $('.js-products-slider').each(function(i){
                let productsSwiper = new Swiper($('.js-products-slider .swiper-container')[i], {
                    // Disable preloading of all images
                    preloadImages: false,
                    // Enable lazy loading
                    lazy: {
                       loadPrevNext: true,
                    },
                    // autoplay: {
                    //     delay: 5000,
                    // },
                    //loop: true,
                    slidesPerView: 'auto',
                    spaceBetween: 10,

                    // Navigation arrows
                    navigation: {
                        nextEl: $('.js-products-slider .swiper-button-next')[i],
                        prevEl: $('.js-products-slider .swiper-button-prev')[i],
                    },
                    breakpoints: {
                        1024: {
                            spaceBetween: 20,
                            slidesPerView: 4,
                            simulateTouch: false,
                        },
                        768: {
                            spaceBetween: 20,
                            slidesPerView: 3,
                            simulateTouch: false,
                        },
                        0: {
                            spaceBetween: 10,
                            slidesPerView: 'auto',
                            simulateTouch: false,
                        },
                    }
                });
            });
            $('.js-cat-slider').each(function(i){
                let productsSwiper = new Swiper($('.js-cat-slider .swiper-container')[i], {
                    // Disable preloading of all images
                    preloadImages: false,
                    // Enable lazy loading
                    lazy: {
                        loadPrevNext: true,
                    },
                    // autoplay: {
                    //     delay: 5000,
                    // },
                    //loop: true,
                    slidesPerView: 'auto',
                    spaceBetween: 20,

                    // Navigation arrows
                    navigation: {
                        nextEl: $('.js-cat-slider .swiper-button-next')[i],
                        prevEl: $('.js-cat-slider .swiper-button-prev')[i],
                    },
                    breakpoints: {
                        1024: {
                            spaceBetween: 20,
                            slidesPerView: 6,
                            simulateTouch: false,
                        },
                        768: {
                            spaceBetween: 20,
                            slidesPerView: 4,
                            simulateTouch: false,
                        },
                        0: {
                            spaceBetween: 10,
                            slidesPerView: 'auto',
                            simulateTouch: false,
                        },
                    }
                });
            });
        },
        connectedSliders: function(){
            function reportWindowSize() {
                window.addEventListener('resize', function () {
                    return window.innerWidth;
                });
            }
            let swiperThumbs = new Swiper('.js-swiper-thumbs .swiper-container', {
                // Disable preloading of all images
                preloadImages: false,
                // Enable lazy loading
                lazy: {
                    loadPrevNext: true,
                },
                direction: 'vertical',
                spaceBetween: 10,
                slidesPerView: 5,
                navigation: {
                    nextEl: '.th-swiper-button-next',
                    prevEl: '.th-swiper-button-prev',
                },
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                breakpoints: {
                    0: {
                        spaceBetween: 5,
                        slidesPerView: 4,
                    },
                    576: {
                        spaceBetween: 20,
                        slidesPerView: 4,
                    },
                }
            });
            let swiperMain = new Swiper('.js-swiper-main .swiper-container', {
                // Disable preloading of all images
                preloadImages: false,
                // Enable lazy loading
                lazy: {
                    loadPrevNext: true,
                },
                spaceBetween: 15,
                breakpoints: {
                    320: {
                        width: reportWindowSize(),
                    },
                    576: {
                        width: 400,
                    },
                    768: {
                        width: 575,
                    },
                    1024: {
                        width: 485,
                    },
                    1310: {
                        width: 575,
                    },
                },
                thumbs: {
                    swiper: swiperThumbs
                }
            });

        },
        formstyler: function(){
            $('.js-formstyler').styler({
                selectSearch: true,
                selectSearchLimit: 5,
                selectSmartPositioning: false,
            });
            $('.js-custom-toggle').on('click touch', function (){
                let _this = $(this);
                if(_this.hasClass('active')){
                    _this.removeClass('active');
                    _this.next().slideUp();
                } else {
                    _this.addClass('active');
                    _this.next().slideDown();
                }
            });
            $('.catalog__filter-btn').on('click touch', function (){
                $('.catalog-filters').slideToggle();
            })
        },
    }
};
$(function () {
    'use strict';
    Application.init();
});
