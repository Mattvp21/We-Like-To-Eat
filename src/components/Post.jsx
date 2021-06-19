import { Divider } from "@material-ui/core";
import React, {useState} from "react";
import axios from "axios"



const Post = () => {
    
    var [blogData, setBlogData] = useState([]);
    
   
    

    axios.get("http://localhost:5000/Blogs")
    .then(function (response) {
        // handle success
        console.log("data recieved");
        console.log(response);
        setBlogData(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
        console.log(blogData);
    });
    
    
    return(
        <section className="section-post">

            <div className="container-fluid ">
            <div className="row gx-5">
                {blogData.map(({key, _id, blogTitle, blogImage, blogContent, blogAuthor}, index)=>{
                    return(
                    
                        <div class="card col-md-4 col-sm-6 g-5" style={{width: "40rem"}}>
                        <img src={'../images/' + blogImage} class="card__img-top" alt="..."/>
                        <div class="card__body">
                        <h5 class="card__title">{blogTitle}</h5>
                        <p class="card__text">{blogContent.substring(0,50) + "..."}</p>
                        <a href={'/blog/' + _id} style={{backgroundColor:"lightgray"}} class=".btn btn-secondary btn-outline-light btn-lg ">Read More!</a>
                    
                        
                        
                    </div>
                    </div>
                
                    );
                })}
                </div>
            </div>

        </section>

        
    );
}

export default Post;