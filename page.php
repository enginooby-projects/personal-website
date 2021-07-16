<!-- <!DOCTYPE html> -->
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>enginoobz</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="enginoobz" />

        <!-- Preload assets -->
        <link rel="preload" href="assets/fonts/agency-fb-regular/AgencyFB-Reg.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="assets/fonts/agency-fb-bold/AgencyFB-Bold.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="assets/fonts/LineIcons.ttf?y2l643" as="font" subtype="TrueType" crossorigin>

        <link rel="shortcut icon" href="assets/img/favicon.ico">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.0/css/all.css">
        <link rel="stylesheet" href="assets/css/LineIcons.css">
        <link rel="stylesheet" href="assets/css/bootstrap.css">
        <link rel="stylesheet" href="assets/css/pagepiling.css">
        <link rel="stylesheet" href="assets/css/scss-outputs/style.css" title="style">

        <!-- Load asynchronously -->
        <link rel="preload" href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,900" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <link rel="preload" href="assets/css/owl.carousel.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <link rel="preload" href="assets/css/magnific-popup.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <!-- Fallback when JS is disabled -->
        <noscript>
                <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,900" rel="stylesheet">
                <link rel="stylesheet" href="assets/css/owl.carousel.min.css">
                <link rel="stylesheet" href="assets/css/magnific-popup.css">
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
        <?php
        include 'utility.php';
        include 'modals/classes.php';
        include 'modals/bookshelf.php';
        include 'modals/courses.php';
        include 'modals/portfolio/endless-flight.php';
        include 'modals/portfolio/guess-the-word-play.php';
        include 'modals/portfolio/the-maze-play.php';
        include 'modals/portfolio/breakout-play.php';
        include 'modals/portfolio/project-boost-play.php';
        include 'modals/portfolio/shader-playground-play.php';
        include 'modals/blog/sample.php';
        ?>

        <!-- <script src="assets/js/import/jquery-3.4.1.min.js"></script> -->
        <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script> -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script src="assets/js/import/bootstrap.js"></script>
        <script src="assets/js/import/pagePiling.js"></script>
        <script src="assets/js/import/jquery.easing.min.js"></script>
        <!-- <script src="assets/js/import/jquery.countTo.js"></script> -->
        <script src="assets/js/import/typed.js"></script>
        <script src="assets/js/import/jquery.magnific-popup.min.js"></script>
        <script src="assets/js/import/isotope.pkgd.min.js"></script>
        <script src="assets/js/import/owl.carousel.min.js"></script>
        <script src="assets/js/import/tinycolor.js"></script>
        <script src="built/main.js" type="module"></script>
</body>

</html>