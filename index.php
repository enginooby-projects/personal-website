<!-- <!DOCTYPE html> -->
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>enginoobz</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="enginoobz" />

        <!--  FavIcon  -->
        <link rel="shortcut icon" href="assets/img/favicon.ico">

        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Muli:300,400,600" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,900" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,200;0,300;0,400;0,600;0,800;0,900;1,500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Baloo+Chettan+2:wght@400;500;700&display=swap" rel="stylesheet">

        <!-- TODO: download to use  FontAwesome 5 locally -->
        <!-- FontAwesome Css -->
        <!-- <link rel="stylesheet" href="assets/css/fontawesome.min.css"> -->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.0/css/all.css">
        <!-- Line icon Css -->
        <link rel="stylesheet" href="assets/css/LineIcons.css">
        <!-- Bootstrap Css -->
        <link rel="stylesheet" href="assets/css/bootstrap.css">
        <!-- Page Pilling Css -->
        <link rel="stylesheet" href="assets/css/pagepiling.css">
        <!-- Owl Carousel Css -->
        <link rel="stylesheet" href="assets/css/owl.carousel.min.css">
        <!-- Magnific Popup Css -->
        <link rel="stylesheet" href="assets/css/magnific-popup.css">
        <!-- Colors Css -->
        <link rel="stylesheet" href="assets/css/color/blue-color.css" id="option-color">
        <!--  Custom Style CSS  -->
        <link rel="stylesheet" href="assets/css/scss-outputs/style.css" title="style">
        <!--  Colorfull Style CSS  -->
        <link rel="stylesheet" href="assets/css/bases/scss-outputs/colorfull-main.css">
</head>

<body data-spy="scroll" data-target="#scrollspy" data-offset="1" class="flat-demo">
        <!--  Pre Loader  -->
        <div id="overlayer"></div><span class="loader"></span>

        <!-- TODO: Lazy initialization -->
        <!--Modals -->
        <?php
        include 'utility.php';
        include 'modals/classes.php';
        include 'modals/bookshelf.php';
        include 'modals/courses.php';
        include 'modals/portfolio/endless-flight.php';
        include 'modals/portfolio/guess-the-word-play.php';
        include 'modals/blog/sample.php';
        ?>

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

        <script src="assets/js/import/jquery-3.4.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
        <script src="assets/js/import/bootstrap.js"></script>
        <script src="assets/js/import/pagePiling.js"></script>
        <script src="assets/js/import/jquery.easing.min.js"></script>
        <script src="assets/js/import/jquery.countTo.js"></script>
        <script src="assets/js/import/typed.js"></script>
        <script src="assets/js/import/jquery.magnific-popup.min.js"></script>
        <script src="assets/js/import/isotope.pkgd.min.js"></script>
        <script src="assets/js/import/owl.carousel.min.js"></script>
        <script src="assets/js/import/tinycolor.js"></script>
        <script src="built/main.js" type="module"></script>
</body>

</html>