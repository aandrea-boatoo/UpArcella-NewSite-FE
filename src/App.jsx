import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './Layout/DefaultLayout';
import SingleEvent from './Pages/EventPage/SingleEvent';
import AllEvents from './Pages/EventPage/AllEvents';
import Home from './Pages/Home';
import CredereInsieme from './Pages/FormatPage/CredereInsieme';
import CondivisioneQuotidiana from './Pages/FormatPage/CondivisioneQuotidiana';
import SpuntiDiRiflessione from './Pages/FormatPage/spuntiDiRiflessione/SpuntiDiRiflessione';
import SingleSpunto from './Pages/FormatPage/spuntiDiRiflessione/SingleSpunto';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' Component={DefaultLayout}>
          <Route index Component={Home}></Route>
          <Route path='event/:id' Component={SingleEvent}></Route>
          <Route path='allEvents/' Component={AllEvents}></Route>
          <Route path='rubrica/CredereInsieme' Component={CredereInsieme}></Route>
          <Route path='rubrica/CondivisioneQuotidiana' Component={CondivisioneQuotidiana}></Route>
          <Route path='rubrica/SpuntidiRiflessione' Component={SpuntiDiRiflessione}></Route>
          <Route path='rubrica/SpuntidiRiflessione/:id' Component={SingleSpunto}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
