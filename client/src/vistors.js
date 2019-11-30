import React,{Component} from "react";
import axios from "axios";

export default class AllVisitors extends Component{
    state={
        loading:false
    }
    remove = (id)=>{
        this.setState({
            loading:true
        });
        axios.post("/delete/"+id).then(resp=>{
            this.props.updateVisitors();
        }).catch(err=>console.log(err)).finally(()=>{
            this.setState({
                loading:false
            });
        });
    }
    
     fetchVisitors = ()=>{
        const data = this.props.visitors;
        const visitors =  data.map((visitor,index)=>{
          return(
              <tr key={index}>
                  <td className="center-align">{index+1}</td>
                  <td>{visitor.visitorName}</td>
                  <td>{visitor.hostName}</td>
                  <td>{visitor.visitorMobile}</td>
                  <td>{visitor.hostMobile}</td>
                  <td>{this.props.splitDate(visitor.entered)}</td>
                  <td>{visitor.purpose}</td>
                  <td><a href={visitor["_id"]} onClick={(e)=>{e.preventDefault();if(window.confirm(`Is ${visitor.visitorName}'s visit over?`)){this.remove(visitor["_id"])}}}>Visit Over</a></td>
              </tr>
          )
      });
        
      return visitors;
     }
     
   render(){
    return(
        <div id="list">
            <img src={this.props.img} className="loader" style={{"display":this.state.loading?"block":"none"}} alt=""/>
                {
                    this.props.visitors.length?(
                        <div>
                    <div className="head2"><h4>Visitors</h4></div>
                    <table className="table">
                        <tbody>
                            <tr className="blue lighten-2 white-text">
                                <th>S.No.</th>
                                <th>Visitor Name</th>
                                <th>Host Name</th>
                                <th>Visitor Mobile No.</th>
                                <th>Host Mobile No.</th>
                                <th>Entered</th>
                                <th>Purpose</th>
                                <th>Option</th>
                            </tr>
                            {this.fetchVisitors()}
                        </tbody>
                    </table>
                </div>
                    ):(<h4 className="red-text lighten-2">No Visitors</h4>)
                }
        </div>
    )
   }
}