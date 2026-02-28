const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const globals = require('globals')
const importPlugin = require('eslint-plugin-import')

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
})

module.exports = [
	...compat.extends('airbnb-base'),
	...compat.extends('prettier'),
	...compat.plugins('prettier', 'chai-friendly'),

	{
		plugins: {
			import: importPlugin,
		},

		languageOptions: {
			globals: { ...globals.node },
		},

		rules: {
			semi: [2, 'never'],
			'import/prefer-default-export': 'off',
			'no-underscore-dangle': 0,
			'no-unused-expressions': 0,
			'chai-friendly/no-unused-expressions': 2,
			'object-curly-newline': 'off',
			'prettier/prettier': 'error',

			'operator-linebreak': [
				'error',
				'after',
				{
					overrides: {
						'?': 'before',
						':': 'before',
					},
				},
			],

			'import/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: [
						'eslint.config.js',
						'**/*.config.js',
						'test/**',
						'**/*.spec.js',
						'**/*.test.js',
					],
				},
			],
		},
	},
]
