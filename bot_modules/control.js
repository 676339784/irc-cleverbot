function alphanumeric(str) {
	return str.replace(/[^a-z0-9_-`]/gi, '');
}

module.exports = function(client, moduleEvent) {
	client.addListener('message', (from, to, text, raw) => {
		if(to === client.nick) to = from;

		var args = text.split(' '),
			cmd = (args.splice(0, 1)[0] + ' ').substr(1).trim();

		switch(cmd) {
			case 'say':
				client.say(to, args.join(' '));
				break;

			case 'join':
				args.forEach(chan => {
					if(chan[0] !== '#') return;
					client.join(chan);
				});
				break;
			case 'meme':
				var letters = args.join('').split('');
				var string='';
				for (i = 0; i < letters.length; i++) {
				    string=string+letters[i]+' ';
				}
				client.say(to,string);
				for (i=1; i<letters.length;i++){
					client.say(to,letters[i]);
				}
				break;
			case 'part':
				if(args.length === 0 && to[0] === '#') args[0] = to;

				args.forEach(chan => {
					if(chan[0] !== '#') return;
					client.part(chan, 'requested by ' + from);
				});

				break;

			case 'quit':
				client.say(to, 'no');
				break;

			case 'nick':
				var nick = alphanumeric(args[0]).substr(0, 16);
				if(nick !== '') client.send('NICK', nick);
				break;
		}
	});
	
	client.addListener('invite', (chan, from) => {
		//client.notice(from, 'Thanks ' + from + ' for inviting me to ' + chan);
		client.join(chan);
	});
};
