import React from "react";
import axios from "axios";


const About = () => {


   
    axios.get("http://localhost:5000/about%22");
    
        
    return (
        <section className="section-aboutcontent">
                <div className="aboutcontent">
                <div className="form">
                    <h1 className="form__heading">Our mission!</h1>
                    <p style={{textAlign: "center"}} className="form__label">We Like to Eat is an Open Source Project, dedicated to helping the food industry get back on it's feet after the COVID-19 pandemic!
                    This is a platform for people to create their own food blogs and vlogs. We will be continuously making improvements to this website as time goes on. If you would like to see a new feature, please feel free to contact us and let us know! Happy Blogging!
                    </p>
                </div>
                </div>
            
             
                
     </section>
    )
}

export default About; 