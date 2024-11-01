<?php 
/**
 * Plugin Name: WP Block Pack - Block Collection for You
 * Plugin URI: https://falcontheme.com/plugin/wp-block-pack
 * Description: A pack of clean, useful and, customizable blocks for the new WordPress block editor (Gutenberg).
 * Version: 1.1.6
 * Author: Falcon Theme
 * Author URI: https://falcontheme.com
 * License: GPLv2 or later
 * Text Domain: wp-block-pack
 * 
 * @package WP Block Pack
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 * 
 * Copyright 2019  Falcon Theme (email : support@falcontheme.com)
 */


/**
 * Kill session if accessed directly
 */
if ( !defined('ABSPATH') ) {
	die;
}


/**
 * WP Block Pack Loader Class
 */
class WP_Block_Pack
{

	/**
	 *  Do the construct
	 */
	private static $run_this;
	public static function run_this() {
		if ( ! isset( self::$run_this ) ) {
			self::$run_this = new self;
		}
		return self::$run_this;
	}


	/**
	 * Constructor
	 */
	function __construct() {
		$this->definite();
		$this->_loader();
	}


	/**
	 * WP Block Pack Definite
	 */
	public function definite() {

		define( 'WP_BLOCK_PACK_VER', '1.1.6' );
		define( 'WP_BLOCK_PACK_FILE_', __FILE__ );
		define( 'WP_BLOCK_PACK_PLUGIN_BASE', plugin_basename( WP_BLOCK_PACK_FILE_ ) );
		define( 'WP_BLOCK_PACK_PATH', plugin_dir_path( WP_BLOCK_PACK_FILE_ ) );
		define( 'WP_BLOCK_PACK_CLASSES', WP_BLOCK_PACK_PATH . 'includes/classes' );
		define( 'WP_BLOCK_PACK_URI', plugin_dir_url( __FILE__ ) );
		define( 'WP_BLOCK_PACK_RELEASE', true ); // false for development purpose, true for release version

		// check for WP Block Pack Pro
		if( in_array('wp-block-pack-pro/wp-block-pack-pro.php', apply_filters('active_plugins', get_option('active_plugins')))){ 
		    //plugin is activated
		    define( 'WP_BLOCK_PACK_PRO', true );
		} else { 
		    //plugin is activated
		    define( 'WP_BLOCK_PACK_PRO', false );
		}

	}


	/**
	 * Load file packs.
	 */
	public function _loader() {
		require( WP_BLOCK_PACK_CLASSES . '/loader.php' );
	}


}

WP_Block_Pack::run_this();