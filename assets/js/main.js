// repeated variables
var $window = $(window);
var $root = $('html, body');

$(document).ready(function () {

        "use strict";

        clientCarousel();
        pagePilling();
        themeOption();
        changeNeoSkin();
        ColorPallet();
        bgBackground();
        colorFull();
        borderColor();
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
})

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
                                $(".special-section").css('color', '#fff');
                        } else {
                                $(".special-section").css('color', '#3c3c3c');
                        }

                        if (nextIndex == 1 && $('.section.hero').hasClass("speacial-hero")) {
                                $("#pp-nav li span").css('backgroundColor', '#fff');
                        } else {
                                $("#pp-nav li span").css('backgroundColor', '#3c3c3c');
                        }

                        if (nextIndex == 1 && $('.section.hero').hasClass("speacial-hero")) {
                                $("#pp-nav li .pp-tooltip").css('color', '#fff');
                        } else {
                                $("#pp-nav li .pp-tooltip").css('color', '#3c3c3c');
                        }

                },
                afterLoad: function (anchorLink, index) { },
                afterRender: function (index) {
                        if (index > 1) {
                                $(".special-section").css('color', '#3c3c3c');
                        } else {
                                $(".special-section").css('color', '#fff');
                        }

                        if (index > 1 && $('.section.hero').hasClass("speacial-hero")) {
                                $("#pp-nav li span").css('backgroundColor', '#3c3c3c');
                        }
                        else if ($('.section.hero').hasClass("speacial-hero")) {
                                $("#pp-nav li span").css('backgroundColor', '#fff');
                        }

                        if (index > 1 && $('.section.hero').hasClass("speacial-hero")) {
                                $("#pp-nav li .pp-tooltip").css('color', '#3c3c3c');
                        }
                        else if ($('.section.hero').hasClass("speacial-hero")) {
                                $("#pp-nav li .pp-tooltip").css('color', '#fff');
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
        $('.theme-skin li .flat-skin').click(changeFlatSkin);
        $('.theme-skin li .neo-skin').click(changeNeoSkin);
}

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

function changeFlatSkin() {
        $("body").addClass('flat-demo');
        $('.theme-skin li a').removeClass('active');
        $(this).addClass('active');
}

function changeNeoSkin() {
        $("body").removeClass('flat-demo');
        $('.theme-skin li a').removeClass('active');
        $(this).addClass('active');
}

// -------------------------------------------------------------
//   Color Panel
// -------------------------------------------------------------
function ColorPallet() {

        "use strict";
        // TODO: Refactor color variable
        $("ul.pattern .color1").click(function () {
                return $("#option-color").attr("href", "assets/css/color/green-color.css")
        });
        $("ul.pattern .color2").click(function () {
                return $("#option-color").attr("href", "assets/css/color/yellow-color.css")
        });
        $("ul.pattern .color3").click(function () {
                return $("#option-color").attr("href", "assets/css/color/golden-color.css")
        });
        $("ul.pattern .color4").click(function () {
                return $("#option-color").attr("href", "assets/css/color/sky-blue-color.css")
        });
        $("ul.pattern .color5").click(function () {
                return $("#option-color").attr("href", "assets/css/color/blue-color.css")
        });
        $("ul.pattern .color6").click(function () {
                return $("#option-color").attr("href", "assets/css/color/purple-color.css")
        });
        $("ul.pattern .color7").click(function () {
                return $("#option-color").attr("href", "assets/css/color/orange-color.css")
        });
        $("ul.pattern .color8").click(function () {
                return $("#option-color").attr("href", "assets/css/color/pink-color.css")
        });
        $("ul.pattern .color9").click(function () {
                return $("#option-color").attr("href", "assets/css/color/red-color.css")
        });
        $("#color-switcher .pallet-button").click(function () {
                $("#color-switcher .color-pallet").toggleClass('show')
        })
}
/*-------------------------
        ColorFull Demo
-------------------------*/
function bgBackground() {

        "use strict";

        var list = document.getElementsByClassName('data-background');

        for (var i = 0; i < list.length; i++) {
                var color = list[i].getAttribute('data-color');
                list[i].style.backgroundColor = "" + color + "";
        }
}

function colorFull() {
        var allDivs = document.getElementsByClassName('data-text-color');

        for (var i = 0; i < allDivs.length; ++i) {
                var color = allDivs[i].getAttribute('data-color');
                allDivs[i].style.color = "" + color + "";
        }
}

function borderColor() {
        var allDivs = document.getElementsByClassName('timeline-border');

        for (var i = 0; i < allDivs.length; ++i) {
                var color = allDivs[i].getAttribute('data-color');
                allDivs[i].style.borderLeftColor = "" + color + "";
        }
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
                }, 1000)
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

        var $element = $(".element");
        if ($element.length > 0) {
                if ($element.length) {
                        var options = {
                                strings: $element.attr('data-elements').split(','),
                                typeSpeed: 70,
                                backDelay: 1500,
                                backSpeed: 30,
                                loop: true
                        };
                        var typed = new Typed(".element", options);
                }
        }
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

        var categorize = " ";
        var filterContent = '*';
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
                resetSubfilters();
                startFilterring($container, categorize);
        });

        // Sub-filters
        $('.sub-filters').on('click', 'label', function () {
                var $this = $(this);
                // Get group key from parent btn-group (e.g. size, platform...)
                var $buttonGroup = $this.parents('.segmented-control');
                var filterGroup = $buttonGroup.attr('data-filter-group');
                // set filter for group
                buttonFilters[filterGroup] = $this.attr('data-filter');
                // Combine filters or set the value to * if buttonFilters
                filterContent = concatValues(buttonFilters) || '*';
                filterContent += categorize;
                // Trigger isotope again to refresh layout
                startFilterring($container, filterContent);
        });

        // Look inside element with .sub-filters class for any clicks on elements with .btn
        $('.sub-filters').on('click', '.btn', function () {
                var $this = $(this);
                // Get group key from parent btn-group (e.g. size, platform...)
                var $buttonGroup = $this.parents('.btn-group');
                var filterGroup = $buttonGroup.attr('data-filter-group');
                // set filter for group
                buttonFilters[filterGroup] = $this.attr('data-filter');
                // Combine filters or set the value to * if buttonFilters
                filterContent = concatValues(buttonFilters) || '*';
                filterContent += categorize;
                // Trigger isotope again to refresh layout
                startFilterring($container, filterContent);
        });

        // change checked class on btn-filter to toggle which one is active
        $('.btn-group').each(function (i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on('click', '.btn-filter', function () {
                        $buttonGroup.find('.checked').removeClass('checked');
                        $(this).addClass('checked');
                });
        });
}

