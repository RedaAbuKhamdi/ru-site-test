const gulp = require("gulp");
const hb = require('gulp-hb');
const data = require('gulp-data');
const rename = require('gulp-rename');
const fs = require('fs');
const mergeStream = require('merge-stream');
const fileInclude = require("gulp-file-include");

gulp.task('htmlVacancies', function() {

    const pagesData = JSON.parse(fs.readFileSync('./assets/vacancies.json', 'utf8'));


    let tasks = pagesData.vacancies.map(page => {
        return gulp.src('templates/vacancy.hbs')
            .pipe(data(() => Object.assign({}, pagesData, page)))
            .pipe(hb({}))
            .pipe(rename({
                basename: page.id,
                extname: '.html'
            }))
            .pipe(gulp.dest(`pages/ru.vacancies`));
    })
    return mergeStream(...tasks);
});

gulp.task("htmlIndex", function () {
    return gulp.src("pages/index.html")
        .pipe(fileInclude({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulp.dest("./"));
});

gulp.task("cleverappssgBuildStaging", function () {

});


gulp.task("default", gulp.series("htmlVacancies", "htmlIndex"));
