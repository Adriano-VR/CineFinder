import { Outlet } from "react-router-dom"
import Header from "./COMPONENTS/Header"
import "./CSS/fonts.css"
import HomePage from "./TELAS/HomePage"

function App() {


    return (    
<>
        <Header />
        <main>
        <Outlet />
        </main>
</>
      
       
        
    )

}

export default App
