var gulp = require("gulp");
var clean = require("gulp-clean");
var runSequence = require("run-sequence");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var htmlreplace = require("gulp-html-replace");
var sourcemaps = require("gulp-sourcemaps");
var cleanCSS = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");
var livereload = require("gulp-livereload");
var gutil = require("gulp-util");
var notify = require("gulp-notify");
var jshint = require("gulp-jshint");
var jsStylish = require("jshint-stylish");
var csslint = require("gulp-csslint");
var htmlhint = require("gulp-htmlhint");

csslint.addFormatter("csslint-stylish");

const PATHS = {
    DIST: {
        SRC: "./dist"
    },
    CSS: {
        SRC: "./app/css/**/*.css",
        DEST: "./dist/css"
    },
    HTML: {
        SRC: "./app/**/*.html",
        DEST: "./dist"
    },
    ROOT: {
        MANIFEST: {
            SRC: "./app/manifest.json"
        },
        SW: {
            SRC: "./app/service-worker.js"
        },
        DEST: "./dist"
    },
    JS: {
        LIB: "./app/lib/**/*.js",
        SRC: "./app/js/**/*.js",
        DEST: "./dist/js"
    },
    IMG: {
        SRC: "./app/images/**/*.*",
        DEST: "./dist/images"
    }
};

const AUTOPREFIXOPTIONS = {
    browsers: ["last 2 versions", "ie >= 8"]
};

gulp.task("watch", function() {
    livereload.listen();

    var jsWatcher = gulp.watch(PATHS.JS.SRC, ["copy-js"]);
    var cssWatcher = gulp.watch(PATHS.CSS.SRC, ["copy-css"]);
    var htmlWatcher = gulp.watch(PATHS.HTML.SRC, ["copy-html"]);
    var imgWatcher = gulp.watch(PATHS.IMG.SRC, ["copy-img"]);

    cssWatcher.on("change", watchEvent);
    jsWatcher.on("change", watchEvent);
    htmlWatcher.on("change", watchEvent);
    imgWatcher.on("change", watchEvent);
});

function watchEvent(event) {
    var file = event.path.match(/[^\\]*[.][a-zA-Z]+$/g)[0];
    var path = event.path.substr(0, event.path.length - file.length);
    gutil.log("File: " + path + gutil.colors.magenta.bold(file) + " was " + gutil.colors.green.bold(event.type));
}

gulp.task("default", ["build"]);

gulp.task("lint", ["lint-js", "lint-css", "lint-html"]);

gulp.task("build", function () {
    runSequence("clean", ["copy-html", "copy-root", "copy-css", "copy-js", "copy-img"], function () {
        gutil.log(gutil.colors.green("App build successful"));
    });
});

gulp.task("clean", function () {
    gulp.src(PATHS.DIST.SRC, {read: false})
        .pipe(clean());
});

gulp.task("copy-js", function () {
    gulp.src(PATHS.JS.SRC)
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(PATHS.JS.DEST))
        .pipe(livereload());
});

gulp.task("copy-root", function () {
    gulp.src([PATHS.ROOT.MANIFEST.SRC, PATHS.ROOT.SW.SRC])
        .pipe(gulp.dest(PATHS.ROOT.DEST));
});

gulp.task("copy-css", function () {
    gulp.src(PATHS.CSS.SRC)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(AUTOPREFIXOPTIONS))
        .pipe(concat("styles.min.css"))
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(PATHS.CSS.DEST))
        .pipe(livereload());
});

gulp.task("copy-html", function () {
    gulp.src(PATHS.HTML.SRC)
        .pipe(htmlreplace({"js": "js/bundle.min.js", "css": "css/styles.min.css"}))
        .pipe(gulp.dest(PATHS.HTML.DEST))
        .pipe(livereload());
});

gulp.task("copy-img", function () {
    gulp.src(PATHS.IMG.SRC)
        .pipe(gulp.dest(PATHS.IMG.DEST))
        .pipe(livereload());
});

gulp.task("lint-js", function() {
    gulp.src(PATHS.JS.SRC)
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish));

    gutil.log(gutil.colors.magenta("Javascript linted!"))
});

gulp.task("lint-css", function() {
    gulp.src(PATHS.CSS.SRC)
        .pipe(csslint())
        .pipe(csslint.formatter("stylish"));

    gutil.log(gutil.colors.magenta("CSS linted!"));
});


gulp.task("lint-html", function() {
    gulp.src(PATHS.HTML.SRC)
        .pipe(htmlhint())
        .pipe(htmlhint.reporter("htmlhint-stylish"));

    gutil.log(gutil.colors.magenta("HTML linted!"));
});