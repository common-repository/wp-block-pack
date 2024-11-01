// @koala-append "../../includes/blocks/accordion-lite/index.js"
// @koala-append "../../includes/blocks/advertisement/index.js"
// @koala-append "../../includes/blocks/blockquote/index.js"
// @koala-append "../../includes/blocks/buttons-pro/index.js"
// @koala-append "../../includes/blocks/counter/index.js"
// @koala-append "../../includes/blocks/drop-cap/index.js"
// @koala-append "../../includes/blocks/icon/index.js"
// @koala-append "../../includes/blocks/notice/index.js"
// @koala-append "../../includes/blocks/section/index.js"
// @koala-append "../../includes/blocks/tabs/index.js"
// @koala-append "../../includes/blocks/testimonial/index.js"


// @koala-append "editor.deactivated.js"


// WordPress Dependencies

var __ = wp.i18n.__;
var el = wp.element.createElement;
var Fragment = wp.element.Fragment;

var withState = wp.compose.withState;
var withInstanceId = wp.compose.withInstanceId;

var AlignmentToolbar = wp.blockEditor.AlignmentToolbar;
var BlockControls = wp.blockEditor.BlockControls;
var InnerBlocks = wp.blockEditor.InnerBlocks;
var InspectorControls = wp.blockEditor.InspectorControls;
var RichText = wp.blockEditor.RichText;
var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
var MediaUpload = wp.blockEditor.MediaUpload;

var BlockAlignmentToolbar = wp.editor.BlockAlignmentToolbar;
var PlainText = wp.editor.PlainText;
var URLInput = wp.editor.URLInput;

var BaseControl = wp.components.BaseControl;
var Button = wp.components.Button;
var ButtonGroup = wp.components.ButtonGroup;
var CheckboxControl = wp.components.CheckboxControl;
var ColorPalette = wp.components.ColorPalette;
var ColorIndicator = wp.components.ColorIndicator;
var Dashicon = wp.components.Dashicon;
var FontSizePicker = wp.components.FontSizePicker;
var Modal = wp.components.Modal;
var Notice = wp.components.Notice;
var Panel = wp.components.Panel;
var PanelBody = wp.components.PanelBody;
var PanelRow = wp.components.PanelRow;
var Popover = wp.components.Popover;
var Placeholder = wp.components.Placeholder;
var RadioControl = wp.components.RadioControl;
var RangeControl = wp.components.RangeControl;
var SelectControl = wp.components.SelectControl;
var ServerSideRender = wp.components.ServerSideRender;
var SVG = wp.components.SVG;
var TabPanel = wp.components.TabPanel;
var TextControl = wp.components.TextControl;
var ToggleControl = wp.components.ToggleControl;
var Tooltip = wp.components.Tooltip;

var createBlock = wp.blocks.createBlock;
var registerBlockType = wp.blocks.registerBlockType;

// Shared Variables
// used by more than one blocks

