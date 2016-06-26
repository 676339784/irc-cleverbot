# irc-cleverbot
An IRC bot that speaks using [cleverbot-node](https://github.com/fojas/cleverbot-node).

Install by running `npm install` and then `node bot.js`.

## Talking to the bot
Just talk to it:

    <realhuman> bot: hello
    <bot> Hello.

## Commands

###Public Commands

- **cowsay** `cowsay`, `cow` returns the text in a speech bubble from a talking cow

- **cowsay -tux** `tux`, `tuxsay`, `-tux` returns the text in a speech bubble from a talking penguin

- **dat boi** `o shit`, `oshit` returns "waddup"

- **dude weed lmao** `dude` returns "weed lmao"

- **eat** `eat` eats the target argument

- **flags: red/white/blue** `.us`, `.uk`, `.ru`, `.au`, `.cl`, `.cu`, `.lr`, `.fr`, `.cz` returns a red/white/blue version of the text

- **flags: red/white/green** `.it`, `.mx`, `.ir`, `.xmas` returns a red/white/green version of the text

- **homescreens** `.home`, `.homescreen`, `.homescreens` returns the website for the /wg/ homescreen inspiration album

- **hype** `.meme`, `.h` returns the argument horizontally and vertically

- **lol** `lol`, `lok` returns "lol"

- **questionable** `??` returns "? ???????????????????????????????"

- **quit** `.quit`, `.leave` asks the bot to leave the current channel (not guaranteed to follow directions)

- **maki facts** `5 cute facts about maki`, `5 facts about maki`, `5 cute facts about maki:`, `5 facts about maki:`, `five cute facts about maki`, `five facts about maki`, `five cute facts about maki:`, `five facts about maki:` returns "five" cute facts about MAKI!!!

- **meme** `meme`, `memes`, `memer` expresses the bot's shared interest in memes

- **rape** `.rape`, `.kill`, `.slap`, `.yiff`, `.lewd` rapes the user to discourage future innapropriate behavior (fight fire with fire)

- **sell** `.sell`, `.buy` sells the user in order to fund the bot (only does this on 1/3 of commands)

- **oops** `wops`, `whoops`, `woops` returns "OOPS"

- **woof** `woof`, `woof!` no furries allowed

- **zoz** `zoz` returns a zoz variation

###Admin Commands

- **identify** `id` manually identifies if the bot has not yet done so

- **join** `join` joins a channel

- **nick** `nick` changes the nick of the bot

- **part** `part` parts a channel

- **reset** `reset`, `rejoin`, `restart` resets the bot in the given channel

- **say** `say`, `join` makes the bot say something in the given channel

## Configuration
You can change nick, channel list and irc host in `CONFIG.json`. Try not to break the JSON file.
