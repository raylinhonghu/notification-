const NotificationCenter = require('node-notifier').NotificationCenter;

var notifier = new NotificationCenter({
  withFallback: false, // Use Growl Fallback if <= 10.8
  customPath: void 0 // Relative/Absolute path to binary if you want to use your own fork of terminal-notifier
});
// String
notifier.notify('Message');

// Object
notifier.notify({
  title: 'My notification',
  message: 'Hello, there!'
});
