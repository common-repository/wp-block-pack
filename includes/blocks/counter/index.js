// Block: Counter
// Since ver 1.0.6

// @koala-append "individual.js"

var iCounter = el( SVG, { width: 24, height: 24 },
    el( 'path', { d: "M22 22H2V2h20v20zM8.5 15a.5.5 0 0 0-.5.5.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5.5.5 0 0 0-.5-.5zm6.021-4.154c-.026.036-.055.072-.084.107s-.059.074-.093.113l-1.616 1.932h1a.794.794 0 0 0 .339-.07.528.528 0 0 0 .221-.171l1.1-1.561a3.74 3.74 0 0 0 .228-.362 2.625 2.625 0 0 0 .173-.385 2.581 2.581 0 0 0 .112-.422 2.631 2.631 0 0 0 .041-.473 1.907 1.907 0 0 0-.121-.691 1.559 1.559 0 0 0-.346-.541 1.573 1.573 0 0 0-.552-.353 2.031 2.031 0 0 0-.739-.126 1.947 1.947 0 0 0-.734.134 1.756 1.756 0 0 0-.565.366 1.617 1.617 0 0 0-.365.539 1.706 1.706 0 0 0-.128.654 1.577 1.577 0 0 0 .126.654 1.4 1.4 0 0 0 .328.459 1.356 1.356 0 0 0 .45.271 1.47 1.47 0 0 0 .5.089 1.727 1.727 0 0 0 .389-.042 1.354 1.354 0 0 0 .335-.122zm-4.06 0c-.028.037-.056.073-.084.107s-.059.074-.093.113l-1.616 1.932h1a.8.8 0 0 0 .339-.07.53.53 0 0 0 .22-.171l1.1-1.561a3.923 3.923 0 0 0 .228-.362 2.628 2.628 0 0 0 .173-.385 2.614 2.614 0 0 0 .113-.422 2.629 2.629 0 0 0 .04-.473 1.9 1.9 0 0 0-.121-.691 1.546 1.546 0 0 0-.347-.541 1.558 1.558 0 0 0-.551-.353 2.031 2.031 0 0 0-.739-.126 1.94 1.94 0 0 0-.734.134 1.755 1.755 0 0 0-.565.366 1.619 1.619 0 0 0-.365.539 1.706 1.706 0 0 0-.128.654 1.581 1.581 0 0 0 .126.654 1.4 1.4 0 0 0 .328.459 1.354 1.354 0 0 0 .45.271 1.469 1.469 0 0 0 .5.089 1.711 1.711 0 0 0 .388-.042 1.352 1.352 0 0 0 .337-.122zm3.724-.625c-.469 0-.707-.257-.707-.763a.919.919 0 0 1 .047-.3.708.708 0 0 1 .137-.239.619.619 0 0 1 .217-.159.706.706 0 0 1 .292-.059.893.893 0 0 1 .3.049.627.627 0 0 1 .232.143.657.657 0 0 1 .15.237.9.9 0 0 1 .055.327.8.8 0 0 1-.187.555.686.686 0 0 1-.537.209zm-4.06 0c-.469 0-.706-.257-.706-.763a.921.921 0 0 1 .047-.3.7.7 0 0 1 .137-.239.613.613 0 0 1 .217-.159.706.706 0 0 1 .293-.059.883.883 0 0 1 .3.049.623.623 0 0 1 .233.143.654.654 0 0 1 .15.237.918.918 0 0 1 .054.327.8.8 0 0 1-.187.555.682.682 0 0 1-.539.209z" })
    );

