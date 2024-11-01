// Block: Tabs
// Since ver 1.0.2

// @koala-append "content.js"

var iTabs = el( SVG, { width: 24, height: 24 },
    el( 'path', { d: "M21.999 22h-20V2h20v20zm-13-13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4v-1a1 1 0 0 0-1-1zm3.5 0a.5.5 0 0 0-.5.5.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5.5.5 0 0 0-.5-.5zm1.5 5h-4v-1h4v1z" })
);

registerBlockType('wp-block-pack/tabs', {
    title: 'Tabs',
    description: 'Build HTML tabs with titles and any choosen blocks inside content area.', 
    icon: iTabs,
    category: 'common',
    keywords: [ "label", "multi" ],
    attributes: {
        panels: {
            type: 'number',
            default: 3
        },
        active: {
            type: 'number',
            default: 1
        },
        align: {
            type: 'string'
        },
        layout: {
            type: 'string'
        },
        title: {
            type: 'string',
            default: 'See it?'
        },
        title2: {
            type: 'string',
            default: 'Tap here!'
        },
        title3: {
            type: 'string'
        },
        title4: {
            type: 'string'
        },
        title5: {
            type: 'string'
        }
    },
    supports: {
        className: false,
        customClassName: false,
        inserter: wpblockpackInserter('tabs'),
    },
    
    edit: function (props) {
        var panels = props.attributes.panels;
        var active = props.attributes.active;
        var align = props.attributes.align;
        var layout = props.attributes.layout;
        var title = props.attributes.title;
        var title2 = props.attributes.title2;
        var title3 = props.attributes.title3;
        var title4 = props.attributes.title4;
        var title5 = props.attributes.title5;

        var tabTitles = [];
        var titleDatas = [ title, title2, title3, title4, title5 ]
        for (var i = 0; i < panels; i++) {
            var tabnum = i + 1;
            titleData = titleDatas[i]
            var tabTitle = {label: (titleData && titleData || 'Tab ' + tabnum), value: tabnum};
            if (i < 5) {
                tabTitles.push(tabTitle);
            }
        }
        // If panels value somehow empty, then define it
        if (isNaN(panels)) {
            props.setAttributes({panels: 3});
        }
        // If active value somehow empty, then define it
        if (isNaN(active)) {
            props.setAttributes({active: 1});
        }

        var tabContents = [];
        for (var i = 0; i < panels; i++) {
            var textLoad = '';
            var tabnum = i+1;
            if (i == 0) {
                textLoad = "This is a Tabs Block. It could display up to 5 different tabs. The area you read right now is a content area of first tab.";
            } else if (i == 1) {
                textLoad = "Right! You have open this tab. Thats how you do it! Also, you could insert another block in this content area.";
            }
            var tabContent = ['wp-block-pack/tab', { content: textLoad, num: 'tab-'+tabnum, data: tabnum }];
            if (i < 5) {
                tabContents.push(tabContent);
            }
        }


        var titleElements = [];
        for (var i = 0; i < panels; i++) {
            var tabnum = i + 1;
            titleData = titleDatas[i]
            var titleElement = el('li',
                {
                    className: (active == tabnum && "tab-title active" || "tab-title"),
                    'data-tab': tabnum,
                    onFocus: function (argument) {
                        dataTab = Number(argument.nativeEvent.path[5].dataset.tab);
                        props.setAttributes( { active: dataTab } );
                    }
                },
                el(RichText,
                    {
                        className: 'title-textarea',
                        placeholder: 'Title here ..',
                        allowedFormats: [],
                        dataTab: i,
                        multiline: false,
                        value: titleData,
                        onChange: function( newValue ) {
                            var tabID = Number(this.dataTab);
                            switch (tabID) {
                                case 0:
                                    props.setAttributes( { title: newValue } );
                                break;
                                case 1:
                                    props.setAttributes( { title2: newValue } );
                                break;
                                case 2:
                                    props.setAttributes( { title3: newValue } );
                                break;
                                case 3:
                                    props.setAttributes( { title4: newValue } );
                                break;
                                case 4:
                                    props.setAttributes( { title5: newValue } );
                                break;
                            }
                         }
                    }
                )
            );
            if (i < 5) {
                titleElements.push(titleElement);
            }
        }

        var tabHeadLayout = [ 
            { label: "Basic", value: undefined }, 
            { label: "Button", value: "buttoned" }, 
            { label: "Solid", value: "solid" }, 
            { label: "Light", value: "light" } 
            ];

        return (
            el( Fragment,
                null,
                el(
                    InspectorControls,
                    { key: 'controls' },
                    el(PanelBody, 
                        {
                            title: 'Number of Tabs',
                            className: 'editor-panels-settings',
                            initialOpen: false
                        },
                        el(RangeControl, 
                            {
                                value: panels,
                                min: 1,
                                max: 5,
                                beforeIcon: 'menu',
                                initialPosition: 2,
                                allowReset: true,
                                help: (panels == 1) && 'Just one tab will be displayed' || (panels < 6) &&  panels +' tabs will be displayed' || (panels > 5) &&  'Maximum tab is 5. Sorry!',
                                onChange: function( newValue ) {
                                    if (!newValue) {
                                        props.setAttributes( { panels: 2 } );
                                    } else {
                                        props.setAttributes( { panels: newValue } );
                                    }
                                    if (newValue < active) {
                                        props.setAttributes( { active: newValue } );
                                    }
                                }
                            }
                        )
                    ),
                    el(PanelBody, 
                        {
                            title: 'Active Tab',
                            className: 'editor-start-status',
                            initialOpen: true
                        },
                        el(BaseControl, 
                            null,
                            el('p',
                                null,
                                'Choose which tab to be active for editing content and for opened by default.'
                            )
                        ),
                        el(RadioControl, 
                            {
                                selected: active,
                                options: tabTitles,
                                onChange: function( newValue ) {
                                    if (active != newValue) {
                                        var convNewValue = Number( newValue );
                                        props.setAttributes( { active: convNewValue } );
                                    }
                                }
                            }
                        )
                    ),
                    el(
                        PanelBody, 
                        {
                            title: 'Header',
                            className: 'editor-panel-align-settings',
                            initialOpen: false
                        },
                        el(BaseControl, 
                            {
                                label: 'Alignment',
                                className: 'inspector-align-setting'
                            },
                            el(
                                AlignmentToolbar,
                                {
                                    value: align,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { align: newValue } );
                                    }
                                }
                            )
                        ),
                        el(RadioControl, 
                            {
                                selected: layout && layout || undefined,
                                label: 'Tab\'s Head layout',
                                options: tabHeadLayout,
                                onChange: function( newValue ) {
                                    if (layout != newValue) {
                                        props.setAttributes( { layout: newValue } );
                                    }
                                }
                            }
                        )
                    )
                ),
                el('div', 
                    {
                        className: "wp-block-pack-tabs panels-"+panels
                    },
                    el('section', 
                        {
                            className: "tabs active-"+ active
                        },
                        el('ul',
                            {
                                className: "tabs-header" + (align && " align-"+ align || " align-") +  (layout && " is-"+ layout || "")
                            },
                            titleElements
                        ),
                        el('div',
                            {
                                className: "tabs-content"
                            },
                            el(InnerBlocks,
                                {
                                    template: tabContents,
                                    allowedBlocks: [ "wp-block-pack/tab" ],
                                    templateLock: 'all'
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
        var active = props.attributes.active;
        var align = props.attributes.align;
        var layout = props.attributes.layout;
        var title = props.attributes.title;
        var title2 = props.attributes.title2;
        var title3 = props.attributes.title3;
        var title4 = props.attributes.title4;
        var title5 = props.attributes.title5;

        var titleDatas = [ title, title2, title3, title4, title5 ]

        var titleElements = [];
        for (var i = 0; i < panels; i++) {
            var tabnum = i + 1;
            titleData = titleDatas[i]
            var titleElement = el( RichText.Content, 
                {
                    tagName: 'li',
                    className: (active == tabnum && "tab-title active" || "tab-title") + " tab-" + tabnum,
                    'data-tab': tabnum,
                    value: titleData
                } 
            );
            if (i < 5) {
                titleElements.push(titleElement);
            }
        }

        return el('div', 
            {
                className: "wp-block-pack-tabs panels-"+panels
            },
            el('section', 
                {
                    className: "tabs active-"+ active
                },
                el('ul',
                    {
                        className: "tabs-header" + (align && " align-"+ align || " align-") +  (layout && " is-"+ layout || "")
                    },
                    titleElements
                ),
                el('div',
                    {
                        className: "tabs-content"
                    },
                    el(InnerBlocks.Content)
                )
            )
        );


    },
} );
