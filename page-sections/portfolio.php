<!-- <div class="col-lg-4 portfolio-item  game highlight medium web completed">
          <div class="image-border">
                    <div class="portfolio-item-content">
                              <img src="assets/img/endless-flight.PNG" alt="/" class="img-fluid">
                              <div class="img-overlay text-center">
                                        <div class="img-overlay-content">
                                                  <div class="portfolio-icon">
                                                            <a href="javascript:void();" type="button" data-toggle="modal" data-target="#portfolio-single-endless-flight"><i class=" lni-search"></i></a>
                                                            <a href="https://enginoobz.itch.io/endless-flight" target="blank_" type="button"><i class=" lni-play"></i></a>
                                                            <a href="https://github.com/enginoobz-games/endless-flight" target="_blank"> <i class="lni-code"></i> </a>
                                                  </div>
                                                  <h6 class="mt-3 mb-0">Endless Flight</h6>
                                        </div>
                              </div>
                    </div>
          </div>
</div> -->

<?php
class CodingProject
{
        public function __construct(
                public string $filters,
                public string $name,
                public string $imgUrl,
                public string $accessUrl,
                public string $codeUrl
        ) {
                $this->display();
        }

        public function display()
        {
                echo '
                    <div class="col-lg-4 portfolio-item  game ' . $this->filters . '">
                              <div class="image-border">
                                        <div class="portfolio-item-content">
                                                  <img src="assets/img/portfolio/' . $this->imgUrl . '.PNG" alt="/" class="img-fluid">
                                                  <div class="img-overlay text-center">
                                                            <div class="img-overlay-content">
                                                                      <div class="portfolio-icon">
                                                                                <a href="javascript:void();" type="button" data-toggle="modal" data-target="#portfolio-single-endless-flight"><i class=" lni-search"></i></a>
                                                                                <a href="https://' . $this->accessUrl . '" target="blank_" type="button"><i class=" lni-play"></i></a>
                                                                                <a href="https://github.com/' . $this->codeUrl . '" target="_blank"> <i class="lni-code"></i> </a>
                                                                      </div>
                                                                      <h6 class="mt-3 mb-0">' . $this->name . '</h6>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                    </div>
                    ';
        }
}

// access URL can be single blog page, download or  website link
function displayPortfolioItem($label, $isGalleryItem = false, $filters, $accessUrl = null, $codeUrl = null)
{
        $formattedName = formatLabel($label);
        $highlightElement = getHighlightElement($filters);
        $buttonElements = "";

        if ($isGalleryItem) $buttonElements .= '
                <a href="assets/img/portfolio/' . $formattedName . '.PNG" class="js-zoom-gallery colorfull1">
                        <i class="lni-search"></i>
                </a>
        ';
        else $buttonElements .= '
                <a href="javascript:void();" type="button" data-toggle="modal" data-target="#portfolio-single-' . $formattedName . '" class="colorfull1"><i class=" lni-search"></i></a>
        ';

        if ($accessUrl) $buttonElements .= '
                <a href="https://' . $accessUrl . '" target="blank_" type="button" class="colorfull2"><i class=" lni-play"></i></a>
        ';

        if ($codeUrl) $buttonElements .= '
                <a href="https://github.com/' . $codeUrl . '" target="_blank" class="colorfull3"> <i class="lni-code"></i> </a>
        ';

        echo '
          <div class="col-lg-4 portfolio-item ' . $filters . '">
                    <div class="image-border">
                              <div class="portfolio-item-content ">
                                        <img src="assets/img/portfolio/' . $formattedName . '.PNG" alt="/" class="img-fluid">
                                        ' . $highlightElement . '
                                        <div class="img-overlay text-center">
                                                  <div class="img-overlay-content">
                                                            <div class="portfolio-icon">
                                                        ' . $buttonElements . '
                                                            </div>
                                                            <h6 class="mt-3 mb-0">' . $label . '</h6>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          </div>
    ';
}

function getHighlightElement($filters)
{
        $highlightElement = '';
        if (strpos($filters, "highlight") !== false) {
                $highlightElement = '<i class="highlight-portfolio-item base-color fas fa-star fa-xs" ></i>';
        }
        return $highlightElement;
}

