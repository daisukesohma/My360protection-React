import React, { Component } from "react";
import SimpleReactValidator from 'simple-react-validator';
import { withRouter, Link } from "react-router-dom";
import Loader from '../../Views/Loader/Loader';
import { Button ,Modal } from "antd";
import { FACEBOOK_LOGO } from '../../Views/s3Links';
import Api from "../../Api/ApiUtils";
import { toast } from 'react-toastify';
import { HashLink } from "react-router-hash-link";

class Footers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleResponser: false,
      pro: [],
      unlimited: [],
      basic:[],
      verfiyaddressResponser: false,
      signin: false,
      signup: false,
      create:false,
      accept:"",
      adrerss: undefined,
      showMenu: false,
      loader: false,
      hidden: true,
      signuphidden: true,
      publicIpAddress: '',
      errorFlag: false,
     // signupbuttonvisible:false,
      email: "",
      address: undefined,
      idserach: "",
      lat: "",
      showconfirmpassword:true,
      lng: "",
      password: "",
      regexp: /^[0-9]+$/,

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
    this.setStateFromInput = this.setStateFromInput.bind(this);
  }
  componentDidMount() {
this.getDataLandingPageContent()
  }

  getDataLandingPageContent() {
    this.setState({ loader: true });
    let payload = {
      abc: {}
    };
    Api.landingPageContent(payload)
      .then((res) => {
        if (res && res.data) {
          this.setState({
            loader:false,
            banner: res.data.banner ? res.data.banner : {},
            ContentAboutIn: res.data['about-us-content'] ? res.data['about-us-content'] : {},
            AssstesProtectionn: res.data['assets_protection'] ? res.data['assets_protection'] : {},
            homeProtection: res.data['home-protection'] ? res.data['home-protection'] : {},
            basicplann: res.data['basic-plan'] ? res.data['basic-plan'] : {},
            proplann: res.data['pro-plan'] ? res.data['pro-plan'] : {},
            unlimtedplan: res.data['unlimited-plan'] ? res.data['unlimited-plan'] : {},
            video: res.data.video ? res.data.video : {},
            VideoForm: res.data.video ? res.data.video : {},
            HeaderHome: res.data['header-home'] ? res.data['header-home'] : {},
            HeaderHomeForm: res.data['header-home'] ? res.data['header-home'] : {},
            headerAboutUs: res.data['header-about'] ? res.data['header-about'] : {},
            headerAboutUsForm: res.data['header-about'] ? res.data['header-about'] : {},
            headerSupport: res.data['header-support'] ? res.data['header-support'] : {},
            headerSupportForm: res.data['header-support'] ? res.data['header-support'] : {},
            footerHome: res.data['footer-home'] ? res.data['footer-home'] : {},
            footerHomeForm: res.data['footer-home'] ? res.data['footer-home'] : {},
            footerAboutus: res.data['footer-aboutus'] ? res.data['footer-aboutus'] : {},
            footerAboutusForm: res.data['footer-aboutus'] ? res.data['footer-aboutus'] : {},
            footerSupport: res.data['footer-support'] ? res.data['footer-support'] : {},
            footerSupportForm: res.data['footer-support'] ? res.data['footer-support'] : {},
            footerTermsCondition: res.data['footer-terms'] ? res.data['footer-terms'] : {},
            footerTermsConditionForm: res.data['footer-terms'] ? res.data['footer-terms'] : {},
            footerPrivacy: res.data['footer-privacy'] ? res.data['footer-privacy'] : {},
            footerPrivacyForm: res.data['footer-privacy'] ? res.data['footer-privacy'] : {},
          })
        }
      })
      .catch(function (err) {
        if (err.errors)
          toast.error(err.errors.msg);
      });
  }

showModalCancelSupport = () => {
  this.setState({
    cancelmodal: true,
  });
};


