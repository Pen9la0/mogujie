var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass',function(){
    // 先查找sass文件所在目录
    gulp.src('src/sass/*.scss') // 返回文件流（液体，文件在内存中的状态）

    // scss->css
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))

    // 输出到硬盘
    .pipe(gulp.dest('src/css/'))
});


var browserSync = require('browser-sync');
gulp.task('myserver', () => {
    // 开启服务器
    browserSync({
        // server: './project/dist',
        // 代理服务器
        proxy:'http://localhost:484',
        // 端口
        port: 10087,
        files: ['./mogujie/sass/*.scss']
    });

    // 监听sass文件修改
    gulp.watch('src/sass/*.scss', ['sass']);
    // gulp.watch('src/js/*.js', ['minifyjs']);
});