module.exports = {
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended-with-formatting' ],
	rules: {
		camelcase: 'off',
		'import/no-unresolved': 'off',
		'no-console': 'off',
		'no-alert': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/label-has-for': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'jsx-a11y/label-has-associated-control': 'off',
		'jsx-a11y/no-onchange': 'off',
		'@wordpress/no-global-event-listener': 'off',
		'space-before-function-paren': 'off',
		'wrap-iife': 'off',
		'react/jsx-indent-props': 'off',
		//Neet to fix below rule
		'react-hooks/exhaustive-deps': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'no-mixed-operators': 'off',
		'react/jsx-indent': 'off',
		'jsdoc/valid-types': 'off',
		indent: 'off',
		'@wordpress/i18n-text-domain': [
			'error',
			{
				allowedTextDomain: 'nps-survey',
			},
		],
		'jsdoc/require-param-type': 'off',
		'jsdoc/check-param-names': 'off',
		'import/no-extraneous-dependencies': 'off',
	},
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			presets: [ '@wordpress/babel-preset-default' ],
		},
	},
	globals: {
		jQuery: true,
		FormData: true,
		fetch: true,
		nps_survey_data: true,
	},
};
