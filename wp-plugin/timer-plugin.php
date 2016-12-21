<?php
/*
 * Plugin Name: FNM Timer
 * Version: 0.1
 * Plugin URI: https://github.com/rstims/timer
 * Description: Javascript timer shortcode
 * Author: Ryan Stimmler
 * Author URI: http://400north.media/
 * Requires at least: 4.0
 * Tested up to: 4.0
 *
 * Text Domain: fnm-timer
 *
 * @package WordPress
 * @author Ryan Stimmler
 * @since 0.1
 */
if(!function_exists('timer_scripts')):
	function timer_scripts(){
		wp_enqueue_style('wp-timer', plugins_url( 'assets/css/style.css', __FILE__ ));
		wp_enqueue_script('wp-timer', plugins_url( 'assets/js/timer.min.js', __FILE__ ));
	}
endif;

if(!function_exists('timer_action')):

	function timer_action($atts = array(), $content = ''){

		extract(shortcode_atts(array(
				'duration' => 0,
				'bg_color' => '',
				'pb_color' => '',
				'readyBGTextColor' => '',
				'progressBGTextColor' => '',
				'loaderColor' => '',
				'chime' => plugins_url( 'assets/sounds/gong.mp3', __FILE__ )
			), $atts));

		add_action('wp_footer', 'timer_scripts');

		ob_start();

		?>
			<div class="timer timer--stopped timer--reset">

			  <div class="timer__loader">
			    <div class="timer__loader-bounce1"></div>
			    <div class="timer__loader-bounce2"></div>
			    <div class="timer__loader-bounce3"></div>
			  </div>

			  <div class="timer__progress"></div>

			  <div class="timer__message"></div>

			  <div class="timer__reset" style="display:none;">Reset</div>
			</div>
			<script>
				document.addEventListener('DOMContentLoaded', function(){
				  var timer = new window.timer({
				  	  duration: <?php echo $duration; ?>,
				      endChime:"<?php echo $chime; ?>",
				      readyBGColor: '<?php echo $bg_color; ?>',
				      progressBGColor: '<?php echo $pb_color; ?>',
				      readyBGTextColor: '<?php echo $readyBGTextColor; ?>',
				      progressBGTextColor: '<?php echo $progressBGTextColor; ?>',
				      loaderColor: '<?php echo $loaderColor; ?>',
				    });
				});
			</script>
		<?php

		return ob_get_clean();

	}

	add_shortcode('wp_timer', 'timer_action');

endif;