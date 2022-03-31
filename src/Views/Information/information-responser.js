import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
import { yellow, red } from "../../Views/s3Links";
import { Table } from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import HeaderafterloginFirstResponser from "../Header/HeaderafterLoginFirstResponser";
import LocalStorage from "../../Api/LocalStorage";
import Loader from "../../Views/Loader/Loader";
import Api from "../../Api/ApiUtils";

class InformationResponser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edtirewuiredmodal: false,
      editmedical: false,
      data: "",
      userinfo: "",
      medicalhistory: "",
      first_name: "",
      last_name: "",
      deleteId: "",
      shareinfo: "",
      deletemodal: false,
      loader: false,
      basementinfo: "",
      handicappedinfo: "",
      medicalid: "",
    };
    this.addValidator = new SimpleReactValidator();
  }

  componentDidMount() {
    var _this = this;
    if (localStorage.getItem("firstresponser_token") !== null) {
      LocalStorage.getItem("firtresponser_management").then((user) => {
        _this.setState(
          {
            user: user.id,
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
  }

  getdata() {
    this.setState({ loader: true });
    let payload = {
      id: this.state.user,
    };
    Api.getdatafirstresponser(payload)
      .then((res) => {
        if (res.data) {
          this.setState(
            {
              loader: false,
              data: res.data,
              userinfo: res.data && res.data.user_info,
              medicalhistory: res.data && res.data.medical_history,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              xcordinatesElectricConnect:
                res.data && res.data.user_info && res.data.user_info.xcordinatesElectricConnect,
              ycordinatesElectricConnect:
                res.data && res.data.user_info && res.data.user_info.ycordinatesElectricConnect,
              xcordinatesGasMeter: res.data && res.data.user_info && res.data.user_info.xcordinatesGasMeter,
              ycordinatesGasMeter: res.data && res.data.user_info && res.data.user_info.ycordinatesGasMeter,
              shareinfo: res.data && res.data.user_info && res.data.user_info.share_info_with,
              basementinfo: res.data && res.data.user_info && res.data.user_info.with_basement,
              construction_type: res.data && res.data.user_info && res.data.user_info.construction_type,
              handicappedinfo: res.data && res.data.user_info && res.data.user_info.anyone_handicapped,
              numberofoccupants: res.data && res.data.user_info && res.data.user_info.number_of_occupants,
              numberofbedrooms: res.data && res.data.user_info && res.data.user_info.number_of_bedroom,
              numberofpets: res.data && res.data.user_info && res.data.user_info.number_of_pets,
              housetype: res.data && res.data.user_info && res.data.user_info.house_type,
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
        this.setState({ loader: false });
      });
  }

  setStateFromInputAdd(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  /*-- Show modal Edit*/
  showEditRequiredModal = () => {
    this.setState({
      edtirewuiredmodal: true,
    });
  };

  /*-- Cancel modal Edit*/
  handleCancelEditModal = (e) => {
    // console.log(e);
    this.setState({
      edtirewuiredmodal: false,
    });
  };

  showEditMedical = () => {
    // console.log("insdie the modal")
    this.setState({
      editmedical: true,
    });
  };

  /*-- Cancel modal Edit*/
  handleCancelEditRequireModal = (e) => {
    //console.log(e);
    this.setState({
      editmedical: false,
    });
  };

  render() {
    return (
      <div>
        {localStorage.getItem("firstresponser_token") !== null ? (
          //first responser with token
          <div>
            <div data-spy="scroll" data-target=".navbar">
              <div>
                <div>
                  <HeaderafterloginFirstResponser />
                </div>
                {this.state.loader ? <Loader /> : null}
                <div>
                  <div className="main-bk">
                    <div className="container conatiner-information">
                      <div className="information-firstresponser">
                        <div className="row m-0">
                          <div className="col-12 inform-col"></div>
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

                      <div className="required-info-reponser">
                        <div className="row m-0">
                          <div className="col-12 inform-col"></div>
                        </div>

                        <div className="row m-0">
                          <div className="required-info">Required Info</div>
                        </div>

                        <div className="row m-0">
                          <div className="col-4 table-order">
                            <div className="position-relative">
                              <Table striped bordered hover size="sm" className="table-information-res">
                                <tbody className="table-styling">
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
                            </div>

                            {this.state.medicalhistory ? (
                              this.state.medicalhistory.map((product, i) => (
                                <div className="row m-0">
                                  <div className="col-12 card-medical-fileds">
                                    <div className="card cardd-css">
                                      <div className="card-body medical-history-responsive">
                                        <div className="row">
                                          <div className="col-6">
                                            <div className="text-name-medical">
                                              {product && product.name ? product.name : ""}
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
                                              {moment.utc(product.updatedTimeStamp).local().format("MM/DD/YYYY")
                                                ? moment.utc(product.updatedTimeStamp).local().format("MM/DD/YYYY")
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

                            {/* <div className="row m-0">
                                                        <div className="col-12 card-medical-fileds">
                                                            <div className="card cardd-css">
                                                                <div className="card-body medical-history-responsive">
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <div className="text-name-medical">
                                                                                Jhonathan Doe
                                                                 </div>

                                                                        </div>
                                                                        <div className="col-6">
                                                                            <div className="buttons-response-icons">
                                                                               
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-2 d-flex ageee">
                                                                            <div className="age">
                                                                                Age:
                                                                      </div>
                                                                            <div className="years">
                                                                                24 years
                                                                </div>
                                                                        </div>
                                                                        <div className="col-4 d-flex ageee">
                                                                            <div className="age">
                                                                                Estimation Weight:
                                                                   </div>
                                                                            <div className="years">
                                                                                60kg
                                                                  </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="temedical-history">
                                                                        Medical History
                                                             </div>
                                                                    <div className="text-name-medical-text">
                                                                        Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing Lorem
                                                                        Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing
                                                             </div>
                                                                    <div className="text-name-medical-history">
                                                                        Medication
                                                             </div>
                                                                    <div className="text-name-medical-text">
                                                                        Peracitamol,Insulin
                                                              </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          //first responser without token
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
export default withRouter(InformationResponser);
