import { createRoot } from 'react-dom/client';
import '../shared/styles/main.scss';
import {Main} from "../pages";

const App = () => <Main />;

createRoot(document.getElementById('root')).render(<App />);
