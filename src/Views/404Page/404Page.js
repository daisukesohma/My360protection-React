import React, { Component } from "react";
import { withRouter} from "react-router-dom";

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
    
        };
    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div data-spy="scroll" data-target=".navbar">
                    <div>
                        <div>
                        Oops !! The page you are looking for was not found.
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
export default withRouter(Page);
