import color from './color.css';
import margin from './margin.css';
import padding from './padding.css';

document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    color,
    margin,
    padding
];
