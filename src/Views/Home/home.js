import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import LocalStorage from "../../Api/LocalStorage";
import $ from "jquery";
import { FACEBOOK_LOGO } from "../../Views/s3Links";
import Headerbeforelogin from "../Header/Headerbeforelogin";
import { Button, Modal, Input, Checkbox } from "antd";
import { Select } from "antd";
import styled from "styled-components";
import PlacesAutocomplete from "../AutoCompletion/autocompletion";
import Loader from "../../Views/Loader/Loader";
import { toast } from "react-toastify";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Api from "../../Api/ApiUtils";

const { Option } = Select;

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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleResponser: false,
      pro: [],
      unlimited: [],
      basic: [],
      data: [],
      basicanually: [],
      proannually: [],
      unlimitedanually: [],
      verfiyaddressResponser: false,
      signin: false,
      signup: false,
      create: false,
      accept: "",
      adrerss: undefined,
      showMenu: false,
      loader: false,
      hidden: true,
      signuphidden: true,
      publicIpAddress: "",
      errorFlag: false,
      // signupbuttonvisible:false,
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

      //homeProtection
      firstResponsder: {},
      firstResponsderForm: {},

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

      showAnnuallyBasic: true,
      showAnnuallyPro: true,
      showAnnuallyUnlimited: true,
    };

    this.validator = new SimpleReactValidator();
    this.supportvalidator = new SimpleReactValidator();
    this.contactvalidator = new SimpleReactValidator();
    this.addressvalidator = new SimpleReactValidator();
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
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.setStateFromInput = this.setStateFromInput.bind(this);
    this.setStateFromDifferentSignup = this.setStateFromDifferentSignup.bind(this);
    this.setStateFromInputSignup = this.setStateFromInputSignup.bind(this);
    this.setStateFromInputFromContactPhone = this.setStateFromInputFromContactPhone.bind(this);
  }
  componentDidMount() {
    this.getallPlans();
    this.getDataLandingPageContent();

    // console.log("about us",this.props.location)

    // if (this.props.location.hash === "#aboutus") {
    //   console.log("about us",this.props.location)
    //   console.log("about us location",this.props.location.hash)
    //   setTimeout(() => {
    //     let parentElement = this.refs["aboutus"];
    //     parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
    //   }, 500);
    // }
    window.scrollTo(0, 0);
  }

  getDataLandingPageContent() {
    this.setState({ loader: true });
    let payload = {
      abc: {},
    };
    Api.landingPageContent(payload)
      .then((res) => {
        if (res && res.data) {
          this.setState(
            {
              loader: false,
              banner: res.data.banner ? res.data.banner : {},
              ContentAboutIn: res.data["about-us-content"] ? res.data["about-us-content"] : {},
              AssstesProtectionn: res.data["assets_protection"] ? res.data["assets_protection"] : {},
              homeProtection: res.data["home-protection"] ? res.data["home-protection"] : {},
              firstResponsder: res.data["first-responsder"] ? res.data["first-responsder"] : {},
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
            },
            () => {
              console.log("statte", this.state.AssstesProtectionn.content[0]);
              $(".homeProtectionsDesc").html(
                this.state.homeProtection.content[0] && this.state.homeProtection.content[0].title
                  ? this.state.homeProtection.content[0].title
                  : ""
              );
              $(".AsetsProtectionDesc").html(
                this.state.AssstesProtectionn.content[0] && this.state.AssstesProtectionn.content[0].title
                  ? this.state.AssstesProtectionn.content[0].title
                  : ""
              );
              $(".FirstResponders").html(
                this.state.firstResponsder.content[0] && this.state.firstResponsder.content[0].title
                  ? this.state.firstResponsder.content[0].title
                  : ""
              );
              $(".AboutusSection").html(
                this.state.ContentAboutIn.content[0] && this.state.ContentAboutIn.content[0].title
                  ? this.state.ContentAboutIn.content[0].title
                  : ""
              );
            }
          );
        }
      })
      .catch(function (err) {
        if (err.errors) toast.error(err.errors.msg);
      });
  }

  getallPlans() {
    this.setState({ loader: true });
    Api.getallPlanhome()
      .then((response) => {
        if (response) {
          if (response.data) {
            //console.log("fetch plan subcription", response.data[3])
            this.setState({
              loader: false,
              data: response.data,
              basic: response.data[0],
              pro: response.data[1],
              unlimited: response.data[2],
              basicanually: response.data[3],
              proannually: response.data[4],
              unlimitedanually: response.data[5],
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
  /* show modal sign up*/
  showModalSignUp = () => {
    this.setState({
      signup: true,
    });
  };

  handleCheck = (e) => {
    this.setState(
      {
        accept: e.target.checked,
        //signupbuttonvisible:true
      },
      () => console.log("state of checked", this.state.accept)
    );
  };
  /* cancel show modal sign up*/
  handleCancelsignUp = (e) => {
    this.setState({
      loader: false,
      signup: false,
      accept: "",
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

  setStateFromInput(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
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

  setStateFromInputFromContactPhone(event) {
    var obj = {};
    var value = Number(event.target.value);
    if (event.target.name === "namemobile") {
      var regex = /^\d+$/;
      if (value !== "") {
        if (regex.test(value)) {
          this.setState({ namemobile: value });
        } else {
          this.setState({ namemobile: "" });
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
        accept: this.state.accept,
        apartment_number: this.state.apartment_number,
        lang: this.state.lng,
        heard_from: this.state.hear,
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
              lng: undefined,
              hear: undefined,
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

  onSelectAddress(address) {
    this.state.location = address.address;
    this.state.lat = address.lat;
    this.state.lng = address.lng;
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

  contactus = () => {
    this.setState({ loader: true });
    if (this.contactvalidator.allValid()) {
      const payload = {
        email: this.state.emailcontact,
        message: this.state.message,
        name: this.state.namecontact,
        phone_number: this.state.namemobile,
      };
      Api.conatctus(payload)
        .then((response) => {
          if (response.data) {
            this.contactvalidator.hideMessages();

            toast.success("Success");

            this.setState({ loader: false, namecontact: "", message: "", emailcontact: "", namemobile: "" });
          } else {
            this.contactvalidator.hideMessages();
            toast.success("Success");
            this.setState({ loader: false, namecontact: "", message: "", emailcontact: "", namemobile: "" });
          }
        })
        .catch((err) => {
          if (err && err.message) {
          }
          this.setState({ loader: false });
        });
    } else {
      this.contactvalidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };

  setStateFromHear(event) {
    console.log("eveemnt", event);
    this.setState(
      {
        hear: event,
      },
      console.log("hear", this.state.hear)
    );
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
      emailmobile: "",
      emailmessage: "",
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

  handleChangeShowAnnually = (key, show) => {
    this.setState({ [key]: show })
  }

  render() {
    const {
      ContentAboutIn,
      AssstesProtectionn,
      homeProtection,
      footerHome,
      footerAboutus,
      firstResponsder,
      footerSupport,
      footerTermsCondition,
      footerPrivacy,
      VideoForm,
    } = this.state;
    return (
      <div>
        {this.state.loader ? <Loader /> : null}
        <div style={this.state.loader ? { opacity: "0.4" } : null}>
          <div data-spy="scroll" data-target=".navbar">
            <div>
              <div>
                <Headerbeforelogin />
              </div>
            </div>
            <section className="app-screenshot bc-section">
              <div className="">
                {/* <img className="d-block w-100 img-carouselitem img-firstslider" src={firstimage} alt="First slide" /> */}

                {VideoForm ? (
                  <div>
                    <div>
                      <div>
                        <iframe
                          className="videoss-css"
                          width="100%"
                          height="95%"
                          title="Title"
                          //src="https://www.youtube.com/embed/9Bdis8WheR8?rel=0&autoplay=1&mute=1&showinfo=0"
                          src={
                            this.state.VideoForm &&
                            this.state.VideoForm.content &&
                            this.state.VideoForm.content[0] &&
                            this.state.VideoForm.content[0].url
                              ? this.state.VideoForm.content[0].url
                              : ""
                          }
                          frameBorder="0"
                          allow="accelerometer; 
                                  autoplay; encrypted-media; gyroscope;
                                  picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* {banner ? (
                  <div>
                    {banner && banner.content && banner.content.length > 0 ? (
                      <div className="first-title">
                        {banner.content[0] && banner.content[0].title ? banner.content[0].title : ""}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )} */}
                {/* <div>
                  <Button className="viewmore" onClick={this.showModalSignUp}>
                    Register Now
                  </Button>
                </div> */}
              </div>
            </section>

            <div>
              <section className="awesome-feature  feature-padding-home">
                <div className="container containe-home">
                  <div className="row align-items-center justify-content-center printing-txt">
                    <div className="col-4 response-image">
                      {AssstesProtectionn ? (
                        <div>
                          {AssstesProtectionn && AssstesProtectionn.content && AssstesProtectionn.content.length > 0 ? (
                            <img
                              src={
                                AssstesProtectionn.content[0] && AssstesProtectionn.content[0].image
                                  ? AssstesProtectionn.content[0].image
                                  : ""
                              }
                              alt="text heree"
                              className="rightimage"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-5 response-text">
                      <div className="dummy-text">Asset Management</div>

                      {AssstesProtectionn ? (
                        <div>
                          {AssstesProtectionn && AssstesProtectionn.content && AssstesProtectionn.content.length > 0 ? (
                            <div className="content AsetsProtectionDesc"></div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                      <div>
                        {/* <a
                          href="https://my360protection-development-assests.s3.amazonaws.com/AssetsManagement/my360protection+fire+flier.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          Click More
                        </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* <div>
              <section className="awesome-feature  feature-padding-home txting-bak">
                <div className="container containe-home">
                  <div className="container">
                    <div className="row abp-tct">
                      <div className="col-lg-10 col-md-12 col-sm-12 text-abouts-pricing-system">
                        With Prices as Low as $7.99/Month
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 signubutton">
                        <Button className="viewmore-registernow" onClick={this.showModalSignUp}>
                          Sign Up
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div> */}

            <div>
              <section className="awesome-feature s-padding feature-padding-home">
                <div className="container containe-home home-emergency-planning">
                  <div className="row align-items-center justify-content-center loreum-ipsum">
                    <div className="col-5 response-left-text home-protection">
                      <div className="dummy-text">Home Emergency Planning</div>

                      {homeProtection ? (
                        <div>
                          {homeProtection && homeProtection.content && homeProtection.content.length > 0 ? (
                            <div className="content homeProtectionsDesc">
                              {/* {homeProtection.content[0] && homeProtection.content[0].title ? homeProtection.content[0].title : ''} */}
                            </div>
                          ) : (
                            ""
                          )}
                          <div>
                            {/* <a
                              href="https://my360protection-development-assests.s3.amazonaws.com/AssetsManagement/my360protection+fire+flier.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {" "}
                              Click More
                            </a> */}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {/* <div className="content">
                        <Button className="view-more">View More</Button>
                      </div> */}
                    </div>

                    <div className="col-4 left-image response-image-left">
                      {homeProtection ? (
                        <div>
                          {homeProtection && homeProtection.content && homeProtection.content.length > 0 ? (
                            <img
                              src={
                                homeProtection.content[0] && homeProtection.content[0].image
                                  ? homeProtection.content[0].image
                                  : ""
                              }
                              alt="text heree"
                              className="leftsideimage"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div>
              <section className="awesome-feature  feature-padding-home">
                <div className="container containe-home firee-fighters">
                  <div className="row align-items-center justify-content-center printing-txt">
                    <div className="col-4 response-image">
                      {firstResponsder ? (
                        <div>
                          {firstResponsder && firstResponsder.content && firstResponsder.content.length > 0 ? (
                            <img
                              src={
                                firstResponsder.content[0] && firstResponsder.content[0].image
                                  ? firstResponsder.content[0].image
                                  : ""
                              }
                              alt="text heree"
                              className="rightimage"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-5 response-text">
                      <div className="dummy-text">First Responder</div>

                      {firstResponsder ? (
                        <div>
                          {firstResponsder && firstResponsder.content && firstResponsder.content.length > 0 ? (
                            <div className="content FirstResponders">
                              {/* {firstResponsder.content[0] && firstResponsder.content[0].title ? firstResponsder.content[0].title : ''} */}
                            </div>
                          ) : (
                            ""
                          )}
                          <div>
                            {/* <a
                              href="https://my360protection-development-assests.s3.amazonaws.com/AssetsManagement/my360protection+fire+flier.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {" "}
                              Click More
                            </a> */}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* About us Content */}
            <div id="aboutus" ref={"aboutus"}>
              <section className="awesome-feature s-padding feature-padding-home">
                <div className="container containe-home">
                  <div className="container">
                    {ContentAboutIn ? (
                      <div>
                        {ContentAboutIn && ContentAboutIn.content && ContentAboutIn.content.length > 0 ? (
                          <div className="row abp-tct">
                            <div className="col-lg-12 col-md-12 col-sm-12 text-abouts AboutusSection">
                              {/* {ContentAboutIn.content[0] && ContentAboutIn.content[0].title ? ContentAboutIn.content[0].title : ''}                                   */}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </section>
            </div>

            <div className="container containe-home pricing-plans-spaces">
              <div className="s-title stitle">
                <h2 className="wow">SUBSCRIPTIONS</h2>
              </div>
            </div>

            <div className="container images-container-subscriptionplan planningtext">
              <div className="row">
                <div className="col-4 content-reposn">
                  <div className="card cards-borders planning-unlimited-height">
                    <div className="card-body">
                      <div className="row align-items-center justify-content-center">
                        <div>
                          <Button
                            className={`mx-1 ${this.state.showAnnuallyBasic ? "active-button" : ""}`}
                            onClick={() => this.handleChangeShowAnnually('showAnnuallyBasic', true)}
                          >
                            Annually
                          </Button>
                        </div>
                        <div>
                          <Button
                            className={`mx-1 ${!this.state.showAnnuallyBasic ? "active-button" : ""}`}
                            onClick={() => this.handleChangeShowAnnually('showAnnuallyBasic', false)}
                          >
                            Monthly
                          </Button>
                        </div>
                      </div>
                      {this.state.showAnnuallyBasic ? (
                        <div>
                          <div className="row align-items-center justify-content-center baisc-plan">
                            <div className="col-auto basiciplan">
                              {this.state.basicanually.plan_name}
                            </div>
                          </div>

                          <div className="row align-items-center justify-content-center numm">
                            <div className="col-auto plannumber">
                              $ {this.state.basicanually.price}/{this.state.basicanually.duration_type}
                            </div>
                          </div>

                          <div className="row align-items-center justify-content-center getstart">
                            <div className="txtxt">{this.state.basicanually.description}</div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="row align-items-center justify-content-center baisc-plan">
                            <div className="col-auto basiciplan">{this.state.basic.plan_name}</div>
                          </div>
                          <div className="row align-items-center justify-content-center numm">
                            <div className="col-auto plannumber">
                              $ {this.state.basic.price}/{this.state.basic.duration_type}
                            </div>
                          </div>
                          <div className="row align-items-center justify-content-center getstart">
                            <div className="txtxt">{this.state.basic.description}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-4 content-reposnes">
                  <div className="card cards-borders planning-unlimited-height">
                    <div className="card-body">
                      <div className="row align-items-center justify-content-center">
                        <div>
                          <Button
                            className={`mx-1 ${this.state.showAnnuallyPro ? "active-button" : ""}`}
                            onClick={() => this.handleChangeShowAnnually('showAnnuallyPro', true)}
                          >
                            Annually
                          </Button>
                        </div>
                        <div>
                          <Button
                            className={`mx-1 ${!this.state.showAnnuallyPro ? "active-button" : ""}`}
                            onClick={() => this.handleChangeShowAnnually('showAnnuallyPro', false)}
                          >
                            Monthly
                          </Button>
                        </div>
                      </div>

                      {this.state.showAnnuallyPro ? (
                        <div>
                          <div className="row align-items-center justify-content-center baisc-plan">
                            <div className="col-auto basiciplan">{this.state.proannually.plan_name}</div>
                          </div>

                          <div className="row align-items-center justify-content-center numm">
                            <div className="col-auto plannumber">
                              $ {this.state.proannually.price}/{this.state.proannually.duration_type}
                            </div>
                          </div>

                          <div className="plans-borders">Save nearly $8 per year with annual subscription</div>

                          <div className="row align-items-center justify-content-center getstart">
                            <div className="txtxt">{this.state.proannually.description}</div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="row align-items-center justify-content-center baisc-plan">
                            <div className="col-auto basiciplan">{this.state.pro.plan_name}</div>
                          </div>

                          <div className="row align-items-center justify-content-center numm">
                            <div className="col-auto plannumber">
                              $ {this.state.pro.price}/{this.state.pro.duration_type}
                            </div>
                          </div>

                          <div className="row align-items-center justify-content-center getstart">
                            <div className="txtxt">{this.state.pro.description}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* <div className="card-body">
                      <div className="row align-items-center justify-content-center baisc-plan">
                        {proplann && proplann.content && proplann.content.length > 0 ? (
                          <div className="col-auto basiciplan">
                            {proplann.content[0] && proplann.content[0].title ? proplann.content[0].title : ""}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="row align-items-center justify-content-center numm">
                        <div className="col-auto plannumber">
                          $ {this.state.pro.price}/{this.state.pro.duration_type}
                        </div>
                      </div>

                      <div className="row align-items-center justify-content-center getstart">
                        {proplann && proplann.content && proplann.content.length > 0 ? (
                          <div className="txtxt">
                            {proplann.content[0] && proplann.content[0].description
                              ? proplann.content[0].description
                              : ""}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="col-4 content-reposnes">
                  <div className="card cards-borders planning-unlimited-height">
                    <div className="card-body">
                      <div className="row align-items-center justify-content-center">
                        <div>
                          <Button
                            className={`mx-1 ${this.state.showAnnuallyUnlimited ? "active-button" : ""}`}
                            onClick={() => this.handleChangeShowAnnually('showAnnuallyUnlimited', true)}
                          >
                            Annually
                          </Button>
                        </div>
                        <div>
                          <Button
                            className={`mx-1 ${!this.state.showAnnuallyUnlimited ? "active-button" : ""}`}
                            onClick={() => this.handleChangeShowAnnually('showAnnuallyUnlimited', false)}
                          >
                            Monthly
                          </Button>
                        </div>
                      </div>
                      {this.state.showAnnuallyUnlimited ? (
                        <div>
                          <div className="row align-items-center justify-content-center baisc-plan">
                            <div className="col-auto basiciplan">{this.state.unlimitedanually.plan_name}</div>
                          </div>

                          <div className="row align-items-center justify-content-center numm">
                            <div className="col-auto plannumber">
                              $ {this.state.unlimitedanually.price}/{this.state.unlimitedanually.duration_type}
                            </div>
                          </div>
                          <div className="plans-borders">Save nearly $19 per year with annual subscription</div>

                          <div className="row align-items-center justify-content-center getstart">
                            <div className="txtxt">{this.state.unlimitedanually.description}</div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="row align-items-center justify-content-center baisc-plan">
                            <div className="col-auto basiciplan">{this.state.unlimited.plan_name}</div>
                          </div>

                          <div className="row align-items-center justify-content-center numm">
                            <div className="col-auto plannumber">
                              $ {this.state.unlimited.price}/{this.state.unlimited.duration_type}
                            </div>
                          </div>

                          <div className="row align-items-center justify-content-center getstart">
                            <div className="txtxt">{this.state.unlimited.description}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* <div className="card-body">
                      <div className="row align-items-center justify-content-center baisc-plan">
                        {unlimtedplan && unlimtedplan.content && unlimtedplan.content.length > 0 ? (
                          <div className="col-auto basiciplan">
                            {unlimtedplan.content[0] && unlimtedplan.content[0].title
                              ? unlimtedplan.content[0].title
                              : ""}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="row align-items-center justify-content-center numm">
                        <div className="col-auto plannumber">
                          $ {this.state.unlimited.price}/{this.state.unlimited.duration_type}
                        </div>
                      </div>

                      <div className="row align-items-center justify-content-center getstart">
                        {unlimtedplan && unlimtedplan.content && unlimtedplan.content.length > 0 ? (
                          <div className="txtxt">
                            {unlimtedplan.content[0] && unlimtedplan.content[0].description
                              ? unlimtedplan.content[0].description
                              : ""}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="row col">
              <Button className="viewmore" onClick={this.showModalSignUp}>
                Register Now
              </Button>
            </div> */}

            {/* <div className="container-button">
              <div className="center">
                <Button className="viewmore">Register Now</Button>
              </div>
            </div> */}

            <div className="col-lg-12 col-md-12 col-sm-12 signubutton-viewmore">
              <Button className="viewmoreregisternow" onClick={this.showModalSignUp}>
                Register Now
              </Button>
            </div>

            <div id="footer" ref={"contactus"}>
              <h2 className="contactus" id="contact">
                First Responders Contact Us for Registration
              </h2>
              <div className="row w-100 m-0 simply-txt"></div>
              <div className="container">
                <div className="row text-contatc">
                  <div className="col-lg-7 col-md-12 col-sm-12 loreum-txt"></div>
                </div>
              </div>
              <div className="container">
                <div className="row align-items-center resp-row">
                  <div className="col-lg-12 col-md-12 col-sm-12 con-conatacyus">
                    <div className="banner-content setvalue-conact bcontnet contact-us-content">
                      <div className="row mb-6">
                        <div className="col-6 name-contactusform">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control name-fields w-100"
                              placeholder="Name"
                              name="namecontact"
                              onChange={this.setStateFromInput.bind(this)}
                              value={this.state.namecontact}
                            />
                            <div className="err-msg-category col-6">
                              {this.contactvalidator.message("Name", this.state.namecontact, "required")}
                            </div>
                          </div>
                        </div>

                        <div className="col-6 name-contactusform">
                          <div className="form-group">
                            <input
                              type="text"
                              maxLength="10"
                              className="form-control name-fields w-100"
                              placeholder="Enter Phone Number"
                              name="namemobile"
                              onChange={this.setStateFromInputFromContactPhone.bind(this)}
                              value={this.state.namemobile}
                            />
                            <div className="err-msg-category col-6">
                              {this.contactvalidator.message("Moblie Number", this.state.namemobile, "required")}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-6">
                        <div className="col-12 name-contactusform">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control name-fields w-100"
                              placeholder="Email"
                              name="emailcontact"
                              value={this.state.emailcontact}
                              onChange={this.setStateFromInput.bind(this)}
                            />
                            <div className="err-msg-category col-6">
                              {this.contactvalidator.message("Email", this.state.emailcontact, "required|email")}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-6">
                        <div className="col-12">
                          <div className="form-group">
                            <textarea
                              placeholder="Write Message Here"
                              name="message"
                              value={this.state.message}
                              className="form-control name-address w-100"
                              onChange={this.setStateFromInput.bind(this)}
                            ></textarea>
                            <div className="err-msg-category col-6">
                              {this.contactvalidator.message("Message", this.state.message, "required")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="div-button-submit">
                        <Button className="buttons-submits" onClick={this.contactus}>
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row w-100 col m-0 roww-border">
                <div className="footer-facebook">
                  <a
                    href=" https://www.facebook.com/My360Protection/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: "3px" }}
                  >
                    <img src={FACEBOOK_LOGO} alt="text here" className="facebook-img"></img>
                  </a>
                </div>
              </div>
              <div className="container container-footers">
                <div className="row w-100 m-0">
                  {/* <div className="col-1">

                </div> */}
                  <div className="col-5 d-flex footer-responsive">
                    {footerHome ? (
                      <a href="/">
                        <div className="mr-2 footer-tags">
                          {this.state.footerHomeForm &&
                          this.state.footerHomeForm.content &&
                          this.state.footerHomeForm.content[0] &&
                          this.state.footerHomeForm.content[0].title
                            ? this.state.footerHomeForm.content[0].title
                            : ""}
                        </div>
                      </a>
                    ) : (
                      ""
                    )}

                    <div className="mr-2 borders-footer"></div>
                    {footerAboutus ? (
                      <a href="#aboutus">
                        <div id="aboutus" className="mr-2 footer-tags">
                          {this.state.footerAboutusForm &&
                          this.state.footerAboutusForm.content &&
                          this.state.footerAboutusForm.content[0] &&
                          this.state.footerAboutusForm.content[0].title
                            ? this.state.footerAboutusForm.content[0].title
                            : ""}
                        </div>
                      </a>
                    ) : (
                      ""
                    )}
                    <div className="mr-2 borders-footer"></div>

                    {footerSupport ? (
                      <div className="mr-2 footer-tags support-tag-hover" onClick={this.showModalCancelSupport}>
                        {this.state.footerSupportForm &&
                        this.state.footerSupportForm.content &&
                        this.state.footerSupportForm.content[0] &&
                        this.state.footerSupportForm.content[0].title
                          ? this.state.footerSupportForm.content[0].title
                          : ""}
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="mr-2 borders-footer"></div>
                    {/* <a href="#contact">
                    <div className="mr-2 footer-tags">
                      Contact Us
                  </div>
                  </a>
                  <div className="mr-2 borders-footer">
                  </div> */}
                    {footerTermsCondition ? (
                      <Link to="/terms">
                        <div className="mr-2 footer-tags">
                          {this.state.footerTermsConditionForm &&
                          this.state.footerTermsConditionForm.content &&
                          this.state.footerTermsConditionForm.content[0] &&
                          this.state.footerTermsConditionForm.content[0].title
                            ? this.state.footerTermsConditionForm.content[0].title
                            : ""}
                        </div>
                      </Link>
                    ) : (
                      ""
                    )}

                    <div className="mr-2 borders-footer"></div>
                    {footerPrivacy ? (
                      <Link to="/privacy">
                        <div className="mr-2 footer-tags">
                          {this.state.footerPrivacyForm &&
                          this.state.footerPrivacyForm.content &&
                          this.state.footerPrivacyForm.content[0] &&
                          this.state.footerPrivacyForm.content[0].title
                            ? this.state.footerPrivacyForm.content[0].title
                            : ""}
                        </div>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row w-100 row-footerr">
                  <div className="col-5 d-flex footerrespo justify-content-center">
                    <div className="mr-1 fot-txt">
                      Designed, Supported and Hosted by
                      <a href="https://illinitechs.com/" target="_blank" rel="noopener noreferrer">
                        {" "}
                        Illini Tech Services
                      </a>
                      .
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row w-100 row-footerrs">
                  <div className="col-5 d-flex footerrespo-home justify-content-center">
                    <div className="mr-1 fot-txt">&#169; 2021. My360Protection, LLC. All Rights Reserved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  prefix={<i className="fa fa-eye" aria-hidden="true" className="icon-pass" />}
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
                  prefix={<i className="fa fa-eye" aria-hidden="true" className="icon-pass" />}
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
                <div className="err-msg-category">{this.addValidator.message("hear", this.state.hear, "required")}</div>
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
                  <Link to="/terms" className="homepage">
                    Terms and Conditions
                  </Link>
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
                onChange={this.setStateFromInput.bind(this)}
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
                onChange={this.setStateFromInput.bind(this)}
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
                onChange={this.setStateFromInput.bind(this)}
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
    );
  }
}
export default withRouter(Home);
