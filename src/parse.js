const ini = require("ini");

const defaultConfig = {
	requireHead: true,
	requireHeadUpdate: true,
	requireHeadSize: true
}

/**
 * Parse INI to HTML
 * @param {string} data an ini file
 * @param {ParseOptions} config options that change how parsing happens
 * @returns {Promise}
 */
function parse(data, config = defaultConfig) {
	return new Promise((_data, _error) => {
		let skin = ini.parse(data);

		let head = "";
		let body = "";

		Object.keys(skin).forEach((s) => { skin[s.toLowerCase()] = skin[s]; if (s != s.toLowerCase()) delete skin[s]; })

		if (!skin.head && config.requireHead) _error("No [head] section detected."); 
		if (!skin.head.update && config.requireHeadUpdate) _error("No skin update specified under [head].");
		if (!(skin.head.w || skin.head.h) && config.requireHeadSize) _error("No skin size specified under [head].");

		_data(`<html><head>${head}</head><body style="width: ${skin.head.w}px; height: ${skin.head.h}px;">${body}</body></html>`);
	});
}

module.exports = exports = parse;
