module.exports = function ( grunt ) {
	// Project configuration.
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		copy: {
			main: {
				options: {
					mode: true,
				},
				src: [
					'**',
					'!.git/**',
					'!.gitignore',
					'!.gitattributes',
					'!*.sh',
					'!*.zip',
					'!eslintrc.json',
					'!README.md',
					'!Gruntfile.js',
					'!package.json',
					'!package-lock.json',
					'!composer.lock',
					'!phpcs.xml',
					'!phpcs.xml.dist',
					'!phpunit.xml.dist',
					'!node_modules/**',
					'!vendor/**',
					'!tests/**',
					'!scripts/**',
					'!config/**',
					'!tests/**',
					'!bin/**',
					'!webpack.config.js',
					'!tailwind.config.js',
					'!postcss.config.js',
					'!phpstan-baseline.neon',
					'!phpstan.neon',
					'!artifact/**',
					'!src/**',
					'!.claude/**',
					'!CLAUDE.md',
					'!internal-docs/**',
				],
				dest: 'nps-survey/',
			},
		},
		compress: {
			main: {
				options: {
					archive: 'nps-survey-<%= pkg.version %>.zip',
					mode: 'zip',
				},
				files: [
					{
						src: [ './nps-survey/**' ],
					},
				],
			},
		},
		clean: {
			main: [ 'nps-survey' ],
			zip: [ '*.zip' ],
		},

		bumpup: {
			options: {
				updateProps: {
					pkg: 'package.json',
				},
			},
			file: 'package.json',
		},

		replace: {
			plugin_main: {
				src: [ 'nps-survey.php' ],
				overwrite: true,
				replacements: [
					{
						from: /Version: \bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-A-Z-]+(?:\.[\da-z-A-Z-]+)*)?(?:\+[\da-z-A-Z-]+(?:\.[\da-z-A-Z-]+)*)?\b/g,
						to: 'Version: <%= pkg.version %>',
					},
				],
			},

			plugin_const: {
				src: [ 'nps-survey.php' ],
				overwrite: true,
				replacements: [
					{
						from: /NPS_SURVEY_VER', '.*?'/g,
						to: "NPS_SURVEY_VER', '<%= pkg.version %>'",
					},
				],
			},

			plugin_function_comment: {
				src: [
					'*.php',
					'**/*.php',
					'!node_modules/**',
					'!tests/**',
					'!php-tests/**',
					'!bin/**',
				],
				overwrite: true,
				replacements: [
					{
						from: 'x.x.x',
						to: '<%=pkg.version %>',
					},
				],
			},

			version_file_change: {
				src: [ 'version.json' ],
				overwrite: true,
				replacements: [
					{
						from: /"nps-survey": ".*?"/g,
						to: '"nps-survey": "<%= pkg.version %>"',
					},
				],
			},
		},

		addtextdomain: {
			options: {
				textdomain: 'nps-survey',
				updateDomains: true,
			},
			target: {
				files: {
					src: [
						'*.php',
						'**/*.php',
						'!node_modules/**',
						'!vendor/**',
						'!lib/**',
						'!php-tests/**',
						'!bin/**',
						'!src/**',
					],
				},
			},
		},
	} );

	/* Load Tasks */
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-bumpup' );
	grunt.loadNpmTasks( 'grunt-text-replace' );
	grunt.loadNpmTasks( 'grunt-wp-i18n' );

	/* Register task started */
	grunt.registerTask( 'release', [
		'clean:zip',
		'copy',
		'compress',
		'clean:main',
	] );

	grunt.registerTask( 'textdomain', [ 'addtextdomain' ] );

	// Bump Version - `grunt version-bump --ver=<version-number>`
	grunt.registerTask( 'version-bump', function ( ver ) {
		let newVersion = grunt.option( 'ver' );

		if ( newVersion ) {
			newVersion = newVersion ? newVersion : 'patch';

			grunt.task.run( 'bumpup:' + newVersion );
			grunt.task.run( 'replace' );
		}
	} );
};
