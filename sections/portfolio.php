<?php
include_once "../dui/_index.php";

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

// space in url = %20; $injectedClasses to set style for the injected item
function displayPortfolioItem($label, $displayFileUrl = null, $displayFileExtension = 'png', $isGalleryItem = false, $displayFileRatio = null, $isInjectedItem = false, $injectedClasses = '', $injectedFile = null, $filters, $accessUrl = null, $downloadUrl = null, $modalPlay = null, $codeUrl = null)
{
  $formattedName = formatLabel($label);
  $highlightElement = getHighlightElement($filters);
  $injectedElement = "";
  $displayElement = "";
  $buttonElements = "";
  $displayFileRatioProperty = '';
  $id = $formattedName . '-portfolio';

  if (!$displayFileUrl) {
    $displayFileUrl = 'assets/img/portfolio/' . $formattedName;
  }

  $loadingIndicatorElement = '<div class="cssload-container">
	<div class="cssload-whirlpool"></div>
</div>';

  // $linkIcon = '<lord-icon src="https://cdn.lordicon.com/wjwuvtno.json" trigger="morph"stroke="100" colors="primary:#ffffff,secondary:#08a88a" axis-y="35"></lord-icon>';
  $linkIcon = '<i class="fas fa-link"></i>';

  if ($isInjectedItem) {
    ob_start();
    include_once $injectedFile;
    $injectedContent = ob_get_clean();
    $injectedElement = "<div class='injected-section $injectedClasses'>$injectedContent</div> ";
    $loadingIndicatorElement = '';
  } else {
    // src="https://placehold.co/' . $displayFileRatio . '/jpg" 
    if ($displayFileRatio) $displayFileRatioProperty = 'style="aspect-ratio: ' . $displayFileRatio . '"';
    if ($displayFileExtension == 'png' ||$displayFileExtension == 'gif' || $displayFileExtension == 'jpg') {
      $displayElement = " <img class='lazy' data-src='$displayFileUrl.$displayFileExtension' alt='/' class='img-fluid' width='311' height='232'>"; // placholder dimension for audit, will be overrided by css
    } else if ($displayFileExtension == 'mp4') {
      $displayElement = "<div class='video-container' $displayFileRatioProperty>
                          <video autoplay loop muted playsinline class='lazy'>
                            <source data-src='$displayFileUrl.$displayFileExtension' type='video/$displayFileExtension'>
                          </video>
                        </div>";
    }
  }

  if ($isGalleryItem) $buttonElements .= '
    <a href="assets/img/portfolio/' . $formattedName . '.png" class="js-zoom-gallery background-colorfull1" aria-label="Gallery image">
      <i class="fas fa-search"></i>
    </a>
        ';
  else $buttonElements .= '
    <a href="javascript:void();" type="button" data-bs-toggle="modal" data-bs-target="#' . $formattedName . '" data-toggle="modal" data-target="#' . $formattedName . '" class="background-colorfull1" aria-label="Read more"><i class="fas fa-search"></i></a>
        ';

  if ($accessUrl) $buttonElements .= '
    <a href="https://' . $accessUrl . '" target="blank_" type="button" class="background-colorfull2" aria-label="Visit">' . $linkIcon . '</a>
        ';

  if ($downloadUrl) $buttonElements .= '
    <a href="https://' . $downloadUrl . '" type="button" class="background-colorfull2" aria-label="Download"><i class="fas fa-download"></i></a>
        ';

  if ($modalPlay) $buttonElements .= '
    <a href="javascript:void();" class="background-colorfull2" aria-label="Play" type="button" data-bs-toggle="modal" data-bs-target="#' . $modalPlay . '" data-toggle="modal" data-target="#' . $modalPlay . '"><i class="fas fa-play"></i></a>
        ';

  if ($codeUrl) $buttonElements .= '
    <a href="https://github.com/' . $codeUrl . '" target="_blank" rel="noopener" class="background-colorfull3" aria-label="Source code"> <i class="fas fa-code"></i> </a>
        ';

  echo '
  <div class="col-lg-4 portfolio-item ' . $filters . '" id="' . $id . '">
    <div class="image-border">
        ' . $loadingIndicatorElement . '
      <div class="portfolio-item-content" ' . $displayFileRatioProperty . '>
        ' . $displayElement . '
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
      <?php TitleBar("My Works")->show(); ?>
      <!-- CATEGORIZE FILTERS -->
      <div class="row mb-0">
        <!--   Portfolio Filters   -->
        <ul id="radio-button-group" class="list-unstyled list-inline mb-0 col-lg-12 text-center radio-button-group">
          <li class="button-border list-inline-item">
            <a href="#" data-filter=".highlight" class="button active" aria-label="Highlight filter"><i class="fas fa-star fa-xs"></i> Highlight</a>
          </li>
          <li class="button-border list-inline-item">
            <a href="#" data-filter="*" class="button"><i class="fas fa-globe fa-xs" aria-label="All filter"></i> All</a>
          </li>
          <li class="button-border list-inline-item">
            <a href="#" data-filter=".game" class="button" aria-label="Game filter"><i class="fas fa-gamepad fa-xs"></i> Game</a>
          </li>
          <!-- <li class="button-border list-inline-item">
            <a href="#" data-filter=".cg" class="button" aria-label="CG filter"><i class="fas fa-cube fa-xs"></i> CG</a>
          </li> -->
          <!-- <li class="button-border list-inline-item">
            <a href="#" data-filter=".model" class="button" aria-label="Model filter"><i class="fas fa-cube fa-xs"></i> Model</a>
          </li> -->
          <li class="button-border list-inline-item">
            <a href="#" data-filter=".art" class="button" aria-label="Art filter"><i class="fas fa-palette fa-xs"></i> Art</a>
          </li>
          <li class="button-border list-inline-item">
            <a href="#" data-filter=".utility" class="button" aria-label="Utility filter"><i class="fas fa-tools fa-xs"></i> Utility</a>
          </li>
          <li class="button-border list-inline-item">
            <a href="#" data-filter=".ecommerce" class="button" aria-label="eCommerce filter"><i class="fas fa-shopping-cart fa-xs"></i> eCommerce</a>
          </li>
          <li class="button-border list-inline-item">
            <a href="#" data-filter=".marketing" class="button" aria-label="Marketing filter"><i class="fas fa-bullhorn fa-xs"></i> Marketing</a>
          </li>
          <!-- <li class="button-border list-inline-item">
                                                        <a href="#" data-filter=".cms" class="button" aria-label="CMS filter"><i class="fas fa-users fa-xs"></i> CMS</a>
                                                </li> -->
          <li class="button-border list-inline-item">
            <a href="#" data-filter=".academia" class="button" aria-label="Academia filter"><i class="fas fa-graduation-cap fa-xs"></i> Academia</a>
          </li>
        </ul>
      </div>
      <!-- // TODO: Collapsable for simple UI -->
      <!-- SUB-FILTERS -->
      <div class="row justify-content-around sub-filters mt-0">
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
      <!-- TECH FILTERS -->
      <!-- // TODO: Customize filters for each categorize -->
      <div class="container mt-4" id="tech-filters">
        <?php
        Flexbox()
          ->Checkbox(label: "Database", value: ".database")
          ->Checkbox(label: "Realtime", value: ".realtime")
          ->Checkbox(label: "Cloud", value: ".cloud")
          ->Checkbox(label: "API", value: ".api")
          ->Checkbox(label: "AI/ML", value: ".ai")
          ->Checkbox(label: "AR", value: ".ar")
          ->Checkbox(label: "VR", value: ".vr")
          ->Checkbox(label: "BE", value: ".be")
          ->Checkbox(label: "FE", value: ".fe")
          ->show();
        ?>
      </div>

      <!-- // FIX: each mp4 file is loaded twice (DevTools -> Network) -->
      <div class="portfolio-items row">
        <?php
        //$isGalleryItem = false, $filters, $label, $accessUrl = null, $codeUrl = null
        $FULL_HD = '1920/1080';

        displayPortfolioItem(
          label: 'RPG Prototype',
          displayFileExtension: 'mp4',
          displayFileRatio: '736/334',
          filters: 'game highlight prototype',
        );
        displayPortfolioItem(
          label: 'Tower Defense Prototype',
          displayFileExtension: 'mp4',
          displayFileRatio: '600/274',
          filters: 'game highlight prototype',
        );
        displayPortfolioItem(
          label: 'FPS Prototype',
          displayFileExtension: 'mp4',
          displayFileRatio: '600/273',
          filters: 'game highlight prototype',
        );
        displayPortfolioItem(
          label: 'Eat Em Up',
          displayFileExtension: 'mp4',
          displayFileRatio: '1100/499',
          filters: 'game prototype',
        );
        displayPortfolioItem(
          label: 'The Turret',
          displayFileExtension: 'mp4',
          displayFileRatio: '933/468',
          filters: 'game prototype',
        );
        displayPortfolioItem(
          label: 'Air Hockey',
          displayFileExtension: 'mp4',
          displayFileRatio: '1916/854',
          filters: 'game prototype',
        );
        displayPortfolioItem(
          label: 'Creek',
          displayFileExtension: 'mp4',
          displayFileRatio: '1200/487',
          filters: 'art completed',
        );
         displayPortfolioItem(
          label: 'Jumping Lamp',
          displayFileExtension: 'mp4',
          displayFileRatio: '600/338',
          filters: 'art completed',
        );
          displayPortfolioItem(
          label: 'Bowling',
          displayFileExtension: 'mp4',
          displayFileRatio: '600/338',
          filters: 'art completed',
        );
          displayPortfolioItem(
          label: 'Food 3D Icon',
          displayFileExtension: 'jpg',
          displayFileRatio: '1812/898',
          filters: 'art completed',
        );
         displayPortfolioItem(
          label: 'Modular Dungeon',
          displayFileExtension: 'jpg',
          displayFileRatio: '1920/1046',
          filters: 'art completed',
        );
         displayPortfolioItem(
          label: 'Chess',
          displayFileExtension: 'jpg',
          displayFileRatio: '2048/1162',
          filters: 'art completed',
        );
        displayPortfolioItem(
          label: 'Unity Design Patterns In Depth',
          displayFileExtension: 'png',
          displayFileRatio: '600/270',
          filters: 'highlight large academia completed',
          codeUrl: 'enginooby-academics/unity-design-patterns-in-depth'
        );
        displayPortfolioItem(
          label: 'Endless Flight',
          displayFileExtension: 'mp4',
          displayFileRatio: '768/432',
          filters: 'highlight game large web completed',
          accessUrl: 'enginooby.itch.io/endless-flight',
          codeUrl: 'enginooby-games/endless-flight'
        );
        displayPortfolioItem(
          label: 'Generic Tic Tac Toe',
          displayFileRatio: '180/90',
          filters: 'highlight game medium web completed realtime',
          accessUrl: 'enginoobz-threejs.herokuapp.com',
          codeUrl: 'enginooby-university/three-js/blob/master/src/client/tasks/tic-tac-toe.ts'
        );
        displayPortfolioItem(
          label: 'Guess The Word',
          displayFileRatio: '100/74',
          filters: 'game small web prototype',
          modalPlay: 'guess-the-word-play',
          codeUrl: 'enginooby-games/guess-the-word'
        );
        displayPortfolioItem(
          label: 'Personal Website',
          isInjectedItem: true,
          injectedClasses: ' glass-style',
          injectedFile: 'hero.php',
          filters: 'highlight marketing web be fe database cloud ongoing medium',
          codeUrl: 'enginooby-projects/personal-site'
        );
        displayPortfolioItem(
          label: 'Tony The Runner',
          displayFileExtension: 'mp4',
          displayFileRatio: '896/502',
          filters: 'game medium web completed',
          accessUrl: 'enginooby.itch.io/tony-the-runner',
          codeUrl: 'enginooby-games/tony-the-runner'
        );
        //TODO: setInterval change style by modify class name of style in the section wrapper
        displayPortfolioItem(
          label: 'Dynamic UI Framework',
          isInjectedItem: true,
          injectedClasses: ' glass-style background-1',
          injectedFile: '../dui/demo/index-injectable.php',
          filters: 'highlight web fe utility ongoing large',
          accessUrl: 'enginooby.com/dui/demo',
          codeUrl: 'enginooby-projects/dui'
        );
        displayPortfolioItem(
          label: 'The Maze',
          displayFileRatio: $FULL_HD,
          filters: 'game small web prototype',
          modalPlay: 'the-maze-play',
          codeUrl: 'enginooby-university/unity-laboratories'
        );
        displayPortfolioItem(
          label: 'Breakout',
          displayFileRatio: '143/107',
          filters: 'game small web prototype',
          modalPlay: 'breakout-play',
          codeUrl: 'enginooby-games/breakout2'
        );
        displayPortfolioItem(
          label: 'Project Boost',
          displayFileRatio: '148/80',
          filters: 'game small web prototype',
          modalPlay: 'project-boost-play',
          codeUrl: 'enginooby-games/project-boost'
        );
        displayPortfolioItem(
          label: 'Racing',
          displayFileRatio: '99/74',
          filters: 'game small web prototype',
          // modalPlay: 'project-boost-play',
          codeUrl: 'enginooby-games/racing'
        );
        displayPortfolioItem(
          label: 'Shader Playground',
          displayFileRatio: '153/64',
          filters: 'art small web ongoing',
          modalPlay: 'shader-playground-play',
          codeUrl: 'enginooby-cg/shader-playground'
        );
        displayPortfolioItem(
          label: 'Newton Cradle',
          displayFileRatio: '192/90',
          filters: 'game medium web completed',
          accessUrl: 'enginoobz-threejs.herokuapp.com',
          codeUrl: 'enginooby-university/three-js/blob/master/src/client/tasks/newton_cradle.ts'
        );
        displayPortfolioItem(
          label: 'MeowMeow Brand',
          displayFileRatio: '248/350',
          filters: 'design completed',
        );
        displayPortfolioItem(
          label: 'The Train',
          isGalleryItem: true,
          displayFileRatio: '192/107',
          filters: 'art web completed',
          accessUrl: 'enginooby.itch.io/unity-laboratories',
        );
        displayPortfolioItem(
          label: 'The Well',
          displayFileRatio: $FULL_HD,
          filters: 'art small',
        );
        displayPortfolioItem(
          label: 'The Village',
          displayFileRatio: $FULL_HD,
          filters: 'art small',
        );
        displayPortfolioItem(
          label: 'The Pyramid',
          displayFileRatio: $FULL_HD,
          filters: 'art small',
        );
        displayPortfolioItem(
          label: 'Multistore Shopping GUI',
          displayFileRatio: '87/68',
          filters: 'ecommerce medium desktop be fe completed database',
          downloadUrl: 'enginooby.com/download/Multistore%20Shopping%20GUI.rar',
          codeUrl: 'enginooby-ecommerce/multistore-shopping-gui',
        );
        displayPortfolioItem(
          label: 'The Dark Diary',
          displayFileRatio: '123/77',
          accessUrl: 'enginooby.com/projects/the-dark-diary',
          filters: 'utility small web be fe database prototype ',
          codeUrl: 'enginooby-utilities/the-dark-diary'
        );
        displayPortfolioItem(
          label: 'Weather Getter',
          displayFileRatio: '993/688',
          filters: 'utility small web be fe prototype api',
          accessUrl: 'enginooby.com/nodejs/weather-getter',
          codeUrl: 'enginooby-utilities/weather-getter'
        );
        displayPortfolioItem(
          label: 'Corona Scraper',
          displayFileRatio: '1512/806',
          accessUrl: 'enginooby.com/projects/Corona%20Checker/',
          filters: 'utility small web fe completed ',
          codeUrl: 'enginooby-utilities/corona-scraper'
        );
        displayPortfolioItem(
          label: 'Trillo',
          displayFileRatio: '1539/1497',
          accessUrl: 'enginooby.com/projects/trillo',
          filters: 'marketing small web fe completed ',
          codeUrl: 'enginooby-marketing/trillo'
        );
        displayPortfolioItem(
          label: 'Photo Enhancement',
          isGalleryItem: true,
          displayFileRatio: '297/197',
          filters: 'design completed',
        );
        ?>
      </div>
      <!-- <div class="row mt-4">
                                        <div class="col-12 text-center pt-2">
                                                <div class="button-border d-inline-block">
                                                        <a href="portfolio.html" class="button">Portfolio Page</a>
                                                </div>
                                        </div>
                                </div> -->
    </div>
  </div>
</div>