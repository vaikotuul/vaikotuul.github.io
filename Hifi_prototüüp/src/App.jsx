
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import Login from './Pages/Login'
import AdminAvaleht from "./Pages/AdminAvaleht"
import SeadmeteJuhtimine from "./Pages/SeadmeteJuhtimine"
import Redigeerimine from "./Pages/Redigeerimine"

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/admin' element={<AdminAvaleht/>}/>
        <Route path="/admin/seadmete-juhtimine" element={<SeadmeteJuhtimine/>}></Route>
        <Route path='/admin/redigeerimine' element={<Redigeerimine/>}/>
      </Routes>
    </>
  )
}

export default App
