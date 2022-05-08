import { createContext, useContext, useReducer, useEffect } from "react";
import {db} from "config/firebase-config";
import {
    addDoc,
    collection,
    onSnapshot
  } from "firebase/firestore";
  import {reviewedPullsReducer} from "reducer";
import {useAuth} from "./auth-context";

const ReviewedPullsContext = createContext(null);

const ReviewedPullsProvider = ({ children }) => {
    const [reviewedPullsState, reviewedPullsDispatch] = useReducer(reviewedPullsReducer, []);
    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            const unsubscribe = onSnapshot(
                collection(db, "users", `${user.uid}`, "reviewedPulls"),
                (snapshot) => {
                reviewedPullsDispatch({
                    type: "SET_REVIEWED_PULLS",
                    payload: snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                    })),
                });
                }
            );

            return () => unsubscribe();
        }
    },[user]);

    const addToReviewedPulls = async(pullObj) => {
        try{
            await addDoc(collection(db, "users", `${user.uid}`, "reviewedPulls"), pullObj);
        }
        catch(err){
            console.error(err);
        }
    };

    return (
        <ReviewedPullsContext.Provider value={{ 
            reviewedPullsState, reviewedPullsDispatch, 
            addToReviewedPulls }}>
            {children}
        </ReviewedPullsContext.Provider>
    );
};

const useReviewedPulls = () => useContext(ReviewedPullsContext);

export { useReviewedPulls, ReviewedPullsProvider };