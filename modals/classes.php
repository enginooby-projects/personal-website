<?php
include '../utility.php';
$subjects = array(
        // array('Computer', '-', '-', '5.0'),
        array('Software Engineering', 'Software development cycle - Testing - Scrum - UML', 'StarUML', '5.0'),
        array('Linear Algebra', 'Vector - Matrix - Determinant', '-', '4.5'),
        array('Algorithms & Data Structures', 'Computational complexity - Graph - Tree - Sorting - Dynamic programming', 'Java Core', '5.0'),
        array('Object Oriented Programming', 'Encapsulation - Polymorphism  - Inheritance - (Abstract) Class - Interface - Generics', 'Java Core  - JUnit -  Swing - MySQL', '5.0'),
        array('Operating Systems', '-', 'Windows OS - Linux OS', '5.0'),
        array('Discrete Mathematics', 'Set theory - Numbering systems - Prime - Euclid\'s algorithm - Graph', '-', '5.0'),
        array('Foundations of Digital Electronics', 'Numbering systems -  Combinational logic circuit - Boolean algebra - Karnaugh map  - Logic gate - Flip flop - Counter', '-', '5.0'),
        array('Database Applications ', 'RESTful API - Singleton - DAO pattern - Repository pattern', 'Java -  Hibernate - Spring Boot - H2 - Thymeleaf -  Postman', '5.0'),
        array('Database Concept', 'Relational database - Database Design - ERD diagram - Normalization - Aggregate queries & grouping - Nested queries', 'MySQL - MySQL Workbench', '5.0'),
        array('Web Services ', 'SOAP API - RESTful API', 'Java - Spring - JSP - JavaFX - Swing - Rapid API', '5.0'),
        array('Signal Processing', 'Sound signal - Harmonics - Noise - Discrete Fourier Transform - Filtering & convolution', 'Python - Jupyter Notebook', '5.0'),
        array('Computer Networks', 'Firewall - Ports- Protocols - Sockets - Network layouts - IP addresses - Wiring/Cabling - Routing', 'Linux OS', '5.0'),
        array('Computer Graphic', 'Text tools - Selection tools - Gradient -  Mask layer - Photo enhancement - Business design', 'Adobe Photoshop', '5.0'),
        array('Probabilistic Methods & Statistics', 'Data analysis - Unary linear regression', 'Excel', '5.0'),
        array('HTML Games', 'WebGL - Camera projection - Material - Geometry - Mesh', 'JavaScript/TypeScript - Three,js - Socket.io', '5.0'),
        array('Computer Games Programming', 'Modeling - Lighting - Camera - 3D & 2D Programming', 'Unity - C#', '5.0'),
        array('Embedded Systems', 'Electronics - Analog & digital - Input & output  - Breadboard - LED - LCD - IR remote - Ultrasonic range finder - Interrupt - EEPROM', 'Arduino  UNO - C++', '5.0'),
        array('WWW Applications', 'Web technologies - W3C - Information architecture - API - JSON - HTTP protocol - Responsive web design - Color design', 'HTML5 - CSS3 - JavaScript  & jQuery - Bootstrap ', '5.0'),
        array('Elements of Artificial Intelligence', 'Evolutionary algorithm - Fuzzy logic - Neural network', 'Python', '4.0'),
        array('Computer Network Design', 'Topology - Network design proposal', '-', '5.0'),
        array('Multimedia Presentation ', 'PUMA - Infographics & data visualization - Color theory - Copyright', 'PowerPoint', '5.0'),
        array('Mobile Technologies ', 'AR', 'Unity - C# - Vuforia SDK - Wit.ai', '5.0'),
        array('Server Software Administration', 'CI/CD - Networking - Web scalability - Web services & microservices - Container - DevOps', 'Ubuntu Server  OS - Apache Server - Chef - Docker', '4.5'),
        array('Security of Computer Systems', 'Malware - Attacks - Vulnerabilities - SQL injection - Hashing & checksum', 'Kali  OS  - Bash - Wireshark', '5.0'),
);
?>

<div class="portfolio-single modal fade" id="classes" tabindex="-1" role="dialog" aria-labelledby="classModalScrollable" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content ">
                        <div class="modal-header">
                                <h5 class="modal-title " id="classModalScrollable">Classes</h5>
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