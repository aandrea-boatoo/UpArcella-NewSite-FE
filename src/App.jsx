import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './Layout/DefaultLayout';
import SingleEvent from './Pages/SingleEvent';
import AllEvents from './Pages/AllEvents';
import Home from './Pages/Home';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' Component={DefaultLayout}>
          <Route index Component={Home}></Route>
          <Route path='/event/:id' Component={SingleEvent}></Route>
          <Route path='/allEvents/' Component={AllEvents}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
