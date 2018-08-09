const ini = require("ini");

const defaultConfig = {
	requireHead: true,
	requireHeadUpdate: true
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

		Object.keys(skin).forEach((s) => {
			skin[s.toLowerCase()] = skin[s];
			Object.keys(skin[s.toLowerCase()]).forEach((p) => {
				skin[s.toLowerCase()][p.toLowerCase()] = skin[s][p];
				if (p != p.toLowerCase()) delete skin[s][p];
			});
			if (s != s.toLowerCase()) delete skin[s];
		});

		if (!skin.head && config.requireHead) _error("No [head] section detected."); 
		if (!skin.head.update && config.requireHeadUpdate) _error("No skin update specified under [head].");

		Object.keys(skin).forEach((s) => {
			let section = skin[s];

			if (section.meter) {
				switch (section.meter.toLowerCase()) {
					case "string": {
						body += `<div class="dq-update" measure="${section.measureName ? `MEASURE:${section.measureName}` : `LOCAL:${section.text}`}"></div>`;
					} break;

					default: _error("Invalid meter type specified.");
				}
			} else if (section.measure) {
				// wip
			}
		});

		_data(`<html><head>${head}</head><body>${body}</body></html>`);
	});
}

module.exports = exports = parse;
