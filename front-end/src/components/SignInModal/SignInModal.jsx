import React, { useState,useContext } from 'react';
import {firebaseContext} from '../../provider/FirebaseProvider';
import ActionClose from '../ActionClose/ActionClose';
import googleIcon from '../../assets/icons/btn_google.svg';
import linkedinIcon from '../../assets/icons/btn_linkedIn.svg';
import passHidIcon from '../../assets/icons/visibility_off.svg';
import passVisIcon from '../../assets/icons/visibility.svg';
import './SignInModal.scss';

function SignInModal({loginModalClose}) {
    const [modalState,setModalState] = useState('login');
    const [accountType,setAccountType] = useState('user');
    const [passState,setPassState] = useState({passVisible:false,passVal:true})
    const {authControl,authAdmin} = useContext(firebaseContext)
    
    const loginUser = event => {
        authControl.signInWithEmail(event)
        .then(isNewUser => {
            loginModalClose(isNewUser);
        })
    }

    const loginGoogle = () => {
        authControl.signInWithGoogle()
        .then(isNewUser => {
            loginModalClose(isNewUser);
        })
    }

    const registerUser = (event,accountType) => {
        authControl.regiserUserWithEmail(event,accountType)
        .then(isNewUser => {
            loginModalClose(isNewUser);
        })
    }

    const passwordValidation = () => {
        setPassState({
            ...passState,
            passVal: document.querySelector('#passRef').value === document.querySelector('#confirmPassRef').value
        })
    }

    const toggleAccountType = () => {
        accountType === "user"?
        setAccountType("business"):setAccountType("user")
    }

    return (
        <div className="account">
            <div className="account__container">
                <div className="account__container-close" onClick={()=>{loginModalClose()}}>
                    <ActionClose/>
                </div>
                <h2 className="account__container-heading">
                    {modalState==="login"?"Let's get you signed in":
                    modalState==="register"?"Let's get you signed up":"Let's reset that password"}
                </h2>
                {modalState==="register" &&
                <div className="account__container-type" onClick={()=>{toggleAccountType()}}>
                    <div className={`account__container-type-toggle${accountType==="user"?"--active":""}`}>User</div>
                    <div className={`account__container-type-toggle${accountType==="business"?"--active":""}`}>Business</div>
                </div>
                }
                <form className="account__container-form" onSubmit={(event)=>{
                    passState.passVal !==false &&
                    modalState==="login"?loginUser(event):
                    modalState==="register"?registerUser(event,accountType):authAdmin.sendPassReset(event)
                }}>
                    {modalState==="register" &&
                        <>
                        {accountType==="user"?
                            <>
                                <input type="text" className="account__container-form-field" id="firstNameRef" required placeholder="First Name"/>
                                <input type="text" className="account__container-form-field" id="lastNameRef" required placeholder="Last Name"/>
                            </>
                        :
                        <input type="text" className="account__container-form-field" id="companyRef" required placeholder="Company Name"/>
                        }
                        </>
                    }
                    <input type="email" className="account__container-form-field" id="emailRef" required placeholder="Email"/>
                    {modalState!=="reset" &&
                        <div className="account__container-form-passcontainer">
                            <input type={passState.passVisible===false?"password":"text"} className="account__container-form-field"
                                id="passRef" required placeholder="Password"
                                onKeyUp={()=>{modalState!=="login" && passwordValidation()}}/>
                            <img src={passState.passVisible===false?passHidIcon:passVisIcon} className="account__container-form-passvis" alt="password visibility toggle"
                                onMouseDown={()=>{setPassState({...passState,passVisible: true})}}
                                onMouseUp={()=>{setPassState({...passState,passVisible: false})}}
                            />
                        </div>
                    }
                    {modalState==="register" &&
                        <div className="account__container-form-passcontainer">
                            <input type={passState.passVisible===false?"password":"text"} className="account__container-form-field"
                                id="confirmPassRef" required placeholder="Confirm Password"
                                onKeyUp={()=> {passwordValidation()}}/>
                            <img src={passState.passVisible===false?passHidIcon:passVisIcon} className="account__container-form-passvis" alt="password visibility toggle" 
                                onMouseDown={()=>{setPassState({...passState,passVisible: true})}}
                                onMouseUp={()=>{setPassState({...passState,passVisible: false})}}
                            />
                            {passState.passVal===false && <p className="account__container-form-passval">Sorry, your passwords don't match.</p>}
                        </div>
                    }
                    <button type="submit" className="account__container-form-submit">
                        {
                            modalState==="login"?
                                "Sign In":modalState==="register"?
                                    "Sign Up":"Request Reset Email"
                        }
                    </button>
                </form>
                <div className="account__container-redirect">
                    {modalState==="login" && 
                    <p className="account__container-redirect-forgot" onClick={()=>{setModalState("reset")}}>Forget your password?</p>}
                    <p className="account__container-redirect-register" 
                        onClick={()=>{modalState==="login"?
                        setModalState("register")
                        :
                        setModalState("login");
                        setPassState({...passState,passVal:true});
                        setAccountType("user")}}
                    >
                        {modalState==="login"?
                        "Not a member yet?":modalState==="reset"?"Return to login":"Already a member?"}
                    </p>
                </div>
                {modalState!=="reset" &&
                <>
                {accountType!=="business" &&
                <>
                    <div className="account__container-or">
                        <hr/><span>OR</span><hr/>
                    </div>
                    <h4 className="account__container-alt">Continue with:</h4>
                    <div className="account__container-providers">
                        <img src={googleIcon} onClick={()=>{loginGoogle()}} alt="login with google button"/>
                        <img src={linkedinIcon} onClick={()=>{loginGoogle()}} alt="login with linkedIn button"/>
                    </div>
                </>
                }
                </>
                }
            </div>
        </div>
    )
}

export default SignInModal
