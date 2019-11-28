import React,{Component} from "react";
import Form from './form';
import axios from 'axios';
import AllVisitors from "./vistors";
import "./app.css"

export default class App extends Component{
    state={
        visitors:[],
        loading:true,
        count:0
    }
    componentDidMount=()=>{
        this.getVisitors();
    }
    getVisitors=()=>{
        this.setState({
            loading:true
        })
        axios.post("http://localhost:8000/getvisitors").then(resp=>{
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
    render(){
        return(
            <div id="app">
                <div className="nav"><h6>Visitor Entry Software</h6><p className="mail">Dileep8417@gmail.com</p></div>
                <div className="container-fluid">
                    <img src="https://www.goggles4u.com/media/wysiwyg/Homepage/loading.gif" style={{"display":this.state.loading?"block":"none"}} className="loader" alt=""/>
                    <div className="row">
                        <div className="col s4 form">
                        <Form loading={this.state.loading} updateVisitors={this.getVisitors}/>
                        </div>
                        <div className="col s8">
                            {this.state.count?(
                                <AllVisitors updateVisitors={this.getVisitors} visitors={this.state.visitors}/>
                            ):(
                                <div id="list"><div className="head2"><h4>No Visitors</h4></div></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

