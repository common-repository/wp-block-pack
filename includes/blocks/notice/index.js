// Block: Notice
// Since ver 1.0.0

var iNotice = el( SVG, { width: 24, height: 24 },
    el( 'path', { d: "M22 22.002H2v-20h20v20zm-10.233-11.74l-1.932 5.611 1.413.487 1.932-5.611-1.413-.486zm1.435-2.774a1.1 1.1 0 0 0-.372.069.74.74 0 0 0-.475.471.736.736 0 0 0 .082.671 1.021 1.021 0 0 0 .528.425.959.959 0 0 0 .312.053 1.065 1.065 0 0 0 .359-.065.744.744 0 0 0 .47-.481.747.747 0 0 0-.077-.661.974.974 0 0 0-.519-.43.96.96 0 0 0-.31-.052z" })
    );

registerBlockType( 'wp-block-pack/notice', {
    title: 'Notice',
    description: 'Simple notification with beautiful 4 pre-made and custom style options.', 
    icon: iNotice,
    category: 'common',
    keywords: [ "info", "warning", "message" ],
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            default: 'This is a message that may caught your attention. Right?',
            selector: 'p',
        },
        alignment: {
            type: 'string',
            default: 'left',
        },
        design: {
            type: 'string',
            source: 'attribute',
            selector: '.wp-block-pack-notice',
            attribute: 'data-design',
            default: 'info'
        },
        bgColor: {
            type: 'string',
            default: '#2196F3'
        },
        fontColor: {
            type: 'string',
            default: '#ffffff'
        },
        closeButton: {
            type: 'string',
            source: 'attribute',
            selector: '.wp-block-pack-notice',
            attribute: 'data-closebtn',
            default: 'on'
        },
    },
    supports: {
        inserter: wpblockpackInserter('notice'),
    },

    edit: function(props) {
        var content = props.attributes.content,
            alignment = props.attributes.alignment,
            design = props.attributes.design,
            fontColor = props.attributes.fontColor,
            bgColor = props.attributes.bgColor,
            closeButton = props.attributes.closeButton;
        var bgColors = [{ name: 'Info', design: 'info', color: '#2196f3' }, { name: 'Danger', design: 'dang', color: '#e72719' }, { name: 'Success', design: 'succ', color: '#4CAf50' }, { name: 'Warning', design: 'warn', color: '#FF9800' }]
        var fontColors = [{ name: 'Dark', color: '#444444' }, { name: 'Light', color: '#ffffff' }]
        var info, dang, succ, warn, cust;

        if (design == 'info') {
            var info = true;
        } else if (design == 'dang') {
            var dang = true;
        } else if (design == 'succ') {
            var succ = true;
        } else if (design == 'warn') {
            var warn = true;
        } else if (design == 'cust') {
            var cust = true;
        }

        var noticeStyle = { color: fontColor };

        if (design == 'cust') {
            noticeStyle = { color: fontColor, backgroundColor: bgColor };
        }
  
        

        return (
            el( Fragment,
                null,
                el(
                    BlockControls,
                    null,
                    el( Tooltip,
                        {
                            'text': 'Notice Style',
                        },
                        el( 'div',
                            { 'class': 'components-toolbar'},
                            el( 'div',
                                null,
                                el('select',
                                    { 
                                        'id': 'notice-style-select',
                                        'class': 'wp-block-pack-select notice-style-select',
                                        onChange: function( newValue ) {
                                            for (i = 0; i < bgColors.length; i++) {
                                                if(bgColors[i].design == newValue.target.value){
                                                    props.setAttributes( { bgColor: bgColors[i].color } );
                                                }
                                            }
                                            props.setAttributes( { design: newValue.target.value } );
                                        }
                                    },
                                    el('option', { 'value': 'cust', 'selected':cust }, 'Custom Color'),
                                    el('option', { 'value': 'dang', 'selected':dang }, 'Danger'),
                                    el('option', { 'value': 'info', 'selected':info }, 'Info'),
                                    el('option', { 'value': 'succ', 'selected':succ }, 'Success'),
                                    el('option', { 'value': 'warn', 'selected':warn }, 'Warning')
                                )
                            )
                        )
                    ),
                    el(
                        AlignmentToolbar,
                        {
                            value: alignment,
                            onChange: function( newValue ) {
                                props.setAttributes( { alignment: newValue } );
                            },
                        }
                    ),
                     el( Tooltip,
                        {
                            'text': 'Show Hide Close Button',
                        },
                        el( 'div',
                            { 'class': 'components-toolbar ' + closeButton + ' toggle-button'},
                            el( Button,
                                {
                                    onClick: function() {
                                        if (closeButton == 'on') {
                                            props.setAttributes( { closeButton: 'off' } );
                                        } else {
                                            props.setAttributes( { closeButton: 'on' } );
                                        }
                                    }
                                },
                                el(Dashicon, {icon: 'no'})
                            )
                        )
                    )
                ),
                el(
                    InspectorControls,
                    { key: 'controls' },
                    el(PanelBody, 
                        {
                            title: (el( Fragment,
                                    null,
                                    'Color',
                                    bgColor && el(ColorIndicator, 
                                        {
                                            colorValue: bgColor,
                                        }
                                    ),
                                    fontColor && el(ColorIndicator, 
                                        {
                                            colorValue: fontColor,
                                        }
                                    )
                                )
                            ),
                            className: 'editor-panel-color-settings',
                            initialOpen: true
                        },
                        el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'Background Color',
                                        bgColor && el(ColorIndicator, 
                                            {
                                                colorValue: bgColor,
                                            }
                                        )
                                    )
                                )
                            },                             
                            el(ColorPalette, {
                                colors: bgColors,
                                value: bgColor,
                                className: 'editor-color-palette-control__color-palette',
                                onChange: function( newValue ) {
                                    var colorListed = 'unlisted';
                                    for (i = 0; i < bgColors.length; i++) {
                                        if(bgColors[i].color == newValue){
                                            props.setAttributes( { design: bgColors[i].design } );
                                            colorListed = 'listed';
                                        }
                                    }
                                    if (colorListed == 'unlisted') {
                                        props.setAttributes( { design: 'cust' } );
                                    }
                                    props.setAttributes( { bgColor: newValue } );
                                }
                            })
                        ),
                        el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'Font Color',
                                        fontColor && el(ColorIndicator, 
                                            {
                                                colorValue: fontColor,
                                            }
                                        )
                                    )
                                )
                            },                             
                            el(ColorPalette, {
                                colors: fontColors,
                                value: fontColor,
                                className: 'editor-color-palette-control__color-palette',
                                onChange: function( newValue ) {
                                    props.setAttributes( { fontColor: newValue } );
                                }
                            })
                        )
                    )
                ),
                el('div', 
                    {
                        className: 'wp-block-pack-notice notice-' + design + ' align-' + alignment + ' closebtn-' + closeButton ,
                        'style': noticeStyle
                    },
                    el( RichText,
                        {
                            tagName: 'p',
                            onChange: function( newValue ) {
                                props.setAttributes( { content: newValue } );
                            },
                            value: content,
                        }
                    )
                )
            )
        );
    },

    save: function(props) {
        var content = props.attributes.content,
            alignment = props.attributes.alignment,
            design = props.attributes.design,
            bgColor = props.attributes.bgColor;
            fontColor = props.attributes.fontColor;
            closeButton = props.attributes.closeButton,
            noticeStyle = '',
            closeNotice,
            classic;
        if ( closeButton == 'on' ) {
            var closeNotice = el( 
                    'span', 
                    { 'class': 'closebtn', 'onclick': "this.parentElement.style.display='none';" }, 
                    '&times;'
                );
            var classic = 'with-close-button';
        }
        if (fontColor !== '#ffffff') {
            noticeStyle = { color: fontColor };
        }
            
        if (design == 'cust') {
            if (fontColor == '#ffffff') {
                noticeStyle = { backgroundColor: bgColor };
            } else {
                noticeStyle = { backgroundColor: bgColor, color: fontColor };
            }
        }

        return el( 'div',
            { className: classic },
            el( 
                RichText.Content, 
                {
                    tagName: 'p',
                    value: content,
                    className: 'wp-block-pack-notice notice-' + design + ' align-' + alignment + ' closebtn-' + closeButton ,
                    style: noticeStyle,
                    'data-design': design,
                    'data-closebtn': closeButton,
                } 
            ),
            closeNotice
        );
    },
} );
