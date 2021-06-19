import React from "react";
import Header from "./Header"
// eslint-disable-next-line
import Footer from "./Footer"
import Post from "./Post"
import Createblog from "./Createblog"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import About from "./About"
import Contact from "./Contact"
import SingleBlog from "./SingleBlog"
import HomeContent from "./HomeContent"
import Login from "./Login"

import Register from "./Register"

const App = () => {

   

    
    
    
    

return (
    <div>
        
       
    
        <Router>
            <Header />
                <Switch>
                
                    <Route path={process.env.PUBLIC_URL + "/"} exact component={HomeContent} />
                    <Route path={process.env.PUBLIC_URL+"/createblog"} component={Createblog} />
                    <Route path={process.env.PUBLIC_URL+"/about"} component={About} />
                    <Route path={process.env.PUBLIC_URL+"/contact"} component={Contact} />
                    <Route path={process.env.PUBLIC_URL+"/blog/:blogId"} component={SingleBlog} />
                    <Route path={process.env.PUBLIC_URL+"/Blogs"} component={Post} />
                    <Route path={process.env.PUBLIC_URL + "/login"} component={Login} />
                   
                </Switch>
            <Footer />
        </Router>
        
       
        
    </div>
    
    
)
}


export default App;