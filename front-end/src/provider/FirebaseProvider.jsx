import React, {useState, useEffect} from 'react';
import {fireAuth, fireDB, fireAuthGoogle} from '../firebase';
import firebase from 'firebase/app';

export const firebaseContext = React.createContext()

// #ToDo - Consider adding Sign-In Methods alongside, mostly so that the evaluation of new user is available globally

function FirebaseProvider(props) {
    const [user, setUser] = useState(null);
    const [dataLoad, setDataLoad] = useState({loaded:false, userData:null});
    
    // Authentication listener (Manages current user)
    useEffect(()=> {
        fireAuth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
            setUser(userAuth)
            fireDB.collection("usersTwo").doc(userAuth.uid).get()
            .then((doc)=> {
                doc.exists?
                setDataLoad({loaded: true, userData: doc.data()})
                :
            fireDB.collection("businessesTwo").doc(userAuth.uid).get()
                .then((doc)=> {
                    doc.exists?
                    setDataLoad({loaded: true, userData: doc.data()})
                    :
                    console.log("No such document!");
                })
            }).catch((error) => {
                console.error("Error getting document:", error);
            })
        } else {
            setDataLoad({loaded: true, userData: null})
        }
        })
    }, [])

    // Database Control

    const initializeUser = ({userId,firstName,lastName,email,profileImage}) => {
        fireDB.collection("usersTwo").doc(userId).set({
            firstName: firstName,
            lastName: lastName,
            profile: {
                email: email,
                phone: '',
                aboutMe: '',
                experience:[],
            },
            profileImageSrc:{
                blob: profileImage, 
            },
            accountCreated: firebase.firestore.Timestamp.now(),
            membershipTier: "Basic",
            userUploads: {
                init: false,
            }
        });
    }

    const initializeCompany = ({userId,companyName,email}) => {
        fireDB.collection("businessesTwo").doc(userId).set({
            companyName: companyName,
            profile: {
                email: email,
                companyBio: "We're new to Acumen, watch this space!"
            },
            accountCreated: firebase.firestore.Timestamp.now(),
            membershipTier: "Basic",
            interviewEnvironments: []
        }) 
    }

    // Authentication Control

    const signInWithEmail = event => {
        event.preventDefault();
        const userEmail = event.target.emailRef.value;
        const userPass = event.target.passRef.value;
        fireAuth.signInWithEmailAndPassword(userEmail, userPass)
        .then(userCredential => {
            return userCredential.additionalUserInfo.isNewUser;
        })
        .catch(err => {
            console.error(`${err.code}, ${err.message}`)
        })
    }

    const signInWithGoogle = () => {
        fireAuth.signInWithPopup(fireAuthGoogle)
        .then(userCredential => {
            const {
                user,
                additionalUserInfo:{
                    profile,
                    isNewUser
                }
            } = userCredential

            const userData = {
                userId: user.uid,
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: user.email,
                profileImage: profile.picture
            }
            if (isNewUser === true) {
                initializeUser(userData);
                return isNewUser;
            }
        })
        .catch(err => {
            console.error(`${err.code}, ${err.message}`)
        })
    }

    const registerUserWithEmail = (event,accountType) => {
        event.preventDefault();
        const {
            emailRef:{value:emailRef},
            passRef:{value:passRef},
            firstNameRef:{value:firstNameRef},
            lastNameRef:{value:lastNameRef},
            companyRef:{value:companyRef}
        } = event.target;
        fireAuth.createUserWithEmailAndPassword(emailRef,passRef)
        .then(userCredential => {
            const {
                user,
                additionalUserInfo:{
                    isNewUser
                }
            } = userCredential;

            const userData = {
                userId: user.uid,
                firstName: firstNameRef || '',
                lastName: lastNameRef || '',
                companyName: companyRef || '',
                email: emailRef,
                profileImage: ''
            }
            accountType==='user'?initializeUser(userData):initializeCompany(userData);
            return isNewUser;
        })
        .catch(err => {
            switch (err.code) {
                case 'auth/email-already-in-use':
                  console.error(`Email address ${emailRef} already in use.`);
                  break;
                case 'auth/invalid-email':
                  console.error(`Email address ${emailRef} is invalid.`);
                  break;
                case 'auth/operation-not-allowed':
                  console.error(`Error during sign up.`);
                  break;
                case 'auth/weak-password':
                  console.error('Password is not strong enough. Add additional characters including special characters and numbers.');
                  break;
                default:
                  console.error(err.message);
                  break;
            }
        })
    }

    const processSignOut = () => {
    setDataLoad({...dataLoad, userData: null})
    setUser(null)
    }

    const authControl = {
        signInWithEmail,
        signInWithGoogle,
        registerUserWithEmail,
        processSignOut
    }

    // Auth Administration
    
    const updateEmailAddress = email => {
        fireAuth.currentUser.updateEmail(email).then(function(){
            console.log("Update Successfull");
        }).catch(function(error){
            console.error(error);
        })
    }

    const sendPassReset = event => {
        event.preventDefault();
        fireAuth.sendPasswordResetEmail(event.target.emailRef.value)
        .then(res => {
            return res
        })
        .catch(err => {
            console.error(err)
        })
    }

    const authAdmin = {
        updateEmailAddress,
        sendPassReset
    }

    // Local Data Control
    const dataUpdate = (data) => {
        setDataLoad({loaded: true, userData: data})
        console.log("Local Data was updated");
    }

    function dataCall (userId) {
        return new Promise (resolve => {
            const dataValue = fireDB.collection("usersTwo").doc(userId).get()
            .then((doc)=> {
                return doc.data();
            }).catch((error) => {
                console.error("Error getting document:", error);
            })
            resolve(dataValue);
        })
    }

    return (
        <firebaseContext.Provider value={{
            user,
            dataLoad,
            dataCall,
            dataUpdate,
            authControl,
            authAdmin}}>
            {props.children}
        </firebaseContext.Provider>
    )
}

export default FirebaseProvider