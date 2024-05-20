module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: 'airbnb-base',
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.cjs'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	ignorePatterns: ['.eslintrc.cjs', './.backup/*'],
	rules: {
		'no-console': 'off',
		'no-param-reassign': 'off',
		'no-shadow': 'off',
		'import/extensions': ['error', 'always'],
		indent: ['error', 'tab'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
<<<<<<< HEAD
		'no-dangling-underscores': 'on'
=======
		'no-dangling-underscores': 'off',
>>>>>>> c6296c1d2129e91440eb0b3ade585d70d1486207
	},
};
