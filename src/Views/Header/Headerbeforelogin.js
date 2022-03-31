import React, { Component } from "react";
import { Link } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import LocalStorage from "../../Api/LocalStorage";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
import Api from "../../Api/ApiUtils";
import { HashLink } from "react-router-hash-link";
//import logo from '../../assets/images/Logo.png';
import { APP_LOGO, FACEBOOK_LOGO } from "../../Views/s3Links";
//import facebook from '../../assets/images/facebook.png';
import Loader from "../../Views/Loader/Loader";
import { Button, Modal, Select, Input, Checkbox } from "antd";
import styled from "styled-components";
import PlacesAutocomplete from "../AutoCompletion/autocompletion";
import { toast } from "react-toastify";
import HamburgerMenu from "react-hamburger-menu";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
const publicIp = require("react-public-ip");

function onBlur() {
  // console.log('blur');
}

function onFocus() {
  //  console.log('focus');
}

const AutoComplete = styled.div`
  .autocomplete-dropdown-container {
    .suggestion-item,
    .suggestion-item--active {
      padding: 5px;
      border-left: 1px solid #00000021;
      border-right: 1px solid #00000021;
      padding-bottom: 5px;
    }
    .suggestion-item:last-child,
    .suggestion-item--active:last-child {
      border-bottom: 1px solid #00000021;
    }
  }
`;

