var data = require('gulp-data');

module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('app/**/*.+(html|nunjucks)')

            .pipe(data(function() {
                var data = require('./../app/data.json');
                var photodata = {};

                data.forEach(function(row) {
                    if (row.gallery) {
                        if (!photodata[row.name]) photodata[row.name] = [];
                        photodata[row.name].push(row);
                    }
                    if (!row.gallery) {
                        if (!photodata[row.name]) photodata[row.name] = row;
                    }
                })
                return {
                    data: photodata
                }
            }))

            .pipe(plugins.nunjucksRender({
                path: ['app/templates']
            }))
            .pipe(plugins.removeCode({
                tmp: true,
                build: true
            }))
            .pipe(gulp.dest('.tmp'))
            .pipe(plugins.browserSync.reload({
                stream: true
            }))
    };
};