// Project Name -> project-name
function formatLabel($str, $sep = '-')
{
        $res = strtolower($str);
        $res = preg_replace('/[^[:alnum:]]/', ' ', $res);
        $res = preg_replace('/[[:space:]]+/', $sep, $res);
        return trim($res, $sep);
}

?>

<section id="portfolio" class="section portfolio  pp-scrollable" data-navigation-tooltip="PORTFOLIO">
        <div class="display-table">
                <div class="display-content">
                        <div class="container">
                                <!-- Title -->
                                <div class="row">
                                        <div class="col-lg-12">
                                                <div class="title-wrapper">
                                                        <span>My Work</span>
                                                </div>
                                                <div class="title-content">
                                                        <h2 class="base-color">My Work</h2>
                                                </div>
                                        </div>
                                </div>
                                <!-- Categorize filter -->
                                <div class="row">
                                        <!--   Portfolio Filters   -->
                                        <ul id="portfolio-filter" class="list-unstyled list-inline mb-0 col-lg-12 text-center portfolio-filter">
                                                <li class="button-border list-inline-item">
                                                        <a href="#" data-filter="*" class="pill-button active"><i class="fas fa-globe fa-xs"></i> All</a>
                                                </li>
                                                <li class="button-border list-inline-item">
                                                        <a href="#" data-filter=".highlight" class="pill-button"><i class="fas fa-star fa-xs"></i> Highlight</a>
                                                </li>
                                                <li class="button-border list-inline-item">
                                                        <a href="#" data-filter=".game" class="pill-button"><i class="fas fa-gamepad fa-xs"></i> Game</a>
                                                </li>
                                                <li class="button-border list-inline-item">
                                                        <a href="#" data-filter=".cg" class="pill-button"><i class="fas fa-dice-d20 fa-xs"></i> CG</a>
                                                </li>
                                                <li class="button-border list-inline-item">
                                                        <a href="#" data-filter=".model" class="pill-button"><i class="fas fa-cube fa-xs"></i> Model</a>
                                                </li>
                                                <li class="button-border list-inline-item">
                                                        <a href="#" data-filter=".design" class="pill-button"><i class="fas fa-palette fa-xs"></i> Design</a>
                                                </li>
                                                <li class="button-border list-inline-item">
                                                        <a href="#" data-filter=".utility" class="pill-button"><i class="fas fa-tools fa-xs"></i> Utility</a>
                                                </li>
                                                <li class="button-border list-inline-item">
                                                        <a href="#" data-filter=".ecommerce" class="pill-button"><i class="fas fa-shopping-cart fa-xs"></i> eCommerce</a>
                                                </li>
                                                <!-- <li class="button-border list-inline-item">
                                                        <a href="#" data-filter=".cms" class="pill-button"><i class="fas fa-users fa-xs"></i> CMS</a>
                                                </li> -->
                                                <li class="button-border list-inline-item">
                                                        <a href="#" data-filter=".academia" class="pill-button"><i class="fas fa-graduation-cap fa-xs"></i> Academia</a>
                                                </li>
                                        </ul>
                                </div>
                                <!-- Technology filter -->
                                <div class="container">
                                        <div class="row justify-content-center">
                                                <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox0" value="option0" />
                                                        <label class="form-check-label" for="inlineCheckbox0">All technologies</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                                                        <label class="form-check-label" for="inlineCheckbox1">Database</label>
                                                </div>

                                                <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                                                        <label class="form-check-label" for="inlineCheckbox2">Networking</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
                                                        <label class="form-check-label" for="inlineCheckbox3">API</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4" />
                                                        <label class="form-check-label" for="inlineCheckbox4">AI</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox5" value="option5" />
                                                        <label class="form-check-label" for="inlineCheckbox5">AR</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox6" value="option6" />
                                                        <label class="form-check-label" for="inlineCheckbox6">VR</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox7" value="option7" />
                                                        <label class="form-check-label" for="inlineCheckbox7">IoT</label>
                                                </div>
                                        </div>
                                </div>
                                <br>
                                <div class="sub-filters row">
                                        <!-- Size filter -->
                                        <div class="btn-group col-lg-4" role="group" data-filter-group="size" aria-label="Size">
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter checked" data-filter="">All sizes</button>
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter" data-filter=".small" data-toggle="tooltip" data-placement="top" title="<1000 lines of code">Small</button>
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter" data-filter=".medium" data-toggle="tooltip" data-placement="top" title="1000 - 5000 lines of code">Medium</button>
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter" data-filter=".large" data-toggle="tooltip" data-placement="top" title=">5000 lines of code">Large</button>
                                        </div>
                                        <!-- Platform filter -->
                                        <div class="btn-group col-lg-4" role="group" data-filter-group="platform" aria-label="Platform">
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter checked" data-filter="">All platforms</button>
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter" data-filter=".web">Web</button>
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter" data-filter=".mobile">Mobile</button>
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter" data-filter=".desktop">Desktop</button>
                                        </div>
                                        <!-- Stage filter -->
                                        <div class="btn-group col-lg-4" role="group" data-filter-group="stage" aria-label="Stage">
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter checked" data-filter="">All stages</button>
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter" data-filter=".completed">Completed</button>
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter" data-filter=".prototype">Prototype</button>
                                                <button type="button" class="btn btn-sm btn-secondary btn-filter" data-filter=".ongoing">Ongoing</button>
                                        </div>
                                </div>
                                <div class="portfolio-items row">
                                        <?php
                                        //$isGalleryItem = false, $filters, $label, $accessUrl = null, $codeUrl = null
                                        displayPortfolioItem(
                                                label: 'Endless Flight',
                                                isGalleryItem: false,
                                                filters: 'highlight game large web completed',
                                                accessUrl: 'enginoobz.itch.io/endless-flight',
                                                codeUrl: 'enginoobz-games/endless-flight'
                                        );
                                        displayPortfolioItem(
                                                label: 'Generic Tic Tac Toe',
                                                isGalleryItem: false,
                                                filters: 'highlight game medium web completed networking',
                                                accessUrl: 'enginoobz-threejs.herokuapp.com',
                                                codeUrl: 'enginoobz-university/three-js/blob/master/src/client/tasks/tic-tac-toe.ts'
                                        );
                                        displayPortfolioItem(
                                                label: 'Guess The Word',
                                                isGalleryItem: false,
                                                filters: 'game small web prototype',
                                                accessUrl: 'enginoobz.itch.io/guess-the-word',
                                                codeUrl: 'enginoobz-games/guess-the-word'
                                        );
                                        displayPortfolioItem(
                                                label: 'Tony The Runner',
                                                isGalleryItem: false,
                                                filters: 'game medium web completed',
                                                accessUrl: 'enginoobz.itch.io/tony-the-runner',
                                                codeUrl: 'enginoobz-games/tony-the-runner'
                                        );
                                        displayPortfolioItem(
                                                label: 'MeowMeow Brand Design',
                                                isGalleryItem: true,
                                                filters: 'design completed',
                                        );
                                        displayPortfolioItem(
                                                label: 'Photo Enhancement',
                                                isGalleryItem: true,
                                                filters: 'design completed',
                                        );
                                        displayPortfolioItem(
                                                label: 'Multistore Shopping GUI',
                                                isGalleryItem: false,
                                                filters: 'ecommerce  medium  desktop completed',
                                                accessUrl: 'enginoobz-projects/multistore-shopping-gui',
                                                codeUrl: 'enginoobz-projects/multistore-shopping-gui',
                                        );
                                        displayPortfolioItem(
                                                label: 'Simple Weather GUI',
                                                isGalleryItem: false,
                                                filters: 'utility  small  desktop prototype',
                                                codeUrl: 'enginoobz-projects/simple-weather-gui'
                                        );
                                        ?>
                                </div>
                                <!-- <div class="row mt-4">
                                        <div class="col-12 text-center pt-2">
                                                <div class="button-border d-inline-block">
                                                        <a href="portfolio.html" class="pill-button">Portfolio Page</a>
                                                </div>
                                        </div>
                                </div> -->
                        </div>
                </div>
        </div>
</section>