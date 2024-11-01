<?php
/**
 * @package WP Block Pack
 * 
 * Kill session if accessed directly
 */
if ( !defined('ABSPATH') ) {
	die;
}


/**
 * WP Block Pack Helper Class
 */
final class WP_Block_Pack_Helper
{


	/**
	 * Render Advertisement.
	 */
	function render_advertisement( $attributes, $content ) {
		if (!get_option('block_advertisement_code')) {
			$test = "<div class='advertisement-empty'>Your ad will be shown here. <span>Submit your code in ";
			if ( is_user_logged_in() ) {
				$test .= "<a href='" . admin_url( 'options-general.php?page=wp-block-pack&tab=block-options&block=area-advertisement' ) . "'>The Settings Page</a>";
			} else {
				$test .= "The Settings Page";
			}
			$test .= ".</span></div>";
		} else {
			$test = get_option('block_advertisement_code');
		}
	    return $test;
	}


}