var $window = $(window);
let $body: JQuery<HTMLElement> = $('body');
// var $root = $('html, body');

// after loading DOM (not affect DOMContentLoaded, affect Load)
$(document).ready(function () {
        // jQuery(function () {
        // document.addEventListener("DOMContentLoaded", function () { // slowest
        "use strict";
        // console.log('document: onReady');
        // clientCarousel();
        // sliderOwlCarousel(); 
        typedJS();
        fixJqueryPassiveListeners();
        pagePilling();
        postSidebar();
        validateEmail();
        sendEmail();
        $('.owl-item.active .hero-slide').addClass('zoom');
        return;
});

// setupLazyLoading();

const sections: string[] = ["about", "resume", "skillset", "duties", "portfolio", "self-education", "blog", "contact"];

// after loading DOM, images & CSS...  (not affect DOMContentLoaded ....Load?)
$window.on("load", (function () {
        // console.log('window: onLoad');
        // setTimeout(function () {
        // }, 1000);
        // loadPhpToBody("connect-database.php");
        loadPhpToBody("sections/overlay-menu.php", menuToggler);
        sections.forEach(section => tryLoadingSection(section));
}));

document.addEventListener('readystatechange', event => {
        //When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
        if (event.target?.readyState === "complete") {
                // console.log('readystatechange = complete ');
                $("#overlayer").delay(0).fadeOut(500);
                $(".loader").delay(0).fadeOut(500);
                portfolioIsotop();
        }
});

$(".to-contact").on('click', function () {
        $("section.active").removeClass("active");
        var $id = $(this).attr('href');
        $('#main').children($id).addClass('active');
})

// DYNAMIC LOADING SECTIONS
let loadedSections: string[] = [];
let loadingSections: string[] = []; // to prevent duplication loading
function tryLoadingSection(name: string, otherSection?: string) {
        if (loadedSections.includes(name) || loadingSections.includes(name)) {
                if (otherSection) tryLoadingSection(otherSection);
                return;
        }
        startLoadingSection(name, otherSection);
}

function startLoadingSection(name: string, otherSection?: string) {
        loadingSections.push(name);
        $(`#${name}`).load(`sections/${name}.php`, function (response, status, xhr) {
                if (status == 'success') {
                        // loadingSections = loadingSections.filter(e => e !== name); //optional since it's already loaded
                        // console.log(`${filePath} loaded`);
                        loadedSections.push(name);
                        onSectionLoaded(name);
                        if (otherSection) tryLoadingSection(otherSection);
                }
        });
}

function onSectionLoaded(name: string) {
        switch (name) {
                case "portfolio":
                        onPortfolioSectionLoaded();
                        break;
                case "self-education":
                        onSelfEducationSectionLoaded();
                        break;
                default:
                        break;
        }
}

function onPortfolioSectionLoaded() {
        loadLazyImagesInSection('#portfolio');
        portfolioIsotop();
        setupPortfolioTypeTS();
        // trigger filtering first time to fix overlapping items on mobile screen
        startFilterring($('.portfolio-items'), '*');
}

function setupPortfolioTypeTS() {
        var $element = $("#portfolio .typed");
        if ($element.length > 0) {
                if ($element.length) {
                        var options = {
                                strings: $element.attr('data-elements').split(','),
                                typeSpeed: 30,
                                backDelay: 1000,
                                backSpeed: 20,
                                loop: true
                        };
                        var typed = new Typed("#portfolio .typed", options);
                }
        }
}

function onSelfEducationSectionLoaded() {
        loadLazyImagesInSection('#self-education');
        startProgressBarAnimation();
}


//  CONSIDER: setup lazy loading for the section instead if many images
function loadLazyImagesInSection(sectionId: string) {
        document.querySelectorAll(`${sectionId} img.lazy`).forEach((element, index) => {
                loadLazyImage(element);
        });
}

function startProgressBarAnimation() {
        // "use strict";
        $('.skillbar').each(function () {
                $(this).find('.skillbar-bar').animate({
                        width: $(this).attr('data-percent')
                }, 4000);
        });
}

function addLabelLinkPagePiling() {
        $('#pp-nav a').each(function () {
                $(this).attr('aria-label', 'PagePiling span');
        });
}


/*-----------------------------------------------------------------------------
                                   FUNCTIONS
-----------------------------------------------------------------------------*/
function setupIframeInjectionEvents() { // invoke if not include iframe in modals
        //TODO: using multi-dimension arrays or Object array
        $('[data-target="#breakout-play"]').one('click', event => {
                $('#breakout-play .row').append('<iframe src="https://i.simmer.io/@enginoobz/breakout" style="width: 893px;height: 670px;border:0"></iframe>')
        });
        $('[data-target="#guess-the-word-play"]').one('click', event => {
                $('#guess-the-word-play .row').append('<iframe src="https://i.simmer.io/@enginoobz/guess-the-word" style="width: 1072px;height: 670px;border:0"></iframe>')
        });
        $('[data-target="#project-boost-play"]').one('click', event => {
                $('#project-boost-play .row').append('<iframe src="https://i.simmer.io/@enginoobz/project-boost" style="width: 1072px;height: 670px;border:0"></iframe>')
        });
        $('[data-target="#shader-playground-play"]').one('click', event => {
                $('#shader-playground-play .row').append('<iframe src="https://i.simmer.io/@enginoobz/shader-playground" style="width: 880px;height: 538px;border:0"></iframe>')
        });
        $('[data-target="#the-maze-play"]').one('click', event => {
                $('#the-maze-play .row').append('<iframe src="https://i.simmer.io/@enginoobz/the-maze" style="width: 1072px;height: 517px;border:0"></iframe>')
        });
}

