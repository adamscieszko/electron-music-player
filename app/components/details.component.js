import React from "react";

class Details extends React.Component {
    static propTypes = {
        title: React.PropTypes.string
    }

    render() {
        return (
            <div className="details">
                <h3>{this.props.title}</h3>
            </div>
        )
    }
}

export default Details;
