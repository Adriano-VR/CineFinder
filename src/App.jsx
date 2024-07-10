import { Outlet } from "react-router-dom"
import Header from "./COMPONENTS/Header"
import Footer from "./COMPONENTS/Footer"

function App() {


    return (    
<>
        <Header />
        <main className="min-h-[86vh]">
        <Outlet />
        </main>
        <Footer />
</>
      
       
        
    )

}

export default App
