import React from 'react';
import ReactDOM from 'react-dom';
import WS from './WS';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
var { SchemaForm} = require('react-schema-form');
//import SchemaForm from 'react-schema-form';
import Utils from 'react-schema-form/lib/utils';
class WSForm extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state={
            schema: null,
            formData:{},
            model:{},
            validationResult:null
        };
        this.handleData=this.handleData.bind(this);
        this.onModelChange=this.onModelChange.bind(this);
        this.sendMessage=this.sendMessage.bind(this);
        this.submitForm=this.submitForm.bind(this);
    }
    componentWillUnmount(){
        this.setState({
            schema:null
        });
    }
    handleData(data){
        if(data.$schema){
            this.setState({
                schema:data
            });
        }
        else{
            this.props.onMessage(data);
        }
    }
    onModelChange(key, value){
        var newModel = this.state.model;
        Utils.selectOrSet(key, newModel, value);
        this.setState({ model: newModel });
    }
    sendMessage(){
        return this.state.model;
    }
    submitForm(){
        let result = Utils.validateBySchema(this.state.schema, this.state.model);
        var self=this;
        this.setState({ validationResult: result.Error?false:true}, function(){
            self.setState({ validationResult:false});
        });
    }
    render(){
        if(this.state.schema&&this.props.url){
            return(
                <div>
                    <WS url={this.props.url} onMessage={this.handleData} sendMessage={this.sendMessage} send={this.state.validationResult}/>
                    <SchemaForm  schema={this.state.schema} onModelChange={this.onModelChange} />
                    <RaisedButton onTouchTap={this.submitForm}>Submit</RaisedButton>
                </div>
            );
        }
        else{
            if(this.props.url){
                return(
                    <div>
                        <WS url={this.props.url} onMessage={this.handleData} sendMessage={this.sendMessage} send={this.state.validationResult}/>
                        <CircularProgress />
                    </div>
                    
                );
            }
            else{
               return(
                    <CircularProgress />
                ); 
            }
            
        }
    }
}
export default WSForm;