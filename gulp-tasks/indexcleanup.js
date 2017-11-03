module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('dist/index.html')
            .pipe(plugins.removeCode({
                production: true
            }))
            .pipe(gulp.dest('dist'));
        // plugins.del.sync('dist/main.min.js');
        // plugins.del.sync('dist/styles.min.css');
    };
};
