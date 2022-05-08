import { createContext, useContext, useReducer, useEffect } from "react";
import {db} from "config/firebase-config";
import {
    updateDoc,
    doc,
    collection,
    onSnapshot,
    setDoc
  } from "firebase/firestore";
  import {myPullsReducer} from "reducer";
import {useAuth} from "./auth-context";

const MyPullsContext = createContext(null);

const initialState = {
    myPulls:[],
    userInfo: {
        gitUser:"",
        pod:"",
        team:"",
        reviewScore:0
    }
};

const MyPullsProvider = ({ children }) => {
    const [myPullsState, myPullsDispatch] = useReducer(myPullsReducer, initialState);
    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            const unsubscribe1 = onSnapshot(
                collection(db, "users", `${user.uid}`, "myPulls"),
                (snapshot) => {
                myPullsDispatch({
                    type: "SET_MY_PULLS",
                    payload: snapshot.docs.map((doc) => ({
                    ...doc.data()
                    })),
                });
                }
            );

            const unsubscribe2 = onSnapshot(
                doc(db, "users", user.uid),
                (snapshot) => {
                    myPullsDispatch({
                    type: "SET_USER_INFO",
                    payload: snapshot.data().userInfo ?? initialState.userInfo
                  });
                }
            );

            return () => {
                unsubscribe1();
                unsubscribe2();
            }
        }
    },[user]);

    const addToMyPulls = async(pullObj) => {
        try{
            await setDoc(doc(db, "users", `${user.uid}`, "myPulls", pullObj.id), pullObj);
        }
        catch(err){
            console.error(err);
        }
    };
  
    const updateMyPulls = async(pullObj) => {
        try{
            await updateDoc(doc(db, "users", `${user.uid}`, "myPulls", pullObj.id), pullObj);
        }
        catch(err){
            console.error(err);
        }
    };
  
    const addUserInfo = async(userInfoObj) => {
        const userInfoRef = doc(db, "users", `${user.uid}`);
        try{
            await setDoc(userInfoRef, {userInfo: {...userInfoObj}});
        }
        catch(err){
            console.error(err);
        }
    };

    return (
        <MyPullsContext.Provider value={{ 
            myPullsState, myPullsDispatch, 
            addToMyPulls, addUserInfo, updateMyPulls }}>
            {children}
        </MyPullsContext.Provider>
    );
};

const useMyPulls = () => useContext(MyPullsContext);

export { useMyPulls, MyPullsProvider };