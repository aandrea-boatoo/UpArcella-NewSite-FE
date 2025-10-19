import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga4';
import DefaultLayout from './Layout/DefaultLayout';
import SingleEvent from './Pages/EventPage/SingleEvent';
import AllEvents from './Pages/EventPage/AllEvents';
import Home from './Pages/Home';
import CredereInsieme from './Pages/FormatPage/CredereInsieme';
import CondivisioneQuotidiana from './Pages/FormatPage/CondivisioneQuotidiana';
import SpuntiDiRiflessione from './Pages/FormatPage/spuntiDiRiflessione/SpuntiDiRiflessione';
import SingleSpunto from './Pages/FormatPage/spuntiDiRiflessione/SingleSpunto';
import ActivityGroup from './Pages/ActivitiesPage/ActivityGroup';
import SingleActivity from './Pages/ActivitiesPage/SingleActivity';
import OwnerPage from './Pages/AccessPage/OwnerPage';
import Authenticator from './Pages/AccessPage/Authenticator';
import ScrollToTop from './Components/ScrollToTop';
import Contacts from './Pages/Contacts';
import usePageTracking from './Layout/usePageTracking'

function App() {
  ReactGA.initialize("G-1P6BJVNLCQ")
  ReactGA.send("pageview");
  return (

    <BrowserRouter>
      <ScrollToTop />
      <PageTracker />;
      <Routes>
        <Route path='/' Component={DefaultLayout}>
          <Route index Component={Home}></Route>
          <Route path='event/:id' Component={SingleEvent}></Route>
          <Route path='allEvents/' Component={AllEvents}></Route>
          <Route path='rubrica/CredereInsieme' Component={CredereInsieme}></Route>
          <Route path='rubrica/CondivisioneQuotidiana' Component={CondivisioneQuotidiana}></Route>
          <Route path='rubrica/SpuntidiRiflessione' Component={SpuntiDiRiflessione}></Route>
          <Route path='rubrica/SpuntidiRiflessione/:id' Component={SingleSpunto}></Route>
          <Route path='activities' Component={ActivityGroup}></Route>
          <Route path='activities/:id' Component={SingleActivity}></Route>
          <Route path='owner' Component={OwnerPage}></Route>
          <Route path='auth' Component={Authenticator}></Route>
          <Route path='contatti' Component={Contacts}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function PageTracker() {
  usePageTracking();
  return null;
}

export default App
