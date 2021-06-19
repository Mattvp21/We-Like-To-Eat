import React from "react"; 

const date = new Date().getFullYear();

const Footer = () => {
    return (
       <div className="footer">
            <p className="footer__text">©️ {date} Matthew Van Pelt </p>
        </div>
    )
}

export default Footer