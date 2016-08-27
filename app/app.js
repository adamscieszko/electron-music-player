import React from "react";
import ReactDOM from "react-dom";

import Details from "./components/details.component";
import Search from "./components/search.component";

class App extends React.Component {
    render() {
        return (
            <div>
                <Search />
                <Details title={"Track title"} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("content")
);
