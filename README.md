# uquubot
An IRC bot that speaks using [cleverbot-node](https://github.com/fojas/cleverbot-node).
Install by running `npm install` and then `node bot.js`.

## Commands

####Public Commands

- **cowsay** `.cowsay`, `.cow` | `text`
 - returns the text in a speech bubble from a talking cow
- **cowsay -tux** `.tux`, `.tuxsay`, `-tux` | `text`
 - returns the text in a speech bubble from a talking penguin
- **eat** `.eat` | `user`
 - eats the target argument
- **flags: red/white/blue** `.us`, `.uk`, `.ru`, `.au`, `.cl`, `.cu`, `.lr`, `.fr`, `.cz` | `text`
 - returns a red/white/blue version of the text
- **flags: red/white/green** `.it`, `.mx`, `.ir`, `.xmas` | `text`
 - returns a red/white/green version of the text
- **help** `.help`, `.commands` 
 - brings the user to this page
- **london** `.london`, `.meme`, `.h` | `text` 
 - returns the argument horizontally and vertically
- **quit** `.quit`, `.leave` asks the bot to leave the current channel (not guaranteed to follow directions)
- **rape** `.rape`, `.kill`, `.slap`, `.yiff`, `.lewd` | `user`
 - rapes the user to discourage future innapropriate behavior (fight fire with fire)
- **shill** `.shill` | `text` 
 - shills a word a few times
- **shoot** `.shoot`, `.bang` | `text`
 - shoots a user
- **vending machine** `.vend`, `.vending`, `.vendingmachine`, `.vendor` 
 - dispenses a gachapon item

####Chat Triggered

- **dat boi** `o shit`, `oshit` 
 - returns "waddup"
- **dude weed lmao** `dude` 
 - returns "weed lmao"
- **lol** `lol`, `lok` 
 - returns "lol"
- **questionable** `??` 
 - returns "? ???????????????????????????????"
- **maki facts** `5 cute facts about maki`, `5 facts about maki`, `5 cute facts about maki:`, `5 facts about maki:`, `five cute facts about maki`, `five facts about maki`, `five cute facts about maki:`, `five facts about maki:` 
 - returns "five" cute facts about MAKI!!!
- **meme** `meme`, `memes`, `memer` 
 - expresses the bot's shared interest in memes
- **oops** `wops`, `whoops`, `woops` 
 - returns "OOPS"
- **woof** `woof`, `woof!` 
 - no furries allowed
- **zoz** `zoz` 
 - returns a zoz variation

####Personal

- **battlestation** `.battlestation`, `.bullshit`, `.bs` | `arguments`
 - returns the saved battlestation
- **desktop** `.desktop`, `.dtop`, `.desk` | `arguments`
 - returns the saved desktop
- **homescreen** `.homescreen`, `.home`, `.homescreens` | `arguments`
 - returns the saved homescreen
- **husbando** `.husbando`, `.husband` | `arguments`
 - returns the saved husbando
- **husbando** `.selfie`, `.self` | `arguments`
 - returns the saved selfie
- **waifu** `.waifu`, `.wife` | `arguments`
 - returns the saved waifu

Include `@nick` to view data from other nicks, `your link` to save your own link, or `-del` or `-rem` to delete yours. Not including an argument will default it to return your own

####Monetary

- **balance** `.owe`, `.balance` | `user` 
 - checks the balance of the specified user
- **buy** `.buy` | `item`
 - buys an item
- **sell** `.sell` | `item`
 - sells an item

####Admin

- **admin** `.admin` | `user`
 - adds an admin
- **identify** `.id` manually identifies if the bot has not yet done so
- **join** `.join` | `#channel`, `channel`
 - joins a channel
- **nick** `.nick` | `nick`
 - changes the nick of the bot
- **part** `.part` | `#channel`, `channel`
 - parts a channel
- **reset** `.reset`, `.rejoin`, `.restart` | `#channel`, `channel`
 - resets the bot in the given channel
- **say** `.say`, `.join` | `#channel`, `channel` | `text`
 - makes the bot say something in the given channel
- **story of pomf face** `.storyofpomfface`, `.pomfface`, `.pomf`, `.story` 
 - :3

## Talking to the bot
Just talk to it:

    <realhuman> bot: hello, how are you
    <bot> I'm doing well, thanks

It will have a semi-intelligent conversation with you. I promise. It will also start singing Let It Go from Frozen if you push it to.

## Configuration
You can change nick, channel list and irc host in `CONFIG.json`. Try not to break the JSON file.
