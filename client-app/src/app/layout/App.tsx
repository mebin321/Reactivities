import React, { useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/Homepage';

function App() {
//what we render into the browser
//when we load a route the outlet gets swapped with the actual component thta we are loading
//eg. when we load activities, outlet will be swapped with activitydashboard

//this will give the path of which url the user has gone to
const location = useLocation();
  return (
   <>
     {location.pathname === '/' ? <HomePage /> : (
      <>
     <NavBar/>
     <Container style={{marginTop: '7em'}}>
       <Outlet /> 
     </Container>
      </>
     )}   
    </>
  );
}
//this will make the app component observe the observables
export default observer(App);
