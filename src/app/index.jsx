import ReactDOM from 'react-dom/client'
import { Calendar } from '../shared/ui'
import Index from '../shared/ui/atoms/header/index.jsx'
import '../shared/styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <Index />
        <Calendar />
    </>,
)