const { Option } = Select;
class Headerbeforelogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleResponser: false,
      accept: "",
      verfiyaddressResponser: false,
      signin: false,
      signup: false,
      forgotmodal: false,
      adrerss: undefined,
      showMenu: false,
      loader: false,
      hidden: true,
      signuphidden: true,
      publicIpAddress: "",
      errorFlag: false,
      phoneflag: false,
      verfication: "",
      email: "",
      address: undefined,
      idserach: "",
      lat: "",
      showconfirmpassword: true,
      lng: "",
      password: "",
      regexp: /^[0-9]+$/,

      //data
      //banner
      banner: {},
      bannerForm: {},

      //Content About
      ContentAboutIn: {},
      ContentAboutForm: {},

      //AssstesProtectionn
      AssstesProtectionn: {},
      AssetsProtectionForm: {},

      //homeProtection
      homeProtection: {},
      homeProtectionForm: {},

      basicplann: {},
      basicplannForm: {},

      proplann: {},
      ProplannForm: {},

      unlimtedplan: {},
      UnlimitedPlanForm: {},

      video: {},
      videoForm: {},

      //HEADER
      HeaderHome: {},
      HeaderHomeForm: {},
      headerAboutUs: {},
      headerAboutUsForm: {},
      headerSupport: {},
      headerSupportForm: {},

      //FOOTER
      footerHome: {},
      footerHomeForm: {},
      footerAboutus: {},
      footerAboutusForm: {},
      footerSupport: {},
      footerSupportForm: {},
      footerTermsCondition: {},
      footerTermsConditionForm: {},
      footerPrivacy: {},
      footerPrivacyForm: {},
      footerAboutUs: {},
      footerAboutUsForm: {},
    };
    this.validator = new SimpleReactValidator();
    this.supportvalidator = new SimpleReactValidator();
    this.addressvalidator = new SimpleReactValidator();
    this.forgotpasswordValidator = new SimpleReactValidator();
    //this.addValidator = new SimpleReactValidator();
    this.addValidator = new SimpleReactValidator({
      validators: {
        passSignUp: {
          message: "Please enter valid password.",
          rule: (val, params, validator) => {
            if (val) {
              return (
                validator.helpers.testRegex(val, /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) &&
                params.indexOf(val) === -1
              );
            }
          },
        },
      },
    });

    this.addingValidator = new SimpleReactValidator({
      validators: {
        passwordMatch: {
          message: "Please enter valid password.",
          rule: (val, params, validator) => {
            if (val) {
              return (
                validator.helpers.testRegex(val, /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) &&
                params.indexOf(val) === -1
              );
            }
          },
        },
      },
    });
    //this.addingValidator = new SimpleReactValidator();
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.setStateFromDifferentSignup = this.setStateFromDifferentSignup.bind(this);
    this.setStateFromInputAdd = this.setStateFromInputAdd.bind(this);
    this.setStateFromInputResponser = this.setStateFromInputResponser.bind(this);
    this.setStateFromDropdown = this.setStateFromDropdown.bind(this);
    this.setStateFromInputSignup = this.setStateFromInputSignup.bind(this);
    this.setStateFromPhone = this.setStateFromPhone.bind(this);
  }

  componentDidMount() {
    var _this = this;
    _this.getapiaddress();
    _this.getDataLandingPageContent();
  }

  getDataLandingPageContent() {
    this.setState({ loader: true });
    let payload = {
      abc: {},
    };
    Api.landingPageContent(payload)
      .then((res) => {
        if (res && res.data) {
          this.setState({
            loader: false,
            banner: res.data.banner ? res.data.banner : {},
            ContentAboutIn: res.data["about-us-content"] ? res.data["about-us-content"] : {},
            AssstesProtectionn: res.data["assets_protection"] ? res.data["assets_protection"] : {},
            homeProtection: res.data["home-protection"] ? res.data["home-protection"] : {},
            basicplann: res.data["basic-plan"] ? res.data["basic-plan"] : {},
            proplann: res.data["pro-plan"] ? res.data["pro-plan"] : {},
            unlimtedplan: res.data["unlimited-plan"] ? res.data["unlimited-plan"] : {},
            video: res.data.video ? res.data.video : {},
            VideoForm: res.data.video ? res.data.video : {},
            HeaderHome: res.data["header-home"] ? res.data["header-home"] : {},
            HeaderHomeForm: res.data["header-home"] ? res.data["header-home"] : {},
            headerAboutUs: res.data["header-about"] ? res.data["header-about"] : {},
            headerAboutUsForm: res.data["header-about"] ? res.data["header-about"] : {},
            headerSupport: res.data["header-support"] ? res.data["header-support"] : {},
            headerSupportForm: res.data["header-support"] ? res.data["header-support"] : {},
            footerHome: res.data["footer-home"] ? res.data["footer-home"] : {},
            footerHomeForm: res.data["footer-home"] ? res.data["footer-home"] : {},
            footerAboutus: res.data["footer-aboutus"] ? res.data["footer-aboutus"] : {},
            footerAboutusForm: res.data["footer-aboutus"] ? res.data["footer-aboutus"] : {},
            footerSupport: res.data["footer-support"] ? res.data["footer-support"] : {},
            footerSupportForm: res.data["footer-support"] ? res.data["footer-support"] : {},
            footerTermsCondition: res.data["footer-terms"] ? res.data["footer-terms"] : {},
            footerTermsConditionForm: res.data["footer-terms"] ? res.data["footer-terms"] : {},
            footerPrivacy: res.data["footer-privacy"] ? res.data["footer-privacy"] : {},
            footerPrivacyForm: res.data["footer-privacy"] ? res.data["footer-privacy"] : {},
          });
        }
      })
      .catch(function (err) {
        if (err.errors) toast.error(err.errors.msg);
      });
  }

  setStateFromDifferentSignup(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    if (event.target.name === "confirm_password") {
      if (event.target.value !== this.state.password1) {
        this.setState({ confirm_password: event.target.value, errorFlag: true });
      } else {
        this.setState({ confirm_password: event.target.value, errorFlag: false });
      }
    } else {
      this.setState(obj);
    }
  }

  async getapiaddress() {
    const ipv4 = (await publicIp.v4()) || "";
    this.setState({
      publicIpAddress: ipv4,
    });
  }

  setStateFromInputAdd(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }
  setStateFromInputResponser(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  setStateFromInputSignup(event) {
    var obj = {};
    var value = Number(event.target.value);
    if (event.target.name === "phone_number") {
      var regex = /^\d+$/;
      if (value !== "") {
        if (regex.test(value)) {
          this.setState({ phone_number: value });
        } else {
          this.setState({ phone_number: "" });
        }
      }
    } else {
      this.setState(obj);
    }
  }

  setStateFromDropdown(event) {
    this.setState({
      adrerss: event,
    });
  }

  handleCheck = (e) => {
    this.setState({
      accept: e.target.checked,
    });
  };

  getUserAddress() {
    this.setState({ loader: true });
    let payload = {
      id: this.state.idserach,
    };
    Api.getUserAddress(payload)
      .then((res) => {
        if (res) {
          if (res.data) {
            this.setState({ userAddress: res.data, loader: false });
          } else {
            this.setState({ userAddress: [], loader: false });
          }
        } else {
          this.setState({ userAddress: [], loader: false });
        }
      })
      .catch(function (err) {
        if (err) {
          toast.error(err.error);
        } else {
          toast.error("Some error occured");
        }
      });
  }

  /*-- Show modal Responser*/
  showModalResponser = () => {
    this.setState({
      visibleResponser: true,
      verfiyaddressResponser: false,
      showMenu: false,
    });
  };

  /*-- Cancel modal Responser*/
  handleCancelVisibleResponser = (e) => {
    this.setState({
      visibleResponser: false,
      verfication: "",
      adrerss: undefined,
    });
    this.validator.hideMessages();
    this.addressvalidator.hideMessages();
  };

  /*-- Show modal Sign in*/
  showModalSignIn = () => {
    this.setState({
      signin: true,
      showMenu: false,
    });
  };

  /*-- Cancel modal sign in*/
  handleCancelsignin = (e) => {
    this.setState({
      signin: false,
      email: "",
      password: "",
    });
    this.addingValidator.hideMessages();
  };

  /* show modal sign up*/
  showModalSignUp = () => {
    this.setState({
      signup: true,
      signin: false,
    });
  };
  // for forgot password modal
  showModalForgotpassword = () => {
    this.setState({
      forgotmodal: true,
      signin: false,
      signup: false,
    });
  };

  //cancel forgotpassword
  handleCancelforgotpassword = (e) => {
    this.setState({
      loader: false,
      forgotmodal: false,
      emailforgot: "",
    });
    this.forgotpasswordValidator.hideMessages();
  };

  /* cancel show modal sign up*/
  handleCancelsignUp = (e) => {
    this.setState({
      loader: false,
      signup: false,
      // first_name: "",
      // last_name: "",
      // email1: "",
      // phone_number: "",
      // password1: "",
      // confirm_password: "",
      // location: "",
      // adrerss: "",
      // address: undefined,
      // lat: "",
      // lng: ""
    });
    this.addValidator.hideMessages();
  };

  submitForm = () => {
    if (this.addressvalidator.allValid()) {
      this.setState({ loader: true });
      const payload = {
        id: this.state.adrerss,
        password: this.state.verfication,
      };
      Api.submitForm(payload)
        .then((response) => {
          if (response.data) {
            LocalStorage.setItem("firtresponser_management", JSON.stringify(response.data)).then((fulfilled) => {
              LocalStorage.setItem("firstresponser_token", JSON.stringify(response.data.token)).then((success) => {
                toast.success("Login successfull!!");
                this.props.history.push("/information-responser");
              });
            });
            this.setState({ loader: false, verfication: "", adrerss: undefined });
          } else {
          }
        })
        .catch((err) => {});
    } else {
      this.addressvalidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };
  operation = () => {
    if (this.validator.allValid()) {
      this.setState({ loader: true });
      const payload = {
        password: this.state.verfication,
        ip: this.state.publicIpAddress,
      };
      Api.login(payload)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              verfiyaddressResponser: true,
              loader: false,
              idserach: response.data.data.id,
            });
            this.getUserAddress();
          } else {
          }
        })
        .catch((err) => {
          this.setState({
            loader: false,
          });
          if (err.status === 400) {
            toast.error("Please Enter Valid Pin");
            this.setState({
              verfiyaddressResponser: false,
              loader: false,
              verfication: "",
            });
            this.validator.hideMessages();
          } else if (err.status === 403) {
            toast.error("Too Many attempts! Please Try Again Later");
            this.setState({
              verfiyaddressResponser: false,
              loader: false,
              verfication: "",
            });
            this.validator.hideMessages();
          }
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };

  SignUp = () => {
    if (this.addValidator.allValid() && this.state.errorFlag === false) {
      this.setState({ loader: true });
      const payload = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email1,
        mobile_number: this.state.phone_number,
        password: this.state.password1,
        confirm_password: this.state.confirm_password,
        address: this.state.location,
        lat: this.state.lat,
        apartment_number: this.state.apartment_number,
        accept: this.state.accept,
        heard_from: this.state.hear,
        lang: this.state.lng,
      };
      Api.signup(payload)
        .then((response) => {
          if (response.data) {
            LocalStorage.setItem("id", response.data.id);
            LocalStorage.setItem("user_management", JSON.stringify(response.data)).then((fulfilled) => {
              LocalStorage.setItem("user_token", JSON.stringify(response.data.token)).then((success) => {
                toast.success("Login successfull!!");
                this.props.history.push("/userinformation");
              });
            });
            //toast.success("Registration Successfull");
            this.setState({
              loader: false,
              signup: false,
              first_name: "",
              last_name: "",
              email1: "",
              phone_number: "",
              password1: "",
              confirm_password: "",
              location: undefined,
              address: undefined,
              lat: undefined,
              hear: undefined,
              lng: undefined,
            });
          } else {
          }
        })
        .catch((err) => {
          if (err && err.message) {
            toast.error(err.message);
          }
          this.setState({ loader: false });
        });
    } else {
      this.addValidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };

  signin = () => {
    if (this.addingValidator.allValid()) {
      this.setState({ loader: true });
      const payload = {
        email: this.state.email,
        password: this.state.password,
      };
      Api.signin(payload)
        .then((response) => {
          if (response.data) {
            LocalStorage.setItem("id", response.data.id);
            LocalStorage.setItem("user_management", JSON.stringify(response.data)).then((fulfilled) => {
              LocalStorage.setItem("user_token", JSON.stringify(response.data.token)).then((success) => {
                toast.success("Login successfull!!");
                this.props.history.push("/dashboard");
              });
            });
            this.setState({ loader: false, email: "", password: "" });
          } else {
            toast.error("Login unsuccessfull. Please try again!");
          }
        })
        .catch((err) => {
          if (err && err.message) {
            toast.error("Login unsuccessfull. Please try again!");
          }
          this.setState({ loader: false });
        });
    } else {
      this.addingValidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };

  forgotpassword = () => {
    this.setState({ loader: true });
    if (this.forgotpasswordValidator.allValid()) {
      const payload = {
        email: this.state.emailforgot,
      };
      Api.forgotpassword(payload)
        .then((response) => {
          if (response.data) {
            toast.success(
              "We have sent you an email with reset password link. Please follow the instructions to reset your password"
            );
            this.setState({ loader: false, emailforgot: "", forgotmodal: false });
          } else {
            toast.success(
              "We have sent you an email with reset password link. Please follow the instructions to reset your password"
            );

            this.setState({ loader: false, emailforgot: "", forgotmodal: false });
          }
        })
        .catch((err) => {
          if (err && err.message) {
            toast.error("Please Enter Valid Email Address");
          }
          this.setState({ loader: false });
        });
    } else {
      this.forgotpasswordValidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };

  onSelectAddress(address) {
    this.state.location = address.address;
    this.state.lat = address.lat;
    this.state.lng = address.lng;
  }

  onKeyPress(e) {
    if (e.which === 13) {
      this.signin();
    }
  }

  onKeyPinValidator(e) {
    if (e.which === 13) {
      this.operation();
    }
  }

  onKeySubmit(e) {
    if (e.which === 13) {
      this.submitForm();
    }
  }

  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  toggleShowSignup = () => {
    this.setState({ signuphidden: !this.state.signuphidden });
  };

  toggleShowConfirmpassword = () => {
    this.setState({ showconfirmpassword: !this.state.showconfirmpassword });
  };

  // handleClick() {
  //   this.setState({
  //     open: !this.state.open
  //   });
  // }

  setStateFromHear(event) {
    // console.log("eveemnt", event)
    this.setState({
      hear: event,
    });
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  }

  showModalCancelSupport = () => {
    this.setState({
      cancelmodal: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      cancelmodal: false,
      emailname: "",
      emailsubject: "",
      emailmessage: "",
      emailmobile: "",
      emailaddress: "",
    });
    this.supportvalidator.hideMessages();
  };

  supportsubmit = () => {
    if (this.supportvalidator.allValid()) {
      this.setState({ loader: true });
      const payload = {
        email: this.state.emailaddress,
        name: this.state.emailname,
        phone_number: this.state.emailmobile,
        message: this.state.emailmessage,
      };
      Api.support(payload)
        .then((response) => {
          console.log("respon", response);
          if (response) {
            this.supportvalidator.hideMessages();
            toast.success("Success");
            this.setState({
              cancelmodal: false,
              loader: false,
              emailname: "",
              emailmobile: "",
              emailsubject: "",
              emailmessage: "",
              emailaddress: "",
            });
          } else {
          }
        })
        .catch((err) => {
          this.setState({
            loader: false,
          });
          if (err.status === 404) {
          } else if (err.status === 403) {
          }
        });
    } else {
      this.supportvalidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };

  setStateFromPhone(event) {
    var obj = {};
    var value = Number(event.target.value);
    if (event.target.name === "emailmobile") {
      var regex = /^\d+$/;
      if (value !== "") {
        if (regex.test(value)) {
          this.setState({ emailmobile: value });
        } else {
          this.setState({ emailmobile: "" });
        }
      }
    } else {
      this.setState(obj);
    }
  }

  render() {
    const { HeaderHome, headerAboutUs, headerSupport } = this.state;
    return (
      <div>
        <div data-spy="scroll" data-target=".navbar">
          <div>
            <div id="header">
              <div className="row col m-0 w-100">
                <span className="footer-facebook-header">
                  <a
                    href=" https://www.facebook.com/My360Protection/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: "3px" }}
                  >
                    <img src={FACEBOOK_LOGO} alt="text here" className="fac-img-header"></img>
                  </a>
                </span>
              </div>
              <img alt="" src={APP_LOGO} className="images-logo" />

              <div className="row w-100 border-row">
                <div className="col-6 d-flex tags-home">
                  <div className="d-flex">
                    {HeaderHome ? (
                      <HashLink smooth to="/" id="home" ref={"home"}>
                        <div className="mr-4 tag-home">
                          {this.state.HeaderHomeForm &&
                          this.state.HeaderHomeForm.content &&
                          this.state.HeaderHomeForm.content[0] &&
                          this.state.HeaderHomeForm.content[0].title
                            ? this.state.HeaderHomeForm.content[0].title
                            : ""}
                        </div>
                      </HashLink>
                    ) : (
                      ""
                    )}

                    {headerAboutUs ? (
                      <HashLink smooth to="/#aboutus">
                        <div className="mr-4 tags-css tags-content">
                          {this.state.headerAboutUsForm &&
                          this.state.headerAboutUsForm.content &&
                          this.state.headerAboutUsForm.content[0] &&
                          this.state.headerAboutUsForm.content[0].title
                            ? this.state.headerAboutUsForm.content[0].title
                            : ""}
                        </div>
                      </HashLink>
                    ) : (
                      ""
                    )}

                    {headerSupport ? (
                      <div className="mr-4 tags-css support-css" onClick={this.showModalCancelSupport}>
                        {this.state.headerSupportForm &&
                        this.state.headerSupportForm.content &&
                        this.state.headerSupportForm.content[0] &&
                        this.state.headerSupportForm.content[0].title
                          ? this.state.headerSupportForm.content[0].title
                          : ""}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="setting-icon">
                    <HamburgerMenu
                      isOpen={this.state.showMenu}
                      menuClicked={this.showMenu.bind(this)}
                      width={18}
                      height={15}
                      strokeWidth={1}
                      rotate={0}
                      color="white"
                      borderRadius={0}
                      animationDuration={0.5}
                    />
                  </div>

                  {/* <div className="setting-icon">
                    <img alt="" src={gear} className="gear-icon" onClick={this.showMenu}></img>
                  </div> */}

                  {this.state.showMenu ? (
                    <div
                      className="menu image-hide"
                      ref={(element) => {
                        this.dropdownMenu = element;
                      }}
                    >
                      <div id="firstresponse">
                        <div className="cancel-membership-hide" onClick={this.showModalResponser}>
                          First Responder
                        </div>
                        <div className="logout" onClick={this.showModalSignIn}>
                          Sign In
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="col-6 button-signup res-hide">
                  <div className="buttons-response" id="firstresponse">
                    {/* <span className="facebook-icon">
                  
                    <a
                          href=" https://www.facebook.com/My360Protection/"
                        
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ padding: "3px" }}
                        >
                          <img src={facebook} alt="text here">

                    </img>
                    </a>
                    </span> */}
                    <button className="mr-2 first-responser" onClick={this.showModalResponser}>
                      First Responder
                    </button>

                    <Button className="sign-up" onClick={this.showModalSignIn}>
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Verfiy First responser modal*/}
          <Modal visible={this.state.visibleResponser} width={370} onCancel={this.handleCancelVisibleResponser}>
            <div id="modalheader">
              <img alt="" src={APP_LOGO} className="modal-logo" />
            </div>

            <div className="row">
              <label className="col-md-4 verification">Verfication</label>
            </div>
            {this.state.loader ? <Loader /> : null}
            <div style={this.state.loader ? { opacity: "0.4" } : null}>
              {this.state.verfiyaddressResponser === false ? (
                <div>
                  <div className="row vefication-pin">
                    <input
                      type="text"
                      className="col-md-9 form-control verfication mt-1"
                      placeholder="Enter Verfication Pin"
                      name="verfication"
                      value={this.state.verfication}
                      onChange={this.setStateFromInputResponser.bind(this)}
                      onKeyPress={this.onKeyPinValidator.bind(this)}
                    />
                  </div>
                  <div className="err-message">
                    {this.validator.message("verfication", this.state.verfication, "required|min:8")}
                  </div>
                </div>
              ) : (
                ""
              )}

              {this.state.verfiyaddressResponser ? (
                <div>
                  <div className="row vefication-pin">
                    <input
                      type="text"
                      className="col-md-9 form-control verfication mt-1"
                      placeholder="Enter Verfication Pin"
                      name="verfication"
                      value={this.state.verfication}
                      onChange={this.setStateFromInputResponser.bind(this)}
                      onKeyPress={this.onKeySubmit.bind(this)}
                    />
                  </div>
                  <div className="err-message">
                    {this.addressvalidator.message("verfication", this.state.verfication, "required|min:8")}
                  </div>

                  <div className="row mrt-29 serahaddress">
                    <Select
                      onKeyPress={this.onKeySubmit.bind(this)}
                      onChange={this.setStateFromDropdown.bind(this)}
                      value={this.state.adrerss}
                      placeholder="Search Address"
                      className="col-md-9 form-control verfication mt-1 p-0"
                      name="adrerss"
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.userAddress && this.state.userAddress.length > 0
                        ? this.state.userAddress.map((dynamicData, key) => (
                            <Option value={dynamicData.id}>
                              {dynamicData.first_name},{dynamicData.address}
                            </Option>
                          ))
                        : null}
                    </Select>
                  </div>
                  <div className="err-message">
                    {this.addressvalidator.message("Address", this.state.adrerss, "required")}
                  </div>
                  <div className="row">
                    <Button className="verfiy-button-submit" onClick={this.submitForm}>
                      Submit
                    </Button>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              {this.state.verfiyaddressResponser ? (
                <div></div>
              ) : (
                <div className="row">
                  <Button className="verfiy-button" onClick={this.operation}>
                    Verfiy
                  </Button>
                </div>
              )}
            </div>
          </Modal>

          {/* sigin in modal*/}
          <Modal visible={this.state.signin} onCancel={this.handleCancelsignin} width={389} height={539}>
            <div id="modalheader">
              <img alt="" src={APP_LOGO} className="modal-logo" />
            </div>
            <div className="row">
              <label className="col-md-4n signin-modal">Sign In</label>
            </div>
            {this.state.loader ? <Loader /> : null}
            <div style={this.state.loader ? { opacity: "0.4" } : null}>
              <div className="row">
                {/* <Input placeholder="Email Address" className="col-md-10 email-address-modal mt-1">


                </Input> */}

                <input
                  type="text"
                  className="col-md-10 form-control email-address-modal mt-1"
                  placeholder="Email address"
                  name="email"
                  value={this.state.email}
                  onChange={this.setStateFromInputAdd.bind(this)}
                  onKeyPress={this.onKeyPress.bind(this)}
                />
              </div>
              <div className="err-message-email">
                {this.addingValidator.message("Email", this.state.email, "required|email")}
              </div>
              <div className="row">
                {/* <input className="col-md-10 form-control password-modal mt-1"
                  prefix={<i className="fa fa-eye" aria-hidden="true" className="icon-pass" />}
                  type={this.state.hidden ? "password" : "text"} placeholder="Password"
                  name="password" suffix={this.state.hidden ? <EyeOutlined onClick={this.toggleShow} /> : <EyeInvisibleOutlined onClick={this.toggleShow} />}
                  value={this.state.password}
                  onChange={this.setStateFromInputAdd.bind(this)} onKeyPress={this.onKeyPress.bind(this)}>
                </input> */}
                <Input
                  className="col-md-10 password-modal mt-1"
                  prefix={<i class="fa fa-eye" aria-hidden="true" className="icon-pass" />}
                  type={this.state.hidden ? "password" : "text"}
                  placeholder="Password"
                  name="password"
                  suffix={
                    this.state.hidden ? (
                      <EyeOutlined onClick={this.toggleShow} />
                    ) : (
                      <EyeInvisibleOutlined onClick={this.toggleShow} />
                    )
                  }
                  value={this.state.password}
                  onChange={this.setStateFromInputAdd.bind(this)}
                  onKeyPress={this.onKeyPress.bind(this)}
                />
              </div>
              <div className="not-msg">
                (At least one capital letter, minimum of 8 characters, one special character)
              </div>
              <div className="err-message">
                {this.addingValidator.message("Password", this.state.password, "required|passwordMatch")}
              </div>
              <div className="row">
                <Button className="verfiy-button" onClick={this.signin}>
                  Sign In
                </Button>
              </div>

              <div className="row">
                <div className="ff">
                  <Link to="" className="forgotpassword" onClick={this.showModalForgotpassword}>
                    Forgot Password
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="ff verfication">
                  Don't Have an account?{" "}
                  <Link to="" className="forgotpassword" onClick={this.showModalSignUp}>
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </Modal>

          <Modal visible={this.state.signup} onCancel={this.handleCancelsignUp} width={670} height={738}>
            <div className="row m-0">
              <div className="col-12 create-account">Create A New Account</div>
            </div>

            <div className="row m-0">
              <div className="col-12 personal">Enter your personal information to sign up</div>
            </div>
            {this.state.loader ? <Loader /> : null}
            <div style={this.state.loader ? { opacity: "0.4" } : null}>
              <div className="row m-0 first-name"></div>
              <div className="row m-0 emiall-name">
                <div className="col-6 naming-convention">
                  <div>First Name</div>
                  <input
                    type="text"
                    className="form-control mt-1 placeholdermodal"
                    placeholder="First Name"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.setStateFromDifferentSignup.bind(this)}
                  />
                  <div className="err-msg-category">
                    {this.addValidator.message("First Name", this.state.first_name, "required")}
                  </div>
                </div>
                <div className="col-6 naming-convention">
                  <div>Last Name</div>
                  <input
                    type="text"
                    className="form-control mt-1 placeholdermodal"
                    placeholder="Last Name"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.setStateFromDifferentSignup.bind(this)}
                  />
                  <div className="err-msg-category">
                    {this.addValidator.message("Last Name", this.state.last_name, "required")}
                  </div>
                </div>
              </div>
              <div className="row m-0 emiall">
                <div className="col-12 naming-convention">Email Address</div>
              </div>
              <div className="row m-0 emiall-name">
                <div className="col-12 naming-convention">
                  <input
                    type="text"
                    className="form-control mt-1 placeholdermodal"
                    placeholder="Email Address"
                    name="email1"
                    value={this.state.email1}
                    onChange={this.setStateFromDifferentSignup.bind(this)}
                  />
                  <div className="err-msg-category">
                    {this.addValidator.message("Email", this.state.email1, "required|email")}
                  </div>
                </div>
              </div>
              <div className="row m-0 emiall">
                <div className="col-12 naming-convention">Phone Number</div>
              </div>
              <div className="row m-0 emiall-name">
                <div className="col-12 naming-convention">
                  <input
                    type="text"
                    maxLength="10"
                    className="form-control mt-1 placeholdermodal"
                    placeholder="Ex. 1234567890"
                    name="phone_number"
                    value={this.state.phone_number}
                    onChange={this.setStateFromInputSignup.bind(this)}
                  />
                  <div className="err-msg-category">
                    {this.addValidator.message("Phone Number", this.state.phone_number, "required")}
                  </div>
                </div>
              </div>

              <div className="row m-0 emiall-name">
                <div className="col-6 naming-convention">
                  <div>Password</div>
                  <Input
                    className="mt-1 placeholdermodal resp-passwrod"
                    prefix={<i class="fa fa-eye" aria-hidden="true" className="icon-pass" />}
                    type={this.state.signuphidden ? "password" : "text"}
                    placeholder="Password"
                    name="password1"
                    suffix={
                      this.state.signuphidden ? (
                        <EyeOutlined onClick={this.toggleShowSignup} />
                      ) : (
                        <EyeInvisibleOutlined onClick={this.toggleShowSignup} />
                      )
                    }
                    value={this.state.password1}
                    onChange={this.setStateFromDifferentSignup.bind(this)}
                  />
                  <div className="not-msg">
                    (At least one capital letter, minimum of 8 characters, one special character)
                  </div>
                  <div className="err-msg-category">
                    {this.addValidator.message("Password", this.state.password1, "required|passSignUp")}
                  </div>
                </div>
                <div className="col-6 naming-convention">
                  <div>Confirm Password</div>
                  <Input
                    className="mt-1 placeholdermodal resp-passwrod"
                    prefix={<i class="fa fa-eye" aria-hidden="true" className="icon-pass" />}
                    type={this.state.showconfirmpassword ? "password" : "text"}
                    placeholder="Confirm Password"
                    name="confirm_password"
                    suffix={
                      this.state.showconfirmpassword ? (
                        <EyeOutlined onClick={this.toggleShowConfirmpassword} />
                      ) : (
                        <EyeInvisibleOutlined onClick={this.toggleShowConfirmpassword} />
                      )
                    }
                    value={this.state.confirm_password}
                    onChange={this.setStateFromDifferentSignup.bind(this)}
                  />

                  <div className="err-msg-category">
                    {this.addValidator.message("Confirm Password", this.state.confirm_password, "required")}
                  </div>
                  <div className={"err-msg-category " + (this.state.errorFlag ? "" : "d-none")}>
                    <span className="errorMsg">Confirm password must match Password.</span>
                  </div>
                </div>
              </div>
              <div className="row m-0 emiall">
                <div className="col-12 naming-convention">Address</div>
              </div>
              <div className="row m-0 emiall-name">
                <div className="col-12 naming-convention">
                  <AutoComplete style={{ marginBottom: "15px" }}>
                    <PlacesAutocomplete
                      value={this.state.address}
                      onSelectAddress={(address) => this.onSelectAddress(address)}
                    ></PlacesAutocomplete>
                  </AutoComplete>
                </div>
              </div>

              <div className="row m-0 appartment-number">
                <div className="col-12 naming-convention">Apartment Number</div>
              </div>

              <div className="row m-0 emiall-name">
                <div className="col-12 naming-convention">
                  <input
                    type="text"
                    className="form-control mt-1 placeholdermodal"
                    placeholder="Enter Apartment Number"
                    name="apartment_number"
                    value={this.state.apartment_number}
                    onChange={this.setStateFromDifferentSignup.bind(this)}
                  />
                  {/* <div className="err-msg-category">
                    {this.addValidator.message('apartment_number', this.state.apartment_number, 'required')}
                  </div> */}
                </div>
              </div>

              <div className="row m-0 hear-about-us">
                <div className="col-12 naming-convention">How Did You Hear About Us?</div>
              </div>
              <div className="row m-0 emiall-name">
                <div className="col-12">
                  <Select
                    onChange={this.setStateFromHear.bind(this)}
                    showSearch
                    className="hear-select"
                    placeholder="How Did You Hear About Us?"
                    value={this.state.hear}
                    name="hear"
                    optionFilterProp="children"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="Billboard">Billboard</Option>
                    <Option value="Social Media">Social Media</Option>
                    <Option value="Sales Asscociate">Sales Associate</Option>
                    <Option value="Fiends or Family">Friends or Family</Option>
                    <Option value="Fire or EMS">Fire or EMS</Option>
                    <Option value="Insurance">Insurance</Option>
                    <Option value="Internet Search">Internet Search</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                  <div className="err-msg-category">
                    {this.addValidator.message("hear", this.state.hear, "required")}
                  </div>
                </div>
              </div>

              <div className="row m-0 emiall">
                <div className="col-8 checks-style">
                  <Checkbox onChange={this.handleCheck} value={this.state.accept}></Checkbox>
                  {/* <div className="cancel-membership">
                                            Yes, Please cancel my membership
                                      </div> */}
                  <span className="agrred-terms">
                    I Agree to the &nbsp;
                    <Link to="/terms">Terms and Conditions</Link>
                  </span>
                  <span className="selected-chelboxed">
                    {this.addValidator.message("Select", this.state.accept, "required")}
                  </span>
                </div>
              </div>
              {this.state.accept === true ? (
                <div className="row m-0 emiall">
                  <div className="col-4 naming-convention">
                    <Button className="sign-up-modal" onClick={this.SignUp}>
                      Sign Up
                    </Button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </Modal>

          {/* Forgot Password Modal*/}
          <Modal visible={this.state.forgotmodal} onCancel={this.handleCancelforgotpassword} width={389} height={539}>
            <div id="modalheader">
              <img alt="" src={APP_LOGO} className="modal-logo" />
            </div>
            <div className="row">
              <label className="col-md-4n signin-modal">Forgot Password</label>
            </div>
            {this.state.loader ? <Loader /> : null}
            <div style={this.state.loader ? { opacity: "0.4" } : null}>
              <div className="row">
                <input
                  type="text"
                  className="col-md-10 form-control email-address-modal mt-1"
                  placeholder="Email address"
                  name="emailforgot"
                  value={this.state.emailforgot}
                  onChange={this.setStateFromInputAdd.bind(this)}
                />
              </div>
              <div className="err-message-email">
                {this.forgotpasswordValidator.message("Email", this.state.emailforgot, "required|email")}
              </div>
              <div className="row">
                <Button className="verfiy-button" onClick={this.forgotpassword}>
                  Submit
                </Button>
              </div>
            </div>
          </Modal>

          <Modal visible={this.state.cancelmodal} width={370} onCancel={this.handleCancel}>
            {this.state.loader ? <Loader /> : null}
            <div style={this.state.loader ? { opacity: "0.4" } : null}>
              <div id="support-modal">
                <div>Support</div>
              </div>

              <div className="row supoort-title">
                <div className="titiles">Name</div>
              </div>
              <div className="row mt-1">
                <input
                  type="text"
                  className="col-md-11  age-place  form-control mt-1"
                  placeholder="Enter Name"
                  name="emailname"
                  value={this.state.emailname}
                  onChange={this.setStateFromInputAdd.bind(this)}
                />
              </div>

              <div className="err-msg-category">
                {this.supportvalidator.message("Name", this.state.emailname, "required")}
              </div>

              <div className="row supoort-title">
                <div className="titiles">Phone Number</div>
              </div>
              <div className="row mt-1">
                <input
                  type="text"
                  maxLength="10"
                  className="col-md-11  age-place  form-control mt-1"
                  placeholder="Ex. 1234567890"
                  name="emailmobile"
                  value={this.state.emailmobile}
                  onChange={this.setStateFromPhone.bind(this)}
                />
              </div>

              <div className="err-msg-category">
                {this.supportvalidator.message("Phone Number", this.state.emailmobile, "required")}
              </div>

              <div className="row supoort-title">
                <div className="titiles">Email Address</div>
              </div>
              <div className="row mt-1">
                <input
                  type="text"
                  className="col-md-11  age-place  form-control mt-1"
                  placeholder="Enter Email Address"
                  name="emailaddress"
                  value={this.state.emailaddress}
                  onChange={this.setStateFromInputAdd.bind(this)}
                />
              </div>

              <div className="err-msg-category">
                {this.supportvalidator.message("Email", this.state.emailaddress, "required|email")}
              </div>

              <div className="row supoort-title">
                <div className="titiles">Message</div>
              </div>
              <div className="row mt-1">
                <textarea
                  type="text"
                  className="col-md-11 message-support form-control mt-1"
                  placeholder="Enter Message"
                  name="emailmessage"
                  value={this.state.emailmessage}
                  onChange={this.setStateFromInputAdd.bind(this)}
                />
              </div>

              <div className="err-msg-category">
                {this.supportvalidator.message("Message", this.state.emailmessage, "required")}
              </div>

              <div className="row">
                <Button className="verfiy-button-edit" onClick={this.supportsubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default withRouter(Headerbeforelogin);
