// Block: Blockquote
// Since ver 1.0.0 

var iBlockquote = el( SVG, { width: 24, height: 24 },
    el('path', { d: "M22 21.999H2v-20h20v20zm-8.942-13.5a9.547 9.547 0 0 1 .227 1.309c.041.411.06.819.06 1.213a10.773 10.773 0 0 1-.251 2.415 19.348 19.348 0 0 1-.538 1.915 1.271 1.271 0 0 0 .119.526 1.086 1.086 0 0 0 .264.383 6.588 6.588 0 0 0 2.224-2.511 13.536 13.536 0 0 0 1.244-3.779 2.49 2.49 0 0 0-1.255-1.042 5.031 5.031 0 0 0-2.093-.429zm-4.306 0a9.453 9.453 0 0 1 .228 1.309c.04.411.059.819.059 1.213a10.787 10.787 0 0 1-.251 2.415 19.643 19.643 0 0 1-.538 1.915 1.253 1.253 0 0 0 .12.526 1.054 1.054 0 0 0 .263.383 6.586 6.586 0 0 0 2.224-2.511 13.586 13.586 0 0 0 1.244-3.779 2.493 2.493 0 0 0-1.256-1.042 5.028 5.028 0 0 0-2.093-.429z" })
    );

registerBlockType( 'wp-block-pack/blockquote', {
    title: __('Blockquote'),
    description: __('Display an awesome blockquote with 6 pre-made styles and advanced control.'), 
    icon: iBlockquote,
    category: 'common',
    keywords: [ __("idea"), __("highlight"), __("quote") ],
    attributes: {
        id: {
            type: 'string',
        },
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
            default: 'We have been developing a lot of future website models for years. And now, we decided to supporting the new WordPress Block Editor. Yes, replace this sample text please!'
        },
        cite: {
            type: 'string',
            source: 'attribute',
            selector: 'blockquote',
            attribute: 'cite'
        },
        citeBeLink: {
            type: 'bool',
            default: false
        },
        alignment: {
            type: 'string',
        },
        layout: {
            type: 'string',
        },
        applyAuthor: {
            type: 'bool',
            default: false
        },
        author: {
            type: 'string',
            source: 'html',
            selector: 'span.wp-block-pack-blockquote-author',
        },
        applyExtra: {
            type: 'bool',
            default: false
        },
        extra: {
            type: 'string',
        },
        icon: {
            type: 'string',
        },
        separator: {
            type: 'string',
        },
        thumbImageURL: {
            type: 'string',
        },
        largeImageURL: {
            type: 'string',
        },
        fullImageURL: {
            type: 'string',
        },
        applyBigImg: {
            type: 'bool',
            default: false
        },
        color: {
            type: 'string',
        },
        color2: {
            type: 'string',
        },
        applyTitle: {
            type: 'bool',
            default: false
        },
        title: {
            type: 'string',
        },
    },
    supports: {
        className: false,
        inserter: wpblockpackInserter('blockquote'),
        align: [ 'wide' ],
    },
    edit: withState( { openModal: false, } )(function(props) {
        var openModal = props.openModal;
        var setState = props.setState;

        var id = props.attributes.id;
        var cite = props.attributes.cite;
        var citeBeLink = props.attributes.citeBeLink;
        var alignment = props.attributes.alignment;
        var layout = props.attributes.layout;

        var applyTitle = props.attributes.applyTitle;
        var title = props.attributes.title;
        var applyAuthor = props.attributes.applyAuthor;
        var author = props.attributes.author;
        var applyExtra = props.attributes.applyExtra;
        var extra = props.attributes.extra;

        var icon = props.attributes.icon;
        var separator = props.attributes.separator;
        var thumbImageURL = props.attributes.thumbImageURL;
        var largeImageURL = props.attributes.largeImageURL;
        var fullImageURL = props.attributes.fullImageURL;
        var applyBigImg = props.attributes.applyBigImg;
        var color = props.attributes.color;
        var color2 = props.attributes.color2;

        // Define ID for blockquote
        if (!id) {
            props.setAttributes( { id: props.clientId } );
        }
        if (id != props.clientId ) {
            props.setAttributes( { id: props.clientId } );
        }

        // Custom class name
        var blockquoteClass = function blockquoteClass() {

            bc = 'wp-block-pack-blockquote';
            if (layout) {
                bc += ' '+ layout;
                if (layout == 'plain' && separator) {
                    bc += ' separator-' + separator;
                }
            }

            if (alignment) {
                bc += ' quote-align-'+ alignment;
            }

            if (fullImageURL && (layout != 'highlight')) {
                if (layout == 'big' && applyBigImg) {
                    bc += ' with-big-image';
                } else {
                    bc += ' with-image';
                }
            }
            
            return bc;

        }

        // Custom Style
        var styleCreator = function styleCreator() {

            bc = '';
            // For Plain Layout
            if (layout == 'plain') {

                bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.plain {';
                if (color) {
                    bc += 'background-color: '+ color +';'
                }
                bc += '}';

            } 
            // For Big Layout
            else if (layout == 'big') {

                if (color) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.big .wp-block-pack-blockquote-author{';
                        bc += 'color: '+ color +';'
                    bc += '}';
                }
                if (applyBigImg && fullImageURL) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.big .wp-block-pack-blockquote-big-image{';
                        bc += 'background-image: url('+ imageURL() +');'
                    bc += '}';
                }

            } 
            // For Border Layout
            else if (layout == 'border') {

                if (color) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.border {';
                        bc += 'border-color: '+ color +';'
                    bc += '}';
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.border .wp-block-pack-blockquote-author{';
                        bc += 'color: '+ color +';'
                    bc += '}';
                }

            } 
            // For Dual Tone Layout
            else if (layout == 'dual-tone') {

                if (color) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.dual-tone p {';
                        bc += 'background-color: '+ color +';'
                    bc += '}';
                }
                if (color2) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.dual-tone .wp-block-pack-blockquote-footer {';
                        bc += 'background-color: '+ color2 +';'
                    bc += '}';
                }

            } 
            // For Highlight Layout
            else if (layout == 'highlight') {

                if (color) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.highlight {';
                        bc += 'border-color: '+ color +';'
                    bc += '}';
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.highlight .wp-block-pack-blockquote-title span {';
                        bc += 'background-color: '+ color +';'
                    bc += '}';
                }
            }

            if (color) {
                bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote svg.wp-block-pack-quote-icon{fill:'+ color +';}'
            }

            return bc;

        }

        var imageURL = function imageURL() {
            var iu;

            // Specify by layout type, then by image available
            // Big using large image
            if (layout == 'big' && applyBigImg) {
                if (largeImageURL) {
                    iu = largeImageURL;
                } else {
                    iu = fullImageURL;
                }               
            } 
            // ANother using thumb size
            else {
                if (thumbImageURL) {
                    iu = thumbImageURL;
                } else if (largeImageURL) {
                    iu = largeImageURL;
                } else {
                    iu = fullImageURL;
                }               
            }


            return iu;
        }

        var quoteIconLoader = function quoteIconLoader(){
            if (icon == 'lean-border') {
                ql = quoteLeanBorder;
            } 
            else if (icon == 'strong') {
                ql = quoteStrongSolid;                
            }
            else if (icon == 'strong-border') {
                ql = quoteStrongBorder;                
            }
            else if (icon == 'robot') {
                ql = quoteRobotSolid;                
            }
            else if (icon == 'robot-border') {
                ql = quoteRobotBorder;                
            }
            else {
                ql = quoteLeanSolid;                
            }
            return ql;
        }

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
                    )
                ),
                el(
                    InspectorControls,
                    { key: 'controls' },
                    el(
                        PanelBody, 
                        {
                            title: 'Styles',
                            className: 'editor-panel-cite-settings',
                            initialOpen: true
                        },
                        el(RadioControl, 
                            {
                                className: 'radio-blockquote-styles ' + layout,
                                selected: !layout && 'basic' || layout,
                                options: [ 
                                    { 
                                        label: el('span', {className: (layout == undefined) && 'active basic' || 'basic'}, 'Basic'), 
                                        value: 'basic'
                                    }, 
                                    { 
                                        label: el('span', {className: (layout == 'plain') && 'active plain' || 'plain'}, 'Plain'), 
                                        value: 'plain'
                                    }, 
                                    { 
                                        label: el('span', {className: (layout == 'big') && 'active big' || 'big'}, 'Big'), 
                                        value: 'big'
                                    }, 
                                    { 
                                        label: el('span', {className: (layout == 'border') && 'active border' || 'border'}, 'Border'), 
                                        value: 'border'
                                    }, 
                                    { 
                                        label: el('span', {className: (layout == 'dual-tone') && 'active dual-tone' || 'dual-tone'}, 'Dual Tone'), 
                                        value: 'dual-tone'
                                    }, 
                                    { 
                                        label: el('span', {className: (layout == 'highlight') && 'active highlight' || 'highlight'}, 'Highlight'), 
                                        value: 'highlight'
                                    },
                                ],
                                onChange: function( newValue ) {
                                    if (newValue == 'basic') {
                                        props.setAttributes( { layout: undefined } );
                                    } else {
                                        props.setAttributes( { layout: newValue } );
                                    }
                                },
                                help: 'We try to make everything easy to use. Some options may only show based on what you choose.'
                            }
                        )
                    ),
                    el(
                        PanelBody, 
                        {
                            title: 'Attributes',
                            className: 'editor-panel-settings',
                            initialOpen: true
                        },
                        (layout == 'highlight') && el(ToggleControl, 
                            {
                                label: 'Use Title?',
                                checked: applyTitle,
                                onChange: function( newValue ) {
                                    if (applyTitle == false) {
                                        props.setAttributes( { applyTitle: true } );
                                    } else {
                                        props.setAttributes( { applyTitle: false } );
                                    }
                                }
                            }
                        ),
                        el(ToggleControl, 
                            {
                                label: 'Use Author Name?',
                                checked: applyAuthor,
                                onChange: function( newValue ) {
                                    if (applyAuthor == false) {
                                        props.setAttributes( { applyAuthor: true } );
                                    } else {
                                        props.setAttributes( { applyAuthor: false } );
                                    }
                                }
                            }
                        ),
                        el(ToggleControl, 
                            {
                                label: 'Use Extra Info?',
                                checked: applyExtra,
                                onChange: function( newValue ) {
                                    if (applyExtra == false) {
                                        props.setAttributes( { applyExtra: true } );
                                    } else {
                                        props.setAttributes( { applyExtra: false } );
                                    }
                                }
                            }
                        ),
                        el(TextControl, 
                            {
                                label: 'Cite Url',
                                className: 'inspector-cite-setting',
                                value: cite,
                                type: 'url',
                                placeholder: 'http:// ....',
                                onChange: function( newValue ) {
                                    props.setAttributes( { cite: newValue } );
                                }
                            }
                        ),
                        (applyAuthor && cite) && el(ToggleControl, 
                            {
                                label: 'Make cite url as Author link?',
                                checked: citeBeLink,
                                onChange: function( newValue ) {
                                    if (citeBeLink == false) {
                                        props.setAttributes( { citeBeLink: true } );
                                    } else {
                                        props.setAttributes( { citeBeLink: false } );
                                    }
                                }
                            }
                        )
                    ),
                    el(
                        PanelBody, 
                        {
                            title: 'Colors',
                            className: 'editor-panel-cite-settings',
                            initialOpen: false
                        },
                        el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'General Color',
                                        color && el(ColorIndicator, 
                                            { colorValue: color, }
                                        )
                                    )
                                )
                            },                             
                            el(ColorPalette, {
                                colors: colorPack,
                                value: color,
                                className: 'editor-color-palette-control__color-palette',
                                onChange: function( newValue ) {
                                    props.setAttributes( { color: newValue } );
                                }
                            })
                        ),
                        (layout == 'dual-tone') && el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'Secondary Color',
                                        color2 && el(ColorIndicator, 
                                            { colorValue: color2, }
                                        )
                                    )
                                )
                            },                             
                            el(ColorPalette, {
                                colors: colorPack,
                                value: color2,
                                className: 'editor-color-palette-control__color-palette',
                                onChange: function( newValue ) {
                                    props.setAttributes( { color2: newValue } );
                                }
                            })
                        )
                    ),
                    (layout == 'plain' && (applyAuthor || applyExtra)) && el(
                        PanelBody, 
                        {
                            title: 'Separator',
                            className: 'editor-panel-separator-settings',
                            initialOpen: false
                        },
                        el(RadioControl, 
                            {
                                label: 'Choose Separator Style',
                                className: 'radio-blockquote-separator',
                                selected: !separator && 'dots' || separator,
                                options: [ 
                                    { label: 'Dots', value: 'dots'}, 
                                    { label: 'Dash', value: 'dashed'}, 
                                    { label: 'Solid Line', value: 'solid'}, 
                                    { label: 'Nothing', value: 'none'}, 
                                ],
                                onChange: function( newValue ) {
                                    if (newValue == 'dots') {
                                        props.setAttributes( { separator: undefined } );
                                    } else {
                                        props.setAttributes( { separator: newValue } );
                                    }
                                }
                            }
                        )
                    ),
                    (layout != 'big' && layout != 'plain'&& layout != 'highlight') && el(
                        PanelBody, 
                        {
                            title: 'Quote Icon',
                            className: 'editor-panel-cite-settings',
                            initialOpen: false
                        },
                        el(RadioControl, 
                            {
                                label: 'Pick Your Icon',
                                className: 'radio-blockquote-icon',
                                selected: !icon && 'lean' || icon,
                                options: [ 
                                    { label: quoteLeanSolid, value: 'lean'}, 
                                    { label: quoteLeanBorder, value: 'lean-border'}, 
                                    { label: quoteStrongSolid, value: 'strong'}, 
                                    { label: quoteStrongBorder, value: 'strong-border'}, 
                                    { label: quoteRobotSolid, value: 'robot'}, 
                                    { label: quoteRobotBorder, value: 'robot-border'}, 
                                ],
                                onChange: function( newValue ) {
                                    if (newValue == 'lean') {
                                        props.setAttributes( { icon: undefined } );
                                    } else {
                                        props.setAttributes( { icon: newValue } );
                                    }
                                }
                            }
                        )
                    ),
                    (layout != 'highlight') && el( PanelBody, 
                        {
                            title: (layout == 'big') && 'Images' || 'Thumbnail',
                            className: 'editor-panel-image-settings',
                            initialOpen: false
                        },
                        el(BaseControl, 
                            {
                                className: 'the-image-settings',
                            },
                            (fullImageURL && ( (layout == undefined) || (layout == 'plain') || (layout == 'dual-tone') || (layout == 'big' && !applyBigImg) ) && (!applyAuthor && !applyExtra)) && el(Notice,
                                {
                                    status: 'warning',
                                    isDismissible: false
                                },
                                'Your thumbnail will be placed near Author and Extra Info. You need to activate at least one of them to display it.'
                            ),
                            (fullImageURL && layout == 'big') && el(ToggleControl, 
                                {
                                    label: 'Use Big Image instead of Thumbnail',
                                    checked: applyBigImg,
                                    onChange: function( newValue ) {
                                        if (applyBigImg == false) {
                                            props.setAttributes( { applyBigImg: true } );
                                        } else {
                                            props.setAttributes( { applyBigImg: false } );
                                        }
                                    }
                                }
                            ),
                            !fullImageURL && el( Placeholder,
                                {
                                    label: __('No image selected'),
                                    className: (layout == 'big' && applyBigImg) && 'large' || 'thumb',
                                }
                            ) || el('img',
                                {
                                    src: imageURL(),
                                    className: (layout == 'big' && applyBigImg) && 'large' || 'thumb',
                                }
                            ),
                            el( MediaUploadCheck, 
                                null, 
                                el( MediaUpload, 
                                    {
                                        onSelect: function ( imageObject ) {
                                            
                                            if (imageObject.sizes.thumbnail){
                                                props.setAttributes( { thumbImageURL: imageObject.sizes.thumbnail.url } );
                                            }
                                            if (imageObject.sizes.large){
                                                props.setAttributes( { largeImageURL: imageObject.sizes.large.url } );
                                            }
                                            props.setAttributes( { fullImageURL: imageObject.url } );
                                        },
                                        allowedTypes: "image",
                                        value: fullImageURL, 
                                        render: function ( arg ) {
                                            var open = arg.open;
                                            return el( 'button',
                                                { 
                                                    onClick: open,
                                                    className: 'components-button button',
                                                    type: 'button'
                                                },
                                                !fullImageURL && __('Select Image') || __('Change Image')
                                            );
                                        }
                                    }
                                ) 
                            ),
                            fullImageURL && el(Button,
                                {
                                    className: 'button',
                                    onClick: function() {
                                        props.setAttributes( { thumbImageURL: undefined } );
                                        props.setAttributes( { largeImageURL: undefined } );
                                        props.setAttributes( { fullImageURL: undefined } );
                                    }
                                },
                                __('Remove')
                            )
                        )
                    )
                ),
                el( 'div', 
                    {
                        id: 'blockquote-' + id,
                    },
                    el( 'style',
                        null,
                        styleCreator()
                    ),
                    el( 'blockquote', 
                        {
                            className: blockquoteClass(),
                        },
                        (layout == 'big' && applyBigImg) && el( 'div',
                            {  
                                className: 'wp-block-pack-blockquote-big-image'
                            }
                        ),
                        (layout == 'highlight' && applyTitle) && el( 'div', 
                            {
                                className: 'wp-block-pack-blockquote-title'
                            }, 
                            el( RichText, 
                                {
                                    tagName: 'span',
                                    value: props.attributes.title,
                                    placeholder: 'Title',
                                    allowedFormats: [],
                                    keepPlaceholderOnFocus: true,
                                    multiline: false,
                                    onChange: function( content ) {
                                        props.setAttributes( { title: content } );
                                    },
                                } 
                            )
                        ),
                        (layout != 'big' && layout != 'plain' && layout != 'dual-tone' && layout != 'highlight') && quoteIconLoader(),
                        el( RichText, 
                            {
                                tagName: 'p',
                                className: 'wp-block-pack-quote-content',
                                value: props.attributes.content,
                                placeholder: 'Blockquote text goes here',
                                keepPlaceholderOnFocus: true,
                                multiline: false,
                                onChange: function( content ) {
                                    props.setAttributes( { content: content } );
                                },
                            } 
                        ),
                        (applyAuthor || applyExtra) && el( 'footer',
                            {
                                className: 'wp-block-pack-blockquote-footer'
                            },
                            (fullImageURL && ( (layout != 'highlight' && layout != 'big') || (layout == 'big' && !applyBigImg) ) ) && el('img',
                                {
                                    src: imageURL(),
                                }
                            ),
                            (layout == 'dual-tone') && quoteIconLoader(),
                            applyAuthor && el( RichText, 
                                {
                                    tagName: 'span',
                                    className: 'wp-block-pack-blockquote-author',
                                    value: props.attributes.author,
                                    placeholder: 'Author',
                                    allowedFormats: [],
                                    keepPlaceholderOnFocus: true,
                                    multiline: false,
                                    onChange: function onChange( newValue ) {
                                        props.setAttributes( { author: newValue } );
                                    },
                                } 
                            ),
                            applyExtra && el( RichText, 
                                {
                                    tagName: 'span',
                                    className: 'wp-block-pack-blockquote-extra',
                                    value: props.attributes.extra,
                                    placeholder: 'Extra Information',
                                    allowedFormats: [],
                                    keepPlaceholderOnFocus: true,
                                    multiline: false,
                                    onChange: function( content ) {
                                        props.setAttributes( { extra: content } );
                                    },
                                } 
                            )
                        )
                    )
                )
            )
        );
    }),

    save: function(props) {

        var id = props.attributes.id;
        var cite = props.attributes.cite;
        var citeBeLink = props.attributes.citeBeLink;
        var alignment = props.attributes.alignment;
        var layout = props.attributes.layout;

        var applyTitle = props.attributes.applyTitle;
        var title = props.attributes.title;
        var applyAuthor = props.attributes.applyAuthor;
        var author = props.attributes.author;
        var applyExtra = props.attributes.applyExtra;
        var extra = props.attributes.extra;

        var icon = props.attributes.icon;
        var separator = props.attributes.separator;
        var thumbImageURL = props.attributes.thumbImageURL;
        var largeImageURL = props.attributes.largeImageURL;
        var fullImageURL = props.attributes.fullImageURL;
        var applyBigImg = props.attributes.applyBigImg;
        var color = props.attributes.color;
        var color2 = props.attributes.color2;

        // Custom class name
        var blockquoteClass = function blockquoteClass() {

            bc = 'wp-block-pack-blockquote';
            if (layout) {
                bc += ' '+ layout;
                if (layout == 'plain' && separator) {
                    bc += ' separator-' + separator;
                }
            }

            if (alignment) {
                bc += ' quote-align-'+ alignment;
            }

            if (fullImageURL && (layout != 'highlight')) {
                if (layout == 'big' && applyBigImg) {
                    bc += ' with-big-image';
                } else {
                    bc += ' with-image';
                }
            }
            
            return bc;

        }

        // Custom Style
        var styleCreator = function styleCreator() {

            bc = '';
            // For Plain Layout
            if (layout == 'plain') {

                bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.plain {';
                if (color) {
                    bc += 'background-color: '+ color +';'
                }
                bc += '}';

            } 
            // For Big Layout
            else if (layout == 'big') {

                if (color) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.big .wp-block-pack-blockquote-author{';
                        bc += 'color: '+ color +';'
                    bc += '}';
                }
                if (applyBigImg && fullImageURL) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.big .wp-block-pack-blockquote-big-image{';
                        bc += 'background-image: url('+ imageURL() +');'
                    bc += '}';
                }

            } 
            // For Border Layout
            else if (layout == 'border') {

                if (color) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.border {';
                        bc += 'border-color: '+ color +';'
                    bc += '}';
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.border .wp-block-pack-blockquote-author{';
                        bc += 'color: '+ color +';'
                    bc += '}';
                }

            } 
            // For Dual Tone Layout
            else if (layout == 'dual-tone') {

                if (color) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.dual-tone p {';
                        bc += 'background-color: '+ color +';'
                    bc += '}';
                }
                if (color2) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.dual-tone .wp-block-pack-blockquote-footer {';
                        bc += 'background-color: '+ color2 +';'
                    bc += '}';
                }

            } 
            // For Highlight Layout
            else if (layout == 'highlight') {

                if (color) {
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.highlight {';
                        bc += 'border-color: '+ color +';'
                    bc += '}';
                    bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote.highlight .wp-block-pack-blockquote-title span {';
                        bc += 'background-color: '+ color +';'
                    bc += '}';
                }
            }

            if (color) {
                bc += '#blockquote-'+ id + ' blockquote.wp-block-pack-blockquote svg.wp-block-pack-quote-icon{fill:'+ color +';}'
            }

            return bc;

        }

        var imageURL = function imageURL() {
            var iu;

            // Specify by layout type, then by image available
            // Big using large image
            if (layout == 'big' && applyBigImg) {
                if (largeImageURL) {
                    iu = largeImageURL;
                } else {
                    iu = fullImageURL;
                }               
            } 
            // ANother using thumb size
            else {
                if (thumbImageURL) {
                    iu = thumbImageURL;
                } else if (largeImageURL) {
                    iu = largeImageURL;
                } else {
                    iu = fullImageURL;
                }               
            }


            return iu;
        }

        var quoteIconLoader = function quoteIconLoader(){
            if (icon == 'lean-border') {
                ql = quoteLeanBorder;
            } 
            else if (icon == 'strong') {
                ql = quoteStrongSolid;                
            }
            else if (icon == 'strong-border') {
                ql = quoteStrongBorder;                
            }
            else if (icon == 'robot') {
                ql = quoteRobotSolid;                
            }
            else if (icon == 'robot-border') {
                ql = quoteRobotBorder;                
            }
            else {
                ql = quoteLeanSolid;                
            }
            return ql;
        }

        return el( 'div', 
            {
                id: 'blockquote-' + id,
            },
            el( 'style',
                null,
                styleCreator()
            ),
            el( 'blockquote', 
                {
                    className: blockquoteClass(),
                },
                (layout == 'big' && applyBigImg) && el( 'div',
                    {  
                        className: 'wp-block-pack-blockquote-big-image'
                    }
                ),
                (layout == 'highlight' && applyTitle) && el( 'div', 
                    {
                        className: 'wp-block-pack-blockquote-title'
                    }, 
                    el( RichText.Content, 
                        {
                            tagName: 'span',
                            value: props.attributes.title,
                        } 
                    )
                ),
                (layout != 'big' && layout != 'plain' && layout != 'dual-tone' && layout != 'highlight') && quoteIconLoader(),
                el( RichText.Content, 
                    {
                        tagName: 'p',
                        'cite': props.attributes.cite,
                        className: 'wp-block-pack-quote-content',
                        value: props.attributes.content,
                    } 
                ),
                (applyAuthor || applyExtra) && el( 'footer',
                    {
                        className: 'wp-block-pack-blockquote-footer'
                    },
                    (fullImageURL && ( (layout != 'highlight' && layout != 'big') || (layout == 'big' && !applyBigImg) ) ) && el('img',
                        {
                            src: imageURL(),
                        }
                    ),
                    (layout == 'dual-tone') && quoteIconLoader(),
                    (cite && citeBeLink) && el('a', 
                        {
                            href: cite,
                        },
                        el( RichText.Content, 
                            {
                                tagName: 'span',
                                className: 'wp-block-pack-blockquote-author',
                                value: props.attributes.author, 
                            } 
                        )
                    ) || el( RichText.Content, 
                        {
                            tagName: 'span',
                            className: 'wp-block-pack-blockquote-author',
                            value: props.attributes.author, 
                        } 
                    ),
                    applyExtra && el( RichText.Content, 
                        {
                            tagName: 'span',
                            className: 'wp-block-pack-blockquote-extra',
                            value: props.attributes.extra,
                        } 
                    )
                )
            )
        ); 

        return el('blockquote', 
            {
                className: 'wp-block-pack-blockquote',
            },
            el( Dashicon, 
                { 
                    icon: 'format-quote',
                    className: 'wp-block-pack-quote-icon'
                } 
            ),
            el( RichText.Content, 
                {
                    tagName: 'p',
                    'cite': props.attributes.cite,
                    className: 'wp-block-pack-quote-content',
                    value: props.attributes.content, 
                } 
            ),
            (cite && citeBeLink) && el('a', 
                {
                    href: cite,
                },
                el( RichText.Content, 
                    {
                        tagName: 'span',
                        className: 'wp-block-pack-blockquote-author',
                        value: props.attributes.author, 
                    } 
                )
            ) || el( RichText.Content, 
                {
                    tagName: 'span',
                    className: 'wp-block-pack-blockquote-author',
                    value: props.attributes.author, 
                } 
            )
        );
    },
} );
