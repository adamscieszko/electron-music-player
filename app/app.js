import React from "react";
import ReactDOM from "react-dom";

import Search from "./components/search.component"

class App extends React.Component {
    render() {
        return (
            <Search />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("content")
);
