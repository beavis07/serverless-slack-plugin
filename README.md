Serverless Slack Plugin
=============================
A [Slack Bot](https://api.slack.com/bot-users) plugin for the [Serverless Framework](http://www.serverless.com) which will post updates to a channel on completion of deployments or removals of functions and/or endpoints.

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://badge.fury.io/js/serverless-slack-plugin.svg)](https://badge.fury.io/js/serverless-slack-plugin)
[![Dependencies Status](https://david-dm.org/beavis07/serverless-slack-plugin.svg)](https://david-dm.org/beavis07/serverless-slack-plugin)
[![DevDependencies Status](https://david-dm.org/beavis07/serverless-slack-plugin/dev-status.svg)](https://david-dm.org/beavis07/serverless-slack-plugin#info=devDependencies)

## Installation

*Make sure you have the [Serverless Framework](http://www.serverless.com) installed and you're using Node.js v4.0+.*

Install the plugin in the root of your Serverless Project:
```
npm install serverless-slack-plugin --save-dev
```

Add the plugin to the `plugins` array in your Serverless Project's `s-project.json`, like this:

```javascript
plugins: [
    "serverless-slack-plugin"
]
```

## Configuration

First you will need to configure a "bot user" in your Slack team for the integration, instructions on how to do that can be found in the [Slack documentation](https://api.slack.com/bot-users).  

*Hint: Don't forget to invite your bot user into the channel you want it to post into!*

Once you have generated a token for your bot user and the name of the channel, in the `custom` property of either your `s-project.json` or `s-function.json` add the following:

```javascript
{
    ...
    "custom": {
      "slack": {
        "token": "<YOUR SLACK CHAT BOT TOKEN>",
        "channel": "<THE CHANNEL YOU WANT TO POST TO>",
        "endpoints": true, // All endpoint deployments and removals will result in a message
        "functions": {
          "deployed": true, // Function deployments will result in a message
          "removed": true // Function removals will result in a message
        }
      }
    }
    ...
}
```

*Note: For both `endpoints` and `functions` you can either enable/disable deployments and removals discretely or globally as above*

## Usage

Once configured any of the following actions will result in a summary message being sent to the configured channel.

```
serverless dash deploy
```

![Deploy functions](https://cloud.githubusercontent.com/assets/8673465/16177664/e86a0fea-362b-11e6-80e8-a942b3153787.jpg)

```
serverless function deploy
```

![Deploy functions](https://cloud.githubusercontent.com/assets/8673465/16177666/e86ee16e-362b-11e6-9e12-3fbc1dcd8af3.jpg)

```
serverless function remove
```

![Remove functions](https://cloud.githubusercontent.com/assets/8673465/16177667/e86f48f2-362b-11e6-9952-12cc1ddde689.jpg)

```
serverless endpoint deploy
```

![Deploy endpoints](https://cloud.githubusercontent.com/assets/8673465/16177665/e86e0000-362b-11e6-8384-d7e324f163d4.jpg)

```
serverless endpoint remove
```

![Remove endpoints](https://cloud.githubusercontent.com/assets/8673465/16177668/e8700ac6-362b-11e6-9fc8-8ac404d18b51.jpg)

## License

MIT License. See the [LICENSE](LICENSE) file.
