// Block: Testimonial
// Since ver 1.0.0

var iTestimonial = el('svg', { width: 24, height: 24 },
    el('path', { d: "M22.001 22h-20V2h20v20zm-15-14.017V15h2v1l3-1h5V7.984zm8 5.017h-4v-1h4v1zm0-2h-6v-1h6v1z" })
    );

registerBlockType( 'wp-block-pack/testimonial', {
    title: 'Testimonial',
    description: 'Display a testimonial or feedback sentence from client or anyone you want.', 
    icon: iTestimonial,
    category: 'common',
    keywords: [ "opinion", "witness", "thought" ],
    attributes: {
        alignText: {
            type: 'string',
            default: 'center'
        },
        alignCite: {
            type: 'string',
            default: 'center'
        },
        author: {
            type: 'string',
            default: 'Author Name',
            source: 'html',
            selector: 'span.author-name'
        },
        position: {
            type: 'string',
            default: 'Job Position',
            source: 'html',
            selector: 'span.author-job'
        },
        testimony: {
            type: 'string',
            default: 'Awesome, now you could replace this testimony content with something else. Yes, any text will be fine.',
            source: 'html',
            selector: 'p.testimonial-content'
        },
        avatar: {
            type: 'string'
        },
        isAvatar: {
            type: 'bool',
            default: true
        },
        avatarSize: {
            type: 'number',
            default: 55
        },
        avatarRadi: {
            type: 'number',
            default: 50
        },
        color: {
            type: 'string',
            default: '#333333'
        },
        authorColor: {
            type: 'string'
        },
        positionColor: {
            type: 'string'
        },
        bgColor: {
            type: 'string',
            default: '#eef2f7'
        }
    },
    supports: {
        inserter: wpblockpackInserter('testimonial'),
    },

    edit: function(props) {
        var alignText = props.attributes.alignText;
        var alignCite = props.attributes.alignCite;
        var author = props.attributes.author;
        var position = props.attributes.position;
        var testimony = props.attributes.testimony;
        var avatar = props.attributes.avatar;
        var isAvatar = props.attributes.isAvatar;
        var avatarSize = props.attributes.avatarSize;
        var avatarRadi = props.attributes.avatarRadi;
        var color = props.attributes.color;
        var authorColor = props.attributes.authorColor;
        var positionColor = props.attributes.positionColor;
        var bgColor = props.attributes.bgColor;

        function testimonialStyle(){
            // d
        }

        return (
            el( Fragment,
                null,
                el(
                    InspectorControls,
                    { key: 'controls' },
                    el(
                        PanelBody, 
                        {
                            title: 'Alignment',
                            className: 'editor-panel-align-settings',
                            initialOpen: false
                        },
                        el(BaseControl, 
                            {
                                label: 'Text Alignment',
                                className: 'inspector-align-setting'
                            },
                            el(
                                AlignmentToolbar,
                                {
                                    value: alignText,
                                    onChange: function( newValue ) {
                                        if (!newValue) {
                                            props.setAttributes( { alignText: 'center' } );
                                        } else {
                                            props.setAttributes( { alignText: newValue } );
                                        }
                                    }
                                }
                            )
                        ),
                        el(BaseControl, 
                            {
                                label: 'Cite Position',
                                className: 'inspector-align-setting'
                            },
                            el(
                                AlignmentToolbar,
                                {
                                    value: alignCite,
                                    onChange: function( newValue ) {
                                        if (!newValue) {
                                            props.setAttributes( { alignCite: 'center' } );
                                        } else {
                                            props.setAttributes( { alignCite: newValue } );
                                        }
                                    }
                                }
                            )
                        )
                    ),                             
                    el(
                        PanelBody, 
                        {
                            title: 'Avatar',
                            className: 'editor-panel-avatar-settings',
                            initialOpen: false
                        },
                        el(CheckboxControl, 
                            {
                                heading: 'Avatar Use',
                                label: 'Do you wanna use avatar?',
                                className: 'avatar-use-setting',
                                checked: isAvatar,
                                onChange: function( newValue ) {
                                    if (isAvatar != newValue) {
                                        props.setAttributes( { isAvatar: newValue } );
                                    }
                                },
                                help: (isAvatar == true) && 'Avatar will be used. To not use, uncheck.' || 'The avatar will not be used. To use avatar check it.',
                            }
                        ),
                        (isAvatar == true) && el(RangeControl, 
                            {
                                label: 'Avatar Size',
                                className: 'avatar-size-setting',
                                value: avatarSize,
                                min: 50,
                                max: 120,
                                onChange: function( newValue ) {
                                    props.setAttributes( { avatarSize: newValue } );
                                },
                                help: 'The size is set to ' + avatarSize +  ' x ' + avatarSize +  ' pixels.'
                            }
                        ),
                        (isAvatar == true) && el(RangeControl, 
                            {
                                label: 'Avatar Corner Radius',
                                className: 'avatar-corner-setting',
                                value: avatarRadi,
                                min: 0,
                                max: 50,
                                onChange: function( newValue ) {
                                    props.setAttributes( { avatarRadi: newValue } );
                                },
                                help: 'The corner radius is set to ' + avatarRadi + ' percent.'
                            }
                        )
                    ),
                    el(
                        PanelBody, 
                        {
                            title: (el( Fragment,
                                        null,
                                        'Colors',
                                        color && el(ColorIndicator, 
                                            { colorValue: color, }
                                        ),
                                        authorColor && el(ColorIndicator, 
                                            { colorValue: authorColor, }
                                        ),
                                        positionColor && el(ColorIndicator, 
                                            { colorValue: positionColor, }
                                        ),
                                        bgColor && el(ColorIndicator, 
                                            { colorValue: bgColor, }
                                        ) 
                                    )
                                ),
                            className: 'editor-panel-color-settings',
                            initialOpen: false
                        },
                        el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'Text Color',
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
                                    if (!newValue) {
                                        props.setAttributes( { color: '#333333' } );
                                    } else {
                                        props.setAttributes( { color: newValue } );
                                    }
                                }
                            })
                        ),
                        el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'Author Color',
                                        authorColor && el(ColorIndicator, 
                                            { colorValue: authorColor, }
                                        )
                                    )
                                )
                            },
                            el(ColorPalette, {
                                colors: colorPack,
                                value: authorColor,
                                className: 'editor-color-palette-control__color-palette',
                                onChange: function onChange( newValue ) {
                                    props.setAttributes( { authorColor: newValue } );
                                }
                            })
                        ),
                        el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'Position Color',
                                        positionColor && el(ColorIndicator, 
                                            { colorValue: positionColor, }
                                        )
                                    )
                                )
                            },
                            el(ColorPalette, {
                                colors: colorPack,
                                value: positionColor,
                                className: 'editor-color-palette-control__color-palette',
                                onChange: function onChange( newValue ) {
                                    props.setAttributes( { positionColor: newValue } );
                                }
                            })
                        ),
                        el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'Background Color',
                                        bgColor && el(ColorIndicator, 
                                            { colorValue: bgColor, }
                                        )
                                    )
                                )
                            },
                            el(ColorPalette, {
                                colors: colorPack,
                                value: bgColor,
                                className: 'editor-color-palette-control__color-palette',
                                onChange: function( newValue ) {
                                    props.setAttributes( { bgColor: newValue } );
                                    if (!newValue) {
                                        props.setAttributes( { bgColor: '#eef2f7' } );
                                    } else {
                                        props.setAttributes( { bgColor: newValue } );
                                    }
                                }
                            })
                        )
                    )
                ),
                el( 
                    'div', 
                    { 
                        'class': 'wp-block-pack-testimonial testimony-'+ alignText +' cite-'+ alignCite,
                        'style': { backgroundColor: bgColor, color: color }
                    },
                    el( RichText, 
                        {
                            tagName: 'p',
                            className: 'testimonial-content',
                            value: testimony,
                            allowedFormats: [ "bold", "italic", "strikethrough" ],
                            placeholder: 'Testimonial Text here ...',
                            multiline: false,
                            onChange: function( newValue ) {
                                props.setAttributes( { testimony: newValue } );
                            },
                        } 
                    ),
                    el( 'footer', 
                        { 
                            className: (isAvatar == true) && 'testimonial-author' || 'testimonial-author without-avatar',
                            style: { minHeight: (isAvatar == true) && avatarSize+1+'px' }
                        },
                        el( RichText, 
                            {
                                tagName: 'span',
                                className: 'author-name',
                                value: author,
                                placeholder: 'Name ...',
                                multiline: false,
                                allowedFormats: [ "italic", "strikethrough" ],
                                onChange: function( newValue ) {
                                    props.setAttributes( { author: newValue } );
                                },
                                style: { 
                                    color: authorColor, 
                                    marginLeft: (isAvatar == true) && avatarSize+15+'px' 
                                }
                           } 
                        ),
                        el( RichText, 
                            {
                                tagName: 'span',
                                className: 'author-job',
                                value: position,
                                placeholder: 'Position ...',
                                multiline: false,
                                allowedFormats: [ "italic", "strikethrough" ],
                                onChange: function( newValue ) {
                                    props.setAttributes( { position: newValue } );
                                },
                                style: { 
                                    color: positionColor, 
                                    marginLeft: (isAvatar == true) && avatarSize+15+'px' 
                                }
                            } 
                        ),
                        (isAvatar == true) && el( MediaUploadCheck, null, el( MediaUpload, {
                            onSelect: function ( imageObject ) {
                                
                                if (imageObject.sizes.thumbnail){
                                    imgURL = imageObject.sizes.thumbnail.url;
                                } else {
                                    imgURL = imageObject.url;
                                }
                                props.setAttributes( { avatar: imgURL } );
                            },
                            allowedTypes: "image",
                            value: avatar, 
                            render: function ( arg ) {
                                var open = arg.open;
                                return el( 'button',
                                    { 
                                        onClick: open,
                                        className: 'avatar',
                                        style: { 
                                            'width': avatarSize+'px', 
                                            'height': avatarSize+'px', 
                                            borderRadius: avatarRadi+'%'
                                        },
                                        type: 'button'
                                     },
                                    isAvatar && el('img',
                                        {
                                            src: avatar,
                                        }
                                    )
                                );
                            }
                        }) )
                    )
                ),
                el('style', 
                    null, 
                    testimonialStyle()
                )
            )
        );
    },

    save: function(props) {
        var alignText = props.attributes.alignText;
        var alignCite = props.attributes.alignCite;
        var author = props.attributes.author;
        var position = props.attributes.position;
        var testimony = props.attributes.testimony;
        var avatar = props.attributes.avatar;
        var isAvatar = props.attributes.isAvatar;
        var avatarSize = props.attributes.avatarSize;
        var avatarRadi = props.attributes.avatarRadi;
        var color = props.attributes.color;
        var authorColor = props.attributes.authorColor;
        var positionColor = props.attributes.positionColor;
        var bgColor = props.attributes.bgColor;

        return el( 'div', 
            { 
                'class': 'wp-block-pack-testimonial testimony-'+ alignText +' cite-'+ alignCite,
                style: { backgroundColor: bgColor, color: color }
            },
            el( RichText.Content, 
                {
                    tagName: 'p',
                    className: 'testimonial-content',
                    value: testimony
                } 
            ),
            el( 'footer', 
                { 
                    className: (isAvatar == true) && 'testimonial-author' || 'testimonial-author without-avatar',
                    style: { minHeight: (isAvatar == true) && avatarSize+1+'px' }
                },
                el( RichText.Content, 
                    {
                        tagName: 'span',
                        className: 'author-name',
                        value: author,
                        style: { color: authorColor, marginLeft: (isAvatar == true) && avatarSize+15+'px' }
                    } 
                ),
                el( RichText.Content, 
                    {
                        tagName: 'span',
                        className: 'author-job',
                        value: position,
                        style: { color: positionColor, marginLeft: (isAvatar == true) && avatarSize+15+'px' }
                    } 
                ),
                (isAvatar == true) && el('img',
                    {
                        src: avatar,
                        className: 'avatar',
                        style: { 'width': avatarSize+'px', 'height': avatarSize+'px', borderRadius: avatarRadi+'%' },
                    }
                )
            )
        );
    },
} );

