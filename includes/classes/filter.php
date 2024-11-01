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
 * WP Block Pack Filter Class
 */
final class WP_Block_Pack_Filter
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
		add_action( 'admin_enqueue_scripts', array( $this, 'wp_enqueue_editor_filter') );
		$this->filter();
	}


	/**
	 * Enqueue on Front End.
	 * Use development mode or plugin version.
	 */
	function wp_enqueue_editor_filter() {
		$hidden_blocks_list = get_option('wp-block-pack_hidden_blocks_list');
		$deactivated_blocks_list = get_option('wp-block-pack_deactivated_blocks_list');
		$hidden_blockspro_list = get_option('wp-block-pack-pro_hidden_blocks_list');
		$deactivated_blockspro_list = get_option('wp-block-pack-pro_deactivated_blocks_list');
		if ( isset( $content_width ) ) {
			$wpblockpack_content_width = $GLOBALS['content_width'];
		} else {
			$wpblockpack_content_width = 640;
		}
 ?>
<script> 
	var wpblockpackHiddenBlocks = [<?php if (is_array($hidden_blocks_list)) { echo "'" . implode("', '", $hidden_blocks_list['hidden_blocks_name'] ) . "'" ; } ?>];
	var wpblockpackBlocksDeactivated = [<?php if (is_array($deactivated_blocks_list)) { echo "'wp-block-pack/" . implode("', 'wp-block-pack/", $deactivated_blocks_list['deactivated_blocks_name'] ) . "'" ; } ?>];
<?php if (WP_BLOCK_PACK_PRO) { ?>
	var wpBlockPackPro = true;
	var wpblockpackproHiddenBlocks = [<?php if (is_array($hidden_blockspro_list)) { echo "'" . implode("', '", $hidden_blockspro_list['hidden_blocks_name'] ) . "'" ; } ?>];
	var wpblockpackproBlocksDeactivated = [<?php if (is_array($deactivated_blockspro_list)) { echo "'wp-block-pack/" . implode("', 'wp-block-pack/", $deactivated_blockspro_list['deactivated_blocks_name'] ) . "'" ; } ?>];
<?php } else {?>
	var wpBlockPackPro = false;
<?php } ?>
	var wpblockpack_content_width = <?php echo $wpblockpack_content_width; ?> ;
<?php if (get_theme_support('align-wide')) { ?>
	var theme_support_wide = true; ;
<?php } else { ?>
	var theme_support_wide = false; ;
<?php } ?>
</script>
<?php }


	function action_links( $links ) {
		$links[] = '<a href="' . admin_url( 'options-general.php?page=wp-block-pack&tab=block-options' ) . '">Settings</a>';
		// if( ! array_key_exists( 'wp-block-pack-pro/wp-block-pack-pro.php', get_plugins() ) ) {
		//	$links[] = '<a href="https://wpblockpack.com/pro" class="go-pro-link">Get Pro</a>';
		// }
		return array_merge( $links );
	}

	function meta_links( $links_array, $plugin_file_name, $plugin_data, $status ){
		if( strpos( $plugin_file_name, basename( WP_BLOCK_PACK_FILE_ ) ) ) {
			$links_array[] = '<a href="https://wpblockpack.com/question-answered">Q&A</a>';
			$links_array[] = '<a href="https://wpblockpack.com/support">Support</a>';
		}
	 	return $links_array;
	}

	function filter() {
		if ( !WP_BLOCK_PACK_PRO ) {
			add_filter( 'plugin_action_links_'. WP_BLOCK_PACK_PLUGIN_BASE, array( $this, 'action_links') );
		}
		// add_filter( 'plugin_row_meta', array( $this, 'meta_links'), 10, 4 );
	}

}

WP_Block_Pack_Filter::run_this();