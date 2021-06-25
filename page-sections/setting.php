<div id="color-switcher" class="color-switcher">
        <div class="text-center color-pallet hide">
                <h6 class="theme-skin-title">UI Style</h6>
                <ul class="theme-skin list-inline">
                        <li class="list-inline-item">
                                <a href="javascript:void(0)" class="flat-skin active">Flat</a>
                        </li>
                        <li class="list-inline-item">
                                <a href="javascript:void(0)" class="neo-skin">Neo</a>
                        </li>
                </ul>
                </ul>
                <div class="range-slider">
                        <label for="distance">Distance</label>
                        <input class="range-slider__range" id="distance" type="range" min="0" max="50" step="0.5">
                        <span class="range-slider__value"></span>
                </div>

                <div class="range-slider">
                        <label for="blur">Blur</label>
                        <input class="range-slider__range" id="blur" type="range" min="0" max="100" step="0.5">
                        <span class="range-slider__value"></span>
                </div>
                <div class="range-slider">
                        <label for="light-intensity">Light intensity</label>
                        <input class="range-slider__range" id="light-intensity" type="range" min="1" max="20" step="0.1">
                        <span class="range-slider__value"></span>
                </div>
                <div class="range-slider">
                        <label for="dark-intensity">Dark intensity</label>
                        <input class="range-slider__range" id="dark-intensity" type="range" min="1" max="20" step="0.1">
                        <span class="range-slider__value"></span>
                </div>

                <br>
                <button type="button" class="btn btn-primary" id="test1">Test</button>
                <button type="button" class="btn btn-primary" id="test2">Test</button>

                <h6 class="text-center mt-3"> Color</h6>
                <!-- <ul class="pattern">
                        <li>
                                <a class="color1" href="#"></a>
                        </li>
                        <li>
                                <a class="color2" href="#"></a>
                        </li>
                        <li>
                                <a class="color3" href="#"></a>
                        </li>
                        <li>
                                <a class="color4" href="#"></a>
                        </li>
                        <li>
                                <a class="color5" href="#"></a>
                        </li>
                        <li>
                                <a class="color6" href="#"></a>
                        </li>
                        <li>
                                <a class="color7" href="#"></a>
                        </li>
                        <li>
                                <a class="color8" href="#"></a>
                        </li>
                        <li>
                                <a class="color9" href="#"></a>
                        </li>
                </ul> -->
                <input type="color" id="highlight-color-picker" value="#0000ff">
                <input type="color" id="scheme-color-picker" value="#f1f3f6">
                <h6 class="my-2 color-scheme-title">Scheme Mode</h6>
                <ul class="color-scheme list-inline">
                        <!-- TODO: Change to switch style -->
                        <li class="list-inline-item">
                                <a href="javascript:void(0)" class="light-scheme active"><i class="lni-sun"></i> Light</a>
                        </li>
                        <li class="list-inline-item">
                                <a href="javascript:void(0)" class="dark-scheme-option"><i class="lni-night"></i> Dark</a>
                        </li>
                </ul>
        </div>
        <div class="pallet-button hide">
                <a href="#" class="cp-toggle"><i class="fa fa-cog fa-spin"></i></a>
        </div>
</div>