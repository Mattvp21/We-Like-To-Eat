import React, {useState} from "react";
import Register from "./Register"



const HomeContent = () => {

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          console.log('enter press here! ')
        }
      }
    
    return (
    <section className="section-homecontent">
        <div className="row">
            <Register onKeyPress={handleKeyPress} />
             <div className="col-lg-6">
                <div className="homecontent__textbox">
                    <h1 className="homecontent__heading">The ultimate place for food blogs!</h1>
                    <p className="homecontent__content">Inspiring great meals since 2021! Subscribe today to start your food blogging/vlogging story!</p>
                </div>
             </div>
         </div>
     </section>
    
    )
}
 
export default HomeContent; 