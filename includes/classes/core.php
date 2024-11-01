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
 * WP Block Pack Core Class
 */
final class WP_Block_Pack_Core
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
		add_action( 'init', array( $this, 'wp_register') );
		add_action( 'init', array( $this, 'register_blocks') );
	}


	/**
	 * Register files.
	 * Register css and javascript files the WordPress way to enqueue later.
	 *
	 * @since 0.9.0
	 */
	function wp_register() {
		wp_register_style ( 'wp-block-pack-style', $this->asset('style'), array(), $this->ver('style') );
		wp_register_script ( 'wp-block-pack-script', $this->asset('script'), array(), $this->ver('script'), true );
		wp_register_style ( 'wp-block-pack-options', $this->asset('options'), array(), $this->ver('options') );
		wp_register_style ( 'wpblockicons-style', $this->asset('wpblockicons'), array(), '1.1' );
		wp_register_style ( 'fontawesome-style', $this->asset('fa-style'), array(), '5.5.0' );
		wp_register_script ( 'fontawesome-script', $this->asset('fa-script'), array(), '5.5.0' );
		wp_register_style ( 'wp-block-pack-editor', $this->asset('editor'), array( 'wp-edit-blocks' ), $this->ver('editor') );
		wp_register_script ( 'wp-block-pack-editor-script', $this->asset('editor-script'), array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor', 'wp-compose', 'wp-data' ), $this->ver('editor-script') );
	}


	/**
	 * Asset files url.
	 * Make load file assets list more clean.
	 *
	 * @since 1.0.2
	 */
	function asset($val) {
		switch ($val) {
			case 'style':
				return WP_BLOCK_PACK_URI . 'assets/css/style.min.css';
			break;
			case 'options':
				return WP_BLOCK_PACK_URI . 'assets/css/options.min.css';
			break;
			case 'wpblockicons':
				return WP_BLOCK_PACK_URI . 'assets/icons/wpblockicons/css/style.min.css';
			break;
			case 'fa-style':
				return WP_BLOCK_PACK_URI . 'assets/icons/fontawesome/css/all.min.css';
			break;
			case 'fa-script':
				return 'https://kit.fontawesome.com/1f18ae94b4.js';
			break;
			case 'editor':
				return WP_BLOCK_PACK_URI . 'assets/css/editor.build.min.css';
			break;
			case 'editor-script':
				return WP_BLOCK_PACK_URI . 'assets/js/editor.build.min.js';
			break;
			case 'script':
				return WP_BLOCK_PACK_URI . 'assets/js/script.min.js';
			break;
		}
	}


	/**
	 * Version of files url.
	 * Use development mode or plugin version.
	 */
	function ver($val) {
		if (WP_BLOCK_PACK_RELEASE == false) {
			switch ($val) {
				case 'style':
					return filemtime( WP_BLOCK_PACK_PATH . 'assets/css/style.min.css' );
				break;
				case 'options':
					return filemtime( WP_BLOCK_PACK_PATH . 'assets/css/options.min.css' );
				break;
				case 'editor':
					return filemtime( WP_BLOCK_PACK_PATH . 'assets/css/editor.build.min.css' );
				break;
				case 'editor-script':
					return filemtime( WP_BLOCK_PACK_PATH . 'assets/js/editor.build.min.js' );
				break;
				case 'script':
					return filemtime( WP_BLOCK_PACK_PATH . 'assets/js/script.min.js' );
				break;
			}
		} else {
			return WP_BLOCK_PACK_VER;
		}
	}
	

	/**
	 * Register Blocks.
	 */
	function register_blocks() {

		$helper = new WP_Block_Pack_Helper();

		// Advertisement - render
	    register_block_type( 'wp-block-pack/advertisement', array( 
	    	'render_callback' => array( $helper, 'render_advertisement') 
	    ) );
		// // Icon - Fontawesome icons
	    register_block_type( 'wp-block-pack/icon', array( 
	    	'editor_script' => 'fontawesome-script' 
	    ) );
	}

}

WP_Block_Pack_Core::run_this();
