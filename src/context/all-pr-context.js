import { createContext, useContext, useReducer, useEffect } from "react";
import {db} from "config/firebase-config";
import {
    updateDoc,
    doc,
    deleteDoc,
    collection,
    onSnapshot,
    setDoc
  } from "firebase/firestore";
  import {allPullsReducer} from "reducer";
import {useAuth} from "./auth-context";

const AllPullsContext = createContext(null);

const AllPullsProvider = ({ children }) => {
    const [allPullsState, allPullsDispatch] = useReducer(allPullsReducer, []);
    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            const unsubscribe = onSnapshot(
                collection(db, "allPulls"),
                (snapshot) => {
                allPullsDispatch({
                    type: "SET_ALL_PULLS",
                    payload: snapshot.docs.map((doc) => ({
                    ...doc.data()
                    })),
                });
                }
            );

            return () => unsubscribe();
        }
    },[user]);

    const addToAllPulls = async(pullObj) => {
        try{
            await setDoc(doc(db, "allPulls", pullObj.id), pullObj);
        }
        catch(err){
            console.error(err);
        }
    };
  
    const updateAllPulls = async(pullObj) => {
        try{
            await updateDoc(doc(db, "allPulls", pullObj.id), pullObj);
        }
        catch(err){
            console.error(err);
        }
    };
  
    const deleteFromAllPulls = async(pullObj) => {
        try{
            await deleteDoc(doc(db, "allPulls", pullObj.id));
        }
        catch(err){
            console.error(err);
        }
    };

    return (
        <AllPullsContext.Provider value={{ 
            allPullsState, allPullsDispatch, 
            addToAllPulls, updateAllPulls, deleteFromAllPulls }}>
            {children}
        </AllPullsContext.Provider>
    );
};

const useAllPulls = () => useContext(AllPullsContext);

export { useAllPulls, AllPullsProvider };