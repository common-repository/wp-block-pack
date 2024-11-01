// Block: Counter
// Since ver 1.0.6

registerBlockType('wp-block-pack/individual-counter', {
    title: 'Individual Counter',
    description: 'This block are individual counter.', 
    icon: 'edit',
    category: 'common',
    attributes: {
        number: {
            type: 'number',
            default: 99
        },
        title: {
            type: 'string',
            default: 'The Title',
            source: 'html',
            selector: 'h3.individual-counter-title'
        },
    },
    supports: {
        className: false,
        inserter: false,
    },
    
    edit: withState( { counterOn: false } )(function(props) {
        var counterOn = props.counterOn;
        var number = props.attributes.number;
        var title = props.attributes.title;
        var individualCounterContents = [ [ 'wp-block-pack/icon', { iconName: "admin-appearance", iconSize: "2x" } ] ];

        return (
            el( Fragment,
                null,
                el(
                    InspectorControls,
                    { key: 'controls' },
                    el(
                        PanelBody, 
                        null,
                        'Control setting are not available yet.'                        
                    )
                ),
                el('div', 
                    {
                        className: "wp-block-pack-individual-counter"
                    },
                    el('div',
                        {
                            className: "individual-counter-content"
                        },
                        el(InnerBlocks,
                            {
                                template: individualCounterContents,
                                allowedBlocks: [ "wp-block-pack/icon" ],
                                templateInsertUpdatesSelection: false,
                                templateLock: 'insert'
                            }
                        ),
                        el('div',
                            {
                                className: 'individual-counter-number'
                            },
                            props.isSelected && el( 'input',
                                {
                                    type: 'number',
                                    onChange: function( newValue ) {
                                        var newValueConv = Number(newValue.target.value);
                                        props.setAttributes({ number: newValueConv });
                                    },
                                    value: number, 
                                    autofocus: true,
                                }
                            ),
                            !props.isSelected && el( 'span',
                                {
                                    className: 'individual-counter-number-animate',
                                    'data-number': number
                                },
                                number
                            )
                        ),
                        el( RichText,
                            {
                                tagName: 'h3',
                                className: 'individual-counter-title',
                                allowedFormats: [],
                                onChange: function( newValue ) {
                                    props.setAttributes( { title: newValue } );
                                },
                                value: title,
                            }
                        )
                    )
                )
            )
        );
    } ),

    save: function(props) {
        var number = props.attributes.number;
        var title = props.attributes.title;

        return el('div', 
            {
                className: "wp-block-pack-indivdual-counter"
            },
            el('div',
                {
                    className: "indivdual-counter-content"
                },
                el(InnerBlocks.Content),
                el('div',
                    {
                        className: 'individual-counter-number'
                    },
                    el('span',
                        {
                            className: 'individual-counter-number-animate',
                            'data-number': number
                        },
                        number
                    )
                ),
                el('h3',
                    {
                        className: 'individual-counter-title'
                    },
                    title
                )
            )
        );
    },
} );
