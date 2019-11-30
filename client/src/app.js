import React,{Component} from "react";
import Form from './form';
import axios from 'axios';
import AllVisitors from "./vistors";
import Navbar from "./navbar";
import {BrowserRouter,Route} from "react-router-dom";
import "./app.css"
import Report from "./report";

export default class App extends Component{
    state={
        visitors:[],
        loading:true,
        count:0,
        imgUrl:"https://www.goggles4u.com/media/wysiwyg/Homepage/loading.gif"
    }
    componentDidMount=()=>{
        this.getVisitors();
    }
    getVisitors=()=>{
        this.setState({
            loading:true
        })
        axios.post("/getvisitors").then(resp=>{
            const data = resp.data;
            this.setState({
                visitors:data.reverse(),
                count:data.length
            });
        }).catch(err=>{
            console.log(err);
        }).finally(()=>{
            this.setState({
                loading:false
            })
        });
    }
    splitDate = (edate)=>{
        edate = edate.split(",")[1];
        let hrs = edate.split(":")[0];
        edate = edate.split(":");
        edate[0] = hrs>12?hrs-12:hrs;
        edate = edate.join(":");
        return edate.concat(hrs>12?" PM":" AM");
    }
   
    render(){
        return(
            <BrowserRouter>
            <div id="app">
            <img src={this.state.imgUrl} style={{"display":this.state.loading?"block":"none"}} className="loader" alt=""/>
                <div className="container-fluid">
                    <Route path="/" component={Navbar} />
                    <Route path="/genVisitorReport"  render={()=><Report splitDate={this.splitDate} img={this.state.imgUrl}/>}/>
                    <div className="row">
                        <div className="col s4">
                            <Route exact path="/" render={()=>{return <Form loading={this.state.loading} updateVisitors={this.getVisitors}/>}} />
                        </div>
                        <div className="col s8">
                            <Route exact path="/" render={()=><AllVisitors splitDate={this.splitDate} img={this.state.imgUrl} updateVisitors={this.getVisitors} visitors={this.state.visitors}/>}/>
                        </div>
                    </div>

                </div>
            </div>
            </BrowserRouter>
        )
    }
}

