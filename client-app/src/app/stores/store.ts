import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore;
}

//created new instance of ActivityStore inside here
export const store : Store = {
    activityStore : new ActivityStore()
}

//As we create more stores, we create more instances of these store which will be available in our react context
export const StoreContext = createContext(store);

//create a react hook that will alow us to use the stores in components
//This will retiurn a store context which contains an abject with activityStore inside
export function useStore() {
    return useContext(StoreContext);
}