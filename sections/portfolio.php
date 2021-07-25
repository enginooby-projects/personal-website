<!-- <div class="col-lg-4 portfolio-item  game highlight medium web completed">
          <div class="image-border">
                    <div class="portfolio-item-content">
                              <img src="assets/img/endless-flight.png" alt="/" class="img-fluid">
                              <div class="img-overlay text-center">
                                        <div class="img-overlay-content">
                                                  <div class="portfolio-icon">
                                                            <a href="javascript:void();" type="button" data-toggle="modal" data-target="#endless-flight"><i class=" lni-search"></i></a>
                                                            <a href="https://enginoobz.itch.io/endless-flight" target="blank_" type="button"><i class=" lni-play"></i></a>
                                                            <a href="https://github.com/enginoobz-games/endless-flight" target="_blank" rel="noopener"> <i class="lni-code"></i> </a>
                                                  </div>
                                                  <h6 class="mt-3 mb-0">Endless Flight</h6>
                                        </div>
                              </div>
                    </div>
          </div>
</div> -->

<?php
//TODO: Setup database
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
                                                  <img src="assets/img/portfolio/' . $this->imgUrl . '.png" alt="/" class="img-fluid">
                                                  <div class="img-overlay text-center">
                                                            <div class="img-overlay-content">
                                                                      <div class="portfolio-icon">
                                                                                <a href="javascript:void();" type="button" data-toggle="modal" data-target="#endless-flight" aria-label="Read more"><i class="fas fa-search"></i></a>
                                                                                <a href="https://' . $this->accessUrl . '" target="blank_" type="button" aria-label="Play"><i class=" lni-play"></i></a>
                                                                                <a href="https://github.com/' . $this->codeUrl . '" target="_blank" rel="noopener" aria-label="Source code"> <i class="lni-code"></i> </a>
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

