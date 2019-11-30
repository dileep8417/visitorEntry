import React,{Component} from "react";
import axios from 'axios';

export default class Form extends Component{
    state = {
        visitor:"",
        email:"",
        mobile:"",
        purpose:"",
        hostName:"",
        hmobile:"",
        hemail:"",
        loading:false
    }
    handleChange = (event)=>{
        var name = event.target.name;
        var value = event.target.value;
        value.charAt(0).toUpperCase();
        this.setState({
            [name]:value
        });
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        this.setState({
            loading:true
        });
        axios({
            url:"/form",
            method:"post",
            data:this.state
        }).then(resp=>{
            console.log(JSON.stringify(resp.data));
            this.props.updateVisitors();
        }).catch(err=>{
            console.log("Error in transmiting the data"+err);
        }).finally(()=>{
            this.setState({
                visitor:"",
                email:"",
                mobile:"",
                purpose:"",
                hostName:"",
                hemail:"",
                hmobile:"",
                loading:false
            });
        });
    }
    render(){
        return(
            <div id="">
                
                <div className="form">
                <div className="head1"> <h4>Add Visitor</h4></div>
                <form action="" method="post">
                    <table className="table visitor-info">
                        <tbody>
                        <tr>
                            <td><input placeholder="Visitor Name" value={this.state.visitor} onChange={this.handleChange} type="text" name="visitor"/></td>
                            <td><input placeholder="Host Name" value={this.state.hostName} onChange={this.handleChange} type="text" name="hostName"/></td>
                        </tr>
                        <tr>
                            <td><input placeholder="Visitor EmailID" value={this.state.email} onChange={this.handleChange} type="text" name="email"/></td>
                            <td><input placeholder="Host EmailID" value={this.state.hemail} onChange={this.handleChange} type="text" name="hemail"/></td>
                        </tr>
                        <tr>
                            <td><input placeholder="Visitor Mobile No." value={this.state.mobile} onChange={this.handleChange} type="text" name="mobile"/></td>
                            <td><input placeholder="Host Mobile No." value={this.state.hmobile} onChange={this.handleChange} type="text" name="hmobile"/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><textarea placeholder="Purpose of Visit" value={this.state.purpose} onChange={this.handleChange}  name="purpose" id="" cols="30" rows="10"></textarea></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input className="btn submit" onClick={this.handleSubmit} disabled={this.state.loading} type="submit" name="submit"/></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                </div>
            </div>
        )
    }
}
