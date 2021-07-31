var gulp = require('gulp');
const plugins = require('gulp-load-plugins')({ lazy: false });
const log = require('fancy-log');
const critical = require('critical');

// TODO: [watch all scss - build]
function extractCriticalCss() {
        return gulp
                .src('page.html')
                .pipe(
                        critical.stream({
                                // parent dir for target files
                                // base: './test',
                                targetd: {
                                        // output critical css
                                        css: 'critical.css',
                                },
                                inline: 'true',
                                ignore: {
                                        // fonts are already preloaded
                                        atrule: ['@font-face'],
                                },
                        })
                )
                .on('error', err => {
                        log.error(err.message);
                })
                .pipe(gulp.dest('index.html'));
}

exports.default = extractCriticalCss;


