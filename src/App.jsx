import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './Layout/DefaultLayout';
import Home from './Pages/Home';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' Component={DefaultLayout}>
          <Route index Component={Home}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
