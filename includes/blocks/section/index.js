// Block: Section
// Since ver 1.1.4

var iSection = el( SVG, { width: 24, height: 24 },
    el( 'path', { d: "M22 22.001H2v-20h20v20zm-10-12v7h5v-7zm-5 5v2h4v-2zm2-5a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2zm-2-3v2h10v-2z" })
);

registerBlockType('wp-block-pack/section', {
    title: 'Section',
    description: 'Style a group of blocks. Control almost everything. Give good appearance.', 
    icon: iSection,
    category: 'layout',
    keywords: [ "background", "section", "cover" ],
    attributes: {
        id: {
            type: 'string'
        },
        startSet: {
            type: 'bool',
            default: false
        },
        alignment: {
            type: 'string'
        },
        float: {
            type: 'string',
        },
        htmlTag: {
            type: 'string',
            default: 'section',
        },
        height: {
            type: 'string',
        },
        padding: {
            type: 'string',
        },
        paddingTop: {
            type: 'number',
        },
        paddingRight: {
            type: 'number',
        },
        paddingBottom: {
            type: 'number',
        },
        paddingLeft: {
            type: 'number',
        },
        margin: {
            type: 'string',
        },
        marginTop: {
            type: 'number',
        },
        marginRight: {
            type: 'number',
        },
        marginBottom: {
            type: 'number',
        },
        marginLeft: {
            type: 'number',
        },
        contentWidth: {
            type: 'string',
        },
        contentCustom: {
            type: 'number',
            default: 640,
        },
        textColor: {
            type: 'string',
        },
        linkColor: {
            type: 'string',
        },
        linkHoverColor: {
            type: 'string',
        },
        backgroundType: {
            type: 'string',
        },
        backgroundOverlay: {
            type: 'string',
        },
        backgroundColor: {
            type: 'string',
        },
        backgroundColor2: {
            type: 'string',
        },
        backgroundImgURL: {
            type: 'string',
        },
        backgroundImgAtt: {
            type: 'string',
        },
        backgroundImgPos: {
            type: 'string',
        },
        backgroundImgRep: {
            type: 'string',
        },
        backgroundImgSize: {
            type: 'string',
        },
        backgroundVidURL: {
            type: 'string',
        },
        backgroundOpacity: {
            type: 'number',
        },
        backgroundDirection: {
            type: 'string',
        },
        backgroundAngle: {
            type: 'number',
        },
        backgroundRadialShape: {
            type: 'string',
        },
        backgroundRadialAt: {
            type: 'string',
        },
        background1Transparancy: {
            type: 'number',
        },
        background1Position: {
            type: 'number',
        },
        background2Transparancy: {
            type: 'number',
        },
        background2Position: {
            type: 'number',
        },
        borderStyle: {
            type: 'string',
        },
        borderWidth: {
            type: 'number',
        },
        borderColor: {
            type: 'string',
        },
        borderRadius: {
            type: 'number',
        },
        isShadow: {
            type: 'bool',
            default: true,
        },
        shadowX: {
            type: 'number',
        },
        shadowY: {
            type: 'number',
        },
        shadowBlur: {
            type: 'number',
        },
        shadowWide: {
            type: 'number',
        },
        shadowColor: {
            type: 'string',
        },
        shadowOpacity: {
            type: 'number',
        },
    },
    supports: {
        className: false,
        inserter: wpblockpackInserter('section'),
        align: ['wide', 'full'],
    },
    getEditWrapperProps: function getEditWrapperProps(attributes) {
        var align = attributes.align;
        var float = attributes.float;

        var props = { 'data-resized': true };

        if (('left' === float || 'right' === float) && !align) {
            props['data-align'] = float;
        }

        return props;
    },
    
    edit: withState( { openModal: false, sectionPick: undefined, darkMode: false } )(function(props) {
        var openModal = props.openModal;
        var sectionPick = props.sectionPick;
        var darkMode = props.darkMode;
        var setState = props.setState;

        var id = props.attributes.id;
        var align = props.attributes.align;
        var startSet = props.attributes.startSet;
        var alignment = props.attributes.alignment;
        var float = props.attributes.float;
        var htmlTag = props.attributes.htmlTag;
        var height = props.attributes.height;
        var paddingTop = props.attributes.paddingTop;
        var paddingRight = props.attributes.paddingRight;
        var paddingBottom = props.attributes.paddingBottom;
        var paddingLeft = props.attributes.paddingLeft;
        var marginTop = props.attributes.marginTop;
        var marginRight = props.attributes.marginRight;
        var marginBottom = props.attributes.marginBottom;
        var marginLeft = props.attributes.marginLeft;
        var contentWidth = props.attributes.contentWidth;
        var contentCustom = props.attributes.contentCustom;
        var textColor = props.attributes.textColor;
        var linkColor = props.attributes.linkColor;
        var linkHoverColor = props.attributes.linkHoverColor;
        var backgroundType = props.attributes.backgroundType;
        var backgroundOverlay = props.attributes.backgroundOverlay;
        var backgroundColor = props.attributes.backgroundColor;
        var backgroundColor2 = props.attributes.backgroundColor2;
        var backgroundImgURL = props.attributes.backgroundImgURL;
        var backgroundImgPos = props.attributes.backgroundImgPos;
        var backgroundImgAtt = props.attributes.backgroundImgAtt;
        var backgroundImgRep = props.attributes.backgroundImgRep;
        var backgroundImgSize = props.attributes.backgroundImgSize;
        var backgroundVidURL = props.attributes.backgroundVidURL;
        var backgroundOpacity = props.attributes.backgroundOpacity;
        var backgroundDirection = props.attributes.backgroundDirection;
        var backgroundAngle = props.attributes.backgroundAngle;
        var backgroundRadialShape = props.attributes.backgroundRadialShape;
        var backgroundRadialAt = props.attributes.backgroundRadialAt;
        var background1Transparancy = props.attributes.background1Transparancy;
        var background1Position = props.attributes.background1Position;
        var background2Transparancy = props.attributes.background2Transparancy;
        var background2Position = props.attributes.background2Position;
        var borderStyle = props.attributes.borderStyle;
        var borderWidth = props.attributes.borderWidth;
        var borderColor = props.attributes.borderColor;
        var borderRadius = props.attributes.borderRadius;
        var isShadow = props.attributes.isShadow;
        var shadowX = props.attributes.shadowX;
        var shadowY = props.attributes.shadowY;
        var shadowBlur = props.attributes.shadowBlur;
        var shadowWide = props.attributes.shadowWide;
        var shadowColor = props.attributes.shadowColor;
        var shadowOpacity = props.attributes.shadowOpacity;


        // Block ID
        // ID Static
        if (!id) {
            props.setAttributes( { id: 'wp-block-pack-section-'+ props.clientId } );
        }
        // ID Dynamic
        if (id != ('wp-block-pack-section-'+ props.clientId) ) {
            props.setAttributes( { id: 'wp-block-pack-section-'+ props.clientId } );
        }


        var contentWrapStyle = function contentWrapStyle() {
            cws = {width: '640px'}
            if(contentWidth == 'custom' && contentCustom){

            }

            return cws;
        }

        // For StartUp Modal. Update in the future
        if(!startSet) {
            props.setAttributes( { startSet: true } );
        }
        var sectionTemplate = [];
        if (sectionPick == 'blank') {
            var sectionTemplate = [['core/paragraph']];
        }
        if (sectionPick == 'a2') {
            var sectionTemplate = [['wp-block-pack/notice']];
        }
        if (sectionPick == 'b1') {
            var sectionTemplate = [['wp-block-pack/button-pro']];
        }
        else if (sectionPick == 'b2') {
            var sectionTemplate = [['wp-block-pack/tabs']];
        }
        if (sectionPick == 'c1') {
            var sectionTemplate = [['wp-block-pack/button-pro']];
        }
        else if (sectionPick == 'c2') {
            var sectionTemplate = [['wp-block-pack/tabs']];
        }

        var the9Positions = [ 
            {label: 'Top Left', value: 'top left'}, 
            {label: 'Top Center', value: 'top center'}, 
            {label: 'Top Right', value: 'top right'}, 
            {label: 'Center Left', value: 'center left'}, 
            {label: 'Center Center', value: 'center center'}, 
            {label: 'Center Right', value: 'center right'}, 
            {label: 'Bottom Left', value: 'bottom left'}, 
            {label: 'Bottom Center', value: 'bottom center'}, 
            {label: 'Bottom Right', value: 'bottom right'},
        ];


        // Block Width based on theme support
        if(theme_support_wide) {
            var blockWidthOptions = [ 
                {label: 'Full Width', value: 'full'},
                {label: 'Normal', value: 'normal'}, 
                {label: 'Wide Width', value: 'wide'},
            ];
            var blockWidthHelp = [(align == 'full') && 'Block now shown in full screen width.' || (align == 'wide') && 'Block now shown in wide width.' || 'Block width will be relative.'];
        } else {
            var blockWidthOptions = [ {label: '', value: undefined}, {label: 'Normal', value: 'normal'}, ];
            var blockWidthHelp = [(align == 'full') && 'Sorry, the Theme you use does not support Full screen width.' || (align == 'wide') && 'Sorry, the Theme you use does not support Wide width.' || 'Block width will be relative.'];
        }

        var sectionStyle = function sectionStyle(){
            // Group per html tag
            if (backgroundColor) {  theBGColor = backgroundColor; } else { theBGColor = '#f7f8f9'; }
            if (background1Transparancy || background1Transparancy == 0) { theBG1Trans = background1Transparancy; } else { theBG1Trans = 100; }
            if (backgroundColor2) {  theBGColor2 = backgroundColor2; } else { theBGColor2 = '#c7c8c9'; }
            if (background2Transparancy || background2Transparancy == 0) { theBG2Trans = background2Transparancy; } else { theBG2Trans = 100; }
            if (backgroundOpacity || backgroundOpacity == 0) { theBGOpacity = backgroundOpacity / 100 } else { theBGOpacity = 1 }
            bs = ''

            // Main Section
            bs += '#'+ id +'.wp-block-pack-section{'
                // Background
                if (!backgroundType) {
                    bs += 'background-color:' + hexToRgba(theBGColor, theBG1Trans) + ';'
                } else if (backgroundType == 'image') {
                    if (backgroundImgURL) {
                        bs += 'background-image: url(' + backgroundImgURL + ');'
                        // position, attachment, repeat, size
                        bs += 'background-position: ' 
                            if (backgroundImgPos) {
                                bs += backgroundImgPos
                            } else {
                                bs += 'center'
                            }
                        bs += ';'
                        bs += 'background-attachment: ' 
                            if (backgroundImgAtt) {
                                bs += backgroundImgAtt
                            } else {
                                bs += 'scroll'
                            }
                        bs += ';'
                        bs += 'background-repeat: ' 
                            if (backgroundImgRep) {
                                bs += backgroundImgRep
                            } else {
                                bs += 'no-repeat'
                            }
                        bs += ';'
                        bs += 'background-size: ' 
                            if (backgroundImgSize) {
                                bs += backgroundImgSize
                            } else {
                                bs += 'cover'
                            }
                        bs += ';'
                    }
                }
                // Padding
                if (paddingTop || paddingTop == 0) {
                    bs += 'padding-top: '+ paddingTop +'px;'
                }
                if (paddingRight || paddingRight == 0) {
                    bs += 'padding-right: '+ paddingRight +'px;'
                }
                if (paddingBottom || paddingBottom == 0) {
                    bs += 'padding-bottom: '+ paddingBottom +'px;'
                }
                if (paddingLeft || paddingLeft == 0) {
                    bs += 'padding-left: '+ paddingLeft +'px;'
                }
                // Margin
                if (marginTop || marginTop == 0) {
                    bs += 'margin-top: '+ marginTop +'px;'
                }
                if (marginRight || marginRight == 0) {
                    bs += 'margin-right: '+ marginRight +'px;'
                }
                if (marginBottom || marginBottom == 0) {
                    bs += 'margin-bottom: '+ marginBottom +'px;'
                }
                if (marginLeft || marginLeft == 0) {
                    bs += 'margin-left: '+ marginLeft +'px;'
                }
                // Text Align 
                if (alignment) {
                    bs += 'text-align: '+ alignment +';'
                }
                // Border Radius 
                if (borderRadius || borderRadius == 0) {
                    bs += 'border-radius: '+ borderRadius +'px;'
                }
                // Shadow 
                if (isShadow) {
                    bs += 'box-shadow: '
                    if (shadowX) { bs += shadowX +'px ' } else { bs += '0px ' }
                    if (shadowY) { bs += shadowY +'px ' } else { bs += '1px ' }
                    if (shadowBlur || shadowBlur == 0) { bs += shadowBlur +'px ' } else { bs += '5px ' }
                    if (shadowWide) { bs += shadowWide +'px ' } else { bs += '0px ' }

                    if (shadowColor) {  theShadowColor = shadowColor; } else { theShadowColor = '#23282d'; }
                    if (shadowOpacity || shadowOpacity == 0) { theShadowOpacity = shadowOpacity; } else { theShadowOpacity = 30; }

                    bs += hexToRgba(theShadowColor, theShadowOpacity)+ ';'
                }
                // Color 
                if (textColor) {
                    bs += 'color: '+ textColor +';'
                }
                // Border 
                if (borderStyle && (borderStyle != 'none' && borderStyle != 'hidden')) {
                    bs += 'border-style: '+ borderStyle +';'
                    if (borderWidth || borderWidth == 0) {
                        bs += 'border-width: '+ borderWidth +'px;'
                    } else {
                        bs += 'border-width: 1px;'
                    }
                    if (borderColor) {
                        bs += 'border-color: '+ borderColor +';'
                    }
                }
            bs += '}'

                // Sub Section, based on attributes
                // .wp-block-pack-section a
                if (linkColor) {
                    bs += '#'+ id +'.wp-block-pack-section a{color: '+ linkColor +'}'
                }
                // .wp-block-pack-section a:hover
                if (linkHoverColor) {
                    bs += '#'+ id +'.wp-block-pack-section a:hover{color: '+ linkHoverColor +'}'
                }
                if (backgroundType == 'gradient') {
                    // .wp-block-pack-section-gradient-background-wrap
                    bs += '#'+ id +'.wp-block-pack-section .wp-block-pack-section-gradient-background-wrap{background-image: '
                    if (backgroundDirection) {
                        bs += 'radial-gradient('
                        if (backgroundRadialShape || backgroundRadialAt) {
                            if (backgroundRadialShape) {
                                bs += 'circle '
                            }
                            if (backgroundRadialAt) {
                                bs += 'at '+ backgroundRadialAt
                            }
                            bs += ', '
                        }
                    } else {
                        bs += 'linear-gradient('
                        if (backgroundAngle || backgroundAngle == 0) {
                            bs += backgroundAngle +'deg, '
                        } else {
                            bs += 'to bottom right, '
                        }
                    }
                    bs += hexToRgba(theBGColor, theBG1Trans)
                    if (background1Position || background1Position == 0) { bs += ' '+ background1Position +'%' }
                    bs += ','
                    bs += hexToRgba(theBGColor2, theBG2Trans)
                    if (background2Position || background2Position == 0) { bs += ' '+ background2Position +'%' }
                    bs += ');'
                    bs += 'opacity: '+ theBGOpacity +';'
                    // Border Radius 
                    if (borderRadius || borderRadius == 0) { bs += 'border-radius: '+ borderRadius +'px;' }
                    bs += '} '
                }
                else if (backgroundType == 'image') {
                    // .wp-block-pack-section .image-overlay
                    if (backgroundOverlay) {
                        bs += '#'+ id +'.wp-block-pack-section .image-overlay{'
                        if (backgroundOverlay == 'color') {
                            bs += 'background-color:' + hexToRgba(theBGColor, theBG1Trans) + ';'
                        }
                        if (backgroundOverlay == 'gradient') {
                            bs += 'background-image:'
                            if (backgroundDirection) {
                                bs += 'radial-gradient('
                                if (backgroundRadialShape || backgroundRadialAt) {
                                    if (backgroundRadialShape) {
                                        bs += 'circle '
                                    }
                                    if (backgroundRadialAt) {
                                        bs += 'at '+ backgroundRadialAt
                                    }
                                    bs += ', '
                                }
                            } else {
                                bs += 'linear-gradient('
                                if (backgroundAngle || backgroundAngle == 0) {
                                    bs += backgroundAngle +'deg, '
                                } else {
                                    bs += 'to bottom right, '
                                }
                            }
                            bs += hexToRgba(theBGColor, theBG1Trans)
                            if (background1Position || background1Position == 0) { bs += ' '+ background1Position +'%' }
                            bs += ','
                            bs += hexToRgba(theBGColor2, theBG2Trans)
                            if (background2Position || background2Position == 0) { bs += ' '+ background2Position +'%' }
                            bs += ');'
                        }
                        if (borderRadius || borderRadius == 0) { bs += 'border-radius: '+ borderRadius +'px;' }
                        bs += '} '
                    }
                }
                else if (backgroundType == 'video') {
                    // .wp-block-pack-section-video-background-wrap
                    bs += '#'+ id +'.wp-block-pack-section .wp-block-pack-section-video-background-wrap{'
                    bs += 'opacity: '+ theBGOpacity +';'
                    if (borderRadius || borderRadius == 0) {  bs += 'border-radius: '+ borderRadius +'px;' }
                    bs += '} '
                    // .wp-block-pack-section-video-background-wrap .video-overlay
                    if (backgroundOverlay) {
                        bs += '.wp-block-pack-section-video-background-wrap .video-overlay{'
                        if (backgroundOverlay == 'color') {
                            bs += 'background-color:' + hexToRgba(theBGColor, theBG1Trans) + ';'
                        }
                        if (backgroundOverlay == 'gradient') {
                            bs += 'background-image:'
                            if (backgroundDirection) {
                                bs += 'radial-gradient('
                                if (backgroundRadialShape || backgroundRadialAt) {
                                    if (backgroundRadialShape) {
                                        bs += 'circle '
                                    }
                                    if (backgroundRadialAt) {
                                        bs += 'at '+ backgroundRadialAt
                                    }
                                    bs += ', '
                                }
                            } else {
                                bs += 'linear-gradient('
                                if (backgroundAngle || backgroundAngle == 0) {
                                    bs += backgroundAngle +'deg, '
                                } else {
                                    bs += 'to bottom right, '
                                }
                            }
                            bs += hexToRgba(theBGColor, theBG1Trans)
                            if (background1Position || background1Position == 0) { bs += ' '+ background1Position +'%' }
                            bs += ','
                            bs += hexToRgba(theBGColor2, theBG2Trans)
                            if (background2Position || background2Position == 0) { bs += ' '+ background2Position +'%' }
                            bs += ');'
                        }
                        bs += '} '
                    }
                }
                // .wp-block-pack-section-content-wrap
                if ((contentWidth == 'custom') && contentCustom) { 
                    bs += '#'+ id +'.wp-block-pack-section .wp-block-pack-section-content-wrap{max-width: '+ contentCustom +'px;}'
                }

            return bs
        }


        // Create the editor
        return (
            el( Fragment,
                null,
                el(
                    BlockControls,
                    null,
                    el(
                        AlignmentToolbar,
                        {
                            value: alignment,
                            onChange: function( newValue ) {
                                props.setAttributes( { alignment: newValue } );
                            }
                        }
                    ),
                    !align && el( ButtonGroup,
                        { className: 'components-toolbar toggle-button button-float-' + float },
                        el( Tooltip,
                            {
                                text: __('Float Section Left'),
                            },
                            el( Button,
                                {
                                    className: 'components-toolbar__control left-float',
                                    onClick: function () {
                                        if (float == 'left') {
                                            props.setAttributes( { float: undefined } );
                                        } else {
                                            props.setAttributes( { float: 'left' } );
                                        }
                                    }
                                },
                                el(Dashicon, { icon: 'align-left' } )
                            )
                        ),
                        el( Tooltip,
                            {
                                text: __('Float Section Right'),
                            },
                            el( Button,
                                {
                                    className: 'components-toolbar__control right-float',
                                    onClick: function () {
                                        if (float == 'right') {
                                            props.setAttributes( { float: undefined } );
                                        } else {
                                            props.setAttributes( { float: 'right' } );
                                        }
                                    }
                                },
                                el(Dashicon, { icon: 'align-right' } )
                            )
                        )
                    )
                ),
                el(
                    InspectorControls,
                    { key: 'controls' },
                    el( PanelBody, 
                        {
                            title: 'Layout',
                            className: 'editor-Layout-settings',
                            initialOpen: false
                        },
                        el(TabPanel,
                            {
                                className: 'editor-panel-tabs-settings',
                                activeClass: 'active',
                                tabs: [
                                    {
                                        name: 'block',
                                        title: 'Block',
                                        className: 'block'
                                    }, 
                                    {
                                        name: 'content',
                                        title: 'Inner Block',
                                        className: 'content'
                                    }
                                ]
                            },
                            function (tab) {

                                var settingsBlock = el('div', null,
                                    el(SelectControl,
                                        { 
                                            label: 'HTML Tag ',
                                            value: htmlTag,
                                            help: 'The <'+ htmlTag +'> tag will be used.',
                                            options: [ 
                                                {label: 'Article', value: 'article'}, 
                                                {label: 'Aside', value: 'aside'}, 
                                                {label: 'Division', value: 'div'}, 
                                                {label: 'Footer', value: 'footer'}, 
                                                {label: 'Header', value: 'header'}, 
                                                {label: 'Main', value: 'main'}, 
                                                {label: 'Navigation', value: 'nav'}, 
                                                {label: 'Section', value: 'section'}, 
                                            ],
                                            onChange: function( newValue ) {
                                                props.setAttributes( { htmlTag: newValue } );
                                            }
                                        }
                                    ),
                                    el(SelectControl,
                                        { 
                                            label: 'Block Height',
                                            value: height && height || 'auto',
                                            help: (height == 'full') && 'Block now shown in full screen height at minimum.' || 'Block height will be relative to the content.',
                                            options: [ 
                                                {label: 'Auto', value: 'auto'}, 
                                                {label: 'Full View', value: 'full'}
                                            ],
                                            onChange: function( newValue ) {
                                                if (newValue == 'auto') {
                                                    props.setAttributes( { height: undefined } );
                                                } else {
                                                    props.setAttributes( { height: newValue } );
                                                }
                                            }
                                        }
                                    ),
                                    el(SelectControl,
                                        { 
                                            label: 'Block Width',
                                            value: align && align || 'normal',
                                            help: blockWidthHelp,
                                            options: blockWidthOptions,
                                            onChange: function( newValue ) {
                                                if (newValue == 'normal') {
                                                    props.setAttributes( { align: undefined } );
                                                } else if (newValue == 'custom') {
                                                    props.setAttributes( { align: undefined } );
                                                    // What to do here??
                                                } else {
                                                    props.setAttributes( { align: newValue } );
                                                }
                                            }
                                        }
                                    )
                                );

                                var settingsContent = el('div', null,
                                    el(SelectControl,
                                        { 
                                            label: 'Inner Block Width',
                                            value: contentWidth && contentWidth || 'full',
                                            help: (contentWidth == 'custom') && 'Inner area will use given width value below.' || 'Inner area will fill the entire section.',
                                            options: [ 
                                                {label: 'Custom', value: 'custom'},
                                                {label: 'Full Fill', value: 'full'},
                                            ],
                                            onChange: function( newValue ) {
                                                if (newValue == 'full') {
                                                    props.setAttributes( { contentWidth: undefined } );
                                                } else {
                                                    props.setAttributes( { contentWidth: newValue } );
                                                }
                                            }
                                        }
                                    ),
                                    (contentWidth == 'custom') && el(TextControl, 
                                        {
                                            label: 'Maximum Content Width',
                                            help: ( 
                                                el( Fragment,
                                                    null,
                                                    el(Button, 
                                                        {
                                                            className: 'wp-block-pack-reset-number',
                                                            onClick: function (argument) {
                                                                 props.setAttributes( { contentCustom: 640 } );
                                                            }
                                                        },
                                                        'Reset'
                                                    ),
                                                    contentCustom && 'Maximum content width now '+ contentCustom +'px.' || 'Please fill the field.'
                                                )
                                            ),
                                            className: 'max-content-width-setting',
                                            value: contentCustom,
                                            min: 0,
                                            type: 'number',
                                            onChange: function( newValue ) {
                                                var newNumberValue = Number(newValue);
                                                props.setAttributes( { contentCustom: newNumberValue } );
                                            }
                                        }
                                    )
                                );

                                if (tab.className == 'block') {
                                    return settingsBlock;
                                } else {
                                    return settingsContent;
                                }
                            }
                        
                        )
                    ),
                    el( PanelBody, 
                        {
                            title: 'Spacing',
                            className: 'editor-spacing-settings',
                            initialOpen: false
                        },
                        el(TabPanel,
                            {
                                className: 'editor-panel-tabs-settings',
                                activeClass: 'active',
                                tabs: [
                                    {
                                        name: 'padding',
                                        title: 'Padding',
                                        className: 'padding'
                                    }, {
                                        name: 'margin',
                                        title: 'Margin',
                                        className: 'margin'
                                    }
                                ]
                            },
                            function (tab) {

                                var settingsPadding = el('div', null,
                                    el(RangeControl, 
                                        {
                                            value: paddingTop,
                                            min: 0,
                                            max: 500,
                                            label: 'Padding Top',
                                            help: (paddingTop || paddingTop == 0) && 'Padding Top now sets to '+ paddingTop +' pixels' || 'Padding Top now sets to default.',
                                            initialPosition: 60,
                                            allowReset: true,
                                            onChange: function( newValue ) {
                                                 props.setAttributes( { paddingTop: newValue } );
                                            }
                                        }
                                    ),
                                    el(RangeControl, 
                                        {
                                            value: paddingRight,
                                            min: 0,
                                            max: 500,
                                            label: 'Padding Right',
                                            help: (paddingRight || paddingRight == 0) && 'Padding Right now sets to '+ paddingRight +' pixels.' || 'Padding Right now sets to default.',
                                            initialPosition: 28,
                                            allowReset: true,
                                            onChange: function( newValue ) {
                                                 props.setAttributes( { paddingRight: newValue } );
                                            }
                                        }
                                    ),
                                    el(RangeControl, 
                                        {
                                            value: paddingBottom,
                                            min: 0,
                                            max: 500,
                                            label: 'Padding Bottom',
                                            help: (paddingBottom || paddingBottom == 0) && 'Padding Bottom now sets to '+ paddingBottom +' pixels' || 'Padding Bottom now sets to default.',
                                            initialPosition: 60,
                                            allowReset: true,
                                            onChange: function( newValue ) {
                                                 props.setAttributes( { paddingBottom: newValue } );
                                            }
                                        }
                                    ),
                                    el(RangeControl, 
                                        {
                                            value: paddingLeft,
                                            min: 0,
                                            max: 500,
                                            label: 'Padding Left',
                                            help: (paddingLeft || paddingLeft == 0) && 'Padding Left now sets to '+ paddingLeft +' pixels.' || 'Padding Left now sets to default.',
                                            initialPosition: 28,
                                            allowReset: true,
                                            onChange: function( newValue ) {
                                                 props.setAttributes( { paddingLeft: newValue } );
                                            }
                                        }
                                    )
                                );

                                var settingsMargin = el('div', null,
                                    el(RangeControl, 
                                        {
                                            value: marginTop,
                                            min: -500,
                                            max: 500,
                                            label: 'Margin Top',
                                            help: (marginTop || marginTop == 0) && 'Margin Top now sets to '+ marginTop +' pixels' || 'Margin Top now sets to default.',
                                            initialPosition: 32,
                                            allowReset: true,
                                            onChange: function( newValue ) {
                                                 props.setAttributes( { marginTop: newValue } );
                                            }
                                        }
                                    ),
                                    !align && el(RangeControl, 
                                        {
                                            value: marginRight,
                                            min: -500,
                                            max: 500,
                                            label: 'Margin Right',
                                            help: (marginRight || marginRight == 0) && 'Margin Right now sets to '+ marginRight +' pixels.' || 'Margin Right now sets to default.',
                                            initialPosition: 0,
                                            allowReset: true,
                                            onChange: function( newValue ) {
                                                 props.setAttributes( { marginRight: newValue } );
                                            }
                                        }
                                    ),
                                    el(RangeControl, 
                                        {
                                            value: marginBottom,
                                            min: -500,
                                            max: 500,
                                            label: 'Margin Bottom',
                                            help: (marginBottom || marginBottom == 0) && 'Margin Bottom now sets to '+ marginBottom +' pixels' || 'Margin Bottom now sets to default.',
                                            initialPosition: 32,
                                            allowReset: true,
                                            onChange: function( newValue ) {
                                                 props.setAttributes( { marginBottom: newValue } );
                                            }
                                        }
                                    ),
                                    !align && el(RangeControl, 
                                        {
                                            value: marginLeft,
                                            min: -500,
                                            max: 500,
                                            label: 'Margin Left',
                                            help: (marginLeft || marginLeft == 0) && 'Margin Left now sets to '+ marginLeft +' pixels.' || 'Margin Left now sets to default.',
                                            initialPosition: 0,
                                            allowReset: true,
                                            onChange: function( newValue ) {
                                                 props.setAttributes( { marginLeft: newValue } );
                                            }
                                        }
                                    )
                                );

                                if (tab.className == 'padding') {
                                    return settingsPadding;
                                } else {
                                    return settingsMargin;
                                }
                            }
                        
                        )
                    ),
                    el( PanelBody, 
                        {
                            title: 'Content Colors',
                            className: 'editor-content-settings',
                            initialOpen: false
                        },
                        el('div', null,
                            el(BaseControl, 
                                {
                                    label: (el( Fragment,
                                            null,
                                            'Text Color',
                                            textColor && el(ColorIndicator, 
                                                { colorValue: textColor, }
                                            )
                                        )
                                    )
                                },                             
                                el(ColorPalette, {
                                    colors: colorPack,
                                    value: textColor,
                                    className: 'editor-color-palette-control__color-palette',
                                    onChange: function( newValue ) {
                                        props.setAttributes( { textColor: newValue } );
                                    }
                                })
                            ),
                            el(BaseControl, 
                                {
                                    label: (el( Fragment,
                                            null,
                                            'Link Color',
                                            linkColor && el(ColorIndicator, 
                                                { colorValue: linkColor, }
                                            )
                                        )
                                    )
                                },                             
                                el(ColorPalette, {
                                    colors: colorPack,
                                    value: linkColor,
                                    className: 'editor-color-palette-control__color-palette',
                                    onChange: function( newValue ) {
                                        props.setAttributes( { linkColor: newValue } );
                                    }
                                })
                            ),
                            el(BaseControl, 
                                {
                                    label: (el( Fragment,
                                            null,
                                            'Link Hover Color',
                                            linkHoverColor && el(ColorIndicator, 
                                                { colorValue: linkHoverColor, }
                                            )
                                        )
                                    )
                                },                             
                                el(ColorPalette, {
                                    colors: colorPack,
                                    value: linkHoverColor,
                                    className: 'editor-color-palette-control__color-palette',
                                    onChange: function( newValue ) {
                                        props.setAttributes( { linkHoverColor: newValue } );
                                    }
                                })
                            )
                        )
                    ),
                    el( PanelBody, 
                        {
                            title: 'Background',
                            className: 'editor-background-settings',
                            initialOpen: false
                        },
                        el(SelectControl,
                            { 
                                label: 'Type',
                                value: backgroundType && backgroundType || 'color',
                                options: [ 
                                    {label: 'Color', value: 'color'}, 
                                    {label: 'Gradient', value: 'gradient'}, 
                                    {label: 'Image', value: 'image'}, 
                                    {label: 'None', value: 'none'}, 
                                    {label: 'Video', value: 'video'}, 
                                ],
                                onChange: function( newValue ) {
                                    if (newValue == 'color') {
                                        props.setAttributes( { backgroundType: undefined } );
                                    } else {
                                        props.setAttributes( { backgroundType: newValue } );
                                    }
                                }
                            }
                        ),
                        // For Image Background Type
                        (backgroundType == 'image') && el( Fragment, null, 
                            el(BaseControl,
                                {
                                    label: 'Image'
                                },
                                !backgroundImgURL && el( Placeholder,
                                    {
                                        label: __('No image selected'),
                                        className: 'nothumb',
                                    }
                                ) || el('img',
                                    {
                                        src: backgroundImgURL,
                                        className: 'imgthumb',
                                    }
                                ),
                                el( MediaUploadCheck, 
                                    null, 
                                    el( MediaUpload, 
                                        {
                                            onSelect: function ( imageObject ) {
                                                props.setAttributes( { backgroundImgURL: imageObject.url } );
                                            },
                                            allowedTypes: 'image',
                                            value: backgroundImgURL, 
                                            render: function ( arg ) {
                                                var open = arg.open;
                                                return el( 'button',
                                                    { 
                                                        onClick: open,
                                                        className: 'button',
                                                        type: 'button'
                                                    },
                                                    !backgroundImgURL && __('Select Image') || __('Change Image')
                                                );
                                            }
                                        }
                                    ) 
                                ),
                                backgroundImgURL && el(Button,
                                    {
                                        className: 'button remove',
                                        onClick: function() {
                                            props.setAttributes( { backgroundImgURL: undefined } );
                                        }
                                    },
                                    __('Remove')
                                )
                            ),
                            el(BaseControl,
                                {
                                    className: 'extra-properties '+ (backgroundImgURL && 'active' || 'inactive')
                                },
                                el(SelectControl,
                                    { 
                                        label: 'Image Position',
                                        value: !backgroundImgPos && 'center center' || backgroundImgPos,
                                        options: the9Positions,
                                        className: 'image-position',
                                        onChange: function( newValue ) {
                                            props.setAttributes( { backgroundImgPos: newValue } );
                                        }
                                    }
                                ),
                                el(RadioControl, 
                                    {
                                        label: 'Image Attachment',
                                        selected: !backgroundImgAtt && 'scroll' || backgroundImgAtt,
                                        className: 'editor-radio-half',
                                        options: [ 
                                            { label: 'Scroll', value: 'scroll'}, 
                                            { label: 'Fixed', value: 'fixed'}, 
                                        ],
                                        onChange: function( newValue ) {
                                            if (newValue == 'scroll') {
                                                props.setAttributes( { backgroundImgAtt: undefined } );
                                            } else {
                                                props.setAttributes( { backgroundImgAtt: newValue } );
                                            }
                                        }
                                    }
                                ),
                                el(SelectControl,
                                    { 
                                        label: 'Image Repeat',
                                        value: backgroundImgRep && backgroundImgRep,
                                        options: [ 
                                            {label: 'No Repeat', value: 'no-repeat'}, 
                                            {label: 'Repeat All', value: 'repeat'}, 
                                            {label: 'Repeat Horizontally', value: 'repeat-x'}, 
                                            {label: 'Repeat Vertically', value: 'repeat-y'}, 
                                        ],
                                        className: 'image-position',
                                        onChange: function( newValue ) {
                                            props.setAttributes( { backgroundImgRep: newValue } );
                                            if (newValue == 'no-repeat') {
                                                props.setAttributes( { backgroundImgRep: undefined } );
                                            } else {
                                                props.setAttributes( { backgroundImgRep: newValue } );
                                            }
                                        }
                                    }
                                ),
                                el(SelectControl,
                                    { 
                                        label: 'Image Size',
                                        value: !backgroundImgSize && 'cover' || backgroundImgSize,
                                        options: [ 
                                            { label: 'Auto', value: 'auto'}, 
                                            { label: 'Cover', value: 'cover'}, 
                                            { label: 'Contain', value: 'contain'}, 
                                        ],
                                        className: 'image-size',
                                        onChange: function( newValue ) {
                                            if (newValue == 'cover') {
                                                props.setAttributes( { backgroundImgSize: undefined } );
                                            } else {
                                                props.setAttributes( { backgroundImgSize: newValue } );
                                            }
                                        }
                                    }
                                )
                            )
                        ),
                        // For Video Background Type
                        (backgroundType == 'video') && el( Fragment, null, 
                             el(BaseControl,
                                {
                                    label: 'Video'
                                },
                                !backgroundVidURL && el( Placeholder,
                                    {
                                        label: __('No video selected'),
                                        className: 'nothumb',
                                    }
                                ) || el('video',
                                    {
                                        src: backgroundVidURL,
                                        className: 'vidthumb',
                                    }
                                ),
                                el( MediaUploadCheck, 
                                    null, 
                                    el( MediaUpload, 
                                        {
                                            onSelect: function ( videoObject ) {
                                                console.log(videoObject);
                                                props.setAttributes( { backgroundVidURL: videoObject.url } );
                                            },
                                            allowedTypes: 'video',
                                            value: backgroundVidURL, 
                                            render: function ( arg ) {
                                                var open = arg.open;
                                                return el( 'button',
                                                    { 
                                                        onClick: open,
                                                        className: 'button',
                                                        type: 'button'
                                                    },
                                                    !backgroundVidURL && __('Select Video') || __('Change Video')
                                                );
                                            }
                                        }
                                    ) 
                                ),
                                backgroundVidURL && el(Button,
                                    {
                                        className: 'button remove',
                                        onClick: function() {
                                            props.setAttributes( { backgroundVidURL: undefined } );
                                        }
                                    },
                                    __('Remove')
                                )
                            )
                        ),
                        ((backgroundType == 'image' && backgroundImgURL) || (backgroundType == 'video' && backgroundVidURL)) && el( Fragment, null, 
                            el(SelectControl,
                                { 
                                    label: 'Overlay',
                                    value: backgroundOverlay && backgroundOverlay,
                                    options: [ 
                                        {label: 'No Overlay', value: undefined}, 
                                        {label: 'Color', value: 'color'}, 
                                        {label: 'Gradient', value: 'gradient'}, 
                                    ],
                                    className: 'gradient-overlay',
                                    onChange: function( newValue ) {
                                        props.setAttributes( { backgroundOverlay: newValue } );
                                    }
                                }
                            )
                        ),
                        // For Color Background Type
                        (!backgroundType || (backgroundOverlay == 'color' && ((backgroundType == 'image' && backgroundImgURL) || (backgroundType == 'video' && backgroundVidURL)))) && el( Fragment, null, 
                            el(BaseControl, 
                                {
                                    label: el( Fragment,
                                        null,
                                        (backgroundType && (backgroundOverlay == 'color')) && 'Overlay Color' || 'Background Color',
                                        backgroundColor && el(ColorIndicator, 
                                            {
                                            colorValue: backgroundColor,
                                        })
                                    )
                                },                             
                                el(ColorPalette, {
                                    colors: colorPack,
                                    value: backgroundColor,
                                    className: 'editor-color-palette-control__color-palette',
                                    onChange: function( newValue ) {
                                        props.setAttributes( { backgroundColor: newValue } );
                                    }
                                })
                            ),
                            el(RangeControl, 
                                {
                                    value: background1Transparancy,
                                    min: 0,
                                    max: 100,
                                    label: (backgroundType && (backgroundOverlay == 'color')) && 'Overlay Transparency' || 'Color Transparency',
                                    help: (background1Transparancy == 0) && 'This Color now full transparent.' || (background1Transparancy == 100 || !background1Transparancy) && 'This Color now a solid color.' || background1Transparancy && 'This Color transparency now '+ background1Transparancy +'%.',
                                    initialPosition: 100,
                                    allowReset: true,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { background1Transparancy: newValue } );
                                    }
                                }
                            )
                        ),
                        ((backgroundType == 'gradient') || (backgroundOverlay == 'gradient' && ((backgroundType == 'image' && backgroundImgURL) || (backgroundType == 'video' && backgroundVidURL)))) && el( Fragment, null, 
                            el(SelectControl,
                                { 
                                    label: 'Direction',
                                    value: backgroundDirection && backgroundDirection,
                                    options: [ 
                                        {label: 'Linear', value: undefined}, 
                                        {label: 'Radial', value: 'radial'}, 
                                    ],
                                    className: 'gradient-direction',
                                    onChange: function( newValue ) {
                                        if (newValue == 'radial') {
                                            props.setAttributes( { backgroundDirection: 'radial' } );
                                        } else {
                                            props.setAttributes( { backgroundDirection: undefined } );
                                        }
                                    }
                                }
                            ),
                            (!backgroundDirection) && el(RangeControl, 
                                {
                                    value: backgroundAngle,
                                    min: 0,
                                    max: 360,
                                    label: 'Angle',
                                    help: (backgroundAngle == 0 || backgroundAngle == 180 || backgroundAngle == 360) && 'Background now in Horizontal' || (backgroundAngle == 90 || backgroundAngle == 270) && 'Background now is vertical.' || backgroundAngle && 'Background Angle now diagonal at '+ backgroundAngle +' degree.',
                                    initialPosition: 135,
                                    allowReset: true,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { backgroundAngle: newValue } );
                                    }
                                }
                            ) || (backgroundDirection == 'radial') && el( Fragment, null, 
                                el(RadioControl, 
                                    {
                                        label: 'Shape',
                                        selected: !backgroundRadialShape && 'ellipse' || backgroundRadialShape,
                                        className: 'editor-radio-half',
                                        options: [ 
                                            { label: 'Ellipse', value: 'ellipse'}, 
                                            { label: 'Circle', value: 'circle'}, 
                                        ],
                                        onChange: function( newValue ) {
                                            if (newValue == 'ellipse') {
                                                props.setAttributes( { backgroundRadialShape: undefined } );
                                            } else {
                                                props.setAttributes( { backgroundRadialShape: newValue } );
                                            }
                                        }
                                    }
                                ),
                                el(SelectControl,
                                    { 
                                        label: 'At',
                                        value: backgroundRadialAt && backgroundRadialAt || 'center center',
                                        options: the9Positions,
                                        onChange: function( newValue ) {
                                            if (newValue == 'center center') {
                                                props.setAttributes( { backgroundRadialAt: undefined } );
                                            } else {
                                                props.setAttributes( { backgroundRadialAt: newValue } );
                                            }
                                        }
                                    }
                                )
                            ),
                            el(BaseControl, 
                                {
                                    className: 'sub-base-control-box',
                                        label: el( Fragment,
                                            null,
                                            ((backgroundType != 'gradient') && (backgroundOverlay == 'gradient')) && 'Overlay 1st Color' || '1st Background Color',
                                            backgroundColor && el(ColorIndicator, 
                                                {
                                                colorValue: backgroundColor,
                                            })
                                        )
                                }, 
                                el(BaseControl, 
                                    {
                                        label: el( Fragment,
                                            null,
                                            'Color',
                                            backgroundColor && el(ColorIndicator, 
                                                {
                                                colorValue: backgroundColor,
                                            })
                                        )
                                    },                             
                                    el(ColorPalette, {
                                        colors: colorPack,
                                        value: backgroundColor,
                                        className: 'editor-color-palette-control__color-palette',
                                        onChange: function( newValue ) {
                                            props.setAttributes( { backgroundColor: newValue } );
                                        }
                                    })
                                ),
                                el(RangeControl, 
                                    {
                                        value: background1Transparancy,
                                        min: 0,
                                        max: 100,
                                        label: 'Transparency',
                                        help: (background1Transparancy == 0) && 'This Color now full transparent.' || (background1Transparancy == 100 || !background1Transparancy) && 'This Color now a solid color.' || background1Transparancy && 'This Color transparency now '+ background1Transparancy +'%.',
                                        initialPosition: 100,
                                        allowReset: true,
                                        onChange: function( newValue ) {
                                            props.setAttributes( { background1Transparancy: newValue } );
                                        }
                                    }
                                ),
                                el(RangeControl, 
                                    {
                                        value: background1Position,
                                        min: 0,
                                        max: 100,
                                        label: 'Position',
                                        help: (background1Position || background1Position == 0) && 'Color Location now at '+ background1Position +'%.' || !background1Position && 'Color Location are automatic.',
                                        initialPosition: 1,
                                        allowReset: true,
                                        onChange: function( newValue ) {
                                            props.setAttributes( { background1Position: newValue } );
                                        }
                                    }
                                )
                            ),
                            el(BaseControl, 
                                {
                                    className: 'sub-base-control-box',
                                        label: el( Fragment,
                                            null,
                                            ((backgroundType != 'gradient') && (backgroundOverlay == 'gradient')) && 'Overlay 2nd Color' || '2nd Background Color',
                                            backgroundColor2 && el(ColorIndicator, 
                                                {
                                                colorValue: backgroundColor2,
                                            })
                                        )
                                }, 
                                el(BaseControl, 
                                    {
                                        label: el( Fragment,
                                            null,
                                            'Color',
                                            backgroundColor2 && el(ColorIndicator, 
                                                {
                                                colorValue: backgroundColor2,
                                            })
                                        )
                                    },                             
                                    el(ColorPalette, {
                                        colors: colorPack,
                                        value: backgroundColor2,
                                        className: 'editor-color-palette-control__color-palette',
                                        onChange: function( newValue ) {
                                            props.setAttributes( { backgroundColor2: newValue } );
                                        }
                                    })
                                ),
                                el(RangeControl, 
                                    {
                                        value: background2Transparancy,
                                        min: 0,
                                        max: 100,
                                        label: 'Transparency',
                                        help: (background2Transparancy == 0) && 'This Color now full transparent.' || (background2Transparancy == 100 || !background2Transparancy) && 'This Color now a solid color.' || background2Transparancy && 'This Color transparency now '+ background2Transparancy +'%.',
                                        initialPosition: 100,
                                        allowReset: true,
                                        onChange: function( newValue ) {
                                            props.setAttributes( { background2Transparancy: newValue } );
                                        }
                                    }
                                ),
                                el(RangeControl, 
                                    {
                                        value: background2Position,
                                        min: 0,
                                        max: 100,
                                        label: 'Position',
                                        help: (background2Position || background2Position == 0) && 'Color Location now at '+ background2Position +'%.' || !background2Position && 'Color Location are automatic.',
                                        initialPosition: 100,
                                        allowReset: true,
                                        onChange: function( newValue ) {
                                            props.setAttributes( { background2Position: newValue } );
                                        }
                                    }
                                )
                            )
                        ),
                        (backgroundType && (backgroundType != 'none' && backgroundType != 'image')) && el(RangeControl, 
                            {
                                value: backgroundOpacity,
                                min: 0,
                                max: 100,
                                label: 'Whole Background Opacity',
                                help: 'The background ' + ((backgroundOpacity == 0) && 'now full transparent.' || (backgroundOpacity == 100 || !backgroundOpacity) && 'now solid.' || backgroundOpacity && 'opacity now '+ backgroundOpacity +'%.'),
                                initialPosition: 100,
                                allowReset: true,
                                onChange: function( newValue ) {
                                    props.setAttributes( { backgroundOpacity: newValue } );
                                }
                            }
                        )
                    ),
                    el( PanelBody, 
                        {
                            title: 'Outliner',
                            className: 'editor-outliner-settings',
                            initialOpen: false
                        },
                        // border and shadow
                        el(TabPanel,
                            {
                                className: 'editor-panel-tabs-settings',
                                activeClass: 'active',
                                tabs: [
                                    {
                                        name: 'border',
                                        title: 'Border',
                                        className: 'border'
                                    }, {
                                        name: 'shadow',
                                        title: 'Shadow',
                                        className: 'shadow'
                                    }
                                ]
                            },
                            function (tab) {

                                var settingsBorder = el('div', null,
                                    el(SelectControl,
                                        { 
                                            label: 'Border Style',
                                            value: borderStyle,
                                            options: borderStyles,
                                            onChange: function( newValue ) {
                                                props.setAttributes( { borderStyle: newValue } );
                                            }
                                        }
                                    ),
                                    (borderStyle && (borderStyle != 'none' && borderStyle != 'hidden')) && el( Fragment,
                                        null,
                                        el(RangeControl, 
                                            {
                                                value: borderWidth,
                                                min: 0,
                                                max: 10,
                                                label: 'Border Width',
                                                help: 'Border width now '+ ((borderWidth || borderWidth == 0) && borderWidth + ' px.' || 'default.'),
                                                initialPosition: 1,
                                                allowReset: true,
                                                onChange: function( newValue ) {
                                                    props.setAttributes( { borderWidth: newValue } );
                                                }
                                            }
                                        ),
                                        el(BaseControl, 
                                            {
                                                label: el( Fragment,
                                                    null,
                                                    'Border Color',
                                                    borderColor && el(ColorIndicator, 
                                                        {
                                                        colorValue: borderColor,
                                                    })
                                                )
                                            },                             
                                            el(ColorPalette, {
                                                colors: colorPack,
                                                value: borderColor,
                                                className: 'editor-color-palette-control__color-palette',
                                                onChange: function( newValue ) {
                                                    props.setAttributes( { borderColor: newValue } );
                                                }
                                            })
                                        )
                                    ),
                                    el(RangeControl, 
                                        {
                                            value: (borderRadius || borderRadius == 0) && borderRadius,
                                            min: 0,
                                            max: 500,
                                            label: 'Border Radius',
                                            help: 'Border radius now '+ (borderRadius && borderRadius + ' pixels.' || 'unset.'),
                                            initialPosition: 0,
                                            allowReset: true,
                                            onChange: function( newValue ) {
                                                props.setAttributes( { borderRadius: newValue } );
                                            }
                                        }
                                    )
                                );

                                var settingsShadow = el('div', null,
                                    el( ToggleControl, 
                                        {
                                            label: 'Use box shadow.',
                                            checked: isShadow && true || false,
                                            onChange: function(newValue) {
                                                if (isShadow != newValue) {
                                                    props.setAttributes( { isShadow: newValue } );
                                                }
                                            }
                                        } 
                                    ),
                                    isShadow && el( Fragment,
                                        null,
                                        el(RangeControl, 
                                            {
                                                value: shadowX,
                                                min: -50,
                                                max: 50,
                                                label: 'Horizontal Value',
                                                initialPosition: 0,
                                                help: 'Shadow are '+ ((shadowX > 0) && shadowX + ' px to right.' || (shadowX < 0) && (shadowX * -1) + ' px to left.' || 'centered horizontally.'),
                                                allowReset: true,
                                                onChange: function( newValue ) {
                                                    props.setAttributes( { shadowX: newValue } );
                                                }
                                            }
                                        ),
                                        el(RangeControl, 
                                            {
                                                value: shadowY,
                                                min: -50,
                                                max: 50,
                                                label: 'Vertical Value',
                                                initialPosition: 1,
                                                help: 'Shadow are '+ ((shadowY > 0) && shadowY + ' px to the top.' || (shadowY < 0) && (shadowY * -1) + ' px to the bottom.' || (shadowY == 0) && 'centered vertically.' || 'set to default vertically.'),
                                                allowReset: true,
                                                onChange: function( newValue ) {
                                                    props.setAttributes( { shadowY: newValue } );
                                                }
                                            }
                                        ),
                                        el(RangeControl, 
                                            {
                                                value: shadowBlur,
                                                min: 0,
                                                max: 50,
                                                label: 'Blur Value',
                                                initialPosition: 5,
                                                help: 'Shadow are '+ ((shadowBlur == 0) && ' not blured.' || shadowBlur && shadowBlur + ' pixels blured.' || 'set to default blur.'),
                                                allowReset: true,
                                                onChange: function( newValue ) {
                                                    props.setAttributes( { shadowBlur: newValue } );
                                                }
                                            }
                                        ),
                                        el(RangeControl, 
                                            {
                                                value: shadowWide,
                                                min: 0,
                                                max: 50,
                                                label: 'Shadow Width',
                                                initialPosition: 0.3,
                                                help: 'Shadow are '+ (shadowWide && shadowWide + ' pixels wide.' || 'fine.'),
                                                allowReset: true,
                                                onChange: function( newValue ) {
                                                    props.setAttributes( { shadowWide: newValue } );
                                                }
                                            }
                                        ),
                                        el(BaseControl, 
                                            {
                                                label: el( Fragment,
                                                    null,
                                                    'Shadow Color',
                                                    shadowColor && el(ColorIndicator, 
                                                        {
                                                        colorValue: shadowColor,
                                                    })
                                                )
                                            },                             
                                            el(ColorPalette, {
                                                colors: colorPack,
                                                value: shadowColor,
                                                className: 'editor-color-palette-control__color-palette',
                                                onChange: function( newValue ) {
                                                    props.setAttributes( { shadowColor: newValue } );
                                                }
                                            })
                                        ),
                                        el(RangeControl, 
                                            {
                                                value: shadowOpacity,
                                                min: 0,
                                                max: 100,
                                                label: 'Shadow Opacity',
                                                initialPosition: 30,
                                                help: 'Shadow are '+ ((shadowOpacity == 0) && ' transparent. ( ..wait. Why? )' || (shadowOpacity == 100) && ' solid.' || shadowOpacity && shadowOpacity + '% opacity.' || 'set to default transparent.'),
                                                allowReset: true,
                                                onChange: function( newValue ) {
                                                    props.setAttributes( { shadowOpacity: newValue } );
                                                }
                                            }
                                        )
                                    )
                                );

                                if (tab.className == 'border') {
                                    return settingsBorder;
                                } else {
                                    return settingsShadow;
                                }
                            }
                        
                        )
                    )
                ),
                el('style', 
                    null, 
                    sectionStyle()
                ), 
                el(htmlTag, 
                    { 
                        id: id,
                        className: 'wp-block-pack-section'+ (align && ' '+ align || '') + ((height == 'full') && ' full-view-height' || '') + (backgroundType && ' background-'+ backgroundType || ''),
                    },
                    (backgroundType == 'gradient') && el( 'div',
                        {
                            className: 'wp-block-pack-section-gradient-background-wrap',
                        }
                    ),
                    (backgroundType == 'image' && backgroundImgURL) && el( 'div',
                        {
                            className: 'image-overlay',
                        }
                    ),
                    (backgroundType == 'video') && el( 'div',
                        {
                            className: 'wp-block-pack-section-video-background-wrap',
                        },
                        backgroundVidURL && el('video', 
                            {
                                src: backgroundVidURL,
                                autoplay: "",
                                loop: true,
                            }
                        ),
                        backgroundVidURL && el( 'div',
                            {
                                className: 'video-overlay'
                            }
                        )
                    ),
                    el( 'div',
                        {
                            className: 'wp-block-pack-section-content-wrap' + (contentWidth && ' content-'+ contentWidth || ''),
                        },
                        el(InnerBlocks,
                            {
                                template: sectionTemplate,
                                templateInsertUpdatesSelection: false,
                                templateLock: false
                            }
                        )
                    )
                ),
                (startSet !== true) && el(Modal, 
                    {
                        title: "Start Your Section with ..",
                        className: 'wp-block-pack-section-modal',
                        overlayClassName: 'wp-block-pack-section-modal-overlay',
                        isDismissible: false
                    },
                    el('div',
                        {
                            className: 'wp-block-pack-section-modal-container',
                        },
                        el(RadioControl, 
                            {
                                value: sectionPick,
                                className: 'wp-block-pack-section-picker',
                                options: [ 
                                    {label: ' ', value: undefined},  
                                    {
                                        label:  el( 'div', 
                                            { className: 'add-blank-section' },
                                            'a blank section ..'
                                        ), 
                                        value: 'blank'
                                    }, 
                                    {
                                        label:  el( 'img', 
                                            { src: 'http://localhost/blogle-1/wp-content/uploads/2019/04/Gabi004Light.jpg' }
                                        ), 
                                        value: 'a2'
                                    },
                                    // {
                                    //     label: (wpBlockPackPro == true) && el('div',
                                    //         {
                                    //             className: 'pro', 
                                    //         },
                                    //         el( 'img', 
                                    //             { src: 'http://localhost/blogle-1/wp-content/uploads/2019/04/Bogdan001Light.jpg' }
                                    //         ) 
                                    //     ), 
                                    //     value: undefined
                                    // }, 
                                ],
                                onChange: function( newValue ) {
                                    setState( { sectionPick: newValue } );
                                    console.log(newValue);
                                    props.setAttributes( { startSet: true } );
                                }
                            }
                        ),
                        el(RadioControl, 
                            {
                                value: sectionPick,
                                className: 'wp-block-pack-section-picker',
                                options: [ 
                                    {label: ' ', value: undefined},  
                                    {
                                        label:  el( 'img', 
                                            { src: 'http://localhost/blogle-1/wp-content/uploads/2019/04/Gabi004Light.jpg' }
                                        ), 
                                        value: 'b1'
                                    },
                                    {
                                        label:  el( 'img', 
                                            { src: 'http://localhost/blogle-1/wp-content/uploads/2019/04/Bogdan001Light.jpg' }
                                        ), 
                                        value: 'b2'
                                    }, 
                                ],
                                onChange: function( newValue ) {
                                    setState( { sectionPick: newValue } );
                                    props.setAttributes( { startSet: true } );
                                }
                            }
                        ),
                        el(RadioControl, 
                            {
                                value: sectionPick,
                                className: 'wp-block-pack-section-picker',
                                options: [ 
                                    {label: ' ', value: undefined},  
                                    {
                                        label:  el( 'img', 
                                            { src: 'http://localhost/blogle-1/wp-content/uploads/2019/04/Bogdan001Light.jpg' }
                                        ), 
                                        value: 'c1'
                                    }, 
                                    {
                                        label:  el( 'img', 
                                            { src: 'http://localhost/blogle-1/wp-content/uploads/2019/04/Gabi004Light.jpg' }
                                        ), 
                                        value: 'c2'
                                    },
                                ],
                                onChange: function( newValue ) {
                                    setState( { sectionPick: newValue } );
                                    props.setAttributes( { startSet: true } );
                                }
                            }
                        )
                    )
                )
            )
        );
    }),

    save: function(props) {
        var id = props.attributes.id;
        var htmlTag = props.attributes.htmlTag;
        var align = props.attributes.align;
        var height = props.attributes.height;
        var backgroundType = props.attributes.backgroundType;
        var backgroundImgURL = props.attributes.backgroundImgURL;
        var backgroundVidURL = props.attributes.backgroundVidURL;
        var contentWidth = props.attributes.contentWidth;
        return el(htmlTag, 
            { 
                id: id,
                className: 'wp-block-pack-section'+ (align && ' '+ align || '') + ((height == 'full') && ' full-view-height' || '') + (backgroundType && ' background-'+ backgroundType || ''),
            },
            (backgroundType == 'gradient') && el( 'div',
                {
                    className: 'wp-block-pack-section-gradient-background-wrap',
                }
            ),
            (backgroundType == 'image' && backgroundImgURL) && el( 'div',
                {
                    className: 'image-overlay',
                }
            ),
            (backgroundType == 'video') && el( 'div',
                {
                    className: 'wp-block-pack-section-video-background-wrap',
                },
                backgroundVidURL && el('video', 
                    {
                        src: backgroundVidURL,
                        autoplay: "",
                        loop: true,
                    }
                ),
                backgroundVidURL && el( 'div',
                    {
                        className: 'video-overlay'
                    }
                )
            ),
            el( 'div',
                {
                    className: 'wp-block-pack-section-content-wrap' + (contentWidth && ' content-'+ contentWidth || ''),
                },
                el(InnerBlocks.Content)
            )
            
        );
    },
} );
