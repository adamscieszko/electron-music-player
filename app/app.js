import React from "react";
import ReactDOM from "react-dom";

import Details from "./components/details.component";
import Player from "./components/player.component";
import Search from "./components/search.component";

class App extends React.Component {
    render() {
        return (
            <div>
                <Search />
                <Details title={"Track title"} />
                <Player />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("content")
);
