<?php
function getColorfullByPercent($percent)
{
        $backgroundColor = 'background-colorfull3';

        if ($percent < 40) {
                $backgroundColor = 'background-colorfull1';
        } else if ($percent < 70) {
                $backgroundColor = 'background-colorfull2';
        }

        return $backgroundColor;
}

function progressBar($percent)
{
        $accountSpace = 3.5;

        return '
                <div class="skill-box p-2">
                        <div class="skillbar clearfix " data-percent="' . $percent - $accountSpace . '%">
                               <div class="skillbar-bar fill-skillbar ' . getColorfullByPercent($percent) . '"></div>
                        </div>
                </div>
        ';
}

function displayBook($imageUrl, $pageAmount)
{
        $percent = $pageAmount * 100;

        echo '
        <div class="image-border text-center book-item">
                <img  class="lazy" data-src="https://enginoobz.com/assets/img/books/' . $imageUrl . '" class="img-fluid" alt="" >
                ' . progressBar($percent) . '
        </div>
        ';
}

// image = name in JPG
function displayCourse($name, $percent, $url = '')
{
        echo '
        <div class="image-border text-center course-item ">
                <div class="portfolio-item-content ">
                        <img  class="lazy" data-src="https://enginoobz.com/assets/img/courses/' . rawurlencode($name) . '.jpg" alt="/" class="img-fluid">
                        <div class="img-overlay text-center">
                                        <div class="img-overlay-content">
                                                <div class="portfolio-icon">
                                                        <a href=' . $url . ' target="blank_" type="button" class="background-colorfull3" aria-label="Visit"><i class=" lni-link"></i></a>
                                                </div>
                                        </div>
                        </div>
                </div>
                ' . progressBar($percent) . '
                 <b> ' . $name . '</b>

        </div>
        ';
}
?>

<section id="self-education" class="section self-education pp-scrollable" data-navigation-tooltip="SELF-EDU">
        <div class="display-table">
                <div class="display-content">
                        <div class="container">
                                <!-- Title -->
                                <div class="row">
                                        <div class="col-lg-12">
                                                <div class="title-wrapper">
                                                        <span>Self-Taught</span>
                                                </div>
                                                <div class="title-content">
                                                        <h2 class="highlight-color">Self-Taught</h2>
                                                </div>
                                        </div>
                                </div>
                                <!--   Bookshelf  -->
                                <div class="row">
                                        <div class="col-lg-12">
                                                <div class="resume-title text-center">
                                                        <h3>Bookshelf</h3>
                                                        <div class="border-style"></div>
                                                </div>
                                        </div>
                                </div>
                                <!-- TODO: Start update progress bars when just moving into this section -->
                                <div class=" row justify-content-center">
                                        <?php
                                        displayBook('clean-code.jpg', ((-26   + 190) + (-202 + 225) + (-282 + 285)) / (-25 + 345));
                                        displayBook('head-first-design-patterns.jpg', 20 / 629);
                                        displayBook('gof.jpg', ((52 - 0) + (152 - 144)) / 396);
                                        displayBook('game-programming-patterns.jpg', 0 / 560);
                                        displayBook('introduction-to-algorithms.jpg', 10 / 1229);
                                        displayBook('clean-architecture.jpg', 0 / 100);
                                        displayBook('code-complete.jpg', 15 / 862);
                                        displayBook('the-self-taught-programmer.jpg', 0 / 100);
                                        ?>
                                </div>
                                <div class="row">
                                        <div class="col-12 text-center mt-4">
                                                <div class="button-border">
                                                        <a href="javascript:void();" class="pill-button" type="button" data-toggle="modal" data-target="#bookshelf">View Catalog</a>
                                                </div>
                                        </div>
                                </div>
                                <!--    Bookself End   -->

                                <!--   Courses  -->
                                <div class="row">
                                        <div class="col-lg-12 mt-5">
                                                <div class="resume-title text-center">
                                                        <h3>Courses</h3>
                                                        <div class="border-style"></div>
                                                </div>
                                        </div>
                                </div>
                                <div class=" row justify-content-center">
                                        <?php
                                        // displayCourse('', 100, "");
                                        displayCourse('Complete C# Unity Game Developer 3D', 35, "https://www.udemy.com/course/unitycourse2/");
                                        displayCourse('Unreal Engine C++ Developer', 20, "https://www.udemy.com/course/unrealcourse/");
                                        displayCourse('Machine Learning', (3 / 57) * 100, "https://www.coursera.org/learn/machine-learning");
                                        displayCourse('Understanding Quantum Computers', 7, "https://www.futurelearn.com/courses/intro-to-quantum-computing");
                                        displayCourse('The Complete Node.js Developer Course', 5, "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/");
                                        displayCourse('Mobile App Development Mini-Degree', (100 + 35) / 7, "https://academy.zenva.com/product/mobile-development-mini-degree/");
                                        displayCourse('Three.js and TypeScript', 100, "https://www.udemy.com/certificate/UC-825b45a2-3986-4fbf-a0d5-456eeefbe0d8/");
                                        displayCourse('Git Complete', 100, "https://www.udemy.com/certificate/UC-3b47fecf-2595-4bcf-8c64-2a69a8bd9e03/");
                                        displayCourse('Learn SQL using MySQL and Database Design', 100, "https://www.udemy.com/certificate/UC-8fe3aab0-f29d-457a-87b6-6e6e837b1cfa/");
                                        displayCourse('Programming the Arduino', 100, "https://www.udemy.com/certificate/UC-060d94b4-a35d-4fa2-b58f-6cf897b97269/");
                                        displayCourse('Spring & Hibernate for Beginners', 100, "https://www.udemy.com/certificate/UC-9f2db58a-edf2-4d73-9857-f7ff3f6f5612/");
                                        displayCourse('The Complete Web Developer Course', 100, "https://www.udemy.com/certificate/UC-309b0ea0-512e-4fee-851c-aefeb5571895/");
                                        ?>
                                </div>
                                <div class="row ">
                                        <div class="col-12 text-center mt-4">
                                                <div class="button-border">
                                                        <a href="javascript:void();" class="pill-button" type="button" data-toggle="modal" data-target="#courses">View Catalog</a>
                                                </div>
                                        </div>
                                </div>
                                <!-- TODO: Leetcode profile -->
                        </div>
                </div>
        </div>
</section>