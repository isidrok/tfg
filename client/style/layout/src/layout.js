import layout from './layout.css';

document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    layout.styleSheet
];

export {
    layout
}