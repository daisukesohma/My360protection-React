import React, { Component } from "react";
import { withRouter} from "react-router-dom";
import Headerbeforelogin from '../Header/Headerbeforelogin';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import Api from "../../Api/ApiUtils";
import Footer from '../Footer/Footer';
import $ from "jquery";

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUs:"",
      privacy:"",
      terms:""
    };
  }
  componentDidMount() {
    var _this = this;
    window.scrollTo(0, 0);
    _this.getterms();
  }

  getterms() {
    this.setState({ loader: true })
    Api.getAppContent()
      .then((res) => {
        if (res) {
          if (res.data) {
            this.setState({ terms: res.data[2].content ,loader:false }, () => {
              $(".descriptioninfo").html(this.state.terms);
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
        this.setState({ loader: false });
      });
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
          <div>
          {this.state.loader ? <Loader /> : null}
            <div style={this.state.loader ? { opacity: '0.4' } : null}>
            <section className="awesome-feature s-padding feature-padding">
              <div className="container containe-home">
                <div className="s-title stitle">
                {this.state.terms ?
                      <h2 className="wow">Terms and Condition</h2> : ""}
                </div>
                <div className="container">
                  <div className="row abp-tct">
                    <div className="col-12 text-abouts descriptioninfo ressp">
                      {this.state.terms}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            </div>
          </div>
          <div id="footer">
            <div
              id="footer-height"
              className="footer-fix"
              style={
                this.state.terms ? { display: "inline" } : { display: "none" }
              }
            >
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Terms);
