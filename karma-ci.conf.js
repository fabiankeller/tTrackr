// use PhantomJS in the ci environment

var commonConfig = require('./karma.conf');
module.exports = function (config) {
  var cfg = commonConfig(config);
  cfg.plugins.push(require('karma-phantomjs-launcher'));
  cfg.browsers = ['PhantomJS'];
  config.set(cfg);
};
