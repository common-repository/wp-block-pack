// Block: Button Pro
// Since ver 1.0.4

var iProButton = el( SVG, { width: 24, height: 24 },
    el( 'path', { 
        d: "M22 22H2V2h20v20zM12 7a5.006 5.006 0 0 0-5 5 5.006 5.006 0 0 0 5 5 5.006 5.006 0 0 0 5-5 5.005 5.005 0 0 0-5-5zm0 8a3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-3 3z"
    })
);

registerBlockType( 'wp-block-pack/button-pro', {
    title: __('Button Pro'),
    description: __('Button with advanced control over icon, size, color and, hover transition.'), 
    icon: iProButton,
    category: 'layout',
    parent: ['wp-block-pack/inline-buttons', 'core/buttons'],
    keywords: [ __("link"), __("nofollow"), __("follow") ],
    styles: [
        {
            name: 'default',
            label: __('Rounded'),
            isDefault: true
        },
        {
            name: 'outline',
            label: __('Outline')
        },
        {
            name: 'squared',
            label: __('Squared')
        },
    ],
    attributes: {
        id: {
            type: 'string'
        },
        url: {
            type: 'string',
            source: 'attribute',
            selector: 'a',
            attribute: 'href'
        },
        text: {
            type: 'string',
            source: 'html',
            selector: 'span.button-pro-text'
        },
        title: {
            type: 'string',
            source: 'attribute',
            selector: 'a',
            attribute: 'title',
        },
        size: {
            type: 'number'
        },
        textTransform: {
            type: 'string'
        },
        alignment: {
            type: 'string'
        },
        float: {
            type: 'string',
            default: 'none',
        },
        target: {
            type: 'string',
            source: 'attribute',
            selector: 'a',
            attribute: 'target',
            default: '_self'
        },
        relation: {
            type: 'string',
            source: 'attribute',
            selector: 'a',
            attribute: 'rel'
        },
        isIconBefore: {
            type: 'bool',
            default: false
        },
        iconBeforePack: {
            type: 'string',
            default: 'dashicon'
        },
        iconBeforeSize: {
            type: 'string',
            default: '1x'
        },
        iconBefore: {
            type: 'string'
        },
        isIconAfter: {
            type: 'bool',
            default: false
        },
        iconAfterPack: {
            type: 'string',
            default: 'dashicon'
        },
        iconAfterSize: {
            type: 'string',
            default: '1x'
        },
        iconAfter: {
            type: 'string'
        },
        backgroundColor: {
            type: 'string',
        },
        textColor: {
            type: 'string',
        },
        borderRadius: {
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
        hoverBackgroundColor: {
            type: 'string',
        },
        hoverTextColor: {
            type: 'string',
        },
        hoverBorderColor: {
            type: 'string',
        },
        transitionDurationRaw: {
            type: 'number',
            default: 0
        },
        transitionTimeFunction: {
            type: 'string',
            default: 'ease'
        },
        transitionDelayRaw: {
            type: 'number',
            default: 0
        },
        animate: {
            type: 'string',
            default: 'none'
        },
    },
    supports: {
        className: false,
        inserter: wpblockpackInserter('button-pro'),
    },
    transforms: {
        to: [
            {
                type: 'block',
                blocks: [ 'core/button' ],
                transform: function( attributes ) {
                    var newAlign;
                    if (attributes.float == 'left' || attributes.float == 'right') {
                        var newAlign = attributes.float;
                    } else if (attributes.alignment == 'center') {
                        var newAlign = attributes.alignment;
                    }
                    return createBlock( 'core/button', {
                        url: attributes.url,
                        text: attributes.text,
                        title: attributes.title,
                        customBackgroundColor: attributes.backgroundColor,
                        customTextColor: attributes.textColor,
                        align: newAlign,
                    } );
                }
            }
        ],
        from: [
            {
                type: 'block',
                blocks: [ 'core/button' ],
                transform: function ( attributes ) {
                    var newFloat, newAlign;
                    if (attributes.align == 'center') {
                        var newAlign = attributes.align;
                    } else {
                        var newFloat = attributes.align;
                    }
                    return createBlock( 'wp-block-pack/button-pro', {
                        url: attributes.url,
                        text: attributes.text,
                        title: attributes.title,
                        backgroundColor: attributes.customBackgroundColor,
                        textColor: attributes.customTextColor,
                        alignment: newAlign,
                        float: newFloat,
                    } );
                },
            },
        ]
    },

    getEditWrapperProps: function getEditWrapperProps(attributes) {
        var float = attributes.float;

        var props = { 'data-resized': true };

        if ('left' === float || 'right' === float) {
            props['data-align'] = float;
        }

        return props;
    },

    edit: withState( { openModal: false, insertIconArea: undefined, iconPackState: "dashicon", inputKey: undefined } )(function(props) {
        var theStyle = '';
        if (props.className != undefined) {
            var theStyle = ' '+ props.className;
        }

        var openModal = props.openModal;
        var insertIconArea = props.insertIconArea;
        var setState = props.setState;

        var id = props.attributes.id;

        var url = props.attributes.url;
        var text = props.attributes.text;
        var title = props.attributes.title;
        var size = props.attributes.size;
        var textTransform = props.attributes.textTransform;

        var alignment = props.attributes.alignment;
        var float = props.attributes.float;

        var target = props.attributes.target;
        var relation = props.attributes.relation;

        var isIconBefore = props.attributes.isIconBefore;
        var iconBeforePack = props.attributes.iconBeforePack;
        var iconBeforeSize = props.attributes.iconBeforeSize;
        var iconBefore = props.attributes.iconBefore;
        var iconBeforeModal = props.attributes.iconBeforeModal;

        var isIconAfter = props.attributes.isIconAfter;
        var iconAfterPack = props.attributes.iconAfterPack;
        var iconAfterSize = props.attributes.iconAfterSize;
        var iconAfter = props.attributes.iconAfter;
        var iconAfterModal = props.attributes.iconAfterModal;

        var backgroundColor = props.attributes.backgroundColor;
        var textColor = props.attributes.textColor;

        var borderRadius = props.attributes.borderRadius;
        var borderStyle = props.attributes.borderStyle;
        var borderWidth = props.attributes.borderWidth;
        var borderColor = props.attributes.borderColor;

        var paddingTop = props.attributes.paddingTop;
        var paddingRight = props.attributes.paddingRight;
        var paddingBottom = props.attributes.paddingBottom;
        var paddingLeft = props.attributes.paddingLeft;

        var hoverBackgroundColor = props.attributes.hoverBackgroundColor;
        var hoverTextColor = props.attributes.hoverTextColor;
        var hoverBorderColor = props.attributes.hoverBorderColor;

        var transitionDurationRaw = props.attributes.transitionDurationRaw;
        var transitionTimeFunction = props.attributes.transitionTimeFunction;
        var transitionDelayRaw = props.attributes.transitionDelayRaw;


        if (!id) {
            props.setAttributes( { id: props.clientId } );
        }
        if (id != props.clientId ) {
            props.setAttributes( { id: props.clientId } );
        }
        //Remove float
        if (props.attributes.float != 'none') {
            props.setAttributes( { float: 'none' } );
        }


        // Icon Sizes Converter
        var beforeIconVal = iconSizes.map(function(e) { return e.value; }).indexOf(iconBeforeSize);
        var afterIconVal = iconSizes.map(function(e) { return e.value; }).indexOf(iconAfterSize);

        function theIconSizeName(val) {

            var iconSizeVal = iconSizes.map(function(e) { return e.value; }).indexOf(val);
            return iconSizes[iconSizeVal].name;

        }


        function transitionValueRipe(arg) {
            val = arg / 10;
            if (val == 1) {
                val += ' second';
            } else {
                val += ' seconds';
            }
            return val;
        }

        function iconRenamePack(packValue) {

            if (packValue == 'dashicon') {

                packRename = 'Dashicon';

            } else if (packValue == 'fa-solid') {

                packRename = 'Font Awesome - Solid';
                
            } else if (packValue == 'fa-regular') {

                packRename = 'Font Awesome - Regular';

            } else if (packValue == 'fa-brand') {

                packRename = 'Font Awesome - Brand';

            } else {

                packRename = packValue;
            }

            return packRename;

        }


        var buttonStyle = function buttonStyle(){
            bs = '#button-pro-'+ id +'.wp-block-pack-button-pro{'
            if (size) {
                bs += 'font-size: '+ size +'px;'
            }
            if (backgroundColor) {
                bs += 'background-color: '+ backgroundColor +';'
            }
            if (textColor) {
                bs += 'color: '+ textColor +';'
                if(isIconBefore || isIconAfter){
                    bs += 'fill: '+ textColor +';'
                }
            }
            if (textTransform) {
                bs += 'text-transform: '+ textTransform +';'
            }
            if (borderColor) {
                bs += 'border-color:' + borderColor + ';'
            }
            
            if (paddingTop) {
                bs += 'padding-top: '+ paddingTop +'px;'
            }
            if (paddingRight) {
                bs += 'padding-right: '+ paddingRight +'px;'
            }
            if (paddingBottom) {
                bs += 'padding-bottom: '+ paddingBottom +'px;'
            }
            if (paddingLeft) {
                bs += 'padding-left: '+ paddingLeft +'px;'
            }

            if (borderRadius) {
                bs += 'border-radius:'+ borderRadius +'px;'
            }
            if (borderStyle) {
                bs += 'border-style: '+ borderStyle + ';'
            }
            if (borderWidth) {
                bs += 'border-width: '+ borderWidth +'px;'
            }
            if (transitionDurationRaw > 0) {
                transitionDurationRipe = transitionDurationRaw / 10;
                bs += 'transition: all '+ transitionDurationRipe +'s '+ transitionTimeFunction
                if (transitionDurationRaw > 0) {
                    transitionDelayRipe = transitionDelayRaw / 10;
                    bs += ' '+ transitionDelayRipe +'s'
                }
                bs += ';'
            }
            bs += '} '
            bs += '#button-pro-'+ id +'.wp-block-pack-button-pro:hover{'
            if (hoverBackgroundColor) {
                bs += 'background-color: '+ hoverBackgroundColor +';'
            }
            if (hoverTextColor) {
                bs += 'color: '+ hoverTextColor +';'
                if(isIconBefore || isIconAfter){
                    bs += 'fill: '+ hoverTextColor +';'
                }
            }
            if (hoverBorderColor) {
                bs += 'border-color: '+ hoverBorderColor +';'
            }
            bs += '}'

            return bs
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
                    el(PanelBody, 
                        {
                            title: 'Attributes',
                            className: 'editor-button-link-settings',
                            initialOpen: true
                        },
                        el(BaseControl, 
                            {
                                label: 'Link URL'
                            },                             
                            el( URLInput, 
                                {
                                    value: url,
                                    onChange: function( newValue ) {
                                        props.setAttributes( { url: newValue } );
                                    }
                                } 
                            )
                        ),
                        el(BaseControl, 
                            null,
                            el( ToggleControl, 
                                {
                                    label: 'Open in new tab',
                                    checked: (target == '_blank') && true || false,
                                    onChange: function() {
                                        if (target == '_blank') {
                                            props.setAttributes( { target: '_self' } );
                                        } else {
                                            props.setAttributes( { target: '_blank' } );
                                        }
                                    }
                                } 
                            )
                        ),
                        url && el(BaseControl, 
                            null,
                            el(SelectControl,
                                { 
                                    label: 'Link Relation',
                                    value: relation,
                                    options: [ {label: ' ', value: 'empty'}, {label: 'Alternate', value: 'alternate'}, {label: 'Author', value: 'author'}, {label:'Bookmark', value: 'bookmark'}, {label:'External', value: 'external'}, {label:'Help', value: 'help'}, {label:'License', value: 'license'}, {label:'Next', value: 'next'}, {label:'No Follow', value: 'nofollow'}, {label:'No Referrer', value: 'noreferrer'}, {label:'No Opener', value: 'noopener'}, {label:'Prev', value: 'prev'}, {label:'Search', value: 'search'}, {label:'Tag', value: 'tag'} ],
                                    onChange: function( newValue ) {
                                        props.setAttributes( { relation: newValue } );
                                    }
                                }
                            )
                        )
                    ),
                    el(PanelBody, 
                        {
                            title: 'Text',
                            className: 'editor-text-settings',
                            initialOpen: false
                        },
                        el(RangeControl, 
                            {
                                label: 'Font Size',
                                value: size,
                                min: 10,
                                max: 100,
                                beforeIcon: 'editor-textcolor',
                                allowReset: true,
                                onChange: function( newValue ) {
                                    props.setAttributes( { size: newValue } );
                                }
                            }
                        ),
                        el(RadioControl, 
                            {
                                label: 'Text Transform',
                                className: 'radio-text-transform',
                                selected: !textTransform && 'default' || textTransform,
                                options: [ { label: 'Default', value: 'default'}, { label: 'None', value: 'none'}, { label: 'Capitalize', value: 'capitalize'}, { label: 'Uppercase', value: 'uppercase'}, { label: 'Lowercase', value: 'lowercase'} ],
                                onChange: function( newValue ) {
                                    if (newValue == 'default') {
                                        props.setAttributes( { textTransform: undefined } );
                                    } else {
                                        props.setAttributes( { textTransform: newValue } );
                                    }
                                },
                                help: (textTransform == 'none') && 'No text transform will be used.' || (textTransform == 'capitalize') && 'First character of each word will be capitalized.' || (textTransform == 'uppercase') && 'All character will be capitalized.' || (textTransform == 'lowercase') && 'All character will be small letter.' || 'Text transform will follow default rule.'
                            }
                        )
                    ),
                    el(PanelBody, 
                        {
                            title: 'Icons',
                            className: 'editor-text-icon-settings',
                            initialOpen: false
                        },
                        el(TabPanel,
                            {
                                className: 'editor-panel-tabs-settings',
                                activeClass: 'active',
                                tabs: [
                                    {
                                        name: 'icon-before',
                                        title: 'Icon Before',
                                        className: 'icon-before'
                                    }, {
                                        name: 'icon-after',
                                        title: 'Icon After',
                                        className: 'icon-after'
                                    }
                                ]
                            },
                            function (tab) {

                                var settingsIconBefore = el('div', null,
                                    el( ToggleControl, 
                                        {
                                            label: 'Use icon before the text?',
                                            checked: (isIconBefore) && true || false,
                                            onChange: function() {
                                                if (!isIconBefore) {
                                                    props.setAttributes( { isIconBefore: true } );
                                                } else {
                                                    props.setAttributes( { isIconBefore: false } );
                                                }
                                            }
                                        } 
                                    ),
                                    (isIconBefore && !iconBefore) && el(Notice,
                                        {
                                            status: '',
                                            isDismissible: false
                                        },
                                        'Great, now you can pick your icon by click on plus icon before your text.'
                                    ),
                                    (isIconBefore && iconBefore) && el(Notice,
                                        {
                                            status: 'success',
                                            isDismissible: false
                                        },
                                        'Awesome, you select icon "'+ iconBefore +'" from "'+ iconRenamePack(iconBeforePack) +'" icon pack. Great!'
                                    ),
                                    isIconBefore && el(BaseControl,
                                        {
                                            label: 'Icon Size',
                                            help: 'Icon size also relative to font size.'
                                        },
                                        el('input',
                                            {
                                                'class': 'components-range-control__slider',
                                                'type': 'range',
                                                'min': 0,
                                                'max': 12,
                                                'value': beforeIconVal,
                                                initialPosition: 3,
                                                onChange: function( newValue ) {
                                                    n = newValue.target.value;
                                                    var newIconSize = iconSizes[n].value;
                                                    props.setAttributes( { iconBeforeSize: newIconSize } );
                                                }
                                            }
                                        ),
                                        el('p', {'class': 'align-center'}, theIconSizeName(iconBeforeSize) ) 
                                    )                                  
                                );

                                var settingsIconAfter = el('div', null,
                                    el( ToggleControl, 
                                        {
                                            label: 'Use icon after the text?',
                                            checked: (isIconAfter == true) && true || false,
                                            onChange: function() {
                                                if (isIconAfter == false) {
                                                    props.setAttributes( { isIconAfter: true } );
                                                } else {
                                                    props.setAttributes( { isIconAfter: false } );
                                                }
                                            }
                                        } 
                                    ),
                                    (isIconAfter == true && !iconAfter) && el(Notice,
                                        {
                                            status: '',
                                            isDismissible: false
                                        },
                                        'Great, now you can pick your icon by click on plus icon after your text.'
                                    ),
                                    (isIconAfter == true && iconAfter) && el(Notice,
                                        {
                                            status: 'success',
                                            isDismissible: false
                                        },
                                        'Awesome, you select icon "'+ iconAfter +'" from "'+ iconRenamePack(iconAfterPack) +'" icon pack. Great!'
                                    ),
                                    isIconAfter && el(BaseControl,
                                        {
                                            label: 'Icon Size',
                                            help: 'Icon size also relative to font size.'
                                        },
                                        el('input',
                                            {
                                                'class': 'components-range-control__slider',
                                                'type': 'range',
                                                'min': 0,
                                                'max': 12,
                                                'value': afterIconVal,
                                                initialPosition: 3,
                                                onChange: function( newValue ) {
                                                    n = newValue.target.value;
                                                    var newIconSize = iconSizes[n].value;
                                                    props.setAttributes( { iconAfterSize: newIconSize } );
                                                }
                                            }
                                        ),
                                        el('p', {'class': 'align-center'}, theIconSizeName(iconAfterSize) ) 
                                    )
                                );

                                if (tab.className == 'icon-before') {
                                    return settingsIconBefore;
                                } else {
                                    return settingsIconAfter;
                                }
                            }
                        
                        )
                    ),
                    el(PanelBody, 
                        {
                            title: 'Colors',
                            className: 'editor-color-settings',
                            initialOpen: false
                        },
                        el(TabPanel,
                            {
                                className: 'editor-panel-tabs-settings',
                                activeClass: 'active',
                                tabs: [
                                    {
                                        name: 'normal',
                                        title: 'Normal',
                                        className: 'normal'
                                    }, {
                                        name: 'hover',
                                        title: 'Hover',
                                        className: 'hover'
                                    }
                                ]
                            },
                            function (tab) {
                                var normal = el('div', 
                                    null,
                                    el(BaseControl, 
                                        {
                                            label: (el( Fragment,
                                                    null,
                                                    'Background Color',
                                                    backgroundColor && el(ColorIndicator, 
                                                        { colorValue: backgroundColor, }
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
                                                    'Border Color',
                                                    borderColor && el(ColorIndicator, 
                                                        { colorValue: borderColor, }
                                                    )
                                                )
                                            ),
                                            className: 'border-color-setting'
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
                                );
                                var hover = el('div', 
                                    null,
                                    el(BaseControl, 
                                        {
                                            label: (el( Fragment,
                                                    null,
                                                    'Background Color (on Hover)',
                                                    hoverBackgroundColor && el(ColorIndicator, 
                                                        { colorValue: hoverBackgroundColor, }
                                                    )
                                                )
                                            )
                                        },                             
                                        el(ColorPalette, {
                                            colors: colorPack,
                                            value: hoverBackgroundColor,
                                            className: 'editor-color-palette-control__color-palette',
                                            onChange: function( newValue ) {
                                                props.setAttributes( { hoverBackgroundColor: newValue } );
                                            }
                                        })
                                    ),
                                    el(BaseControl, 
                                        {
                                            label: (el( Fragment,
                                                    null,
                                                    'Text Color (on Hover)',
                                                    hoverTextColor && el(ColorIndicator, 
                                                        { colorValue: hoverTextColor, }
                                                    )
                                                )
                                            )
                                        },                             
                                        el(ColorPalette, {
                                            colors: colorPack,
                                            value: hoverTextColor,
                                            className: 'editor-color-palette-control__color-palette',
                                            onChange: function( newValue ) {
                                                props.setAttributes( { hoverTextColor: newValue } );
                                            }
                                        })
                                    ),
                                    el(BaseControl, 
                                        {
                                            label: (el( Fragment,
                                                    null,
                                                    'Border Color (on Hover)',
                                                    hoverBorderColor && el(ColorIndicator, 
                                                        { colorValue: hoverBorderColor, }
                                                    )
                                                )
                                            )
                                        },                             
                                        el(ColorPalette, {
                                            colors: colorPack,
                                            value: hoverBorderColor,
                                            className: 'editor-color-palette-control__color-palette',
                                            onChange: function( newValue ) {
                                                props.setAttributes( { hoverBorderColor: newValue } );
                                            }
                                        })
                                    )
                                );

                                if (tab.className == "hover") {
                                    return hover;
                                } else {
                                    return normal;
                                }
                            }
                        )
                    ),
                    el(PanelBody, 
                        {
                            title: 'Border',
                            className: 'editor-button-border-settings bord-' + borderStyle,
                            initialOpen: false
                        },
                        el(RangeControl, 
                            {
                                label: 'Border Radius',
                                value: borderRadius,
                                min: 0,
                                max: 120,
                                beforeIcon: 'sort',
                                allowReset: true,
                                onChange: function( newValue ) {
                                    props.setAttributes( { borderRadius: newValue } );
                                }
                            }
                        ),
                        el(SelectControl,
                            { 
                                label: 'Border Style',
                                value: borderStyle,
                                options: borderStyles,
                                onChange: function( newValue ) {
                                    props.setAttributes( { borderStyle: newValue } );
                                },
                                help: !borderStyle && 'The default border style will be used' || 'The border style has changed to ' + borderStyle + '.',
                            }
                        ),
                        (borderStyle != 'none' || 'hidden') && el(RangeControl, 
                            {
                                label: 'Border Width',
                                className: 'border-width-setting',
                                value: borderWidth,
                                min: 0,
                                max: 20,
                                beforeIcon: 'sort',
                                onChange: function( newValue ) {
                                    props.setAttributes( { borderWidth: newValue } );
                                }
                            }
                        )
                    ),
                    el(PanelBody, 
                        {
                            title: 'Padding',
                            className: 'editor-button-padding-settings',
                            initialOpen: false
                        },
                        el(RangeControl, 
                            {
                                label: 'Padding Top',
                                className: 'padding-top-option',
                                value: paddingTop,
                                min: 0,
                                max: 100,
                                beforeIcon: 'sort',
                                allowReset: true,
                                onChange: function( newValue ) {
                                    props.setAttributes( { paddingTop: newValue } );
                                }
                            }
                        ),
                        el(RangeControl, 
                            {
                                label: 'Padding Right',
                                className: 'padding-right-option',
                                value: paddingRight,
                                min: 0,
                                max: 100,
                                beforeIcon: 'sort',
                                allowReset: true,
                                onChange: function( newValue ) {
                                    props.setAttributes( { paddingRight: newValue } );
                                }
                            }
                        ),
                        el(RangeControl, 
                            {
                                label: 'Padding Bottom',
                                className: 'padding-bottom-option',
                                value: paddingBottom,
                                min: 0,
                                max: 100,
                                beforeIcon: 'sort',
                                allowReset: true,
                                onChange: function( newValue ) {
                                    props.setAttributes( { paddingBottom: newValue } );
                                }
                            }
                        ),
                        el(RangeControl, 
                            {
                                label: 'Padding Left',
                                className: 'padding-left-option',
                                value: paddingLeft,
                                min: 0,
                                max: 100,
                                beforeIcon: 'sort',
                                allowReset: true,
                                onChange: function( newValue ) {
                                    props.setAttributes( { paddingLeft: newValue } );
                                }
                            }
                        )
                    ),
                    el(PanelBody, 
                        {
                            title: 'Transition',
                            className: 'editor-panel-transition-settings',
                            initialOpen: false
                        },
                        el(BaseControl, 
                            {
                                label: 'Duration',
                                className: 'transition-duration-settings components-range-control'
                            },
                            el('div',
                                {
                                    className: 'components-base-control__field component-range-number',

                                },
                                el('input',
                                    {
                                        'class': 'components-range-control__slider',
                                        'type': 'range',
                                        'min': 0,
                                        'max': 100,
                                        'value': transitionDurationRaw,
                                        onChange: function( newValue ) {
                                            n = newValue.target.value;
                                            props.setAttributes( { transitionDurationRaw: n } );
                                        }
                                    }
                                )
                            ),


                            el('div',
                                {
                                    className: 'components-base-control component-values',

                                },
                                el('span',
                                    {
                                        className: 'buttons-incdec'
                                    },
                                    el('button',
                                        {
                                            className: 'button-increaser',
                                            onClick: function() {
                                                if (transitionDurationRaw < 100) {
                                                    var increase = transitionDurationRaw + 1;
                                                    props.setAttributes( { transitionDurationRaw: increase } );
                                                }
                                            }
                                        },
                                        el(Dashicon, {icon: 'arrow-up'})
                                    ),
                                    el('button',
                                        {
                                            className: 'button-decreaser',
                                            onClick: function() {
                                                if (transitionDurationRaw > 0) {
                                                    var decrease = transitionDurationRaw - 1;
                                                    props.setAttributes( { transitionDurationRaw: decrease } );
                                                }
                                            }
                                        },
                                        el(Dashicon, {icon: 'arrow-down'})
                                    )
                                ),
                                transitionValueRipe(transitionDurationRaw)
                            )
                        ),
                        transitionDurationRaw > 0 && el(SelectControl,
                            { 
                                label: 'Timing Function',
                                value: transitionTimeFunction,
                                options: [ {label: 'ease', value: 'ease'}, {label: 'linear', value: 'linear'}, {label: 'ease-in', value: 'ease-in'}, {label: 'ease-out', value: 'ease-out'}, {label: 'ease-in-out', value: 'ease-in-out'}, {label: 'step-start', value: 'step-start'}, {label: 'step-end', value: 'step-end'} ],
                                onChange: function( newValue ) {
                                    props.setAttributes( { transitionTimeFunction: newValue } );
                                }
                            }
                        ),
                        transitionDurationRaw > 0 && el(BaseControl, 
                            {
                                label: 'Delay',
                                className: 'transition-duration-settings'
                            },
                            el(TextControl,
                                {
                                    type: 'range',
                                    className: 'component-range-number',
                                    min: 0,
                                    value: transitionDelayRaw,
                                    onChange: function( newValue ) {
                                        var convNewTransDelaRaw = Number( newValue );
                                        props.setAttributes( { transitionDelayRaw: convNewTransDelaRaw } );
                                    }
                                }
                            ),
                            el('div',
                                {
                                    className: 'components-base-control component-values',

                                },
                                el('span',
                                    {
                                        className: 'buttons-incdec'
                                    },
                                    el('button',
                                        {
                                            className: 'button-increaser',
                                            onClick: function() {
                                                if (transitionDelayRaw < 100) {
                                                    var increase = transitionDelayRaw + 1;
                                                    props.setAttributes( { transitionDelayRaw: increase } );
                                                }
                                            }
                                        },
                                        el(Dashicon, {icon: 'arrow-up'})
                                    ),
                                    el('button',
                                        {
                                            className: 'button-decreaser',
                                            onClick: function() {
                                                if (transitionDelayRaw > 0) {
                                                    var decrease = transitionDelayRaw - 1;
                                                    props.setAttributes( { transitionDelayRaw: decrease } );
                                                }
                                            }
                                        },
                                        el(Dashicon, {icon: 'arrow-down'})
                                    )
                                ),
                                transitionValueRipe(transitionDelayRaw)
                            )
                        )
                    )
                    
                ),
                el('div',
                    {
                        style: {textAlign: alignment}
                    },
                    el('style', 
                        null, 
                        buttonStyle()
                    ), 
                    el( 'div', 
                        { 
                            id: 'button-pro-'+ id,
                            className: 'wp-block-pack-button-pro' + theStyle, 
                        },
                        (isIconBefore == true) && el( Button, 
                            { 
                                className: 'icon-before' + (iconBefore && ' filled' || ' empty') + ' size-' + iconBeforeSize,
                                onClick: function() {
                                    return setState({
                                        openModal: true,
                                        insertIconArea: "button-before",
                                        iconPackState: iconBeforePack,
                                    });
                                }
                            },
                            !iconBefore && el(Dashicon, {
                                icon: 'plus-light'
                            }),
                            (iconBefore && iconBeforePack == "dashicon") && el(Dashicon, {
                                icon: iconBefore
                            }),
                            (iconBefore && iconBeforePack == "fa-solid") && el( 'span', { 'class': 'fas fa-'+ iconBefore +' fa-' + iconBeforeSize } ),
                            (iconBefore && iconBeforePack == "fa-regular") && el( 'span', { 'class': 'far fa-'+ iconBefore +' fa-' + iconBeforeSize } ),
                            (iconBefore && iconBeforePack == "fa-brand") && el( 'span', { 'class': 'fab fa-'+ iconBefore +' fa-' + iconBeforeSize } )
                        ),
                        el( RichText, 
                            {
                                tagName: 'div',
                                className: 'button-pro-content',
                                allowedFormats: [ "bold", "italic", "strikethrough" ],
                                placeholder: 'Add text...',
                                keepPlaceholderOnFocus: true,
                                value: text,
                                onChange: function( newValue ) {
                                    props.setAttributes( { text: newValue } );
                                },
                            } 
                        ),
                        (isIconAfter == true) && el( Button, 
                            { 
                                className: 'icon-after' + (iconAfter && ' filled' || ' empty') + ' size-' + iconAfterSize,
                                onClick: function() {
                                    return setState({
                                        openModal: true,
                                        insertIconArea: "button-after",
                                        iconPackState: iconAfterPack,
                                    });
                                } 
                            },
                            !iconAfter && el(Dashicon, {
                                icon: 'plus-light'
                            }),
                            (iconAfter && iconAfterPack == "dashicon") && el(Dashicon, {
                                icon: iconAfter
                            }),
                            (iconAfter && iconAfterPack == "fa-solid") && el( 'span', { 'class': 'fas fa-'+ iconAfter +' fa-' + iconAfterSize } ),
                            (iconAfter && iconAfterPack == "fa-regular") && el( 'span', { 'class': 'far fa-'+ iconAfter +' fa-' + iconAfterSize } ),
                            (iconAfter && iconAfterPack == "fa-brand") && el( 'span', { 'class': 'fab fa-'+ iconAfter +' fa-' + iconAfterSize } )
                        ),
                        openModal && el(Modal, 
                            {
                                title: "Pick Your Icon",
                                onRequestClose: function onRequestClose() {
                                    return setState({
                                        openModal: false,
                                        insertIconArea: undefined,
                                        inputKey: undefined
                                    });
                                }
                            },
                            IconPickerModalContent(props)
                        )
                    )
                )
            )
        );
    }),

    save: function(props) {
        var theStyle = '';
        if (props.className != undefined) {
            var theStyle = ' '+ props.className;
        }

        var id = props.attributes.id;

        var url = props.attributes.url;
        var text = props.attributes.text;
        var title = props.attributes.title;
        var size = props.attributes.size;
        var textTransform = props.attributes.textTransform;

        var alignment = props.attributes.alignment;
        var float = props.attributes.float;

        var isIconBefore = props.attributes.isIconBefore;
        var iconBeforePack = props.attributes.iconBeforePack;
        var iconBeforeSize = props.attributes.iconBeforeSize;
        var iconBefore = props.attributes.iconBefore;
        var iconBeforeModal = props.attributes.iconBeforeModal;

        var isIconAfter = props.attributes.isIconAfter;
        var iconAfterPack = props.attributes.iconAfterPack;
        var iconAfterSize = props.attributes.iconAfterSize;
        var iconAfter = props.attributes.iconAfter;
        var iconAfterModal = props.attributes.iconAfterModal;

        var backgroundColor = props.attributes.backgroundColor;
        var textColor = props.attributes.textColor;

        var borderRadius = props.attributes.borderRadius;
        var borderStyle = props.attributes.borderStyle;
        var borderWidth = props.attributes.borderWidth;
        var borderColor = props.attributes.borderColor;

        var paddingTop = props.attributes.paddingTop;
        var paddingRight = props.attributes.paddingRight;
        var paddingBottom = props.attributes.paddingBottom;
        var paddingLeft = props.attributes.paddingLeft;

        var hoverBackgroundColor = props.attributes.hoverBackgroundColor;
        var hoverTextColor = props.attributes.hoverTextColor;
        var hoverBorderColor = props.attributes.hoverBorderColor;

        var transitionDurationRaw = props.attributes.transitionDurationRaw;
        var transitionTimeFunction = props.attributes.transitionTimeFunction;
        var transitionDelayRaw = props.attributes.transitionDelayRaw;

        var linkRel, target;
        if (props.attributes.relation != 'empty') {
            var linkRel = props.attributes.relation;
        }
        if (props.attributes.target != '_self') {
            var target = props.attributes.target;
        }
        function buttonStyle(){
            bs = '#button-pro-'+ id +'{'
            if (alignment) {
                bs += 'text-align: '+ alignment +';'
            }
            bs += '}'

            bs += '#button-pro-'+ id +' .wp-block-pack-button-pro{'
            if (float) {
                bs += 'float: '+ float +';'
            }
            if (size) {
                bs += 'font-size: '+ size +'px;'
            }
            if (backgroundColor) {
                bs += 'background-color: '+ backgroundColor +';'
            }
            if (textColor) {
                bs += 'color: '+ textColor +';'
                if(isIconBefore || isIconAfter){
                    bs += 'fill: '+ textColor +';'
                }
            }
            if (textTransform) {
                bs += 'text-transform: '+ textTransform +';'
            }
            if (borderColor) {
                bs += 'border-color:' + borderColor + ';'
            }
            
            if (paddingTop) {
                bs += 'padding-top: '+ paddingTop +'px;'
            }
            if (paddingRight) {
                bs += 'padding-right: '+ paddingRight +'px;'
            }
            if (paddingBottom) {
                bs += 'padding-bottom: '+ paddingBottom +'px;'
            }
            if (paddingLeft) {
                bs += 'padding-left: '+ paddingLeft +'px;'
            }

            if (borderRadius) {
                bs += 'border-radius:'+ borderRadius +'px;'
            }
            if (borderStyle) {
                bs += 'border-style: '+ borderStyle + ';'
            }
            if (borderWidth) {
                bs += 'border-width: '+ borderWidth +'px;'
            }
            if (transitionDurationRaw > 0) {
                transitionDurationRipe = transitionDurationRaw / 10;
                bs += 'transition: all '+ transitionDurationRipe +'s '+ transitionTimeFunction
                if (transitionDurationRaw > 0) {
                    transitionDelayRipe = transitionDelayRaw / 10;
                    bs += ' '+ transitionDelayRipe +'s'
                }
                bs += ';'
            }
            bs += '} '
            bs += '#button-pro-'+ id +' .wp-block-pack-button-pro:hover{'
            if (hoverBackgroundColor) {
                bs += 'background-color: '+ hoverBackgroundColor +';'
            }
            if (hoverTextColor) {
                bs += 'color: '+ hoverTextColor +';'
                if(isIconBefore || isIconAfter){
                    bs += 'fill: '+ hoverTextColor +';'
                }
            }
            if (hoverBorderColor) {
                bs += 'border-color: '+ hoverBorderColor +';'
            }
            bs += '}'

            return bs
        }

        return el( 'div', 
            { 
                id: 'button-pro-'+ id,
                className: ''
            },
            el('style', 
                null, 
                buttonStyle()
            ),
            el('a', 
                {
                    className: 'wp-block-pack-button-pro', 
                    'rel': linkRel,
                    'target': target,
                    'title': title,
                    href: url,
                }, 
                (isIconBefore == true) && el( 'span', 
                    { 
                        className: 'button-pro-icon-before size-' + iconBeforeSize,
                    },
                    (iconBefore && iconBeforePack == "dashicon") && el(Dashicon, { icon: iconBefore }),
                    (iconBefore && iconBeforePack != "dashicon") && el( 'span', { 'class': ( (iconBeforePack == "fa-solid" && 'fas') || (iconBeforePack == "fa-regular" && 'far') || (iconBeforePack == "fa-brand" && 'fab') ) + ' fa-'+ iconBefore +' fa-' + iconBeforeSize } )
                ),
                el( RichText.Content, 
                    {
                        tagName: 'span',
                        className: 'button-pro-text', 
                        value: text
                    } 
                ),
                (isIconAfter == true) && el( 'span', 
                    { 
                        className: 'button-pro-icon-after size-' + iconAfterSize,
                    },
                    (iconAfter && iconAfterPack == "dashicon") && el(Dashicon, { icon: iconAfter }),
                    (iconAfter && iconAfterPack != "dashicon") && el( 'span', { 'class': ( (iconAfterPack == "fa-solid" && 'fas') || (iconAfterPack == "fa-regular" && 'far') || (iconAfterPack == "fa-brand" && 'fab') ) + ' fa-'+ iconAfter +' fa-' + iconAfterSize } )
                )
            )
        );
    }
} );
