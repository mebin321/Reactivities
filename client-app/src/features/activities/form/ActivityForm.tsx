import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void
    createOrEdit: (activity: Activity) => void
    submitting: boolean
}
export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit, submitting}: Props) {

    //we will populate our initial state and store it inside our component state
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
    }

    //This function will handle the updated input into the EditForm
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        //event.target will fetch the the values fed to the textbox & store in name & value
        const {name, value} = event.target;
        //...-> spread the existing properties of activity
        setActivity({...activity, [name]: value})

    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description'  value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category'  value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date'  value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City'  value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue'  value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='cancel'/>    
            </Form>
        </Segment>
    )
}