handleCancel = e => {
  this.setState({
    cancelmodal: false,
    emailname: "",
    emailsubject: "",
    emailmessage: "",
    emailmobile:"",
    emailaddress: ""
  });
  this.supportvalidator.hideMessages();
};

supportsubmit = () => {
  if (this.supportvalidator.allValid()) {
    this.setState({ loader: true })
    const payload = {
      email: this.state.emailaddress,
      name: this.state.emailname,
      phone_number: this.state.emailmobile,
      message: this.state.emailmessage
    };
    Api.support(payload)
      .then((response) => {
        console.log("respon",response)
        if (response) {
          this.supportvalidator.hideMessages();
          toast.success("Success");
          this.setState({
            cancelmodal: false,
            loader: false,
            emailname: "",
            emailmobile:"",
            emailsubject: "",
            emailmessage: "",
            emailaddress: ""
          })
         
        }
        else {

        }
      })
      .catch(err => {
        this.setState({
          loader: false
        })
        if (err.status === 404) {
          
        }
        else if (err.status === 403) {
          
        }
      })
  }
  else {
    this.supportvalidator.showMessages();
    this.forceUpdate();
    this.setState({ loader: false });
  }

}


setStateFromPhone(event) {
  var obj = {};
  var value = Number(event.target.value)
  if (event.target.name === "emailmobile") {
    var regex = /^\d+$/;
    if (value !== "") {
      if (regex.test(value)) {
        this.setState({ emailmobile: value })
      }
      else {
        this.setState({ emailmobile: "" })
      }
    }
  }
  else {
    this.setState(obj);
  }

}

