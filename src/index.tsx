import { Provider } from "react-redux"

import "./index.css"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./redux/store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
)
