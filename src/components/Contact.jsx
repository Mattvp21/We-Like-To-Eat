import React from "react";
import axios from "axios";

const Contact = () => {
    axios.get("http://localhost:5000/contact")

    return (
        
                <div>
                <form className="form">
                    <h2 className="form__heading">Ask us a question</h2>
                        <div className="form__group"> 
                            <label for="username" className="form__label">Username</label>
                            <input id="username" className="form__input" type="text" placeholder="username"  />
                        </div> 

                        <div className="form__group">
                            <label for="email" className="form__label">E-mail</label> 
                            <input id="email" className="form__input" type="email" placeholder="email" />
                        </div>

                         <div className="form__group">
                            <label for="question" className="form__label">Questions</label> 
                            <input id="question" className="form__input" type="text" placeholder="question" />
                            <button style={{marginLeft:"4rem"}} type="submit" class="btn btn-outline-light btn-lg">Register Now!</button>
                         </div>
                     </form>
                </div>
            
    )
}

export default Contact;