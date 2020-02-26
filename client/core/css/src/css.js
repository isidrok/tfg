function css(...styleSheets){
    return styleSheets.map((styleSheet) => {
        return {styleSheet};
    });
}

export {
    css
}