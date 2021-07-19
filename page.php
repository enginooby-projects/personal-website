<!DOCTYPE html>
<html lang="en">

<head>
        <title>enginoobz</title>
        <meta charset="UTF-8">
        <meta name="author" content="enginoobz" />
        <meta name="description" content="Personal website of Hieu Ngo">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="keywords" content="personal website, portfolio, blog, game programming, java developer" />

        <!-- Preload assets -->
        <link rel="preload" href="assets/fonts/agency-fb-regular/AgencyFB-Reg.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="assets/fonts/agency-fb-bold/AgencyFB-Bold.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="assets/fonts/LineIcons.ttf?y2l643" as="font" subtype="TrueType" crossorigin>

        <link rel="shortcut icon" href="assets/img/favicon.ico">
        <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" /> -->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.0/css/all.css">
        <!-- TODO: create a custom shorten LineIcons.min.css with only used icons -->
        <link rel="stylesheet" href="assets/css/LineIcons.css">
        <!-- <link rel="stylesheet" href="assets/css/bootstrap.css"> -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="assets/css/pagepiling.css">
        <link rel="stylesheet" href="assets/css/scss-outputs/style.css" title="style">
        <!-- <link rel="stylesheet" href="assets/css/style.min.css" title="style"> -->

        <!-- Load asynchronously non-critical assets-->
        <link rel="preload" href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,900&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <!-- <link rel="preload" href="assets/css/owl.carousel.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'"> -->
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g==" crossorigin="anonymous" referrerpolicy="no-referrer" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <!-- <link rel="preload" href="assets/css/magnific-popup.css" as="style" onload="this.onload=null;this.rel='stylesheet'"> -->
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" integrity="sha512-+EoPw+Fiwh6eSeRK7zwIKG2MA8i3rV/DGa3tdttQGgWyatG/SkncT53KHQaS5Jh9MNOT3dmFL0FjTY08And/Cw==" crossorigin="anonymous" referrerpolicy="no-referrer" as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <script async src="built/DynamicTheme.js" type="module"></script>
        <!-- Fallback when JS is disabled -->
        <noscript>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,900">
                <!-- <link rel="stylesheet" href="assets/css/owl.carousel.min.css"> -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <!-- <link rel="stylesheet" href="assets/css/magnific-popup.css"> -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" integrity="sha512-+EoPw+Fiwh6eSeRK7zwIKG2MA8i3rV/DGa3tdttQGgWyatG/SkncT53KHQaS5Jh9MNOT3dmFL0FjTY08And/Cw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </noscript>
</head>

