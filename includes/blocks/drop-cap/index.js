// Block: Drop Cap
// Since ver 1.0.8

var iDropCap = el( SVG, { width: 24, height: 24 },
    el( 'path', { d: "M22 22H2V2h20v20zM7.5 14.749a.751.751 0 0 0-.751.75.752.752 0 0 0 .751.751h9a.751.751 0 0 0 .749-.751.75.75 0 0 0-.749-.75zm-.343-7.161v5.711h1.617a3.291 3.291 0 0 0 2.318-.75 2.828 2.828 0 0 0 .8-2.161 2.726 2.726 0 0 0-.774-2.062 3.028 3.028 0 0 0-2.172-.739zm7.342 4.162a.75.75 0 0 0-.75.75.75.75 0 0 0 .75.75h2a.75.75 0 0 0 .749-.75.75.75 0 0 0-.749-.75zm0-3a.751.751 0 0 0-.75.751.75.75 0 0 0 .75.75h2a.75.75 0 0 0 .749-.75.751.751 0 0 0-.749-.751zM8.888 12.3h-.519V8.581h.644c1.078 0 1.625.619 1.625 1.84.001 1.247-.587 1.879-1.748 1.879z" })
);

registerBlockType('wp-block-pack/drop-cap', {
    title: 'Drop Cap',
    description: "Just a simple regular paragraph with way more advanced Drop Cap control.", 
    icon: iDropCap,
    category: 'common',
    keywords: [ "first", "big", "letter" ],
    attributes: {
        id: {
            type: 'string',
        },
        dropStyle: {
            type: 'string',
        },
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        alignment: {
            type: 'string',
        },
        textColor: {
            type: 'string',
        },
        backgroundColor: {
            type: 'string',
        },
        fontSize: {
            type: 'string',
        },
        dropcapSize: {
            type: 'string',
        },
    },
    supports: {
        className: false,
        customClassName: false,
        inserter: wpblockpackInserter('drop-cap'),
    },
    transforms: {
        to: [
            {
                type: 'block',
                blocks: [ 'core/paragraph' ],
                transform: function( attributes ) {
                    return createBlock( 'core/paragraph', {
                        align: attributes.alignment,
                        content: attributes.content,
                        dropCap: true,
                        fontSize: attributes.fontSize,
                        customBackgroundColor: attributes.backgroundColor,
                        customTextColor: attributes.textColor,
                    } );
                }
            }
        ],
        from: [
            {
                type: 'block',
                blocks: [ 'core/paragraph' ],
                transform: function ( attributes ) {
                    return createBlock( 'wp-block-pack/drop-cap', {
                        alignment: attributes.align,
                        content: attributes.content,
                        fontSize: attributes.fontSize,
                        backgroundColor: attributes.customBackgroundColor,
                        textColor: attributes.customTextColor,
                    } );
                },
            },
        ]
    },
    
    edit: withState( { paragraphPopover: false, dropcapPopover: false } )(function(props) {
        var paragraphPopover = props.paragraphPopover;
        var dropcapPopover = props.dropcapPopover;
        var setState = props.setState;

        var id = props.attributes.id;
        var dropStyle = props.attributes.dropStyle;
        var fontSize = props.attributes.fontSize;
        var dropcapSize = props.attributes.dropcapSize;
        var customFontSize = props.attributes.customFontSize;
        var textColor = props.attributes.textColor;
        var backgroundColor = props.attributes.backgroundColor;
        var alignment = props.attributes.alignment;

        // Load font size
        var fontSizeLoader = function fontSizeLoader() {

            allButton = textSizes.map( function( textSizesChild ) {

                oneButton = el(Button, 
                    {
                        onClick: function() {
                            if (paragraphPopover) {
                                if (textSizesChild.name == 'normal') {
                                    props.setAttributes( { fontSize: undefined } );
                                } else {
                                    props.setAttributes( { fontSize: textSizesChild.name } );
                                }
                            }
                            if (dropcapPopover) {
                                if (textSizesChild.name == 'normal') {
                                    props.setAttributes( { dropcapSize: undefined } );
                                } else {
                                    props.setAttributes( { dropcapSize: textSizesChild.name } );
                                }
                            }
                        },
                        className: 'editor-styles-wrapper',
                    }, 
                    (paragraphPopover && textSizesChild.name == fontSize) && el(Dashicon, {icon: 'saved'}),
                    (paragraphPopover && !fontSize && textSizesChild.name == 'normal') && el(Dashicon, {icon: 'saved'}),

                    (dropcapPopover && textSizesChild.name == dropcapSize) && el(Dashicon, {icon: 'saved'}),
                    (dropcapPopover && !dropcapSize && textSizesChild.name == 'normal') && el(Dashicon, {icon: 'saved'}),

                    el('span', {style: {fontSize: textSizesChild.value + 'em'}}, textSizesChild.label)
                );
                return oneButton

            });
            return allButton;
        }

        // Define ID for Drop Cap
        if (!id) {
            props.setAttributes( { id: props.clientId } );
        }
        if (id != props.clientId ) {
            props.setAttributes( { id: props.clientId } );
        }


        var dropStyler = function dropStyler() {

            styler = '';

            if(backgroundColor || textColor) {
                
                if(dropStyle == 'box') {

                    styler = '#drop-cap-'+ props.clientId + ' p.wp-block-pack-drop-cap.has-box-drop-cap';
                    if (backgroundColor) {
                        styler += '.has-background-color'
                    }
                    if (textColor) {
                        styler += '.has-text-color'
                    }
                    styler += ':not(:focus):first-child::first-letter {';


                    if (backgroundColor) {
                        styler += 'color: '+ backgroundColor +';';
                    }
                    if (textColor) {
                        styler += 'background-color: '+ textColor +';';
                    }
                    styler += '}';

                }

                if(dropStyle == 'letter-shadow') {

                    styler = '#drop-cap-'+ props.clientId + ' p.wp-block-pack-drop-cap.has-letter-shadow-drop-cap';
                    if (backgroundColor) {
                        styler += '.has-background-color'
                    }
                    if (textColor) {
                        styler += '.has-text-color'
                    }
                    styler += ':not(:focus):first-child::first-letter {';

                    if (backgroundColor) {
                        styler += 'text-shadow: -1px -1px 0 '+ backgroundColor +', -1px 1px 0 '+ backgroundColor +', 1px -1px 0 '+ backgroundColor +', 1px 1px 0 '+ backgroundColor +',';
                    } else {
                        styler += 'text-shadow: -1px -1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, 1px 1px 0 #fff,';
                    }

                    if (textColor) {
                        styler += '4px 4px 0 '+ textColor;
                    } else {
                        styler += '4px 4px 0 #fff';
                    }
                    styler += ';}';

                }

                if(dropStyle == 'box-stroke') {

                    styler = '#drop-cap-'+ props.clientId + ' p.wp-block-pack-drop-cap.has-box-stroke-drop-cap';
                    if (backgroundColor) {
                        styler += '.has-background-color'
                    }
                    if (textColor) {
                        styler += '.has-text-color'
                    }
                    styler += ':not(:focus):first-child::first-letter {';


                    if (textColor) {
                        styler += 'border-color: '+ textColor +';';
                    }
                    styler += '}';


                }

            }

            return styler;
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
                    el( PanelBody, 
                        {
                            title: 'Styles',
                            className: 'editor-panel-styles-settings',
                            initialOpen: true
                        },
                        el(RadioControl, 
                            {
                                label: 'Drop Cap Style',
                                className: 'radio-dropcap',
                                selected: !dropStyle && 'letter' || dropStyle,
                                options: [ { label: 'Letter', value: 'letter'}, { label: 'Box', value: 'box'}, { label: 'Letter Shadow', value: 'letter-shadow'}, { label: 'Box Stroke', value: 'box-stroke'}, ],
                                onChange: function( newValue ) {
                                    if (newValue == 'letter') {
                                        props.setAttributes( { dropStyle: undefined } );
                                    } else {
                                        props.setAttributes( { dropStyle: newValue } );
                                    }
                                }
                            }
                        )
                    ),
                    el( PanelBody, 
                        {
                            title: 'Sizes',
                            className: 'editor-panel-sizes-settings',
                            initialOpen: false
                        },
                        el( BaseControl,
                            { 
                                className: 'components-font-size-picker__buttons',
                                label: 'Paragraph Font Size',
                            },
                            el(Button,
                                { 
                                    className: 'components-font-size-picker__selector is-button is-default is-wp_block_pack-popover',
                                    onClick: function( newValue ) {
                                        if (paragraphPopover) {
                                            setState( { paragraphPopover: false } );
                                        } else {
                                            setState( { paragraphPopover: true } );
                                        }
                                    }
                                },
                                fontSize && fontSize || 'Normal',
                                paragraphPopover && el(Popover,
                                    {
                                        onClose: function onClose() {
                                            setState( { paragraphPopover: false } );
                                        },
                                        className: 'wp-block-pack-popover-fontsize'
                                    },
                                    fontSizeLoader()
                                )
                            )
                        ),
                        el( BaseControl,
                            { 
                                className: 'components-font-size-picker__buttons',
                                label: 'Drop Cap Font Size',
                            },
                            el(Button,
                                { 
                                    className: 'components-font-size-picker__selector is-button is-default is-wp_block_pack-popover',
                                    onClick: function( newValue ) {
                                        if (dropcapPopover) {
                                            setState( { dropcapPopover: false } );
                                        } else {
                                            setState( { dropcapPopover: true } );
                                        }
                                    }
                                },
                                dropcapSize && dropcapSize || 'Normal',
                                dropcapPopover && el(Popover,
                                    {
                                        onClose: function onClose() {
                                            setState( { dropcapPopover: false } );
                                        },
                                        className: 'wp-block-pack-popover-fontsize'
                                    },
                                    fontSizeLoader()
                                )
                            )
                        )
                    ),
                    el( PanelBody, 
                        {
                            title: (el( Fragment,
                                    null,
                                    'Colors',
                                    backgroundColor && el(ColorIndicator, 
                                        {
                                            colorValue: backgroundColor,
                                        }
                                    ),
                                    textColor && el(ColorIndicator, 
                                        {
                                            colorValue: textColor,
                                        }
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
                                        'Background Color',
                                        backgroundColor && el(ColorIndicator, 
                                            {
                                                colorValue: backgroundColor,
                                            }
                                        )
                                    )
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
                        el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'Text Color',
                                        textColor && el(ColorIndicator, 
                                            {
                                                colorValue: textColor,
                                            }
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
                        )
                    )
                ),
                el( 'div', 
                    {
                        id: 'drop-cap-'+ props.clientId,
                        className: 'paragraph-drop-cap'
                    },
                    el('style', null, dropStyler()),
                    el( RichText, 
                        {
                            tagName: 'p',
                            className: 'wp-block-pack-drop-cap' + (alignment && ' align-'+ alignment || '') + (dropStyle && ' has-'+ dropStyle +'-drop-cap' || '') + (fontSize && ' has-'+ fontSize+'-font-size' || '') + (dropcapSize && ' has-'+ dropcapSize+'-drop-cap' || '') + (backgroundColor && ' has-background-color' || '') + (textColor && ' has-text-color' || ''),
                            style: {color: textColor, backgroundColor: backgroundColor},
                            value: props.attributes.content,
                            placeholder: 'Start writing',
                            keepPlaceholderOnFocus: true,
                            multiline: false,
                            onChange: function( content ) {
                                props.setAttributes( { content: content } );
                            },
                            onFocus: function (argument) {
                            }
                        } 
                    ) 
                )
            )
        );
    }),

    save: function(props) {
        var id = props.attributes.id;
        var dropStyle = props.attributes.dropStyle;
        var fontSize = props.attributes.fontSize;
        var dropcapSize = props.attributes.dropcapSize;
        var customFontSize = props.attributes.customFontSize;
        var textColor = props.attributes.textColor;
        var backgroundColor = props.attributes.backgroundColor;
        var alignment = props.attributes.alignment;

        var dropStyler = function dropStyler() {

            styler = '';

            if(backgroundColor || textColor) {
                
                if(dropStyle == 'box') {

                    styler = '#drop-cap-'+ id + ' p.wp-block-pack-drop-cap.has-box-drop-cap';
                    if (backgroundColor) {
                        styler += '.has-background-color'
                    }
                    if (textColor) {
                        styler += '.has-text-color'
                    }
                    styler += '::first-letter {';


                    if (backgroundColor) {
                        styler += 'color: '+ backgroundColor +';';
                    }
                    if (textColor) {
                        styler += 'background-color: '+ textColor +';';
                    }
                    styler += '}';

                }

                if(dropStyle == 'letter-shadow') {

                    styler = '#drop-cap-'+ id + ' p.wp-block-pack-drop-cap.has-letter-shadow-drop-cap';
                    if (backgroundColor) {
                        styler += '.has-background-color'
                    }
                    if (textColor) {
                        styler += '.has-text-color'
                    }
                    styler += '::first-letter {';

                    if (backgroundColor) {
                        styler += 'text-shadow: -1px -1px 0 '+ backgroundColor +', -1px 1px 0 '+ backgroundColor +', 1px -1px 0 '+ backgroundColor +', 1px 1px 0 '+ backgroundColor +',';
                    } else {
                        styler += 'text-shadow: -1px -1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, 1px 1px 0 #fff,';
                    }

                    if (textColor) {
                        styler += '4px 4px 0 '+ textColor;
                    } else {
                        styler += '4px 4px 0 #fff';
                    }
                    styler += ';}';

                }

                if(dropStyle == 'box-stroke') {

                    styler = '#drop-cap-'+ id + ' p.wp-block-pack-drop-cap.has-box-stroke-drop-cap';
                    if (backgroundColor) {
                        styler += '.has-background-color'
                    }
                    if (textColor) {
                        styler += '.has-text-color'
                    }
                    styler += '::first-letter {';


                    if (textColor) {
                        styler += 'border-color: '+ textColor +';';
                    }
                    styler += '}';


                }

            }

            return el('style', null, styler);
        }

        return  el( 'div', 
            {
                id: 'drop-cap-'+ id,
                className: 'paragraph-drop-cap'
            },
            dropStyler(),
            el( RichText.Content, 
                {
                    tagName: 'p',
                    className: 'wp-block-pack-drop-cap' + (alignment && ' align-'+ alignment || '') + (dropStyle && ' has-'+ dropStyle +'-drop-cap' || '') + (fontSize && ' has-'+ fontSize+'-font-size' || '') + (dropcapSize && ' has-'+ dropcapSize+'-drop-cap' || '') + (backgroundColor && ' has-background-color' || '') + (textColor && ' has-text-color' || ''),
                    style: {color: textColor, backgroundColor: backgroundColor},
                    value: props.attributes.content,
                } 
            ) 
        );
    },
} );
