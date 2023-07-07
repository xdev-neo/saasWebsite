const { watch, task, parallel, series, dest, src, pipe } = require("gulp")
const dartSass = require('sass')
const gulpSass = require('gulp-sass')
const autoPrefixer = require("gulp-autoprefixer")


const sass = gulpSass(dartSass)

const path = {
    style: {
        src: 'sass/main.scss',
        watch: 'sass/**/*.scss',
        dest: 'styles/'
    }
}

const compStyle = () => src(path.style.src).pipe(sass().on('error', sass.logError)).pipe(autoPrefixer()).pipe(dest(path.style.dest))

task(compStyle)


const watchStyle = () => watch(path.style.watch).on('change', () => compStyle())


task(watchStyle)

const startAll = () => series([compStyle, watchStyle])

exports.startAll = startAll()