function setupLazyLoading() {
        document.addEventListener("DOMContentLoaded", function () {
                const imageObserver = new IntersectionObserver((entries, imgObserver) => {
                        entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                        const lazyImage = entry.target
                                        loadLazyImage(lazyImage);
                                        imgObserver.unobserve(lazyImage);
                                }
                        })
                });
                const arr = document.querySelectorAll('img.lazy:not(#portfolio img.lazy):not(#self-education img.lazy)')
                arr.forEach((v) => {
                        imageObserver.observe(v);
                })
        })
}

function loadLazyImage(lazyImage: Element) {
        lazyImage.src = lazyImage.dataset.src
        lazyImage.classList.remove("lazy");
        return lazyImage;
}

function fixJqueryPassiveListeners() {
        jQuery.event.special.touchstart = {
                setup: function (_, ns, handle) {
                        this.addEventListener("touchstart", handle, {
                                passive: !ns.includes("noPreventDefault")
                        });
                }
        };
        jQuery.event.special.touchmove = {
                setup: function (_, ns, handle) {
                        this.addEventListener("touchmove", handle, {
                                passive: !ns.includes("noPreventDefault")
                        });
                }
        };
        jQuery.event.special.wheel = {
                setup: function (_, ns, handle) {
                        this.addEventListener("wheel", handle, {
                                passive: true
                        });
                }
        };
        jQuery.event.special.mousewheel = {
                setup: function (_, ns, handle) {
                        this.addEventListener("mousewheel", handle, {
                                passive: true
                        });
                }
        };
}
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


// DYNAMIC MODALS LOADING
let loadedModalSections: string[] = [];
function loadResumeModals() {
        if (loadedModalSections.includes('resume')) return;
        // $('[data-target="#classes"]').one('mouseenter', event => {
        //                 loadPhpToBody('modals/classes.php');
        // });
        loadPhpToBody('modals/classes.php');
        loadedModalSections.push('resume');
}

function loadBlogModals() {
        if (loadedModalSections.includes('blog')) return;
        const modals: string[] = ["blog-single"];
        modals.forEach(modal => loadPhpToBody(`modals/blog/${modal}.php`));
        loadedModalSections.push('blog');
}

function loadPortfolioModals() {
        if (loadedModalSections.includes('portfolio')) return;
        // BUG: If mouseenter happens later (delay) than click ,
        // the modal close button will bind to incorrect event hence not work
        // $('#portfolio [data-toggle="modal"]').one('mouseenter', event => {
        //         const id: string = $(event.currentTarget).attr('data-target');
        //         $(id).load(`modals/portfolio/${id?.substring(1)}.php`)
        // });
        //TODO: loops all files in the server folder instead (/modals/portfolio) or create php file dynamically
        const modals: string[] = ["endless-flight", "breakout-play", "guess-the-word-play", "project-boost-play", "shader-playground-play", "the-maze-play"];
        modals.forEach(modal => loadPhpToBody(`modals/portfolio/${modal}.php`));
        setupIframeInjectionEvents();
        loadedModalSections.push('portfolio');
}

function loadSelfEducationModals() {
        if (loadedModalSections.includes('self-education')) return;
        loadPhpToBody('modals/courses.php');
        loadPhpToBody('modals/bookshelf.php');
        loadedModalSections.push('self-education');
}

//HELPER
function loadPhpToBody(filePath: string, callback?: () => void) {
        $.get(filePath, function (data) {
                $body.append(data);
        }).done(function () {
                if (callback) callback();
        });
}
/*-------------------------
       Page Pilling
-------------------------*/
function pagePilling() {

        // "use strict";

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
                        // console.log(`onLeave: index-${index}; nextIndex-${nextIndex}; direction-${direction}`);
                        switch (nextIndex) {
                                case 2:
                                        // tryLoadingSection("about", "resume");
                                        break;
                                case 3:
                                        // tryLoadingSection("resume", "skillset");
                                        loadResumeModals();
                                        break;
                                case 4:
                                        // tryLoadingSection("skillset", "duties");
                                        break;
                                case 5:
                                        // tryLoadingSection("duties", "portfolio");
                                        break;
                                case 6:
                                        // tryLoadingSection("portfolio", "self-education");
                                        loadPortfolioModals();
                                        portfolioPopup();
                                        break;
                                case 7:
                                        // tryLoadingSection("self-education", "blog");
                                        loadSelfEducationModals();
                                        break;
                                case 8:
                                        // tryLoadingSection("blog", "contact");
                                        loadBlogModals();
                                        break;
                                case 9:
                                        // tryLoadingSection("contact");
                                        break;
                        }
                },
                afterLoad: function (anchorLink, index) {
                        // console.log(`afterLoad: index-${index}; anchorLink-${anchorLink}`);
                },
                afterRender: function () {
                        // console.log(`PagePiling: afterRender`);
                        addLabelLinkPagePiling();
                },
        });
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

        // TODO: Refactor
        var $element = $("#hero .typed");
        if ($element.length > 0) {
                if ($element.length) {
                        var options = {
                                strings: $element.attr('data-elements').split(','),
                                typeSpeed: 30,
                                backDelay: 1000,
                                backSpeed: 20,
                                loop: true
                        };
                        var typed = new Typed("#hero .typed", options);
                }
        }
}



/*-------------------------
            Count up
  -------------------------*/
function countup() {

        "use strict";

        // $('.timer').countTo();
        // $('.count-number').removeClass('timer');
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
        var $container: JQuery<HTMLElement> = $('.portfolio-items');
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
                })
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

function startFilterring(container: JQuery<HTMLElement>, filterContent: string) {
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





