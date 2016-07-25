var srcAssets = 'src/app/';
var buildAssets = 'build/';
var nodeModulesAssets = 'node_modules/';

module.exports = {
  delete: {
    src: ['build']
  },
  coffee: {
    src: [
      srcAssets + '**/*.coffee'
    ],
    dest: buildAssets + 'js/'
  },
  sass: {
    src: [
      srcAssets + '**/*.{sass,scss}'
    ],
    dest: buildAssets + 'css/',
    autoprefixer: {
      options: {
        browsers: [
          'last 2 versions',
          'safari 5',
          'ie 8',
          'ie 9',
          'opera 12.1',
          'ios 6',
          'android 4'
        ],
        cascade: true
      }
    }
  },
  browserSync: {
    src: buildAssets,
    watch: {
      src: [
        buildAssets + '**'
      ]
    }
  },
  copy: {
    html: {
      src: [
        srcAssets + '*.html'
      ],
      dest: buildAssets
    },
    favicon: {
      src: [srcAssets + 'favicon.ico'],
      dest: buildAssets
    },
    images: {
      src: [
        srcAssets + 'images/**/*'
      ],
      dest: buildAssets + 'images/'
    }
  },
  concat: {
    js: {
      src: [
        nodeModulesAssets + 'jquery/dist/jquery.js',
        nodeModulesAssets + 'fullpage.js/jquery.fullPage.js',
        buildAssets + '**/*.js'
      ],
      dest: buildAssets,
      source: 'index.js'
    },
    css: {
      src: [
        nodeModulesAssets + 'reset.css/reset.css',
        nodeModulesAssets + 'fullpage.js/jquery.fullPage.css',
        buildAssets + '**/*.css'
      ],
      dest: buildAssets,
      source: 'index.css'
    }
  }
}