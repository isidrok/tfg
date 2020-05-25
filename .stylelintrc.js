module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-prettier/recommended'
    ],
    plugins: [
        'stylelint-prettier',
        'stylelint-order'
    ],
    rules: {
        'prettier/prettier': true,
        'order/order': [
			'custom-properties',
			'declarations'
		],
		'order/properties-alphabetical-order': true
	
    },
    ignoreFiles: [
        '**/*.js',
        'node_modules',
        'dist'
    ]
}