// check each first filter button and uncheck others
function resetSubfilters() {
        $('.segmented-control').each(function (i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.find('input').each(function () {
                        console.log($(this).attr("name"));
                        // $(this).checked = false;
                        $(this).prop("checked", false);
                })
                var $firstButton = $buttonGroup.children(":first");
                // $firstButton.checked = true;
                $firstButton.prop("checked", true);
        });

        $('.btn-group').each(function (i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.children().each(function () {
                        removeClassIfExist($(this), "checked");
                })
                var $firstButton = $buttonGroup.children(":first");
                addClassIfNotExist($firstButton, 'checked');
        });
}

// HELPERS
function addClassIfNotExist(selector, className) {
        if (!selector.hasClass(className)) selector.addClass(className);
}

function removeClassIfExist(selector, className) {
        if (selector.hasClass(className)) selector.removeClass(className);
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
        })
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
        } else if (!email) {
                $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
                $('.toast-body').html('Email is  required');
        } else if (!validateEmail(email)) {
                $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
                $('.toast-body').html('Email is not valid');
        } else if (!subject) {
                $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
                $('.toast-body').html('Subject is  required');
        } else if (!comments) {
                $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
                $('.toast-body').html('Comments is  required');
        } else {
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
                                } else if (myObj['status'] == 'Error') {
                                        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success bg-warning');
                                        $('.toast-body').html('<strong>' + myObj['status'] + ' : </strong> ' + myObj['message']);
                                } else if (myObj['status'] == 'Warning') {
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





