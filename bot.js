const config = require('./CONFIG.json');

var irc = require('irc'),
	requireall = require('require-all');

var client = new irc.Client(config.irchost, config.name, {
	userName: config.real,
	realName: config.name,
	channels: config.channels,
	floodProtection: true,
	floodProtectionDelay: 100
});

var botModules = requireall(__dirname + '/bot_modules');

for(var key in botModules) {
	if(botModules.hasOwnProperty(key) === false) continue;
	try {
		botModules[key](client, config);
	} catch(ex) {
		console.error('Error in custom module: ' + key);
		console.error(ex);
	}
}

// Logging
client.addListener('message', function(from, to, text, raw) {
	if(to === client.nick) to = from;
	console.log('[' + to + '] <' + from + '> ' + text);
});

client.addListener('error', function(err) {
	console.error('Error in irc protocol', err);
});

function terminate() {
	client.disconnect('cya nerds');
	process.exit();
}

var rl = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', function(line) {
	if(line.toLowerCase() === 'quit') terminate();
	client.send.apply(client, line.split(' '));
});

rl.on('SIGINT', terminate);
process.on('SIGINT', terminate);
