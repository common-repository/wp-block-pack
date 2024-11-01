// Block: Just Icon
// Since ver 1.0.6

var iJustIcon = el( SVG, { width: 24, height: 24 },
    el( 'path', { d: "M22.001 22.002h-20v-20h20v20zM9.841 8.552a1.864 1.864 0 0 0-1.476.737 1.687 1.687 0 0 0-.33 1.423c.3 1.738 2.533 3.934 3.963 4.789 1.347-.691 3.613-2.93 3.959-4.733a1.667 1.667 0 0 0-.326-1.479 1.9 1.9 0 0 0-1.473-.7 3.838 3.838 0 0 0-2.157.913 3.809 3.809 0 0 0-2.16-.949z" })
    );

registerBlockType( 'wp-block-pack/icon', {
    title: __('Icon'),
    description: __('Block for display simple icon. Use your favorite Dashicon or Fontawesome.'), 
    icon: iJustIcon,
    category: 'common',
    keywords: [ __("symbol"), __("picture"), __("logo") ],
    attributes: {
        iconPack: {
            type: 'string',
            default: 'dashicon'
        },
        iconName: {
            type: 'string'
        },
        alignment: {
            type: 'string',
        },
        iconColor: {
            type: 'string',
        },
        iconSize: {
            type: 'string',
        },
    },
    supports: {
        className: false,
        inserter: wpblockpackInserter('icon'),
    },

    edit: withState( { openModal: false, insertIconArea: null, iconSizeState: '1x', iconPackState: null, inputKey: undefined } )(function(props) {
        var openModal = props.openModal;
        var insertIconArea = props.insertIconArea;
        var iconSizeState = props.iconSizeState;
        var setState = props.setState;

        var iconPack = props.attributes.iconPack;
        var iconName = props.attributes.iconName;
        var alignment = props.attributes.alignment;
        var iconColor = props.attributes.iconColor;        
        var iconSize = props.attributes.iconSize;
        

        // Icon Sizes Converter
        if (iconSize) {

            var IconSizeVal = iconSizes.map(function(e) { return e.value; }).indexOf(iconSize);

        } else {

            var IconSizeVal = iconSizes.map(function(e) { return e.value; }).indexOf(iconSizeState);

        }

        function theIconSizeName() {

            if (iconSize) {

                var newIconSizeVal = iconSizes.map(function(e) { return e.value; }).indexOf(iconSize);
                return iconSizes[newIconSizeVal].name ;

            } else {

                return 'Default. Means the size are relative to other settings.';

            }

        }

        if (iconName) {

            if (iconPack == 'dashicon') {

                var iconShowStyle = { fill: iconColor };
                var iconContent = el( Dashicon, { icon: iconName } );

            } else {

                if (iconPack == 'fa-solid') {
                    iconFAInitial = 's';
                } else if (iconPack == 'fa-regular') {
                    iconFAInitial = 'r';
                } else if (iconPack == 'fa-brand') {
                    iconFAInitial = 'b';
                }


                var iconSizeDisplay = ' fa-fw';
                if (iconSize) {
                    iconSizeDisplay = ' fa-' + iconSize;
                }
                var iconShowStyle = { color: iconColor };
                var iconContent = el( 'span', { 'class': 'fa'+ iconFAInitial +' fa-'+ iconName + iconSizeDisplay } );

            } 


        } else {

            iconContent = el( 'span',
                {
                    onClick: function () {
                        return setState({
                            openModal: true,
                            insertIconArea: "icon",
                            iconPackState: iconPack
                        });
                    },
                    style: { fill: 'lightgray', cursor: 'pointer' }
                },
                el( Dashicon, { icon: 'plus' } ) 
            )

        }

 
        var iconClassName = function iconClassName(){

            res = 'icon-display';
            if (iconSize) {
                res += ' size-' + iconSize ;
            }
            if (alignment) {
                res += ' align-' + alignment ;
            }

            return res;

        }
        

        function infoText() {

            var message;

            if (iconPack == 'fa-solid') {

                var message = 'You choose icon '+ iconName +' from Font Awesome - Solid icon pack. That was so solid!';

            } else if (iconPack == 'fa-regular') {

                var message = 'You choose icon '+ iconName +' from Font Awesome - Regular icon pack. Awesome!';

            } else if (iconPack == 'fa-brand') {

                var message = 'You choose icon '+ iconName +' from Font Awesome - Brand icon pack. Which you need to use it carefully, because it may contain copyright from its brand.';

            } else {

                var message = 'You choose icon '+ iconName +' from Dashicon icon pack. Beautiful!';
            }

            return message;
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
                    ),
                    el( Tooltip,
                        {
                            'text': 'Show Hide Icon Shapes Box',
                        },
                        el( 'div',
                            { 'class': 'components-toolbar'},
                            el( Button,
                                {
                                    className: 'popup-button',
                                    onClick: function() {
                                        return setState({
                                            openModal: true,
                                            insertIconArea: "icon",
                                            iconPackState: iconPack
                                        });
                                    }
                                },
                                el(Dashicon, { icon: 'edit'}),
                                el('span', null, 'Change Icon')                             
                            )
                        )
                    )
                ),
                el(
                    InspectorControls,
                    { key: 'controls' },
                    el(
                        'div',
                        {
                            'class': 'components-panel__body editor-block-inspector__icon-info'
                        },
                        iconName && el(Notice,
                            {
                                isDismissible: false,
                                status: 'success'
                            },
                            infoText()
                        )
                        
                    ),
                    el(PanelBody, 
                        {
                            title: el( Fragment,
                                null,
                                'Color',
                                iconColor && el(ColorIndicator, 
                                    {
                                    colorValue: iconColor,
                                })
                            ),
                            className: 'editor-panel-color-settings',
                            initialOpen: true
                        },
                        el(BaseControl, 
                            {
                                label: el( Fragment,
                                    null,
                                    'Your Icon Color',
                                    iconColor && el(ColorIndicator, 
                                        {
                                        colorValue: iconColor,
                                    })
                                )
                            },                             
                            el(ColorPalette, {
                                colors: colorPack,
                                value: iconColor,
                                className: 'editor-color-palette-control__color-palette',
                                onChange: function( newValue ) {
                                    props.setAttributes( { iconColor: newValue } );
                                }
                            })
                        )
                    ),
                    el(PanelBody, 
                        {
                            title: 'Size',
                            className: 'block-icon-sizes',
                            initialOpen: true,
                        },
                        el('p', {}, 'Resize your icon to your needs.'),
                        el('div',
                            {
                                'class': 'components-base-control components-range-control'
                            },
                            el('div',
                                {
                                    'class': 'components-base-control__field'
                                },
                                el('input',
                                    {
                                        'class': 'components-range-control__slider',
                                        'type': 'range',
                                        'min': 0,
                                        'max': 12,
                                        'value': IconSizeVal,
                                        initialPosition: 3,
                                        onChange: function( newValue ) {
                                            n = newValue.target.value;
                                            var newIconSize = iconSizes[n].value;
                                            props.setAttributes( { iconSize: newIconSize } );
                                        }
                                    }
                                ),
                                el(Button,
                                    {
                                        onClick: function() {
                                            props.setAttributes( { iconSize: undefined } );
                                        }
                                    },
                                    __('Reset')
                                )
                            ),
                            el('p', {'class': 'align-center'}, theIconSizeName() )
                        )
                    )

                ),
                el( 
                    'div', 
                    { 
                        className: 'wp-block-pack-icon icon-' + iconPack,
                    },
                    el( 'div', 
                        { 
                            className: iconClassName(), 
                            style: iconShowStyle 
                        }, 
                        iconContent 
                    )
                ),
                openModal && el(Modal,
                    {
                        title: "Pick Your Icon",
                        onRequestClose: function(){
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
        );
    }),

    save: function(props) {
        var iconPack = props.attributes.iconPack;
        var iconName = props.attributes.iconName;
        var alignment = props.attributes.alignment;
        var iconSize = props.attributes.iconSize;
        var iconColor = props.attributes.iconColor;

        var iconColor, iconLoad, iconShowStyle;

        var iconContent;

        if (iconPack == 'dashicon') {

            var iconShowStyle = { fill: iconColor };
            var iconContent = el( Dashicon, { icon: iconName } );

        } else {

            if (iconPack == 'fa-solid') {
                iconFAInitial = 's';
            } else if (iconPack == 'fa-regular') {
                iconFAInitial = 'r';
            } else if (iconPack == 'fa-brand') {
                iconFAInitial = 'b';
            }
            var iconSizeDisplay = '';
            if (iconSize) {
                iconSizeDisplay = ' fa-' + iconSize;
            }

            var iconShowStyle = { color: iconColor };
            var iconContent = el( 'span', { 'class': 'fa'+ iconFAInitial +' fa-'+ iconName + iconSizeDisplay } );

        } 


        var iconClassName = function iconClassName(){

            res = 'icon-display';
            if (iconSize) {
                res += ' size-' + iconSize ;
            }
            if (alignment) {
                res += ' align-' + alignment ;
            }

            return res;

        }


        return el( 
            'div', 
            { 
                className: 'wp-block-pack-icon icon-' + iconPack,
            },
            el( 'div', 
                { 
                    className: iconClassName(), 
                    style: iconShowStyle 
                }, 
                iconContent 
            )
        );

    },
} );
