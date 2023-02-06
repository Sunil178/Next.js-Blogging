const convertToNextClassName = {
    styles: null,
    classes: function (styles) {
        convertToNextClassName.styles = styles;
        const classes = function (classNames) {
            if (!convertToNextClassName.styles) return '';
            return classNames.split(' ').map(c => convertToNextClassName.styles[c]).join(' ');
        }
        return classes;
    }
}

export default convertToNextClassName;