      <?php
        include_once "../dynamic-ui-framework/components/container/_index.php";
        ?>

      <div class="display-table">
              <div class="display-content">
                      <div class="container">
                              <?php echo TitleBar("Get In Touch") ?>
                              <div class="row contact-info">
                                      <div class="col-lg-4">
                                              <div class="contact-info-text text-center">
                                                      <div class="highlight-color">
                                                              <img src="assets/img/phone.svg" alt="">
                                                      </div>
                                                      <div class="mt-3">
                                                              <p class="title mb-0">Call Me</p>
                                                              <small>+48 731.237.298</small>
                                                      </div>
                                              </div>
                                      </div>
                                      <div class="col-lg-4">
                                              <div class="contact-info-text text-center">
                                                      <div class="highlight-color">
                                                              <img src="assets/img/location.svg" alt="">
                                                      </div>
                                                      <div class="mt-3">
                                                              <p class="title mb-0 contact_detail-title">Visit Me</p>
                                                              <small>Wroclaw, Poland</small>
                                                      </div>
                                              </div>
                                      </div>
                                      <div class="col-lg-4">
                                              <div class="contact-info-text text-center">
                                                      <div class="highlight-color">
                                                              <img src="assets/img/send.svg" alt="">
                                                      </div>
                                                      <div class="mt-3">
                                                              <p class="title mb-0">Email Me</p>
                                                              <small>enginoobz@gmail.com</small>
                                                      </div>
                                              </div>
                                      </div>
                              </div>
                              <div class="row">
                                      <div class="col-lg-12 mt-5 contact-form">
                                              <form id="contactForm">
                                                      <div class="row">
                                                              <div class="col-lg-6 form-item">
                                                                      <div class="form-group">
                                                                              <!-- TODO: Chage input field to NEU flat style when focus -->
                                                                              <input name="name" id="name" type="text" class="form-control" placeholder="Your Name*" required>
                                                                      </div>
                                                              </div>
                                                              <div class="col-lg-6 form-item">
                                                                      <div class="form-group">
                                                                              <input name="email" id="email" type="email" class="form-control" placeholder="Your Email*" required>
                                                                      </div>
                                                              </div>
                                                              <div class="col-12 form-item">
                                                                      <div class="form-group">
                                                                              <input name="subject" id="subject" type="text" class="form-control" placeholder="Your Subject*" required>
                                                                      </div>
                                                              </div>
                                                              <div class="col-12 form-item">
                                                                      <div class="form-group">
                                                                              <textarea name="comments" id="comments" rows="4" class="form-control" placeholder="Your message..."></textarea>
                                                                      </div>
                                                              </div>
                                                              <div class="col-sm-12 mt-4 text-left">
                                                                      <div class="button-border">
                                                                              <a href="#" class="button" id="submit-btn" onclick="sendEmail()">Send Message</a>
                                                                      </div>
                                                                      <div id="message" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="4000">
                                                                              <!-- <div class="toast-body d-inline-block"></div> -->
                                                                              <button type="button" class="pr-3 close" data-dismiss="toast" aria-label="Close">
                                                                                      <span aria-hidden="true" class="lni-close size-xs "></span>
                                                                              </button>
                                                                      </div>
                                                              </div>
                                                      </div>
                                              </form>
                                      </div>
                              </div>

                              <!-- <div class="row copy-right">
                                                  <div class="col-12 text-center ">
                                                            <p>Copyright © 2019. Template has been designed by <span class="highlight-color">Retrina</span></p>
                                                  </div>
                                        </div> -->
                      </div>
              </div>
      </div>