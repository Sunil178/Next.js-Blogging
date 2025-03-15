import NextImage from 'next/image'

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

const Image = ({
    src,
    alt,
    width = '150px',
    height = '8rem',
    children,
    ...props
}) => {
    return (
        <div style={{ position: 'relative', width: width, height: height }}>
            <NextImage
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                style={{ objectFit: 'contain' }}
                priority
                {...props}
            />

            {children}
        </div>
    );
};

export { convertToNextClassName, Image };