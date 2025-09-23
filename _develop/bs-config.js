/**  ↓--------------------------------↓  
このファイルは弄らないです。
パスの設定はpackage.jsonのconfigにあります
↑------------------------------------↑*/

const paths = require('./paths.cjs');
const connectSSI = require('connect-ssi');
// const historyApiFallback = require('connect-history-api-fallback');
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
  ui: {
    port: 3001,
  },
  files: `${paths.appDest}**/*`,
  watchEvents: ['change'],
  server: {
    baseDir: `${paths.appDest}`,
  },
  startPath: paths.subDirectory,
  watch: false,
  ignore: [],
  single: false,
  watchOptions: {
    ignoreInitial: true,
  },
  proxy: false,
  port: 3000,
  middleware: [
    // historyApiFallback(),
    connectSSI({
      baseDir: paths.appDest,
      ext: '.html',
    }),
  ],
  serveStatic: [],
  ghostMode: {
    clicks: false,
    scroll: false,
    location: false,
    forms: {
      submit: false,
      inputs: false,
      toggles: false,
    },
  },
  logLevel: 'info',
  logPrefix: 'Browsersync',
  logConnections: false,
  logFileChanges: true,
  logSnippet: true,
  rewriteRules: [],
  open: 'external',
  browser: 'default',
  cors: false,
  xip: false,
  hostnameSuffix: false,
  reloadOnRestart: false,
  notify: true,
  scrollProportionally: false,
  scrollThrottle: 0,
  scrollRestoreTechnique: 'window.name',
  scrollElements: [],
  scrollElementMapping: [],
  reloadDelay: 0,
  reloadDebounce: 1000,
  reloadThrottle: 0,
  plugins: [],
  injectChanges: true,
  minify: false,
  host: null,
  localOnly: false,
  codeSync: true,
  timestamps: false,
  clientEvents: ['scroll', 'scroll:element', 'input:text', 'input:toggles', 'form:submit', 'form:reset', 'click'],
  socket: {
    socketIoOptions: {
      log: false,
    },
    socketIoClientConfig: {
      reconnectionAttempts: 50,
    },
    path: '/browser-sync/socket.io',
    clientPath: '/browser-sync',
    namespace: '/browser-sync',
    clients: {
      heartbeatTimeout: 5000,
    },
  },
  tagNames: {
    less: 'link',
    scss: 'link',
    css: 'link',
    jpg: 'img',
    jpeg: 'img',
    png: 'img',
    svg: 'img',
    gif: 'img',
    js: 'script',
  },
  injectNotification: false,
};