<body data-spy="scroll" data-target="#scrollspy" data-offset="1" class="neu-style">
        <!--  Pre Loader  -->
        <div id="overlayer"></div><span class="loader"></span>

        <div id="pagepiling" class="pilling-page">
                <?php include 'sections/social.php';  ?>
                <?php include 'sections/logo.php';  ?>
                <?php include 'sections/overlay-menu.php';  ?>
                <?php include 'sections/hero.php';  ?>
                <?php include 'sections/about.php';  ?>
                <?php include 'sections/resume.php';  ?>
                <?php include 'sections/skillset.php';  ?>
                <?php include 'sections/duties.php';  ?>
                <?php include 'sections/portfolio.php';  ?>
                <?php include 'sections/self-education.php';  ?>
                <?php include 'sections/blog.php';  ?>
                <?php include 'sections/contact.php';  ?>
                <?php include 'sections/setting.php';  ?>
        </div>

        <!-- TODO: Lazy initialization -->
        <!--Modals -->
        <!-- TODO: Remove this -->
        <?php include 'utility.php'; ?>
        <div class="portfolio-single modal fade" id="portfolio-single-endless-flight" tabindex="-1" role="dialog" aria-labelledby="portfolioModalScrollable" aria-hidden="true">
                <?php
                // include 'modals/portfolio/endless-flight.php';
                ?>
        </div>
        <div class="portfolio-single modal fade" id="classes" tabindex="-1" role="dialog" aria-labelledby="classModalScrollable" aria-hidden="true">
                <?php
                // include 'modals/classes.php';
                ?>
        </div>
        <div class="portfolio-single modal fade" id="bookshelf" tabindex="-1" role="dialog" aria-labelledby="bookshelfModalScrollable" aria-hidden="true">
                <?php
                // include 'modals/bookshelf.php';
                ?>
        </div>
        <div class="portfolio-single modal fade" id="courses" tabindex="-1" role="dialog" aria-labelledby="bookshelfModalScrollable" aria-hidden="true">
                <?php
                // include 'modals/courses.php';
                ?>
        </div>
        <div class="portfolio-single modal fade" id="guess-the-word-play" tabindex="-1" role="dialog" aria-labelledby="portfolioModalScrollable" aria-hidden="true">
                <?php
                // include 'modals/portfolio/guess-the-word-play.php';
                ?>
        </div>
        <div class="portfolio-single modal fade" id="the-maze-play" tabindex="-1" role="dialog" aria-labelledby="portfolioModalScrollable" aria-hidden="true">
                <?php
                // include 'modals/portfolio/the-maze-play.php';
                ?>
        </div>
        <div class="portfolio-single modal fade" id="breakout-play" tabindex="-1" role="dialog" aria-labelledby="portfolioModalScrollable" aria-hidden="true">
                <?php
                // include 'modals/portfolio/breakout-play.php';
                ?>
        </div>
        <div class="portfolio-single modal fade" id="project-boost-play" tabindex="-1" role="dialog" aria-labelledby="portfolioModalScrollable" aria-hidden="true">
                <?php
                // include 'modals/portfolio/project-boost-play.php';
                ?>
        </div>
        <div class="portfolio-single modal fade" id="shader-playground-play" tabindex="-1" role="dialog" aria-labelledby="portfolioModalScrollable" aria-hidden="true">
                <?php
                // include 'modals/portfolio/shader-playground-play.php';
                ?>
        </div>
        <div class="blog-single modal fade" id="blog-single" tabindex="-1" role="dialog" aria-labelledby="blogModalScrollable" aria-hidden="true">
                <?php
                // include 'modals/blog/blog-single.php';
                ?>
        </div>
        <!-- <script async data-main="main" src="assets/js/import/fallback.min.js" type="text/javascript"></script> -->
        <!-- <script src="assets/js/import/fallback.min.js" type="text/javascript"></script> -->
        <!--  Script block to execute Fallback JS -->
        <!-- <script>
                // Here we actually invoke Fallback JS to retrieve the following libraries for the page.
                fallback.load({
                        // Include your stylesheets, this can be an array of stylesheets or a string!
                        // page_css: 'index.css',
                        // global_css: ['public.css', 'members.css'],

                        // JavaScript library. THE KEY MUST BE THE LIBRARIES WINDOW VARIABLE!
                        JSON: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js',

                        // Here goes a failover example. The first will fail, therefore Fallback JS will load the second!
                        jQuery: {
                                urls: [
                                        // '//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.FAIL_ON_PURPOSE.min.js',
                                        '//code.jquery.com/jquery-3.6.0.min.js',
                                        'assets/js/import/jquery-3.4.1.min.js'
                                ],
                                integrity: 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=',
                                crossorigin: 'anonymous'
                        },
                }, {
                        shim: { // Shim X so that it will only load after jQuery has completed!
                                // 'X': ['jQuery']
                        },

                        callback: function(success, failed) { // All of my libraries have finished loading!
                                // success - object containing all libraries that loaded successfully.
                                // failed - object containing all libraries that failed to load.


                                // Execute my code that applies to all of my libraries here!
                        }
                });

                fallback.ready(['jQuery'], function() { // jQuery Finished Loading
                        // Execute my jQuery dependent code here!
                        document.write('<script src="assets/js/import/bootstrap.js"><\/script>');
                        document.write('<script src="assets/js/import/pagePiling.js"><\/script>');
                        document.write('<script src="assets/js/import/jquery.easing.min.js"><\/script>');
                        document.write('<script src="assets/js/import/jquery.magnific-popup.js"><\/script>');
                        document.write('<script src="assets/js/import/isotope.pkgd.min.js"><\/script>');
                        document.write('<script src="assets/js/import/owl.carousel.min.js.js"><\/script>');
                        document.write('<script src="assets/js/import/tinycolor.js"><\/script>');
                        document.write('<script src="built/main.js" type="module"><\/script>');
                });

                fallback.ready(['jQuery', 'JSON'], function() { // jQuery and JSON Finished Loading
                        // Execute my jQuery + JSON dependent code here!
                });

                fallback.ready(function() { // All of my libraries have finished loading!
                        // Execute my code that applies to all of my libraries here!
                });
        </script> -->

        <!-- <script src="assets/js/import/jquery-3.4.1.min.js"></script> -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <!-- <script src="assets/js/import/bootstrap.js"></script> -->
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <!-- <script src="assets/js/import/pagePiling.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pagePiling.js/1.5.6/jquery.pagepiling.min.js" integrity="sha512-FcXc9c211aHVJEHxoj2fNFeT8+wUESf/4mUDIR7c31ccLF3Y6m+n+Wsoq4dp2sCnEEDVmjhuXX6TfYNJO6AG6A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- <script src="assets/js/import/jquery.easing.min.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js" integrity="sha512-0QbL0ph8Tc8g5bLhfVzSqxe9GERORsKhIn1IrpxDAgUsbBGz/V7iSav2zzW325XGd1OMLdL4UiqRJj702IeqnQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- <script src="assets/js/import/typed.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.9/typed.min.js" integrity="sha512-w2j6lgmQvGImdSMD8K21HhsqwwculjrI9gKPpqyo/Q4nRHDxRJkDHuc4zJ/S/+AlepNYEbvXaKbomnqiR3gKsA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- <script src="assets/js/import/jquery.magnific-popup.min.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js" integrity="sha512-IsNh5E3eYy3tr/JiX2Yx4vsCujtkhwl7SLqgnwLNgf04Hrt9BT9SXlLlZlWx+OK4ndzAoALhsMNcCmkggjZB1w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- <script src="assets/js/import/isotope.pkgd.min.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.min.js" integrity="sha512-Zq2BOxyhvnRFXu0+WE6ojpZLOU2jdnqbrM1hmVdGzyeCa1DgM3X5Q4A/Is9xA1IkbUeDd7755dNNI/PzSf2Pew==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- <script src="assets/js/import/owl.carousel.min.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js" integrity="sha512-9CWGXFSJ+/X0LWzSRCZFsOPhSfm6jbnL+Mpqo0o8Ke2SYr8rCTqb4/wGm+9n13HtDE1NQpAEOrMecDZw4FXQGg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- <script src="assets/js/import/tinycolor.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.2/tinycolor.min.js" integrity="sha512-+aXA9mgbUvFe0ToTlbt8/3vT7+nOgUmFw29wfFCsGoh8AZMRSU0p4WtOvC1vkF2JBrndPN2TuNZsHPAKPPxe8Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="built/main.js" type="module"></script>
</body>

</html>