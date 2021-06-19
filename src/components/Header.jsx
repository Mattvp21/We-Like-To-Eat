import React from "react";


const Header = () => {
    return (
        <nav className="navbar navbar-default">
    <div className="container">
      <div className="navbar-header">
        <p className="navbar-brand">We Like to Eat</p>
      </div>
        <ul className="nav navbar-nav navbar-right">
          <li id="home"><a href="/">HOME</a></li>
          <li id="about"><a href="/about">ABOUT US</a></li>
          <li id="contact"><a href="/contact">CONTACT US</a></li>
          <li id="blogs"><a style={{fontSize: "2rem"}}  href="/Blogs">BLOGS</a></li>
          <li id="createblog"><a style={{fontSize: "2rem"}} href="/createBlog">Create a Post</a></li>
          <li id="login"><a style={{fontSize: "2rem"}} href="/login">Login</a></li>
        </ul>
    </div>
  </nav>
    )
}

export default Header;