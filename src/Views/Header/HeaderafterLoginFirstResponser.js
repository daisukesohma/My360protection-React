import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { APP_LOGO } from '../../Views/s3Links';
import { Button } from "antd";
import { Link } from "react-router-dom";
import HamburgerMenu from 'react-hamburger-menu';

class Headerafterlogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelmodal: false,
            dashboard: false,
            userinformation: false,
            showMenu: false,
        };
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentDidMount() {
        if (window.location.pathname === "/information-responser") {
            this.setState({
                dashboard: true
            })
        }
        else {
            this.setState({
                dashboard: false
            })
        }
    }


    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {
        return (
            <div>
                <div data-spy="scroll" data-target=".navbar">
                    <div>
                        <div id="header">
                            <img alt="" src={APP_LOGO} className="images-logo" />
                            <div className="row w-100 border-row">
                                <div className="col-6 d-flex tags">
                                    <div className="d-flex">
                                        {this.state.dashboard === true ?
                                            <div>
                                                <Link to="/information-responser">
                                                    <div className="mr-4 tags-css for-active-dashboard">
                                                        User Details
                                     </div>
                                                </Link>
                                            </div> :
                                            <div> <Link to="/information-responser">
                                                <div className="mr-4 tags-css ">
                                                    User Details
                                     </div>
                                            </Link>
                                            </div>}


                                    </div>

                                    <div className="setting-icon-test">
                                        <HamburgerMenu
                                            isOpen={this.state.showMenu}
                                            menuClicked={this.showMenu.bind(this)}
                                            width={18}
                                            height={15}
                                            strokeWidth={1}
                                            rotate={0}
                                            color='white'
                                            borderRadius={0}
                                            animationDuration={0.5}
                                        />
                                    </div>



                                    {/* <div className="setting-icon-test">
                                        <img  alt="" src={gear} className="gear-icon" onClick={this.showMenu}></img>
                                    </div> */}

                                    {
                                        this.state.showMenu
                                            ? (
                                                <div
                                                    className="menu"
                                                    ref={(element) => {
                                                        this.dropdownMenu = element;
                                                    }}
                                                >
                                                    <div onClick={() => {
                                                        localStorage.removeItem('firtresponser_management');
                                                        localStorage.removeItem('firstresponser_token');
                                                    }}>
                                                        <Link to="/">
                                                            <div className="logout">Logout</div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                null
                                            )
                                    }

                                </div>

                                <div className="col-6 button-logout res-hide-element buton-responseive">
                                    <div className="buttons-response">
                                        <div onClick={() => {
                                            localStorage.removeItem('firtresponser_management');
                                            localStorage.removeItem('firstresponser_token');
                                        }}>
                                            <Link to="/">
                                                <Button className="sign-up">Logout</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        );
    }
}
export default withRouter(Headerafterlogin);