setStateFromInput(event)
{
  var obj = {};
obj[event.target.name] = event.target.value;
this.setState(obj);
}






  render() {
    const { 
      footerHome, footerAboutus, footerSupport, footerTermsCondition, footerPrivacy
    } = this.state;
    return (
      <div>
        <div data-spy="scroll" data-target=".navbar">
          <div id="footer">
            <div className="row w-100 col m-0">
            <div className="footer-facebook">
                  <a
                        href=" https://www.facebook.com/My360Protection/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ padding: "3px" }}
                      >
                        <img src={FACEBOOK_LOGO} alt="text here" className="facebook-img">
                  </img>
                  </a>
                  </div>
            </div>
            <div className="container">
              <div className="row w-100 m-0">
                {/* <div className="col-1">

                </div> */}
                <div className="col-5 d-flex footer-responsive">
                  
                {footerHome ?
                   <HashLink smooth to="/">
                    <div className="mr-2 footer-tags">
                    {this.state.footerHomeForm && this.state.footerHomeForm.content && this.state.footerHomeForm.content[0] && this.state.footerHomeForm.content[0].title ? this.state.footerHomeForm.content[0].title : ""}
                   </div>
                  </HashLink> :""}


                   <div className="mr-2 borders-footer" >
                  </div>
                  {footerAboutus ?
                  <HashLink to="/#aboutus">
                    <div className="mr-2 footer-tags">
                    {this.state.footerAboutusForm && this.state.footerAboutusForm.content && this.state.footerAboutusForm.content[0] && this.state.footerAboutusForm.content[0].title ? this.state.footerAboutusForm.content[0].title : ""}
                                       </div>
                  </HashLink> :""}

                   <div className="mr-2 borders-footer">
                  </div> 
                  
                  {footerSupport ?
                    <div className="mr-2 footer-tags support-tag-hover" onClick={this.showModalCancelSupport}>
                       {this.state.footerSupportForm && this.state.footerSupportForm.content && this.state.footerSupportForm.content[0] && this.state.footerSupportForm.content[0].title ? this.state.footerSupportForm.content[0].title : ""}
                                       </div>:""}
                  
                  <div className="mr-2 borders-footer" >
                  </div>
{/*                   
                  <Link to="/#contactus">
                    <div className="mr-2 footer-tags">
                      Contact Us
                                    </div>
                  </Link>
                  <div className="mr-2 borders-footer">
                  </div> */}
                  {footerTermsCondition ?
                  <Link to="/terms">
                    <div className="mr-2 footer-tags">
                    {this.state.footerTermsConditionForm && this.state.footerTermsConditionForm.content && this.state.footerTermsConditionForm.content[0] && this.state.footerTermsConditionForm.content[0].title ? this.state.footerTermsConditionForm.content[0].title : ""}
                                    </div>
                  </Link>:""}
                  <div className="mr-2 borders-footer">
                  </div>
                  {footerPrivacy ?
                  <Link to="/privacy">
                    <div className="mr-2 footer-tags">
                    {this.state.footerPrivacyForm && this.state.footerPrivacyForm.content && this.state.footerPrivacyForm.content[0] && this.state.footerPrivacyForm.content[0].title ? this.state.footerPrivacyForm.content[0].title : ""}
                                     </div>
                  </Link>:""}
                </div>
              </div>
            </div>


            <div className="container">
              <div className="row w-100 row-footerr">
                <div className="col-5 d-flex footerrespo justify-content-center">
                  
                    <div className="mr-1 fot-txt">
                    Designed, Supported and Hosted by
                    <a href="https://illinitechs.com/"
                   target="_blank"
                   rel="noopener noreferrer"
                   > Illini Tech Services</a>
                                   </div>
            
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
        <Modal visible={this.state.cancelmodal}
            width={370}
            onCancel={this.handleCancel} >
            {this.state.loader ? <Loader /> : null}
            <div style={this.state.loader ? { opacity: '0.4' } : null}>  
            <div id="support-modal">
              <div>
                Support 
             </div>
            </div>

            <div className="row supoort-title" >
                <div className="titiles">
                  Name
             </div>
              </div>
              <div className="row mt-1">
                <input type="text"
                  className="col-md-11  age-place  form-control mt-1"
                  placeholder="Enter Name"
                  name='emailname' value={this.state.emailname}
                  onChange={this.setStateFromInput.bind(this)} />
              </div>

              <div className="err-msg-category">
                {this.supportvalidator.message('Name', this.state.emailname, 'required')}
              </div>

              <div className="row supoort-title" >
                <div className="titiles">
                  Phone Number
                               </div>
              </div>
              <div className="row mt-1">
                <input type="text" maxLength="10"
                  className="col-md-11  age-place  form-control mt-1"
                  placeholder="Ex. 1234567890"
                  name='emailmobile' value={this.state.emailmobile}
                  onChange={this.setStateFromPhone.bind(this)} />
              </div>

              <div className="err-msg-category">
                {this.supportvalidator.message('Phone Number', this.state.emailmobile, 'required')}
              </div>

              <div className="row supoort-title">
                <div className="titiles">
                  Email Address
                               </div>
              </div>
              <div className="row mt-1">
                <input type="text"
                  className="col-md-11  age-place  form-control mt-1"
                  placeholder="Enter Email Address"
                  name='emailaddress' value={this.state.emailaddress}
                  onChange={this.setStateFromInput.bind(this)} />
              </div>

              <div className="err-msg-category">
                {this.supportvalidator.message('Email', this.state.emailaddress, 'required|email')}
              </div>
              <div className="row supoort-title" >
                <div className="titiles">
                  Message
                               </div>
              </div>
              <div className="row mt-1">
                <textarea type="text"
                  className="col-md-11 message-support form-control mt-1"
                  placeholder="Enter Message"
                  name='emailmessage' value={this.state.emailmessage}
                  onChange={this.setStateFromInput.bind(this)} />
              </div>

              <div className="err-msg-category">
                {this.supportvalidator.message('Message', this.state.emailmessage, 'required')}
              </div>

              <div className="row">
                <Button className="verfiy-button-edit" onClick={this.supportsubmit}>Submit</Button>
              </div>
            </div>
          </Modal>




      </div>
    );
  }
}
export default withRouter(Footers);
