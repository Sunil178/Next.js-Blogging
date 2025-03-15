import { PrimeReactProvider } from 'primereact/context';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function PrimeReact({ Component, pageProps }) {
    return (
        <PrimeReactProvider>
            <Component {...pageProps} />
        </PrimeReactProvider>
    );
}