// space in url = %20
function displayPortfolioItem($label, $isGalleryItem = false, $imgRatio = null, $isInjectedItem = false, $injectedFile = null, $filters, $accessUrl = null, $downloadUrl = null, $modalPlay = null, $codeUrl = null)
{
        $formattedName = formatLabel($label);
        $highlightElement = getHighlightElement($filters);
        $injectedElement = "";
        $imageElement = "";
        $buttonElements = "";
        $imgRatioProperty = '';
        $id = $formattedName . '-portfolio';

        $loadingIndicatorElement = '<div class="cssload-container">
	<div class="cssload-whirlpool"></div>
</div>';

        // $linkIcon = '<lord-icon src="https://cdn.lordicon.com/wjwuvtno.json" trigger="morph"stroke="100" colors="primary:#ffffff,secondary:#08a88a" axis-y="35"></lord-icon>';
        $linkIcon = '<i class="fas fa-link"></i>';

        if ($isInjectedItem) {
                ob_start();
                include $injectedFile;
                $injectedContent = ob_get_clean();
                $injectedElement = '<div class="injected-section">' . $injectedContent . ' </div> ';
                $loadingIndicatorElement = '';
        } else {
                // src="https://placehold.co/' . $imgRatio . '/jpg" 
                if ($imgRatio) $imgRatioProperty = 'style="aspect-ratio: ' . $imgRatio . '"';
                $imageElement = ' <img class="lazy" data-src="assets/img/portfolio/' . $formattedName . '.png" alt="/" class="img-fluid" width="311" height="232">'; // dimension for audit, will be overrided by css
        }

        if ($isGalleryItem) $buttonElements .= '
                <a href="assets/img/portfolio/' . $formattedName . '.png" class="js-zoom-gallery background-colorfull1" aria-label="Gallery image">
                       <i class="fas fa-search"></i>
                </a>
        ';
        else $buttonElements .= '
                <a href="javascript:void();" type="button" data-toggle="modal" data-target="#' . $formattedName . '" class="background-colorfull1" aria-label="Read more"><i class="fas fa-search"></i></a>
        ';

        if ($accessUrl) $buttonElements .= '
                <a href="https://' . $accessUrl . '" target="blank_" type="button" class="background-colorfull2" aria-label="Visit">' . $linkIcon . '</a>
        ';

        if ($downloadUrl) $buttonElements .= '
                <a href="https://' . $downloadUrl . '" type="button" class="background-colorfull2" aria-label="Download"><i class="fas fa-download"></i></a>
        ';

        if ($modalPlay) $buttonElements .= '
                <a href="javascript:void();" class="background-colorfull2" aria-label="Play" type="button" data-toggle="modal" data-target="#' . $modalPlay . '"><i class="fas fa-play"></i></a>
        ';

        if ($codeUrl) $buttonElements .= '
                <a href="https://github.com/' . $codeUrl . '" target="_blank" rel="noopener" class="background-colorfull3" aria-label="Source code"> <i class="fas fa-code"></i> </a>
        ';

        echo '
          <div class="-style col-lg-4 portfolio-item ' . $filters . '" id="' . $id . '">
                    <div class="image-border">
                                        ' . $loadingIndicatorElement . '
                              <div class="portfolio-item-content" ' . $imgRatioProperty . '>
                                        ' . $imageElement . '
                                        ' . $highlightElement . '
                                        ' . $injectedElement . '
                                        <div class="img-overlay text-center">
                                                  <div class="img-overlay-content">
                                                            <div class="portfolio-icon">
                                                        ' . $buttonElements . '
                                                            </div>
                                                            <p class="project-label mt-3 mb-0">' . $label . '</p>
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

<div class="display-table">
        <div class="display-content">
                <div class="container">
                        <!-- Title -->
                        <div class="row">
                                <div class="col-lg-12">
                                        <div class="title-wrapper">
                                                <span>My Works</span>
                                        </div>
                                        <div class="title-content">
                                                <h2 class="highlight-color">My Works</h2>
                                        </div>
                                </div>
                        </div>


                        <!-- Categorize filter -->
                        <div class="row mb-0">
                                <!--   Portfolio Filters   -->
                                <ul id="radio-button-group" class="list-unstyled list-inline mb-0 col-lg-12 text-center radio-button-group">
                                        <li class="button-border list-inline-item">
                                                <a href="#" data-filter="*" class="pill-button active"><i class="fas fa-globe fa-xs" aria-label="All filter"></i> All</a>
                                        </li>
                                        <li class="button-border list-inline-item">
                                                <a href="#" data-filter=".highlight" class="pill-button" aria-label="Highlight filter"><i class="fas fa-star fa-xs"></i> Highlight</a>
                                        </li>
                                        <li class="button-border list-inline-item">
                                                <a href="#" data-filter=".game" class="pill-button" aria-label="Game filter"><i class="fas fa-gamepad fa-xs"></i> Game</a>
                                        </li>
                                        <li class="button-border list-inline-item">
                                                <a href="#" data-filter=".cg" class="pill-button" aria-label="CG filter"><i class="fas fa-dice-d20 fa-xs"></i> CG</a>
                                        </li>
                                        <li class="button-border list-inline-item">
                                                <a href="#" data-filter=".model" class="pill-button" aria-label="Model filter"><i class="fas fa-cube fa-xs"></i> Model</a>
                                        </li>
                                        <li class="button-border list-inline-item">
                                                <a href="#" data-filter=".design" class="pill-button" aria-label="Design filter"><i class="fas fa-palette fa-xs"></i> Design</a>
                                        </li>
                                        <li class="button-border list-inline-item">
                                                <a href="#" data-filter=".utility" class="pill-button" aria-label="Utility filter"><i class="fas fa-tools fa-xs"></i> Utility</a>
                                        </li>
                                        <li class="button-border list-inline-item">
                                                <a href="#" data-filter=".ecommerce" class="pill-button" aria-label="eCommerce filter"><i class="fas fa-shopping-cart fa-xs"></i> eCommerce</a>
                                        </li>
                                        <!-- <li class="button-border list-inline-item">
                                                        <a href="#" data-filter=".cms" class="pill-button" aria-label="CMS filter"><i class="fas fa-users fa-xs"></i> CMS</a>
                                                </li> -->
                                        <li class="button-border list-inline-item">
                                                <a href="#" data-filter=".academia" class="pill-button" aria-label="Academia filter"><i class="fas fa-graduation-cap fa-xs"></i> Academia</a>
                                        </li>
                                </ul>
                        </div>


                        <!-- Sub-filters -->
                        <div class="row  justify-content-around sub-filters mt-0">
                                <div class="segmented-control col-lg-4  col-md-6 d-flex justify-content-around" id="size-filters" data-filter-group="size">
                                        <input type="radio" name="size" value="1" id="size-1" checked />
                                        <label for="size-1" class="segmented-control__1" data-filter="">All sizes</label>
                                        <input type="radio" name="size" value="2" id="size-2" />
                                        <label for="size-2" class="segmented-control__2" data-filter=".small">Small</label>
                                        <input type="radio" name="size" value="3" id="size-3" />
                                        <label for="size-3" class="segmented-control__3" data-filter=".medium">Medium</label>
                                        <input type="radio" name="size" value="4" id="size-4" />
                                        <label for="size-4" class="segmented-control__4" data-filter=".large">Large</label>
                                        <div class="segmented-control-size__color radio-selection"></div>
                                </div>
                                <div class="segmented-control  col-lg-4  col-md-6 d-flex justify-content-around" data-filter-group="platform">
                                        <input type="radio" name="platform" value="1" id="platform-1" checked />
                                        <label for="platform-1" class="segmented-control__1" data-filter="">Platforms</label>
                                        <input type="radio" name="platform" value="2" id="platform-2" />
                                        <label for="platform-2" class="segmented-control__2" data-filter=".web">Web</label>
                                        <input type="radio" name="platform" value="3" id="platform-3" />
                                        <label for="platform-3" class="segmented-control__3" data-filter=".mobile">Mobile</label>
                                        <input type="radio" name="platform" value="4" id="platform-4" />
                                        <label for="platform-4" class="segmented-control__4" data-filter=".desktop">Desktop</label>
                                        <div class="segmented-control-platform__color radio-selection"></div>
                                </div>
                                <div class="segmented-control col-lg-4  col-md-6 d-flex justify-content-around" data-filter-group="stage">
                                        <input type="radio" name="stage" value="1" id="stage-1" checked />
                                        <label for="stage-1" class="segmented-control__1" data-filter="">All stages</label>
                                        <input type="radio" name="stage" value="2" id="stage-2" />
                                        <label for="stage-2" class="segmented-control__2" data-filter=".completed">Completed</label>
                                        <input type="radio" name="stage" value="3" id="stage-3" />
                                        <label for="stage-3" class="segmented-control__3" data-filter=".prototype">Prototype</label>
                                        <input type="radio" name="stage" value="4" id="stage-4" />
                                        <label for="stage-4" class="segmented-control__4" data-filter=".ongoing">Ongoing</label>
                                        <div class="segmented-control-stage__color radio-selection"></div>
                                </div>
                        </div>

                        <!-- Technology filter -->
                        <div class="container mt-4" id="tech-filters">
                                <div class="checkbox  m-0 row justify-content-center">
                                        <div class="checkbox__1">
                                                <input id="checkbox-1" type="checkbox" value=".database">
                                                <label for="checkbox-1">
                                                        <i class="fas fa-check"></i>
                                                </label>
                                                <div class="name">Database</div>
                                        </div>
                                        <div class="checkbox__2">
                                                <input id="checkbox-2" type="checkbox" value=".networking">
                                                <label for="checkbox-2">
                                                        <i class="fas fa-check"></i>
                                                </label>
                                                <div class="name">Networking</div>
                                        </div>
                                        <div class="checkbox__8">
                                                <input id="checkbox-8" type="checkbox" value=".cloud">
                                                <label for="checkbox-8">
                                                        <i class="fas fa-check"></i>
                                                </label>
                                                <div class="name">Cloud</div>
                                        </div>
                                        <div class="checkbox__3">
                                                <input id="checkbox-3" type="checkbox" value=".api">
                                                <label for="checkbox-3">
                                                        <i class="fas fa-check"></i>
                                                </label>
                                                <div class="name">API</div>
                                        </div>
                                        <div class="checkbox__4">
                                                <input id="checkbox-4" type="checkbox" value=".ai">
                                                <label for="checkbox-4">
                                                        <i class="fas fa-check"></i>
                                                </label>
                                                <div class="name">AI/ML</div>
                                        </div>
                                        <div class="checkbox__5">
                                                <input id="checkbox-5" type="checkbox" value=".ar">
                                                <label for="checkbox-5">
                                                        <i class="fas fa-check"></i>
                                                </label>
                                                <div class="name">AR</div>
                                        </div>
                                        <div class="checkbox__6">
                                                <input id="checkbox-6" type="checkbox" value=".vr">
                                                <label for="checkbox-6">
                                                        <i class="fas fa-check"></i>
                                                </label>
                                                <div class="name">VR</div>
                                        </div>
                                        <!-- <div class="checkbox__7">
                                                        <input id="checkbox-7" type="checkbox" value=".iot">
                                                        <label for="checkbox-7">
                                                                <i class="fas fa-check"></i>
                                                        </label>
                                                        <div class="name">IoT</div>
                                                </div> -->
                                </div>
                        </div>

                        <div class="portfolio-items row">
                                <?php
                                //$isGalleryItem = false, $filters, $label, $accessUrl = null, $codeUrl = null
                                displayPortfolioItem(
                                        label: 'Endless Flight',
                                        isGalleryItem: false,
                                        imgRatio: '80/40',
                                        filters: 'highlight game large web completed',
                                        accessUrl: 'enginoobz.itch.io/endless-flight',
                                        codeUrl: 'enginoobz-games/endless-flight'
                                );
                                displayPortfolioItem(
                                        label: 'Generic Tic Tac Toe',
                                        isGalleryItem: false,
                                        imgRatio: '180/90',
                                        filters: 'highlight game medium web completed networking',
                                        accessUrl: 'enginoobz-threejs.herokuapp.com',
                                        codeUrl: 'enginoobz-university/three-js/blob/master/src/client/tasks/tic-tac-toe.ts'
                                );

                                displayPortfolioItem(
                                        label: 'Guess The Word',
                                        isGalleryItem: false,
                                        imgRatio: '100/74',
                                        filters: 'game small web prototype',
                                        modalPlay: 'guess-the-word-play',
                                        codeUrl: 'enginoobz-games/guess-the-word'
                                );
                                //TODO: setInterval change style by modify class name of style in the section wrapper
                                displayPortfolioItem(
                                        label: 'Personal Website',
                                        isInjectedItem: true,
                                        injectedFile: 'hero-injectable.php',
                                        filters: 'highlight web database cloud ongoing large',
                                        codeUrl: 'enginoobz-projects/portfolio-test'
                                );
                                displayPortfolioItem(
                                        label: 'Tony The Runner',
                                        isGalleryItem: false,
                                        imgRatio: '192/108',
                                        filters: 'game medium web completed',
                                        accessUrl: 'enginoobz.itch.io/tony-the-runner',
                                        codeUrl: 'enginoobz-games/tony-the-runner'
                                );
                                displayPortfolioItem(
                                        label: 'The Maze',
                                        isGalleryItem: false,
                                        imgRatio: '192/108',
                                        filters: 'game small web prototype',
                                        modalPlay: 'the-maze-play',
                                        codeUrl: 'enginoobz-university/unity-laboratories'
                                );
                                displayPortfolioItem(
                                        label: 'Breakout',
                                        isGalleryItem: false,
                                        imgRatio: '143/107',
                                        filters: 'game small web prototype',
                                        modalPlay: 'breakout-play',
                                        codeUrl: 'enginoobz-games/breakout2'
                                );
                                displayPortfolioItem(
                                        label: 'Project Boost',
                                        isGalleryItem: false,
                                        imgRatio: '148/80',
                                        filters: 'game small web prototype',
                                        modalPlay: 'project-boost-play',
                                        codeUrl: 'enginoobz-games/project-boost'
                                );
                                displayPortfolioItem(
                                        label: 'Racing',
                                        isGalleryItem: false,
                                        imgRatio: '99/74',
                                        filters: 'game small web prototype',
                                        // modalPlay: 'project-boost-play',
                                        codeUrl: 'enginoobz-games/racing'
                                );
                                displayPortfolioItem(
                                        label: 'Shader Playground',
                                        isGalleryItem: false,
                                        imgRatio: '153/64',
                                        filters: 'cg small web ongoing',
                                        modalPlay: 'shader-playground-play',
                                        codeUrl: 'enginoobz-games/shader-playground'
                                );
                                displayPortfolioItem(
                                        label: 'Newton Cradle',
                                        isGalleryItem: false,
                                        imgRatio: '192/90',
                                        filters: 'cg medium web completed',
                                        accessUrl: 'enginoobz-threejs.herokuapp.com',
                                        codeUrl: 'enginoobz-university/three-js/blob/master/src/client/tasks/newton_cradle.ts'
                                );
                                displayPortfolioItem(
                                        label: 'MeowMeow Brand',
                                        isGalleryItem: true,
                                        imgRatio: '248/350',
                                        filters: 'design completed',
                                );
                                displayPortfolioItem(
                                        label: 'Train Model',
                                        isGalleryItem: true,
                                        imgRatio: '192/107',
                                        filters: 'model web completed',
                                        accessUrl: 'enginoobz.itch.io/unity-laboratories',
                                );
                                displayPortfolioItem(
                                        label: 'Multistore Shopping GUI',
                                        isGalleryItem: false,
                                        imgRatio: '87/68',
                                        filters: 'ecommerce  medium  desktop completed database',
                                        downloadUrl: 'enginoobz.com/download/Multistore%20Shopping%20GUI.rar',
                                        codeUrl: 'enginoobz-projects/multistore-shopping-gui',
                                );
                                displayPortfolioItem(
                                        label: 'The Dark Diary',
                                        isGalleryItem: false,
                                        imgRatio: '123/77',
                                        accessUrl: 'enginoobz.com/projects/the-dark-diary',
                                        filters: 'utility small  web database prototype ',
                                        codeUrl: 'enginoobz-projects/the-dark-diary'
                                );
                                displayPortfolioItem(
                                        label: 'Weather Checker',
                                        isGalleryItem: false,
                                        imgRatio: '57/86',
                                        filters: 'utility small  desktop prototype api',
                                        codeUrl: 'enginoobz-projects/weather-checker'
                                );
                                displayPortfolioItem(
                                        label: 'Corona Checker',
                                        isGalleryItem: false,
                                        imgRatio: '192/90',
                                        accessUrl: 'enginoobz.com/projects/corona-checker',
                                        filters: 'utility small  web completed ',
                                        codeUrl: 'enginoobz-projects/corona-checker'
                                );

                                displayPortfolioItem(
                                        label: 'Photo Enhancement',
                                        isGalleryItem: true,
                                        imgRatio: '297/197',
                                        filters: 'design completed',
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