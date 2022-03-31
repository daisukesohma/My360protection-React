import React, { Component } from "react";
//import "../../../src/App.css";
import Api from "../../Api/ApiUtils";
import { withRouter } from "react-router-dom";
import Loader from '../../Views/Loader/Loader';
import { APP_LOGO } from '../../Views/s3Links';
import HamburgerMenu from 'react-hamburger-menu';
import LocalStorage from "../../Api/LocalStorage";
import { toast } from 'react-toastify';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Modal,Input } from "antd";
import SimpleReactValidator from 'simple-react-validator';
import { Link } from "react-router-dom";

class Headerafterlogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelmodal: false,
            dashboard: false,
            userinformation: false,
            subscriptionplan: false,
            showMenu: false,
            showconfirmpassword: true,
            errorFlag: false,
            hidden: true,
            information: false,
            is_active: ""


        };
        this.showMenu = this.showMenu.bind(this);
        //this.validator = new SimpleReactValidator();
        this.closeMenu = this.closeMenu.bind(this);


        this.validator = new SimpleReactValidator({
            validators: {
                passwordMatch: {
                    message: 'Please enter valid password.',
                    rule: (val, params, validator) => {
                        if (val) {
                            return validator.helpers.testRegex(val, /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) && params.indexOf(val) === -1;
                        }
                    }
                }
            },


        });



    }

    setStateFromInputAdd(event) {

        // var obj = {};
        // obj[event.target.name] = event.target.value;
        // this.setState(obj);


        var obj = {};
        obj[event.target.name] = event.target.value;
        if (event.target.name === "confirmpassword") {
            if (event.target.value !== this.state.pass_word2) {
                this.setState({ confirmpassword: event.target.value, errorFlag: true })
            }
            else {
                this.setState({ confirmpassword: event.target.value, errorFlag: false })
            }
        }
        else {
            this.setState(obj);
        }


    }

    handleCheck = (e) => {
        this.setState({
            is_active: e.target.checked
        });
    }


    componentDidMount() {
        if (window.location.pathname === "/userinformation") {
            this.setState({
                userinformation: true,
                dashboard: false
            })
        }
        else {
        }

        if (window.location.pathname === "/dashboard") {
            //console.log("inide the ", window.location.pathname)
            this.setState({
                userinformation: false,
                dashboard: true
            })
        }
        else {
        }


        if (window.location.pathname === "/information") {
            this.setState({
                userinformation: false,
                dashboard: false,
                information: true
            })
        }
        else {
        }

        if (window.location.pathname === "/subscription") {
            this.setState({
                userinformation: false,
                dashboard: false,
                information: false,
                subscriptionplan: true
            })
        }
        else {
        }
        var _this = this;
        if (localStorage.getItem("user_token") !== null) {
            LocalStorage.getItem("user_management").then(user => {
                _this.setState({
                    user: user.id,
                    userInfo: user.is_info_added,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    loader: false
                })
            });
        }
        else {
            _this.props.history.push("/");
        }
    }

    /*-- Show modal Edit*/
    showModalCancel = () => {
        this.setState({
            cancelmodal: true,
            showMenu: false

        });
    };

    /*-- Cancel modal Edit*/
    handleCancel = e => {
        this.setState({
            cancelmodal: false,
            email2: "",
            pass_word2: "",
            confirmpassword: "",
            is_active: ""
        });
        this.validator.hideMessages();
    };



    // showMenu(event) {
    //     event.preventDefault();

    //     this.setState({ showMenu: true }, () => {
    //         document.addEventListener('click', this.closeMenu);
    //     });
    // }

    // closeMenu(event) {
    //     if (!this.dropdownMenu.contains(event.target)) {
    //         this.setState({ showMenu: false }, () => {
    //             document.removeEventListener('click', this.closeMenu);
    //         });

    //     }
    // }

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

    toggleShowConfirmpassword = () => {
        this.setState({ showconfirmpassword: !this.state.showconfirmpassword })
    }




    // closeMenu(event) {       
    //         this.setState({ showMenu: false });

    // }



    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    submit = () => {
        if (this.validator.allValid() && this.state.errorFlag === false) {
            this.setState({ loader: true })
            const payload = {
                email: this.state.email2,
                password: this.state.pass_word2,
                confirm_password: this.state.confirmpassword,
                is_active: this.state.is_active
            };
            Api.cancelmembership(payload)
                .then((response) => {
                    if (response.status === 200) {
                        this.validator.hideMessages();
                        toast.success("Your Membership has been cancelled successfully");
                        this.setState({
                            loader: false,
                            cancelmodal: false,
                            email2: "",
                            pass_word2: "",
                            confirmpasword: ""
                        })
                       
                        const timer = setTimeout(() => {
                            this.props.history.push("/");
                            localStorage.removeItem('user_management');
                            localStorage.removeItem('user_token');
                            localStorage.removeItem('id')
                        }, 1000);
                        return () => clearTimeout(timer);
                    }
                    else {

                    }
                })
                .catch(err => {
                    this.setState({
                        loader: false
                    })
                    if (err.status === 404) {
                        toast.error("Please Enter Valid Details")
                        this.setState({
                            loader: false,
                            cancelmodal: false,
                            email2: "",
                            pass_word2: "",
                            confirmpasword: ""
                        })
                        this.validator.hideMessages();
                    }
                    else if (err.status === 403) {
                        // toast.error("Too Many attempts! Please Try Again Later")
                        // this.setState({
                        //     loader: false,
                        //     cancelmodal: false,
                        //     email2: "",
                        //     pass_word2: "",
                        //     confirmpasword: ""
                        // })
                        // this.validator.hideMessages();
                    }
                })
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({ loader: false });
        }

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
                                                <Link to="/dashboard">
                                                    <div className="mr-4 tags-css for-active-dashboard">
                                                        Dashboard
                                     </div>
                                                </Link>
                                            </div> :
                                            <div> <Link to="/dashboard">
                                                <div className="mr-4 tags-css ">
                                                    Dashboard
                                     </div>
                                            </Link>
                                            </div>}

                                        {this.state.userinformation === true ?
                                            <div>
                                                <Link to="/userinformation">
                                                    <div className="mr-4 tags-css for-active-userinformation">
                                                        User Profile
                                            </div>
                                                </Link>
                                            </div> : <div>
                                                <Link to="/userinformation">
                                                    <div className="mr-4 tags-css">
                                                        User Profile
                                             </div>
                                                </Link>
                                            </div>}


                                        {this.state.subscriptionplan === true ?
                                            <div>
                                                <Link to="/subscription">
                                                    <div className="mr-4 tags-css for-active-subscription">
                                                        Subscription Plan
                                            </div>
                                                </Link>
                                            </div> : <div>
                                                <Link to="/subscription">
                                                    <div className="mr-4 tags-css">
                                                        Subscription Plan
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
                                        <img alt="" src={gear} className="gear-icon" onClick={this.showMenu}></img>
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
                                                    <div onClick={this.showModalCancel} className="cancel-membership-hide"> Cancel Membership </div>
                                                    <div onClick={() => {
                                                        localStorage.removeItem('user_management');
                                                        localStorage.removeItem('user_token');
                                                        localStorage.removeItem('id')
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


                                    <div className="mr-4 tags-css res-hide-element" onClick={this.showModalCancel}>
                                        Cancel Membership
                                     </div>



                                </div>

                                <div className="col-6 button-logout res-hide-element buton-responseive">
                                    <div className="buttons-response">
                                        <div onClick={() => {
                                            localStorage.removeItem('user_management');
                                            localStorage.removeItem('user_token');
                                            localStorage.removeItem('id')
                                        }}>
                                            <Link to="/">
                                                <Button className="sign-up">Logout</Button>
                                            </Link>
                                        </div>


                                    </div>
                                </div>


                            </div>

                            <Modal visible={this.state.cancelmodal}
                                width={370}
                                onCancel={this.handleCancel} >
                                {this.state.loader ? <Loader /> : null}
                                <div style={this.state.loader ? { opacity: '0.4' } : null}>                                <div id="head-modal">
                                    <div>
                                        Cancel Membership
                                    </div>
                                </div>
                                    <div className="row m-0 checkedd">
                                        <div className="col-1">
                                            <Checkbox onChange={this.handleCheck} value={this.state.is_active}>
                                            </Checkbox>


                                            {/* <Checkbox value={this.state.is_active}
                                                onChange={this.handleCheck}>
                                                <Checkbox name="active" value={"Fire"} >Fire Department</Radio>
                                            </Checkbox> */}
                                        </div>




                                        <div className="cancel-membership">
                                            Yes, Please cancel my membership
                                      </div>

                                    </div>
                                    <div className="err-message-infor">
                                        {this.validator.message('Select', this.state.is_active, 'required')}
                                    </div>
                                    <div className="row title-modal" >
                                        <div className="titiles">
                                            Email Address
                               </div>
                                    </div>
                                    <div className="row mt-1">
                                        <input type="text"
                                            className="col-md-10  age-place  form-control mt-1"
                                            placeholder="Email Address"
                                            name='email2' value={this.state.email2} onChange={this.setStateFromInputAdd.bind(this)} />
                                    </div>

                                    <div className="err-message-infor">
                                        {this.validator.message('Email', this.state.email2, 'required|email')}
                                    </div>

                                    <div className="row title-modal" >
                                        <div className="titiles">
                                            Password
                               </div>
                                    </div>
                                    <div className="row mt-1">



                                        <Input className="col-md-10 age-place mt-1"
                                            prefix={<i class="fa fa-eye" aria-hidden="true" className="icon-pass" />} type={this.state.hidden ? "password" : "text"} placeholder="Password"
                                            name="pass_word2" suffix={this.state.hidden ? <EyeOutlined onClick={this.toggleShow} /> : <EyeInvisibleOutlined onClick={this.toggleShow} />}
                                            value={this.state.pass_word2}
                                            onChange={this.setStateFromInputAdd.bind(this)} />




                                        {/* <input type="password"
                                            className="col-md-10  age-place
                                    form-control mt-1"
                                            placeholder="Enter Password"
                                            name='pass_word2' value={this.state.pass_word2} onChange={this.setStateFromInputAdd.bind(this)} />

 */}

                                    </div>
                                    {/* <div className="err-message-infor">
                                        {this.validator.message('Password', this.state.pass_word2, 'required')}
                                    </div> */}

                                    <div className="not-msg">(At least one capital letter, minimum of 8 characters, one special character)</div>
                                    <div className="err-message">
                                        {this.validator.message('Password', this.state.pass_word2, 'required|passwordMatch')}
                                    </div>



                                    <div className="row title-modal" >
                                        <div className="titiles">
                                            Confirm Password
                               </div>
                                    </div>
                                    <div className="row mt-1">

                                        <Input className="mt-1 col-md-10  age-place"
                                            prefix={<i class="fa fa-eye" aria-hidden="true" className="icon-pass" />} type={this.state.showconfirmpassword ? "password" : "text"}
                                            placeholder="Confirm Password"
                                            name='confirmpassword' suffix={this.state.showconfirmpassword ?
                                                <EyeOutlined onClick={this.toggleShowConfirmpassword} /> : <EyeInvisibleOutlined onClick={this.toggleShowConfirmpassword} />}
                                            value={this.state.confirmpassword}
                                            onChange={this.setStateFromInputAdd.bind(this)} />
                                        {/* 

                                        <input type="password"
                                            className="col-md-10  age-place  form-control mt-1"
                                            placeholder="Enter Confirm Password" name='confirmpassword' value={this.state.confirmpassword}
                                            onChange={this.setStateFromInputAdd.bind(this)} /> */}



                                    </div>
                                    {/* <div className="err-message-infor">
                                        {this.validator.message('ConfirmPassword', this.state.confirmpassword, 'required')}
                                    </div> */}

                                    <div className="err-message">
                                        {this.validator.message('Confirm Password', this.state.confirmpassword, 'required')}
                                    </div>
                                    <div className={"err-message " + (this.state.errorFlag ? "" : "d-none")}>
                                        <span className="errorMsg">Confirm password must match Password.</span>
                                    </div>



                                    <div className="row">
                                        <Button className="verfiy-button-edit" onClick={this.submit}>Submit</Button>
                                    </div>
                                </div>
                            </Modal>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Headerafterlogin);
