import React, {useState} from "react";
import axios from "axios";
import {route, Redirect, useHistory} from "react-router-dom";
import Cookies from "js-cookie";


const Login = () => {

    var [username, setUserName] = useState("");
    var [password, setPassword] = useState("");
    var [status, setStatus] = useState("");
    var [fieldWarning, setFieldWarning] = useState("");
    let history = useHistory();

    function handleClick(){
        
        //Cookies.set("adminCookie",'THIS IS A TEST' ,{ path: '/' });

        console.log("I got clicked");
        if(username===""){
            console.log("Please enter username");
            setFieldWarning("Please fill the required fields");
        }
        else if(password===""){
            console.log("Please enter password");
            setFieldWarning("Please fill the required fields");
        }
        else{
            var data = {
                username: username,
                password: password
            }
            console.log("Posting login");
             axios.post("http://localhost:5000/login",{
                username: username,
                password: password
            },{withCredentials: true, crossorigin: true})
            .then(function (response) {
                console.log(response);
				//Cookies.set("adminCookie", response.data.auth, { path: '/' });
				console.log("Session ID: "+ response.auth);
                console.log(response.statusText);
                console.log("Login Front End Post req Response Data: "+response.data);
                if(response.data.message==="Successfully authenticated"){
					if(response.data.userRole==="admin"){
						Cookies.set("adminCookie", response.data.auth, { path: '/' });
					//	setInterval(1000, history.push(process.env.PUBLIC_URL+"/admin-panel"));
					}
					else if(response.data.userRole==="user"){
						Cookies.set("userCookie", response.data.auth, { path: '/' });
                      //  setInterval(1000, history.push(process.env.PUBLIC_URL+"/user-dashboard"));
					}
                    setStatus("Login Successful!");
                    setUserName("");
                    setPassword("");
                    setFieldWarning("");
                    // window.scrollTo(500, 0);
                    // <Redirect to={process.env.PUBLIC_URL} />
                }
                else if(response.data==="User not found"){
                    setFieldWarning("User not found");
                    // window.scrollTo(500, 0);
                }
                else{
                    setStatus("Something went wrong");
                    window.scrollTo(500, 0);
                }
                console.log("Sucessfully Executed");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
                console.log("Executed");
            });
        }
    }

    return (
        <div>
                <div className="form">
                    <h2 className="form__heading">Login</h2>
                        <div className="form__group"> 
                            <label for="username" className="form__label">Username</label>
                            <input 
                            id="username" 
                            onChange={(e)=>{setUserName(e.target.value); setFieldWarning("");}} 
                            className="form__input" 
                            type="text" 
                            placeholder="username" 
                            value={username} />
                        </div> 

                        <div className="form__group">
                            <label for="password" className="form__label">Password</label> 
                            <input 
                            id="password"
                            className="form__input" 
                            onChange={(e)=>{setPassword(e.target.value); setFieldWarning("");}} 
                            type="password"
                            placeholder="password" 
                            value={password}    
                            />
                            <p style={{fontSize: "3rem", color: "white"}} className="subMessage"><sub>{fieldWarning}</sub></p>
                            <button onClick={handleClick} style={{marginLeft:"4rem"}} type="submit" class="btn btn-outline-light btn-lg">Login</button>
                         </div>

                     </div>
                </div>
    )
}

export default Login
