import phpConnect from 'gulp-connect-php'

const server = () => {
  app.plugins.browserSync.init({
    server: {
      baseDir: `${app.path.build.html}`,
      notify: false,
      open: true,
      port: 3000,
    }
  })
}

export default server