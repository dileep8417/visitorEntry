import React from "react";
import {Link} from "react-router-dom";

export default function Navbar(){
    return(
        <nav id="navbar">
        <div className="nav"><h6 className="logo">Visitor Entry Software</h6>
        <Link to="/genVisitorReport" id="genReport-btn" className="btn orange white-text">Generate Report</Link>
        </div>
        </nav>
    )
}