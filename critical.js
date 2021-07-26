var critical = require('critical');

critical.generate({
        inline: true,
        src: 'index-raw.html',
        target: {
                html: 'index.html',
                css: 'critical.min.css',
        },
        // css: ['assets/css/style.css', // auto detect all css files
        //         'https://use.fontawesome.com/releases/v5.15.0/css/all.css',
        //         'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        //         'assets/scss/pagepiling.css'],
        ignore: {
                atrule: ['@font-face'], // already preloaded
        },
});