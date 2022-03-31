import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import CheckoutForm from "../Dashboard/CheckoutForm";
import LocalStorage from "../../Api/LocalStorage";
import Loader from '../../Views/Loader/Loader';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
} from "@stripe/react-stripe-js";
import Api from "../../Api/ApiUtils";
import { Button } from "antd";
import Headerafterlogin from "../Header/Headerafterlogin";

//const stripePromise = loadStripe('pk_test_OsnkoSPTRgGqT8jucVE6vIyK005Yp6Kg3Y');

//client  development
const stripePromise = loadStripe('pk_test_51Hn6KbEKSOXRwdoupvTwpsxwg87rTjsYJaYJPU38KETKePxSxlzPotywTJs2YyNwMJUl1a3hQlIALTCB5FwTRUUp00NK5lOzZz');


//client live stripe key
// const stripePromise = loadStripe('pk_live_51Hn6KbEKSOXRwdoufhrEIiAXy0r1JCCChF5j6o3WLoyieR4W8TjAIoVl3sPYHFxdFIKQvZm4VU44oDG9SKEQgVH0007xC9DUZk');



class Subscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showimages: true,
            showdouments: false,
            proshowdouments: false,
            proshowimages: true,
            unlimitedshowimages: true,
            unlimitedshowdouments: false,
            userinfo: '',
            proplan: false,
            status: "",
            data: [],
            basic: [],
            warning: false,
            plan: false,
            nameplan: "",
            pro: [],
            unlimited: [],
            basicanually: [],
            proannually: [],
            unlimitedanually: [],
            loader: false,
        };
    }

    componentDidMount() {
        var _this = this;
        if (localStorage.getItem("user_token") !== null) {
            LocalStorage.getItem("user_management").then(user => {
                //console.log("userrrrrrrrrrrrr", user)
                _this.setState({
                    user: user.id,
                    //userinfo: user.is_info_added,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    loader: false
                }, () => { _this.fetchData(); })
            });
        }
        else {
            _this.props.history.push("/");
        }
        //this.getdata();
    }

    fetchData() {
        this.setState({ loader: true })
        let payload = {
            id: this.state.user
        }
        Api.fetchSubcription(payload)
            .then((response) => {
                if (response) {
                    if (response.data) {
                        //console.log("fetch plan subcription", response.data[0].plan_name)
                        this.setState({
                            loader: false,
                            basic: response.data[0],
                            pro: response.data[1],
                            data: response.data,
                            unlimited: response.data[2],
                            basicanually: response.data[3],
                            proannually: response.data[4],
                            unlimitedanually: response.data[5]

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

    getbasicplan = (status) => {
        //console.log()
        this.setState({ loader: true, planName: status, warning: false }, () => {
            //console.log("Month", this.state.selectionMonth)
        })
        const payload = {
            user_id: this.state.user,
            plan_name: status,
        };
        //console.log("Paylod of get basic plan",payload)
        Api.getbaiscplan(payload)
            .then((response) => {
                //toast.success("Success")

                this.setState({
                    plan: true
                })
                if (response.status === 200) {
                    //toast.success("Success")
                }
                else {
                    this.setState({
                        loader: false
                    })
                }
            })
            .catch(error => {
                console.log("eroror", error.status)
                console.log("Eoror Messgae", error.error.message)
                if (error.status === 400) {
                    toast.error(error.error.message)
                    this.setState({
                        loader: false
                    })
                }
                else {
                    console.log("inside th 403 warning message")
                    if (error.status === 403) {
                        console.log("Inside the error of 403")
                        this.setState({
                            loader: false,
                            warning: true
                        })
                    }
                    this.fetchData();

                }
            })
    }
    showimagesmodal = e => {
        this.setState({
            showimages: true,
            showdouments: false
        });
    };

    showdoumentsmodal = e => {
        this.setState({
            showdouments: true,
            showimages: false
        });
    };


    proshowimagesmodal = e => {
        this.setState({
            proshowimages: true,
            proshowdouments: false
        });
    };

    proshowdoumentsmodal = e => {
        this.setState({
            proshowdouments: true,
            proshowimages: false
        });
    };

    unlimitedshowimagesmodal = e => {
        console.log("Show modal", this.state.unlimitedshowimages, this.state.unlimitedshowdouments)
        this.setState({
            unlimitedshowimages: true,
            unlimitedshowdouments: false
        });
    };

    unlimitedshowdoumentsmodal = e => {
        console.log("Doucment modal", this.state.unlimitedshowimages, this.state.unlimitedshowdouments)
        this.setState({
            unlimitedshowdouments: true,
            unlimitedshowimages: false
        });
    };







    render() {
        // {console.log("baisc",this.state.basicanually.active_plan)}
        // {console.log("pro",this.state.proannually.active_plan)}
        // {console.log("unlimited",this.state.unlimitedanually.active_plan)}
        return (


            <div className="dashboard-main">
                {localStorage.getItem('user_token') !== null ?
                    //with token
                    <div>
                        <div data-spy="scroll" data-target=".navbar">
                            <div>
                                <div>
                                    <Headerafterlogin />
                                </div>

                                {this.state.loader ? <Loader /> : null}
                                <div style={this.state.loader ? { opacity: '0.4' } : null}>

                                    <div className="choosee">CHOOSE YOUR SUBSCRIPTION PLAN
                                      </div>

                                    {/* <div>
                                        {this.state.data.is_active === true ? <div style={{ textAlign: 'center' }}>
                                            Current Plan:
                                      </div> : <div></div>}

                                    </div> */}

                                    <div style={{ textAlign: 'center', fontSize: '22px', marginTop: '10px' }}>
                                        {this.state.basic.active_plan === true ?
                                            <span style={{ fontWeight: 'bold' }}>Current Plan: Basic Plan-Monthly</span> : ""}
                                        {this.state.pro.active_plan === true ?
                                            <span style={{ fontWeight: 'bold' }}>Current Plan: Pro Plan-Monthly</span> : ""}
                                        {this.state.unlimited.active_plan === true ?
                                            <span style={{ fontWeight: 'bold' }}>Current Plan: Unlimited Plan-Monthly</span> : ""}
                                        {this.state.basicanually.active_plan === true ?
                                            <span style={{ fontWeight: 'bold' }}>Current Plan: Basic Plan-Annually</span> : ""}
                                        {this.state.proannually.active_plan === true ?
                                            <span style={{ fontWeight: 'bold' }}>Current Plan: Pro Plan-Annually</span> : ""}
                                        {this.state.unlimitedanually.active_plan === true ?
                                            <span style={{ fontWeight: 'bold' }}>Current Plan: Unlimited Plan-Annually</span> : ""}

                                    </div>

                                    {this.state.warning === true ?
                                        <div style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>
                                            Warning: <span style={{ fontWeight: 'bold', fontSize: '14px' }}>You have used more data than what your new plan supports. To downgrade, please delete some images or documents to less than the size of new plan</span>
                                        </div> : ""}


                                    <div className="container images-container-subscriptionplan">
                                        <div className="row">
                                            <div className="col-4 content-reposn">

                                                <div class="card cards-borders plann-subscrioption">
                                                    <div class="card-body">


                                                        <div className="row align-items-center justify-content-center">
                                                            <div>
                                                                <Button className={this.state.showimages === true ? "button-images-images button-images-doc" : "button-images-images"}
                                                                    onClick={this.showimagesmodal}>Annually</Button>
                                                            </div>
                                                            <div>
                                                                <Button className={this.state.showimages === false ? "documents button-images-doc" : "documents"} onClick={this.showdoumentsmodal}>Monthy</Button>
                                                            </div>

                                                        </div>

                                                        {this.state.showimages === true ? <div>
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
                                                                <div className="txtxt" >
                                                                    {this.state.basicanually.description}
                                                                </div>

                                                            </div>

                                                            <div className="row align-items-center justify-content-center getstart">
                                                                {this.state.unlimitedanually.active_plan === true ?
                                                                    <Button className="getstarted" onClick={() => this.getbasicplan('BasicAnnual')}>Downgrade</Button> :
                                                                    <div>
                                                                        {this.state.proannually.active_plan === true || this.state.unlimitedanually.active_plan === true ?
                                                                            <Button className="getstarted" onClick={() => this.getbasicplan('BasicAnnual')}>Downgrade</Button>
                                                                            : (this.state.basicanually.active_plan === true ? <div style={{ marginTop: '31px' }}></div> :
                                                                                <Button className="getstarted" onClick={() => this.getbasicplan('BasicAnnual')} >Get Started</Button>)}
                                                                    </div>}
                                                                {/* 

                                                                {this.state.proannually.active_plan === true || this.state.unlimitedanually.active_plan === true ?
                                                                
                                                                    <Button className="getstarted" onClick={() => this.getbasicplan('BasicAnnual')}>Downgrade</Button>
                                                                     :
                                                                    <div>
                                                                        {this.state.basicanually.active_plan === true ?  :
                                                                           }

                                                                    </div>
                                                                } */}
                                                            </div>
                                                        </div> : <div>
                                                            <div className="row align-items-center justify-content-center baisc-plan">
                                                                <div className="col-auto basiciplan">
                                                                    {this.state.basic.plan_name}
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center justify-content-center numm">
                                                                <div className="col-auto plannumber">
                                                                    $ {this.state.basic.price}/{this.state.basic.duration_type}
                                                                </div>

                                                            </div>


                                                            <div className="row align-items-center justify-content-center getstart">
                                                                <div className="txtxt" >
                                                                    {this.state.basic.description}
                                                                </div>

                                                            </div>

                                                            <div className="row align-items-center justify-content-center getstart">
                                                                {console.log("Basic pro unlimited For Monthly",
                                                                    this.state.basic.active_plan, this.state.pro.active_plan, this.state.unlimited.active_plan)}


                                                                {console.log("Basic pro unlimited For Annually",
                                                                    this.state.basicanually.active_plan, this.state.proannually.active_plan, this.state.unlimitedanually.active_plan)}


                                                                {this.state.unlimitedanually.active_plan === true || this.state.basicanually.active_plan === true || this.state.proannually.active_plan === true ?
                                                                    <div></div> :
                                                                    <div>
                                                                        {this.state.unlimited.active_plan === true ? <div>
                                                                            <Button className="getstarted" onClick={() => this.getbasicplan('Basic')}>Downgrade</Button>
                                                                        </div> :
                                                                            <div>
                                                                                {this.state.pro.active_plan === true || this.state.unlimited.active_plan === true ?
                                                                                    <Button className="getstarted" onClick={() => this.getbasicplan('Basic')}>Downgrade</Button> :
                                                                                    <div>
                                                                                        {this.state.basic.active_plan === true ? <div style={{ marginTop: '31px' }}></div> :
                                                                                            <Button className="getstarted" onClick={() => this.getbasicplan('Basic')} >Get Started</Button>}

                                                                                    </div>
                                                                                }
                                                                            </div>}
                                                                    </div>}



                                                            </div> </div>}

                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-4 content-reposnes">
                                                <div class="card cards-borders plann-subscrioption">
                                                    <div class="card-body">


                                                        <div className="row align-items-center justify-content-center">
                                                            <div>
                                                                <Button className={this.state.proshowimages === true ? "button-images-images button-images-doc" : "button-images-images"}
                                                                    onClick={this.proshowimagesmodal}>Annually</Button>
                                                            </div>
                                                            <div>

                                                                <Button className={this.state.proshowimages === false ? "documents button-images-doc" : "documents"} onClick={this.proshowdoumentsmodal}>Monthy</Button>
                                                            </div>
                                                        </div>

                                                        {this.state.proshowimages === true ? <div>
                                                            <div className="row align-items-center justify-content-center baisc-plan">
                                                                <div className="col-auto basiciplan">
                                                                    {this.state.proannually.plan_name}
                                                                </div>
                                                            </div>


                                                            <div className="row align-items-center justify-content-center numm">
                                                                <div className="col-auto plannumber">
                                                                    $ {this.state.proannually.price}/{this.state.proannually.duration_type}
                                                                </div>
                                                            </div>

                                                            <div className="plans-borders">
                                                                Save nearly $8 per year with annual subscription
                                                            </div>


                                                            <div className="row align-items-center justify-content-center getstart">
                                                                <div className="txtxt" >
                                                                    {this.state.proannually.description}
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center justify-content-center getstart">

                                                                {this.state.unlimitedanually.active_plan === true ? <div>
                                                                    <Button className="getstarted" onClick={() => this.getbasicplan('ProAnnual')}>Downgrade</Button>
                                                                </div> :
                                                                    <div>
                                                                        {this.state.basicanually.active_plan === true || this.state.unlimitedanually.active_plan === true ?
                                                                            <Button className="getstarted" onClick={() => this.getbasicplan('ProAnnual')}>Upgrade</Button> :
                                                                            <div>
                                                                                {this.state.proannually.active_plan === true ? <div style={{ marginTop: '31px' }}></div> :
                                                                                    <Button className="getstarted" onClick={() => this.getbasicplan('ProAnnual')}>Get Started</Button>}
                                                                            </div>}
                                                                    </div>}

                                                            </div>
                                                        </div> : <div>
                                                            <div className="row align-items-center justify-content-center baisc-plan">
                                                                <div className="col-auto basiciplan">
                                                                    {this.state.pro.plan_name}
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center justify-content-center numm">
                                                                <div className="col-auto plannumber">
                                                                    $ {this.state.pro.price}/{this.state.pro.duration_type}
                                                                </div>
                                                            </div>


                                                            <div className="row align-items-center justify-content-center getstart">
                                                                <div className="txtxt" >
                                                                    {this.state.pro.description}
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center justify-content-center getstart">


                                                                {this.state.unlimitedanually.active_plan === true || this.state.basicanually.active_plan === true || this.state.proannually.active_plan === true ?
                                                                    <div></div> :
                                                                    <div>
                                                                        {this.state.unlimited.active_plan === true ? <div>
                                                                            <Button className="getstarted" onClick={() => this.getbasicplan('Pro')}>Downgrade</Button>
                                                                        </div> :
                                                                            <div>
                                                                                {this.state.basic.active_plan === true || this.state.unlimited.active_plan === true ?
                                                                                    <Button className="getstarted" onClick={() => this.getbasicplan('Pro')}>Upgrade</Button> :
                                                                                    <div>
                                                                                        {this.state.pro.active_plan === true ? <div style={{ marginTop: '31px' }}></div> :
                                                                                            <Button className="getstarted" onClick={() => this.getbasicplan('Pro')}>Get Started</Button>}
                                                                                    </div>}
                                                                            </div>}
                                                                    </div>
                                                                }



                                                            </div></div>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-4 content-reposnes">
                                                <div class="card cards-borders plann-subscrioption">
                                                    <div class="card-body">

                                                        <div className="row align-items-center justify-content-center">
                                                            <div>

                                                                <Button className={this.state.unlimitedshowimages === true ? "button-images-images button-images-doc" : "button-images-images"}
                                                                    onClick={this.unlimitedshowimagesmodal}>Annually</Button>
                                                            </div>
                                                            <div>

                                                                <Button className={this.state.unlimitedshowimages === false ? "documents button-images-doc" : "documents"}
                                                                    onClick={this.unlimitedshowdoumentsmodal}>Monthy</Button>
                                                            </div>
                                                        </div>
                                                        {this.state.unlimitedshowimages === true ? <div>
                                                            <div className="row align-items-center justify-content-center baisc-plan">
                                                                <div className="col-auto basiciplan">
                                                                    {this.state.unlimitedanually.plan_name}
                                                                </div>
                                                            </div>


                                                            <div className="row align-items-center justify-content-center numm">
                                                                <div className="col-auto plannumber">


                                                                    $ {this.state.unlimitedanually.price}/{this.state.unlimitedanually.duration_type}
                                                                </div>
                                                            </div>
                                                            <div className="plans-borders">
                                                                Save nearly $19 per year with annual subscription
                                                            </div>


                                                            <div className="row align-items-center justify-content-center getstart">
                                                                <div className="txtxt" >
                                                                    {this.state.unlimitedanually.description}
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center justify-content-center" style={{ marginTop: '27px' }}>

                                                                {this.state.proannually.active_plan === true || this.state.basicanually.active_plan === true ?
                                                                    <Button className="getstarted startedbuttons" onClick={() => this.getbasicplan('UnlimitedAnnual')}>Upgrade</Button> :

                                                                    <div>
                                                                        {this.state.unlimitedanually.active_plan === true ? <div style={{ marginTop: '31px' }}></div> :
                                                                            <Button className="getstarted startedbuttons" onClick={() => this.getbasicplan('UnlimitedAnnual')}>Get Started</Button>}

                                                                    </div>}

                                                            </div>
                                                        </div> : <div>
                                                            <div className="row align-items-center justify-content-center baisc-plan">
                                                                <div className="col-auto basiciplan">
                                                                    {this.state.unlimited.plan_name}
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center justify-content-center numm">
                                                                <div className="col-auto plannumber">

                                                                    $ {this.state.unlimited.price}/{this.state.unlimited.duration_type}
                                                                </div>
                                                            </div>


                                                            <div className="row align-items-center justify-content-center getstart">
                                                                <div className="txtxt" >
                                                                    {this.state.unlimited.description}
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center justify-content-center" style={{ marginTop: '27px' }}>
                                                                {this.state.unlimitedanually.active_plan === true || this.state.basicanually.active_plan === true || this.state.proannually.active_plan === true ?
                                                                    <div></div> :
                                                                    <div>
                                                                        {this.state.pro.active_plan === true || this.state.basic.active_plan === true ?
                                                                            <Button className="getstarted startedbuttons" onClick={() => this.getbasicplan('Unlimited')}>Upgrade</Button> :

                                                                            <div>
                                                                                {this.state.unlimited.active_plan === true ? <div style={{ marginTop: '31px' }}></div> :
                                                                                    <Button className="getstarted startedbuttons" onClick={() => this.getbasicplan('Unlimited')}>Get Started</Button>}

                                                                            </div>}
                                                                    </div>
                                                                }
                                                            </div></div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {this.state.plan === true ? <Elements stripe={stripePromise}>
                            <CheckoutForm planme={this.state.planName} />
                        </Elements> : ""
                        }
                    </div> :
                    //without token
                    <div>
                        <Redirect to={{
                            pathname: "/"
                        }} />
                    </div>
                }

            </div>
        );
    }
}
export default withRouter(Subscription);