var wpBlockPack = el(SVG, { width: 24, height: 24 }, el('path', { d: "M13 19v-4h6v4h-6zm-8 0v-4h7v4H5zm5-5v-4h9v4h-9zm-5 0v-4h4v4H5zm13.999-5H15V5h4v4h-.001zM16 8h2V6h-2v2zM5 9V5.001h9V9H5z" }));
var quoteLeanSolid = el(SVG, { width: 94, height: 75, viewBox: '0 0 94 75', className: 'wp-block-pack-quote-icon' }, el('path', { d: "M48.999 45.438c0-15.611 23.867-44.436 30.442-44.437 4.181 0 9.515 5.182 9.32 9.062s-18.572 20.4-16.85 29.977c14.116-2.21 18.678 5.893 19.968 13.506 1.722 11.46-5.921 20.156-19.071 20.156S48.999 61.048 48.999 45.438zm-48 0c0-15.611 23.866-44.436 30.442-44.437 4.181 0 9.514 5.182 9.32 9.062s-18.572 20.4-16.85 29.977c14.116-2.21 18.678 5.893 19.968 13.506 1.722 11.46-5.922 20.156-19.071 20.156S1 61.048 1 45.438z" }));
var quoteLeanBorder = el(SVG, { width: 94, height: 75, viewBox: '0 0 94 75', className: 'wp-block-pack-quote-icon' }, el('path', { d: "M63.541 71.482a23.975 23.975 0 0 1-7.568-6.058A30.947 30.947 0 0 1 49 45.438c0-3.656 1.29-8.207 3.832-13.529a90.975 90.975 0 0 1 8.923-14.543A88.193 88.193 0 0 1 71.912 5.75c3.286-3.062 5.961-4.748 7.53-4.749 2.091 0 4.646 1.321 6.667 3.447 1.745 1.834 2.737 3.934 2.652 5.616-.069 1.388-2.436 4.356-5.432 8.114-5.285 6.629-12.523 15.71-11.417 21.862a29.036 29.036 0 0 1 4.463-.369c4.834 0 8.642 1.483 11.318 4.408a18.265 18.265 0 0 1 4.187 9.467 19.1 19.1 0 0 1-.329 7.708 15.511 15.511 0 0 1-3.258 6.252 16.728 16.728 0 0 1-6.428 4.544 23.777 23.777 0 0 1-9.056 1.652 20.494 20.494 0 0 1-9.268-2.22zm3.208-49.147c-4.306 5.851-9.681 14.486-10.831 22.388.015 6.158 1.682 11.552 4.82 15.6a15.9 15.9 0 0 0 11.283 6.4c.28.01.567.014.855.014 4.308 0 7.555-1.106 9.652-3.29 1.855-1.931 2.725-4.63 2.587-8.023-.242-3.093-1.8-6.947-4.652-8.1a10.127 10.127 0 0 0-3.751-.7 19.962 19.962 0 0 0-2.564.21l-.1.014a17.671 17.671 0 0 1-2.255.2 6.348 6.348 0 0 1-4.733-2.064 9.562 9.562 0 0 1-2.263-7.546 25.019 25.019 0 0 1 2.9-8.877c3.08-6.021 7.773-11.794 10.879-15.614a36.876 36.876 0 0 0 2.658-3.461 4.183 4.183 0 0 0-1.13-1.032l-.292-.2c-2.532 1.663-7.973 7.163-13.063 14.08zM15.541 71.482a23.975 23.975 0 0 1-7.568-6.058A30.947 30.947 0 0 1 1 45.438c0-3.656 1.289-8.207 3.831-13.529a91.05 91.05 0 0 1 8.923-14.543A88.131 88.131 0 0 1 23.91 5.75c3.286-3.062 5.96-4.748 7.53-4.749 2.091 0 4.645 1.321 6.667 3.447 1.745 1.834 2.737 3.934 2.652 5.616-.07 1.388-2.436 4.356-5.432 8.114-5.285 6.629-12.523 15.71-11.417 21.862a29.034 29.034 0 0 1 4.462-.369c4.835 0 8.643 1.483 11.318 4.408a18.266 18.266 0 0 1 4.188 9.467 19.117 19.117 0 0 1-.329 7.708 15.511 15.511 0 0 1-3.258 6.252 16.742 16.742 0 0 1-6.428 4.544 23.776 23.776 0 0 1-9.056 1.652 20.491 20.491 0 0 1-9.266-2.22zm3.208-49.147c-4.306 5.851-9.682 14.486-10.831 22.388.015 6.158 1.682 11.552 4.819 15.6a15.9 15.9 0 0 0 11.284 6.4c.279.01.567.014.855.014 4.308 0 7.556-1.106 9.652-3.29 1.855-1.931 2.725-4.63 2.587-8.023-.242-3.093-1.8-6.947-4.652-8.1a10.13 10.13 0 0 0-3.751-.7 19.963 19.963 0 0 0-2.564.21l-.1.014a17.658 17.658 0 0 1-2.254.2 6.347 6.347 0 0 1-4.733-2.064 9.562 9.562 0 0 1-2.263-7.546 25 25 0 0 1 2.9-8.877c3.079-6.021 7.773-11.794 10.879-15.614a37.05 37.05 0 0 0 2.658-3.461 4.2 4.2 0 0 0-1.13-1.032l-.292-.2c-2.533 1.663-7.974 7.163-13.064 14.08z" }));
var quoteRobotSolid = el(SVG, { width: 94, height: 75, viewBox: '0 0 94 75', className: 'wp-block-pack-quote-icon' }, el('path', { d: "M38.053 14.128s-15.444 14.167-15.7 25.728h14.679v32.455H3.996l.024-31.478C4.02 17.333 38.049 2 38.049 2zm51 0s-15.444 14.167-15.7 25.728h14.679v32.455H54.996l.024-31.478C55.02 17.333 89.049 2 89.049 2z" }));
var quoteRobotBorder = el(SVG, { width: 94, height: 75, viewBox: '0 0 94 75', className: 'wp-block-pack-quote-icon' }, el('path', { d: "M38.053 2v12.127a78.327 78.327 0 0 0-7.754 8.528c-3.551 4.55-7.812 11.228-7.942 17.2h14.679V72.31H4l.024-31.477A28.528 28.528 0 0 1 9.341 24.85a55.942 55.942 0 0 1 11.7-12.247 91.779 91.779 0 0 1 17.014-10.6zm-8.067 44.842l-14.752-.017c.014-.841.017-1.656.019-2.444.019-7.1.034-12.712 8.873-25.314-3.144 2.522-13.383 11.592-13.113 22.451l.012 23.776h19zM89.053 2v12.127a78.319 78.319 0 0 0-7.754 8.528c-3.551 4.55-7.813 11.228-7.943 17.2h14.679V72.31H54.999l.024-31.477A28.52 28.52 0 0 1 60.34 24.85a55.941 55.941 0 0 1 11.7-12.247 91.756 91.756 0 0 1 17.013-10.6zm-8.067 44.842l-14.752-.017c.014-.841.016-1.656.019-2.444.019-7.1.034-12.712 8.873-25.314-3.144 2.522-13.383 11.592-13.113 22.451l.012 23.776h19z" }));
var quoteStrongSolid = el(SVG, { width: 94, height: 75, viewBox: '0 0 94 75', className: 'wp-block-pack-quote-icon' }, el('path', { d: "M50 48.44c0-24.1 9.751-40.085 10.165-40.754L61.212 6H76.83l-1.287 4.539c-1.257 4.437-3.253 12.452-3.253 15.076 0 .641.019 1.109.045 1.448a21.268 21.268 0 0 1 14.333 6.386 21.271 21.271 0 0 1 6.129 14.99 21.423 21.423 0 0 1-21.4 21.4A21.423 21.423 0 0 1 50 48.44zm-49 0c0-24.1 9.751-40.085 10.165-40.754L12.211 6H27.83l-1.287 4.539c-1.258 4.437-3.253 12.452-3.253 15.076 0 .641.019 1.109.044 1.448a21.265 21.265 0 0 1 14.332 6.386 21.272 21.272 0 0 1 6.13 14.99 21.423 21.423 0 0 1-21.4 21.4A21.423 21.423 0 0 1 1 48.44z" }));
var quoteStrongBorder = el(SVG, { width: 94, height: 75, viewBox: '0 0 94 75', className: 'wp-block-pack-quote-icon' }, el('path', { d: "M49.997 48.441c0-24.095 9.751-40.086 10.165-40.755L61.209 6h15.618l-1.287 4.539c-1.257 4.438-3.253 12.455-3.253 15.076 0 .572.015 1.059.045 1.448a21.307 21.307 0 0 1 14.333 6.386 21.272 21.272 0 0 1 6.13 14.991 21.423 21.423 0 0 1-21.4 21.4 21.423 21.423 0 0 1-21.398-21.399zm7.076 1.487c.749 6.195 5.51 12.862 14.191 12.862 8.042 0 14.46-6.009 14.612-13.68 0-4.223-.685-7.086-4.425-11.015a14.038 14.038 0 0 0-9.226-4.012c-.27-.031-.526-.059-.739-.089a8.039 8.039 0 0 1-3.4-1.5 6.624 6.624 0 0 1-2.6-3.846c-.808-3.7.727-10.523 2.158-15.593h-2.605c-5.681 12.41-8.658 26.196-7.963 36.872zM.997 48.441c0-24.095 9.751-40.086 10.165-40.755L12.209 6h15.618l-1.287 4.539c-1.257 4.438-3.253 12.455-3.253 15.076 0 .572.015 1.059.045 1.448a21.307 21.307 0 0 1 14.332 6.386 21.268 21.268 0 0 1 6.13 14.991 21.423 21.423 0 0 1-21.4 21.4A21.423 21.423 0 0 1 .997 48.441zm7.076 1.487c.75 6.195 5.51 12.862 14.191 12.862 8.042 0 14.461-6.009 14.612-13.68 0-4.223-.684-7.086-4.425-11.015a14.036 14.036 0 0 0-9.226-4.012c-.27-.031-.525-.059-.739-.089a8.037 8.037 0 0 1-3.4-1.5 6.625 6.625 0 0 1-2.6-3.846c-.808-3.7.728-10.523 2.158-15.593h-2.605c-5.681 12.41-8.657 26.196-7.963 36.872z" }));

