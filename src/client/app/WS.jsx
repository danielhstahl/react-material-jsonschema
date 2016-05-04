import React from 'react';
import ReactDOM from 'react-dom';
var WS=React.createClass({
    getInitialState:function(){
        return {
            ws: new WebSocket(this.props.url)
        }
    },
    addListener:function(){
        var self = this;
        var ws = self.state.ws;
        ws.onopen=function(){
            ws.addEventListener('message', function incoming(event) {
                var data = JSON.parse(event.data);//.replace(/date-time/g, "date")
                console.log(data);
                self.props.onMessage(data);
                self.sendMessage(self.props.send, self.props.sendMessage);
            });
        }
        
    },
    sendMessage:function(shouldSend, message){
        //console.log(shouldSend);
        if(shouldSend){
            this.state.ws.send(JSON.stringify(message()));
        }
    },
    componentWillMount: function () {
        this.addListener();
    },
    componentWillReceiveProps:function(nextProps){
        if(nextProps.url!==this.props.url){
            this.state.ws.close();
            this.setState({
                ws: new WebSocket(nextProps.url)
            }, function(){
                this.addListener();
            });
        }
        else{
            this.sendMessage(nextProps.send, nextProps.sendMessage);
        }
        
    },
    componentWillUnmount: function () {
        this.state.ws.close();
    },
    render:function(){
        return null;//React.createElement("div", React.__spread({}, this.props))
    }
});
export default WS;