import React, { Component } from "react";
//import SimpleReactValidator from 'simple-react-validator';
import { withRouter ,Link } from "react-router-dom";
import image from '../../assets/images/fireems.jpg';
import Carousel from 'react-bootstrap/Carousel';
import SimpleReactValidator from 'simple-react-validator';
import ReactPlayer from 'react-player';
import LocalStorage from "../../Api/LocalStorage";
import Headerbeforelogin from '../Header/Headerbeforelogin';
import { Button ,Modal,Input } from "antd";
import styled from "styled-components";
import PlacesAutocomplete from "../AutoCompletion/autocompletion";
import Loader from '../../Views/Loader/Loader';
import { toast } from 'react-toastify';
import vi from '../../assets/images/Home Page Cover Video 2.mp4';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Api from "../../Api/ApiUtils";
import leftimage from '../../assets/images/fightingfighter.jpg';
import firstimage from '../../assets/images/ban.png';

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




class HomeBackup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleResponser: false,
      verfiyaddressResponser: false,
      signin: false,
      signup: false,
      create:false,
      adrerss: undefined,
      showMenu: false,
      loader: false,
      hidden: true,
      signuphidden: true,
      publicIpAddress: '',
      errorFlag: false,
      email: "",
      address: undefined,
      idserach: "",
      lat: "",
      showconfirmpassword:true,
      lng: "",
      password: "",
      regexp: /^[0-9]+$/
    };

    this.validator = new SimpleReactValidator();
    this.contactvalidator= new SimpleReactValidator();
    this.addressvalidator = new SimpleReactValidator();
    //this.addValidator = new SimpleReactValidator();


    this.addValidator = new SimpleReactValidator({
      validators: {
        passSignUp: {
          message: 'Please enter valid password.',
          rule: (val, params, validator) => {
            if (val) {
              return validator.helpers.testRegex(val, /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) && params.indexOf(val) === -1;
            }
          }
        }
      },

    });

    this.addingValidator = new SimpleReactValidator({
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
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.setStateFromInput = this.setStateFromInput.bind(this);
    this.setStateFromDifferentSignup= this.setStateFromDifferentSignup.bind(this);
    this.setStateFromInputSignup = this.setStateFromInputSignup.bind(this);


  }
  componentDidMount() {
    if (this.props.location.hash === "#aboutus") {
      setTimeout(() => {
        let parentElement = this.refs["aboutus"];
        parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    }
    if (this.props.location.hash === "#contactus") {
      setTimeout(() => {
        let parentElement = this.refs["contactus"];
        parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    }
  }

    /* show modal sign up*/
    showModalSignUp=()=> {
      this.setState({
        signup: true,
      })
    }
  
    /* cancel show modal sign up*/
    handleCancelsignUp = e => {
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
      })
      this.addValidator.hideMessages();
    };


    setStateFromInput(event)
    {
      var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
    }
  

    setStateFromDifferentSignup(event) {
      var obj = {};
     obj[event.target.name] = event.target.value;
     if (event.target.name === "confirm_password") {
      if (event.target.value !== this.state.password1) {
        this.setState({ confirm_password: event.target.value, errorFlag: true })
      }
      else {
        this.setState({ confirm_password: event.target.value, errorFlag: false })
      }
    }
    else
    {
      this.setState(obj);
    }
       
    }

    setStateFromInputSignup(event) {
      var obj = {};
      var value = Number(event.target.value)
      if (event.target.name === "phone_number") {
        var regex = /^\d+$/;
        if (value !== "") {
          if (regex.test(value)) {
            this.setState({ phone_number: value })
          }
          else {
           this.setState({phone_number:""})
          }
        }
      }
      else {
        this.setState(obj);
      }
    }
    setStateFromDropdown(event) {
      this.setState({
        adrerss: event
      })
    }
  
    /*-- Show modal Sign in*/
    showModalSignIn = () => {
      this.setState({
        signin: true,
        showMenu: false
      })
    }
  
    /*-- Cancel modal sign in*/
    handleCancelsignin = e => {
      this.setState({
        signin: false,
        email: "",
        password: ""
      });
      this.addingValidator.hideMessages();
    };
  
    /* show modal sign up*/
    showModalSignUp = () => {
      this.setState({
        signup: true,
        signin: false
      })
    }
    // for forgot password modal
    showModalForgotpassword = () => {
      this.setState({
        forgotmodal: true,
        signin: false,
        signup: false
      })
    }
  
  
    //cancel forgotpassword
    handleCancelforgotpassword = e => {
      this.setState({
        loader: false,
        forgotmodal: false,
        emailforgot: ""
  
      })
      this.forgotpasswordValidator.hideMessages();
    };
  
  
  
    /* cancel show modal sign up*/
    handleCancelsignUp = e => {
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
      })
      this.addValidator.hideMessages();
    };
  
 
  
  
    SignUp = () => {
      if (this.addValidator.allValid() && this.state.errorFlag === false) {
        this.setState({ loader: true })
        const payload = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email1,
          mobile_number: this.state.phone_number,
          password: this.state.password1,
          confirm_password: this.state.confirm_password,
          address: this.state.location,
          lat: this.state.lat,
          lang: this.state.lng
        };
        Api.signup(payload)
          .then((response) => {
            if (response.data) {
              LocalStorage.setItem("id", response.data.id)
            LocalStorage.setItem("user_management", JSON.stringify(response.data)).then(fulfilled => {
              LocalStorage.setItem("user_token", JSON.stringify(response.data.token)).then(success => {
                toast.success("Login successfull!!");
                this.props.history.push("/userinformation");
              });
            })
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
                lng: undefined
              })
            }
            else {
            }
          })
          .catch(err => {
            if (err && err.message) {
              toast.error(err.message);
            }
            this.setState({ loader: false })
          })
      }
      else {
        this.addValidator.showMessages();
        this.forceUpdate();
        this.setState({ loader: false });
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
  

    onSelectAddress(address) {
      this.state.location = address.address;
      this.state.lat = address.lat;
      this.state.lng = address.lng
    }
  
  
    toggleShow = () => {
      this.setState({ hidden: !this.state.hidden });
    }
  
    toggleShowSignup = () => {
      this.setState({ signuphidden: !this.state.signuphidden });
    }
  
  
    toggleShowConfirmpassword = () => {
      this.setState({ showconfirmpassword: !this.state.showconfirmpassword })
    }

    
  contactus = () => {
    this.setState({ loader: true })
    if (this.contactvalidator.allValid()) {
      const payload = {
        email: this.state.emailcontact,
        message:this.state.message,
        name:this.state.namecontact
      };
      Api.conatctus(payload)
        .then((response) => {
          if (response.data) {
            this.contactvalidator.hideMessages();

            toast.success("Success");
           
            this.setState({ loader: false,namecontact:"",message:"",emailcontact:""})
            
          }
          else {
            this.contactvalidator.hideMessages();
            toast.success("Success");
            this.setState({ loader: false, namecontact:"",message:"",emailcontact:""})
            
          }
        })
        .catch(err => {
          if (err && err.message) {
          }
          this.setState({ loader: false })
        })
    }
    else {
      this.contactvalidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }

  }




  render() {
    return (
      <div>
        <div data-spy="scroll" data-target=".navbar">
          <div>
            <div>
              <Headerbeforelogin />
            </div>
          </div>
          <section className="app-screenshot bc-section">
            <div className="">
              <Carousel>
                <Carousel.Item interval={1000}>
                  <img
                    className="d-block w-100 img-carouselitem img-firstslider"
                    src={firstimage}
                    alt="First slide"
                  />

                  <Carousel.Caption>

                    <div className="first-title">Are You Prepared?</div>
                    
                   
                    <div className="third-title">My360protection LLC is owned and operated by a firefighter. The goal of every first responder is to protect life, then property. Knowledge of a property and/or medical history of a patient before arriving on a scene is crucial. This site is intended to buy minutes when seconds matter. When disaster strikes whether it is a fire, theft, tornado, or flood, our photo and document section will assist you with providing proof of possessions owned when filing a claim with your insurance provider.</div>
                   
                    
                    
                    <div>
                      <Button className="viewmore" onClick={this.showModalSignUp}>Register Now</Button>
                    </div>
                  </Carousel.Caption>

                </Carousel.Item>
                {/*
            <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 img-carouselitem"
                  src={firstimage}
                  alt="First slide"
                />
                
                <Carousel.Caption>
                  
                  <div className="first-title">Lorem Ipsum is simply</div>
                  <div className="second-title">dummy text</div>
                  <div className="third-title">Lorem Ipsum is simply dummy text of the printing Lorem Ipsum</div>
                  <div className="fourth-title">simply dummy text of the printing</div>
                <div>
                  <Button className="viewmore">View More</Button>
                </div>
                </Carousel.Caption>

              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 img-carouselitem"
                  src={firstimage}
                  alt="First slide"
                />
                
                <Carousel.Caption>
                  
                  <div className="first-title">Lorem Ipsum is simply</div>
                  <div className="second-title">dummy text</div>
                  <div className="third-title">Lorem Ipsum is simply dummy text of the printing Lorem Ipsum</div>
                  <div className="fourth-title">simply dummy text of the printing</div>
                <div>
                  <Button className="viewmore">View More</Button>
                </div>
                </Carousel.Caption>

              </Carousel.Item>
            */}
         

              </Carousel>
            </div>


          </section>

          
          <div id="aboutus" ref={"aboutus"}>
            <section className="awesome-feature s-padding feature-padding">
              <div className="container containe-home">
                {/* <div className="s-title stitle">
                  <h2 className="wow">About Us</h2>
                </div> */}
                {/* <div className="container">
                  <div className="row abp-tct">
                    <div className="col-lg-10 col-md-12 col-sm-12 text-abouts">
                    My360protection LLC is owned and operated by a firefighter.
                     The goal of every first responder is to protect life,
                      then property. Knowledge of a property and/or medical history 
                      of a patient before arriving on a scene is crucial.
                       This site is intended to buy minutes when seconds matter. 
                       When disaster strikes whether it is a fire, theft, tornado,
                        or flood, our photo and document section will 
                    assist you with providing proof of possessions owned when filing a claim with your insurance provider.
                  </div>
                  </div>
                </div> */}

                <div>
                <section>
            <div style={{marginTop:'42px'}}>
              
              <div className="row videocredit">
                
                    <div className="videoss-css">
                    <ReactPlayer controls
                    className="videoss-css"
                    url={vi} />
                    </div>
               
              </div>
            </div>
          </section>
                  </div>
                <div className="row align-items-center justify-content-center printing-txt">
                  <div className="col-4 response-image">
                    <img
                      src={image}
                      alt="text heree"
                      className="rightimage"
                    />
                  </div>
                  <div className="col-5 response-text">
                    <div className="dummy-text">
                    Asset Protection
                   </div>
                    <div className="content">
                    The photo vault is restricted
                     to the profile owner. 
                     This portion is a crucial 
                     of your profile and is secured 
                     with enhanced security while ONLY being visible to you. During a time of loss, it is easy to forget your most simple possessions. By giving you the opportunity to document all of your belongings in the event of a disaster(fire, flood, theft, etc.), the photo vault 
                    will assist you when filing a claim with your insurance provider by providing proof of ownership.
                   </div>
                   {/*
                    <div className="content">
                      <Button className="view-more">View More</Button>
                    </div>
                   */}
                   
                  </div>
                </div>

                <div className="row align-items-center justify-content-center loreum-ipsum">
                  <div className="col-5 response-left-text home-protection">
                    <div className="dummy-text">
                    Home Protection
                    </div>
                    <div className="content">
                    The first part of your profile will 
                    contain information about your residence 
                    (structure, entrance/exit).
                     The medical portion will assist
                      EMT and Paramedics with medical history and other information such as current medications and disabilities for each member of your household. These sections are optional but beneficial and recommended in assisting first responders with critical information about you, your family and residence therefore speeding up the response time and care during an emergency.

                    </div>
                    {/*
                     <div className="content">
                      <Button className="view-more">View More</Button>
                    </div>
                    */}
                   
                  </div>
                  <div className="col-4 left-image response-image-left">

                    <img
                      src={leftimage}
                      alt="text heree"
                      className="leftsideimage"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>


          <div id="footer" ref={"contactus"}>
            <h2 className="contactus" id="contact">First Responders Contact Us for Registration</h2>
            <div className="row w-100 m-0 simply-txt">
            </div>
            <div className="container">
              <div className="row text-contatc">
                <div className="col-lg-7 col-md-12 col-sm-12 loreum-txt">
                  
                  </div>
              </div>
            </div>
            <div className="container">
              <div className="row align-items-center resp-row">
                <div className="col-lg-12 col-md-12 col-sm-12 con-conatacyus">
                  <div className="banner-content setvalue-conact bcontnet contact-us-content" >
                    <div className="row mb-6">
                      <div className="col-6 name-contactusform">
                        <div className="form-group">
                          <input type="text" className="form-control name-fields w-100" placeholder="Name" name="namecontact"
                           onChange={this.setStateFromInput.bind(this)}  value={this.state.namecontact} />
                            <div className="err-msg-category col-6">
                            {this.contactvalidator.message('Name', this.state.namecontact, 'required')}
                            </div>            
                        </div>
                      </div>

                      <div className="col-6 name-contactusform">
                        <div className="form-group">
                          <input type="text" className="form-control name-fields w-100" 
                          placeholder="Email" name="emailcontact"  value={this.state.emailcontact} onChange={this.setStateFromInput.bind(this)} />
                        <div className="err-msg-category col-6">
                            {this.contactvalidator.message('Email', this.state.emailcontact, 'required|email')}
                            </div> 
                        </div>
                      </div>
                    </div>


                    <div className="row mb-6">
                      <div className="col-12">
                        <div className="form-group">
                          <textarea placeholder="Write Message Here" name="message" value={this.state.message}
                           className="form-control name-address w-100" onChange={this.setStateFromInput.bind(this)}>

                          </textarea>
                          <div className="err-msg-category col-6">
                            {this.contactvalidator.message('Message', this.state.message, 'required')}
                            </div> 
                        </div>
                      </div>
                    </div>
                    <div className="div-button-submit">
                      <Button className="buttons-submits" onClick={this.contactus}>Submit</Button>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            <div className="row w-100 m-0 roww-border" >
            </div>
            <div className="container">
              <div className="row w-100 m-0">
                <div className="col-1">

                </div>
                <div className="col-6 d-flex footer-responsive" >
                  <a href="#home">
                    <div className="mr-2 footer-tags">
                      Home
                     </div>
                  </a>
                  <div className="mr-2 borders-footer" >
                  </div>
                  <a href="#aboutus">
                    <div id="aboutus" className="mr-2 footer-tags">
                      About Us
                  </div>
                  </a>
                  <div className="mr-2 borders-footer">
                  </div>
                  <a href="#contact">
                    <div className="mr-2 footer-tags">
                      Contact Us
                  </div>
                  </a>
                  <div className="mr-2 borders-footer">
                  </div>
                  <Link to="/terms">
                    <div className="mr-2 footer-tags">
                      Terms and Condition
                   </div>
                  </Link>
                  <div className="mr-2 borders-footer">
                  </div>
                  <Link to="/privacy">
                    <div className="mr-2 footer-tags">
                      Privacy
                   </div>
                  </Link>
                </div>
              </div>
            </div>


            <div className="container">
              <div className="row w-100 row-footerr">
                <div className="col-5 d-flex footerrespo justify-content-center">
                  <Link to="/">
                  <div className="mr-1 fot-txt">
                    Designed and Hosted by Illini Tech Services.
                  </div>
                  </Link>
                </div>
              </div>
            </div>

            
            <div className="container">
              <div className="row w-100 row-footerrs">
               
                <div className="col-5 d-flex footerrespo-home justify-content-center">
                  <div className="mr-1 fot-txt">
                    
                  &#169; 2021. My360Protection, LLC. All Rights Reserved
                    
                  </div>
                </div>
              </div>
            </div> 




          </div>
        </div>
       

        <Modal visible={this.state.signup}
            onCancel={this.handleCancelsignUp}
            width={670}
            height={738}>


            <div className="row m-0">
              <div className="col-12 create-account">
              Create A New Account
            </div>

            </div>



            <div className="row m-0">
              <div className="col-12 personal">
              Enter your personal information to sign up
            </div>

            </div>
            {this.state.loader ? <Loader /> : null}
            <div style={this.state.loader ? { opacity: '0.4' } : null}>
              <div className="row m-0 first-name">


              </div>
              <div className="row m-0 emiall-name">

                <div className="col-6 naming-convention">

                  <div>
                    First Name
                   </div>
                  <input type="text" className="form-control mt-1 placeholdermodal" placeholder="First Name" name='first_name' value={this.state.first_name} onChange={this.setStateFromDifferentSignup.bind(this)} />
                  <div className="err-msg-category">
                    {this.addValidator.message('First Name', this.state.first_name, 'required')}
                  </div>
                </div>
                <div className="col-6 naming-convention">
                  <div>
                    Last Name
            </div>
                  <input type="text" className="form-control mt-1 placeholdermodal" placeholder="Last Name" name='last_name' value={this.state.last_name} onChange={this.setStateFromDifferentSignup.bind(this)} />
                  <div className="err-msg-category">
                    {this.addValidator.message('Last Name', this.state.last_name, 'required')}
                  </div>
                </div>
              </div>
              <div className="row m-0 emiall">
                <div className="col-12 naming-convention">
                  Email Address
            </div>
              </div>
              <div className="row m-0 emiall-name">
                <div className="col-12 naming-convention">
                  <input type="text" className="form-control mt-1 placeholdermodal" placeholder="Email Address" name='email1' value={this.state.email1} onChange={this.setStateFromDifferentSignup.bind(this)} />
                  <div className="err-msg-category">
                    {this.addValidator.message('Email', this.state.email1, 'required|email')}
                  </div>
                </div>
              </div>
              <div className="row m-0 emiall">
                <div className="col-12 naming-convention">
                  Phone Number
            </div>
              </div>
              <div className="row m-0 emiall-name">
                <div className="col-12 naming-convention">
                  <input type="text" maxLength="10" className="form-control mt-1 placeholdermodal" placeholder="Ex. 1234567890" name='phone_number'
                    value={this.state.phone_number} onChange={this.setStateFromInputSignup.bind(this)} />
                  <div className="err-msg-category">
                    {this.addValidator.message('Phone Number', this.state.phone_number, 'required')}
                  </div>


                </div>
              </div>

              <div className="row m-0 emiall-name">
                <div className="col-6 naming-convention">
                  <div>
                    Password
            </div>
                  <Input className="mt-1 placeholdermodal resp-passwrod"
                    prefix={<i class="fa fa-eye" aria-hidden="true" className="icon-pass" />} type={this.state.signuphidden ? "password" : "text"}
                    placeholder="Password"
                    name="password1" suffix={this.state.signuphidden ?
                      <EyeOutlined onClick={this.toggleShowSignup} /> : <EyeInvisibleOutlined onClick={this.toggleShowSignup} />}
                    value={this.state.password1}
                    onChange={this.setStateFromDifferentSignup.bind(this)} />
                  <div className="not-msg">(At least one capital letter, minimum of 8 characters, one special character)</div>
                  <div className="err-msg-category">
                    {this.addValidator.message('Password', this.state.password1, 'required|passSignUp')}
                  </div>

                </div>
                <div className="col-6 naming-convention">
                  <div>
                    Confirm Password
            </div>
                  <Input className="mt-1 placeholdermodal resp-passwrod"
                    prefix={<i class="fa fa-eye" aria-hidden="true" className="icon-pass" />} type={this.state.showconfirmpassword ? "password" : "text"}
                    placeholder="Confirm Password"
                    name='confirm_password' suffix={this.state.showconfirmpassword ?
                      <EyeOutlined onClick={this.toggleShowConfirmpassword} /> : <EyeInvisibleOutlined onClick={this.toggleShowConfirmpassword} />}
                    value={this.state.confirm_password}
                    onChange={this.setStateFromDifferentSignup.bind(this)} />

                  <div className="err-msg-category">
                    {this.addValidator.message('Confirm Password', this.state.confirm_password, 'required')}
                  </div>
                  <div className={"err-msg-category " + (this.state.errorFlag ? "" : "d-none")}>
                    <span className="errorMsg">Confirm password must match Password.</span>
                  </div>
                </div>
              </div>
              <div className="row m-0 emiall">
                <div className="col-12 naming-convention">
                  Address
            </div>
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
              <div className="row m-0 emiall">
                <div className="col-12 naming-convention">

                  <Button className="sign-up-modal" onClick={this.SignUp}>Sign Up</Button>

                </div>
              </div>
            </div>
          </Modal>




      </div>
    );
  }
}
export default withRouter(HomeBackup);
