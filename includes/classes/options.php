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
 * WP Block Pack Options Class
 */
class WP_Block_Pack_Options 
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
		add_action( 'admin_menu', array( $this, 'add_admin_page') );
		add_action( 'admin_init', array( $this, 'display_options') );
	}


    /**
     *  Add Option Page
     *  Put it as sub-menu of Option
     */
	function add_admin_page() {

		$wpblockpack_pagename = 'WP Block Pack';

		if (WP_BLOCK_PACK_PRO) { 
			$wpblockpack_pagename .= ' Pro';
		}
		
		add_submenu_page( 'options-general.php', $wpblockpack_pagename, $wpblockpack_pagename, 'manage_options', 'wp-block-pack', array( $this, 'admin_index') );
	}


    /**
     *  This is for plugin settings page
     */
	function admin_index() { 

        // Check if Pro Plugin Active
        if ( WP_BLOCK_PACK_PRO == false ) { 
            $wpblockpack_pagename = __('WP Block Pack');
            $wpblockpack_page_welcome = __('This is the future of website builder, Block Editor with WP Block Pack.');
            $pathWPBP = '<path d="M98-73H82.569V-83.286H98V-73ZM85.141-80.715v5.142H95.427v-5.142ZM80-73H62V-83.287H80V-73ZM98-85.856H74.857V-96.143H98v10.286Zm-36,0h0V-96.144H72.284V-85.86Zm2.57-7.716v5.143h5.142v-5.143ZM98-98.713H87.716V-109H98v10.285h0Zm-36,0h0V-109H85.142v10.283Zm2.57-7.713v5.142h18v-5.142Z" transform="translate(-61.998 109.001)"/>';
        } else { 
            $wpblockpack_pagename = __('WP Block Pack Pro');
            $wpblockpack_page_welcome = __('WP Block Pack Pro now became part of your Awesome Site.');
            $pathWPBP = '<path d="M-2126.43-50V-60.285H-2111V-50ZM-2147-50V-60.286h18V-50Zm12.857-12.855V-73.142H-2111v10.286Zm-12.857,0V-73.143h10.285v10.285Zm36-12.857h-10.283V-86H-2111v10.286Zm-36,0V-86h23.143v10.284Z" transform="translate(2147.001 86)"/>';
        }

?>
		<div id="wp-block-pack-wrapper" class="wrap <?php echo $this->options_wrapper_class();?>">
            <header id="page-options-header" class="page-options-header container">
                <div class="wp-block-pack-logo">
                    <svg width="36" height="36" viewBox="0 0 36 36"><defs><clipPath id="b"><rect width="36" height="36"/></clipPath><linearGradient id="wpbplogo" x1="0.493" y1="0.007" x2="0.52" y2="1.026"><stop offset="0" style="stop-color:#0073aa;stop-opacity:1" /><stop offset="1" style="stop-color:#3c3c92;stop-opacity:1" /></linearGradient></defs><g id="a" clip-path="url(#b)" style="fill: #0073aa;"><?php echo $pathWPBP; ?></g></svg>

                    <span><?php echo $wpblockpack_pagename; ?></span>
                </div>
                <span class="head-for welcome">Hello <?php echo wp_get_current_user()->display_name; ?>, welcome!</span>
                <span class="head-for block-options">Block Configuration</span>
                <span class="head-for general">General Plugin Settings</span>
                <span class="head-for extra">Extra</span>
                <span class="head-for pro">Special Offer</span>
                <nav id="wp-block-pack-options-nav" class="options-nav">
                    <ul class="clear">
                        <li class="welcome">Welcome</li>
                        <li class="block-options">Block Options</li>
                        <!-- <li class="general">General</li> -->
                        <li class="extra"><span class="dashicons dashicons-palmtree"></span></li>
                    <?php if (WP_BLOCK_PACK_RELEASE == false && !WP_BLOCK_PACK_PRO) { ?>
                        <li class="pro">Promo</li>
                    <?php } ?>

                    </ul>
                </nav>
            </header>
            <div id="page-options-content" class="page-options-content container">
                <section id="welcome" class="section welcome clear">
                    <div class="welcome-image">
                        <svg width="200" height="200" viewBox="0 0 36 36" style="transform: rotate(-7deg);"><defs><linearGradient id="wpbplogo" x1="0.493" y1="0.007" x2="0.52" y2="1.026"><stop offset="0" style="stop-color:#0073aa;stop-opacity:1" /><stop offset="1" style="stop-color:#3c3c92;stop-opacity:1" /></linearGradient></defs><g fill="url(#wpbplogo)"><?php echo $pathWPBP; ?></g></svg>
                    </div>
                    <div class="welcome-content">
                        <span class="head h2"><?php echo $wpblockpack_page_welcome; ?></span>
                        <p>Say hello to new experience of building WordPress content. With the new WordPress Block Editor, making content become a lot more fun and flexible. With lots of block content included inside core, and combined with our featured blocks collection, WP Block Pack.</p>
                        <p>Having a question? <a href="https://falcontheme.com/wpblockpack/support" class="help" rel="help">Tell our developers.</a></p>
                    </div>
                    <div class="clear"></div>
                </section>
                <section id="block-options" class="section block-options clear <?php if (!empty(get_option('wp-block-pack_grid_or_list'))) { echo get_option('wp-block-pack_grid_or_list'); } else {echo 'grid';}  ?><?php if( isset( $_GET[ 'block' ] ) &&  $_GET[ 'block' ] ){ echo ' specific-active'; } ?>">
                    <h1>All Blocks</h1>
                    <form id="wp-block-pack-options-form" method="post" action="options.php">
                        <?php

                            // add_settings_section callback is displayed here. For every new section we need to call settings_fields.
                            settings_fields("wp-block-pack_options-default");
                            
                            // The page where fields belongs to. All the add_settings_field callbacks is also displayed here.
                            do_settings_sections("wp-block-pack");
                        
                            // Add the submit button to serialize the options
                            submit_button( 'Save Changes', 'primary', 'submit-form' ); 
                            
                        ?>          
                    </form>
                </section>
                <section id="extra" class="section extra clear">
                    <header class="align-center">
                        <h2>Is your block editing feel easier now?</h2>
                        <p>You are using 'WP Block Pack' version <?php echo WP_BLOCK_PACK_VER; ?></p>
                    </header>
                    <div class="content-section">
                        <div class="area support">
                            <span class="icon dashicons dashicons-shield"></span>
                            <h3>Support & Help</h3>
                            <p>Need support or help? We got you covered. Create new topic at our support forum!</p>
                            <p><a target="_blank" href="https://wordpress.org/support/plugin/wp-block-pack">Open Support Forum</a></p>
                        </div>
                        <div class="area rating">
                            <span class="icon dashicons dashicons-heart"></span>
                            <h3>Rate WP Block Pack</h3>
                            <p>What do you think about this plugin? Do you love it? Hate it? Both? Let us know!</p>
                            <p><a target="_blank" href="https://wordpress.org/support/plugin/wp-block-pack/reviews">Give Stars</a></p>
                        </div>
                        <div class="area ideas">
                            <span class="icon dashicons dashicons-art"></span>
                            <h3>Block Ideas</h3>
                            <p>Got an awesome block idea we don't have yet? Tell us! We might create it for you.</p>
                            <p><a target="_blank" href="https://wpblockpack.com/ideas">Submit Ideas</a></p>
                        </div>
                    </div>
                </section>
                <section id="pro" class="section pro clear">
                    <header class="pro-header align-center">
                        <span class="head h2">Join Our Falcon Theme!</span>
                    </header>
                    <div class="pro-content align-center">
                        <p>You are not the only one that still getting used to "The New WordPress Block Editor". We have plan to make a helpfull community that take you to master this editor.</p>
                        <p>We also developing Pro Extension of WP Block Pack plugin. And will launch it on November 1, but pre-launch sale will open 1 month ahead, start on <strong>October 1, 2020</strong>.</p>
                        <a class="join-pro-button" href="https://falcontheme.com/register" target="_blank">Join Us</a>
                        <p>And Get 10% Discount Code of Future Pro for Free if you register before pre-launch.</p>
                     </div>
                <?php if (WP_BLOCK_PACK_RELEASE == false) { ?>
                    <div class="deep-promo">
                        <p class="get-deep"><a href="#">Get Deep Now!</a> <br>It's Free</p>
                        <span class="head h3">Wanna consider another theme for your site?</span>
                        <p><strong>Deep is our answer. </strong>Deep Theme was develop to support WordPress new editor in first place. Brings you everything wordpress.org community has to promise with this editor as much as possible.</p>
                    </div>
                <?php } ?>
                </section>
            </div>
		</div>
        <script>
            (function ($) {
                var wrapper = document.getElementById('wp-block-pack-wrapper');
                var stateObj = { foo: "bar" };
                var stateObj2 = "options-general.php?page=wp-block-pack";
                $('#wp-block-pack-options-nav ul').children('li').click(function(argument) {
                    var selectedClass = argument.currentTarget.className.split(' ')[0];
                    var wrapClass = wrapper.className.split(' ')[1];
                    if (wrapClass != selectedClass) {
                        wrapper.className = "wrap active " + selectedClass;                       
                        history.replaceState(stateObj, selectedClass, stateObj2+"&tab="+selectedClass);
                    }
                });

                $('.hide-show').click(function(argument) {
                    $(this).parents('li').toggleClass('block-hidden');
                });
                function submitForm() { // submits form
                    document.getElementById('wp-block-pack-options-form').submit();
                }

                $('#submit-form.button').click(function(argument) {
                    argument.preventDefault();
                    setTimeout(submitForm, 100);
                    $('html, body').animate({scrollTop: 0}, 800);
                    $('body').addClass('wait');
                    $('.all-blocks-area').css("display", "block");
                    function allBlocksSetBlock(){
                        $('#block-options').addClass('saving');
                    }
                    $('.specific-block-area').removeClass('active').removeClass('ready');
                    setTimeout(allBlocksSetBlock, 10);
                    history.replaceState(stateObj, "block-options", stateObj2+"&tab=block-options");
                });
                $('.button-return').click(function(argument) {
                    function allBlocksSetShow(){
                        $('#block-options').removeClass('specific-active');
                    }
                    setTimeout(allBlocksSetShow, 400);

                    $('.all-blocks-area').removeClass('unshow');

                    $('.specific-block-area').removeClass('ready');
                    $('.specific-block-area').removeClass('active');
                    function specificShow(){
                        $('.specific-block-area').removeClass('show');
                    }
                    setTimeout(specificShow, 400);
                    history.replaceState(stateObj, "block-options", stateObj2+"&tab=block-options");
                });
                $('.activation-it').click(function(argument) {
                    var thisLi = $(this).parents('li');

                    function activatiOn() {
                        thisLi.toggleClass('block-active').toggleClass('block-inactive').removeClass('block-shrink');
                        var amount_of_active_now = document.getElementById('all-blocks').getElementsByClassName('block-active').length;
                        if (amount_of_active_now > 0) {
                            $('.no-active').addClass('hide');
                        } else {
                            $('.no-active').removeClass('hide');
                        }
                        var amount_of_inactive_now = document.getElementById('all-blocks').getElementsByClassName('block-inactive').length;
                        if (amount_of_inactive_now > 0) {
                            $('.no-inactive').addClass('hide');
                            $('.message-for-inactive').removeClass('hide');
                        } else {
                            $('.no-inactive').removeClass('hide');
                            $('.message-for-inactive').addClass('hide');
                        }
                    }

                    setTimeout(activatiOn, 450);
                    thisLi.addClass('block-shrink').toggleClass('modal-on');

                });
                $('.toggle-deactiva').click(function(argument) {
                    $(this).parents('li').toggleClass('modal-on');
                });
                $('.close-modal').click(function(argument) {
                    $(this).parents('li').removeClass('modal-on');
                });
                $('#wpblockpack-tab-button-active').click(function(argument) {
                    var amount_of_active_now = document.getElementById('all-blocks').getElementsByClassName('block-active').length;
                    if (amount_of_active_now > 0) {
                        $('.no-active').addClass('hide');
                    } else {
                        $('.no-active').removeClass('hide');
                    }
                    $('#all-blocks').removeClass('inactive').addClass('active');
                    $('#wpblockpack-tab-button-deactive').removeClass('on');
                    $('#wpblockpack-tab-button-active').addClass('on');
                    $('.for-inactive').addClass('hide');
                });
                $('#wpblockpack-tab-button-deactive').click(function(argument) {
                    var amount_of_inactive_now = document.getElementById('all-blocks').getElementsByClassName('block-inactive').length;
                    if (amount_of_inactive_now > 0) {
                        $('.no-inactive').addClass('hide');
                    } else {
                        $('.no-inactive').removeClass('hide');
                    }
                     $('#all-blocks').removeClass('active').addClass('inactive');
                    $('#wpblockpack-tab-button-active').removeClass('on');
                    $('#wpblockpack-tab-button-deactive').addClass('on');
                });
                $('#wpblockpack-view-grid').click(function(argument) {
                    $('#block-options').removeClass('list');
                    $('#wpblockpack-view-list').removeClass('on');
                    $('#wpblockpack-view-grid').addClass('on');
                    $('#block-options').addClass('grid');
                });
                $('#wpblockpack-view-list').click(function(argument) {
                    $('#block-options').removeClass('grid');
                    $('#wpblockpack-view-grid').removeClass('on');
                    $('#wpblockpack-view-list').addClass('on');
                    $('#block-options').addClass('list');
                });
            })(jQuery);
            function specificOn(value) {
                (function ($) {
                    function allBlocksSetNone(){
                        $('.all-blocks-area').addClass('unshow');
                    }
                    setTimeout(allBlocksSetNone, 800);

                    $('html, body').animate({scrollTop: $("#page-options-content").offset().top}, 800);
                    $('#block-options').addClass('specific-active');

                    var specficActive = document.getElementsByClassName(value);
                    function specificActive(){
                        $(specficActive).addClass('active');
                    }
                    function specificReady(){
                        $(specficActive).addClass('ready');
                    }
                    $(specficActive).addClass('show');
                    setTimeout(specificActive, 10);
                    setTimeout(specificReady, 800);
                var stateObj = { foo: "bar" };
                var stateObj2 = "options-general.php?page=wp-block-pack";
                    history.pushState(stateObj, value, stateObj2+"&tab=block-options&block="+value);
                })(jQuery);
            }
        </script>
<?php	}


    /**
     *  Change class of wrap (tabbed style).
     */
    function options_wrapper_class(){
        if( isset( $_GET[ 'settings-updated' ] ) &&  $_GET[ 'settings-updated' ] ){ 
            return "block-options"; 
        } else { 
            if( isset( $_GET[ 'tab' ] ) &&  $_GET[ 'tab' ] ){ 
                return $_GET[ 'tab' ]; 
            } else {
                return "welcome";
            }        
        }
    }


    /**
     *  Set settings fields inside form.
     */
    function display_options(){

        //add_settings_section: section name, display name, callback to print description of section, page to which section is attached.
        add_settings_section("wp-block-pack_options-head", "Your Blocks, Your Rule", array( $this, "display_options_head"), "wp-block-pack");

        //add_settings_section: section name, display name, callback to print description of section, page to which section is attached.
        add_settings_section("wp-block-pack_options-default", null, array( $this, "display_options_default"), "wp-block-pack");

        // section for advertisement block .
        add_settings_section("wp-block-pack_options_advertisement", null, array( $this, "display_advertisement_options_content"), "wp-block-pack");

        //add_settings_section: section name, display name, callback to print description of section, page to which section is attached.
        add_settings_section("wp-block-pack_options-footer", null, array( $this, "display_options_footer"), "wp-block-pack");

        //section name, form element name, callback for sanitization
        register_setting("wp-block-pack_options-default", "wp-block-pack_hidden_blocks_list");
        register_setting("wp-block-pack_options-default", "wp-block-pack_deactivated_blocks_list");
            if (WP_BLOCK_PACK_PRO) { 
                register_setting("wp-block-pack_options-default", "wp-block-pack-pro_hidden_blocks_list");
                register_setting("wp-block-pack_options-default", "wp-block-pack-pro_deactivated_blocks_list");
            }
        register_setting("wp-block-pack_options-default", "wp-block-pack_grid_or_list");

        register_setting("wp-block-pack_options-default", "block_advertisement_code");
    }


    /**
     *  Option Page Head.
     *  HTML for head of option page.
     */
    function display_options_head(){

        echo "<div style='position: relative; padding: 0 3px; overflow: hidden;'>";
    }


    /**
     *  Option Page Content Default.
     *  HTML for default form of option page.
     */
    function display_options_default(){

        $hidden_blocks_list = get_option('wp-block-pack_hidden_blocks_list');
        $deactivated_blocks_list = get_option('wp-block-pack_deactivated_blocks_list');
        $grid_or_list = get_option('wp-block-pack_grid_or_list');

 ?>
        <div class="all-blocks-area<?php if( isset( $_GET[ 'block' ] ) &&  $_GET[ 'block' ] ){ echo ' unshow'; } ?>">       
            <p class="all-blocks-description align-center">Control each block. Hide/Show and Deactivate/Activate (also Settings, if the block support it). 
                <br>Please remember that no change will be made until you save it.</p>
            <div class="all-blocks-control align-center">
                <div class="group">
                    <span id="wpblockpack-tab-button-active" class="button wpblockpack-button on">Active</span>
                    <span id="wpblockpack-tab-button-deactive" class="button wpblockpack-button">Inactive</span>
                </div>
                <div class="group">
                    <input type="radio" id="wp-block-pack_gridorlist_grid" name="wp-block-pack_grid_or_list" value="grid"<?php if (!empty($grid_or_list)) { echo ($grid_or_list == 'grid') ? ' checked' : ''; } else {echo ' checked';}  ?> />
                    <label for="wp-block-pack_gridorlist_grid" id="wpblockpack-view-grid" class="button wpblockpack-button<?php if (!empty($grid_or_list)) { echo ($grid_or_list == 'grid') ? ' on' : ''; } else {echo ' on';}  ?>"><span class="dashicons dashicons-grid-view"></span></label>
                    <input type="radio" id="wp-block-pack_gridorlist_list" name="wp-block-pack_grid_or_list" value="list"<?php echo ($grid_or_list == 'list') ? ' checked' : '';  ?> />
                    <label for="wp-block-pack_gridorlist_list" id="wpblockpack-view-list" class="button wpblockpack-button<?php echo ($grid_or_list == 'list') ? ' on' : '';  ?>"><span class="dashicons dashicons-list-view"></span></label>
                </div>
                <?php submit_button( 'Save Changes', 'primary', 'submit-form' ); ?>
            </div>
            <ul id="all-blocks" class="show active">
<?php 

        // Define array of blocks
        // Regular Blocks
        $reg_blocks_props = array(

            // array(
            //     "development"  => true, 
            //     "name"         => "Heading Pro", 
            //     "description"  => "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, in.", 
            //     "slug"         => "heading-pro", 
            // ),
            // array(
            //     "development"  => true, 
            //     "name"         => "Contact Form 7 Styler", 
            //     "description"  => "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, in.", 
            //     "slug"         => "cf7-styler", 
            // ),
            // array(
            //     "development"  => true, 
            //     "name"         => "Marketing Button", 
            //     "description"  => "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, in.", 
            //     "slug"         => "marketing-button", 
            // ),
            // array(
            //     "development"  => true, 
            //     "name"         => "Clip Pics", 
            //     "description"  => "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, in.", 
            //     "slug"         => "clip-pics", 
            // ),
            array(
                "name"         => "Section", 
                "description"  => "Style a group of blocks. Control almost everything. Give good appearance.", 
                "slug"         => "section", 
            ),
            array(
                "name"         => "Drop Cap", 
                "description"  => "Just a simple regular paragraph with way more advanced Drop Cap control.", 
                "slug"         => "drop-cap" 
            ),
            array(
                "name"         => "Counter", 
                "description"  => "Animating increased numbers. Block for display set of individual counter.", 
                "slug"         => "counter" 
            ),
            array(
                "name"         => "Icon", 
                "description"  => "Display simple icon. Use your favorite Dashicon or Fontawesome and style them.", 
                "slug"         => "icon" 
            ),
            array(
                "name"         => "Buttons Pro", 
                "description"  => "Button(s) with advanced control over icon, size, color and, hover transition.", 
                "slug"         => "button-pro" 
            ),
            
            array(
                "name"         => "Accordion", 
                "description"  => "Display accordion section with titles and texts. Support up to 7 panels.", 
                "slug"         => "accordion-lite" 
            ),
            array(
                "name"         => "Tabs", 
                "description"  => "Build HTML tabs with titles and any choosen blocks inside content area.", 
                "slug"         => "tabs" 
            ),
            array(
                "name"         => "Testimonial", 
                "description"  => "Display a testimonial or feedback sentence from client or anyone you want.", 
                "slug"         => "testimonial" 
            ),
            array(
                "name"         => "Notice", 
                "description"  => "Simple notification with beautiful 4 pre-made and custom style options.", 
                "slug"         => "notice" 
            ),
            array(
                "name"         => "Blockquote", 
                "description"  => "Display an awesome blockquote with 6 pre-made styles and advanced control.", 
                "slug"         => "blockquote" 
            ),
            array(
                "name"         => "Advertisement", 
                "description"  => "Display simple html ad. One code to display on all your post/page.", 
                "slug"         => "advertisement", 
                "setting"      => true, 
            ),
            
        );


        // Define empty class
        $class_no_active_onload = '';
        $class_for_inactive_onload = '';
        $class_no_inactive_onload = '';

        // Class onload
        if (is_array($deactivated_blocks_list)) {
            $class_no_inactive_onload = ' hide';
            if (sizeof($deactivated_blocks_list['deactivated_blocks_name']) !== sizeof($reg_blocks_props)) {
                $class_no_active_onload = ' hide';
            }
        } else {
            $class_for_inactive_onload = ' hide';
            $class_no_active_onload = ' hide';
        }

?>

                <p class='nothing no-active<?php echo $class_no_active_onload; ?>'>You have no active block .... eh?.<br>Why?</p>
                <p class='message-for-inactive<?php echo $class_for_inactive_onload; ?>'>The deactivated blocks will be removed completely from editor, make sure you didn't use these blocks at all.</p> 
                <p class='nothing no-inactive<?php echo $class_no_inactive_onload; ?>'>You have no deactivated block.</p>


<?php
        do_action('wpblockpack_extend_settings');

        // Print all blocks as boxes
        foreach ($reg_blocks_props as $each_block_props) {

            // Do not load anything if "both block and plugin are still in development" or "it is pro block but pro plugin does not active"
            if (array_key_exists('development', $each_block_props) && WP_BLOCK_PACK_RELEASE == true) {

                // Empty

            } 

            // Load
            else { ?>

                <li class="<?php 
                    // Class for active or inactive block
                    if (is_array($deactivated_blocks_list)) { 
                        echo in_array($each_block_props["slug"], $deactivated_blocks_list['deactivated_blocks_name']) ? 'block-inactive' : 'block-active'; 
                    } else {
                        echo "block-active";
                    }
                    // Class for hide or show block
                    if (is_array($hidden_blocks_list)) { 
                        echo in_array($each_block_props["slug"], $hidden_blocks_list['hidden_blocks_name']) ? ' block-hidden' : ''; 
                    }
                    
                    // Class for pro blocks
                    if (array_key_exists('pro', $each_block_props)) {
                        echo ' block-pack-pro'; 
                    }

                     ?>">
                    <h3><?php echo $each_block_props["name"]; ?></h3>
                    <span class="wp-block-pack_block-icon wpblockicons wpblockicons-<?php echo $each_block_props["slug"]; ?>"></span>
                    <p><?php echo $each_block_props["description"]; ?></p>
                    <div class="buttons-pack">
                    <?php if (array_key_exists('setting', $each_block_props)) { ?>
                        <span class="button" onclick="specificOn('area-<?php echo $each_block_props["slug"]; ?>')">Settings</span>
                    <?php } ?>
                        <input type="checkbox" id="wp-block-pack_hidden_blocks_list_<?php echo $each_block_props["slug"]; ?>" name="wp-block-pack_hidden_blocks_list[hidden_blocks_name][]" value="<?php echo $each_block_props["slug"]; ?>"<?php if (is_array($hidden_blocks_list)) { echo in_array($each_block_props["slug"], $hidden_blocks_list['hidden_blocks_name']) ? 'checked' : ''; } ?> />
                        <label for="wp-block-pack_hidden_blocks_list_<?php echo $each_block_props["slug"]; ?>" class="button hide-show"></label>
                        <span class="toggle-deactiva"></span>
                    </div>
                    <div class="modal-deactivate">
                        <div class="contain">
                            <h4 class="deactivating">Deactivate?</h4>
                            <p class="deactivating">You are about to inactivating the "<?php echo $each_block_props["name"]; ?>" block. Are you sure?</p>
                            <h4 class="activating">Activate?</h4>
                            <p class="activating">You are about to re-activating the "<?php echo $each_block_props["name"]; ?>" block. Are you sure?</p>
                            <div>
                                <span class="close-modal button">Cancel</span> 
                                <input type="checkbox" id="wp-block-pack_deactivated_blocks_list_<?php echo $each_block_props["slug"]; ?>" name="wp-block-pack_deactivated_blocks_list[deactivated_blocks_name][]" value="<?php echo $each_block_props["slug"]; ?>"<?php if (is_array($deactivated_blocks_list)) { echo in_array($each_block_props["slug"], $deactivated_blocks_list['deactivated_blocks_name']) ? 'checked' : ''; } ?> />
                                <label for="wp-block-pack_deactivated_blocks_list_<?php echo $each_block_props["slug"]; ?>" class="button activation-it"></label>
                                <span class="toggle-deactiva"></span>
                            </div>
                        </div>
                    </div>
                </li>
<?php 
            }
        } 
?>        
            </ul>
        </div>
<?php

    }


    /**
     *  Option Page Content Ad.
     *  HTML for advertisement setting content of option page.
     */
    function display_advertisement_options_content(){
        //id and name of form element should be same as the setting name.
        ?>
        <div class="specific-block-area area-advertisement<?php if( isset( $_GET[ 'block' ] ) &&  ($_GET[ 'block' ] == 'area-advertisement')){ echo ' show active ready'; } ?>">     
           <p class="specific-block-description align-center">Enter your ad code here to display in Advertisement Block. It could be Javascript code or HTML or anything.</p>
            <div class="all-blocks-control align-center">
                <div class="group">
                    <span class="button wpblockpack-button button-return">Back</span>
                </div>
                <?php submit_button( 'Save Changes', 'primary', 'submit-form' ); ?>
            </div>
            <div class="specific-block-settings">
                <h3>Advertisement Block Option</h3>
                <table class="form-table">
                    <tbody>
                        <tr>
                            <th scope="row"><label for="block_advertisement_code">Your ad code</label></th>
                            <td id="front-static-pages">
                                <fieldset>
                                    <legend class="screen-reader-text"><span>Your ad code</span></legend>
                                    <p>
                                        <textarea name="block_advertisement_code" id="block_advertisement_code"><?php echo get_option('block_advertisement_code'); ?></textarea>
                                    </p>
                                </fieldset>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }


    /**
     *  Option Page Footer.
     *  HTML for footer of option page.
     */
    function display_options_footer(){
        echo "</div>";
    }


}

WP_Block_Pack_Options::run_this();
