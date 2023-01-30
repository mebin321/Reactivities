import React, { useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  //destructuring activityStore object since we are only interested in that
const {activityStore} = useStore(); 
  //activities(variable) will store data & setActivities will set data
  //activities is of type Activity

// will get the data from endpoint and then store it in variable (activities)
//[] -> will prevent the useEffect from getting fired again and again
useEffect(()=> {
  activityStore.loadActivities();
}, [activityStore])

if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>
//what we render into the browser
  return (
  <>
     <NavBar/>
     <Container style={{marginTop: '7em'}}>
       <ActivityDashboard /> 
     </Container>
 </>
  );
}
//this will make the app component observe the observables
export default observer(App);