var DashiconNames = [ "admin-appearance", "admin-collapse", "admin-comments", "admin-customizer", "admin-generic", "admin-home", "admin-links", "admin-media", "admin-multisite", "admin-network", "admin-page", "admin-plugins", "admin-post", "admin-settings", "admin-site-alt", "admin-site-alt2", "admin-site-alt3", "admin-site", "admin-tools", "admin-users", "album", "align-center", "align-left", "align-none", "align-right", "analytics", "archive", "arrow-down-alt", "arrow-down-alt2", "arrow-down", "arrow-left-alt", "arrow-left-alt2", "arrow-left", "arrow-right-alt", "arrow-right-alt2", "arrow-right", "arrow-up-alt", "arrow-up-alt2", "arrow-up", "art", "awards", "backup", "book-alt", "book", "buddicons-activity", "buddicons-bbpress-logo", "buddicons-buddypress-logo", "buddicons-community", "buddicons-forums", "buddicons-friends", "buddicons-groups", "buddicons-pm", "buddicons-replies", "buddicons-topics", "buddicons-tracking", "building", "businessman", "calendar-alt", "calendar", "camera", "carrot", "cart", "category", "chart-area", "chart-bar", "chart-line", "chart-pie", "clipboard", "clock", "cloud", "controls-back", "controls-forward", "controls-pause", "controls-play", "controls-repeat", "controls-skipback", "controls-skipforward", "controls-volumeoff", "controls-volumeon", "dashboard", "desktop", "dismiss", "download", "edit", "editor-aligncenter", "editor-alignleft", "editor-alignright", "editor-bold", "editor-break", "editor-code", "editor-contract", "editor-customchar", "editor-expand", "editor-help", "editor-indent", "editor-insertmore", "editor-italic", "editor-justify", "editor-kitchensink", "editor-ltr", "editor-ol-rtl", "editor-ol", "editor-outdent", "editor-paragraph", "editor-paste-text", "editor-paste-word", "editor-quote", "editor-removeformatting", "editor-rtl", "editor-spellcheck", "editor-strikethrough", "editor-table", "editor-textcolor", "editor-ul", "editor-underline", "editor-unlink", "editor-video", "email-alt", "email-alt2", "email", "excerpt-view", "external", "facebook-alt", "facebook", "feedback", "filter", "flag", "format-aside", "format-audio", "format-chat", "format-gallery", "format-image", "format-quote", "format-status", "format-video", "forms", "googleplus", "grid-view", "groups", "hammer", "heart", "hidden", "id-alt", "id", "image-crop", "image-filter", "image-flip-horizontal", "image-flip-vertical", "image-rotate-left", "image-rotate-right", "image-rotate", "images-alt", "images-alt2", "index-card", "info", "instagram", "laptop", "layout", "leftright", "lightbulb", "list-view", "location-alt", "location", "lock", "marker", "media-archive", "media-audio", "media-code", "media-default", "media-document", "media-interactive", "media-spreadsheet", "media-text", "media-video", "megaphone", "menu-alt", "menu", "microphone", "migrate", "minus", "money", "move", "nametag", "networking", "no-alt", "no", "palmtree", "paperclip", "performance", "phone", "playlist-audio", "playlist-video", "plus-alt", "plus-light", "plus", "portfolio", "post-status", "pressthis", "products", "randomize", "redo", "rest-api", "rss", "schedule", "screenoptions", "search", "share-alt", "share-alt2", "share", "shield-alt", "shield", "slides", "smartphone", "smiley", "sort", "sos", "star-empty", "star-filled", "star-half", "sticky", "store", "tablet", "tag", "tagcloud", "testimonial", "text", "thumbs-down", "thumbs-up", "tickets-alt", "tickets", "tide", "translation", "trash", "twitter", "undo", "universal-access-alt", "universal-access", "unlock", "update", "upload", "vault", "video-alt", "video-alt2", "video-alt3", "visibility", "warning", "welcome-add-page", "welcome-comments", "welcome-learn-more", "welcome-view-site", "welcome-widgets-menus", "welcome-write-blog", "wordpress-alt", "wordpress", "yes-alt", "yes" ];
var FASIconNames = [ "ad", "address-book", "address-card", "adjust", "air-freshener", "align-center", "align-justify", "align-left", "align-right", "allergies", "ambulance", "american-sign-language-interpreting", "anchor", "angle-double-down", "angle-double-left", "angle-double-right", "angle-double-up", "angle-down", "angle-left", "angle-right", "angle-up", "angry", "ankh", "apple-alt", "archive", "archway", "arrow-alt-circle-down", "arrow-alt-circle-left", "arrow-alt-circle-right", "arrow-alt-circle-up", "arrow-circle-down", "arrow-circle-left", "arrow-circle-right", "arrow-circle-up", "arrow-down", "arrow-left", "arrow-right", "arrow-up", "arrows-alt", "arrows-alt-h", "arrows-alt-v", "assistive-listening-systems", "asterisk", "at", "atlas", "atom", "audio-description", "award", "baby", "baby-carriage", "backspace", "backward", "bacon", "balance-scale", "ban", "band-aid", "barcode", "bars", "baseball-ball", "basketball-ball", "bath", "battery-empty", "battery-full", "battery-half", "battery-quarter", "battery-three-quarters", "bed", "beer", "bell", "bell-slash", "bezier-curve", "bible", "bicycle", "binoculars", "biohazard", "birthday-cake", "blender", "blender-phone", "blind", "blog", "bold", "bolt", "bomb", "bone", "bong", "book", "book-dead", "book-medical", "book-open", "book-reader", "bookmark", "bowling-ball", "box", "box-open", "boxes", "braille", "brain", "bread-slice", "briefcase", "briefcase-medical", "broadcast-tower", "broom", "brush", "bug", "building", "bullhorn", "bullseye", "burn", "bus", "bus-alt", "business-time", "calculator", "calendar", "calendar-alt", "calendar-check", "calendar-day", "calendar-minus", "calendar-plus", "calendar-times", "calendar-week", "camera", "camera-retro", "campground", "candy-cane", "cannabis", "capsules", "car", "car-alt", "car-battery", "car-crash", "car-side", "caret-down", "caret-left", "caret-right", "caret-square-down", "caret-square-left", "caret-square-right", "caret-square-up", "caret-up", "carrot", "cart-arrow-down", "cart-plus", "cash-register", "cat", "certificate", "chair", "chalkboard", "chalkboard-teacher", "charging-station", "chart-area", "chart-bar", "chart-line", "chart-pie", "check", "check-circle", "check-double", "check-square", "cheese", "chess", "chess-bishop", "chess-board", "chess-king", "chess-knight", "chess-pawn", "chess-queen", "chess-rook", "chevron-circle-down", "chevron-circle-left", "chevron-circle-right", "chevron-circle-up", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "child", "church", "circle", "circle-notch", "city", "clinic-medical", "clipboard", "clipboard-check", "clipboard-list", "clock", "clone", "closed-captioning", "cloud", "cloud-download-alt", "cloud-meatball", "cloud-moon", "cloud-moon-rain", "cloud-rain", "cloud-showers-heavy", "cloud-sun", "cloud-sun-rain", "cloud-upload-alt", "cocktail", "code", "code-branch", "coffee", "cog", "cogs", "coins", "columns", "comment", "comment-alt", "comment-dollar", "comment-dots", "comment-medical", "comment-slash", "comments", "comments-dollar", "compact-disc", "compass", "compress", "compress-arrows-alt", "concierge-bell", "cookie", "cookie-bite", "copy", "copyright", "couch", "credit-card", "crop", "crop-alt", "cross", "crosshairs", "crow", "crown", "crutch", "cube", "cubes", "cut", "database", "deaf", "democrat", "desktop", "dharmachakra", "diagnoses", "dice", "dice-d20", "dice-d6", "dice-five", "dice-four", "dice-one", "dice-six", "dice-three", "dice-two", "digital-tachograph", "directions", "divide", "dizzy", "dna", "dog", "dollar-sign", "dolly", "dolly-flatbed", "donate", "door-closed", "door-open", "dot-circle", "dove", "download", "drafting-compass", "dragon", "draw-polygon", "drum", "drum-steelpan", "drumstick-bite", "dumbbell", "dumpster", "dumpster-fire", "dungeon", "edit", "egg", "eject", "ellipsis-h", "ellipsis-v", "envelope", "envelope-open", "envelope-open-text", "envelope-square", "equals", "eraser", "ethernet", "euro-sign", "exchange-alt", "exclamation", "exclamation-circle", "exclamation-triangle", "expand", "expand-arrows-alt", "external-link-alt", "external-link-square-alt", "eye", "eye-dropper", "eye-slash", "fast-backward", "fast-forward", "fax", "feather", "feather-alt", "female", "fighter-jet", "file", "file-alt", "file-archive", "file-audio", "file-code", "file-contract", "file-csv", "file-download", "file-excel", "file-export", "file-image", "file-import", "file-invoice", "file-invoice-dollar", "file-medical", "file-medical-alt", "file-pdf", "file-powerpoint", "file-prescription", "file-signature", "file-upload", "file-video", "file-word", "fill", "fill-drip", "film", "filter", "fingerprint", "fire", "fire-alt", "fire-extinguisher", "first-aid", "fish", "fist-raised", "flag", "flag-checkered", "flag-usa", "flask", "flushed", "folder", "folder-minus", "folder-open", "folder-plus", "font", "football-ball", "forward", "frog", "frown", "frown-open", "funnel-dollar", "futbol", "gamepad", "gas-pump", "gavel", "gem", "genderless", "ghost", "gift", "gifts", "glass-cheers", "glass-martini", "glass-martini-alt", "glass-whiskey", "glasses", "globe", "globe-africa", "globe-americas", "globe-asia", "globe-europe", "golf-ball", "gopuram", "graduation-cap", "greater-than", "greater-than-equal", "grimace", "grin", "grin-alt", "grin-beam", "grin-beam-sweat", "grin-hearts", "grin-squint", "grin-squint-tears", "grin-stars", "grin-tears", "grin-tongue", "grin-tongue-squint", "grin-tongue-wink", "grin-wink", "grip-horizontal", "grip-lines", "grip-lines-vertical", "grip-vertical", "guitar", "h-square", "hamburger", "hammer", "hamsa", "hand-holding", "hand-holding-heart", "hand-holding-usd", "hand-lizard", "hand-middle-finger", "hand-paper", "hand-peace", "hand-point-down", "hand-point-left", "hand-point-right", "hand-point-up", "hand-pointer", "hand-rock", "hand-scissors", "hand-spock", "hands", "hands-helping", "handshake", "hanukiah", "hard-hat", "hashtag", "hat-wizard", "haykal", "hdd", "heading", "headphones", "headphones-alt", "headset", "heart", "heart-broken", "heartbeat", "helicopter", "highlighter", "hiking", "hippo", "history", "hockey-puck", "holly-berry", "home", "horse", "horse-head", "hospital", "hospital-alt", "hospital-symbol", "hot-tub", "hotdog", "hotel", "hourglass", "hourglass-end", "hourglass-half", "hourglass-start", "house-damage", "hryvnia", "i-cursor", "ice-cream", "icicles", "id-badge", "id-card", "id-card-alt", "igloo", "image", "images", "inbox", "indent", "industry", "infinity", "info", "info-circle", "italic", "jedi", "joint", "journal-whills", "kaaba", "key", "keyboard", "khanda", "kiss", "kiss-beam", "kiss-wink-heart", "kiwi-bird", "landmark", "language", "laptop", "laptop-code", "laptop-medical", "laugh", "laugh-beam", "laugh-squint", "laugh-wink", "layer-group", "leaf", "lemon", "less-than", "less-than-equal", "level-down-alt", "level-up-alt", "life-ring", "lightbulb", "link", "lira-sign", "list", "list-alt", "list-ol", "list-ul", "location-arrow", "lock", "lock-open", "long-arrow-alt-down", "long-arrow-alt-left", "long-arrow-alt-right", "long-arrow-alt-up", "low-vision", "luggage-cart", "magic", "magnet", "mail-bulk", "male", "map", "map-marked", "map-marked-alt", "map-marker", "map-marker-alt", "map-pin", "map-signs", "marker", "mars", "mars-double", "mars-stroke", "mars-stroke-h", "mars-stroke-v", "mask", "medal", "medkit", "meh", "meh-blank", "meh-rolling-eyes", "memory", "menorah", "mercury", "meteor", "microchip", "microphone", "microphone-alt", "microphone-alt-slash", "microphone-slash", "microscope", "minus", "minus-circle", "minus-square", "mitten", "mobile", "mobile-alt", "money-bill", "money-bill-alt", "money-bill-wave", "money-bill-wave-alt", "money-check", "money-check-alt", "monument", "moon", "mortar-pestle", "mosque", "motorcycle", "mountain", "mouse-pointer", "mug-hot", "music", "network-wired", "neuter", "newspaper", "not-equal", "notes-medical", "object-group", "object-ungroup", "oil-can", "om", "otter", "outdent", "pager", "paint-brush", "paint-roller", "palette", "pallet", "paper-plane", "paperclip", "parachute-box", "paragraph", "parking", "passport", "pastafarianism", "paste", "pause", "pause-circle", "paw", "peace", "pen", "pen-alt", "pen-fancy", "pen-nib", "pen-square", "pencil-alt", "pencil-ruler", "people-carry", "pepper-hot", "percent", "percentage", "person-booth", "phone", "phone-slash", "phone-square", "phone-volume", "piggy-bank", "pills", "pizza-slice", "place-of-worship", "plane", "plane-arrival", "plane-departure", "play", "play-circle", "plug", "plus", "plus-circle", "plus-square", "podcast", "poll", "poll-h", "poo", "poo-storm", "poop", "portrait", "pound-sign", "power-off", "pray", "praying-hands", "prescription", "prescription-bottle", "prescription-bottle-alt", "print", "procedures", "project-diagram", "puzzle-piece", "qrcode", "question", "question-circle", "quidditch", "quote-left", "quote-right", "quran", "radiation", "radiation-alt", "rainbow", "random", "receipt", "recycle", "redo", "redo-alt", "registered", "reply", "reply-all", "republican", "restroom", "retweet", "ribbon", "ring", "road", "robot", "rocket", "route", "rss", "rss-square", "ruble-sign", "ruler", "ruler-combined", "ruler-horizontal", "ruler-vertical", "running", "rupee-sign", "sad-cry", "sad-tear", "satellite", "satellite-dish", "save", "school", "screwdriver", "scroll", "sd-card", "search", "search-dollar", "search-location", "search-minus", "search-plus", "seedling", "server", "shapes", "share", "share-alt", "share-alt-square", "share-square", "shekel-sign", "shield-alt", "ship", "shipping-fast", "shoe-prints", "shopping-bag", "shopping-basket", "shopping-cart", "shower", "shuttle-van", "sign", "sign-in-alt", "sign-language", "sign-out-alt", "signal", "signature", "sim-card", "sitemap", "skating", "skiing", "skiing-nordic", "skull", "skull-crossbones", "slash", "sleigh", "sliders-h", "smile", "smile-beam", "smile-wink", "smog", "smoking", "smoking-ban", "sms", "snowboarding", "snowflake", "snowman", "snowplow", "socks", "solar-panel", "sort", "sort-alpha-down", "sort-alpha-up", "sort-amount-down", "sort-amount-up", "sort-down", "sort-numeric-down", "sort-numeric-up", "sort-up", "spa", "space-shuttle", "spider", "spinner", "splotch", "spray-can", "square", "square-full", "square-root-alt", "stamp", "star", "star-and-crescent", "star-half", "star-half-alt", "star-of-david", "star-of-life", "step-backward", "step-forward", "stethoscope", "sticky-note", "stop", "stop-circle", "stopwatch", "store", "store-alt", "stream", "street-view", "strikethrough", "stroopwafel", "subscript", "subway", "suitcase", "suitcase-rolling", "sun", "superscript", "surprise", "swatchbook", "swimmer", "swimming-pool", "synagogue", "sync", "sync-alt", "syringe", "table", "table-tennis", "tablet", "tablet-alt", "tablets", "tachometer-alt", "tag", "tags", "tape", "tasks", "taxi", "teeth", "teeth-open", "temperature-high", "temperature-low", "tenge", "terminal", "text-height", "text-width", "th", "th-large", "th-list", "theater-masks", "thermometer", "thermometer-empty", "thermometer-full", "thermometer-half", "thermometer-quarter", "thermometer-three-quarters", "thumbs-down", "thumbs-up", "thumbtack", "ticket-alt", "times", "times-circle", "tint", "tint-slash", "tired", "toggle-off", "toggle-on", "toilet", "toilet-paper", "toolbox", "tools", "tooth", "torah", "torii-gate", "tractor", "trademark", "traffic-light", "train", "tram", "transgender", "transgender-alt", "trash", "trash-alt", "trash-restore", "trash-restore-alt", "tree", "trophy", "truck", "truck-loading", "truck-monster", "truck-moving", "truck-pickup", "tshirt", "tty", "tv", "umbrella", "umbrella-beach", "underline", "undo", "undo-alt", "universal-access", "university", "unlink", "unlock", "unlock-alt", "upload", "user", "user-alt", "user-alt-slash", "user-astronaut", "user-check", "user-circle", "user-clock", "user-cog", "user-edit", "user-friends", "user-graduate", "user-injured", "user-lock", "user-md", "user-minus", "user-ninja", "user-nurse", "user-plus", "user-secret", "user-shield", "user-slash", "user-tag", "user-tie", "user-times", "users", "users-cog", "utensil-spoon", "utensils", "vector-square", "venus", "venus-double", "venus-mars", "vial", "vials", "video", "video-slash", "vihara", "volleyball-ball", "volume-down", "volume-mute", "volume-off", "volume-up", "vote-yea", "vr-cardboard", "walking", "wallet", "warehouse", "water", "weight", "weight-hanging", "wheelchair", "wifi", "wind", "window-close", "window-maximize", "window-minimize", "window-restore", "wine-bottle", "wine-glass", "wine-glass-alt", "won-sign", "wrench", "x-ray", "yen-sign", "yin-yang" ];
var FARIconNames = [ "address-book", "address-card", "angry", "arrow-alt-circle-down", "arrow-alt-circle-left", "arrow-alt-circle-right", "arrow-alt-circle-up", "bell", "bell-slash", "bookmark", "building", "calendar", "calendar-alt", "calendar-check", "calendar-minus", "calendar-plus", "calendar-times", "caret-square-down", "caret-square-left", "caret-square-right", "caret-square-up", "chart-bar", "check-circle", "check-square", "circle", "clipboard", "clock", "clone", "closed-captioning", "comment", "comment-alt", "comment-dots", "comments", "compass", "copy", "copyright", "credit-card", "dizzy", "dot-circle", "edit", "envelope", "envelope-open", "eye", "eye-slash", "file", "file-alt", "file-archive", "file-audio", "file-code", "file-excel", "file-image", "file-pdf", "file-powerpoint", "file-video", "file-word", "flag", "flushed", "folder", "folder-open", "frown", "frown-open", "futbol", "gem", "grimace", "grin", "grin-alt", "grin-beam", "grin-beam-sweat", "grin-hearts", "grin-squint", "grin-squint-tears", "grin-stars", "grin-tears", "grin-tongue", "grin-tongue-squint", "grin-tongue-wink", "grin-wink", "hand-lizard", "hand-paper", "hand-peace", "hand-point-down", "hand-point-left", "hand-point-right", "hand-point-up", "hand-pointer", "hand-rock", "hand-scissors", "hand-spock", "handshake", "hdd", "heart", "hospital", "hourglass", "id-badge", "id-card", "image", "images", "keyboard", "kiss", "kiss-beam", "kiss-wink-heart", "laugh", "laugh-beam", "laugh-squint", "laugh-wink", "lemon", "life-ring", "lightbulb", "list-alt", "map", "meh", "meh-blank", "meh-rolling-eyes", "minus-square", "money-bill-alt", "moon", "newspaper", "object-group", "object-ungroup", "paper-plane", "pause-circle", "play-circle", "plus-square", "question-circle", "registered", "sad-cry", "sad-tear", "save", "share-square", "smile", "smile-beam", "smile-wink", "snowflake", "square", "star", "star-half", "sticky-note", "stop-circle", "sun", "surprise", "thumbs-down", "thumbs-up", "times-circle", "tired", "trash-alt", "user", "user-circle", "window-close", "window-maximize", "window-minimize", "window-restore"];
var FABIconNames = [ "500px", "accessible-icon", "accusoft", "acquisitions-incorporated", "adn", "adobe", "adversal", "affiliatetheme", "algolia", "alipay", "amazon", "amazon-pay", "amilia", "android", "angellist", "angrycreative", "angular", "app-store", "app-store-ios", "apper", "apple", "apple-pay", "artstation", "asymmetrik", "atlassian", "audible", "autoprefixer", "avianex", "aviato", "aws", "bandcamp", "behance", "behance-square", "bimobject", "bitbucket", "bitcoin", "bity", "black-tie", "blackberry", "blogger", "blogger-b", "bluetooth", "bluetooth-b", "btc", "buromobelexperte", "buysellads", "canadian-maple-leaf", "cc-amazon-pay", "cc-amex", "cc-apple-pay", "cc-diners-club", "cc-discover", "cc-jcb", "cc-mastercard", "cc-paypal", "cc-stripe", "cc-visa", "centercode", "centos", "chrome", "cloudscale", "cloudsmith", "cloudversify", "codepen", "codiepie", "confluence", "connectdevelop", "contao", "cpanel", "creative-commons", "creative-commons-by", "creative-commons-nc", "creative-commons-nc-eu", "creative-commons-nc-jp", "creative-commons-nd", "creative-commons-pd", "creative-commons-pd-alt", "creative-commons-remix", "creative-commons-sa", "creative-commons-sampling", "creative-commons-sampling-plus", "creative-commons-share", "creative-commons-zero", "critical-role", "css3", "css3-alt", "cuttlefish", "d-and-d", "d-and-d-beyond", "dashcube", "delicious", "deploydog", "deskpro", "dev", "deviantart", "dhl", "diaspora", "digg", "digital-ocean", "discord", "discourse", "dochub", "docker", "draft2digital", "dribbble", "dribbble-square", "dropbox", "drupal", "dyalog", "earlybirds", "ebay", "edge", "elementor", "ello", "ember", "empire", "envira", "erlang", "ethereum", "etsy", "expeditedssl", "facebook", "facebook-f", "facebook-messenger", "facebook-square", "fantasy-flight-games", "fedex", "fedora", "figma", "firefox", "first-order", "first-order-alt", "firstdraft", "flickr", "flipboard", "fly", "font-awesome", "font-awesome-alt", "font-awesome-flag", "fonticons", "fonticons-fi", "fort-awesome", "fort-awesome-alt", "forumbee", "foursquare", "free-code-camp", "freebsd", "fulcrum", "galactic-republic", "galactic-senate", "get-pocket", "gg", "gg-circle", "git", "git-square", "github", "github-alt", "github-square", "gitkraken", "gitlab", "gitter", "glide", "glide-g", "gofore", "goodreads", "goodreads-g", "google", "google-drive", "google-play", "google-plus", "google-plus-g", "google-plus-square", "google-wallet", "gratipay", "grav", "gripfire", "grunt", "gulp", "hacker-news", "hacker-news-square", "hackerrank", "hips", "hire-a-helper", "hooli", "hornbill", "hotjar", "houzz", "html5", "hubspot", "imdb", "instagram", "intercom", "internet-explorer", "invision", "ioxhost", "itunes", "itunes-note", "java", "jedi-order", "jenkins", "jira", "joget", "joomla", "js", "js-square", "jsfiddle", "kaggle", "keybase", "keycdn", "kickstarter", "kickstarter-k", "korvue", "laravel", "lastfm", "lastfm-square", "leanpub", "less", "line", "linkedin", "linkedin-in", "linode", "linux", "lyft", "magento", "mailchimp", "mandalorian", "markdown", "mastodon", "maxcdn", "medapps", "medium", "medium-m", "medrt", "meetup", "megaport", "mendeley", "microsoft", "mix", "mixcloud", "mizuni", "modx", "monero", "napster", "neos", "nimblr", "nintendo-switch", "node", "node-js", "npm", "ns8", "nutritionix", "odnoklassniki", "odnoklassniki-square", "old-republic", "opencart", "openid", "opera", "optin-monster", "osi", "page4", "pagelines", "palfed", "patreon", "paypal", "penny-arcade", "periscope", "phabricator", "phoenix-framework", "phoenix-squadron", "php", "pied-piper", "pied-piper-alt", "pied-piper-hat", "pied-piper-pp", "pinterest", "pinterest-p", "pinterest-square", "playstation", "product-hunt", "pushed", "python", "qq", "quinscape", "quora", "r-project", "raspberry-pi", "ravelry", "react", "reacteurope", "readme", "rebel", "red-river", "reddit", "reddit-alien", "reddit-square", "redhat", "renren", "replyd", "researchgate", "resolving", "rev", "rocketchat", "rockrms", "safari", "sass", "schlix", "scribd", "searchengin", "sellcast", "sellsy", "servicestack", "shirtsinbulk", "shopware", "simplybuilt", "sistrix", "sith", "sketch", "skyatlas", "skype", "slack", "slack-hash", "slideshare", "snapchat", "snapchat-ghost", "snapchat-square", "soundcloud", "sourcetree", "speakap", "spotify", "squarespace", "stack-exchange", "stack-overflow", "staylinked", "steam", "steam-square", "steam-symbol", "sticker-mule", "strava", "stripe", "stripe-s", "studiovinari", "stumbleupon", "stumbleupon-circle", "superpowers", "supple", "suse", "teamspeak", "telegram", "telegram-plane", "tencent-weibo", "the-red-yeti", "themeco", "themeisle", "think-peaks", "trade-federation", "trello", "tripadvisor", "tumblr", "tumblr-square", "twitch", "twitter", "twitter-square", "typo3", "uber", "ubuntu", "uikit", "uniregistry", "untappd", "ups", "usb", "usps", "ussunnah", "vaadin", "viacoin", "viadeo", "viadeo-square", "viber", "vimeo", "vimeo-square", "vimeo-v", "vine", "vk", "vnv", "vuejs", "weebly", "weibo", "weixin", "whatsapp", "whatsapp-square", "whmcs", "wikipedia-w", "windows", "wix", "wizards-of-the-coast", "wolf-pack-battalion", "wordpress", "wordpress-simple", "wpbeginner", "wpexplorer", "wpforms", "wpressr", "xbox", "xing", "xing-square", "y-combinator", "yahoo", "yandex", "yandex-international", "yarn", "yelp", "yoast", "youtube", "youtube-square", "zhihu" ];
var iconSizes = [ {name: "Extra Small", value: "xs"}, {name: "Small", value: "sm"}, {name: "Original", value: "1x"}, {name: "Large", value: "lg"}, {name: "Double", value: "2x"}, {name: "Triple", value: "3x"}, {name: "4 Times", value: "4x"}, {name: "5 Times", value: "5x"}, {name: "6 Times", value: "6x"}, {name: "7 Times", value: "7x"}, {name: "8 Times", value: "8x"}, {name: "9 Times", value: "9x"}, {name: "10 Times", value: "10x"} ];
var textSizes = [ {label: "Small", name: "small", value: 0.85}, {label: "Normal", name: "normal", value: 1}, {label: "Medium", name: "medium", value: 1.3}, {label: "Large", name: "large", value: 1.7}, {label: "Huge", name: "huge", value: 2.3}, ];
var borderStyles = [ {label: ' ', value: undefined}, {label: 'None', value: 'none'}, {label: 'Hidden', value: 'hidden'}, {label: 'Dotted', value: 'dotted'}, {label: 'Dashed', value: 'dashed'}, {label: 'Solid', value: 'solid'}, {label: 'Double', value: 'double'}, {label: 'Groove', value: 'groove'}, {label: 'Ridge', value: 'ridge'}, {label: 'Inset', value: 'inset'}, {label: 'Outset', value: 'outset'}, {label: 'Initial', value: 'initial'}, {label: 'Inherit', value: 'inherit'} ];

