import { createRoot } from 'react-dom/client';
import '../shared/styles/main.scss';
import { Header } from '@/widgets/header';
import { Calendar } from '@/entities/calendar';

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
