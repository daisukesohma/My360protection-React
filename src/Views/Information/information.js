import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
import { yellow, red, edit, trash } from "../../Views/s3Links";

import { Table } from "react-bootstrap";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { Select } from "antd";
import LocalStorage from "../../Api/LocalStorage";
import Loader from "../../Views/Loader/Loader";
import Api from "../../Api/ApiUtils";
const { Option } = Select;

function onBlur() {
  // console.log('blur');
}

function onFocus() {
  //  console.log('focus');
}

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edtirewuiredmodal: false,
      editmedical: false,
      data: "",
      userinfo: "",
      addmodal: false,
      medicalhistory: "",
      first_name: "",
      last_name: "",
      deleteId: "",
      shareinfo: "",
      deletemodal: false,
      loader: false,
      basementinfo: "",
      handicappedinfo: "",
      electriccurrentselected: false,
      gasmeterselected: false,
      medicalid: "",
      color: "white",
      xcordinatesElectricConnect: "",
      ycordinatesElectricConnect: "",
      xcordinatesGasMeter: "",
      ycordinatesGasMeter: "",
      modal_xcordinatesElectricConnect: "",
      modal_ycordinatesElectricConnect: "",
      modal_xcordinatesGasMeter: "",
      modal_ycordinatesGasMeter: "",
    };
    this.addValidator = new SimpleReactValidator();
    this.validator = new SimpleReactValidator();
    this.addMedicalHistoryValidator = new SimpleReactValidator();
    this.editvalidator = new SimpleReactValidator();
    this.medicaleditvalidator = new SimpleReactValidator();
    this.setStateFromInput = this.setStateFromInput.bind(this);
  }

  setStateFromOccupants(event) {
    //console.log("eveemnt", event)
    this.setState({
      numberofoccupants: event,
    });
  }
  setStateFromPets(event) {
    //console.log("eveemnt", event)
    this.setState({
      numberofpets: event,
    });
  }
  setStateFromBedrooms(event) {
    //console.log("eveemnt", event)
    this.setState({
      numberofbedrooms: event,
    });
  }
  setStateFromConstruction(event) {
    //console.log("eveemnt", event)
    this.setState({
      construction_type: event,
    });
  }
  setStateFromHouse(event) {
    //console.log("eveemnt", event)
    this.setState({
      housetype: event,
    });
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

  setStateFromInput(event) {
    //console.log("data")
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  setStateFromDropdown(event) {
    //console.log("eveemnt", event)
    this.setState({
      shareinfo: event,
    });
  }

  setStateFromBasement(event) {
    //console.log("eveemnt", event)
    this.setState({
      basementinfo: event,
    });
  }

  setStateFromHandicapped(event) {
    //console.log("eveemnt", event)
    this.setState({
      handicappedinfo: event,
    });
  }

  componentDidMount() {
    var _this = this;
    if (localStorage.getItem("user_token") !== null) {
      LocalStorage.getItem("user_management").then((user) => {
        //console.log("userrrrrrrrrrrrr", user)
        _this.setState(
          {
            user: user.id,
            userinfo: user.is_info_added,
            first_name: user.first_name,
            last_name: user.last_name,
            loader: false,
          },
          () => {
            _this.getdata();
          }
        );
      });
    } else {
      _this.props.history.push("/");
    }
    //this.getdata();
  }

  getdata() {
    //var _this = this;
    this.setState({ loader: true });
    //console.log(localStorage.getItem("user_management"))
    //console.log("in get Data", this.state.user)
    let payload = {
      id: this.state.user,
    };
    Api.getdata(payload)
      .then((res) => {
        if (res.data) {
          //console.log("get data of user", res.data)

          this.setState(
            {
              loader: false,
              data: res.data,
              userinfo: res.data && res.data.user_info,
              medicalhistory: res.data && res.data.medical_history,
              first_name: res.data.first_name,
              //last_name:res.data.last_name,
              last_name: res.data.last_name,
              xcordinatesElectricConnect:
                res.data && res.data.user_info && res.data.user_info.xcordinatesElectricConnect,
              ycordinatesElectricConnect:
                res.data && res.data.user_info && res.data.user_info.ycordinatesElectricConnect,
              xcordinatesGasMeter: res.data && res.data.user_info && res.data.user_info.xcordinatesGasMeter,
              ycordinatesGasMeter: res.data && res.data.user_info && res.data.user_info.ycordinatesGasMeter,

              modal_xcordinatesElectricConnect:
                res.data && res.data.user_info && res.data.user_info.xcordinatesElectricConnect,
              modal_ycordinatesElectricConnect:
                res.data && res.data.user_info && res.data.user_info.ycordinatesElectricConnect,
              modal_xcordinatesGasMeter: res.data && res.data.user_info && res.data.user_info.xcordinatesGasMeter,
              modal_ycordinatesGasMeter: res.data && res.data.user_info && res.data.user_info.ycordinatesGasMeter,

              shareinfo: res.data && res.data.user_info && res.data.user_info.share_info_with,
              basementinfo: res.data && res.data.user_info && res.data.user_info.with_basement,
              construction_type: res.data && res.data.user_info && res.data.user_info.construction_type,
              handicappedinfo: res.data && res.data.user_info && res.data.user_info.anyone_handicapped,
              numberofoccupants: res.data && res.data.user_info && res.data.user_info.number_of_occupants,
              numberofbedrooms: res.data && res.data.user_info && res.data.user_info.number_of_bedroom,
              numberofpets: res.data && res.data.user_info && res.data.user_info.number_of_pets,
              housetype: res.data && res.data.user_info && res.data.user_info.house_type,
              squareFootage: res.data && res.data.user_info && res.data.user_info.square_footage,
            },
            () => {
              console.log("Gas Meter in response", this.state.xcordinatesGasMeter, this.state.ycordinatesGasMeter);
              console.log(
                "Electric Current in response",
                this.state.xcordinatesElectricConnect,
                this.state.ycordinatesElectricConnect
              );

              if (this.state.xcordinatesGasMeter === undefined && this.state.ycordinatesGasMeter === undefined) {
                console.log("undefind");
                //this.refs["cell" + this.state.xcordinatesGasMeter + this.state.ycordinatesGasMeter].style.background = "white";
              } else {
                if (
                  typeof this.state.xcordinatesGasMeter !== "null" &&
                  typeof this.state.ycordinatesGasMeter !== "null"
                ) {
                  //console.log("inside the log of setting color of gas meter yellow")
                  this.refs["cell" + this.state.xcordinatesGasMeter + this.state.ycordinatesGasMeter].style.background =
                    "#F6CB26";
                }
              }

              if (
                this.state.xcordinatesElectricConnect === undefined &&
                this.state.ycordinatesElectricConnect === undefined
              ) {
              } else {
                if (
                  typeof this.state.xcordinatesElectricConnect !== "null" &&
                  typeof this.state.ycordinatesElectricConnect !== "null"
                ) {
                  //console.log("inside the log of setting color of electic connect red")
                  this.refs[
                    "cell" + this.state.xcordinatesElectricConnect + this.state.ycordinatesElectricConnect
                  ].style.background = "red";
                }
              }
            }
          );
        } else {
          this.setState({ loader: false });
        }
      })
      .catch(function (err) {
        if (err) {
          toast.error(err.error);
        } else {
          toast.error("Some error occured");
        }
        //this.setState({ loader: false });
      });
  }

  submitForm = () => {
    //console.log("inside the operation function")
    if (this.editvalidator.allValid()) {
      //console.log("inside the operation function")
      this.setState({ loader: true });
      const payload = {
        user_id: this.state.user,
        number_of_occupants: this.state.numberofoccupants,
        number_of_pets: this.state.numberofpets,
        number_of_bedroom: this.state.numberofbedrooms,
        construction_type: this.state.construction_type,
        house_type: this.state.housetype,
        square_footage: this.state.squareFootage,
        with_basement: this.state.basementinfo,
        anyone_handicapped: this.state.handicappedinfo,
        share_info_with: this.state.shareinfo,
        xcordinatesElectricConnect: this.state.xcordinatesElectricConnect,
        ycordinatesElectricConnect: this.state.ycordinatesElectricConnect,
        xcordinatesGasMeter: this.state.xcordinatesGasMeter,
        ycordinatesGasMeter: this.state.ycordinatesGasMeter,
      };
      console.log("Payload of edit user grid vadu", payload);
      Api.userinfoedit(payload)
        .then((response) => {
          if (response.data) {
            // console.log("response", response.data)
            this.setState({
              loader: false,
              edtirewuiredmodal: false,
            });
            toast.success("Update Successfully");
            window.location.reload();
            this.validator.hideMessages();
            this.getdata();
          } else {
            this.setState({
              loader: false,
              // edit: "",
              edtirewuiredmodal: false,
              // pets: "",
              // bedrooms: "",
              // construction: "",
              // house: "",
              // onCheck: 1,
              // onHandicapped: 1,
              // is_active: "",
              //userInfo: true
            });
          }
        })
        .catch((err) => {
          // if (err.status === 400) {
          //     console.log("errro");
          //     toast.error("Please Fill In Grid")

          // }
          //toast.error("Something Went Wrong")
          //this.setState({ loader: false })
          this.setState({
            loader: false,
            // edit: "",
            edtirewuiredmodal: false,
            // pets: "",
            // bedrooms: "",
            // construction: "",
            // house: "",
            // onCheck: 1,
            // onHandicapped: 1,
            // is_active: "",
            //userInfo: true
          });
        });
    } else {
      this.editvalidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };

  setStateFromInputAdd(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  /*-- Show modal Edit*/
  showEditRequiredModal = () => {
    this.setState(
      {
        edtirewuiredmodal: true,
      },
      () => {
        if (this.state.modal_xcordinatesGasMeter === undefined && this.state.modal_ycordinatesGasMeter === undefined) {
        } else {
          if (
            typeof this.state.modal_xcordinatesGasMeter !== "null" &&
            typeof this.state.modal_ycordinatesGasMeter !== "null"
          ) {
            this.refs[
              "modalcell" + this.state.modal_xcordinatesGasMeter + this.state.modal_ycordinatesGasMeter
            ].style.background = "#F6CB26";
          }
        }

        if (
          this.state.modal_xcordinatesElectricConnect === undefined &&
          this.state.modal_ycordinatesElectricConnect === undefined
        ) {
        } else {
          if (
            typeof this.state.modal_xcordinatesElectricConnect !== "null" &&
            typeof this.state.modal_ycordinatesElectricConnect !== "null"
          ) {
            this.refs[
              "modalcell" + this.state.modal_xcordinatesElectricConnect + this.state.modal_ycordinatesElectricConnect
            ].style.background = "red";
          }
        }
      }
    );

    //this.getdata();
  };

  /*-- Cancel modal Edit*/
  handleCancelEditModal = (e) => {
    // console.log(e);
    this.setState({
      edtirewuiredmodal: false,
    });
    this.editvalidator.hideMessages();
  };

  /*-- Cancel modal Edit*/
  handleCancelEditRequireModal = (e) => {
    // console.log(e);
    this.setState({
      editmedical: false,
    });
    this.medicaleditvalidator.hideMessages();
  };

  showDeleteModal = (id) => {
    var _this = this;
    // console.log("id of dekete",id)
    _this.setState({ deleteId: id, deletemodal: true });
  };

  hideDeleteModal = (e) => {
    //console.log(e);
    this.setState({
      deletemodal: false,
    });
  };

  deletemedical() {
    // var _this = this;
    //console.log("delet in submit form" ,this.state.deleteId)
    //this.setState({ loader: true })
    let payload = {
      id: this.state.deleteId,
    };
    Api.deletemedicalmodal(payload)
      .then((res) => {
        if (res) {
          // console.log("res",res)
          toast.success("Medical History Deleted");
          this.getdata();
          this.setState({
            loader: false,
            deletemodal: false,
          });
          // if (res.data) {
          //     //console.log("get data of medical", res.data)
          //     this.setState({
          //         loader: false,
          //         deletemodal:false
          //     });
          //     this.getdata();
          //     toast.success("Medical History Deleted")
          // }
          // else {
          //     this.setState({ loader: false , deletemodal:false });
          // }
        } else {
          this.setState({ loader: false, deletemodal: false });
        }
      })
      .catch(function (err) {
        // console.log("err",err)
        if (err) {
          //toast.error(err.error)
        } else {
          toast.error("Some error occured");
        }
        //this.setState({ loader: false });
      });
  }

  showEditMedical = (id) => {
    var _this = this;
    _this.setState({ medicalid: id, editmedical: true }, () => {
      _this.getmedicaldata();
    });
  };
  getmedicaldata() {
    this.setState({ loader: true });
    let payload = {
      id: this.state.medicalid,
    };
    Api.getdatamedical(payload)
      .then((res) => {
        if (res) {
          if (res.data) {
            //console.log("get data of medical", res.data)
            this.setState({
              loader: false,
              data: res.data,
              name: res.data && res.data.name,
              age: res.data && res.data.age,
              weight: res.data && res.data.weight,
              medicalhistorys: res.data && res.data.medical_history,
              medications: res.data && res.data.medication,
            });
          } else {
            this.setState({ loader: false });
          }
        } else {
          this.setState({ loader: false });
        }
      })
      .catch(function (err) {
        if (err) {
          toast.error(err.error);
        } else {
          toast.error("Some error occured");
        }
        //this.setState({ loader: false });
      });
  }

  editmedicalhistory = () => {
    //console.log("inside the operation function")
    if (this.medicaleditvalidator.allValid()) {
      //console.log("inside the operation function")
      this.setState({ loader: true });
      const payload = {
        id: this.state.medicalid,
        name: this.state.name,
        age: this.state.age,
        weight: this.state.weight,
        medical_history: this.state.medicalhistorys,
        medication: this.state.medications,
      };
      //console.log("Payload", payload)
      Api.updatemedicalhistory(payload)
        .then((response) => {
          if (response.data) {
            this.setState({
              editmedical: false,
              loader: false,
              // name: "",
              // age: "",
              // weight: "",
              // history: "",
              // loader: false,
              // medication: ""
            });
            this.getdata();
            toast.success("Medical History Update Successfully");
            this.medicaleditvalidator.hideMessages();
          } else {
          }
        })
        .catch((err) => {});
    } else {
      this.medicaleditvalidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };

  /*-- Show MODAL OF MEDICAL HISTORY*/
  showModalAdd = () => {
    this.setState({
      addmodal: true,
    });
  };

  /*-- MEDICAL HISTROY MODAL CANCEL OF ADD MODAL*/
  handleCanceladdmodal = (e) => {
    //  console.log(e);
    this.setState({
      addmodal: false,
      name: "",
      age: "",
      weight: "",
      history: "",
      medication: "",
    });
  };

  /*-- API FOR ADD MEDICAL HISTORY */
  addmedicalHistory = () => {
    //console.log("inside the operation function")
    if (this.addMedicalHistoryValidator.allValid()) {
      //console.log("inside the operation function")
      this.setState({ loader: true });
      const payload = {
        user_id: this.state.user,
        name: this.state.name,
        age: this.state.age,
        weight: this.state.weight,
        medical_history: this.state.history,
        medication: this.state.medication,
      };
      // console.log("Payload", payload)
      Api.addmedicalhistory(payload)
        .then((response) => {
          if (response.data) {
            this.setState({
              addmodal: false,
              name: "",
              age: "",
              weight: "",
              history: "",
              loader: false,
              medication: "",
            });
            this.getdata();
          } else {
          }
        })
        .catch((err) => {});
    } else {
      this.addMedicalHistoryValidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };

  // table information
  changeCellColor(refName, x, y) {
    // console.log("change coloe funciton",this.state.xcordinatesGasMeter)
    // console.log("Color change",this.state.color)

    if (this.state.color === "white") {
      //code for cancel
      console.log("x,y", x, y);
      console.log("Gas meter means yellow in changing", this.state.xcordinatesGasMeter, this.state.ycordinatesGasMeter);
      console.log(
        "Electric Current means red in changing",
        this.state.xcordinatesElectricConnect,
        this.state.ycordinatesElectricConnect
      );
      if (x === this.state.xcordinatesGasMeter && y === this.state.ycordinatesGasMeter) {
        this.refs["modalcell" + this.state.xcordinatesGasMeter + this.state.ycordinatesGasMeter].style.background =
          "white";
        // if (this.refs["modalcell" + this.state.xcordinatesGasMeter + this.state.ycordinatesGasMeter].style.background === "white") {
        //     //console.log("setstate")
        //   this.assignCellColor(refName, x, y);
        // }
        this.setState(
          {
            xcordinatesGasMeter: -1,
            ycordinatesGasMeter: -1,
          },
          () => {
            console.log(
              "After Settting the value of gas meter",
              this.state.xcordinatesGasMeter,
              this.state.ycordinatesGasMeter
            );
          }
        );
      } else if (x === this.state.xcordinatesElectricConnect && y === this.state.ycordinatesElectricConnect) {
        this.refs[
          "modalcell" + this.state.xcordinatesElectricConnect + this.state.ycordinatesElectricConnect
        ].style.background = "white";
        // if (this.refs["modalcell" + this.state.xcordinatesElectricConnect + this.state.ycordinatesElectricConnect].style.background === "white") {
        //     this.assignCellColor(refName, x, y);
        // }

        this.setState(
          {
            xcordinatesElectricConnect: -1,
            ycordinatesElectricConnect: -1,
          },
          () => {
            console.log(
              "After Settting the value of electric meter",
              this.state.xcordinatesElectricConnect,
              this.state.ycordinatesElectricConnect
            );
          }
        );
      }
    } else if (this.state.color === "#F6CB26") {
      //code for yellow gas meter
      if (
        (this.state.xcordinatesGasMeter === undefined && this.state.ycordinatesGasMeter === undefined) ||
        (this.state.xcordinatesGasMeter === -1 && this.state.ycordinatesGasMeter === -1)
      ) {
        this.assignCellColor(refName, x, y);
      } else {
        this.refs["modalcell" + this.state.xcordinatesGasMeter + this.state.ycordinatesGasMeter].style.background =
          "white";
        if (
          this.refs["modalcell" + this.state.xcordinatesGasMeter + this.state.ycordinatesGasMeter].style.background ===
          "white"
        ) {
          this.assignCellColor(refName, x, y);
        }
      }
    } else {
      //code for red electic current
      if (
        (this.state.xcordinatesElectricConnect === undefined && this.state.ycordinatesElectricConnect === undefined) ||
        (this.state.xcordinatesElectricConnect === -1 && this.state.ycordinatesElectricConnect === -1)
      ) {
        this.assignCellColor(refName, x, y);
      } else {
        this.refs[
          "modalcell" + this.state.xcordinatesElectricConnect + this.state.ycordinatesElectricConnect
        ].style.background = "white";
        if (
          this.refs["modalcell" + this.state.xcordinatesElectricConnect + this.state.ycordinatesElectricConnect].style
            .background === "white"
        ) {
          this.assignCellColor(refName, x, y);
        }
      }
    }
  }

  assignCellColor(refName, x, y) {
    console.log("color assign", this.state.color);
    this.refs[refName].style.background = this.state.color;

    // if(this.state.color === "white")
    // {

    //    this.setState({
    //     xcordinatesGasMeter: -1,
    //     ycordinatesGasMeter: -1,

    //    },console.log("assign color function",this.state.color,this.state.xcordinatesGasMeter,this.state.ycordinatesGasMeter))
    // }
    // else
    // {
    //     console.log("inside the else condition")
    //     this.setState({
    //         xcordinatesElectricConnect: -1,
    //         ycordinatesElectricConnect: -1,

    //        })
    // }
    if (this.state.color === "#F6CB26") {
      this.setState(
        {
          xcordinatesGasMeter: x,
          ycordinatesGasMeter: y,

          //color:this.state.color
        },
        () => {
          //console.log("SetState of GAS meter", this.state.xcordinatesGasMeter, this.state.ycordinatesGasMeter)
        }
      );
    } else {
      this.setState(
        {
          xcordinatesElectricConnect: x,
          ycordinatesElectricConnect: y,

          //color:this.state.color
        },
        () => {
          // console.log("SetState of Electric Connect", this.state.xcordinatesElectricConnect, this.state.ycordinatesElectricConnect)
        }
      );
    }
  }

  render() {
    return (
      <div>
        {localStorage.getItem("user_token") !== null ? (
          //with token
          <div>
            <div data-spy="scroll" data-target=".navbar">
              <div>
                {this.state.loader ? <Loader /> : null}
                <div style={this.state.loader ? { opacity: "0.4" } : null}>
                  <div className="main-bk">
                    <div className="container conatiner-information">
                      <div className="information-row">
                        <div className="row m-0">
                          <div className="col-12 inform-col">
                            {/*
                                                     <img alt="" src={edit} className="edit-icon-info"></img>
                                                    */}
                          </div>
                        </div>
                        <div className="row m-0 styl-info-row">
                          <div className="col-4 txt-name-info">
                            {this.state.first_name ? this.state.first_name : "-"}{" "}
                            {this.state.last_name ? this.state.last_name : "-"}
                          </div>
                          <div className="col-3 emial-addess-col">
                            <div className="email-address">Email Address</div>
                            <div className="emial">{this.state.data.email ? this.state.data.email : "-"}</div>
                          </div>
                          <div className="col-2 phone-number">
                            <div className="email-address">Phone Number</div>
                            <div className="emial">
                              {this.state.data.mobile_number ? this.state.data.mobile_number : "-"}
                            </div>
                          </div>

                          <div className="col-2 phone-number">
                            <div className="email-address">Apartment Number</div>
                            <div className="emial">
                              {this.state.data.apartment_number ? this.state.data.apartment_number : "-"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="required-info-row">
                        <div className="row m-0">
                          <div className="col-12 inform-col">
                            <img
                              alt=""
                              src={edit}
                              className="edit-icon-info"
                              onClick={this.showEditRequiredModal}
                            ></img>
                          </div>
                        </div>

                        <div className="row m-0">
                          <div className="required-info">Required Info</div>
                        </div>

                        <div className="row m-0">
                          <div className="col-4 table-order">
                            <div className="position-relative">
                              <Table striped bordered hover size="sm" className="table-information-res">
                                <tbody>
                                  <tr>
                                    <td className="table-bor" ref="cell00"></td>
                                    <td className="table-bor" ref="cell01"></td>
                                    <td className="table-bor" ref="cell02"></td>
                                    <td className="table-bor" ref="cell03"></td>
                                    <td className="table-bor" ref="cell04"></td>
                                    <td className="table-bor" ref="cell05"></td>
                                    <td className="table-bor" ref="cell06"></td>
                                    <td className="table-bor" ref="cell07"></td>
                                    <td className="table-bor" ref="cell08"></td>
                                    <td className="table-bor" ref="cell09"></td>
                                    <td className="table-bor" ref="cell010"></td>
                                    <td className="table-bor" ref="cell011"></td>
                                  </tr>
                                  <tr>
                                    <td className="table-bor" ref="cell10"></td>
                                    <td className="table-bor" ref="cell11"></td>
                                    <td className="table-bor" ref="cell12"></td>

                                    <td className="table-bor" ref="cell13"></td>
                                    <td className="table-bor" ref="cell14"></td>

                                    <td className="table-bor" ref="cell15"></td>
                                    <td className="table-bor" ref="cell16"></td>

                                    <td className="table-bor" ref="cell17"></td>
                                    <td className="table-bor" ref="cell18"></td>
                                    <td className="table-bor" ref="cell19"></td>
                                    <td className="table-bor" ref="cell110"></td>
                                    <td className="table-bor" ref="cell111"></td>
                                  </tr>
                                  <tr>
                                    <td className="table-bor" ref="cell20"></td>
                                    <td className="table-bor" ref="cell21"></td>
                                    <td className="table-bor" ref="cell22"></td>
                                    <td className="table-bor" ref="cell23"></td>
                                    <td className="table-bor" ref="cell24"></td>
                                    <td className="table-bor" ref="cell25"></td>
                                    <td className="table-bor" ref="cell26"></td>
                                    <td className="table-bor" ref="cell27"></td>
                                    <td className="table-bor" ref="cell28"></td>

                                    <td className="table-bor" ref="cell29"></td>
                                    <td className="table-bor" ref="cell210"></td>
                                    <td className="table-bor" ref="cell211"></td>
                                  </tr>
                                  <tr>
                                    <td className="table-bor" ref="cell30"></td>
                                    <td className="table-bor" ref="cell31"></td>
                                    <td className="table-bor" ref="cell32"></td>
                                    <td className="table-bor" ref="cell33"></td>
                                    <td className="table-bor" ref="cell34"></td>
                                    <td className="table-bor" ref="cell35"></td>
                                    <td className="table-bor" ref="cell36"></td>

                                    <td className="table-bor" ref="cell37"></td>
                                    <td className="table-bor" ref="cell38"></td>

                                    <td className="table-bor" ref="cell39"></td>
                                    <td className="table-bor" ref="cell310"></td>
                                    <td className="table-bor" ref="cell311"></td>
                                  </tr>

                                  <tr>
                                    <td className="table-bor" ref="cell40"></td>
                                    <td className="table-bor" ref="cell41"></td>
                                    <td className="table-bor" ref="cell42"></td>
                                    <td className="table-bor" ref="cell43"></td>
                                    <td className="table-bor" ref="cell44"></td>
                                    <td className="table-bor" ref="cell45"></td>
                                    <td className="table-bor" ref="cell46"></td>

                                    <td className="table-bor" ref="cell47"></td>
                                    <td className="table-bor" ref="cell48"></td>

                                    <td className="table-bor" ref="cell49"></td>
                                    <td className="table-bor" ref="cell410"></td>
                                    <td className="table-bor" ref="cell411"></td>
                                  </tr>

                                  <tr>
                                    <td className="table-bor" ref="cell50"></td>
                                    <td className="table-bor" ref="cell51"></td>
                                    <td className="table-bor" ref="cell52"></td>
                                    <td className="table-bor" ref="cell53"></td>
                                    <td className="table-bor" ref="cell54"></td>
                                    <td className="table-bor" ref="cell55"></td>
                                    <td className="table-bor" ref="cell56"></td>

                                    <td className="table-bor" ref="cell57"></td>
                                    <td className="table-bor" ref="cell58"></td>

                                    <td className="table-bor" ref="cell59"></td>
                                    <td className="table-bor" ref="cell510"></td>
                                    <td className="table-bor" ref="cell511"></td>
                                  </tr>

                                  <tr>
                                    <td className="table-bor" ref="cell60"></td>
                                    <td className="table-bor" ref="cell61"></td>
                                    <td className="table-bor" ref="cell62"></td>
                                    <td className="table-bor" ref="cell63"></td>
                                    <td className="table-bor" ref="cell64"></td>
                                    <td className="table-bor" ref="cell65"></td>
                                    <td className="table-bor" ref="cell66"></td>

                                    <td className="table-bor" ref="cell67"></td>
                                    <td className="table-bor" ref="cell68"></td>

                                    <td className="table-bor" ref="cell69"></td>
                                    <td className="table-bor" ref="cell610"></td>
                                    <td className="table-bor" ref="cell611"></td>
                                  </tr>
                                  <tr>
                                    <td className="table-bor" ref="cell70"></td>
                                    <td className="table-bor" ref="cell71"></td>
                                    <td className="table-bor" ref="cell72"></td>
                                    <td className="table-bor" ref="cell73"></td>
                                    <td className="table-bor" ref="cell74"></td>
                                    <td className="table-bor" ref="cell75"></td>
                                    <td className="table-bor" ref="cell76"></td>

                                    <td className="table-bor" ref="cell77"></td>
                                    <td className="table-bor" ref="cell78"></td>

                                    <td className="table-bor" ref="cell79"></td>
                                    <td className="table-bor" ref="cell710"></td>
                                    <td className="table-bor" ref="cell711"></td>
                                  </tr>

                                  <tr>
                                    <td className="table-bor" ref="cell80"></td>
                                    <td className="table-bor" ref="cell81"></td>
                                    <td className="table-bor" ref="cell82"></td>
                                    <td className="table-bor" ref="cell83"></td>
                                    <td className="table-bor" ref="cell84"></td>
                                    <td className="table-bor" ref="cell85"></td>
                                    <td className="table-bor" ref="cell86"></td>

                                    <td className="table-bor" ref="cell87"></td>
                                    <td className="table-bor" ref="cell88"></td>

                                    <td className="table-bor" ref="cell89"></td>
                                    <td className="table-bor" ref="cell810"></td>
                                    <td className="table-bor" ref="cell811"></td>
                                  </tr>
                                  <tr>
                                    <td className="table-bor" ref="cell90"></td>
                                    <td className="table-bor" ref="cell91"></td>
                                    <td className="table-bor" ref="cell92"></td>
                                    <td className="table-bor" ref="cell93"></td>
                                    <td className="table-bor" ref="cell94"></td>
                                    <td className="table-bor" ref="cell95"></td>
                                    <td className="table-bor" ref="cell96"></td>

                                    <td className="table-bor" ref="cell97"></td>
                                    <td className="table-bor" ref="cell98"></td>

                                    <td className="table-bor" ref="cell99"></td>
                                    <td className="table-bor" ref="cell910"></td>
                                    <td className="table-bor" ref="cell911"></td>
                                  </tr>
                                  <tr>
                                    <td className="table-bor" ref="cell100"></td>
                                    <td className="table-bor" ref="cell101"></td>
                                    <td className="table-bor" ref="cell102"></td>
                                    <td className="table-bor" ref="cell103"></td>
                                    <td className="table-bor" ref="cell104"></td>
                                    <td className="table-bor" ref="cell105"></td>
                                    <td className="table-bor" ref="cell106"></td>

                                    <td className="table-bor" ref="cell107"></td>
                                    <td className="table-bor" ref="cell108"></td>

                                    <td className="table-bor" ref="cell109"></td>
                                    <td className="table-bor" ref="cell1010"></td>
                                    <td className="table-bor" ref="cell1011"></td>
                                  </tr>
                                  <tr>
                                    <td className="table-bor" ref="cell120"></td>
                                    <td className="table-bor" ref="cell121"></td>
                                    <td className="table-bor" ref="cell122"></td>
                                    <td className="table-bor" ref="cell123"></td>
                                    <td className="table-bor" ref="cell124"></td>
                                    <td className="table-bor" ref="cell125"></td>
                                    <td className="table-bor" ref="cell126"></td>
                                    <td className="table-bor" ref="cell127"></td>
                                    <td className="table-bor" ref="cell128"></td>
                                    <td className="table-bor" ref="cell129"></td>
                                    <td className="table-bor" ref="cell1210"></td>
                                    <td className="table-bor" ref="cell1211"></td>
                                  </tr>
                                </tbody>
                              </Table>
                              <div className="label-c">C</div>
                              <div className="label-back">Back</div>
                              <div className="label-a">A</div>
                              <div className="label-front">Front</div>
                              <div className="label-b-userinformation">B</div>
                              <div className="label-l-userinformation">Left</div>
                              <div className="label-d-userinformation">D</div>
                              <div className="label-right-userinformation">Right</div>
                            </div>

                            <div className="table-tag-information">
                              <div className="row m-0">
                                <div className="col-4 yellow respon-gasmeter">
                                  <img alt="" src={yellow}></img>
                                  <span className="gas-meter">Gas Meter</span>
                                </div>
                                <div className="col-6 yellow respon-gasmeter">
                                  <img alt="" src={red}></img>
                                  <span className="electric-meter">Electric Connect</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-7 column-required-info">
                            <div className="row m-0">
                              <div className="col-4 numbers-colums">
                                <div className="number-of">Number Of Occupants</div>
                                <div className="code-number">
                                  {this.state.userinfo && this.state.userinfo.number_of_occupants
                                    ? this.state.userinfo.number_of_occupants
                                    : "-"}
                                </div>
                              </div>
                              <div className="col-4 number-of-pets numbers-colums">
                                <div className="number-of">Number Of Pets</div>
                                <div className="code-number">
                                  {this.state.userinfo && this.state.userinfo.number_of_pets
                                    ? this.state.userinfo.number_of_pets
                                    : "-"}
                                </div>
                              </div>
                              <div className="col-4 ro-handicapped number-handicappeds">
                                <div className="number-of">Number Of Bedroom</div>
                                <div className="code-number">
                                  {this.state.userinfo && this.state.userinfo.number_of_bedroom
                                    ? this.state.userinfo.number_of_bedroom
                                    : "-"}
                                </div>
                              </div>
                            </div>

                            <div className="row m-0 col-req">
                              <div className="col-4 numbers-colums">
                                <div className="number-of">Share Info With</div>
                                <div className="code-number">
                                  {this.state.userinfo && this.state.userinfo.share_info_with
                                    ? this.state.userinfo.share_info_with
                                    : "-"}
                                </div>
                              </div>
                              <div className="col-4 number-of-pets">
                                <div className="number-of">With Basement</div>
                                <div className="code-number">
                                  {this.state.userinfo && this.state.userinfo.with_basement
                                    ? this.state.userinfo.with_basement
                                    : "-"}
                                </div>
                              </div>

                              <div className="col-4 ro-handicapped numbers-colums number-handicappeds">
                                <div className="number-of">Is Anyone Handicapped</div>
                                <div className="code-number">
                                  {this.state.userinfo && this.state.userinfo.anyone_handicapped
                                    ? this.state.userinfo.anyone_handicapped
                                    : "-"}
                                </div>
                              </div>
                            </div>

                            <div className="row m-0 col-req">
                              <div className="col-4 numbers-colums">
                                <div className="number-of">Construction</div>
                                <div className="code-number">
                                  {this.state.userinfo && this.state.userinfo.construction_type
                                    ? this.state.userinfo.construction_type
                                    : "-"}
                                </div>
                              </div>
                              <div className="col-4 number-of-pets number-colo">
                                <div className="number-of">Type Of House</div>
                                <div className="code-number">
                                  {this.state.userinfo && this.state.userinfo.house_type
                                    ? this.state.userinfo.house_type
                                    : "-"}
                                </div>
                              </div>
                              <div className="col-4 ro-handicapped numbers-colums number-handicappeds">
                                <div className="number-of">Square Footage</div>
                                <div className="code-number">
                                  {this.state.userinfo && this.state.userinfo.square_footage
                                    ? this.state.userinfo.square_footage
                                    : "-"}
                                </div>
                              </div>
                            </div>

                            <div className="row m-0 col-requested">
                              <div className="col-4 med-his">
                                <div className="code-number">Medical History</div>
                              </div>
                              <div className="col-8 add-button-information add-new-responsive">
                                <Button className="add-new-button" onClick={this.showModalAdd}>
                                  Add New
                                </Button>
                              </div>
                            </div>

                            {this.state.medicalhistory ? (
                              this.state.medicalhistory.map((product, i) => (
                                <div className="row m-0">
                                  <div className="col-12 card-medical-fileds">
                                    <div className="card cardd-css">
                                      <div className="card-body medicalhistroy">
                                        <div className="row">
                                          <div className="col-6">
                                            <div className="text-name-medical">
                                              {product && product.name ? product.name : ""}
                                            </div>
                                          </div>
                                          <div className="col-6">
                                            <div className="buttons-response-icons">
                                              <img
                                                alt=""
                                                src={edit}
                                                className="editt-images"
                                                onClick={this.showEditMedical.bind(this, product.id)}
                                              ></img>
                                              <img
                                                alt=""
                                                src={trash}
                                                className="trash-images"
                                                onClick={this.showDeleteModal.bind(this, product.id)}
                                              ></img>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="col-2 d-flex ageee">
                                            <div className="age">Age:</div>
                                            <div className="years">
                                              {product && product.age ? product.age : ""} years
                                            </div>
                                          </div>
                                          <div className="col-4 d-flex ageee">
                                            <div className="age">Estimation Weight:</div>
                                            <div className="years">
                                              {product && product.weight ? product.weight : ""} Lbs
                                            </div>
                                          </div>
                                        </div>
                                        <div className="temedical-history">Medical History</div>
                                        <div className="text-name-medical-text">
                                          {product && product.medical_history ? product.medical_history : ""}
                                        </div>
                                        <div className="text-name-medical-history">Medication</div>
                                        <div className="text-name-medical-text">
                                          {product && product.medication ? product.medication : ""}
                                        </div>
                                        <div className="row m-0 float-right">
                                          <div className="col-12">
                                            <span className="selected-chelboxed">
                                              Last Updated:{" "}
                                              {moment.utc(product.updatetimeStamp).local().format("MM/DD/YYYY")
                                                ? moment.utc(product.updatetimeStamp).local().format("MM/DD/YYYY")
                                                : ""}
                                            </span>
                                          </div>

                                          {/* updatedTimeStamp */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div>
                                <div className="card-body medical-body">
                                  <div className="text-name-medical">
                                    <div style={{ textAlign: "center" }}>No Data Found</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* edit reuired modal fileds*/}
                      <Modal visible={this.state.edtirewuiredmodal} width={700} onCancel={this.handleCancelEditModal}>
                        {this.state.loader ? <Loader /> : null}
                        <div style={this.state.loader ? { opacity: "0.4" } : null}>
                          <div id="head-modal">
                            <div>Edit Profile</div>
                          </div>

                          {/* table row*/}
                          <div>
                            <div className="col-12 table-order-modal">
                              <div className="position-relative">
                                <Table striped bordered hover size="sm" className="table-information-res-modal">
                                  <tbody>
                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell00"
                                        onClick={this.changeCellColor.bind(this, "modalcell00", 0, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell01"
                                        onClick={this.changeCellColor.bind(this, "modalcell01", 0, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell02"
                                        onClick={this.changeCellColor.bind(this, "modalcell02", 0, 2)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell03"
                                        onClick={this.changeCellColor.bind(this, "modalcell03", 0, 3)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell04"
                                        onClick={this.changeCellColor.bind(this, "modalcell04", 0, 4)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell05"
                                        onClick={this.changeCellColor.bind(this, "modalcell05", 0, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell06"
                                        onClick={this.changeCellColor.bind(this, "modalcell06", 0, 6)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell07"
                                        onClick={this.changeCellColor.bind(this, "modalcell07", 0, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell08"
                                        onClick={this.changeCellColor.bind(this, "modalcell08", 0, 8)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell09"
                                        onClick={this.changeCellColor.bind(this, "modalcell09", 0, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell010"
                                        onClick={this.changeCellColor.bind(this, "modalcell010", 0, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell011"
                                        onClick={this.changeCellColor.bind(this, "modalcell011", 0, 11)}
                                      ></td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell10"
                                        onClick={this.changeCellColor.bind(this, "modalcell10", 1, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell11"
                                        onClick={this.changeCellColor.bind(this, "modalcell11", 1, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell12"
                                        onClick={this.changeCellColor.bind(this, "modalcell12", 1, 2)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell13"
                                        onClick={this.changeCellColor.bind(this, "modalcell13", 1, 3)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell14"
                                        onClick={this.changeCellColor.bind(this, "modalcell14", 1, 4)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell15"
                                        onClick={this.changeCellColor.bind(this, "modalcell15", 1, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell16"
                                        onClick={this.changeCellColor.bind(this, "modalcell16", 1, 6)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell17"
                                        onClick={this.changeCellColor.bind(this, "modalcell17", 1, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell18"
                                        onClick={this.changeCellColor.bind(this, "modalcell18", 1, 8)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell19"
                                        onClick={this.changeCellColor.bind(this, "modalcell19", 1, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell110"
                                        onClick={this.changeCellColor.bind(this, "modalcell110", 1, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell111"
                                        onClick={this.changeCellColor.bind(this, "modalcell111", 1, 11)}
                                      ></td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell20"
                                        onClick={this.changeCellColor.bind(this, "modalcell20", 2, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell21"
                                        onClick={this.changeCellColor.bind(this, "modalcell21", 2, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell22"
                                        onClick={this.changeCellColor.bind(this, "modalcell22", 2, 2)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell23"
                                        onClick={this.changeCellColor.bind(this, "modalcell23", 2, 3)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell24"
                                        onClick={this.changeCellColor.bind(this, "modalcell24", 2, 4)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell25"
                                        onClick={this.changeCellColor.bind(this, "modalcell25", 2, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell26"
                                        onClick={this.changeCellColor.bind(this, "modalcell26", 2, 6)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell27"
                                        onClick={this.changeCellColor.bind(this, "modalcell27", 2, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell28"
                                        onClick={this.changeCellColor.bind(this, "modalcell28", 2, 8)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell29"
                                        onClick={this.changeCellColor.bind(this, "modalcell29", 2, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell210"
                                        onClick={this.changeCellColor.bind(this, "modalcell210", 2, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell211"
                                        onClick={this.changeCellColor.bind(this, "modalcell211", 2, 11)}
                                      ></td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell30"
                                        onClick={this.changeCellColor.bind(this, "modalcell30", 3, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell31"
                                        onClick={this.changeCellColor.bind(this, "modalcell31", 3, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell32"
                                        onClick={this.changeCellColor.bind(this, "modalcell32", 3, 2)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell33"
                                        onClick={this.changeCellColor.bind(this, "modalcell33", 3, 3)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell34"
                                        onClick={this.changeCellColor.bind(this, "modalcell34", 3, 4)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell35"
                                        onClick={this.changeCellColor.bind(this, "modalcell35", 3, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell36"
                                        onClick={this.changeCellColor.bind(this, "modalcell36", 3, 6)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell37"
                                        onClick={this.changeCellColor.bind(this, "modalcell37", 3, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell38"
                                        onClick={this.changeCellColor.bind(this, "modalcell38", 3, 8)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell39"
                                        onClick={this.changeCellColor.bind(this, "modalcell39", 3, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell310"
                                        onClick={this.changeCellColor.bind(this, "modalcell310", 3, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell311"
                                        onClick={this.changeCellColor.bind(this, "modalcell311", 3, 11)}
                                      ></td>
                                    </tr>

                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell40"
                                        onClick={this.changeCellColor.bind(this, "modalcell40", 4, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell41"
                                        onClick={this.changeCellColor.bind(this, "modalcell41", 4, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell42"
                                        onClick={this.changeCellColor.bind(this, "modalcell42", 4, 2)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell43"
                                        onClick={this.changeCellColor.bind(this, "modalcell43", 4, 3)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell44"
                                        onClick={this.changeCellColor.bind(this, "modalcell44", 4, 4)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell45"
                                        onClick={this.changeCellColor.bind(this, "modalcell45", 4, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell46"
                                        onClick={this.changeCellColor.bind(this, "modalcell46", 4, 6)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell47"
                                        onClick={this.changeCellColor.bind(this, "modalcell47", 4, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell48"
                                        onClick={this.changeCellColor.bind(this, "modalcell48", 4, 8)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell49"
                                        onClick={this.changeCellColor.bind(this, "modalcell49", 4, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell410"
                                        onClick={this.changeCellColor.bind(this, "modalcell410", 4, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell411"
                                        onClick={this.changeCellColor.bind(this, "modalcell411", 4, 11)}
                                      ></td>
                                    </tr>

                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell50"
                                        onClick={this.changeCellColor.bind(this, "modalcell50", 5, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell51"
                                        onClick={this.changeCellColor.bind(this, "modalcell51", 5, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell52"
                                        onClick={this.changeCellColor.bind(this, "modalcell52", 5, 2)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell53"
                                        onClick={this.changeCellColor.bind(this, "modalcell53", 5, 3)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell54"
                                        onClick={this.changeCellColor.bind(this, "modalcell54", 5, 4)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell55"
                                        onClick={this.changeCellColor.bind(this, "modalcell55", 5, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell56"
                                        onClick={this.changeCellColor.bind(this, "modalcell56", 5, 6)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell57"
                                        onClick={this.changeCellColor.bind(this, "modalcell57", 5, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell58"
                                        onClick={this.changeCellColor.bind(this, "modalcell58", 5, 8)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell59"
                                        onClick={this.changeCellColor.bind(this, "modalcell59", 5, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell510"
                                        onClick={this.changeCellColor.bind(this, "modalcell510", 5, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell511"
                                        onClick={this.changeCellColor.bind(this, "modalcell511", 5, 11)}
                                      ></td>
                                    </tr>

                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell60"
                                        onClick={this.changeCellColor.bind(this, "modalcell60", 6, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell61"
                                        onClick={this.changeCellColor.bind(this, "modalcell61", 6, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell62"
                                        onClick={this.changeCellColor.bind(this, "modalcell62", 6, 2)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell63"
                                        onClick={this.changeCellColor.bind(this, "modalcell63", 6, 3)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell64"
                                        onClick={this.changeCellColor.bind(this, "modalcell64", 6, 4)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell65"
                                        onClick={this.changeCellColor.bind(this, "modalcell65", 6, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell66"
                                        onClick={this.changeCellColor.bind(this, "modalcell66", 6, 6)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell67"
                                        onClick={this.changeCellColor.bind(this, "modalcell67", 6, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell68"
                                        onClick={this.changeCellColor.bind(this, "modalcell68", 6, 8)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell69"
                                        onClick={this.changeCellColor.bind(this, "modalcell69", 6, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell610"
                                        onClick={this.changeCellColor.bind(this, "modalcell610", 6, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell611"
                                        onClick={this.changeCellColor.bind(this, "modalcell611", 6, 11)}
                                      ></td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell70"
                                        onClick={this.changeCellColor.bind(this, "modalcell70", 7, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell71"
                                        onClick={this.changeCellColor.bind(this, "modalcell71", 7, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell72"
                                        onClick={this.changeCellColor.bind(this, "modalcell72", 7, 2)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell73"
                                        onClick={this.changeCellColor.bind(this, "modalcell73", 7, 3)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell74"
                                        onClick={this.changeCellColor.bind(this, "modalcell74", 7, 4)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell75"
                                        onClick={this.changeCellColor.bind(this, "modalcell75", 7, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell76"
                                        onClick={this.changeCellColor.bind(this, "modalcell76", 7, 6)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell77"
                                        onClick={this.changeCellColor.bind(this, "modalcell77", 7, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell78"
                                        onClick={this.changeCellColor.bind(this, "modalcell78", 7, 8)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell79"
                                        onClick={this.changeCellColor.bind(this, "modalcell79", 7, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell710"
                                        onClick={this.changeCellColor.bind(this, "modalcell710", 7, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell711"
                                        onClick={this.changeCellColor.bind(this, "modalcell711", 7, 11)}
                                      ></td>
                                    </tr>

                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell80"
                                        onClick={this.changeCellColor.bind(this, "modalcell80", 8, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell81"
                                        onClick={this.changeCellColor.bind(this, "modalcell81", 8, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell82"
                                        onClick={this.changeCellColor.bind(this, "modalcell82", 8, 2)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell83"
                                        onClick={this.changeCellColor.bind(this, "modalcell83", 8, 3)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell84"
                                        onClick={this.changeCellColor.bind(this, "modalcell84", 8, 4)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell85"
                                        onClick={this.changeCellColor.bind(this, "modalcell85", 8, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell86"
                                        onClick={this.changeCellColor.bind(this, "modalcell86", 8, 6)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell87"
                                        onClick={this.changeCellColor.bind(this, "modalcell87", 8, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell88"
                                        onClick={this.changeCellColor.bind(this, "modalcell88", 8, 8)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell89"
                                        onClick={this.changeCellColor.bind(this, "modalcell89", 8, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell810"
                                        onClick={this.changeCellColor.bind(this, "modalcell810", 8, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell811"
                                        onClick={this.changeCellColor.bind(this, "modalcell811", 8, 11)}
                                      ></td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell90"
                                        onClick={this.changeCellColor.bind(this, "modalcell90", 9, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell91"
                                        onClick={this.changeCellColor.bind(this, "modalcell91", 9, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell92"
                                        onClick={this.changeCellColor.bind(this, "modalcell92", 9, 2)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell93"
                                        onClick={this.changeCellColor.bind(this, "modalcell93", 9, 3)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell94"
                                        onClick={this.changeCellColor.bind(this, "modalcell94", 9, 4)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell95"
                                        onClick={this.changeCellColor.bind(this, "modalcell95", 9, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell96"
                                        onClick={this.changeCellColor.bind(this, "modalcell96", 9, 6)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell97"
                                        onClick={this.changeCellColor.bind(this, "modalcell97", 9, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell98"
                                        onClick={this.changeCellColor.bind(this, "modalcell98", 9, 8)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell99"
                                        onClick={this.changeCellColor.bind(this, "modalcell99", 9, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell910"
                                        onClick={this.changeCellColor.bind(this, "modalcell910", 9, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell911"
                                        onClick={this.changeCellColor.bind(this, "modalcell911", 9, 11)}
                                      ></td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell100"
                                        onClick={this.changeCellColor.bind(this, "modalcell100", 10, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell101"
                                        onClick={this.changeCellColor.bind(this, "modalcell101", 10, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell102"
                                        onClick={this.changeCellColor.bind(this, "modalcell102", 10, 2)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell103"
                                        onClick={this.changeCellColor.bind(this, "modalcell103", 10, 3)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell104"
                                        onClick={this.changeCellColor.bind(this, "modalcell104", 10, 4)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell105"
                                        onClick={this.changeCellColor.bind(this, "modalcell105", 10, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell106"
                                        onClick={this.changeCellColor.bind(this, "modalcell106", 10, 6)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell107"
                                        onClick={this.changeCellColor.bind(this, "modalcell107", 10, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell108"
                                        onClick={this.changeCellColor.bind(this, "modalcell108", 10, 8)}
                                      ></td>

                                      <td
                                        className="table-bor"
                                        ref="modalcell109"
                                        onClick={this.changeCellColor.bind(this, "modalcell109", 10, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell1010"
                                        onClick={this.changeCellColor.bind(this, "modalcell1010", 10, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell1011"
                                        onClick={this.changeCellColor.bind(this, "modalcell1011", 10, 11)}
                                      ></td>
                                    </tr>
                                    <tr>
                                      <td
                                        className="table-bor"
                                        ref="modalcell120"
                                        onClick={this.changeCellColor.bind(this, "modalcell120", 12, 0)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell121"
                                        onClick={this.changeCellColor.bind(this, "modalcell121", 12, 1)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell122"
                                        onClick={this.changeCellColor.bind(this, "modalcell122", 12, 2)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell123"
                                        onClick={this.changeCellColor.bind(this, "modalcell123", 12, 3)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell124"
                                        onClick={this.changeCellColor.bind(this, "modalcell124", 12, 4)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell125"
                                        onClick={this.changeCellColor.bind(this, "modalcell125", 12, 5)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell126"
                                        onClick={this.changeCellColor.bind(this, "modalcell126", 12, 6)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell127"
                                        onClick={this.changeCellColor.bind(this, "modalcell127", 12, 7)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell128"
                                        onClick={this.changeCellColor.bind(this, "modalcell128", 12, 8)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell129"
                                        onClick={this.changeCellColor.bind(this, "modalcell129", 12, 9)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell1210"
                                        onClick={this.changeCellColor.bind(this, "modalcell1210", 12, 10)}
                                      ></td>
                                      <td
                                        className="table-bor"
                                        ref="modalcell1211"
                                        onClick={this.changeCellColor.bind(this, "modalcell1211", 12, 11)}
                                      ></td>
                                    </tr>
                                  </tbody>
                                </Table>
                                <div className="label-c">C</div>
                                <div className="label-back">Back</div>
                                <div className="label-a">A</div>
                                <div className="label-front">Front</div>
                                <div className="label-b-userinformation">B</div>
                                <div className="label-l-userinformation">Left</div>
                                <div className="label-edit-userinformation">D</div>
                                <div className="labelrr-userinformation">Right</div>
                              </div>

                              <div className="tables-tags-information">
                                <div className="row m-0">
                                  <div
                                    className="col-4 yellow respon-gasmeter"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      this.setState({
                                        color: "#F6CB26",
                                        gasmeterselected: true,
                                        electriccurrentselected: false,
                                      });
                                    }}
                                  >
                                    <img alt="" src={yellow}></img>
                                    <span className="gas-meter">Gas Meter</span>
                                  </div>
                                  <div
                                    className="col-4 yellow respon-gasmeter"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      this.setState({
                                        color: "red",
                                        electriccurrentselected: true,
                                        gasmeterselected: false,
                                      });
                                    }}
                                  >
                                    <img alt="" src={red}></img>
                                    <span className="electric-meter">Electric Connect</span>
                                  </div>
                                  <div
                                    className="col-12"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      this.setState({
                                        color: "white",
                                        electriccurrentselected: false,
                                        gasmeterselected: false,
                                      });
                                    }}
                                  >
                                    {/* <img alt="" src={yellow}></img>  */}
                                    <span className="electric-meter">
                                      <Button className="remove-gas-electric">
                                        Remove Gas Meter and Electric Connect by clicking this button and the colored
                                        square on the grid
                                      </Button>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row m-0 edit-profile">
                            <div className="col-4 nametags">
                              <div>Number Of Occupants:</div>
                              <div className="mt-1">
                                <Select
                                  onChange={this.setStateFromOccupants.bind(this)}
                                  showSearch
                                  className="information-selcect"
                                  placeholder="02"
                                  placeholder="Select Number"
                                  value={this.state.numberofoccupants}
                                  optionFilterProp="children"
                                  onFocus={onFocus}
                                  onBlur={onBlur}
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
                                  {this.editvalidator.message("Occupants", this.state.numberofoccupants, "required")}
                                </div>
                              </div>
                            </div>
                            <div className="col-4 nametags">
                              <div>
                                Number Of Pets
                                <div className="mt-1">
                                  <Select
                                    onChange={this.setStateFromPets.bind(this)}
                                    showSearch
                                    className="information-selcect"
                                    placeholder="Select Number"
                                    value={this.state.numberofpets}
                                    name="numberofpets"
                                    optionFilterProp="children"
                                    onFocus={onFocus}
                                    onBlur={onBlur}
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
                                    {this.editvalidator.message("Pets", this.state.numberofpets, "required")}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-4 nametags">
                              <div>
                                Number Of Bedroom
                                <div className="mt-1">
                                  <Select
                                    onChange={this.setStateFromBedrooms.bind(this)}
                                    showSearch
                                    className="information-selcect"
                                    placeholder="Select Number"
                                    value={this.state.numberofbedrooms}
                                    name="numberofbedrooms"
                                    optionFilterProp="children"
                                    onFocus={onFocus}
                                    onBlur={onBlur}
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
                                    {this.editvalidator.message("Bedroom", this.state.numberofbedrooms, "required")}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row m-0 edit-profile">
                            <div className="col-4 nametags">
                              <div>
                                Share Info With
                                <div className="mt-1">
                                  <Select
                                    onChange={this.setStateFromDropdown.bind(this)}
                                    value={this.state.shareinfo}
                                    showSearch
                                    className="information-selcect"
                                    placeholder="Fire Department"
                                    optionFilterProp="children"
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    filterOption={(input, option) =>
                                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                  >
                                    <Option value="Fire Fighters">Fire Department</Option>
                                    <Option value="EMT">EMT</Option>
                                    <Option value="Fire Fighters and EMT">Both</Option>
                                  </Select>
                                  <div className="err-message-infor">
                                    {this.editvalidator.message("Share Info", this.state.shareinfo, "required")}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-4 nametags">
                              <div>
                                With Basement
                                <div className="mt-1">
                                  <Select
                                    onChange={this.setStateFromBasement.bind(this)}
                                    value={this.state.basementinfo}
                                    showSearch
                                    className="information-selcect"
                                    placeholder="Yes"
                                    optionFilterProp="children"
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    filterOption={(input, option) =>
                                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                  >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                  </Select>
                                  <div className="err-message-infor">
                                    {this.editvalidator.message("Basement Info", this.state.basementinfo, "required")}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-4 nametags">
                              <div>
                                Is Anyone Handicapped
                                <div className="mt-1">
                                  <Select
                                    onChange={this.setStateFromHandicapped.bind(this)}
                                    value={this.state.handicappedinfo}
                                    showSearch
                                    className="information-selcect"
                                    placeholder="Yes"
                                    optionFilterProp="children"
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    filterOption={(input, option) =>
                                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                  >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                  </Select>
                                  <div className="err-message-infor">
                                    {this.editvalidator.message("Handicapped", this.state.handicappedinfo, "required")}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row m-0 edit-profile">
                            <div className="col-4 nametags">
                              <div>
                                Construction
                                <div className="mt-1">
                                  <Select
                                    onChange={this.setStateFromConstruction.bind(this)}
                                    showSearch
                                    className="information-selcect"
                                    placeholder="Type Of Construction"
                                    value={this.state.construction_type}
                                    name="construction_type"
                                    optionFilterProp="children"
                                    onFocus={onFocus}
                                    onBlur={onBlur}
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
                                    {this.editvalidator.message(
                                      "Construction",
                                      this.state.construction_type,
                                      "required"
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-4 nametags">
                              <div>
                                Type of House
                                <div className="mt-1">
                                  <Select
                                    onChange={this.setStateFromHouse.bind(this)}
                                    showSearch
                                    className="information-selcect"
                                    placeholder="Type of House"
                                    value={this.state.housetype}
                                    name="housetype"
                                    optionFilterProp="children"
                                    onFocus={onFocus}
                                    onBlur={onBlur}
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
                                    {this.editvalidator.message("House", this.state.housetype, "required")}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-4 nametags">
                              <div>
                                Square Footage
                                <div className="mt-1">
                                  <input 
                                    type="text" 
                                    maxLength="7"
                                    className="form-control information-input"
                                    placeholder="Square Footage"
                                    name='squareFootage' 
                                    value={this.state.squareFootage}
                                    onChange={this.setStateFromSquareFootage.bind(this)} />
                                  <div className="err-message-infor">
                                    {this.editvalidator.message('Square Footage', this.state.squareFootage, 'required')}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row m-0 edit-fileds-medil"></div>
                          <div className="row m-0">
                            <Button className="verfiy-button-edit-edited" onClick={this.submitForm}>
                              Add
                            </Button>
                          </div>
                        </div>
                      </Modal>

                      {/* edit medical history*/}
                      <Modal visible={this.state.editmedical} width={370} onCancel={this.handleCancelEditRequireModal}>
                        {this.state.loader ? <Loader /> : null}
                        <div style={this.state.loader ? { opacity: "0.4" } : null}>
                          <div id="head-modal">
                            <div>Edit Medical History</div>
                          </div>

                          <div className="row title-modal-description"></div>
                          <div className="row mt-1">
                            <input
                              type="text"
                              className="col-md-10 
                                         age-place  form-control mt-1"
                              placeholder="Medical Name"
                              name="name"
                              value={this.state.name}
                              onChange={this.setStateFromInputAdd.bind(this)}
                            />
                          </div>
                          <div className="err-msg-medical">
                            {this.medicaleditvalidator.message("Medical Name", this.state.name, "required")}
                          </div>

                          <div className="row m-0 plavetop">
                            <input
                              type="text"
                              maxLength="3"
                              className="col-md-5 age-place form-control mt-1"
                              placeholder="Age"
                              name="age"
                              value={this.state.age}
                              onChange={this.setStateFromInputAdd.bind(this)}
                            />

                            <input
                              type="text"
                              maxLength="3"
                              className="col-md-5  age-place form-control mt-1"
                              placeholder="Weight"
                              name="weight"
                              value={this.state.weight}
                              onChange={this.setStateFromInputAdd.bind(this)}
                            />
                          </div>

                          <div className="row m-0">
                            <div className="err-msg-category col-6">
                              {this.medicaleditvalidator.message("Age", this.state.age, "required|numeric")}
                            </div>

                            <div className="err-msg-category col-6">
                              {this.medicaleditvalidator.message("Weight", this.state.weight, "required|numeric")}
                            </div>
                          </div>

                          <div className="row desc-modal">
                            <div className="titiles">Medical History</div>
                          </div>
                          <div className="row mt-1">
                            <textarea
                              placeholder="Medical History"
                              className="col-md-10 edit-name form-control mt-1"
                              value={this.state.medicalhistorys}
                              name="medicalhistorys"
                              onChange={this.setStateFromInputAdd.bind(this)}
                            ></textarea>
                          </div>
                          <div className="err-msg-medical">
                            {this.medicaleditvalidator.message("History", this.state.medicalhistorys, "required")}
                          </div>

                          <div className="row desc-modal">
                            <div className="titiles">Medication</div>
                          </div>
                          <div className="row mt-1">
                            <textarea
                              placeholder="Medication"
                              className="col-md-10 edit-name form-control mt-1"
                              value={this.state.medications}
                              name="medications"
                              onChange={this.setStateFromInputAdd.bind(this)}
                            ></textarea>
                          </div>
                          <div className="err-msg-medical">
                            {this.medicaleditvalidator.message("Medication", this.state.medications, "required")}
                          </div>

                          <div className="row">
                            <Button className="verfiy-button-edit" onClick={this.editmedicalhistory}>
                              Add
                            </Button>
                          </div>
                        </div>
                      </Modal>

                      <Modal visible={this.state.deletemodal} width={370} onCancel={this.hideDeleteModal}>
                        {this.state.loader ? <Loader /> : null}
                        <div style={this.state.loader ? { opacity: "0.4" } : null}>
                          <div id="head-modal">
                            <div>Delete Medical History</div>
                          </div>

                          <div className="row m-0 plavetop">
                            <Button className="verfiy-button-edit col-md-5" onClick={this.deletemedical.bind(this)}>
                              Delete
                            </Button>
                            <Button className="verfiy-button-edit col-md-5" onClick={this.hideDeleteModal}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Modal>

                      {/*  modal for add medical history*/}
                      <Modal visible={this.state.addmodal} width={370} onCancel={this.handleCanceladdmodal}>
                        <div id="head-modal">
                          <div>Add Medical History</div>
                        </div>
                        {this.state.loader ? <Loader /> : null}
                        <div style={this.state.loader ? { opacity: "0.4" } : null}>
                          <div className="row title-modal-description"></div>
                          <div className="row mt-1">
                            <input
                              type="text"
                              className="col-md-10 
                                         age-place form-control mt-1"
                              placeholder="Name"
                              name="name"
                              value={this.state.name}
                              onChange={this.setStateFromInputAdd.bind(this)}
                            />
                          </div>
                          <div className="err-msg-medical">
                            {this.addMedicalHistoryValidator.message("Medical Name", this.state.name, "required")}
                          </div>
                          <div className="row m-0 plavetop">
                            <input
                              type="text"
                              maxLength="3"
                              className="col-md-5 age-place form-control mt-1"
                              placeholder="Age"
                              name="age"
                              value={this.state.age}
                              onChange={this.setStateFromInputAdd.bind(this)}
                            />

                            <input
                              type="text"
                              maxLength="3"
                              className="col-md-5  age-place form-control mt-1"
                              placeholder="Weight"
                              name="weight"
                              value={this.state.weight}
                              onChange={this.setStateFromInputAdd.bind(this)}
                            />
                          </div>

                          <div className="row m-0">
                            <div className="err-msg-category col-6">
                              {this.addMedicalHistoryValidator.message("Age", this.state.age, "required|numeric")}
                            </div>

                            <div className="err-msg-category col-6">
                              {this.addMedicalHistoryValidator.message("Weight", this.state.weight, "required|numeric")}
                            </div>
                          </div>
                          <div className="row desc-modal">
                            <div className="titiles">Medical History</div>
                          </div>
                          <div className="row mt-1">
                            <textarea
                              placeholder="Medical history"
                              className="col-md-10 edit-name form-control mt-1"
                              name="history"
                              value={this.state.history}
                              onChange={this.setStateFromInputAdd.bind(this)}
                            ></textarea>
                          </div>
                          <div className="err-msg-medical">
                            {this.addMedicalHistoryValidator.message("History", this.state.history, "required")}
                          </div>

                          <div className="row desc-modal">
                            <div className="titiles">Medication</div>
                          </div>
                          <div className="row mt-1">
                            <textarea
                              placeholder="Medication"
                              className="col-md-10 edit-name form-control mt-1"
                              name="medication"
                              value={this.state.medication}
                              onChange={this.setStateFromInputAdd.bind(this)}
                            ></textarea>
                          </div>
                          <div className="err-msg-medical">
                            {this.addMedicalHistoryValidator.message("Medication", this.state.medication, "required")}
                          </div>

                          <div className="row">
                            <Button className="verfiy-button-edit" onClick={this.addmedicalHistory}>
                              Add
                            </Button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          //without token
          <div>
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Information);
