import React, { useState } from "react";
import axios from "axios";





const SingleBlog = (props) => {

    const [postData, setPostData] = useState("")



axios.get("http://localhost:5000/blog/" + props.match.params.blogId)

.then(function (response) {
   //  handle success
    console.log("Data Recieved")
     console.log(response)
     
setPostData(response.data)
console.log("Post Data: "+ postData)
console.log(props.match.params.blogId) 
})
 .catch(function (error) {
 //handle error
    console.log(error)
 })
.then(function () {
// always executed
   console.log("executed");       
  });
   
     return (

      <section style={{backgroundColor : "wheat"
                        ,padding:"15rem 0"}} className="section-singlepost">
         <div className="row">
         
         <div className="col-lg-6">
         <img style={{width : "350px", 
         height : "350px",
         marginLeft : "5rem"
         }} className="card__image" src={"../images/" + postData.blogImage} alt="post" />
         </div>
         <div className="col-lg-6">
        <h1 style={{color:"black",
                     fontFamily : "poppins",
                     fontWeight : "700"
        }} className="card__title">{ postData.blogTitle }</h1>
        <p>By {postData.blogAuthor}</p>
        <p style={{color:"black",
                     fontFamily : "poppins",}} className="card__text"> {postData.blogContent}</p>
         
        </div>
        </div>               
         
      </section>
      
     )
  
 }




export default SingleBlog;