var colorPack = [ { name: 'Red', color: '#FE1717' }, { name: 'Pink', color: '#FF1DA5' }, { name: 'Red Violet', color: '#CB17FF' }, { name: 'Violet', color: '#951BFE' }, { name: 'Blue', color: '#5913FF' }, { name: 'Iceberg', color: '#1C95FF' }, { name: 'Aqua', color: '#1CD0FF' }, { name: 'Aquamarine', color: '#1CFFB2' }, { name: 'Green', color: '#1CFF49' }, { name: 'Celery', color: '#9DFF1C' }, { name: 'Yellow', color: '#FFE81C' }, { name: 'Orange', color: '#FF7E1C' }, { name: 'Black', color: '#000000' }, { name: 'Dark', color: '#333333' }, { name: 'Dark Grey', color: '#666666' }, { name: 'Grey', color: '#999999' }, { name: 'Light Grey', color: '#CCCCCC' }, 	{ name: 'White', color: '#FFFFFF' } ];


// Shared Function for Multiple blocks
function IconPickerModalContent(props) {

    var openModal = props.openModal;
    var iconPackState = props.iconPackState;
    var insertIconArea = props.insertIconArea;
    var inputKey = props.inputKey;
    var setState = props.setState;
    var iconPackValue, iconSubpackValue;




	if (iconPackState == 'dashicon') {

		var iconPackValue = 'dashicon';

	} else {

		var iconPackValue = 'fa-solid';

		var iconSubpackValue = iconPackState;

	}

    // Define value based on what block call this function
    // Icon Block
    if (insertIconArea == 'icon') {

    	this.name = props.attributes.iconName;

    } 

    // Just Icon Block
    else if (insertIconArea == 'just-icon') {

    	this.name = props.attributes.iconName;

    } 

    // Button Block for 'icon before'
    else if (insertIconArea == 'button-before') {

    	this.name = props.attributes.iconBefore;

    } 

    // Button Block for 'icon after'
    else if (insertIconArea == 'button-after') {


    	this.name = props.attributes.iconAfter;

    }


    // Define theIconPack for Icon Package
	// Font Awesome Solid
	if (iconPackState == "fa-solid") {

		var theIconPack = FASIconNames;

	} 
	// Font Awesome Regular
	else if (iconPackState == "fa-regular") {

		var theIconPack = FARIconNames;

	} 
	// Font Awesome Brand
	else if (iconPackState == "fa-brand") {

		var theIconPack = FABIconNames;

	} 
	// Dashicon
	else {

		var theIconPack = DashiconNames;

	}


	// Finally the Content
	var theContent = el( 'form',
        { 
            className: 'icon-picker-modal-content',
            onSubmit: function(event) {
            	event.preventDefault();
            },
            onChange: function () {

				// Get filter input value directly. Cause inputKey is not having live value
				var modalInput = document.getElementsByClassName('icon-picker-modal-content')[0].querySelectorAll('input.editor-input')[0];
            	var modalInputKey = modalInput.value.toUpperCase();
            	
            	// Define the things that will change
            	var iconPickerArea = document.getElementsByClassName('icon-picker-area')[0];
				var iconPickerAreaKids = iconPickerArea.querySelectorAll('label');

				// Reset all the change before change it again
				for(var i = 0; i < iconPickerAreaKids.length; i++){

					var a = iconPickerAreaKids[i].getElementsByClassName('icon-name')[0];
					iconPickerAreaKids[i].style.display = '';

				}

				// Now change it
				for(var i = 0; i < iconPickerAreaKids.length; i++){

					var a = iconPickerAreaKids[i].getElementsByClassName('icon-name')[0];
					if (a.innerHTML.toUpperCase().indexOf(modalInputKey) < 0) {
						iconPickerAreaKids[i].style.display = 'none';
					} else {
						iconPickerAreaKids[i].style.display = '';
					}

				}
            }
        },
        // Label for icon pack
        el('span', 
	        {
	        	className: 'icon-pack-label'
	        },
	        __('Icon Pack')
        ),
        // Choose icon pack
        el(SelectControl,
            { 
                className: 'icon-pack-selector ' + iconPackState,
                value: iconPackValue,
                options: [ {label: 'Dashicon', value: 'dashicon'}, {label: 'Font Awesome', value: 'fa-solid'} ],
                onChange: function( newValue ) {
					return setState({
					    iconPackState: newValue
					});
                }
            }
        ),
        // If it Font Awesome, choose the sub-pack
        (iconPackState != 'dashicon') && el(SelectControl,
            { 
                className: 'icon-subpack-selector',
                value: iconSubpackValue,
                options: [ {label: 'Solid', value: 'fa-solid'}, {label: 'Regular', value: 'fa-regular'}, {label: 'Brand', value: 'fa-brand'} ],
                onChange: function( newValue ) {
					return setState({
					    iconPackState: newValue
					});
                }
            }
        ),

        // Search input
        el('div',
	        {
	        	className: 'components-base-control icon-input-filter'
	        },
	        el( 'span', { 'class': 'fas fa-search fa-fw' } ),
        	el('input',
		        {
		        	type: 'search',
		        	className: 'editor-input',
		        	placeholder: 'Type to filter ..',
		        	onChange: function( newValue ) {
		        		return setState({
						    inputKey: newValue.target.value.toUpperCase()
						});
		        	}
		        }
	        )
        ),
        // Load list area
        el('div', null, 
	        el( 'div', 
	            {
	            	className: 'icon-picker-area'
	            },
				theIconPack.map( function( iconNamesChild ) {

				    var checked, actClass, displayStatus;
				    
				    if (this.name == iconNamesChild) {

				    	if (insertIconArea == 'button-before') {

				    		if (props.attributes.iconBeforePack == iconPackState) {

				    			var checked = true;
				    			var actClass = 'active';

				    		}

				    	} else if (insertIconArea == 'button-after') {

				    		if (props.attributes.iconAfterPack == iconPackState) {

				    			var checked = true;
				    			var actClass = 'active';

				    		}

				    	} else if (insertIconArea == 'just-icon') {

				    		if (props.attributes.iconPack == iconPackState) {

				    			var checked = true;
				    			var actClass = 'active';

				    		}
				    		
				    	} else if (insertIconArea == 'icon') {

				    		if (props.attributes.iconPack == iconPackState) {

				    			var checked = true;
				    			var actClass = 'active';

				    		}
				    	}

				    }


					// Filter the status with current inputkey
					if(inputKey) {

						if (iconNamesChild.toUpperCase().indexOf(inputKey) < 0) {

							displayStatus = 'none';

						} else {

							displayStatus = '';

						}

					}

				    return el( 'label', 
				        {
				            'for': iconNamesChild,
				            'class': actClass,
				            'title': iconNamesChild,
				            style: { display: displayStatus }
				        },
				        el( 'input', 
				            {
				                'type': 'radio',
				                'name': 'test-radio',
				                'id': iconNamesChild,
				                value: iconNamesChild,
				                'checked': checked,
				                onChange: function( newValue ) {

									// Just Icon Block
									if (insertIconArea == 'just-icon') {

										props.setAttributes( { iconName: newValue.target.value } );
										props.setAttributes( { iconPack: iconPackState } );
										// Reset for old block version:
										props.setAttributes( { iconType: 'dashicon' } );
										props.setAttributes( { iconTypeFA: 's' } );
										props.setAttributes( { dashiconName: 'admin-home' } );
										props.setAttributes( { fasName: 'ad' } );
										props.setAttributes( { fabName: 'apple' } );

									} 
									// Icon Block
									else if (insertIconArea == 'icon') {

										props.setAttributes( { iconName: newValue.target.value } );
										props.setAttributes( { iconPack: iconPackState } );

									} 
									// Button Block for 'icon before'
									else if (insertIconArea == 'button-before') {

										props.setAttributes( { iconBefore: newValue.target.value } );
										props.setAttributes( { iconBeforePack: iconPackState } );

									} 
									// Button Block for 'icon after'
									else if (insertIconArea == 'button-after') {

										props.setAttributes( { iconAfter: newValue.target.value } );
										props.setAttributes( { iconAfterPack: iconPackState } );

									}
				                }
				            }
				        ),

				        // Icon lists based on what icon pack is selected
				        // Fon Awesome Solid
				        (iconSubpackValue == 'fa-solid' || (iconPackState == 'fa-solid' && iconSubpackValue != 'fa-regular' && iconSubpackValue != 'fa-brand' ) ) && el( 'span', { 'class': 'fas fa-'+ iconNamesChild +' fa-fw' } ),
				        
				        // Fon Awesome Regular
				        (iconSubpackValue == 'fa-regular' || (iconPackState == 'fa-regular' && iconSubpackValue != 'fa-solid') ) && el( 'span', { 'class': 'far fa-'+ iconNamesChild +' fa-fw' } ),

				        // Fon Awesome Brand
				        (iconSubpackValue == 'fa-brand' || iconPackState == 'fa-brand') && el( 'span', { 'class': 'fab fa-'+ iconNamesChild +' fa-fw' } ),

				        // Dashicon
				        (iconPackState == 'dashicon') && el( Dashicon, { icon: iconNamesChild } ),

				        // Icon Name                		
				        el('span',
				            {
				                className: 'icon-name'
				            },
				            iconNamesChild
				        )
				    );
				} )
	        )
        )
	);

    return theContent;
}

// Color Conversion
// HEX to RGB

function hexToRgba(h,o) {

	function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
	
	var resultR = parseInt((cutHex(h)).substring(0,2),16);
	var resultG = parseInt((cutHex(h)).substring(2,4),16);
	var resultB = parseInt((cutHex(h)).substring(4,6),16);
	var resultA = o / 100;
	return 'rgba(' + resultR + ', ' + resultG + ', ' + resultB + ', ' + resultA + ')';
}


// Inserter Filter

var wpblockpackInserter = function wpblockpackInserter(value) {

	if (wpblockpackHiddenBlocks.indexOf(value) >= 0) {
		return false;
	} else {
		return true;
	}

}

