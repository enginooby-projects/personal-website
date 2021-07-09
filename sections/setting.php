<div id="color-switcher" class="color-switcher">
        <div class="text-center color-pallet hide">
                <div class="color-pallet-content">
                        <ul class="theme-skin mb-1" id="ui-style-panel">
                                <h6 class="theme-skin-title">UI Style</h6>
                                <div class="button-border" id="flat-skin-button">
                                        <a href="javascript:void(0)" class="pill-button">Flat</a>
                                </div>
                                <div class="button-border" id="neo-skin-button">
                                        <a href="javascript:void(0)" class="pill-button">Neumorphism</a>
                                </div>
                                <div class="button-border" id="glass-skin-button">
                                        <a href="javascript:void(0)" class="pill-button">Glassmorphism</a>
                                </div>
                        </ul>

                        <div id="customizer-panel">
                                <div class="customizer" id="neo-customizer">
                                        <h6 class="text-center mt-0"> Customize</h6>
                                        <div class="range-slider">
                                                <label for="distance">Distance</label>
                                                <input class="range-slider__range" id="distance" type="range" min="0" max="20" step="0.1">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                        <div class="range-slider">
                                                <label for="blur">Blur</label>
                                                <input class="range-slider__range" id="blur" type="range" min="0" max="20" step="0.1">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                        <div class="range-slider">
                                                <label for="light-intensity">Light intensity</label>
                                                <input class="range-slider__range" id="light-intensity" type="range" min="1" max="20" step="0.1">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                        <div class="range-slider">
                                                <label for="dark-intensity">Dark intensity</label>
                                                <input class="range-slider__range" id="dark-intensity" type="range" min="1" max="20" step="0.1">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                </div>
                                <div class="customizer" id="flat-customizer-in-progress">
                                        <h6 class="text-center mt-0"> Customize</h6>
                                        <div class="range-slider">
                                                <label for="distance">Distance</label>
                                                <input class="range-slider__range" id="distance" type="range" min="0" max="50" step="0.5">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                        <div class="range-slider">
                                                <label for="blur">Blur</label>
                                                <input class="range-slider__range" id="blur" type="range" min="0" max="100" step="0.5">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                        <div class="range-slider">
                                                <label for="light-intensity">Light intensity</label>
                                                <input class="range-slider__range" id="light-intensity" type="range" min="1" max="20" step="0.1">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                        <div class="range-slider">
                                                <label for="dark-intensity">Dark intensity</label>
                                                <input class="range-slider__range" id="dark-intensity" type="range" min="1" max="20" step="0.1">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                </div>
                                <div class="customizer" id="glass-customizer-in-progress">
                                        <h6 class="text-center mt-0"> Customize</h6>
                                        <div class="range-slider">
                                                <label for="transparency">Transparency</label>
                                                <input class="range-slider__range" id="transparency" type="range" min="0" max="50" step="0.5">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                        <div class="range-slider">
                                                <label for="blur">Blur</label>
                                                <input class="range-slider__range" id="blur" type="range" min="0" max="100" step="0.5">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                        <div class="range-slider">
                                                <label for="light-intensity">Light intensity</label>
                                                <input class="range-slider__range" id="light-intensity" type="range" min="1" max="20" step="0.1">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                        <div class="range-slider">
                                                <label for="dark-intensity">Dark intensity</label>
                                                <input class="range-slider__range" id="dark-intensity" type="range" min="1" max="20" step="0.1">
                                                <span class="range-slider__value">
                                                        <div class="inner-text"></div>
                                                </span>
                                        </div>
                                </div>
                        </div>

                        <div id="colour-panel">
                                <h6 class="text-center mt-3"> Colour</h6>
                                <div class="row px-4">
                                        <div class="col-6 p-0">
                                                <label for="highlight-color-picker">Highlight</label>
                                                <input type="color" id="highlight-color-picker" value="#0000ff">
                                        </div>
                                        <div class="col-6 p-0">
                                                <label for="scheme-color-picker">Scheme</label>
                                                <input type="color" id="scheme-color-picker" value="#f1f3f6">
                                        </div>
                                </div>
                                <div class="row mt-3 px-4 justify-content-center">
                                        <label>Colourful elements</label>
                                </div>
                                <div class="row mt-1 px-4">
                                        <div class="col-4 p-0 ">
                                                <input class="color-picker" type="color" id="colorfull1-picker" value="#00a584">
                                        </div>
                                        <div class="col-4 p-0 ">
                                                <input class="color-picker" type="color" id="colorfull2-picker" value="#ebbc00">
                                        </div>
                                        <div class="col-4 p-0">
                                                <input class="color-picker" type="color" id="colorfull3-picker" value="#e93666">
                                        </div>
                                </div>
                        </div>

                        <div id="border-panel" class="mt-3 mb-3">
                                <h6 class="text-center "> Border</h6>
                                <div class="range-slider">
                                        <label for="border-radius">Radius</label>
                                        <input class="range-slider__range" id="border-radius" type="range" min="0" max="50" step="1">
                                        <span class="range-slider__value">
                                        </span>
                                </div>
                        </div>

                </div>
        </div>
        <div class="pallet-border hide">
                <div class="pallet-button">
                        <a href="#" class="cp-toggle"><i class="fa fa-cog fa-spin"></i></a>
                </div>
        </div>
</div>