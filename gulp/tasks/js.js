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
          main: `./src/js/main.js`,
          admin: `./src/js/admin.js`,
          catalog_product: `./src/js/catalog_product.js`,
          profile: `./src/js/profile.js`,
          registration: `./src/js/registration.js`,
          basket: `./src/js/basket.js`,
          favourite: `./src/js/favourite.js`,
          order: `./src/js/order.js`,
          search: `./src/js/search.js`,
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