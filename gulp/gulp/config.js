var srcAssets         = 'app/_assets';
var developmentAssets = 'build/assets';
var productionAssets  = 'build/production/assets';

module.exports = {
  scsslint: {
    src: [
      srcAssets + '/scss/**/*.{sass,scss}',
      '!' + srcAssets + '/scss/base/_sprites.scss'
    ],
    options: {
      bundleExec: true
    }
  },
  jshint: {
    src: srcAssets + '/javascripts/*.js'
  },
  coffeelint: {
    src: [
      srcAssets + '/coffee/**/*.coffee',
    ]
  },
  coffee: {
    src: [
      srcAssets + '/coffee/**/*.coffee',
    ],
    dest: developmentAssets + '/js/'
  },
  sass: {
    src: [
      srcAssets + '/scss/**/*.{sass,scss}'
    ],
    dest: developmentAssets + '/css/',
    cssMin: {
      options: {
        keepSpecialComments: 0
      }
    },
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
  delete: {
    src: {
      dev: [developmentAssets],
      pro: [productionAssets]
    }
  },
  sprites: {
    src: srcAssets + '/images/sprites/icon/*.{png,jpg}',
    dest: {
      css: srcAssets + '/scss/base/',
      image: srcAssets+ '/images/sprites/'
    },
    options: {
      cssName: '_sprites.scss',
      cssFormat: 'css',
      cssOpts: {
        cssClass: function (item) {
          // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
          if (item.name.indexOf('-hover') !== -1) {
            return '.icon-' + item.name.replace('-hover', ':hover');
            // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
          } else {
            return '.icon-' + item.name;
          }
        }
      },
      imgName: 'icon-sprite.png',
      imgPath: '/assets/images/sprites/icon-sprite.png'
    }
  },
  optimize: {
    js: {
      src:  developmentAssets + '/js/**/*.js',
      dest: productionAssets + '/js/',
      options: {}
    },
    css: {
      src:  developmentAssets + '/css/**/*.css',
      dest: productionAssets + '/css/',
      options: {
        keepSpecialComments: 0
      }
    },
    html: {
      src:  developmentAssets + '/html/**/*.html',
      dest: productionAssets + '/html/',
      options: {
        collapseWhitespace: true
      }
    }
  },
  copy: {
    html: {
      src: srcAssets + '/html/**/*.html',
      dest: developmentAssets + '/html/',
      options: {}
    },
    image: {
      src: srcAssets + '/images/**/*.{png.jpn}',
      dest: developmentAssets + '/images/',
    }
  }
};
