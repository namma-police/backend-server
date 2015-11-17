define(
    [
        'react',
        'jquery',
        './header-notifications'
    ],
    function (React, $, HeaderNotifications) {
        var HeaderBar = React.createClass({
            getInitialState: function () {
                return {
                    notifications: []
                }
            },
            pushMenu: function () {
                var body = document.body;
                if(body.clientWidth > 768){
                    if(body.className.indexOf('sidebar-collapse') === -1){
                        body.className += ' sidebar-collapse';
                    }else {
                        body.className = body.className.replace(' sidebar-collapse', '');
                    }
                }else{
                    if (body.className.indexOf('sidebar-open') === -1) {
                        body.className += ' sidebar-open';
                    }else{
                        body.className = body.className.replace(' sidebar-open','');
                    }
                }
            },
            componentDidMount: function () {
                var notifications = [{
                    subject: '5 new members joined today',
                    className: 'fa fa-users text-aqua'
                }, {
                    subject: 'Very long description here that may not fit into the page and may cause design problems',
                    className: 'fa fa-warning text-yellow'
                }, {
                    subject: '5 new members joined',
                    className: 'fa fa-users text-red'
                }, {
                    subject: '25 sales made',
                    className: 'fa fa-shopping-cart text-green'
                }, {
                    subject: 'You changed your username',
                    className: 'fa fa-user text-red'
                }];

                this.setState({
                    notifications: notifications
                });
            },
            render: function () {
                var that = this;
                return (
                    <header className="main-header">
                        {/* Logo */}
                        <a href="index2.html" className="logo">
                            {/* mini logo for sidebar mini 50x50 pixels */}
                            <span className="logo-mini"><b>N</b>P</span>
                            {/* logo for regular state and mobile devices */}
                            <span className="logo-lg">Namma<b>Police</b></span>
                        </a>
                        {/* Header Navbar: style can be found in header.less */}
                        <nav className="navbar navbar-static-top" role="navigation">
                            {/* Sidebar toggle button*/}
                            <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button" onClick={that.pushMenu}>
                                <span className="sr-only">Toggle navigation</span>
                            </a>
                            <div className="navbar-custom-menu">
                                <ul className="nav navbar-nav">
                                    {/* Notifications: style can be found in dropdown.less */}
                                    <li className="dropdown notifications-menu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="fa fa-bell-o"></i>
                                            <span className="label label-warning">{that.state.notifications.length}</span>
                                        </a>
                                        <HeaderNotifications notifications={that.state.notifications} notificationsCallback={that.props.notificationsCallback}/>
                                    </li>
                                    {/* User Account: style can be found in dropdown.less */}
                                    <li className="dropdown user user-menu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <span className="hidden-xs">{this.props.displayName}</span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            {/* User image */}
                                            <li className="user-header">
                                                <p>
                                                    {this.props.userId + " - "+ this.props.userType}
                                                </p>
                                            </li>
                                            {/* Menu Footer */}
                                            <li className="user-footer">
                                                <div className="pull-left">
                                                    <a href="/stats" className="btn btn-default btn-flat">Statistics</a>
                                                </div>
                                                <div className="pull-right">
                                                    <a href="/logout" className="btn btn-default btn-flat">Sign out</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    { /* ontrol Sidebar Toggle Button */}
                                </ul>
                            </div>
                        </nav>
                    </header>
                )
            }
        });

        return HeaderBar;
    }
)