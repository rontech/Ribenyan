Package.describe({
  name: 'xunyangjian:accounts-webmobilewechat',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.1');
  api.use('ecmascript');
  // api.mainModule('accounts-webmobilewechat.js');

  api.use(['underscore', 'random']);
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);

  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use(['underscore', 'random', 'service-configuration'], ['client', 'server']);
  api.use(['templating'], 'client');


  api.export('MeteorWebWeChat');

  api.addFiles('webwechat_server.js', 'server');
  api.addFiles('webwechat.js','client');
  api.addFiles('webwechat_browser.js','web.browser');
 });

// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('xunyangjian:accounts-webmobilewechat');
//   api.mainModule('accounts-webmobilewechat-tests.js');
// });
