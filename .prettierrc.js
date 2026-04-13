// Import the default config file and expose it in the project root.
// Useful for editor integrations.

const config = require( '@wordpress/prettier-config' );

// Replace deprecated jsxBracketSameLine with bracketSameLine.
if ( 'jsxBracketSameLine' in config ) {
	config.bracketSameLine = config.jsxBracketSameLine;
	delete config.jsxBracketSameLine;
}

config.overrides = [
	{
		files: [ '*.scss', '*.css' ],
		options: {
			printWidth: 500,
			singleQuote: false,
		},
	},
];

module.exports = config;
