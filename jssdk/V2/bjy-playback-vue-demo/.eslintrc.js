module.exports = {
	root: true,
	env: {
		node: true,
		jquery: true
	},
	'globals': {
		'BJY': 'readonly',
		'Yox': 'readonly'
	},
	'extends': [
		'plugin:vue/essential'
	],
	parserOptions: {
		parser: 'babel-eslint'
	}
}
