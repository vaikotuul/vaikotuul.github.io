
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import Login from './Pages/Login'
import AdminAvaleht from "./Pages/AdminAvaleht"
import SeadmeteJuhtimine from "./Pages/SeadmeteJuhtimine"
import Redigeerimine from "./Pages/Redigeerimine"
import AjapõhineAutomatiseerimine from "./Pages/AjapõhineAutomatiseerimine"
import { Kujundus } from './components/Kujundus';

function App() {
  const ruumid = ["A-001", "A-002", "A-003"]

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/admin' element={<AdminAvaleht/>}/>
        <Route path="/admin/seadmete-juhtimine" element={<SeadmeteJuhtimine/>}></Route>
        <Route path='/admin/seadmete-juhtimine/:room' element={<Kujundus mode="control"/>}/>
        <Route path='/admin/redigeerimine' element={<Redigeerimine/>}/>
        <Route path='/admin/redigeerimine/:room' element={<Kujundus mode="edit"/>}/>
        <Route path='/admin/automatiseerimine' element={<AjapõhineAutomatiseerimine/>}/>
        <Route path='/user/:room' element={<Kujundus mode="control"/>}/>
      </Routes>
    </>
  )
}

export default App
