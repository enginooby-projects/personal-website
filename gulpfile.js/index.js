var gulp = require('gulp');
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

var open = require('gulp-open');
function serve() {
        // server URI is set up  in Live ServerWeb Chrome extension for now
        const liveServerUri = 'http://localhost:3000/';
        // file URI relative to the project root dir
        const fileUri = 'tasks/convert-php-files.php'
        return gulp.src(fileUri)
                .pipe(open({
                        uri: `${liveServerUri}${fileUri}`,
                        app: 'chrome' // google-chrome in Linux
                })).on('error', err => {
                        log.error(err.message);
                })
}

exports.default = serve;


