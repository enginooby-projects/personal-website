<?php
include '../utility.php';
//TODO: setup database
$subjects = array(
        // array('Computer', '-', '-', '5.0'),
        array('Software Engineering', 'Software development cycle - Testing - Scrum - UML', 'StarUML', '5.0'),
        array('Linear Algebra', 'Vector - Matrix - Determinant', '-', '4.5'),
        array('Algorithms & Data Structures', 'Computational complexity - Graph - Tree - Sorting - Dynamic programming', 'Java Core', '5.0'),
        array('Object Oriented Programming', 'Encapsulation - Polymorphism  - Inheritance - (Abstract) Class - Interface - Generics', 'Java Core  - JUnit -  Swing - MySQL', '5.0'),
        array('Operating Systems', '-', 'Windows OS - Linux OS', '5.0'),
);
?>

<div class="portfolio-single modal fade" id="courses" tabindex="-1" role="dialog" aria-labelledby="bookshelfModalScrollable" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title " id="coursesModalScrollable">Courses</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                                <div class="pt-4 pb-5">
                                        <div class="container">
                                                <div class="row">
                                                        <table class="neumorphic">
                                                                <thead>
                                                                        <tr>
                                                                                <th>#</th>
                                                                                <th>Name</th>
                                                                                <th>Key points</th>
                                                                                <th>Technologies</th>
                                                                                <th>Grade<br> (scale: 5.0)</th>
                                                                        </tr>
                                                                </thead>
                                                                <tbody>
                                                                        <?php displayTableRows($subjects); ?>
                                                                </tbody>
                                                        </table>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        </div>
</div>