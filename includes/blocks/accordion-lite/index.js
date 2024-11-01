// Block: Accordion Lite
// Since ver 1.0.2

var iAccordionLite = el( SVG, { width: 24, height: 24 },
    el( 'path', { d: "M21.999 22h-20V2h20v20zm-13-10a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1zm-.5-2a.5.5 0 0 0-.5.5.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5.5.5 0 0 0-.5-.5zm0-2a.5.5 0 0 0-.5.5.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5.5.5 0 0 0-.5-.5z" })
    );

registerBlockType('wp-block-pack/accordion-lite', {
    title: 'Accordion',
    description: 'Display accordion section with titles and texts. Support up to 7 panels.', 
    icon: iAccordionLite,
    category: 'common',
    attributes: {
        panels: {
            type: 'number',
            default: 2
        },
        titleAlign: {
            type: 'string',
            default: 'left'
        },
        contentAlign: {
            type: 'string',
            default: 'left'
        },
        title: {
            type: 'string',
            source: 'html',
            selector: '.title-1',
            default: 'What is this?'
        },
        content: {
            type: 'string',
            source: 'html',
            selector: '.content-1',
            default: "\u003cp\u003eThis is an Accordion Block. It could display up to 7 different panels. The area you read right now is content area of first panel. Replace this text with anything you want to write!\u003c/p\u003e"
        },
        startStat: {
            type: 'bool',
            default: true
        },
        title2: {
            type: 'string',
            source: 'html',
            selector: '.title-2',
            default: 'How can I open and close it?'
        },
        content2: {
            type: 'string',
            source: 'html',
            selector: '.content-2',
            default: "\u003cp\u003eRight! You have open this panel. That's how you do it! \u003c/p\u003e\u003cp\u003eBut on the front end, your viewer will open and close it by click/tap on it's title.\u003c/p\u003e"
        },
        startStat2: {
            type: 'bool',
            default: false
        },
        title3: {
            type: 'string',
            source: 'html',
            selector: '.title-3'
        },
        content3: {
            type: 'string',
            source: 'html',
            selector: '.content-3'
        },
        startStat3: {
            type: 'bool',
            default: false
        },
        title4: {
            type: 'string',
            source: 'html',
            selector: '.title-4'
        },
        content4: {
            type: 'string',
            source: 'html',
            selector: '.content-4'
        },
        startStat4: {
            type: 'bool',
            default: false
        },
        title5: {
            type: 'string',
            source: 'html',
            selector: '.title-5'
        },
        content5: {
            type: 'string',
            source: 'html',
            selector: '.content-5'
        },
        startStat5: {
            type: 'bool',
            default: false
        },
        title6: {
            type: 'string',
            source: 'html',
            selector: '.title-6'
        },
        content6: {
            type: 'string',
            source: 'html',
            selector: '.content-6'
        },
        startStat6: {
            type: 'bool',
            default: false
        },
        title7: {
            type: 'string',
            source: 'html',
            selector: '.title-7'
        },
        content7: {
            type: 'string',
            source: 'html',
            selector: '.content-7'
        },
        startStat7: {
            type: 'bool',
            default: false
        }
    },
    supports: {
        className: false,
        customClassName: false,
        inserter: wpblockpackInserter('accordion-lite'),
    },
    
    edit: function (props) {
        var panels = props.attributes.panels;
        var titleAlign = props.attributes.titleAlign;
        var contentAlign = props.attributes.contentAlign;
        var title = props.attributes.title;
        var content = props.attributes.content;
        var startStat = props.attributes.startStat;
        var title2 = props.attributes.title2;
        var content2 = props.attributes.content2;
        var startStat2 = props.attributes.startStat2;
        var title3 = props.attributes.title3;
        var content3 = props.attributes.content3;
        var startStat3 = props.attributes.startStat3;
        var title4 = props.attributes.title4;
        var content4 = props.attributes.content4;
        var startStat4 = props.attributes.startStat4;
        var title5 = props.attributes.title5;
        var content5 = props.attributes.content5;
        var startStat5 = props.attributes.startStat5;
        var title6 = props.attributes.title6;
        var content6 = props.attributes.content6;
        var startStat6 = props.attributes.startStat6;
        var title7 = props.attributes.title7;
        var content7 = props.attributes.content7;
        var startStat7 = props.attributes.startStat7;

        return (
            el( Fragment,
                null,
                el(
                    InspectorControls,
                    { key: 'controls' },
                    el(PanelBody, 
                        {
                            title: 'Number of Panels',
                            className: 'editor-panels-settings',
                            initialOpen: false
                        },
                        el(RangeControl, 
                            {
                                value: panels,
                                min: 1,
                                max: 7,
                                beforeIcon: 'menu',
                                initialPosition: 2,
                                allowReset: true,
                                help: (panels == 1) && 'Just one panel will be displayed' || panels +' panels will be displayed',
                                onChange: function( newValue ) {
                                    if (!newValue) {
                                        props.setAttributes( { panels: 2 } );
                                    } else {
                                        props.setAttributes( { panels: newValue } );
                                    }
                                }
                            }
                        )
                    ),
                    el(PanelBody, 
                        {
                            title: 'Open Panel',
                            className: 'editor-start-status',
                            initialOpen: true
                        },
                        el(BaseControl, 
                            null,
                            el('p',
                                null,
                                'Choose which panel to open for editing content and for opened at the front end.'
                            )
                        ),
                        el(CheckboxControl, 
                            {
                                label: title && (el( RichText.Content, { value: title } ) ) || 'Panel 1',
                                checked: startStat,
                                onChange: function( newValue ) {
                                    if (startStat != newValue) {
                                        props.setAttributes( { startStat: newValue } );
                                    }
                                }
                            }
                        ),
                        (panels > 1) && el(CheckboxControl, 
                            {
                                label: title2 && (el( RichText.Content, { value: title2 } ) ) || 'Panel 2',
                                checked: startStat2,
                                onChange: function( newValue ) {
                                    if (startStat2 != newValue) {
                                        props.setAttributes( { startStat2: newValue } );
                                    }
                                }
                            }
                        ),
                        (panels > 2) && el(CheckboxControl, 
                            {
                                label: title3 && (el( RichText.Content, { value: title3 } ) ) || 'Panel 3',
                                checked: startStat3,
                                onChange: function( newValue ) {
                                    if (startStat3 != newValue) {
                                        props.setAttributes( { startStat3: newValue } );
                                    }
                                }
                            }
                        ),
                        (panels > 3) && el(CheckboxControl, 
                            {
                                label: title4 && (el( RichText.Content, { value: title4 } ) ) || 'Panel 4',
                                checked: startStat4,
                                onChange: function( newValue ) {
                                    if (startStat4 != newValue) {
                                        props.setAttributes( { startStat4: newValue } );
                                    }
                                }
                            }
                        ),
                        (panels > 4) && el(CheckboxControl, 
                            {
                                label: title5 && (el( RichText.Content, { value: title5 } ) ) || 'Panel 5',
                                checked: startStat5,
                                onChange: function( newValue ) {
                                    if (startStat5 != newValue) {
                                        props.setAttributes( { startStat5: newValue } );
                                    }
                                }
                            }
                        ),
                        (panels > 5) && el(CheckboxControl, 
                            {
                                label: title6 && (el( RichText.Content, { value: title6 } ) ) || 'Panel 6',
                                checked: startStat6,
                                onChange: function( newValue ) {
                                    if (startStat6 != newValue) {
                                        props.setAttributes( { startStat6: newValue } );
                                    }
                                }
                            }
                        ),
                        (panels > 6) && el(CheckboxControl, 
                            {
                                label: title7 && (el( RichText.Content, { value: title7 } ) ) || 'Panel 7',
                                checked: startStat7,
                                onChange: function( newValue ) {
                                    if (startStat7 != newValue) {
                                        props.setAttributes( { startStat7: newValue } );
                                    }
                                }
                            }
                        )
                    ),
                    el(
                        PanelBody, 
                        {
                            title: 'Alignment',
                            className: 'editor-panel-align-settings',
                            initialOpen: false
                        },
                        el(BaseControl, 
                            {
                                label: 'Title Alignment',
                                className: 'inspector-align-setting'
                            },
                            el(
                                AlignmentToolbar,
                                {
                                    value: titleAlign,
                                    onChange: function( newValue ) {
                                        if (!newValue) {
                                            props.setAttributes( { titleAlign: 'left' } );
                                        } else {
                                            props.setAttributes( { titleAlign: newValue } );
                                        }
                                    }
                                }
                            )
                        ),
                        el(BaseControl, 
                            {
                                label: 'Content Alignment',
                                className: 'inspector-align-setting'
                            },
                            el(
                                AlignmentToolbar,
                                {
                                    value: contentAlign,
                                    onChange: function( newValue ) {
                                        if (!newValue) {
                                            props.setAttributes( { contentAlign: 'left' } );
                                        } else {
                                            props.setAttributes( { contentAlign: newValue } );
                                        }
                                    }
                                }
                            )
                        )
                    )
                ),
                el('section', 
                    {
                        className: "wp-block-pack-accordion-lite panels-"+ panels + " title-"+ titleAlign + " content-"+ contentAlign
                    },
                    el('div', 
                        {
                            className: "accordion-panel " + ((startStat == true) && 'open' || 'close')
                        },
                        el('div',
                            {
                                className: "accordion-title alig"
                            },
                            el(RichText,
                                {
                                    tagName: 'span',
                                    className: 'title-text',
                                    placeholder: 'Write title here ...',
                                    allowedFormats: [ "bold", "italic", "strikethrough" ],
                                    value: title,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { title: newValue } );
                                    }
                                }
                            )
                        ),
                        el('div',
                            {
                                className: "accordion-content"
                            },
                            el( RichText, 
                                {
                                    tagName: 'div',
                                    className: "accordion-content-wrap",
                                    placeholder: 'Write content here ...',
                                    multiline: 'p',
                                    value: content,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { content: newValue } );
                                    },
                                } 
                            )
                        )
                    ),
                    (panels > 1) && el('div', 
                        {
                            className: "accordion-panel " + ((startStat2 == true) && 'open' || 'close')
                        },
                        el('div',
                            {
                                className: "accordion-title"
                            },
                            el(RichText,
                                {
                                    tagName: 'span',
                                    className: 'title-text',
                                    placeholder: 'Write title here ...',
                                    allowedFormats: [ "bold", "italic", "strikethrough" ],
                                    value: title2,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { title2: newValue } );
                                    }
                                }
                            )
                        ),
                        el('div',
                            {
                                className: "accordion-content"
                            },
                            el( RichText, 
                                {
                                    tagName: 'div',
                                    className: "accordion-content-wrap",
                                    placeholder: 'Write content here ...',
                                    multiline: 'p',
                                    value: content2,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { content2: newValue } );
                                    },
                                } 
                            )
                        )
                    ),
                    (panels > 2) && el('div', 
                        {
                            className: "accordion-panel " + ((startStat3 == true) && 'open' || 'close')
                        },
                        el('div',
                            {
                                className: "accordion-title"
                            },
                            el(RichText,
                                {
                                    tagName: 'span',
                                    className: 'title-text',
                                    placeholder: 'Write title here ...',
                                    allowedFormats: [ "bold", "italic", "strikethrough" ],
                                    value: title3,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { title3: newValue } );
                                    }
                                }
                            )
                        ),
                        el('div',
                            {
                                className: "accordion-content"
                            },
                            el( RichText, 
                                {
                                    tagName: 'div',
                                    className: "accordion-content-wrap",
                                    placeholder: 'Write content here ...',
                                    multiline: 'p',
                                    value: content3,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { content3: newValue } );
                                    },
                                } 
                            )
                        )
                    ),
                    (panels > 3) && el('div', 
                        {
                            className: "accordion-panel " + ((startStat4 == true) && 'open' || 'close')
                        },
                        el('div',
                            {
                                className: "accordion-title"
                            },
                            el(RichText,
                                {
                                    tagName: 'span',
                                    className: 'title-text',
                                    placeholder: 'Write title here ...',
                                    allowedFormats: [ "bold", "italic", "strikethrough" ],
                                    value: title4,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { title4: newValue } );
                                    }
                                }
                            )
                        ),
                        el('div',
                            {
                                className: "accordion-content"
                            },
                            el( RichText, 
                                {
                                    tagName: 'div',
                                    className: "accordion-content-wrap",
                                    placeholder: 'Write content here ...',
                                    multiline: 'p',
                                    value: content4,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { content4: newValue } );
                                    },
                                } 
                            )
                        )
                    ),
                    (panels > 4) && el('div', 
                        {
                            className: "accordion-panel " + ((startStat5 == true) && 'open' || 'close')
                        },
                        el('div',
                            {
                                className: "accordion-title"
                            },
                            el(RichText,
                                {
                                    tagName: 'span',
                                    className: 'title-text',
                                    placeholder: 'Write title here ...',
                                    allowedFormats: [ "bold", "italic", "strikethrough" ],
                                    value: title5,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { title5: newValue } );
                                    }
                                }
                            )
                        ),
                        el('div',
                            {
                                className: "accordion-content"
                            },
                            el( RichText, 
                                {
                                    tagName: 'div',
                                    className: "accordion-content-wrap",
                                    placeholder: 'Write content here ...',
                                    multiline: 'p',
                                    value: content5,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { content5: newValue } );
                                    },
                                } 
                            )
                        )
                    ),
                    (panels > 5) && el('div', 
                        {
                            className: "accordion-panel " + ((startStat6 == true) && 'open' || 'close')
                        },
                        el('div',
                            {
                                className: "accordion-title"
                            },
                            el(RichText,
                                {
                                    tagName: 'span',
                                    className: 'title-text',
                                    placeholder: 'Write title here ...',
                                    allowedFormats: [ "bold", "italic", "strikethrough" ],
                                    value: title6,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { title6: newValue } );
                                    }
                                }
                            )
                        ),
                        el('div',
                            {
                                className: "accordion-content"
                            },
                            el( RichText, 
                                {
                                    tagName: 'div',
                                    className: "accordion-content-wrap",
                                    placeholder: 'Write content here ...',
                                    multiline: 'p',
                                    value: content6,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { content6: newValue } );
                                    },
                                } 
                            )
                        )
                    ),
                    (panels > 6) && el('div', 
                        {
                            className: "accordion-panel " + ((startStat7 == true) && 'open' || 'close')
                        },
                        el('div',
                            {
                                className: "accordion-title"
                            },
                            el(RichText,
                                {
                                    tagName: 'span',
                                    className: 'title-text',
                                    placeholder: 'Write title here ...',
                                    allowedFormats: [ "bold", "italic", "strikethrough" ],
                                    value: title7,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { title7: newValue } );
                                    }
                                }
                            )
                        ),
                        el('div',
                            {
                                className: "accordion-content"
                            },
                            el( RichText, 
                                {
                                    tagName: 'div',
                                    className: "accordion-content-wrap",
                                    placeholder: 'Write content here ...',
                                    multiline: 'p',
                                    value: content7,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { content7: newValue } );
                                    },
                                } 
                            )
                        )
                    )
                )
            )
        );
    },

    save: function(props) {
        var panels = props.attributes.panels;
        var titleAlign = props.attributes.titleAlign;
        var contentAlign = props.attributes.contentAlign;
        var title = props.attributes.title;
        var content = props.attributes.content;
        var startStat = props.attributes.startStat;
        var title2 = props.attributes.title2;
        var content2 = props.attributes.content2;
        var startStat2 = props.attributes.startStat2;
        var title3 = props.attributes.title3;
        var content3 = props.attributes.content3;
        var startStat3 = props.attributes.startStat3;
        var title4 = props.attributes.title4;
        var content4 = props.attributes.content4;
        var startStat4 = props.attributes.startStat4;
        var title5 = props.attributes.title5;
        var content5 = props.attributes.content5;
        var startStat5 = props.attributes.startStat5;
        var title6 = props.attributes.title6;
        var content6 = props.attributes.content6;
        var startStat6 = props.attributes.startStat6;
        var title7 = props.attributes.title7;
        var content7 = props.attributes.content7;
        var startStat7 = props.attributes.startStat7;

        var allTitle = [title, title2, title3, title4, title5, title6, title7];
        var allContent = [content, content2, content3, content4, content5, content6, content7];
        var allStart = [startStat, startStat2, startStat3, startStat4, startStat5, startStat6, startStat7];

        var allPanel = [];
        for (var i = 0; i < panels; i++) {
            var panelNum = i + 1;
            var eachPanel = el('div', 
                {
                    className: "accordion-panel " + ((allStart[i] == true) && 'open' || 'close')
                },
                el('div',
                    {
                        className: "accordion-title"
                    },
                    el( RichText.Content, 
                        {
                            tagName: 'span',
                            className: 'title-text title-'+ panelNum,
                            value: allTitle[i],
                        } 
                    )
                ),
                el('div',
                    {
                        className: "accordion-content"
                    },
                    el( RichText.Content, 
                        {
                            tagName: 'div',
                            className: 'accordion-content-wrap content-'+ panelNum,
                            value: allContent[i],
                        } 
                    )
                )
            );
            allPanel.push(eachPanel);
        }


        return el('section', 
            {
                className: "wp-block-pack-accordion-lite panels-" + panels + " title-"+ titleAlign + " content-"+ contentAlign
            },
            allPanel
        );
    },
} );
