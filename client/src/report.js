import React,{Component} from "react";
import axios from "axios";

export default class Report extends Component{
    state = {
        visitorsLog:[],
        loading:true
    }
    componentDidMount=()=>{
        //send request for getting visitors
        axios.post("/genreport").then(res=>{
            this.setState({
                visitorsLog:res.data.reverse()
            });
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            this.setState({
                loading:false
            })
        });
    }
    render(){
        return(
            <div className="container-fluid" id='report'>
            <img src={this.props.img} className="loader" style={{"display":this.state.loading?"block":"none"}} alt=""/>

                {this.state.visitorsLog.length?(
                    <div>
                        <table className="table" id='report-table'>
                        <thead>
                            <tr className="teal lighten-2 white-text">
                            <th>S.No</th>
                            <th>Visitor Name</th>
                            <th>Host Name</th>
                            <th>Purpose of Meeting</th>
                            <th>Date</th>
                            <th>Entered Time</th>
                            <th>Leaved Time</th>
                            <th>Visitor Email</th>
                            <th>Visitor Mobile No.</th>
                            <th>Host Email</th>
                            <th>Host Mobile No.</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.visitorsLog.map((visitor,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{visitor.visitorName}</td>
                                        <td>{visitor.hostName}</td>
                                        <td>{visitor.purpose}</td>
                                        <td>{visitor.entered.split(",")[0]}</td>
                                        <td>{this.props.splitDate(visitor.entered)}</td>
                                        <td>{visitor.leaved}</td>
                                        <td>{visitor.visitorEmail}</td>
                                        <td>{visitor.visitorMobile}</td>
                                        <td>{visitor.hostEmail}</td>
                                        <td>{visitor.hostMobile}</td>
                                    </tr>
                                  )
                                })
                            }
                        </tbody>
                    </table>
                    </div>
                ):(<h3 className="orange-text">No Previous Visitors Entry Found.</h3>)}
            </div>
        )
    }
}