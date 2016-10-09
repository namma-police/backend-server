define(
    [
        'react',
        'jquery',
        './header-messages/header-messages'
    ],
    function (React, $, HeaderMessages) {
        var HeaderBar = React.createClass({
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
            componentWillReceiveProps: function(nextProps){
                console.info(nextProps);
            },
            render: function () {
                var that = this;
                var imageSrc = "images/citizen.png"
                if(this.props.userType === 'police'){
                    imageSrc = "images/police.png"
                };
                return (
                    <header className="main-header">
                        {/* Logo */}
                        <a href="http://namma-police.github.io/" className="logo" target="_blank">
                            {/* logo for regular state and mobile devices */}
                            <span className="logo-lg"><b>Namma</b>Police</span>
                        </a>
                        {/* Header Navbar: style can be found in header.less */}
                        <nav className="navbar navbar-static-top" role="navigation">

                            <div className="navbar-custom-menu">
                                <ul className="nav navbar-nav">
                                    
                                    <li className="dropdown user user-menu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <img src={imageSrc} className="user-image" alt="User Image" />
                                            <span className="hidden-xs">{this.props.userId}</span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            {/* User image */}
                                            <li className="user-header">
                                                <img src={imageSrc} className="img-circle" alt="User Image" />
                                                <p>
                                                    {this.props.displayName}
                                                    <small>{this.props.userType}</small>
                                                </p>
                                            </li>

                                            <li className="user-footer">
                                                <div className="pull-left">
                                                    <a href="/stats" className="btn btn-default btn-flat" target="_blank">Stats</a>
                                                </div>
                                                <div className="pull-right">
                                                    <a href="/logout" className="btn btn-default btn-flat">Sign out</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
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