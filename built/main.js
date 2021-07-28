"use strict";
var $window = $(window);
let $body = $('body');
let $pagePiling = $('#pagepiling');
// key must be the same as section ID (from HTML), other same as in PagePiling
//get key string: Section[Section.about]  => about
// get value: Section.about => 0
// change indexEnumOffset if add/remove section
var Section;
(function (Section) {
    Section[Section["hero"] = 0] = "hero";
    Section[Section["about"] = 1] = "about";
    Section[Section["resume"] = 2] = "resume";
    Section[Section["skillset"] = 3] = "skillset";
    Section[Section["duties"] = 4] = "duties";
    Section[Section["portfolio"] = 5] = "portfolio";
    Section[Section["selfEducation"] = 6] = "selfEducation";
    Section[Section["blog"] = 7] = "blog";
    Section[Section["contact"] = 8] = "contact";
})(Section || (Section = {}));
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
    // setupObserver('img.lazy:not(#portfolio img.lazy):not(#selfEducation img.lazy)',onLazyImageIntersecting);
    $('.owl-item.active .hero-slide').addClass('zoom');
    return;
});
// after loading DOM, images & CSS...  (not affect DOMContentLoaded ....Load?)
$window.on("load", (function () {
    // loadPhpToBody("connect-database.php");
    $('#hero').css(' -webkit-transition', '1s all ease');
    $('#hero').css('transition', '1s all ease');
    loadAjaxFile("sections/overlay-menu.php", $body, setupOverlayMenuEvents);
    loadAjaxFile("sections/social.php", $body);
    loadAjaxFile("sections/logo.php", $body, setupOverlayMenuEvents);
    for (var section in Section) {
        if (isNaN(Number(section))) {
            if (section == Section[Section.hero])
                continue; // skip hero which is already loaded on page load
            tryLoadingSection(section);
        }
    }
}));
document.addEventListener('readystatechange', event => {
    //When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    if (event.target.readyState === "complete") {
        // console.log('readystatechange = complete ');
        $("#overlayer").delay(0).fadeOut(500);
        $(".loader").delay(0).fadeOut(500);
    }
});
$(".to-contact").on('click', function () {
    $("section.active").removeClass("active");
    var $id = $(this).attr('href');
    $('#main').children($id).addClass('active');
});
function setupOverlayMenuEvents() {
    $(".overlay-menu-toggler").on("click", function () {
        $(".overlay-menu").addClass("show");
    });
    $(".overlay-menu").on("click", function () {
        $(this).removeClass("show");
    });
}
// DYNAMIC LOADING SECTIONS
let loadedSections = [];
let loadingSections = []; // to prevent duplication loading
function tryLoadingSection(name, otherSection) {
    if (loadedSections.includes(name) || loadingSections.includes(name)) {
        if (otherSection)
            tryLoadingSection(otherSection);
        return;
    }
    startLoadingSection(name, otherSection);
}
function startLoadingSection(name, otherSection) {
    loadingSections.push(name);
    $(`#${name}`).load(`sections/${name}.php`, function (response, status, xhr) {
        if (status == 'success') {
            // loadingSections = loadingSections.filter(e => e !== name); //optional since it's already loaded
            // console.log(`${filePath} loaded`);
            loadedSections.push(name);
            onSectionLoaded(name);
            if (otherSection)
                tryLoadingSection(otherSection);
        }
    });
}
function onSectionLoaded(name) {
    if (name == Section[Section.portfolio])
        onPortfolioSectionLoaded();
    if (name == Section[Section.selfEducation])
        onSelfEducationSectionLoaded();
    $(`#${name}`).css(' -webkit-transition', '1s all ease');
    $(`#${name}`).css('transition', '1s all ease');
}
function onPortfolioSectionLoaded() {
    // loadLazyImagesInSection(Section[Section.portfolio]);
    if (visitedSections.includes(Section[Section.portfolio])) {
        setupObserver(`#${Section[Section.portfolio]} img.lazy`, onLazyImageIntersecting);
        setupObserver(`#${Section[Section.portfolio]} video.lazy`, onLazyVideoIntersecting);
    }
    portfolioIsotop();
    portfolioPopup();
    setupPortfolioTypeTS();
    // trigger filtering first time to fix overlapping items on mobile screen
    startFilterring($('.portfolio-items'), '*');
    injectedPortfolioItems = document.querySelectorAll(".injected-section");
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
    // loadLazyImagesInSection(Section[Section.selfEducation]);
    // this happens in case load page from this section, e.g. enginoobz.com/#selfEducation
    if (visitedSections.includes(Section[Section.selfEducation])) {
        setupObserver(`#${Section[Section.selfEducation]} img.lazy`, onLazyImageIntersecting);
        setupObserver('.skillbar', onProgressBarIntersecting);
    }
}
//setup lazy loading for the section instead if  there are many images
function loadLazyImagesInSection(sectionId) {
    document.querySelectorAll(`#${sectionId} img.lazy`).forEach((element, index) => {
        loadLazyImage(element);
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
function setupIframeInjectionEvents() {
    //TODO: using multi-dimension arrays or Object array
    $('[data-target="#breakout-play"]').one('click', event => {
        $('#breakout-play .row').append('<iframe src="https://i.simmer.io/@enginoobz/breakout" style="width: 893px;height: 670px;border:0"></iframe>');
    });
    $('[data-target="#guess-the-word-play"]').one('click', event => {
        $('#guess-the-word-play .row').append('<iframe src="https://i.simmer.io/@enginoobz/guess-the-word" style="width: 1072px;height: 670px;border:0"></iframe>');
    });
    $('[data-target="#project-boost-play"]').one('click', event => {
        $('#project-boost-play .row').append('<iframe src="https://i.simmer.io/@enginoobz/project-boost" style="width: 1072px;height: 670px;border:0"></iframe>');
    });
    $('[data-target="#shader-playground-play"]').one('click', event => {
        $('#shader-playground-play .row').append('<iframe src="https://i.simmer.io/@enginoobz/shader-playground" style="width: 880px;height: 538px;border:0"></iframe>');
    });
    $('[data-target="#the-maze-play"]').one('click', event => {
        $('#the-maze-play .row').append('<iframe src="https://i.simmer.io/@enginoobz/the-maze" style="width: 1072px;height: 517px;border:0"></iframe>');
    });
}
// OBSERVERS 
// this has be executed at DOMContentLoaded at the ealieast
function setupObserver(selectors, callback, once = true) {
    const elementObserver = new IntersectionObserver((entries, elementObserverInit) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                callback(element);
                if (once)
                    elementObserverInit.unobserve(element);
            }
        });
    });
    const elements = $(selectors); //as NodeListOf<Element>;//document.querySelectorAll(selectors) ;
    elements.each((index, element) => {
        // console.log(element.getAttribute('data-src'))
        elementObserver.observe(element);
    });
}
function onProgressBarIntersecting(ele) {
    startProgressBarAnimation(ele);
}
function onLazyImageIntersecting(ele) {
    loadLazyImage(ele);
}
function onLazyVideoIntersecting(ele) {
    loadLazyVideo(ele);
}
function startProgressBarAnimation(bar) {
    $(bar).find('.skillbar-bar').animate({
        width: $(bar).attr('data-percent')
    }, 2000);
}
function loadLazyImage(lazyImage) {
    lazyImage.src = lazyImage.dataset.src;
    // lazyImage.classList.remove("lazy");
    lazyImage.onload = function () {
        lazyImage.classList.add("loaded"); // class for effect on first appear
        setTimeout(function () {
            $(lazyImage).parent().siblings(".cssload-container").remove();
        }, 1000); // add delay to create fade out effect
    };
    return lazyImage;
}
function loadLazyVideo(lazyVideo) {
    for (var source in lazyVideo.children) {
        var videoSource = lazyVideo.children[source];
        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
            videoSource.src = videoSource.dataset.src;
        }
    }
    lazyVideo.load();
    lazyVideo.addEventListener('loadeddata', (e) => {
        //Video should now be loaded but we can double check
        if (lazyVideo.readyState >= 3) {
            lazyVideo.classList.add("loaded"); // class for effect on first appear
            setTimeout(function () {
                $(lazyVideo).parent().parent().siblings(".cssload-container").remove();
            }, 1000); // add delay to create fade out effect
        }
    });
    return lazyVideo;
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
function loadResumeModals() {
    // $('[data-target="#classes"]').one('mouseenter', event => {
    //                 loadPhpToBody('modals/classes.php');
    // });
    loadAjaxFile('modals/classes.php', $body);
}
function loadBlogModals() {
    const modals = ["blog-single"];
    modals.forEach(modal => loadAjaxFile(`modals/blog/${modal}.php`, $body));
}
function loadPortfolioModals() {
    // BUG: If mouseenter happens later (delay) than click ,
    // the modal close button will bind to incorrect event hence not work
    // $('#portfolio [data-toggle="modal"]').one('mouseenter', event => {
    //         const id: string = $(event.currentTarget).attr('data-target');
    //         $(id).load(`modals/portfolio/${id?.substring(1)}.php`)
    // });
    //TODO: loops all files in the server folder instead (/modals/portfolio) or create php file dynamically
    const modals = ["endless-flight", "breakout-play", "guess-the-word-play", "project-boost-play", "shader-playground-play", "the-maze-play"];
    modals.forEach(modal => loadAjaxFile(`modals/portfolio/${modal}.php`, $body));
    setupIframeInjectionEvents();
}
let funStyleUpdateIntervalId = -1;
const styleClasses = ["flat-style", "neu-style", "glass-style"];
let injectedPortfolioItems;
// TOFIX: Conflict styles when manually change style (from setting)
function setupInjectedPortfolioUpdateInterval() {
    if (funStyleUpdateIntervalId != -1)
        return;
    let count = 1;
    let lastStyle;
    funStyleUpdateIntervalId = window.setInterval(() => {
        injectedPortfolioItems.forEach((element) => {
            element.classList.remove(lastStyle);
        });
        const currentStyle = styleClasses[(count++) % styleClasses.length];
        // console.log(currentStyle);
        injectedPortfolioItems.forEach((element) => {
            element.classList.add(currentStyle);
        });
        lastStyle = currentStyle;
    }, 2000);
}
function clearPersonalWebsitePortfolioStyleUpdateInterval() {
    clearInterval(funStyleUpdateIntervalId);
    funStyleUpdateIntervalId = -1;
}
function loadSelfEducationModals() {
    loadAjaxFile('modals/courses.php', $body);
    loadAjaxFile('modals/bookshelf.php', $body);
}
//HELPER
function loadAjaxFile(filePath, container, callback) {
    $.get(filePath, function (data) {
        container.append(data);
    }).done(function () {
        if (callback)
            callback();
    });
}
/*-------------------------
       Page Pilling
-------------------------*/
let visitedSections = [];
const indexEnumOffset = -1; // e.g. Section.about=1 but index of about is 2  according to PagePiling
function triggerOnFirstTimeVisit(section, callback) {
    if (visitedSections.includes(Section[section]))
        return;
    // console.log(`On first time visit ${Section[section]}`);
    visitedSections.push(Section[section]);
    callback();
}
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
            const leavingSectionId = index + indexEnumOffset;
            const leavingSection = Section[leavingSectionId];
            switch (leavingSectionId) {
                case Section.portfolio:
                    clearPersonalWebsitePortfolioStyleUpdateInterval();
                    break;
            }
            const incommingSectionId = nextIndex + indexEnumOffset;
            const incommingSection = Section[incommingSectionId];
            switch (incommingSectionId) {
                case Section.resume:
                    triggerOnFirstTimeVisit(incommingSectionId, () => {
                        loadResumeModals();
                    });
                    if (loadedSections.includes(incommingSection)) {
                        animateCSS('#education-timeline .timeline-items', 'slideInLeft');
                        animateCSS('#experience-timeline .timeline-items', 'slideInRight');
                        animateCSS('#achievements-timeline .timeline-items', 'slideInUp').then(() => {
                        });
                        ;
                    }
                    break;
                case Section.portfolio:
                    triggerOnFirstTimeVisit(incommingSectionId, () => {
                        setupObserver(`#${incommingSection} img.lazy`, onLazyImageIntersecting);
                        setupObserver(`#${incommingSection} video.lazy`, onLazyVideoIntersecting);
                        loadPortfolioModals();
                        setupInjectedPortfolioUpdateInterval();
                    });
                    if (loadedSections.includes(incommingSection)) {
                        setupInjectedPortfolioUpdateInterval();
                    }
                    break;
                case Section.selfEducation:
                    triggerOnFirstTimeVisit(incommingSectionId, () => {
                        setupObserver(`#${incommingSection} img.lazy`, onLazyImageIntersecting);
                        setupObserver('.skillbar', onProgressBarIntersecting);
                        loadSelfEducationModals();
                    });
                    break;
                case Section.blog:
                    triggerOnFirstTimeVisit(incommingSectionId, () => {
                        loadBlogModals();
                    });
                    break;
            }
            $(` #${leavingSection}`).css('opacity', 0);
            $(` #${incommingSection}`).css('opacity', 1);
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
/* ANIMATION */
const animateCSS = (element, animation, prefix = 'animate__') => 
// We create a Promise and return it
new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);
    node.classList.add(`${prefix}animated`, animationName);
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
    }
    node.addEventListener('animationend', handleAnimationEnd, { once: true });
});
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
    var $container = $('.portfolio-items');
    var $filter = $('#radio-button-group');
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
