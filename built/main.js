import * as DynamicTheme from './DynamicTheme.js';
// repeated variables
var $window = $(window);
var $root = $('html, body');
$(document).ready(function () {
    "use strict";
    DynamicTheme.init();
    clientCarousel();
    pagePilling();
    themeOption();
    menuToggler();
    sliderOwlCarousel();
    typedJS();
    skills();
    countup();
    portfolioPopup();
    postSidebar();
    validateEmail();
    sendEmail();
    $('.owl-item.active .hero-slide').addClass('zoom');
    return $('[data-toggle="tooltip"]').tooltip();
});
$window.on("load", (function () {
    $("#overlayer").delay(500).fadeOut('slow');
    $(".loader").delay(1000).fadeOut('slow');
    portfolioIsotop();
}));
$(".to-contact").on('click', function () {
    $("section.active").removeClass("active");
    var $id = $(this).attr('href');
    $('#main').children($id).addClass('active');
});
/*-----------------------------------------------------------------------------
                                   FUNCTIONS
-----------------------------------------------------------------------------*/
/*-------------------------
  Testimonial CAROUSEL JS
-------------------------*/
function clientCarousel() {
    $(".testimonial .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        stagePadding: 5,
        nav: false,
        autoplay: false,
        dots: true,
        mouseDrag: true,
        touchDrag: true,
        smartSpeed: 700,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                mouseDrag: false
            },
            1200: {
                items: 2,
                nav: false,
                mouseDrag: true,
            },
        }
    });
}
/*-------------------------
       Page Pilling
-------------------------*/
function pagePilling() {
    "use strict";
    var ids = [];
    var tooltips = [];
    var colors = [];
    $('.section').each(function () {
        ids.push(this.id);
        tooltips.push($(this).data("navigation-tooltip"));
        colors.push($(this).data("navigation-color"));
    });
    $('#pagepiling').pagepiling({
        sectionsColor: colors,
        anchors: ids,
        menu: '#myMenu',
        direction: 'vertical',
        verticalCentered: true,
        navigation: {
            'position': 'right',
            'tooltips': tooltips
        },
        loopBottom: true,
        loopTop: true,
        scrollingSpeed: 700,
        easing: 'swing',
        css3: true,
        normalScrollElements: '.owl-stage-outer',
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: true,
        //events
        onLeave: function (index, nextIndex, direction) {
            if (nextIndex == 1) {
                // $(".special-section").css('color', '#fff');
            }
            else {
                // $(".special-section").css('color', ColorModule.baseColor);
            }
        },
        afterLoad: function (anchorLink, index) {
        },
        afterRender: function (index) {
            if (index > 1 && $('.section.hero').hasClass("speacial-hero")) {
                // $("#pp-nav li .pp-tooltip").css('color', ColorModule.baseColor);
            }
            else if ($('.section.hero').hasClass("speacial-hero")) {
                // $("#pp-nav li .pp-tooltip").css('color', ColorModule.baseColor);
            }
        },
    });
}
/*-------------------------
        Theme Option
-------------------------*/
function themeOption() {
    "use strict";
    $('.color-scheme li .dark-scheme-option').click(changeDarkScheme);
    $('.color-scheme li .light-scheme').click(changeLightScheme);
}
// TODO: Remove
function changeDarkScheme() {
    $("body").addClass('dark-scheme');
    $('.color-scheme li a').removeClass('active');
    $(this).addClass('active');
}
function changeLightScheme() {
    $("body").removeClass('dark-scheme');
    $('.color-scheme li a').removeClass('active');
    $(this).addClass('active');
}
/*-------------------------
    MENU TOGGLER
-------------------------*/
function menuToggler() {
    "use strict";
    $(".overlay-menu-toggler").on("click", function () {
        $(".overlay-menu").addClass("show");
    });
    $(".overlay-menu").on("click", function () {
        $(this).removeClass("show");
    });
}
/*-----------------------------
      SLIDER OWL CAROUSEL
------------------------------*/
function sliderOwlCarousel() {
    "use strict";
    $('.hero .owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        nav: false,
        dots: false,
        autoplay: true,
        touchDrag: true,
        smartSpeed: 5000,
        animateOut: 'fadeOut',
        autoplayHoverPause: true,
    });
    $('#hero-slider').on("translate.owl.carousel", function () {
        setTimeout(function () {
            $('.hero-slide').removeClass("zoom");
        }, 1000);
    });
    $('#hero-slider').on("translated.owl.carousel", function () {
        $('.owl-item.active .hero-slide').addClass("zoom");
    });
}
/*-------------------------
        TYPED JS
-------------------------*/
function typedJS() {
    "use strict";
    // TODO: Refactor
    var $element = $("#hero .typed");
    if ($element.length > 0) {
        if ($element.length) {
            var options = {
                strings: $element.attr('data-elements').split(','),
                typeSpeed: 70,
                backDelay: 1500,
                backSpeed: 30,
                loop: true
            };
            var typed = new Typed("#hero .typed", options);
        }
    }
    var $element = $("#portfolio .typed");
    if ($element.length > 0) {
        if ($element.length) {
            var options = {
                strings: $element.attr('data-elements').split(','),
                typeSpeed: 70,
                backDelay: 1500,
                backSpeed: 30,
                loop: true
            };
            var typed = new Typed("#portfolio .typed", options);
        }
    }
}
function startTyping() {
}
/*-------------------------
          Skills
-------------------------*/
function skills() {
    "use strict";
    $('.skillbar').each(function () {
        $(this).find('.skillbar-bar').animate({
            width: $(this).attr('data-percent')
        }, 6000);
    });
}
/*-------------------------
            Count up
  -------------------------*/
