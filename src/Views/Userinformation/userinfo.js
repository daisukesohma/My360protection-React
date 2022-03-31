import React, { Component } from "react";
//import "../../../src/";
import "react-alice-carousel/lib/alice-carousel.css";
import SimpleReactValidator from 'simple-react-validator';

import { yellow,red} from '../../Views/s3Links';
import LocalStorage from "../../Api/LocalStorage";
import Loader from '../../Views/Loader/Loader';
import Api from "../../Api/ApiUtils";
import { withRouter, Redirect } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Switch, Radio } from 'antd';
import { Button} from "antd";
import Headerafterlogin from "../Header/Headerafterlogin";
import { Select } from 'antd';
import Information from "../Information/information";

const { Option } = Select;

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addmodal: false,
            basement: true,
            user: "",
            useradd: "",
            onCheck: 1,
            is_active: "",
            medicalhistory: [],
            userinfo: [],
            onHandicapped: 1,
            userInfo: "",
            electriccurrentselected: false,
            gasmeterselected: false,
            medicalid: "",
            color: "white",
            xcordinatesElectricConnect: "",
            ycordinatesElectricConnect: "",
            xcordinatesGasMeter: "",
            ycordinatesGasMeter: "",
            squareFootage: 0,
        };
        this.validator = new SimpleReactValidator();
        this.addMedicalHistoryValidator = new SimpleReactValidator();
        this.setStateFromInputAdd = this.setStateFromInputAdd.bind(this);

    }



    setStateFromOccupants(event) {
        //console.log("eveemnt", event)
        this.setState({
            occupants: event
        })
    }
    setStateFromPets(event) {
        //console.log("eveemnt", event)
        this.setState({
            pets: event
        })
    }
    setStateFromBedrooms(event) {
        //console.log("eveemnt", event)
        this.setState({
            bedrooms: event
        })
    }
    setStateFromConstruction(event) {
        //console.log("eveemnt", event)
        this.setState({
            construction: event
        })
    }
    setStateFromHouse(event) {
        //console.log("eveemnt", event)
        this.setState({
            house: event
        })
    }
    setStateFromSquareFootage(event) {
        var obj = {};
        var value = Number(event.target.value)
        if (event.target.name === "squareFootage") {
            var regex = /^\d+$/;
            if (value !== "") {
                if (regex.test(value)) {
                    this.setState({
                        squareFootage: value
                    })
                } else {
                    this.setState({
                        squareFootage: 0
                    })
                }
            }
        } else {
          this.setState(obj);
        }
    }


    componentDidMount() {
        var _this = this;
        if (localStorage.getItem("user_token") !== null) {
            LocalStorage.getItem("user_management").then(user => {
                //console.log("userrrrrrrrrrrrr", user)
                _this.setState({
                    user: user.id,
                    userInfo: user.is_info_added,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    loader: false
                }, () => { _this.getdata() })
            });
        }
        else {
            _this.props.history.push("/");
        }
        //this.getdata();
    }

    getdata() {
        this.setState({ loader: true })
        //console.log(localStorage.getItem("user_management"))
        //console.log("in get Data", this.state.user)
        let payload = {
            id: this.state.user
        }
        Api.getdata(payload)
            .then((res) => {
                if (res) {
                    if (res.data) {
                        //console.log("get data of user", res.data)
                        this.setState({
                            loader: false,
                            userinfo: res.data && res.data.user_info ? res.data.user_info : "",
                            planSubscribed :res.data && res.data.planSubscribed,
                            medicalhistory: res.data && res.data.medical_history,
                            first_name: res.data && res.data.first_name,
                            last_name: res.data && res.data.last_name
                        });
                    }
                    else {
                        this.setState({ loader: false });
                    }
                }
                else {
                    this.setState({ loader: false });
                }
            })
            .catch(function (err) {
                if (err) {
                    toast.error(err.error)
                }
                else {
                    toast.error("Some error occured")
                }
                //this.setState({ loader: false });
            });
    }



    handleToggle = (checked) => {
        //const { onCheck } = this.state;

        if (checked) {
            this.setState({ onCheck: 1 }, () => { console.log("oncheck", this.state.onCheck) });
        } else {
            this.setState({ onCheck: 0 }, () => { console.log("on another check", this.state.onCheck) });
        }
    };

    handleToggleHandicapped = (checked) => {
        //const { onHandicapped } = this.state;

        if (checked) {
            this.setState({ onHandicapped: 1 }, () => { console.log("handicapped", this.state.onHandicapped) });
        } else {
            this.setState({ onHandicapped: 0 }, () => { console.log("on another handicapped", this.state.onHandicapped) });
        }
    };

    handleCheck = (e) => {
        console.log("is _active", e.target.value)
        this.setState({
            is_active: e.target.value
        }, () => { console.log("after setsate", this.state.is_active) })
        //console.log("after setstsate", this.state.is_active)
    }



    setStateFromInputAdd(event) {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }



    /*-- Cancel modal Edit*/
    handleCanceladdmodal = e => {
        console.log(e);
        this.setState({
            addmodal: false,
            name: "",
            age: "",
            weight: "",
            history: "",
            medication: ""
        });
    };

    submitForm = () => {
        //console.log("inside the operation function")
        if (this.validator.allValid()) {
            //console.log("inside the operation function")
            this.setState({ loader: true })
            const payload = {
                user_id: this.state.user,
                number_of_occupants: this.state.occupants,
                number_of_pets: this.state.pets,
                number_of_bedroom: this.state.bedrooms,
                construction_type: this.state.construction,
                house_type: this.state.house,
                square_footage: this.state.squareFootage,
                with_basement: this.state.onCheck === 1 ? "Yes" : "No",
                anyone_handicapped: this.state.onHandicapped === 1 ? "Yes" : "No",
                share_info_with: this.state.is_active,
                xcordinatesElectricConnect: this.state.xcordinatesElectricConnect,
                ycordinatesElectricConnect: this.state.ycordinatesElectricConnect,
                xcordinatesGasMeter: this.state.xcordinatesGasMeter,
                ycordinatesGasMeter: this.state.ycordinatesGasMeter

            };
            //console.log("Payload", payload)
            Api.userinfo(payload)
                .then((response) => {
                    if (response.data) {
                        //console.log("response", response.data)
                        this.validator.hideMessages();
                        this.props.history.push("/subscription");
                        this.setState({
                            loader: false,
                            occupants: undefined,
                            pets: undefined,
                            bedrooms: undefined,
                            construction: undefined,
                            house: undefined,
                            squareFootage: 0,
                            onCheck: 1,
                            onHandicapped: 1,
                            is_active: "",

                           //userinfo: true
                        })
                        toast.success("Success")
                    }
                    else {
                        this.setState({ loader: false })
                    }
                })
                .catch(err => {
                    if (err.status === 400) {
                         //console.log("errro");
                        // toast.error("Please Select Subscription Plan")
                        // this.props.history.push("/subscription");
                    }
                    //toast.error("Something Went Wrong")
                    this.setState({ loader: false })
                })
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({ loader: false });
        }

    }




    // table information
    changeCellColor(refName, x, y) {
        if (this.state.color === "#F6CB26") {
            if (this.state.xcordinatesGasMeter === "" && this.state.ycordinatesGasMeter === "") {
                console.log("XY", x, y);
                this.assignCellColor(refName, x, y);
                // this.refs[refName].style.background =this.state.color;
                // this.setState({
                //     xcordinatesGasMeter:x,
                //     ycordinatesGasMeter:y,

                //     //color:this.state.color
                // },()=>{console.log("if ststasem",this.state)})
            }
            else {
                this.refs["cell" + this.state.xcordinatesGasMeter + this.state.ycordinatesGasMeter].style.background = "white";
                if (this.refs["cell" + this.state.xcordinatesGasMeter + this.state.ycordinatesGasMeter].style.background === "white") {
                    this.assignCellColor(refName, x, y);
                }
            }
        }
        else {
            if (this.state.xcordinatesElectricConnect === "" && this.state.ycordinatesElectricConnect === "") {
                console.log("XY", x, y);
                this.assignCellColor(refName, x, y);
                // this.refs[refName].style.background =this.state.color;
                // this.setState({
                //     xcordinatesGasMeter:x,
                //     ycordinatesGasMeter:y,

                //     //color:this.state.color
                // },()=>{console.log("if ststasem",this.state)})
            }
            else {
                this.refs["cell" + this.state.xcordinatesElectricConnect + this.state.ycordinatesElectricConnect].style.background = "white";
                if (this.refs["cell" + this.state.xcordinatesElectricConnect + this.state.ycordinatesElectricConnect].style.background === "white") {
                    this.assignCellColor(refName, x, y);
                }
            }
        }

    }

    assignCellColor(refName, x, y) {
        this.refs[refName].style.background = this.state.color;
        if (this.state.color === "#F6CB26") {
            this.setState({
                xcordinatesGasMeter: x,
                ycordinatesGasMeter: y,

                //color:this.state.color
            }, () => { console.log("SetState of GAS meter", this.state.xcordinatesGasMeter, this.state.ycordinatesGasMeter) })
        }
        else {
            this.setState({
                xcordinatesElectricConnect: x,
                ycordinatesElectricConnect: y,

                //color:this.state.color
            }, () => { console.log("SetState of Electric Connect", this.state.xcordinatesElectricConnect, this.state.ycordinatesElectricConnect) })
        }
    }





    render() {
        return (
            <div className="main-bk">


                {localStorage.getItem('user_token') !== null ?
                    //with token
                    <div>
                        <div data-spy="scroll" data-target=".navbar">
                            <div>
                                <div>
                                    <Headerafterlogin />
                                </div>
                                <div className="row m-0 border-styling">
                                    <div className="welcome-name">
                                        Welcome {this.state.first_name}  {this.state.last_name}
                                    </div>


                                </div>
                                {this.state.loader ? <Loader /> : null}
                                <div style={this.state.loader ? { opacity: '0.4' } : null}>
                                    {/* {console.log("state of is_payment method",this.state.planSubscribed)} */}
                                    {this.state.planSubscribed === false ? <div style={{ display: 'block' }}>
                                        <div className="container con-css">
                                            <div className="row-css">
                                                <div className="row m-0">
                                                    <div className="required-info">
                                                        Required Info
                                    </div>

                                                </div>

                                                {this.state.loader ? <Loader /> : null}
                                                <div style={this.state.loader ? { opacity: '0.4' } : null}>

                                                    <div>

                                                        <div className="row m-0">
                                                            <div className="col-6 table-order">
                                                                <div className="position-relative">
                                                                    <Table striped bordered hover size="sm" className="table-resixe">

                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="table-bor" ref="cell00" onClick={this.changeCellColor.bind(this, "cell00", 0, 0)}></td>
                                                                                <td className="table-bor" ref="cell01" onClick={this.changeCellColor.bind(this, "cell01", 0, 1)}></td>
                                                                                <td className="table-bor" ref="cell02" onClick={this.changeCellColor.bind(this, "cell02", 0, 2)}></td>
                                                                                <td className="table-bor" ref="cell03" onClick={this.changeCellColor.bind(this, "cell03", 0, 3)} ></td>

                                                                                <td className="table-bor" ref="cell04" onClick={this.changeCellColor.bind(this, "cell04", 0, 4)}></td>
                                                                                <td className="table-bor" ref="cell05" onClick={this.changeCellColor.bind(this, "cell05", 0, 5)}></td>
                                                                                <td className="table-bor" ref="cell06" onClick={this.changeCellColor.bind(this, "cell06", 0, 6)}></td>

                                                                                <td className="table-bor" ref="cell07" onClick={this.changeCellColor.bind(this, "cell07", 0, 7)}></td>
                                                                                <td className="table-bor" ref="cell08" onClick={this.changeCellColor.bind(this, "cell08", 0, 8)}></td>

                                                                                <td className="table-bor" ref="cell09" onClick={this.changeCellColor.bind(this, "cell09", 0, 9)}></td>
                                                                                <td className="table-bor" ref="cell010" onClick={this.changeCellColor.bind(this, "cell010", 0, 10)}></td>
                                                                                <td className="table-bor" ref="cell011" onClick={this.changeCellColor.bind(this, "cell011", 0, 11)}></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="table-bor" ref="cell10" onClick={this.changeCellColor.bind(this, "cell10", 1, 0)}></td>
                                                                                <td className="table-bor" ref="cell11" onClick={this.changeCellColor.bind(this, "cell11", 1, 1)}></td>
                                                                                <td className="table-bor" ref="cell12" onClick={this.changeCellColor.bind(this, "cell12", 1, 2)}></td>

                                                                                <td className="table-bor" ref="cell13" onClick={this.changeCellColor.bind(this, "cell13", 1, 3)}></td>
                                                                                <td className="table-bor" ref="cell14" onClick={this.changeCellColor.bind(this, "cell14", 1, 4)}></td>

                                                                                <td className="table-bor" ref="cell15" onClick={this.changeCellColor.bind(this, "cell15", 1, 5)}></td>
                                                                                <td className="table-bor" ref="cell16" onClick={this.changeCellColor.bind(this, "cell16", 1, 6)}></td>

                                                                                <td className="table-bor" ref="cell17" onClick={this.changeCellColor.bind(this, "cell17", 1, 7)}></td>
                                                                                <td className="table-bor" ref="cell18" onClick={this.changeCellColor.bind(this, "cell18", 1, 8)}></td>
                                                                                <td className="table-bor" ref="cell19" onClick={this.changeCellColor.bind(this, "cell19", 1, 9)}></td>
                                                                                <td className="table-bor" ref="cell110" onClick={this.changeCellColor.bind(this, "cell110", 1, 10)}></td>
                                                                                <td className="table-bor" ref="cell111" onClick={this.changeCellColor.bind(this, "cell111", 1, 11)}></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="table-bor" ref="cell20" onClick={this.changeCellColor.bind(this, "cell20", 2, 0)}></td>
                                                                                <td className="table-bor" ref="cell21" onClick={this.changeCellColor.bind(this, "cell21", 2, 1)}></td>
                                                                                <td className="table-bor" ref="cell22" onClick={this.changeCellColor.bind(this, "cell22", 2, 2)}></td>
                                                                                <td className="table-bor" ref="cell23" onClick={this.changeCellColor.bind(this, "cell23", 2, 3)}></td>
                                                                                <td className="table-bor" ref="cell24" onClick={this.changeCellColor.bind(this, "cell24", 2, 4)}></td>
                                                                                <td className="table-bor" ref="cell25" onClick={this.changeCellColor.bind(this, "cell25", 2, 5)}></td>
                                                                                <td className="table-bor" ref="cell26" onClick={this.changeCellColor.bind(this, "cell26", 2, 6)}></td>

                                                                                <td className="table-bor" ref="cell27" onClick={this.changeCellColor.bind(this, "cell27", 2, 7)}></td>
                                                                                <td className="table-bor" ref="cell28" onClick={this.changeCellColor.bind(this, "cell28", 2, 8)}></td>

                                                                                <td className="table-bor" ref="cell29" onClick={this.changeCellColor.bind(this, "cell29", 2, 9)}></td>
                                                                                <td className="table-bor" ref="cell210" onClick={this.changeCellColor.bind(this, "cell210", 2, 10)}></td>
                                                                                <td className="table-bor" ref="cell211" onClick={this.changeCellColor.bind(this, "cell211", 2, 11)}></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="table-bor" ref="cell30" onClick={this.changeCellColor.bind(this, "cell30", 3, 0)}></td>
                                                                                <td className="table-bor" ref="cell31" onClick={this.changeCellColor.bind(this, "cell31", 3, 1)}></td>
                                                                                <td className="table-bor" ref="cell32" onClick={this.changeCellColor.bind(this, "cell32", 3, 2)}></td>
                                                                                <td className="table-bor" ref="cell33" onClick={this.changeCellColor.bind(this, "cell33", 3, 3)}></td>
                                                                                <td className="table-bor" ref="cell34" onClick={this.changeCellColor.bind(this, "cell34", 3, 4)}></td>
                                                                                <td className="table-bor" ref="cell35" onClick={this.changeCellColor.bind(this, "cell35", 3, 5)}></td>
                                                                                <td className="table-bor" ref="cell36" onClick={this.changeCellColor.bind(this, "cell36", 3, 6)}></td>

                                                                                <td className="table-bor" ref="cell37" onClick={this.changeCellColor.bind(this, "cell37", 3, 7)}></td>
                                                                                <td className="table-bor" ref="cell38" onClick={this.changeCellColor.bind(this, "cell38", 3, 8)}></td>

                                                                                <td className="table-bor" ref="cell39" onClick={this.changeCellColor.bind(this, "cell39", 3, 9)}></td>
                                                                                <td className="table-bor" ref="cell310" onClick={this.changeCellColor.bind(this, "cell310", 3, 10)}></td>
                                                                                <td className="table-bor" ref="cell311" onClick={this.changeCellColor.bind(this, "cell311", 3, 11)}></td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td className="table-bor" ref="cell40" onClick={this.changeCellColor.bind(this, "cell40", 4, 0)}></td>
                                                                                <td className="table-bor" ref="cell41" onClick={this.changeCellColor.bind(this, "cell41", 4, 1)}></td>
                                                                                <td className="table-bor" ref="cell42" onClick={this.changeCellColor.bind(this, "cell42", 4, 2)}></td>
                                                                                <td className="table-bor" ref="cell43" onClick={this.changeCellColor.bind(this, "cell43", 4, 3)}></td>
                                                                                <td className="table-bor" ref="cell44" onClick={this.changeCellColor.bind(this, "cell44", 4, 4)}></td>
                                                                                <td className="table-bor" ref="cell45" onClick={this.changeCellColor.bind(this, "cell45", 4, 5)}></td>
                                                                                <td className="table-bor" ref="cell46" onClick={this.changeCellColor.bind(this, "cell46", 4, 6)}></td>

                                                                                <td className="table-bor" ref="cell47" onClick={this.changeCellColor.bind(this, "cell47", 4, 7)}></td>
                                                                                <td className="table-bor" ref="cell48" onClick={this.changeCellColor.bind(this, "cell48", 4, 8)}></td>

                                                                                <td className="table-bor" ref="cell49" onClick={this.changeCellColor.bind(this, "cell49", 4, 9)}></td>
                                                                                <td className="table-bor" ref="cell410" onClick={this.changeCellColor.bind(this, "cell410", 4, 10)}></td>
                                                                                <td className="table-bor" ref="cell411" onClick={this.changeCellColor.bind(this, "cell411", 4, 11)}></td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td className="table-bor" ref="cell50" onClick={this.changeCellColor.bind(this, "cell50", 5, 0)}></td>
                                                                                <td className="table-bor" ref="cell51" onClick={this.changeCellColor.bind(this, "cell51", 5, 1)}></td>
                                                                                <td className="table-bor" ref="cell52" onClick={this.changeCellColor.bind(this, "cell52", 5, 2)}></td>
                                                                                <td className="table-bor" ref="cell53" onClick={this.changeCellColor.bind(this, "cell53", 5, 3)}></td>
                                                                                <td className="table-bor" ref="cell54" onClick={this.changeCellColor.bind(this, "cell54", 5, 4)}></td>
                                                                                <td className="table-bor" ref="cell55" onClick={this.changeCellColor.bind(this, "cell55", 5, 5)}></td>
                                                                                <td className="table-bor" ref="cell56" onClick={this.changeCellColor.bind(this, "cell56", 5, 6)}></td>

                                                                                <td className="table-bor" ref="cell57" onClick={this.changeCellColor.bind(this, "cell57", 5, 7)}></td>
                                                                                <td className="table-bor" ref="cell58" onClick={this.changeCellColor.bind(this, "cell58", 5, 8)}></td>

                                                                                <td className="table-bor" ref="cell59" onClick={this.changeCellColor.bind(this, "cell59", 5, 9)}></td>
                                                                                <td className="table-bor" ref="cell510" onClick={this.changeCellColor.bind(this, "cell510", 5, 10)}></td>
                                                                                <td className="table-bor" ref="cell511" onClick={this.changeCellColor.bind(this, "cell511", 5, 11)}></td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td className="table-bor" ref="cell60" onClick={this.changeCellColor.bind(this, "cell60", 6, 0)}></td>
                                                                                <td className="table-bor" ref="cell61" onClick={this.changeCellColor.bind(this, "cell61", 6, 1)}></td>
                                                                                <td className="table-bor" ref="cell62" onClick={this.changeCellColor.bind(this, "cell62", 6, 2)}></td>
                                                                                <td className="table-bor" ref="cell63" onClick={this.changeCellColor.bind(this, "cell63", 6, 3)}></td>
                                                                                <td className="table-bor" ref="cell64" onClick={this.changeCellColor.bind(this, "cell64", 6, 4)}></td>
                                                                                <td className="table-bor" ref="cell65" onClick={this.changeCellColor.bind(this, "cell65", 6, 5)}></td>
                                                                                <td className="table-bor" ref="cell66" onClick={this.changeCellColor.bind(this, "cell66", 6, 6)}></td>

                                                                                <td className="table-bor" ref="cell67" onClick={this.changeCellColor.bind(this, "cell67", 6, 7)}></td>
                                                                                <td className="table-bor" ref="cell68" onClick={this.changeCellColor.bind(this, "cell68", 6, 8)}></td>

                                                                                <td className="table-bor" ref="cell69" onClick={this.changeCellColor.bind(this, "cell69", 6, 9)}></td>
                                                                                <td className="table-bor" ref="cell610" onClick={this.changeCellColor.bind(this, "cell610", 6, 10)}></td>
                                                                                <td className="table-bor" ref="cell611" onClick={this.changeCellColor.bind(this, "cell611", 6, 11)}></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="table-bor" ref="cell70" onClick={this.changeCellColor.bind(this, "cell70", 7, 0)}></td>
                                                                                <td className="table-bor" ref="cell71" onClick={this.changeCellColor.bind(this, "cell71", 7, 1)}></td>
                                                                                <td className="table-bor" ref="cell72" onClick={this.changeCellColor.bind(this, "cell72", 7, 2)}></td>
                                                                                <td className="table-bor" ref="cell73" onClick={this.changeCellColor.bind(this, "cell73", 7, 3)}></td>
                                                                                <td className="table-bor" ref="cell74" onClick={this.changeCellColor.bind(this, "cell74", 7, 4)}></td>
                                                                                <td className="table-bor" ref="cell75" onClick={this.changeCellColor.bind(this, "cell75", 7, 5)}></td>
                                                                                <td className="table-bor" ref="cell76" onClick={this.changeCellColor.bind(this, "cell76", 7, 6)}></td>

                                                                                <td className="table-bor" ref="cell77" onClick={this.changeCellColor.bind(this, "cell77", 7, 7)}></td>
                                                                                <td className="table-bor" ref="cell78" onClick={this.changeCellColor.bind(this, "cell78", 7, 8)}></td>

                                                                                <td className="table-bor" ref="cell79" onClick={this.changeCellColor.bind(this, "cell79", 7, 9)}></td>
                                                                                <td className="table-bor" ref="cell710" onClick={this.changeCellColor.bind(this, "cell710", 7, 10)}></td>
                                                                                <td className="table-bor" ref="cell711" onClick={this.changeCellColor.bind(this, "cell711", 7, 11)}></td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td className="table-bor" ref="cell80" onClick={this.changeCellColor.bind(this, "cell80", 8, 0)}></td>
                                                                                <td className="table-bor" ref="cell81" onClick={this.changeCellColor.bind(this, "cell81", 8, 1)}></td>
                                                                                <td className="table-bor" ref="cell82" onClick={this.changeCellColor.bind(this, "cell82", 8, 2)}></td>
                                                                                <td className="table-bor" ref="cell83" onClick={this.changeCellColor.bind(this, "cell83", 8, 3)}></td>
                                                                                <td className="table-bor" ref="cell84" onClick={this.changeCellColor.bind(this, "cell84", 8, 4)}></td>
                                                                                <td className="table-bor" ref="cell85" onClick={this.changeCellColor.bind(this, "cell85", 8, 5)}></td>
                                                                                <td className="table-bor" ref="cell86" onClick={this.changeCellColor.bind(this, "cell86", 8, 6)}></td>

                                                                                <td className="table-bor" ref="cell87" onClick={this.changeCellColor.bind(this, "cell87", 8, 7)}></td>
                                                                                <td className="table-bor" ref="cell88" onClick={this.changeCellColor.bind(this, "cell88", 8, 8)}></td>

                                                                                <td className="table-bor" ref="cell89" onClick={this.changeCellColor.bind(this, "cell89", 8, 9)}></td>
                                                                                <td className="table-bor" ref="cell810" onClick={this.changeCellColor.bind(this, "cell810", 8, 10)}></td>
                                                                                <td className="table-bor" ref="cell811" onClick={this.changeCellColor.bind(this, "cell811", 8, 11)}></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="table-bor" ref="cell90" onClick={this.changeCellColor.bind(this, "cell90", 9, 0)}></td>
                                                                                <td className="table-bor" ref="cell91" onClick={this.changeCellColor.bind(this, "cell91", 9, 1)}></td>
                                                                                <td className="table-bor" ref="cell92" onClick={this.changeCellColor.bind(this, "cell92", 9, 2)}></td>
                                                                                <td className="table-bor" ref="cell93" onClick={this.changeCellColor.bind(this, "cell93", 9, 3)}></td>
                                                                                <td className="table-bor" ref="cell94" onClick={this.changeCellColor.bind(this, "cell94", 9, 4)}></td>
                                                                                <td className="table-bor" ref="cell95" onClick={this.changeCellColor.bind(this, "cell95", 9, 5)}></td>
                                                                                <td className="table-bor" ref="cell96" onClick={this.changeCellColor.bind(this, "cell96", 9, 6)}></td>

                                                                                <td className="table-bor" ref="cell97" onClick={this.changeCellColor.bind(this, "cell97", 9, 7)}></td>
                                                                                <td className="table-bor" ref="cell98" onClick={this.changeCellColor.bind(this, "cell98", 9, 8)}></td>

                                                                                <td className="table-bor" ref="cell99" onClick={this.changeCellColor.bind(this, "cell99", 9, 9)}></td>
                                                                                <td className="table-bor" ref="cell910" onClick={this.changeCellColor.bind(this, "cell910", 9, 10)}></td>
                                                                                <td className="table-bor" ref="cell911" onClick={this.changeCellColor.bind(this, "cell911", 9, 11)}></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="table-bor" ref="cell100" onClick={this.changeCellColor.bind(this, "cell100", 10, 0)}></td>
                                                                                <td className="table-bor" ref="cell101" onClick={this.changeCellColor.bind(this, "cell101", 10, 1)}></td>
                                                                                <td className="table-bor" ref="cell102" onClick={this.changeCellColor.bind(this, "cell102", 10, 2)}></td>
                                                                                <td className="table-bor" ref="cell103" onClick={this.changeCellColor.bind(this, "cell103", 10, 3)}></td>
                                                                                <td className="table-bor" ref="cell104" onClick={this.changeCellColor.bind(this, "cell104", 10, 4)}></td>
                                                                                <td className="table-bor" ref="cell105" onClick={this.changeCellColor.bind(this, "cell105", 10, 5)}></td>
                                                                                <td className="table-bor" ref="cell106" onClick={this.changeCellColor.bind(this, "cell106", 10, 6)}></td>

                                                                                <td className="table-bor" ref="cell107" onClick={this.changeCellColor.bind(this, "cell107", 10, 7)}></td>
                                                                                <td className="table-bor" ref="cell108" onClick={this.changeCellColor.bind(this, "cell108", 10, 8)}></td>

                                                                                <td className="table-bor" ref="cell109" onClick={this.changeCellColor.bind(this, "cell109", 10, 9)}></td>
                                                                                <td className="table-bor" ref="cell1010" onClick={this.changeCellColor.bind(this, "cell1010", 10, 10)}></td>
                                                                                <td className="table-bor" ref="cell1011" onClick={this.changeCellColor.bind(this, "cell1011", 10, 11)}></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="table-bor" ref="cell120" onClick={this.changeCellColor.bind(this, "cell120", 12, 0)}></td>
                                                                                <td className="table-bor" ref="cell121" onClick={this.changeCellColor.bind(this, "cell121", 12, 1)}></td>
                                                                                <td className="table-bor" ref="cell122" onClick={this.changeCellColor.bind(this, "cell122", 12, 2)}></td>
                                                                                <td className="table-bor" ref="cell123" onClick={this.changeCellColor.bind(this, "cell123", 12, 3)}></td>
                                                                                <td className="table-bor" ref="cell124" onClick={this.changeCellColor.bind(this, "cell124", 12, 4)}></td>
                                                                                <td className="table-bor" ref="cell125" onClick={this.changeCellColor.bind(this, "cell125", 12, 5)}></td>
                                                                                <td className="table-bor" ref="cell126" onClick={this.changeCellColor.bind(this, "cell126", 12, 6)}></td>
                                                                                <td className="table-bor" ref="cell127" onClick={this.changeCellColor.bind(this, "cell127", 12, 7)}></td>
                                                                                <td className="table-bor" ref="cell128" onClick={this.changeCellColor.bind(this, "cell128", 12, 8)}></td>
                                                                                <td className="table-bor" ref="cell129" onClick={this.changeCellColor.bind(this, "cell129", 12, 9)}></td>
                                                                                <td className="table-bor" ref="cell1210" onClick={this.changeCellColor.bind(this, "cell1210", 12, 10)}></td>
                                                                                <td className="table-bor" ref="cell1211" onClick={this.changeCellColor.bind(this, "cell1211", 12, 11)}></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>
                                                                    <div className="label-c"
                                                                    >C</div>
                                                                    <div className="label-back">Back</div>
                                                                    <div className="label-a"
                                                                    >A</div><div className="label-front">Front</div>
                                                                    <div className="label-b"
                                                                    >B</div><div className="label-l">Left</div>
                                                                    <div className="label-d"
                                                                    >D</div><div className="label-right">Right</div>
                                                                </div>


                                                                <div className="table-tag">
                                                                    <div className="row m-0">
                                                                        <div className="col-4 yellow respon-meter" style={{ cursor: 'pointer' }}
                                                                            onClick={() => { this.setState({ color: "#F6CB26", gasmeterselected: true, electriccurrentselected: false }) }}>
                                                                            <img alt="" src={yellow}></img>
                                                                            <span className="gas-meter">Gas Meter</span>
                                                                        </div>
                                                                        <div className="col-6 yellow respon-meter-electric-meter" style={{ cursor: 'pointer' }}
                                                                            onClick={() => { this.setState({ color: "red", electriccurrentselected: true, gasmeterselected: false }) }}>
                                                                            <img alt="" src={red}></img>
                                                                            <span className="electric-meter">Electric Connect</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div style={{marginTop:'16px'}}>
                                                                     Note
                                                                </div>
                                   
                                                                <div style={{ marginTop: '16px' }}>
                                                                    Step 1: Please select option from Gas Meter and Electric Connect
                                                                  </div>
                                                                <div>
                                                                    Step 2: Please select box from the above grid shown
                                                                 </div>
                                                                 <div style={{marginTop:'16px' , fontWeight:'bold'}}>
                                                                The Gas Meter and Electric Connect location can be left unadded if they are not present or their location is unknown
                                                                    </div>


                                                            </div>
                                                            <div className="col-5 rt-12">
                                                                <div className="row marg-bott">
                                                                    <div className="col-5 col-number">
                                                                        Number Of Occupants:
</div>
                                                                    <div className="col-7 select-serach">
                                                                        <Select
                                                                            showSearch
                                                                            onChange={this.setStateFromOccupants.bind(this)}
                                                                            className="select-options"
                                                                            placeholder="Select Number"
                                                                            optionFilterProp="children"
                                                                            onFocus={onFocus}
                                                                            value={this.state.occupants}
                                                                            name="occupants"
                                                                            onBlur={onBlur}
                                                                            onSearch={onSearch}
                                                                            filterOption={(input, option) =>
                                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                            }
                                                                        >
                                                                            <Option value="1">1</Option>
                                                                            <Option value="2">2</Option>
                                                                            <Option value="3">3</Option>
                                                                            <Option value="4">4</Option>
                                                                            <Option value="5">5</Option>
                                                                            <Option value="6">6</Option>
                                                                            <Option value="7">7</Option>
                                                                            <Option value="8">8</Option>

                                                                        </Select>
                                                                        <div className="err-message-infor">
                                                                            {this.validator.message('Occupants', this.state.occupants, 'required')}
                                                                        </div>



                                                                    </div>
                                                                </div>

                                                                <div className="row marg-bott">
                                                                    <div className="col-5 col-number-pets">
                                                                        Number Of Pets:
</div>
                                                                    <div className="col-7 select-serach">
                                                                        <Select
                                                                            showSearch
                                                                            onChange={this.setStateFromPets.bind(this)}
                                                                            className="select-options"
                                                                            value={this.state.pets}
                                                                            placeholder="Select Number"
                                                                            optionFilterProp="children"

                                                                            onFocus={onFocus}
                                                                            onBlur={onBlur}
                                                                            onSearch={onSearch}
                                                                            filterOption={(input, option) =>
                                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                            }
                                                                        >
                                                                            <Option value="1">1</Option>
                                                                            <Option value="2">2</Option>
                                                                            <Option value="3">3</Option>
                                                                            <Option value="4">4</Option>
                                                                            <Option value="5">5</Option>
                                                                            <Option value="6">6</Option>
                                                                            <Option value="7">7</Option>
                                                                            <Option value="8">8</Option>
                                                                        </Select>
                                                                        <div className="err-message-infor">
                                                                            {this.validator.message('Pets', this.state.pets, 'required')}
                                                                        </div>

                                                                    </div>
                                                                </div>


                                                                <div className="row marg-bott">
                                                                    <div className="col-5 col-number-bedroom">
                                                                        Number Of Bedrooms:
</div>
                                                                    <div className="col-7 select-serach">

                                                                        <Select
                                                                            showSearch
                                                                            onChange={this.setStateFromBedrooms.bind(this)}
                                                                            className="select-options"
                                                                            placeholder="Select Number"
                                                                            value={this.state.bedrooms}
                                                                            optionFilterProp="children"

                                                                            onFocus={onFocus}
                                                                            onBlur={onBlur}
                                                                            onSearch={onSearch}
                                                                            filterOption={(input, option) =>
                                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                            }
                                                                        >
                                                                            <Option value="1">1</Option>
                                                                            <Option value="2">2</Option>
                                                                            <Option value="3">3</Option>
                                                                            <Option value="4">4</Option>
                                                                            <Option value="5">5</Option>
                                                                            <Option value="6">6</Option>
                                                                            <Option value="7">7</Option>
                                                                            <Option value="8">8</Option>
                                                                        </Select>
                                                                        <div className="err-message-infor">
                                                                            {this.validator.message('Bedrooms', this.state.bedrooms, 'required')}
                                                                        </div>



                                                                    </div>
                                                                </div>


                                                                <div className="row marg-shareinfo">
                                                                    <div className="col-5 col-number">
                                                                        <div className="share-info">
                                                                            Share Info With:
</div>
                                                                    </div>
                                                                    <div className="col-7 mt-18 select-serach">



                                                                        <Radio.Group onChange={this.handleCheck} value={this.state.is_active} style={{ display: 'flex' }}>
                                                                            <Radio name="active" value={"Fire Fighters"} >Fire Department</Radio>
                                                                            <Radio name="active" value={"EMT"}>EMT</Radio>
                                                                            <Radio name="active" value={"Fire Fighters and EMT"}>Both</Radio>
                                                                        </Radio.Group>
                                                                        <div className="err-message-infor">
                                                                            {this.validator.message('Share Info', this.state.is_active, 'required')}
                                                                        </div>




                                                                        {/* <FormGroup onChange={this.handleCheck} value={this.state.is_active} style={{ display: 'flex' }}>
<Label check className="ml-4">
<Input type="radio" name="active" value={true} />Fire Department</Label>
<div>
<Label check style={{ marginLeft: '50px' }}>
    <Input type="radio" name="active" value={false} />Police Department</Label>
</div>
</FormGroup>
<div className="err-msg">
{this.validator.message('Department', this.state.is_active, 'required')}
</div> */}
                                                                        {/* <Checkbox
value={this.state.shareinfor}
name="fire"
onChange={this.change}
>
Fire Departmemt
</Checkbox>
<Checkbox
value={this.state.shareinfor}
name="EMS"
>
EMS
</Checkbox> */}
                                                                    </div>
                                                                </div>

                                                                <div className="row marg-basement">
                                                                    <div className="col-5">
                                                                        <div className="share-basement">
                                                                            With Basement
</div>
                                                                    </div>
                                                                    <div className="col-7 mt-9 aligntxt basemen-resp" >
                                                                        <Switch defaultChecked={this.state.onCheck} onChange={this.handleToggle} />
                                                                        {/*
<Switch defaultChecked={this.state.basement}   onChange={this.onBasement} />
*/}

                                                                    </div>
                                                                </div>


                                                                <div className="row marg-handicapeed">
                                                                    <div className="col-5 col-handicapped">
                                                                        Anyone Handicapped
                                                                      </div>
                                                                    <div className="col-7 mt-9 aligntxt basemen-resp" >
                                                                        <Switch defaultChecked={this.state.onHandicapped} onChange={this.handleToggleHandicapped} />

                                                                    </div>
                                                                </div>


                                                                <div className="row marg-construction">
                                                                    <div className="col-5 col-number-contsruction">
                                                                        Construction:
                                                                        </div>
                                                                    <div className="col-7 select-serach">

                                                                        <Select
                                                                            showSearch
                                                                            onChange={this.setStateFromConstruction.bind(this)}
                                                                            className="select-options"
                                                                            placeholder="Type Of Construction"
                                                                            value={this.state.construction}
                                                                            optionFilterProp="children"

                                                                            onFocus={onFocus}
                                                                            onBlur={onBlur}
                                                                            onSearch={onSearch}
                                                                            filterOption={(input, option) =>
                                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                            }
                                                                        >
                                                                            <Option value="One Story">One Story</Option>
                                                                            <Option value="Two-Stories">Two-stories</Option>
                                                                            <Option value="Three-Stories">Three-stories</Option>
                                                                            <Option value="Split Level">Split level</Option>
                                                                        </Select>
                                                                        <div className="err-message-infor">
                                                                            {this.validator.message('Construction', this.state.construction, 'required')}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row marg-shareinfo">
                                                                    <div className="col-5 col-number-house">
                                                                        Type Of House:
                                                                        </div>
                                                                    <div className="col-7 select-serach">
                                                                        <Select
                                                                            showSearch
                                                                            onChange={this.setStateFromHouse.bind(this)}
                                                                            className="select-options"
                                                                            placeholder="Type Of House"
                                                                            value={this.state.house}
                                                                            optionFilterProp="children"
                                                                            onFocus={onFocus}
                                                                            onBlur={onBlur}
                                                                            onSearch={onSearch}
                                                                            filterOption={(input, option) =>
                                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                            }
                                                                        >
                                                                            <Option value="Single family">Single family</Option>
                                                                            <Option value="Condo">Condo</Option>
                                                                            <Option value="Townhouse">Townhouse</Option>
                                                                            <Option value="Co-op">Co-op</Option>

                                                                        </Select>
                                                                        <div className="err-message-infor">
                                                                            {this.validator.message('House', this.state.house, 'required')}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row marg-shareinfo">
                                                                    <div className="col-5 col-number-house">
                                                                        Square Footage:
                                                                    </div>
                                                                    <div className="col-7 select-serach">
                                                                        <input 
                                                                            type="text" 
                                                                            maxLength="7"
                                                                            className="form-control userinfo-input"
                                                                            placeholder="Square Footage"
                                                                            name='squareFootage' 
                                                                            value={this.state.squareFootage}
                                                                            onChange={this.setStateFromSquareFootage.bind(this)} />
                                                                        <div className="err-message-infor">
                                                                            {this.validator.message('Square Footage', this.state.squareFootage, 'required')}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row marg-bott-save">
                                                                    <div className="col-6 col-number">
                                                                    </div>
                                                                    <div className="col-6 mt-9 aligntxt">
                                                                        <Button className="save-button" onClick={this.submitForm}>Save</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        : <div>
                                            <Information></Information>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div> : <div>
                        <Redirect to={{
                            pathname: "/"
                        }} />
                    </div>
                }



            </div>
        );
    }
}
export default withRouter(UserInfo);

