import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { link } from 'fs';

export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {selectedActivity, createActivity, updateActivity,
         loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    function handleSubmit() {
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    //This function will handle the updated input into the EditForm
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        //event.target will fetch the the values fed to the textbox & store in name & value
        const {name, value} = event.target;
        //...-> spread the existing properties of activity
        setActivity({...activity, [name]: value})

    }

    if (loadingInitial) return <LoadingComponent content ='Loading Activity...'/>

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description'  value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category'  value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date'  value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City'  value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue'  value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='submit'/>
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>    
            </Form>
        </Segment>
    )
})