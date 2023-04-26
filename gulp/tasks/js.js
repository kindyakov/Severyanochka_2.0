import webpackStream from 'webpack-stream'
import webpack from 'webpack'

const js = () => {
  return (
    app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
      .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'JS',
          message: 'Error: <%= error.message %>'
        })
      ))
      .pipe(webpackStream({
        mode: app.isBuild ? 'production' : 'development',
        entry: {
          main: 'D:/Developer/Severyanochka_2.0/src/js/main.js',
          admin: 'D:/Developer/Severyanochka_2.0/src/js/admin.js',
          catalog_product: 'D:/Developer/Severyanochka_2.0/src/js/catalog_product.js',
          profile: 'D:/Developer/Severyanochka_2.0/src/js/profile.js',
          registration: 'D:/Developer/Severyanochka_2.0/src/js/registration.js',
        },
        output: {
          filename: '[name].min.js'
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            }
          ]
        },
      }), webpack)
      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browserSync.stream())
  )
}

export default js