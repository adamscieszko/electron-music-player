import Autocomplete from "react-autocomplete";
import React from "react";

class Search extends React.Component {
    static propTypes = {
        autoCompleteValue: React.PropTypes.string,
        handleChnage: React.PropTypes.func,
        handleSelect: React.PropTypes.func,
        tracks: React.PropTypes.array,
    }

    handlerRenderItem(item, isHightlighted) {
        const listStyles = {
            item: {
                padding: "2px 6px",
                cursor: "default"
            },
            highlitedItem: {
                color: "white",
                background: "#F38B72",
                padding: "2px 6px",
                cursor: "default"
            }
        };

        return (
            <div
                style={isHightlighted ? listStyles.highlitedItem : listStyles.item}
                key={item.id}
                id={item.id}
            >{item.title}</div>
        )
    }

    render() {
        return (
            <div className="search">
                <Autocomplete
                    ref="automplete"
                    inputProps={{title: "Title"}}
                    value={this.props.autoCompleteValue}
                    items={this.props.tracks}
                    getItemValue={(item) => item.title}
                    onSelect={this.props.handleSelect}
                    onChange={this.props.handleChnage}
                    renderItem={this.handlerRenderItem.bind(this)}
                />
            </div>
        )
    }
}

export default Search;
