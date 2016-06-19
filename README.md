Serverless Slack Plugin
=============================
A serverless plugin slack chat bot which will post updates to a channel on completion deployments or removals of functions and/or endpoints.

## Installation

*Make sure you have the [Serverless Framework](http://www.serverless.com) installed and you're using Node.js v4.0+.*

Install the plugin in the root of your Serverless Project:
```
npm install serverless-slack-plugin --save-dev
```

Add the plugin to the `plugins` array in your Serverless Project's `s-project.json`, like this:

```
plugins: [
    "serverless-slack-plugin"
]
```

## Configuration

First you will need to configure a "bot user" in your Slack team for the integration, instructions on how to do that can be found in the [Slack documentation](https://api.slack.com/bot-users).  


Once you have generate a token for your bot user and the name of the channel you want the bot to post to, in the `custom` property of either your `s-project.json` or `s-function.json` add an slack property.

*Hint: Don't forget to invite your bot user into the channel you have specified!*

```javascript
{
    ...
    "custom": {
      "slack": {
        "token": "<YOUR SLACK CHAT BOT TOKEN>",
        "channel": "<THE CHANNEL YOU WANT TO POST TO>",
        "endpoints": true, // All endpoint deployments and removals will result in a message being posted to the channel
        "functions": {
          "deployed": true, // Function deployments will result in a message
          "removed": true // Function removals will result in a message
        }
      }
    }
    ...
}
```
*Note: For both ```endpoints``` and ```functions``` you can either enable/disable deployments and removals discretely or globally as above)*

## Usage

Once configured any of the following actions will result in a summary message being sent to the configured channel.

```
serverless function deploy
```

```
serverless function remove
```
```
serverless endpoint deploy
```
```
serverless endpoint remove
```
```
serverless dash deploy
```
