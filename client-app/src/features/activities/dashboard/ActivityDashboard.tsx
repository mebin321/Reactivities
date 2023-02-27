import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';

//inorder to import activities from app.tsx we create an interface
export default observer(function ActivityDashboard() {
    //destructuring activityStore object since we are only interested in that
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;



//activities(variable) will store data & setActivities will set data
//activities is of type Activity

// will get the data from endpoint and then store it in variable (activities)
//[] -> will prevent the useEffect from getting fired again and again
useEffect(()=> {
if (activityRegistry.size <= 1) loadActivities();
}, [loadActivities, activityRegistry.size])

if (activityStore.loadingInitial) return <LoadingComponent content='Loading app...'/>

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
})