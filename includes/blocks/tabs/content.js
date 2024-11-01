// Block: Tabs Content
// Since ver 1.0.2

registerBlockType('wp-block-pack/tab', {
    title: 'Tabs Content',
    description: 'Block for displaying single tab content.', 
    icon: 'media-default',
    category: 'common',
    parent: ['wp-block-pack/tabs'],
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: '.wp-block-pack-tab'
        },
        num: {
            type: 'string'
        },
        data: {
            type: 'number',
            default: 8
        }
    },
    supports: {
        inserter: false,
        className: false,
        customClassName: false
    },

    getEditWrapperProps: function getEditWrapperProps(attributes) {
        var dataTab = attributes.data;
        var props = { 'data-resized': true };

        props['data-tab'] = dataTab;

        return props;
    },

    edit: function (props) {
        var content = props.attributes.content;
        var num = props.attributes.num;
        
        var TEMPLATE = [ [ 'core/paragraph', {content: content} ] ];
        return el('div',
            {
                className: 'wp-block-pack-tab '+ num
            },
            el(InnerBlocks,
                {
                    template: TEMPLATE,
                    templateLock: false
                }
            )
        );
    },

    save: function(props) {
        var num = props.attributes.num;
        return el('div',
            {
                className: 'wp-block-pack-tab '+ num
            },
            el(InnerBlocks.Content)
        );
    },
} );
