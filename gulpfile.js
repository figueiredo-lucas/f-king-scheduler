var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var connect = require('gulp-connect');

gulp.task('default', ['wiredep', 'server']);

gulp.task('wiredep', function() {
    gulp.src('./app/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./app'));
});

gulp.task('server', function() {
    connect.server({
        root: 'app',
        port:3000,
        middleware: function(connect) {
            return [connect().use('/bower_components', connect.static('bower_components'))];
        }
    });
});