registerBlockType('wp-block-pack/counter', {
    title: 'Counter',
    description: 'Animating increased numbers. Block for display set of individual counter.', 
    icon: iCounter,
    category: 'common',
    keywords: [ "time", "day", "hour" ],
    attributes: {
        id: {
            type: 'string'
        },
        columns: {
            type: 'number',
            default: 3
        },
        layout: {
            type: 'string'
        },
        numberColor: {
            type: 'string'
        },
        titleColor: {
            type: 'string'
        },
        iconColor: {
            type: 'string'
        },
        backgroundColor: {
            type: 'string'
        },
        backgroundColorOpacity: {
            type: 'number',
            default: 100
        },
        backgroundImage: {
            type: 'string'
        },
        maxTime: {
            type: 'number',
            default: 30
        },
    },
    supports: {
        className: false,
        inserter: wpblockpackInserter('counter'),
        align: [ 'wide', 'full'],
    },
    
    edit: function (props) {
        var id = props.attributes.id;
        var columns = props.attributes.columns;
        var layout = props.attributes.layout;
        var numberColor = props.attributes.numberColor;
        var titleColor = props.attributes.titleColor;
        var iconColor = props.attributes.iconColor;
        var backgroundColor = props.attributes.backgroundColor;
        var backgroundColorOpacity = props.attributes.backgroundColorOpacity;
        var backgroundImage = props.attributes.backgroundImage;
        var maxTime = props.attributes.maxTime;
        var counterContents = [];

        for (var i = 0; i < columns; i++) {
            var counterContent = [ 'wp-block-pack/individual-counter', {} ];
            if (i < 6) {
                counterContents.push(counterContent);
            }
        }
        
        if (!id) {
            props.setAttributes( { id: props.clientId } );
        }
        if (id != props.clientId ) {
            props.setAttributes( { id: props.clientId } );
        }


        function countUpOn() {

            var thisBlock = document.getElementById( 'counter-'+id );
            var allToAnimates = thisBlock.querySelectorAll('.individual-counter-number-animate');

            allToAnimates.forEach(function( eachCounterNumber ){

                eachCounterNumber.innerHTML = 0;
                dataNumber = eachCounterNumber.getAttributeNode("data-number").value;
                // 3 seconds
                maxTimeN = maxTime * 100;
                
                timeRepeat = maxTimeN / dataNumber;

                var updateTime = Math.floor(maxTimeN / dataNumber); // in milliseconds
                var b = 0;
                if (updateTime < 20) {
                    // problem
                    var updateTime = 20;
                }
                var up = true;

                function count() {
                    dataNumber = eachCounterNumber.getAttributeNode("data-number").value;
                    if(dataNumber > b) {
                        if (updateTime <= 20) {
                            var fireTimes = maxTimeN / 20; // amount of function call
                            var increament = Math.ceil(dataNumber / fireTimes); // how many number to add for each call
                            b = b+increament;
                        } else {
                            b++;
                        }
                        eachCounterNumber.innerHTML = b;
                        setTimeout(count, updateTime);
                    } else {
                        eachCounterNumber.innerHTML = dataNumber;
                    }

                }
                count();

            });

        }

        var theStyle = function theStyle(){
            bs = '#counter-'+ id +' {'
            bs += '} '

            if (backgroundImage) {
                bs += '#counter-'+ id +' {'
                    bs += 'background-image: url("' + backgroundImage + '");'
                    bs += 'background-size: cover;'
                bs += '} '
            }

            if (backgroundColor || titleColor) {
                bs += '#counter-'+ id +' .counter-content {'
                    if (backgroundColor) {
                        if (backgroundColorOpacity > 0 && backgroundColorOpacity < 100) {
                            bs += 'background-color: ' + hexToRgba(backgroundColor, backgroundColorOpacity) + ';'
                        } else {
                            bs += 'background-color: ' + backgroundColor + ';'
                        }
                    }
                    if (titleColor) {
                        bs += 'color: ' + titleColor + ';'
                        if (!iconColor) {
                            bs += 'fill: ' + titleColor + ';'
                        }
                    }
                bs += '} '
            }

            if (titleColor) {
                bs += '#counter-'+ id +' .counter-content h3 {'
                        bs += 'color: ' + titleColor + ';'
                bs += '}'
            }

            if (numberColor) {
                bs += '#counter-'+ id +' .counter-content .individual-counter-number {'
                        bs += 'color: ' + numberColor + ';'
                bs += '}'
            }

            if (iconColor) {
                bs += '#counter-'+ id +' .counter-content .icon-display {'
                        bs += 'color: ' + iconColor + ';'
                        bs += 'fill: ' + iconColor + ';'
                bs += '}'
            }

            return bs
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
                            title: 'Amount',
                            className: 'editor-layout-settings',
                            initialOpen: false
                        },
                        el(RangeControl, 
                            {
                                label: 'How many Counter Blocks to show?',
                                value: columns,
                                min: 1,
                                max: 6,
                                initialPosition: 3,
                                allowReset: true,
                                help: (columns == 1) && 'Just one counter block will be displayed' || ( columns < 7 && columns > 1 ) &&  columns +' counter blocks will be displayed' || (columns > 6) &&  'Maximum counter block is 6. Sorry!' || (columns < 1) &&  'What? How is that even possible?',
                                onChange: function( newValue ) {
                                    if (!newValue) {
                                        props.setAttributes( { columns: 3 } );
                                    } else {
                                        props.setAttributes( { columns: newValue } );
                                    }
                                }
                            }
                        )                   
                    ),
                    el(
                        PanelBody, 
                        {
                            title: 'Timer',
                            className: 'editor-timer-settings',
                            initialOpen: true
                        },
                        el(BaseControl, 
                            {
                                label: 'Click to view timer count up.',
                            },
                            el(Button, 
                                {
                                    className: 'button',
                                    onClick: countUpOn
                                }, 
                                'Simulate Timer'
                            )
                        )         
                    ),
                    el(
                        PanelBody, 
                        {
                            title: 'Text & Icon',
                            className: 'editor-text-settings',
                            initialOpen: false
                        },
                        el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'Text Color',
                                        titleColor && el(ColorIndicator, 
                                            { colorValue: titleColor, }
                                        )
                                    )
                                )
                            },                             
                            el(ColorPalette, {
                                colors: colorPack,
                                value: titleColor,
                                className: 'editor-color-palette-control__color-palette',
                                onChange: function( newValue ) {
                                    props.setAttributes( { titleColor: newValue } );
                                }
                            })
                        ),
                        el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'Number Color',
                                        numberColor && el(ColorIndicator, 
                                            { colorValue: numberColor, }
                                        )
                                    )
                                )
                            },                             
                            el(ColorPalette, {
                                colors: colorPack,
                                value: numberColor,
                                className: 'editor-color-palette-control__color-palette',
                                onChange: function( newValue ) {
                                    props.setAttributes( { numberColor: newValue } );
                                }
                            })
                        ),
                        el(BaseControl, 
                            {
                                label: (el( Fragment,
                                        null,
                                        'Icon Color',
                                        iconColor && el(ColorIndicator, 
                                            { colorValue: iconColor, }
                                        )
                                    )
                                ),
                                help: __('Icon Color could be set one by one. And will more powerfull than this setting.')
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
                    el(
                        PanelBody, 
                        {
                            title: 'Background',
                            className: 'editor-background-settings',
                            initialOpen: false
                        },
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
                        backgroundColor && el(RangeControl, 
                            {
                                label: 'Background Color Transparency.',
                                value: backgroundColorOpacity,
                                min: 0,
                                max: 100,
                                initialPosition: 100,
                                allowReset: true,
                                help: (backgroundColorOpacity == 100) && 'Background color is now a solid color.' || ( backgroundColorOpacity < 100 && backgroundColorOpacity > 0 ) &&  'Background color now '+ backgroundColorOpacity +'% transparent.' || (backgroundColorOpacity > 100) &&  "Wait, what do you want? Super solid color? You can't do that!" || (backgroundColorOpacity < 1) &&  'What? How is that even possible?',
                                onChange: function( newValue ) {
                                    if (!newValue) {
                                        props.setAttributes( { backgroundColorOpacity: 100 } );
                                    } else {
                                        props.setAttributes( { backgroundColorOpacity: newValue } );
                                    }
                                }
                            }
                        ),
                        el(BaseControl, 
                            {
                                className: 'background-image-settings',
                                label: __('Background Image')
                            },                             
                            !backgroundImage && el(Placeholder, 
                                {
                                    label: __('No image selected')
                                }
                            ),
                            backgroundImage && el('img',
                                {
                                    src: backgroundImage,
                                }
                            ),
                            el( MediaUploadCheck, null, el( MediaUpload, {
                                onSelect: function ( imageObject ) {
                                    props.setAttributes( { backgroundImage: imageObject.url } );
                                },
                                allowedTypes: "image",
                                value: backgroundImage, 
                                render: function ( arg ) {
                                    var open = arg.open;
                                    return el( 'button',
                                        { 
                                            onClick: open,
                                            className: 'components-button button',
                                            type: 'button'
                                            },
                                            !backgroundImage && __('Select Image') || __('Change Image')
                                    );
                                }
                            }) ),
                            backgroundImage && el(Button,
                                {
                                    className: 'button',
                                    onClick: function() {
                                        props.setAttributes( { backgroundImage: undefined } );
                                    }
                                },
                                __('Remove')
                            )
                        )
                    )
                ),
                el('div', 
                    {
                        id: "counter-" + id,
                        className: "wp-block-pack-counter columns-" + columns
                    },
                    el('style',
                        null,
                        theStyle()
                    ),
                    el('div',
                        {
                            className: "counter-content",
                        },
                        el(InnerBlocks,
                            {
                                template: counterContents,
                                allowedBlocks: [ "wp-block-pack/individual-counter" ],
                                templateInsertUpdatesSelection: false,
                                templateLock: 'all'
                            }
                        )
                    )
                )
            )
        );
    },

    save: function(props) {
        var id = props.attributes.id;
        var columns = props.attributes.columns;
        var layout = props.attributes.layout;
        var numberColor = props.attributes.numberColor;
        var titleColor = props.attributes.titleColor;
        var iconColor = props.attributes.iconColor;
        var backgroundColor = props.attributes.backgroundColor;
        var backgroundColorOpacity = props.attributes.backgroundColorOpacity;
        var backgroundImage = props.attributes.backgroundImage;
        var maxTime = props.attributes.maxTime;

        var theStyle = function theStyle(){
            bs = '#counter-'+ id +' {'
            bs += '} '

            if (backgroundImage) {
                bs += '#counter-'+ id +' {'
                    bs += 'background-image: url("' + backgroundImage + '");'
                    bs += 'background-size: cover;'
                bs += '} '
            }

            if (backgroundColor || titleColor) {
                bs += '#counter-'+ id +' .counter-content {'
                    if (backgroundColor) {
                        if (backgroundColorOpacity > 0 && backgroundColorOpacity < 100) {
                            bs += 'background-color: ' + hexToRgba(backgroundColor, backgroundColorOpacity) + ';'
                        } else {
                            bs += 'background-color: ' + backgroundColor + ';'
                        }
                    }
                    if (titleColor) {
                        bs += 'color: ' + titleColor + ';'
                        if (!iconColor) {
                            bs += 'fill: ' + titleColor + ';'
                        }
                    }
                bs += '} '
            }

            if (titleColor) {
                bs += '#counter-'+ id +' .counter-content h3 {'
                        bs += 'color: ' + titleColor + ';'
                bs += '}'
            }

            if (numberColor) {
                bs += '#counter-'+ id +' .counter-content .individual-counter-number {'
                        bs += 'color: ' + numberColor + ';'
                bs += '}'
            }

            if (iconColor) {
                bs += '#counter-'+ id +' .counter-content .icon-display {'
                        bs += 'color: ' + iconColor + ';'
                        bs += 'fill: ' + iconColor + ';'
                bs += '}'
            }

            return bs;
        }

        return el('div', 
            {
                id: "counter-" + id,
                className: "wp-block-pack-counter columns-" + columns
            },
            el('style',
                null,
                theStyle()
            ),
            el('div',
                {
                    className: "counter-content"
                },
                el(InnerBlocks.Content)
            )
        );
    },
} );
