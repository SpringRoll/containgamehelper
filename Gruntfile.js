module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
	    springroll: {
	        options: {
	            server: 'http://springroll.pbskids.org',
	            dest: 'deploy/games'
	        },
	        release: {
	            options: {
	                status: 'dev',
	                debug: true
	            },
	            games: [
	            	'giant-hide-seek'
	            ]
	        }
	    },
	    rename: {
			"giant-hide-seek": {
	    		files: [
					{
						src: ['deploy/games/nature-cat-adventure/index.html'],
						dest: 'deploy/games/nature-cat-adventure/game.html'
					}
				]
			}
		},
	    concat: {
	    	container: {
	    		dest: 'deploy/base/assets/js/game-container.js',
	    		src: [
	    			"bower_components/jquery/dist/jquery.min.js",
	    			"bower_components/bind-polyfill/index.js",
	    			"bower_components/Bellhop/dist/bellhop.min.js",
	    			"bower_components/springroll-container/dist/container.min.js"
	    		]
	    	}
	    },
	    cssmin: {
	    	target: {
    			files: [{
      				expand: true,
      				cwd: 'src/css',
				    src: ['*.css'],
				    dest: 'deploy/base/assets/css',
				    ext: '.min.css'
    			}]
  			}
	    },
	    jade: {
  			html: {
    			files: {
      				'deploy/base': ['src/*.jade']
    			},
    			options: {
      				pretty: true,
      				client: false
    			}
  			}
		},
		copy: {
  			"giant-hide-seek": {
  				files: [
  					{
  						expand: true,
  						cwd: 'deploy/base',
    					src: '**',
    					dest: 'deploy/games/nature-cat-adventure/'
    				}
  				]
  			}
  		}
	});

	grunt.registerTask('build', [
		'jade',
		'concat',
		'cssmin'
	]);

	grunt.registerTask('download', 'Download the games', [
		'springroll'
	]);

	grunt.registerTask('giant-hide-seek', [
		'rename:giant-hide-seek',
		'copy:giant-hide-seek'
	]);

	grunt.registerTask('games', [
		'giant-hide-seek'
	]);
};