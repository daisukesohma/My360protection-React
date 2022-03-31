import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Loader from '../../Views/Loader/Loader';
import Api from '../../Api/ApiUtils';
import { Button, Input } from "antd";


class resetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            token: null,
            email: '',
            password: '',
            hidden:true,
            isDisabled: false
        };
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



    resetPassword = () => {
        this.setState({ loader: true });
        if (this.validator.allValid()) {
            let payload = {
                token: this.props.match.params.token,
                password: this.state.password,
            };
            Api.resetPassword(payload).then(res => {
                if (res && res.data) {
                }
                else {
                    toast.success("Success!!!  Password Has Been Changed Successfully")
                    this.setState({ loader: false ,password:"" });
                }
            })
                .catch(err => {
                    if (err && err.message) {
                        toast.error("Please try again!");
                   }
                })
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({ loader: false });
        }
    }

    setStateFromInputAdd(event) {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }


    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden });
      }

    render() {
        return (

            <div>
                <div className="reset-main">
                    <div className="card rest-card">
                        <div className="card-body text-center rest-background">
                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon" />
                            </div>
                            {this.state.loader ? <Loader /> : null}
                            <div style={this.state.loader ? { opacity: '0.4' } : null}>
                             <h3 className="mb-4" style={{color:'white'}}>Reset Password</h3>
                            <div className="input-group mb-3 d-block">
                                <Input className="col-md-10 password-modal mt-1"
                                    prefix={<i class="fa fa-eye" aria-hidden="true" className="icon-pass" />} type={this.state.hidden ? "password" : "text"} placeholder="Please Enter Password"
                                    name="password" suffix={this.state.hidden ? <EyeOutlined onClick={this.toggleShow} /> : <EyeInvisibleOutlined onClick={this.toggleShow} />}
                                    value={this.state.password}
                                    onChange={this.setStateFromInputAdd.bind(this)}/>
                                  <div className="not-msg">(At least one capital letter, minimum of 8 characters, one special character)</div>
                                <div className="err-msg-reset">{this.validator.message('password', this.state.password, 'required|passwordMatch')}</div>
                            </div>
                            <Button className="verfiy-button"
                                onClick={this.resetPassword}>Submit</Button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default resetPassword;