import { createRoot } from 'react-dom/client';
import '../shared/styles/main.scss';
import { Calendar } from '../entities/calendar';
import { Header } from '../widgets/header';

window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
        console.log('Service worker register success');
    } else {
        console.log('Service worker register fail');
    }
    const rootElement = document.getElementById('root');

    if (rootElement) {
        createRoot(rootElement).render(<App />);
    } else {
        console.error('Root element not found!');
    }

    await App();
});

const App = () => (
    <>
        <Header />
        <Calendar />
    </>
);
