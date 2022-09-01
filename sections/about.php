<?php
include_once "../dui/_index.php";
?>

<div class="display-table">
  <div class="display-content">
    <div class="container">
      <?php TitleBar("About Me")->show(); ?>
      <div class="row">
        <div class="col-lg-6 equal-columns  justify-content-between">
          <div class="personal-item">
            <p class="mt-0 mt-lg-0 paragraph-title">Who am I?</p>
            <p class=" text-justify mb-0">
              The name is <span class="highlight-color">Hieu Ngo</span>, a.k.a. “<span class="highlight-color">enginooby</span>”, a Vietnamese and a final-year undergraduate <span class="highlight-color">Software Engineering student</span> in Poland.
            </p>
          </div>
          <!-- Image -->
          <div class="image-border mt-4">
            <img src="assets/img/about1.jpg" alt="/">
          </div>
          <!-- <p class="image-caption">I'd consider myself a noob to remind me there're always new things to learn from anyone.</p> -->
          <div class="personal-item">
            <p class="paragraph-title mt-4 mt-lg-4">Background - <span class="highlight-color">Java & web development</span></p>
            <p class=" text-justify mb-0">
              Once upon a time, I took the first step on my programming journey with <span class="highlight-color">Core Java</span>. Through some university classes, I then explored various Java technologies, most notably <span class="highlight-color">Spring frameworks</span>, for the development of enterprise & desktop software or back-end of web applications. Also slightly expanded my experiences in a few web technologies for front-end development to built some of personal-fun-things with <span class=highlight-color>LA/EMP</span> and <span class=highlight-color>MEAN</span> stacks.
              <br>
              If you ask me, Java and web development in general were all fun, then I figured out my bigger passion…
            </p>
          </div>
        </div>
        <div class="col-lg-6 mt-0 mt-lg-0 equal-columns justify-content-between">
          <div class="personal-item ml-lg-4 ms-lg-4">
            <p class="paragraph-title mt-4 mt-lg-0">Passion - <span class="highlight-color">Video game development</span></p>
            <p class=" text-justify mb-0">
              While normal software is all about services to serve our life, <span class="highlight-color">Computer Graphics</span> (CG) is the technology enabling us to create life virtually. That interests me, Particularly, video game development is a subset of CG, where we define our own rules for the world then allow players to get involved in, and that interests me even more!
              <br>
              First got started in this field by playing around with a few CG and game tools then decided to pick <span class="highlight-color">Unity</span> and <span class="highlight-color"> Unreal Engine</span> as my waifus -I mean "long-term companions" on this exciting journey.
              <br>
              Have been constantly horning my skills by registering for online courses, reading fundamental books, following bite-sized tutorials, solving coding problems, working on personal fun projects collaborative coding laboratories for classes which involve with CG or game.
              While mainly focusing on <span class="highlight-color">gameplay programming</span>, I enjoy every other aspect in the development process as well. Especially fall in love with <span class="highlight-color">procedural generation</span>, <span class="highlight-color"> simulation</span>, <span class="highlight-color">open world</span> & <span class="highlight-color">3D</span> game genres.
            </p>
            <p class="paragraph-title mt-4 mt-lg-4">What am I doing?</p>
            <p class=" text-justify mb-4">
              At the current time, I am exploring <span class="highlight-color">VR/AR</span> and <span class="highlight-color">AI/ML</span> fields – those technologies I believe could bring huge enhancements for the experiences in games and CG projects in general.
              <br>
              Also being <span class="highlight-color">open for work</span> in the game development to gain real-world and professional experience.
            </p>
            <div class="button-group-about ">
              <?php
              Button(label: "Download CV", wrapperClass: "mb-4 mb-lg-0 me-4 mr-4")->show();
              Button(label: "Hire Me", href: "#contact", wrapperClass: "me-4 mb-4 mb-lg-0")->show();
              ?>
            </div>
          </div>
        </div>
      </div>


      <!-- Characteristics & Hobbies -->
      <!-- <br>
                                <br>
                                <div class="row text-center">
                                        <div class="col-12 col-lg-3  ">
                                                <div class="resume-title text-center">
                                                        <p >Characteristics</p>
                                                        <div class="border-style"></div>
                                                </div>
                                                <div class="icon-image d-flex justify-content-around box-border">
                                                        <img src="assets/img/icons/guitar.svg" alt="">
                                                        <img src="assets/img/icons/guitar.svg" alt="">
                                                </div>
                                        </div>
                                        <div class="col-12 col-lg-8">
                                                <div class="resume-title text-center">
                                                        <p >Hobbies</p>
                                                        <div class="border-style"></div>
                                                </div>
                                                <div class="icon-image d-flex justify-content-around box-border">
                                                        <img src="assets/img/icons/guitar.svg" alt="">
                                                        <img src="assets/img/icons/fried.svg" alt="">
                                                        <img src="assets/img/icons/reading.svg" alt="">
                                                        <img src="assets/img/icons/game-pad.svg" alt="">
                                                </div>
                                        </div>
                                </div> -->
    </div>
  </div>
</div>