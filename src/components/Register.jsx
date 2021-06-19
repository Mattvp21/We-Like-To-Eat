import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";



const Register = () => {
    var [email, setEmail] = useState("");
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [subMessage, setSubMessage] = useState("");
    var [status, setStatus] = useState('');
    let history = useHistory();

    const handleClick = (event) => {
        if (email === '') {
            setSubMessage("Please Fill in the Required Fields")
        } else if (username === '') {
            setSubMessage("Please Fill in the Required Fields") 
        } else if (password === '') {
            setSubMessage("Please Fill in the Required Fields")
        } else {
            var fd = new FormData();
          
            fd.append("email",email);
            fd.append("username", username);
            fd.append("password", password);
            console.log(fd);
            axios.post("http://localhost:5000/user-register",
            {email: email,
            username: username,
            password:password})
            .then(function (response) {
                // handle success
                // console.log(JSON.parse(response));
                console.log(response.statusText);
                if(response.statusText==="OK"){
                    setStatus("Successfully Registered!");
                    console.log(response.data);
                    setSubMessage("");
                    setEmail('');
                     setUsername('');
                    setPassword('');
                    
                }
        else{
                    setStatus("Something went wrong");
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
                window.scrollTo(500, 0);
               
            })
          
        }
       
    }

    return (
        <div className="col-lg-6">
        
                <div className="homecontent">
                <div className="form">
                <h1>{status}</h1>
                    <h1 className="form__heading">Register Now</h1>
                        <div className="form__group"> 
                            <label htmlFor="email" className="form__label">E-mail</label>
                            <input onChange={(e) => 
                            {setEmail(e.target.value); 
                            setSubMessage('');}} id="email" name="email" className="form__input" type="email" placeholder="username" value={email} />
                        </div> 

                        <div className="form__group"> 
                            <label htmlFor="username" className="form__label">Username</label>
                            <input onChange={(e) => 
                            {setUsername(e.target.value); 
                            setSubMessage('');}}id="username" name="username" className="form__input" type="text" placeholder="username" value={username}  />
                        </div> 

                        <div className="form__group">
                            <label htmlFor="password" className="form__label">Password</label> 
                            <input onChange={(e) => 
                            {setPassword(e.target.value); 
                            setSubMessage('');}} id="password" name="password" className="form__input" type="password" placeholder="password" value={password} />
                            <button onClick={handleClick}  style={{marginLeft:"4rem"}}  className="btn btn-outline-light btn-lg"><a href="/createblog">Register Now!</a></button>
                         </div>
                     </div>
                </div>
             </div>
    )
}

export default Register