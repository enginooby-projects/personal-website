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
        <!-- CONSIDER: let FontAwesome.css load fonts instead to make use of HTTP/3 -->
        <link rel="preload" href="https://use.fontawesome.com/releases/v5.15.0/webfonts/fa-brands-400.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="https://use.fontawesome.com/releases/v5.15.0/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin>

        <!-- FAVICON -->
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
        <!-- <link rel="manifest" href="/favicon/site.webmanifest"> -->
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
        <!-- <link rel="shortcut icon" href="/favicon/favicon.ico"> -->
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="msapplication-config" content="/favicon/browserconfig.xml">
        <meta name="theme-color" content="#ffffff">

        <!-- EXPERIMENTING -->
        <!-- <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
        <link href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" rel="stylesheet" /> -->

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.0/css/all.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" integrity="sha512-+EoPw+Fiwh6eSeRK7zwIKG2MA8i3rV/DGa3tdttQGgWyatG/SkncT53KHQaS5Jh9MNOT3dmFL0FjTY08And/Cw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,900">
        <!-- TOFIX: Sometimes code are not highlighted -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css" integrity="sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="assets/css/pagepiling.css">
        <link rel="stylesheet" href="assets/css/style.css" title="style" type="text/css">
        <link rel="stylesheet" href="dynamic-ui-framework/css/dynamic-style.css" type="text/css">

        <!-- Load asynchronously non-critical assets (comment these out since using Critical npm makes them inactivated???)-->
        <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,900&display=swap" media="print" onload="this.media='all'"> -->
        <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g==" crossorigin="anonymous" referrerpolicy="no-referrer" media="print" onload="this.media='all'"> -->
        <!-- <link rel="stylesheet" href=" https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" integrity="sha512-+EoPw+Fiwh6eSeRK7zwIKG2MA8i3rV/DGa3tdttQGgWyatG/SkncT53KHQaS5Jh9MNOT3dmFL0FjTY08And/Cw==" crossorigin="anonymous" referrerpolicy="no-referrer" media="print" onload="this.media='all'"> -->
</head>

<body data-spy="scroll" data-target="#scrollspy" data-offset="1" class="neu-style">
        <div id="overlayer"></div><span class="loader"></span>
        <div id="pagepiling" class="pilling-page">
                <?php include 'sections/hero.php'; ?>

                <!-- DYNAMIC LOADING SECTIONS -->
                <section id="about" class="section pp-scrollable about" data-navigation-tooltip="ABOUT ME"> </section>
                <section id="resume" class="section resume pp-scrollable" data-navigation-tooltip="RESUME"> </section>
                <section id="skillset" class="section skillset  pp-scrollable" data-navigation-tooltip="SKILLSET"> </section>
                <section id="duties" class="section pp-scrollable duties" data-navigation-tooltip="SERVICES"> </section>
                <section id="portfolio" class="section portfolio  pp-scrollable" data-navigation-tooltip="PORTFOLIO"> </section>
                <section id="selfEducation" class="section selfEducation pp-scrollable" data-navigation-tooltip="SELF-EDU"> </section>
                <section id="blog" class="section pp-scrollable blog" data-navigation-tooltip="BLOG"> </section>
                <section id="contact" class="section pp-scrollable contact" data-navigation-tooltip="CONTACT"></section>
        </div>

        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pagePiling.js/1.5.6/jquery.pagepiling.min.js" integrity="sha512-FcXc9c211aHVJEHxoj2fNFeT8+wUESf/4mUDIR7c31ccLF3Y6m+n+Wsoq4dp2sCnEEDVmjhuXX6TfYNJO6AG6A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js" integrity="sha512-0QbL0ph8Tc8g5bLhfVzSqxe9GERORsKhIn1IrpxDAgUsbBGz/V7iSav2zzW325XGd1OMLdL4UiqRJj702IeqnQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.9/typed.min.js" integrity="sha512-w2j6lgmQvGImdSMD8K21HhsqwwculjrI9gKPpqyo/Q4nRHDxRJkDHuc4zJ/S/+AlepNYEbvXaKbomnqiR3gKsA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="built/main.js" type="module"></script>

        <script async src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js" integrity="sha512-IsNh5E3eYy3tr/JiX2Yx4vsCujtkhwl7SLqgnwLNgf04Hrt9BT9SXlLlZlWx+OK4ndzAoALhsMNcCmkggjZB1w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.min.js" integrity="sha512-Zq2BOxyhvnRFXu0+WE6ojpZLOU2jdnqbrM1hmVdGzyeCa1DgM3X5Q4A/Is9xA1IkbUeDd7755dNNI/PzSf2Pew==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.2/tinycolor.min.js" integrity="sha512-+aXA9mgbUvFe0ToTlbt8/3vT7+nOgUmFw29wfFCsGoh8AZMRSU0p4WtOvC1vkF2JBrndPN2TuNZsHPAKPPxe8Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script async src="https://cdn.lordicon.com/libs/frhvbuzj/lord-icon-2.0.2.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-core.min.js" integrity="sha512-hM0R3pW9UdoNG9T+oIW5pG9ndvy3OKChFfVTKzjyxNW9xrt6vAbD3OeFWdSLQ8mjKSgd9dSO3RXn3tojQtiA8Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autoloader/prism-autoloader.min.js" integrity="sha512-xCfKr8zIONbip3Q1XG/u5x40hoJ0/DtP1bxyMEi0GWzUFoUffE+Dfw1Br8j55RRt9qG7bGKsh+4tSb1CvFHPSA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script async src="dynamic-ui-framework/js/DynamicTheme.js" type="module"></script>

        <!-- EXPERIMENTING -->
        <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" integrity="sha512-z4OUqw38qNLpn1libAN9BsoDx6nbNFio5lA6CuTp9NlK83b89hgyCVq+N5FdBJptINztxn1Z3SaKSKUS5UP60Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->

        <!-- Fallback for CSS async loading when JS is disabled, generated by Critical npm-->
</body>

</html>