'use strict';

const WebClient = require('@slack/client').WebClient;

module.exports = function (S) {
	class ServerlessSlackPlugin extends S.classes.Plugin {

		constructor () {
			super();
			this.name = 'serverless-slack-plugin';
		}

		registerHooks () {
			S.addHook(this.postEndpointDeploy.bind(this), {
				action: 'endpointDeploy',
				event: 'post'
			});
			S.addHook(this.postFunctionDeploy.bind(this), {
				action: 'functionDeploy',
				event: 'post'
			});
			S.addHook(this.postEndpointRemove.bind(this), {
				action: 'endpointRemove',
				event: 'post'
			});
			S.addHook(this.postFunctionRemove.bind(this), {
				action: 'functionRemove',
				event: 'post'
			});
			return Promise.resolve();
		}

		sendMessage (token, channel, message) {
			const webClient = new WebClient(token);
			webClient.chat.postMessage(channel, message, { 'as_user': true });
		}

		generateMessage (action, prep, desc, evt, project, formatFn) {
			const name = project.name;
			const stage = evt.options.stage;
			const region = Object.keys(evt.data[action])[0];
			const functions = evt.data[action][region];

			const header = `*${name}* just ${action} *${functions.length}* ${desc}` +
				(functions.length !== 1 ? 's' : '') + ` ${prep} *${stage} (${region})*`;

			const fnText = '```' + functions.map(formatFn).join('\n') + '```';

			return `${header}\n>${fnText}`;
		}

		handleDeploy (evt, type, prep, action, desc, formatFn) {
			if (Object.keys(evt.data[action] || {}).length) {
				const project = S.getProject();
				const config = project.custom.slack || {};

				if (
					((typeof config[type] === 'object' && config[type][action]) ||
					(typeof config[type] === 'boolean' && config[type])) &&
					config.token && config.channel
				) {
					const message = this.generateMessage(action, prep, desc, evt, project, formatFn);
					this.sendMessage(config.token, config.channel, message);
				}
			}

			return Promise.resolve(evt);
		}


		postEndpointDeploy (evt) {
			return this.handleDeploy(
				evt,
				'endpoints',
				'to',
				'deployed',
				'api gateway endpoint',
				(stat) => `${stat.endpointMethod} - ${stat.endpointPath} - <${stat.endpointUrl}>`
			);
		}

		postEndpointRemove (evt) {
			return this.handleDeploy(
				evt,
				'endpoints',
				'from',
				'removed',
				'api gateway endpoint',
				(stat) => `${stat.endpointMethod} - ${stat.endpointPath} - <${stat.endpointUrl}>`
			);
		}

		postFunctionDeploy (evt) {
			return this.handleDeploy(
				evt,
				'functions',
				'to',
				'deployed',
				'lambda function',
				(stat) => `${stat.lambdaName}`
			);
		}

		postFunctionRemove (evt) {
			return this.handleDeploy(
				evt,
				'functions',
				'from',
				'removed',
				'lambda function',
				(stat) => `${stat.functionName}`
			);
		}
	}

	return ServerlessSlackPlugin;
};
