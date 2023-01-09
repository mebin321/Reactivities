import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';

function App() {
  //activities(variable) will store data & setActivities will set data
const [activities, setActivities] = useState([]);

// will get the data from endpoint and then store it in variable (activities)
//[] -> will prevent the useEffect from getting fired again and again
useEffect(()=> {
  axios.get('http://localhost:5000/api/activities')
  .then(response => {
    setActivities(response.data);
  })
}, [])

//what we render into the browser
  return (
    <div>
     <Header as='h2' icon='users' content='Reactivities'/>
        <List>
          {activities.map((activity : any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
       
      
    </div>
  );
}

export default App;
