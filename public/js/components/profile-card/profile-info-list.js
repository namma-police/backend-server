define(
    [
        'react',
    ],
    function (React) {
        var ProfileInfoList = React.createClass({
            callback: function(){
                var that = this;
                this.props.callback(that.props.issueData);
            },
            render: function() {
                var that = this;
                var listItems = this.props.list.map(function(info, iterator){
                    return (
                        <li key={iterator} >
                            <a href={info.link} onClick={that.callback}>
                                {info.description}
                                <span className={"pull-right badge "+info.badgeTheme}>
                                    {info.stats}
                                </span>
                            </a>
                        </li>
                    )
                });

                return (
                    <ul className="nav nav-stacked">
                        {listItems}
                    </ul>
                )   
            }
        });

        return ProfileInfoList;
    }
)