<?php
// due to main page which directly includes framework php file 
// and portfolio page which include this hero file which then includes  framework file, are in different dirs
// @ to hide error
if ((@include_once "dui/_index.php") === false) {
  include_once "../dui/_index.php";
}
?>

<div class="display-table hero-03">
  <div class="display-content">
    <div class="container ">
      <?php TitleBar("Home")->show(); ?>
      <div class="row align-items-center">
        <div class="col-lg-6 order-2 order-lg-1 pe-lg-5 pr-lg-5">
          <div class="hero-content">
            <h1 class="dark-color mb-4">I'M <span class="highlight-color"> HIEU NGO</span></h1>
            <h2 class="text-capitalize mb-0"><span class="highlight-color">A </span> <span class="typed" data-elements="Game Programmer,Java Developer"></span></h2>
            <p class="my-4">Welcome to my little corner of the Internet. Here is where I document my life, showcase works & share knowledge.</p>
            <?php Button(label: "My Works", href: "#portfolio", wrapperClass: "mt-2 mt-lg-4")->show(); ?>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2">
          <div class="hero-image">
            <div class="square"><img src="assets/img/dark-element_square.png" alt="/" width="260" height="260"> </div>
            <div class="circle background-colorfull1"></div>
            <div class="circle-2 background-colorfull2"></div>
            <div class="circle-3"></div>
            <div class="floating background-colorfull3"></div>
            <div class="personal-image rounded-circle">
              <img src="assets/img/avatar.jpeg" alt="/" class="rounded-circle img-fluid" width="398" height="433">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>