// Block: Inline
// Since ver 1.0.6

// @koala-append "content.js"

var iProButton = el( SVG, { width: 24, height: 24 },
    el( 'path', { 
        d: "M22 22H2V2h20v20zM12 7a5.006 5.006 0 0 0-5 5 5.006 5.006 0 0 0 5 5 5.006 5.006 0 0 0 5-5 5.005 5.005 0 0 0-5-5zm0 8a3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-3 3z"
    })
);

registerBlockType('wp-block-pack/inline-buttons', {
    title: __('Buttons Pro'),
    description: __('Use this block to convert most gutenberg block buttons into inline style.'), 
    icon: iProButton,
    category: 'layout',
    keywords: [ __("link"), __("nofollow"), __("follow") ],
    attributes: {
        alignment: {
            type: 'string'
        },
        float: {
            type: 'string',
            default: 'none',
        },
    },
    supports: {
        className: false,
        customClassName: false,
        inserter: wpblockpackInserter('inline-buttons'),
    },
    
    getEditWrapperProps: function getEditWrapperProps(attributes) {
        var float = attributes.float;

        var props = { 'data-resized': true };

        if ('left' === float || 'right' === float) {
            props['data-align'] = float;
        }

        return props;
    },

    edit: function (props) {
        var alignment = props.attributes.alignment;
        var float = props.attributes.float;
        var theButtons = [ 

            ['wp-block-pack/button-pro', { isIconBefore: true, iconBefore: 'wordpress-alt', hoverBackgroundColor: '#006dd9' } ],

        ];

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
                    el( ButtonGroup,
                        { className: 'components-toolbar toggle-button button-float-' + float },
                        el( Tooltip,
                            {
                                text: __('Float Button Left'),
                            },
                            el( Button,
                                {
                                    className: 'components-toolbar__control left-float',
                                    onClick: function () {
                                        if (float == 'left') {
                                            props.setAttributes( { float: 'none' } );
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
                                text: __('Float Button Right'),
                            },
                            el( Button,
                                {
                                    className: 'components-toolbar__control right-float',
                                    onClick: function () {
                                        if (float == 'right') {
                                            props.setAttributes( { float: 'none' } );
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
                el('div', 
                    { 
                        className: 'wp-block-pack-inline-block',
                        style: { textAlign: alignment && alignment } 
                    },
                    el(InnerBlocks,
                        {
                            template: theButtons,
                            allowedBlocks: [ 'wp-block-pack/button-pro', 'core/button', 'gab/animation-button', 'advgb/button', 'ugb/button', 'atomic-blocks/ab-button', 'uagb/buttons', 'themeisle-blocks/button-group', 'kadence/advancedbtn' ],
                            templateInsertUpdatesSelection: false,
                            templateLock: false
                        }
                    )
                )
            )
        );
    },

    save: function(props) {
        var alignment = props.attributes.alignment;
        var float = props.attributes.float;
        return el('div', 
            { 
                className: 'wp-block-pack-inline-block'+ ((float != 'none') && ' float-'+ float || ''),
                style: { textAlign: alignment && alignment } 
            },
            (float != 'none') && el('div', {}, el(InnerBlocks.Content) ) || el(InnerBlocks.Content)
            
        );
    },
} );
