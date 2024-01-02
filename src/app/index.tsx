import { createRoot } from 'react-dom/client';
import '../shared/styles/main.scss';
import { Calendar } from '../entities/calendar';
import { Header } from '../widgets/header';

const App = () => (
    <>
        <Header />
        <Calendar />
    </>
);

const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render(<App />);
} else {
    console.error('Root element not found!');
}
