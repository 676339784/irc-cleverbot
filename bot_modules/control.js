function alphanumeric(str) {
	return str.replace(/[^a-z0-9_-`]/gi, '');
}

module.exports = function(client, moduleEvent) {
	client.addListener('message', (from, to, text, raw) => {
		if(to === client.nick) to = from;

		var args = text.split(' '),
			cmd = (args.splice(0, 1)[0] + ' ').trim();
		switch(cmd) {
			case 'lok':
			case 'lol':
				client.say(to,'lol');
				break;
				
			case 'zoz':
				list=['zozzle','zim zam','zooperz','zezezez','zimbabwe','shoes on sizzle'];
				client.say(to,list[Math.floor((Math.random()*6))]);
				break;

			case '.home':
			case '.homescreen':
			case '.homescreens':
				client.say(to,'http://homescreens.org/');
				break;

			case '??':
				client.say(to,'? ???????????????????????????????');
				break;

			case '.meme':
			case '.h':
				var letters = args.join('').trim().substr(0, 16).split('');
				var string='';
				for (i = 0; i < letters.length; i++) {
				    string=string+letters[i]+' ';
				}
				client.say(to,string);
				for (i=1; i<letters.length;i++){
					client.say(to,letters[i]);
				}
				break;

			case 'wops':
			case 'whoops':
			case 'woops':
				client.say(to,'OOPS');
				break;

			case 'o':
				if (args[0]=='shit'){
					client.say(to,'waddup');
				}
				break;

			case 'dude':
				client.say(to,'weed');
				client.say(to,'lmao');
				break;

			case '5':
			case 'five':
				if (args[0]=='cute' && (args[3]=='maki' || args[3]=='maki:')){
					client.say(to, "- She's a girl!");
					client.say(to, "- She's a tomato!");
					client.say(to, "- I love her!!!!!");
					client.say(to, "- Maki!!!!!!!!!!!");
				}
				else if (args[0]=='facts' && (args[2]=='maki' || args[2]=='maki:')){
					client.say(to, "- She's a girl!");
					client.say(to, "- She's a tomato!");
					client.say(to, "- I love her!!!!!");
					client.say(to, "- Maki!!!!!!!!!!!");
				}
				break;

			case '.rape':
			case '.kill':
			case '.slap':
			case '.yiff':
			case '.lewd':
				client.say(to, '.rape '+ from);
				break;

			case '.sell':
			case '.buy':
				if(Math.floor((Math.random() * 3) + 1)==1){
					client.say(to, '.sell '+ from);
				}
				break;

			case 'eat':
				client.action(to, 'eats ' + args[0]);
				break;

			case '.quit':
			case '.leave':
				client.say(to, 'no');
				break;

			case 'woof':
			case 'woof!':
				client.action(to, 'eats '+ from);
				break;

			case 'meme':
				client.say(to, 'i love memes!');
				break;
		}
	});
	
	client.addListener('invite', (chan, from) => {
		//client.notice(from, 'Thanks ' + from + ' for inviting me to ' + chan);
		client.join(chan);
		client.say(chan,"Thanks for inviting me! I'll be at your service. For more information and a list of bot commands, you can visit https://goo.gl/6i1Xby");
	});
	client.addListener('message#CHANGE', function (from, message) {
	    console.log(from + ' => #CHANGE: ' + message);
	    		var args = message.split(' '),
				cmd = (args.splice(0, 1)[0] + ' ').trim();

		switch(cmd) {
	    	case 'join':
				args.forEach(chan => {
					if(chan[0] !== '#'){
						client.join('#'+chan);
					}
					client.join(chan);
				});
				break;

			case 'id':
				client.say("nickserv", "identify " + 'CHANGE');
				break;

			case 'say':
			case 'tell':
				if(args[0][0] !== '#'){
					chan='#'+args[0];
				}
				args.splice(0,1);
				client.say(chan, args.join(' '));
				break;

			case 'reset':
			case 'rejoin':
			case 'restart':
				if(args.length === 0 && to[0] === '#') args[0] = to;

				args.forEach(chan => {
					if(chan[0] !== '#'){
						chan='#'+chan;
					}
					client.part(chan);
					setTimeout(fun(chan),4000);

					function fun(var1){
					    return function(){
					    	client.join(var1);
					    }
					}
				});
				break;	

			case 'part':
				if(args.length === 0 && to[0] === '#') args[0] = to;

				args.forEach(chan => {
					if(chan[0] !== '#'){
						client.part('#'+chan);
					}
					client.part(chan);
				});
				break;

			case 'nick':
				var nick = alphanumeric(args[0]).substr(0, 16);
				if(nick !== '') client.send('NICK', nick);
				break;

		}
	});
};
