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
 * WP Block Pack Enqueue Class
 */
final class WP_Block_Pack_Enqueue
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
		add_action( 'wp_enqueue_scripts', array( $this, 'wp_enqueue_site') );
		add_action( 'wp_head', array( $this, 'blocks_css' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'wp_enqueue_editor') );
		add_action( 'admin_enqueue_scripts', array( $this, 'wp_enqueue_admin') );
	}

	

	/**
	 * Enqueue on Front End.
	 * Fontawesome, script and, style.
	 */
	function wp_enqueue_site() {
		wp_enqueue_script ( 'fontawesome-script' );
		wp_enqueue_script ( 'wp-block-pack-script' );
		wp_enqueue_style ( 'wp-block-pack-style' );
		// wp_enqueue_style ( 'fontawesome-style' );
	}

	
	/**
	 * Auto write css for blocks called and appends in head tag of front end.
	 *
	 * @since 1.1.4
	 */
	public function blocks_css() {

		$this_post = array();

		?><style id="wp-block-pack-style" media="all"><?php 

		// Single
		if ( is_single() || is_page() || is_404() ) {
			global $post;
			$this_post = $post;
			$extractor = new WP_Block_Pack_Extractor();
			$extractor->blocks_single_css( $this_post );
			if ( ! is_object( $post ) ) {
				return;
			}
		} 
		// Multiple
		elseif ( is_archive() || is_home() || is_search() ) {
			global $wp_query;
			foreach ( $wp_query as $post ) {
				$extractor = new WP_Block_Pack_Extractor();
				$extractor->blocks_multi_css( $post );
			}
		}
		
		?></style>
		<?php
			
	}


	/**
	 * Enqueue on Back End.
	 * WP Block Icons and Options.
	 */
	function wp_enqueue_admin($hook) {
		if ('settings_page_wp-block-pack' != $hook) {
			return;
		}
		wp_enqueue_style ( 'wpblockicons-style' );
		wp_enqueue_style ( 'wp-block-pack-options' );

		// Custom CSS
        $color = '#FF0000'; //E.g. #FF0000
        $custom_css = "
            .more-options{
                    background: {$color};
            }";
        wp_add_inline_style( 'wp-block-pack-options', $custom_css );
	}
	

	/**
	 * Enqueue on Post/Page Editor.
	 * CSS and JS.
	 */
	function wp_enqueue_editor() {
		wp_enqueue_style ( 'wp-block-pack-editor' );
		wp_enqueue_script ( 'wp-block-pack-editor-script' );
	}
	

}

WP_Block_Pack_Enqueue::run_this();