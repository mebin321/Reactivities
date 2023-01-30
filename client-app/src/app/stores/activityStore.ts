import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';
import { arrayBuffer } from "stream/consumers";

export default class ActivityStore {
   // activities: Activity[] = [];
   //Insted of using an array use activityRegistry
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
// this -> function will be used in this class
    constructor() {
        makeAutoObservable(this)
            //By making it auto observable we dont have to write the properties inside the constructor, 
            //mobx will do it by itself   
    }

    //computed property that will workout activities in date order
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
         Date.parse(a.date) - Date.parse(b.date));

    }

    //using an arrow function this way automatically binds this function to the class
   loadActivities = async () => {
    try {
            const activities = await agent.Activities.list();
        
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    //this.activities.push(activity); , bottom code can be used instead of this
                    this.activityRegistry.set(activity.id, activity);
            })
          this.setLoadingInitial(false);
    } catch (error) {
        console.log(error);
        this.setLoadingInitial(true);
       
    }
   }

   setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
   }

   selectActivity = (id: string) => {
    //this.selectedActivity = this.activities.find(a => a.id === id);
    this.selectedActivity = this.activityRegistry.get(id);
   }

   cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
   }

   openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
   }

   closeForm = () => {
    this.editMode = false;
   }

   createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
        await agent.Activities.create(activity);
        runInAction(() => {
           // this.activities.push(activity);
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
   }

   updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
        await agent.Activities.update(activity);
        runInAction(() => {
           //this.activities.filter(a => a.id !== activity.id);
           //this.activities.push(activity);
           //The above two lines does the same thing as below, the ...-> operator will create a new array
         //  this.activities = [...this.activities.filter(a => a.id !== activity.id), activity]
           this.activityRegistry.set(activity.id, activity);
           this.selectedActivity = activity;
           this.editMode = false;
           this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
   }

   deleteActivity = async (id: string) => {
    this.loading = true;
    try {
        await agent.Activities.delete(id);
        runInAction(() => {
            //this.activities = [...this.activities.filter(a => a.id !== id)]
            this.activityRegistry.delete(id);
            if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
            this.loading = false;

        })
        
    } catch (error) {
        runInAction(() => {
            this.loading = false;

        })
        
    }

   }



}