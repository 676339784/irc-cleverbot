# uquubot
An IRC bot that speaks using [cleverbot-node](https://github.com/fojas/cleverbot-node).
Install by running `npm install` and then `node bot.js`.

## Commands

####Public Commands

- **cowsay** `.cowsay`, `.cow` | `arg0`
 - returns the text `arg0` in a speech bubble from a talking cow
- **cowsay -tux** `.tux`, `.tuxsay`, `-tux` | `arg0`
 - returns the text `arg0` in a speech bubble from a talking penguin
- **eat** `.eat` | `arg0`
 - eats the target argument `arg0`
- **flags: red/white/blue** `.us`, `.uk`, `.ru`, `.au`, `.cl`, `.cu`, `.lr`, `.fr`, `.cz` | `arg0`
 - returns a red/white/blue version of the text `arg0`
- **flags: red/white/green** `.it`, `.mx`, `.ir`, `.xmas` | `arg0`
 - returns a red/white/green version of the text `arg0`
- **help** `.help`, `.commands` 
 - brings the user to this page
- **london** `.london`, `.meme`, `.h` | `arg0`
 - returns the argument `arg0` horizontally and vertically
- **quit** `.quit`, `.leave` 
 - asks the bot to leave the current channel (not guaranteed to follow directions)
- **rape** `.rape`, `.kill`, `.slap`, `.yiff`, `.lewd` | `arg0`
 - rapes the user `arg0` to discourage future innapropriate behavior (fight fire with fire)
- **shill** `.shill` | `arg0`
 - shills the argument `arg0` a few times
- **shoot** `.shoot`, `.bang` | `arg0`
 - shoots a user `arg0`
- **vending machine** `.vend`, `.vending`, `.vendingmachine`, `.vendor` | `arg0`
 - dispenses a gachapon item for the user `arg0`

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

- **battlestation** `.battlestation`, `.bullshit`, `.bs` | `arg0`
 - returns the saved battlestation
- **desktop** `.desktop`, `.dtop`, `.desk` | `arg0`
 - returns the saved desktop
- **homescreen** `.homescreen`, `.home`, `.homescreens` | `arg0`
 - returns the saved homescreen
- **husbando** `.husbando`, `.husband` | `arg0`
 - returns the saved husbando
- **husbando** `.selfie`, `.self` | `arg0`
 - returns the saved selfie
- **waifu** `.waifu`, `.wife` | `arg0`
 - returns the saved waifu

Include `@nick` to view data from other nicks, `your link` to save your own link, or `-del` or `-rem` to delete yours. Not including an argument will default it to return your own

####Monetary

- **balance** `.owe`, `.balance` | `arg0`
 - checks the balance of the specified user `arg0`
- **buy** `.buy` | `arg0`
 - buys an item `arg0`
- **sell** `.sell` | `arg0`
 - sells an item `arg0`

####Admin

- **admin** `.admin` | `arg0`
 - makes user `arg0` an admin
- **identify** `.id` 
 - manually identifies if the bot has not yet done so
- **join** `.join` | `#arg0`, `arg0`
 - joins a channel `arg0`
- **nick** `.nick` | `arg0`
 - changes the nick of the bot to `arg0`
- **part** `.part` | `#arg0`, `arg0`
 - parts a channel `arg0`
- **reset** `.reset`, `.rejoin`, `.restart` | `#arg0`, `arg0`
 - resets the bot in the given channel `arg0`
- **say** `.say`, `.join` | `#arg0`, `arg0` | `arg1`
 - makes the bot say text `arg1` in the given channel `arg0`
- **story of pomf face** `.storyofpomfface`, `.pomfface`, `.pomf`, `.story` 
 - :3

## Talking to the bot
Just talk to it:

    <realhuman> bot: hello, how are you
    <bot> I'm doing well, thanks

It will have a semi-intelligent conversation with you. I promise. It will also start singing Let It Go from Frozen if you push it to.

## Configuration
You can change nick, channel list and irc host in `CONFIG.json`. Try not to break the JSON file.
