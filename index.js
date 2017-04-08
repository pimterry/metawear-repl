var repl = require('repl');
var metawear = require('node-metawear');

function startRepl() {
  console.log('Searching...');
  metawear.discover((device) => {
    console.log('Discovered', device.id);
    console.log('Connecting...');

    device.on('disconnect', () => {
      console.log('disconnected from', device.id)
      startRepl();
    });

    device.connectAndSetup((error) => {
      if (error) {
          console.error('Error connecting to device', error);
      }

      var session = repl.start({ prompt: '> ', ignoreUndefined: true });
      session.context.device = device;
      session.on('exit', () => process.exit(0));
    });
  });
}

startRepl();
