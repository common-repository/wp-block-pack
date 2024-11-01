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
 * WP Block Pack Loader Class
 */
final class WP_Block_Pack_Loader 
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
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_page_favicon') );
		$this->others();
	}
	


	function admin_page_favicon($hook) {
        // Load only on ?page=wp-block-pack
        if($hook != 'settings_page_wp-block-pack') {
                return;
        }

			$favicon_link = WP_BLOCK_PACK_URI . 'assets/icons/wpblockicons/';

			if (!WP_BLOCK_PACK_PRO) { 
				$favicon_link .= 'favicon.png';
			} else { 
				$favicon_link .= 'favicon-pro.png';
			}
?>
<link rel="icon" href="<?php echo $favicon_link; ?>" type="image/x-icon">
<?php 	}


	/**
	 * Load other files.
	 */
	public function others() {

		require( WP_BLOCK_PACK_CLASSES . '/core.php' );
		require( WP_BLOCK_PACK_CLASSES . '/enqueue.php' );
		require( WP_BLOCK_PACK_CLASSES . '/extractor.php' );
		require( WP_BLOCK_PACK_CLASSES . '/filter.php' );
		require( WP_BLOCK_PACK_CLASSES . '/options.php' );
		require( WP_BLOCK_PACK_CLASSES . '/helper.php' );
	}

}

WP_Block_Pack_Loader::run_this();



