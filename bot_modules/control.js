var fs = require('fs');
	adminfile='admins.txt';
	admins = fs.readFileSync(adminfile).toString().split('\r\n');
	info = fs.readFileSync('info.txt').toString().split('\r\n');
	chan='';
	LastFmNode = require('lastfm').LastFmNode;
	lastfm = new LastFmNode({api_key:info[1],secret:info[2],useragent:''});

function alphanumeric(str) {
	return str.replace(/[^a-z0-9_-`]/gi, '');
}
function contains(array, value) {
  return array.indexOf(value) > -1;
}
function formatMoney(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function check(type,user){
	accounts = fs.readFileSync('userdata/'+type+'/0.txt').toString().split('\r\n');
	if(contains(accounts,user)){
		return fs.readFileSync('userdata/'+type+'/'+user+'.txt').toString();
	}
	else{
		return 'No '+type+' saved.';
	}
}
function remove(type,user){
	accounts = fs.readFileSync('userdata/'+type+'/0.txt').toString().split('\r\n');
	console.log(accounts);
	accounts.splice(accounts.indexOf(user));
	console.log(accounts);
	fs.unlinkSync('userdata/'+type+'/'+user+'.txt');
	fs.writeFileSync('userdata/'+type+'/0.txt','');
	for (a in accounts){
		fs.appendFileSync('userdata/'+type+'/0.txt',accounts[a]+'\r\n');
	}
	client.say(user,'Your '+type+' has been removed.');
}
function nowPlaying(client,to,name){
	var trackStream = lastfm.stream(name);
	trackStream.on('nowPlaying', function(track) {
  		client.say(to,name+' is listening to "' + track.name+'" by '+track.artist['#text']+' from the album '+track.album['#text']);
	});
	trackStream.start();
	trackStream.stop();
}

module.exports = function(client, moduleEvent) {
	client.addListener('message', (from, to, text, raw) => {
		if(to === client.nick) to = from;

		var args = text.trim().split(' '),
			cmd = (args.splice(0, 1)[0] + ' ').trim().toLowerCase();
		if(contains(admins,from)){
			switch(cmd){
				//ADMIN COMMANDS
				case '.join':
					args.forEach(chan => {
						if(chan[0] !== '#'){
							client.join('#'+chan);
						}
						client.join(chan);
					});
					break;
				case '.crash':
				case '.break':
					terminate();
					break;
				case '.id':
					client.say("nickserv", "identify " + info[0]);
					break;
				case '.admin':
					if(args.length>0){
						fs.appendFileSync(adminfile,args[0]+'\r\n');
						admins = fs.readFileSync(adminfile).toString().split('\r\n');
					}
					break;
				case '.say':
				case '.tell':
					if(args[0][0] !== '#'){
						chan='#'+args[0];
					}
					else{
						chan=args[0];
					}
					console.log(chan);
					args.splice(0,1);
					client.say(chan, args.join(' '));
					break;

				case '.reset':
				case '.rejoin':
				case '.restart':
				case '.cycle':
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

				case '.part':
					if(args.length === 0 && to[0] === '#') args[0] = to;

					args.forEach(chan => {
						if(chan[0] !== '#'){
							client.part('#'+chan);
						}
						client.part(chan);
					});
					break;

				case '.nick':
					var nick = alphanumeric(args[0]).substr(0, 16);
					if(nick !== '')client.say('NICK '+ nick);
					break;
				case '.storyofpomfface':
				case '.story':
				case '.pomf':
				case '.face':
					client.say(to,':O C==3');
					client.say(to,':OC==3');
					client.say(to,':C==3');
					client.say(to,':C=3');
					client.say(to,':C3');
					client.say(to,':3');
					break;
			}
		}
		switch(cmd) {

			//MONETARY
			case '.owe':
			case '.balance':
				if(args.length>0){
					from=args[0];
				}
				pfile='userdata/balance/'+from+'.txt';
				accounts = fs.readFileSync('userdata/balance/0.txt').toString().split('\r\n');
				if(contains(accounts,from)){
					balance = fs.readFileSync(pfile).toString();
					if(balance>=0){
						balance=formatMoney(balance);
						client.say(to,from +' has $'+balance);
					}
					else{
						balance=formatMoney(balance*-1);
						client.say(to,from+' owes $'+balance);
					}
				}
				else{
					client.say(to,from+' has $'+0);
				}
				break;
			case '.sell':
				accounts = fs.readFileSync('userdata/balance/0.txt').toString().split('\r\n');
				add=Math.floor((Math.random()*1000) + 1);
				pfile='userdata/balance/'+from+'.txt';
				if(contains(accounts,from)){
					balance = parseInt(fs.readFileSync(pfile))+add;
					fs.writeFileSync(pfile,balance);
					if(balance>=0){
						balance=formatMoney(balance);
						client.say(to,from +' sells '+args.join(' ').trim()+' for $'+add+' and now has $'+balance);
					}
					else{
						balance=formatMoney(balance*-1);
						client.say(to,from +' sells '+args.join(' ').trim()+' for $'+add+' and now owes $'+balance);
					}
				}
				else{
					fs.appendFileSync('userdata/balance/0.txt',from+'\r\n');
					fs.writeFileSync(pfile,add);
					client.say(to,from +' sells '+args.join(' ').trim()+' for $'+add+' and now has $'+add);
				}
				break;
			case '.buy':
				accounts = fs.readFileSync('userdata/balance/0.txt').toString().split('\r\n');
				sub=Math.floor((Math.random()*1000) + 1);
				pfile='userdata/balance/'+from+'.txt';
				if(contains(accounts,from)){
					balance = parseInt(fs.readFileSync(pfile))-sub;
					fs.writeFileSync(pfile,balance);
					if(balance>=0){
						balance=formatMoney(balance);
						client.say(to,from +' buys '+args.join(' ').trim()+' for $'+sub+' and now has $'+balance);
					}
					else{
						balance=formatMoney(balance*-1);
						client.say(to,from +' buys '+args.join(' ').trim()+' for $'+sub+' and now owes $'+balance);
					}
				}
				else{
					fs.appendFileSync('userdata/balance/0.txt',from+'\r\n');
					fs.writeFileSync(pfile,sub*(-1));
					client.say(to,from +' buys '+args.join(' ').trim()+' for $'+sub+' and now owes $'+sub);
				}
				break;


			//PERSONAL
			
			case '.home':
			case '.homescreen':
			case '.homescreens':
				if(args.length>0){
					if(args[0]==='-del'||args[0]==='-rem'){
						remove('homescreen',from);
					}
					else if(args[0][0]==='@'){
						from=args[0].slice(1);
						client.say(to,from+"'s homescreen: "+check('homescreen',from));
					}
					else if (args[0].slice(0,4)==='http'){
						if(check('homescreen',from)==='No homescreen saved.'){
							fs.writeFileSync('userdata/homescreen/'+from+'.txt',args.join(' '));
							fs.appendFileSync('userdata/homescreen/0.txt',from+'\r\n');
							client.say(to,'Homescreen saved for '+from+': '+args.join(' '));
						}
						else{
							fs.writeFileSync('userdata/homescreen/'+from+'.txt',args.join(' '));
							client.say(to,'Homescreen saved for '+from+': '+args.join(' '));
						}
					}
					else{
						if(args.length>0){
							from=args[0];
						}
						client.say(to,from+"'s homescreen: "+check('homescreen',from));
					}
				}
				else{
					client.say(to,from+"'s homescreen: "+check('homescreen',from));
				}
				break;
			case '.desk':
			case '.desktop':
			case '.dtop':
				if(args.length>0){
					if(args[0]==='-del'||args[0]==='-rem'){
						remove('desktop',from);
					}
					else if(args[0][0]==='@'){
						from=args[0].slice(1);
						client.say(to,from+"'s desktop: "+check('desktop',from));
					}
					else if (args[0].slice(0,4)==='http'){
						if(check('desktop',from)==='No desktop saved.'){
							fs.writeFileSync('userdata/desktop/'+from+'.txt',args.join(' '));
							fs.appendFileSync('userdata/desktop/0.txt',from+'\r\n');
							client.say(to,'Desktop saved for '+from+': '+args.join(' '));
						}
						else{
							fs.writeFileSync('userdata/desktop/'+from+'.txt',args.join(' '));
							client.say(to,'Desktop saved for '+from+': '+args.join(' '));
						}
					}
					else{
						if(args.length>0){
							from=args[0];
						}
						client.say(to,from+"'s desktop: "+check('desktop',from));
					}
				}
				else{
					client.say(to,from+"'s desktop: "+check('desktop',from));
				}
				break;
			case '.battlestation':
			case '.bullshit':
			case '.bs':
				if(args.length>0){
					if(args[0]==='-del'||args[0]==='-rem'){
						remove('battlestation',from);
					}
					else if(args[0][0]==='@'){
						from=args[0].slice(1);
						client.say(to,from+"'s battlestation: "+check('battlestation',from));
					}
					else if (args[0].slice(0,4)==='http'){
						if(check('battlestation',from)==='No battlestation saved.'){
							fs.writeFileSync('userdata/battlestation/'+from+'.txt',args.join(' '));
							fs.appendFileSync('userdata/battlestation/0.txt',from+'\r\n');
							client.say(to,'Battlestation saved for '+from+': '+args.join(' '));
						}
						else{
							fs.writeFileSync('userdata/battlestation/'+from+'.txt',args.join(' '));
							client.say(to,'Battlestation saved for '+from+': '+args.join(' '));
						}
					}
					else{
						if(args.length>0){
							from=args[0];
						}
						client.say(to,from+"'s battlestation: "+check('battlestation',from));
					}
				}
				else{
					client.say(to,from+"'s battlestation: "+check('battlestation',from));
				}
				break;
			case '.selfie':
			case '.self':
				if(args.length>0){
					if(args[0]==='-del'||args[0]==='-rem'){
						remove('selfie',from);
					}
					else if(args[0][0]==='@'){
						from=args[0].slice(1);
						client.say(to,from+"'s selfie: "+check('selfie',from));
					}
					else if (args[0].slice(0,4)==='http'){
						if(check('selfie',from)==='No selfie saved.'){
							fs.writeFileSync('userdata/selfie/'+from+'.txt',args.join(' '));
							fs.appendFileSync('userdata/selfie/0.txt',from+'\r\n');
							client.say(to,'Selfie saved for '+from+': '+args.join(' '));
						}
						else{
							fs.writeFileSync('userdata/selfie/'+from+'.txt',args.join(' '));
							client.say(to,'Selfie saved for '+from+': '+args.join(' '));
						}
					}
					else{
						if(args.length>0){
							from=args[0];
						}
						client.say(to,from+"'s selfie: "+check('selfie',from));
					}
				}
				else{
					client.say(to,from+"'s selfie: "+check('selfie',from));
				}
				break;
			case '.waifu':
			case '.wife':
				if(args[0]==='-del'||args[0]==='-rem'){
						remove('waifu',from);
					}
					else if(args.length>0){
					if(args[0][0]==='@'){
						from=args[0].slice(1);
						client.say(to,from+"'s waifu: "+check('waifu',from));
					}
					else{
						if(check('waifu',from)==='No waifu saved.'){
							fs.writeFileSync('userdata/waifu/'+from+'.txt',args.join(' '));
							fs.appendFileSync('userdata/waifu/0.txt',from+'\r\n');
							client.say(to,'Waifu saved for '+from+': '+args.join(' '));
						}
						else{
							fs.writeFileSync('userdata/waifu/'+from+'.txt',args.join(' '));
							client.say(to,'Waifu saved for '+from+': '+args.join(' '));
						}
					}
				}
				else{
					client.say(to,from+"'s waifu: "+check('waifu',from));
				}
				break;
			case '.husbando':
			case '.husband':
				if(args[0]==='-del'||args[0]==='-rem'){
						remove('husbando',from);
					}
					else if(args.length>0){
					if(args[0][0]==='@'){
						from=args[0].slice(1);
						client.say(to,from+"'s husbando: "+check('husbando',from));
					}
					else{
						if(check('husbando',from)==='No husbando saved.'){
							fs.writeFileSync('userdata/husbando/'+from+'.txt',args.join(' '));
							fs.appendFileSync('userdata/husbando/0.txt',from+'\r\n');
							client.say(to,'Husbando saved for '+from+': '+args.join(' '));
						}
						else{
							fs.writeFileSync('userdata/husbando/'+from+'.txt',args.join(' '));
							client.say(to,'Husbando saved for '+from+': '+args.join(' '));
						}
					}
				}
				else{
					client.say(to,from+"'s husbando: "+check('husbando',from));
				}
				break;

			//CHAT TRIGGERED

			case 'lok':
			case 'lol':
				client.say(to,'lol');
				break;

			case 'zoz':
				list=['zozzle','zim zam','zooperz','zezezez','zimbabwe','shoes on sizzle'];
				client.say(to,list[Math.floor((Math.random()*6))]);
				break;

			case '??':
				client.say(to,'? ???????????????????????????????');
				break;

			case 'wops':
			case 'whoops':
			case 'woops':
				client.say(to,'OOPS');
				break;

			case 'o':
				if (args.length>0 && args[0].toLowerCase()=='shit'){
					client.say(to,'waddup');
				}
				break;
			case 'oshit':
				client.say(to,'waddup');
				break;

			case 'dude':
				client.say(to,'weed');
				client.say(to,'lmao');
				break;

			case '5':
			case 'five':
				if ((args[0]==='facts' && (args[2]==='maki' || args[2]==='maki:'))||(args[0]==='cute' && (args[3]==='maki' || args[3]==='maki:'))){
					client.say(to, "- She's a girl!");
					client.say(to, "- She's a tomato!");
					client.say(to, "- I love her!!!!!");
					client.say(to, "- Maki!!!!!!!!!!!");
				}
				break;
			case 'woof':
			case 'woof!':
				client.action(to, 'eats '+ from);
				break;

			case 'meme':
			case 'memes':
			case 'memer':
				client.say(to, 'i love memes!');
				break;


			//PUBLIC COMMANDS


			case '.cow':
			case '.cowsay':
				var len=Math.floor(args.length/3);
				arg1=args.splice(0,len);
				arg2=args.splice(0,len);
				arg3=args;
				max=0;
				top=' ';
				bot=' ';
				charc=0;
				ar=[arg1,arg2,arg3];
				dif1=0;
				dif2=0;
				dif3=0;
				dif=[dif1,dif2,dif3];
				sp1='';
				sp2='';
				sp3='';
				sp=[sp1,sp2,sp3];
				fsp1='/';
				fsp2='|';
				fsp3='\\';
				fsp=[fsp1,fsp2,fsp3];
				for(i=0;i<3;i++){
					charc=0;
					for(j=0;j<ar[i].length;j++){
						charc+=ar[i][j].length;
						charc++;
					}
					charc--;
					if(charc>max){
						max=charc;
					}
					dif[i]=charc;
				}
				for(i=0;i<3;i++){
					for(j=0;j<Math.floor((max-dif[i])/2);j++){
						sp[i]=sp[i].concat(' ');
					}
					for(j=0;j<Math.ceil((max-dif[i])/2);j++){
						fsp[i]=fsp[i].concat(' ');
					}
				}
				sp[0]=sp[0].concat('\\');
				sp[1]=sp[1].concat('|');
				sp[2]=sp[2].concat('/');
				for(i=0;i<max;i++){
					top=top+'_';
					bot=bot+'-';
				}
				client.say(to,top);
				client.say(to,fsp[0]+arg1.join(' ')+sp[0]);
				client.say(to,fsp[1]+arg2.join(' ')+sp[1]);
				client.say(to,fsp[2]+arg3.join(' ')+sp[2]);
				client.say(to,bot);
				client.say(to,'       \\    ^__^');
				client.say(to,'        \\   (oo)\\_______');
				client.say(to,'            (__)\\       )\\/\\');
				client.say(to,'                ||----w |');
				client.say(to,'                ||     ||');
				break;
			case '.tux':
			case '.tuxsay':
			case '-tux':
				var len=Math.floor(args.length/3);
				arg1=args.splice(0,len);
				arg2=args.splice(0,len);
				arg3=args;
				max=0;
				top=' ';
				bot=' ';
				charc=0;
				ar=[arg1,arg2,arg3];
				dif1=0;
				dif2=0;
				dif3=0;
				dif=[dif1,dif2,dif3];
				sp1='';
				sp2='';
				sp3='';
				sp=[sp1,sp2,sp3];
				fsp1='/';
				fsp2='|';
				fsp3='\\';
				fsp=[fsp1,fsp2,fsp3];
				for(i=0;i<3;i++){
					charc=0;
					for(j=0;j<ar[i].length;j++){
						charc+=ar[i][j].length;
						charc++;
					}
					charc--;
					if(charc>max){
						max=charc;
					}
					dif[i]=charc;
				}
				for(i=0;i<3;i++){
					for(j=0;j<Math.floor((max-dif[i])/2);j++){
						sp[i]=sp[i].concat(' ');
					}
					for(j=0;j<Math.ceil((max-dif[i])/2);j++){
						fsp[i]=fsp[i].concat(' ');
					}
				}
				sp[0]=sp[0].concat('\\');
				sp[1]=sp[1].concat('|');
				sp[2]=sp[2].concat('/');
				for(i=0;i<max;i++){
					top=top+'_';
					bot=bot+'-';
				}
				client.say(to,top);
				client.say(to,fsp[0]+arg1.join(' ')+sp[0]);
				client.say(to,fsp[1]+arg2.join(' ')+sp[1]);
				client.say(to,fsp[2]+arg3.join(' ')+sp[2]);
				client.say(to,bot);
				client.say(to,'   \\');
				client.say(to,'    \\   .--.');
				client.say(to,'       |o_o |');
				client.say(to,'       |:_/ |');
				client.say(to,'      //   \\ \\');
				client.say(to,'     (|     | )');
				client.say(to,'    /*\_   _/*\\');
				client.say(to,'    \\___)=(___/');
				break;

			case '.us':
			case '.ru':
			case '.uk':
			case '.au':
			case '.cl':
			case '.cu':
			case '.fr':
			case '.lr':
			case '.cz':
				finstr='';
				var j=0;
				args.forEach(word => {
					for (i=0;i<word.length;i++){
						if (j==1){
							finstr=finstr.concat('\x0304'+word[i]+'\x03');
							j++;
						}
						else if (j==2){
							finstr=finstr.concat('\x0300'+word[i]+'\x03');
							j++;
						}
						else{
							finstr=finstr.concat('\x0302'+word[i]+'\x03');
							j=1;
						}
					}
					finstr=finstr.concat(' ');
				});
				client.say(to,finstr);
				break;
			case '.it':
			case '.mx':
			case '.ir':
			case '.xmas':
				finstr='';
				var j=0;
				args.forEach(word => {
					for (i=0;i<word.length;i++){
						if (j==1){
							finstr=finstr.concat('\x0304'+word[i]+'\x03');
							j++;
						}
						else if (j==2){
							finstr=finstr.concat('\x0300'+word[i]+'\x03');
							j++;
						}
						else{
							finstr=finstr.concat('\x0303'+word[i]+'\x03');
							j=1;
						}
					}
					finstr=finstr.concat(' ');
				});
				client.say(to,finstr);
				break;
			case '.eat':
				client.action(to, 'eats ' + args[0]);
				break;
			case '.rape':
			case '.kill':
			case '.slap':
			case '.yiff':
			case '.lewd':
				client.say(to, '.rape '+ from);
				break;

			case '.london':
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
			case '.shoot':
			case '.bang':
				parts=['head','foot','chest','hand','stomach','leg'];//6
				client.action(to,'shoots '+args[0]+' in the '+parts[Math.floor(Math.random()*parts.length)]);
				break;
			case '.shill':
				ret=args.join(' ').toString().toUpperCase();
				for(i=0;i<Math.floor(Math.random()*3)+2;i++){
					client.say(to, ret+"!!!");
				}
				break;
			case '.quit':
			case '.leave':
				client.say(to, 'no');
				break;

			case '.vend':
			case '.vending':
			case '.vendingmachine':
			case '.vendor':
				if(args.length>0){
					from=args[0];
				}
				adj=[' slightly used',' wet and slimy',' red',' 3D-printed',' broken','']; //6
				nou=[' tabletop lamp',' Audi R8',' toy jack-in-the-box',' beer bottle',' tensile test specimen',' Raf Simons sweater',' roll of toilet paper',' iPhone 6 Plus',' glass eye',' condom that will never be used',' lollipop',' dragon dildo'];//12
				client.action(to,'dispenses a'+adj[Math.floor(Math.random()*adj.length)]+nou[Math.floor(Math.random()*nou.length)]+' for '+from);
				break;
			case '.help':
			case '.commands':
				client.say(to,'For help and commands, visit https://goo.gl/LKHfN8');
				break;
			case '.np':
			case '.playing':
				if(args.length>0){
					if(args[0]==='-del'||args[0]==='-rem'){
						remove('lastfm',from);
					}
					else if(args[0][0]==='@'){
						from=args[0].slice(1);
						if(check('lastfm',from)==='No lastfm saved.'){
							client.say(to,'No last.fm saved.');
						}
						else{
							nowPlaying(client,to,check('lastfm',from));
						}
					}
					else{
						if(check('lastfm',from)==='No lastfm saved.'){
							fs.writeFileSync('userdata/lastfm/'+from+'.txt',args.join(' '));
							fs.appendFileSync('userdata/lastfm/0.txt',from+'\r\n');
							client.say(to,'Last.fm saved for '+from+': '+args.join(' '));
						}
						else{
							fs.writeFileSync('userdata/lastfm/'+from+'.txt',args.join(' '));
							client.say(to,'Last.fm saved for '+from+': '+args.join(' '));
						}
					}
				}
				else{
					if(check('lastfm',from)==='No lastfm saved.'){
						client.say(to,'No last.fm saved.');
					}
					else{
						nowPlaying(client,to,check('lastfm',from));
					}
				}
				break


				
			break;
		}
	});
	
	client.addListener('invite', (chan, from) => {
		//client.notice(from, 'Thanks ' + from + ' for inviting me to ' + chan);
		client.join(chan);
		client.say(chan,"Thanks for inviting me, "+from+"! I'll be at your service. For more information and a list of bot commands, you can visit https://goo.gl/LKHfN8");
	});

};
