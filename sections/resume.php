<?php
include_once "../dui/_index.php";
?>

<div class="display-table">
  <div class="display-content">
    <div class="container">
      <?php TitleBar("My Resume")->show(); ?>
      <!--    TimeLine Start   -->
      <div class="row">
        <div class="col-lg-6 equal-columns animated " id="education-timeline">
          <div class="resume-title text-center">
            <h3>Education</h3>
            <div class="border-style"></div>
          </div>
          <div class="timeline-items box-border">
            <!--    Item 01   -->
            <div class="timeline-item timeline-border">
              <div class="timeline-icon background-colorfull1"></div>
              <div class="timeline-contents">
                <div class="time-line-header text-center">
                  <h4 class="timeline-title">Bachelor in Software Engineering</h4>
                  <p class="timeline-place">Wyższa Szkoła Handlowa we Wrocławiu | GPA: 4.5/5.0</p>
                  <p class="timeline-year">03/2019 - 06/2022</p>
                </div>
                <div class="timeline-content  ">
                  <p>Specialize in <span class="highlight-color">Internet & Multimedia Technologies</span> - one of factors inspiring me to pursue game development.</p>
                  <!-- <div class="button-border mt-2 mb-2">
                    <a href="javascript:void();" class="button" type="button" data-bs-toggle="modal" data-bs-target="#classes" data-toggle="modal" data-target="#classes">Main classes</a>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mt-5 mt-lg-0 equal-columns" id="experience-timeline">
          <div class="resume-title text-center">
            <h3>Experience</h3>
            <div class="border-style"></div>
          </div>
          <div class="timeline-items box-border">
            <!--    Item 01   -->
            <div class="timeline-item timeline-border">
              <div class="timeline-icon data-background background-colorfull2"></div>
              <div class="timeline-contents">
                <div class="time-line-header text-center">
                  <h4 class="timeline-title">Java Developer Intern</h4>
                  <p class="timeline-place">Planthive</p>
                  <p class="timeline-year">08/2020 - 10/2020</p>
                </div>
                <div class="timeline-content">
                  <p>Upgrade application <span class="highlight-color">back-end</span> using Java <span class="highlight-color">Spring</span> framework and <span class="highlight-color">Firebase</span> services.</p>
                  <!-- <div class="button-border mt-2 mb-2">
                    <a href="javascript:void();" class="button" type="button">My tasks</a>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--    TimeLine End   -->

      <!--    Achievements   -->
      <div class="row">
        <div class="col-lg-12 mt-5" id="achievements-timeline">
          <div class="resume-title text-center">
            <h3>Achievements</h3>
            <div class="border-style"></div>
          </div>
          <div class="timeline-items box-border">
            <div class="timeline-item timeline-border">
              <div class="timeline-icon data-background background-colorfull3"></div>
              <div class="timeline-contents">
                <div class="time-line-header text-center">
                  <h4 class="timeline-title">Bronze Medal: Vietnam National Casio Mathematics Contest for High School Students
                  </h4>
                  <div class="icon-image mb-2">
                    <img src="assets/img/icons/bronze-medal.svg" alt="">
                  </div>
                  <p class="timeline-year">02/2014</p>
                </div>
              </div>
            </div>
            <div class="timeline-item timeline-border">
              <div class="timeline-icon data-background background-colorfull3"></div>
              <div class="timeline-contents">
                <div class="time-line-header text-center">
                  <h4 class="timeline-title">Gold Medal: Vietnam National Vi-Olympic Online Mathematics Contest for High School Students</h4>
                  <div class="icon-image mb-2">
                    <img src="assets/img/icons/gold-medal.svg" alt="">
                  </div>
                  <p class="timeline-year">05/2014</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>