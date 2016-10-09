define(
    [
        'react',
        './message-item'
    ],
    function (React, MessageItem) {
        var HeaderMessages = React.createClass({
            getInitialState: function () {
                return {
                    messages: []
                }
            },
            // componentWillReceiveProps: function(newProps){

            //     var message, displayPicture;

            //     if(this.props.userType === 'citizen'){
            //         message = ' is coming to help!';
            //         displayPicture = 'images/police.png';
            //     }else{
            //         message = ' needs help!';
            //         displayPicture= 'images/citizen.png'
            //     }

            //     var messages = [{
            //         title: newProps.issueDetails.displayName + message,
            //         displayPicture: displayPicture,
            //         content: newProps.issueDetails.location.address
            //     }];

            //     this.setState({
            //         messages: messages
            //     });
            // },

            acknowledgeRequest: function(){
                this.props.acknowledgeRequest();
                this.setState({messages: []});
            },
            render: function () {
                var that = this;
                var button = '';

                if(this.state.messages.length > 0){
                    button = <li className="footer"><a href="#" onClick={this.acknowledgeRequest}>Acknowledge</a></li>;
                }

                var messageList = this.state.messages.map(function (messageDetails, iterator) {
                    return (
                        <MessageItem 
                            key={iterator}
                            title={messageDetails.title}
                            displayPicture={messageDetails.displayPicture}
                            time={messageDetails.time}
                            content={messageDetails.content} />
                    )
                });

                return (
                    <li className="dropdown messages-menu">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="fa fa-envelope-o"></i>
                            <span className="label label-success">{that.state.messages.length}</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="header">You have {this.state.messages.length} messages</li>
                            <li>
                                {/* inner menu: contains the actual data */}
                                <div className="slimScrollDiv" >

                                    <ul className="menu" >
                                        {messageList}
                                    </ul>
                                    
                                    <div className="slimScrollBar"></div>
                                    <div className="slimScrollRail"></div>
                                </div>
                            </li>
                            {button}
                        </ul>
                    </li>
                    
                )
            }
        });

        return HeaderMessages;
    }
)