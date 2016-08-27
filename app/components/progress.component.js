import React from "react";

class Progress extends React.Component {
    static propTypes = {
        elapsed: React.PropTypes.string,
        position: React.PropTypes.string,
        total: React.PropTypes.string
    }

    render() {
        return (
            <div className="progress">
                <span className="progress__time-elapsed">
                    {this.props.elapsed}
                </span>
                <progress value={this.props.position} max="1"></progress>
                <span className="player__time-total">
                    {this.props.total}
                </span>
            </div>
        )
    }
}

export default Progress;
