import { BrowserRouter } from "react-router"
import { Header } from "./components/Header"

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )
}