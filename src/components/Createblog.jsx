import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";



const Createblog = () => {
    var [title, setTitle] = useState("");
    var [image, setImage] = useState(null);
    var [content, setContent] = useState("");
    var [author, setAuthor] = useState("");
    var [status, setStatus] = useState("");
    var [subMessage, setSubMessage] = useState("");
    let history = useHistory();

    console.log(image); 
	if(Cookies.get("adminCookie" || "userCookie")){

		console.log("okay!!");

	}
	else{
		history.push(process.env.PUBLIC_URL+"/admin-login");
		console.log("Not okay");
	}

    function handleClick(){
        if(title===""){
            setSubMessage("Please fill the required fields");
        }
        else if(content===""){
            setSubMessage("Please fill the required fields");
        }
        else if(author===""){
            setSubMessage("Please fill the required fields");
        }
        else{
		
            var fd = new FormData();
            if(image !== null){
                fd.append("blogImage", image, image.name);
            }
            else{
                fd = "";
            }
            console.log(fd);
            fd.append("blogTitle",title);
            fd.append("blogContent",content);
            fd.append("blogAuthor",author);
			axios.post("http://localhost:5000/createblog", 
				fd,
			{
				onUploadProgress: ProgressEvent => {
					console.log("Upload Progress "+(ProgressEvent.loaded/ProgressEvent.total)*100 + "%");
				}
			},
			{
				headers: {
						'content-type': 'multipart/form-data'
					}
			})
			.then(function (response) {
				// handle success
				// console.log(JSON.parse(response));
				console.log(response.statusText);
				if(response.statusText==="OK"){
					setStatus("Blog Successfully created!");
					setTitle("");
					setImage(null);
					setContent("");
					setAuthor("");
					setSubMessage("");
					history.push(process.env.PUBLIC_URL + "/Blogs");
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


return (    <div className="createBlogFormDiv">

<h2 color="#59a101">{status}</h2>
<div className="form">
<h1 style={{textAlign: "center"}} className="form__heading">Create a Post</h1>
    <div className="form__group">
    <label className="form__label">Title<span className="star">*</span></label><br />
    <input className="form__input" type="text" onChange={(e)=>{setTitle(e.target.value); setSubMessage(""); setStatus("");}} placeholder="Title" name="blogTitle" value={title} />
    
    </div>

    <div className="form__group">
    <label className="form__label">Image</label><br /><sub>(Ideal Image size: 500x500)</sub>
    <input className="form__input" type="file" onChange={(e) => {setImage(e.target.files[0]); setSubMessage(""); setStatus("");}} name="blogImage"/>
    <label className="form__label">Author<span className="star">*</span></label><br />
    <input className="form__input" type="text" onChange={(e)=>{setAuthor(e.target.value); setSubMessage(""); setStatus("");}} placeholder="Author" name="blogAuthor" value={author} />
    
    </div>

        <div className="form__group">
   <label className="form__label">Content<span className="star">*</span></label>
    <textarea className="form__input" name="blogContent" onChange={(e)=>{setContent(e.target.value); setSubMessage(""); setStatus("");}} cols="30" rows="6" placeholder="Content..." value={content} />
    </div>
      <p className="subMessage"><sub>{subMessage}</sub></p>
      <div className="form__group">
      <button href="/Blogs" className="btn btn-outline-light btn-lg" onClick={handleClick} >Send Message</button>
    </div>
</div>
</div>
);
};


export default Createblog;