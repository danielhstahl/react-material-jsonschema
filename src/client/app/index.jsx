import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import CircularProgress from 'material-ui/lib/circular-progress';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Colors from 'material-ui/lib/styles/colors';
import MyRawTheme from 'themeFile';

import WSForm from './WSForm';
const {Grid, Row, Col} = require('react-flexbox-grid');
const containerStyle = {
    //margin:50,
    padding:45
};
const standardActions = [
    {
        text: 'Okay',
    },
];

const style = {
    padding:50,
    //overflowY: 'auto',
    //display: 'inline-block',
};

const Main = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getInitialState() {
        return {
            open:false,
            openNav:false,
            wsUrl:null,
            message:"hello"
        };
    },
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme),//this.state.muiTheme,
        };
    },
    _handleRequestClose() {
        this.setState({
            open: false,
        });
    },
    _handleTouchTap() {
        this.setState({
            open: !this.state.open,
        });
    },
    handleFirstMenuItem(){
        this.setState({
            openNav:false,
            wsUrl:'ws://localhost:9000'
        });
    },
    handleSecondMenuItem(){
        this.setState({
            openNav:false,
            wsUrl:'ws://localhost:9002'
        });
    },
    handleMenuClick(){
        this.setState({
            openNav:!this.state.openNav
        });  
    },
    handleWS(data){
        if(data.$schema){
            this.setState({
                schema:data
            });
        }
        else if(data.Error){
            this.setState({
                open:true,
                message:data.Error
            });
        }
    },
    render() {
        const actions = [
            <FlatButton label="Cancel" secondary={true} onTouchTap={this.handleClose}/>,
            <FlatButton label="Submit" primary={true} keyboardFocused={true} onTouchTap={this.handleClose}/>,
        ];
        return (
            <div>
                <AppBar title="Title" onLeftIconButtonTouchTap={this.handleMenuClick}/>
                <LeftNav docked={false} width={200} open={this.state.openNav} onRequestChange={openNav => this.setState({openNav})}>
                    <MenuItem onTouchTap={this.handleFirstMenuItem}>WebSocket 1</MenuItem>
                    <MenuItem onTouchTap={this.handleSecondMenuItem}>WebSocket 2</MenuItem>
                </LeftNav>
                <div style={containerStyle}>
                    <Grid fluid={true}>
                        <Row>
                            <Col xs={12} sm={12} md={6}>
                                <Dialog open={this.state.open}  title="Super Secret Password" onRequestClose={this._handleRequestClose} actions={actions}>
                                    {this.state.message}
                                </Dialog>
                                <h1>material-ui</h1>
                                <h2>example project</h2>
                                <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />
                                <DatePicker hintText="TestDatePicker" mode="portrait"/>
                            </Col>
                            <Col xs={12} sm={12} md={6} >
                                <Paper style={style} zDepth={2}>
                                    <WSForm url={this.state.wsUrl} onMessage={this.handleWS}/>
                                </Paper>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    },
});
ReactDOM.render((
  <Main/>
), document.getElementById("app"));