function countup() {
    "use strict";
    $('.timer').countTo();
    $('.count-number').removeClass('timer');
}
/*-------------------------
     MAGNIFIC POPUP JS
-------------------------*/
function portfolioPopup() {
    "use strict";
    if (('.portfolio-items').length > 0) {
        $('.portfolio-items').each(function () {
            $(this).magnificPopup({
                delegate: '.js-zoom-gallery',
                type: 'image',
                gallery: {
                    enabled: true
                },
                callbacks: {
                    open: function () {
                        $.fn.pagepiling.setKeyboardScrolling(false);
                    },
                    close: function () {
                        $.fn.pagepiling.setKeyboardScrolling(true);
                    }
                }
            });
        });
    }
}
/*-------------------------
        ISOTOPE JS
-------------------------*/
function portfolioIsotop() {
    "use strict";
    var $container = $('.portfolio-items');
    var $filter = $('#portfolio-filter');
    $container.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear'
        }
    });
    var categorize = "";
    var filterContent = '*';
    var techFilters = "";
    // Create object to store sub-filter for each group
    var buttonFilters = {};
    // categorize filter
    $filter.find('a').on("click", function () {
        categorize = $(this).attr('data-filter');
        // deactivate last filter button
        $filter.find('a').removeClass('active');
        // activate current filter button
        $(this).addClass('active');
        buttonFilters = {};
        filterContent = '*';
        resetSubfilters();
        techFilters = "";
        resetTechFilters();
        startFilterring($container, categorize + techFilters);
    });
    // Sub-filters
    // Look inside element with .sub-filters class for any clicks on elements with .btn
    $('.sub-filters').on('click', 'label', function () {
        var $this = $(this);
        // Get group key from parent btn-group (e.g. size, platform...)
        var $buttonGroup = $this.parents('.segmented-control');
        var filterGroup = $buttonGroup.attr('data-filter-group');
        // set filter for group
        buttonFilters[filterGroup] = $this.attr('data-filter');
        // Combine filters or set the value to * if buttonFilters
        filterContent = concatValues(buttonFilters) || '*';
        // filterContent += categorize;
        // Trigger isotope again to refresh layout
        startFilterring($container, filterContent + techFilters + categorize);
    });
    // Tech-filters
    $('#tech-filters').on('click', 'input', function () {
        var tech = $(this).attr("value");
        var isChecked = $(this).prop("checked");
        if (isChecked && !techFilters.includes(tech)) {
            techFilters += tech + "";
        }
        if (!isChecked && techFilters.includes(tech)) {
            techFilters = techFilters.replace(tech, "");
        }
        startFilterring($container, filterContent + techFilters + categorize);
    });
}
// check each first filter button and uncheck others
function resetSubfilters() {
    $('.segmented-control').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.find('input').each(function () {
            $(this).prop("checked", false);
        });
        var $firstButton = $buttonGroup.children(":first");
        $firstButton.prop("checked", true);
    });
    // DynamicTheme.currentStyle.updateRadioUI();
}
function resetTechFilters() {
    $('#tech-filters').find("input").each(function (i, checkbox) {
        $(checkbox).prop("checked", false);
    });
    // DynamicTheme.currentStyle.updateCheckboxUI();
}
function startFilterring(container, filterContent) {
    console.log(filterContent);
    container.isotope({
        filter: filterContent,
        animationOptions: {
            animationDuration: 750,
            easing: 'linear',
            queue: false,
            touchSensitivity: 2,
        }
    });
    return false;
}
// Flatten object by concatting values
function concatValues(obj) {
    var value = '';
    for (var prop in obj) {
        value += obj[prop];
    }
    return value;
}
/*-------------------------
    POST SIDEBAR TOGGLER
-------------------------*/
function postSidebar() {
    $('.post-sidebar-toggle').on('click', function () {
        $(this).toggleClass('open');
        $('.post-sidebar').toggleClass('open');
    });
}
/*-------------------------
     AJAX CONTACT FORM
-------------------------*/
function validateEmail(email) {
    "use strict";
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function sendEmail() {
    "use strict";
    var name = $('#name').val();
    var email = $('#email').val();
    var subject = $('#subject').val();
    var comments = $('#comments').val();
    if (!name) {
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Name is  required');
    }
    else if (!email) {
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Email is  required');
    }
    else if (!validateEmail(email)) {
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Email is not valid');
    }
    else if (!subject) {
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Subject is  required');
    }
    else if (!comments) {
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Comments is  required');
    }
    else {
        $.ajax({
            type: 'POST',
            data: $("#contactForm").serialize(),
            url: "sendEmail.php",
            beforeSend: function () {
                $('#submit-btn').html('<span class="spinner-border spinner-border-sm"></span> Loading..');
            },
            success: function (data) {
                $('#submit-btn').html('Submit');
                var myObj = JSON.parse(data);
                if (myObj['status'] == 'Congratulation') {
                    $('#message').toast('show').addClass('bg-success').removeClass('bg-danger bg-warning');
                    $('.toast-body').html('<strong>' + myObj['status'] + ' : </strong> ' + myObj['message']);
                }
                else if (myObj['status'] == 'Error') {
                    $('#message').toast('show').addClass('bg-danger').removeClass('bg-success bg-warning');
                    $('.toast-body').html('<strong>' + myObj['status'] + ' : </strong> ' + myObj['message']);
                }
                else if (myObj['status'] == 'Warning') {
                    $('#message').toast('show').addClass('bg-warning').removeClass('bg-success bg-danger');
                    $('.toast-body').html('<strong>' + myObj['status'] + ' : </strong> ' + myObj['message']);
                }
            },
            error: function (xhr) {
                $('#submit-btn').html('Submit');
                $('#message').toast('show').addClass('bg-danger').removeClass('bg-success bg-warning');
                $('.toast-body').html('<strong> Error : </strong> Something went wrong, Please try again.');
            },
        });
    }
}
