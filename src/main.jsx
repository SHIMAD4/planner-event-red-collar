import ReactDOM from "react-dom/client"
import Calendar from "./Calendar.jsx"
import Header from "./Header.jsx"
import "./assets/scss/main.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Header />
    <Calendar />
  </>
)
