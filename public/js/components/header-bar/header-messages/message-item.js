define(
    [
        'react',
    ],
    function (React) {
        var MessageItem = React.createClass({

            render: function () {

                var style1 = {
                    textAlign: "left"
                };

                var style2 = {
                    whiteSpace: "pre-wrap"
                };

                var style3 = {
                    textAlign: "center"
                }

                return (
                    <li>
                        {/* start message */}
                        <a href="#">
                            <div className="pull-left">
                                <img src={this.props.displayPicture} className="img-circle" alt="User Image" />
                            </div>
                            <h4 style={style1}>
                                {this.props.title}
                                <small><i className="fa fa-clock-o"></i> {this.props.time}</small>
                            </h4>
                            <p style={style2}>{this.props.content}</p>
                            <div style={style3}>
                                <button type="button" className="btn btn-primary btn-xs">Help</button>
                                <button type="button" className="btn btn-default btn-xs">Close Issue</button>
                            </div>
                        </a>
                    </li>
                )
            }
        });

        return MessageItem;
    }
)