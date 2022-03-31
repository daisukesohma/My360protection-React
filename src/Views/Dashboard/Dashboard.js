import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
import {
  PDF,
  WORD,
  XCEL,
  RTF,
  TEXT,
  house,
  constuction,
  pets,
  handicap,
  bedrooom,
  onestory,
  numberroof,
  basement,
  documents,
  gallery,
} from "../../Views/s3Links";
import { toast } from "react-toastify";
import LocalStorage from "../../Api/LocalStorage";
import Loader from "../../Views/Loader/Loader";
import Api from "../../Api/ApiUtils";
import { Button } from "antd";
import Headerafterlogin from "../Header/Headerafterlogin";
import S3FileUpload from "react-s3";
import { AWS_CONFIG } from "../../Constanst";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showimages: true,
      errormessage: false,
      showdouments: false,
      userinfo: "",
      loader: false,
      previewVisible: false,
      errormessageofdocuments: false,
      files: [],
      inputKey: Date.now(),
      filesDocuments: [],
      deletekey: Date.now(),
    };
    this.validator = new SimpleReactValidator();
    this.addValidator = new SimpleReactValidator();
  }

  showimagesmodal = (e) => {
    this.setState({
      showimages: true,
      showdouments: false,
    });
  };

  showdoumentsmodal = (e) => {
    this.setState({
      showdouments: true,
      showimages: false,
    });
  };

  componentDidMount() {
    var _this = this;
    if (localStorage.getItem("user_token") !== null) {
      LocalStorage.getItem("user_management").then((user) => {
        _this.setState(
          {
            user: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            loader: false,
          },
          () => {
            _this.getdata();
            _this.getcount();
          }
        );
      });
    } else {
      _this.props.history.push("/");
    }
  }

  getcount() {
    this.setState({ loader: true });
    let payload = {
      id: this.state.user,
    };
    Api.getcountdata(payload)
      .then((res) => {
        if (res) {
          if (res.data) {
            this.setState({
              loader: false,
              data: res.data,
              imagesget: res.data && res.data.image_count,
              documentsget: res.data && res.data.document_count,
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
  getdata() {
    this.setState({ loader: true });
    let payload = {
      id: this.state.user,
    };
    Api.getdata(payload)
      .then((res) => {
        if (res) {
          if (res.data) {
            this.setState({
              loader: false,
              data: res.data,
              userinfo: res.data.user_info,
              imagesAdd: res.data && res.data.images,
              documentsAdd: res.data && res.data.documents,
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
      });
  }

  //.jpeg
  //.jpg
  //.png
  fileSelectedHandler = (e) => {
    //5000000
    //1000000
    const { files } = this.state;
    for (let i = 0; i < e.target.files.length; i++) {
      let type = e.target.files[i].type;
      //console.log("size type",e.target.files[i].size)
      let size = (e.target.files[i].size / 1000000).toFixed(1);
      //console.log("size",size)
      if (size <= 5) {
        if (type === "image/jpeg" || type === "image/png" || type === "image/jpg") {
          let file = e.target.files[i];
          let obj = {
            name: e.target.files[i].name,
            size: e.target.files[i].size,
            lastModified: e.target.files[i].lastModified,
            type: e.target.files[i].type,
            file: e.target.files[i],
            url: URL.createObjectURL(e.target.files[i]),
          };
          files.push(obj);
          this.setState({
            errormessage: false,
          });
        } else {
          toast.error("Accepted Files are jpeg,png,jpg");
          this.setState({
            loader: false,
            files: [],
            errormessage: false,
          });
        }
      } else {
        toast.error("Please Select File up to 5 MB");
        this.setState({
          files: [],
          errormessage: true,
        });
      }
    }
    this.setState({ files });
  };

  deleteSelectedImage(name) {
    let copy = Object.assign([], this.state.files);
    let found = false;
    this.state.files.map((user, index) => {
      if (found) {
        if (index !== this.state.files.length - 1) {
          this.refs["testfile" + (index - 1)].files = this.refs["testfile" + index].files;
        } else {
          found = false;
          this.refs["testfile" + (index - 1)].files = this.refs["testfile" + index].files;
          this.setState({ files: copy });
        }
      } else {
        if (user.name == name) {
          copy.splice(index, 1);
          if (copy.length == 0) {
            this.setState({ files: [] }, () => {});
          } else if (index === this.state.files.length - 1) {
            this.setState({ files: copy });
          } else {
            found = true;
          }
        }
      }
    });
  }

  UploadImage() {
    var count = 0;
    this.state.files.map((file) => {
      if (file && file.type.match("image.*")) {
        var file_name = file.name;
        let amazoneParam = Object.assign({}, AWS_CONFIG, {
          name: file_name,
          dirName: AWS_CONFIG.dirName + "/Images/" + this.state.user,
        });
        S3FileUpload.uploadFile(file.file, amazoneParam).then((data) => {
          count = count + 1;
          if (data.result.status === 204 && count === this.state.files.length) {
            this.setState({
              loader: false,
            });
            this.setState({ files: [] });
            toast.success("Uploaded Successfully");
            this.getcount();
          } else {
            this.setState({
              loader: true,
            });
          }
        });
      }
    });
  }

  // DOUCMENTS UPLOADED
  fileSelectedDocuments = (e) => {
    const { filesDocuments } = this.state;
    for (let i = 0; i < e.target.files.length; i++) {
      let type = e.target.files[i].type;
      let size = (e.target.files[i].size / 1000000).toFixed(1);
      if (size <= 5) {
        if (
          type === "application/pdf" ||
          type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          type === "application/rtf" ||
          type === "text/plain" ||
          type === "application/vnd.ms-excel"
        ) {
          let obj = {
            name: e.target.files[i].name,
            size: e.target.files[i].size,
            lastModified: e.target.files[i].lastModified,
            type: e.target.files[i].type,
            file: e.target.files[i],
            url: URL.createObjectURL(e.target.files[i]),
          };
          filesDocuments.push(obj);
          this.setState({
            errormessageofdocuments: false,
          });
        } else {
          toast.error("Accepted Files are docx,doc,xls,rtf,txt,pdf");
          this.setState({
            loader: false,
            filesDocuments: [],
            errormessageofdocuments: false,
          });
        }
      } else {
        toast.error("Please Select File up to 5MB");
        this.setState({
          filesDocuments: [],
          errormessageofdocuments: true,
        });
      }
    }
    this.setState({ filesDocuments });
  };

  uploaddocumentapi = () => {
    this.setState({ loader: true });
    if (this.addValidator.allValid()) {
      this.setState({ loader: true });
      const payload = {
        user_id: this.state.user,
        url: this.state.filesDocuments,
      };
      Api.uploadimagedocuemnst(payload)
        .then((response) => {
          if (response.status === 200) {
            this.UploadImageDocuments();
            this.addValidator.hideMessages();
            this.setState({
              errormessageofdocuments: false,
            });
          } else {
            this.setState({
              loader: false,
              errormessageofdocuments: false,
            });
          }
        })
        .catch((err) => {
          if (err.status === 400) {
            toast.error("Limit Has been exceeded");
            this.setState({
              loader: false,
              filesDocuments: [],
              errormessageofdocuments: false,
            });
            this.addValidator.hideMessages();
          } else if (err.status === 403) {
            toast.error("Please select subcription plan");
            this.setState({
              loader: false,
              filesDocuments: [],
              errormessageofdocuments: false,
            });
            this.props.history.push("/subscription");
            this.addValidator.hideMessages();
          }
        });
    } else {
      this.addValidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };

  UploadImageDocuments() {
    var count = 0;
    this.state.filesDocuments.map((file) => {
      if (file) {
        var file_name = file.name;
        let amazoneParam = Object.assign({}, AWS_CONFIG, {
          name: file_name,
          dirName: AWS_CONFIG.dirName + "/Documents/" + this.state.user,
        });
        S3FileUpload.uploadFile(file.file, amazoneParam).then((data) => {
          count = count + 1;
          if (data.result.status === 204 && count === this.state.filesDocuments.length) {
            this.setState({
              loader: false,
            });
            this.setState({ filesDocuments: [] });
            toast.success("Uploaded Successfully");
            this.getcount();
          } else {
            this.setState({
              loader: true,
            });
          }
        });
      }
    });
  }

  downloadMaterial(name) {
    window.open(name, "_blank");
  }

  uploadimageapi = () => {
    this.setState({ loader: true });
    if (this.validator.allValid()) {
      this.setState({ loader: true });
      const payload = {
        user_id: this.state.user,
        url: this.state.files,
      };
      Api.uploadimage(payload)
        .then((response) => {
          if (response.status === 200) {
            this.UploadImage();
            this.validator.hideMessages();
            this.setState({
              errormessage: false,
            });
          } else {
            this.setState({
              loader: false,
              errormessage: false,
            });
          }
        })
        .catch((err) => {
          if (err.status === 400) {
            toast.error("Limit Has been exceeded");
            this.setState({
              loader: false,
              files: [],
              errormessage: false,
            });
            this.validator.hideMessages();
          } else if (err.status === 403) {
            toast.error("Please select subcription plan");
            this.setState({
              loader: false,
              files: [],
              errormessage: false,
            });
            this.props.history.push("/subscription");
            this.validator.hideMessages();
          }
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  };

  deleteSelectedDoumentes(name) {
    let copy = Object.assign([], this.state.filesDocuments);
    let found = false;
    this.state.filesDocuments.map((user, index) => {
      if (found) {
        if (index !== this.state.filesDocuments.length - 1) {
          this.refs["deletetestfile" + (index - 1)].files = this.refs["deletetestfile" + index].files;
        } else {
          found = false;
          this.refs["deletetestfile" + (index - 1)].files = this.refs["deletetestfile" + index].files;
          this.setState({ filesDocuments: copy });
        }
      } else {
        if (user.name == name) {
          copy.splice(index, 1);
          if (copy.length == 0) {
            this.setState({ filesDocuments: [] });
          } else if (index === this.state.filesDocuments.length - 1) {
            this.setState({ filesDocuments: copy });
          } else {
            found = true;
          }
        }
      }
    });
  }

  render() {
    return (
      <div className="dashboard-main">
        {localStorage.getItem("user_token") !== null ? (
          //with token
          <div>
            <div data-spy="scroll" data-target=".navbar">
              <div>
                <div>
                  <Headerafterlogin />
                </div>
                <div className="row m-0 border-styling">
                  <div className="welcome-name">
                    Welcome {this.state.first_name} {this.state.last_name}
                  </div>
                </div>
                {this.state.loader ? <Loader /> : null}
                <div style={this.state.loader ? { opacity: "0.4" } : null}>
                  <div className="container images-container">
                    <div className="row">
                      <div className="col-6 content-reposn">
                        <Link
                          to={{
                            pathname: "/images",
                            state: {
                              pages: "images",
                            },
                          }}
                        >
                          <div class="card cards-borders">
                            <div class="card-body">
                              <div className="row align-items-center justify-content-center">
                                <div className="col-auto">
                                  <img alt="" src={gallery} className="gallery"></img>
                                </div>
                                <div className="col text-right">
                                  <div className="numbers-icon">
                                    {this.state.imagesget && this.state.imagesget ? this.state.imagesget : 0}
                                  </div>
                                  <div className="text-c-blue mb-0">
                                    <span className="text-muted">Total Images</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-6 content-reposnes">
                        <Link
                          to={{
                            pathname: "/images",
                            state: {
                              pages: "documents",
                            },
                          }}
                        >
                          <div class="card cards-borders">
                            <div class="card-body">
                              <div className="row align-items-center justify-content-center">
                                <div className="col-auto">
                                  <img alt="" src={documents} className="gallery"></img>
                                </div>
                                <div className="col text-right">
                                  <div className="numbers-icon">
                                    {this.state.documentsget && this.state.documentsget ? this.state.documentsget : 0}
                                  </div>
                                  <div className="text-c-blue mb-0">
                                    <span className="text-muted">Total Documents</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="container images-container">
                    <div className="row">
                      <div className="col-12">
                        <div class="card cards-borders">
                          <div class="card-body">
                            <div>
                              <div className="card-body">
                                <div className="row">
                                  <div className="card-types">
                                    <div className="row align-items-center justify-content-center">
                                      <div className="col-auto">
                                        <div className="tags-house">Type Of House</div>
                                        <div className="text-c-blue mt-1">
                                          <span className="text-single">
                                            {this.state.userinfo && this.state.userinfo.house_type
                                              ? this.state.userinfo.house_type
                                              : "-"}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col text-right">
                                        <img alt="" src={house} className="house"></img>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card-types respo-card">
                                    <div className="row align-items-center justify-content-center">
                                      <div className="col-auto">
                                        <div className="tags-house">Construction</div>
                                        <div className="text-c-blue mt-1">
                                          <span className="text-single">
                                            {this.state.userinfo && this.state.userinfo.construction_type
                                              ? this.state.userinfo.construction_type
                                              : "-"}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col text-right">
                                        <img alt="" src={constuction} className="house"></img>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card-types respo-card">
                                    <div className="row align-items-center justify-content-center">
                                      <div className="col-auto">
                                        <div className="tags-house">With Basement</div>
                                        <div className="text-c-blue mt-1">
                                          <span className="text-single">
                                            {this.state.userinfo && this.state.userinfo.with_basement
                                              ? this.state.userinfo.with_basement
                                              : "-"}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col text-right">
                                        <img alt="" src={basement} className="house"></img>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card-typesss respo-card">
                                    <div className="row align-items-center justify-content-center">
                                      <div className="col-auto">
                                        <div className="tags-house">Number Of Occupants</div>
                                        <div className="text-c-blue mt-1">
                                          <span className="text-single">
                                            {this.state.userinfo && this.state.userinfo.number_of_occupants
                                              ? this.state.userinfo.number_of_occupants
                                              : "-"}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col text-right">
                                        <img alt="" src={numberroof} className="house"></img>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row mt-20">
                                  <div className="card-types">
                                    <div className="row align-items-center justify-content-center">
                                      <div className="col-auto">
                                        <div className="tags-house">Number Of Pets</div>
                                        <div className="text-c-blue mt-1">
                                          <span className="text-single">
                                            {this.state.userinfo && this.state.userinfo.number_of_pets
                                              ? this.state.userinfo.number_of_pets
                                              : "-"}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col text-right">
                                        <img alt="" src={pets} className="house"></img>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card-types respo-card">
                                    <div className="row align-items-center justify-content-center">
                                      <div className="col-auto">
                                        <div className="tags-house">Anyone Handicapped</div>
                                        <div className="text-c-blue mt-1">
                                          <span className="text-single">
                                            {this.state.userinfo && this.state.userinfo.anyone_handicapped
                                              ? this.state.userinfo.anyone_handicapped
                                              : "-"}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col text-right">
                                        <img alt="" src={handicap} className="house"></img>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card-types respo-card">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <div className="tags-house">First Responder Access</div>
                                        <div className="text-c-blue mt-1">
                                          <span className="text-single">
                                            {this.state.userinfo && this.state.userinfo.share_info_with
                                              ? this.state.userinfo.share_info_with
                                              : "-"}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col text-right">
                                        <img alt="" src={onestory} className="house"></img>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card-typesss respo-card">
                                    <div className="row align-items-center justify-content-center">
                                      <div className="col-auto">
                                        <div className="tags-house">Number Of Bedrooms</div>
                                        <div className="text-c-blue mt-1">
                                          <span className="text-single">
                                            {this.state.userinfo && this.state.userinfo.number_of_bedroom
                                              ? this.state.userinfo.number_of_bedroom
                                              : "-"}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col text-right">
                                        <img alt="" src={bedrooom} className="house"></img>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row justify-content-center mt-20">
                                  <div className="card-typesss respo-card">
                                    <div className="row align-items-center justify-content-center">
                                      <div className="col-auto">
                                        <div className="tags-house">Square Footage</div>
                                        <div className="text-c-blue mt-1">
                                          <span className="text-single">
                                            {this.state.userinfo && this.state.userinfo.square_footage
                                              ? this.state.userinfo.square_footage
                                              : "-"}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col text-right">
                                        <img alt="" src={basement} className="house"></img>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* images section and documents*/}
                  <div className="container images-container">
                    <div className="row mb-27">
                      <div className="col-12">
                        <div class="card cards-borders">
                          <div class="card-body">
                            <div>
                              <div className="card-body">
                                <div className="row">
                                  <div>
                                    <Button
                                      className={
                                        this.state.showimages === true
                                          ? "button-images-images button-images-doc"
                                          : "button-images-images"
                                      }
                                      onClick={this.showimagesmodal}
                                    >
                                      Images
                                    </Button>
                                  </div>
                                  <div>
                                    <Button
                                      className={
                                        this.state.showimages === false ? "documents button-images-doc" : "documents"
                                      }
                                      onClick={this.showdoumentsmodal}
                                    >
                                      Documents
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className="row m-0 please-upload">
                                Note: Please Upload Image/Document of size max up to 5mb
                              </div>
                            </div>
                          </div>

                          <div class="card-body mt-47">
                            <div>
                              <div className="card-body">
                                {this.state.showimages === false ? (
                                  <div>
                                    <div className="row">
                                      <div className="document-files col-md-12 float-right box-imnages">
                                        <input
                                          accept=".doc,.docx,.pdf,.txt,.rtf,.xlsx,.xls"
                                          id="selectFileDelete"
                                          type="file"
                                          key={this.state.deletekey}
                                          multiple
                                          onChange={this.fileSelectedDocuments}
                                        />
                                        <div style={{ textAlign: "center" }}>Or Drag It Here</div>
                                      </div>
                                    </div>

                                    <div>
                                      {this.state.errormessageofdocuments === true ? (
                                        <div style={{ color: "red" }}>
                                          Warning : Please Select File of size up to 5mb
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="row m-0">
                                      {this.addValidator.message("Documents", this.state.filesDocuments, "required")}
                                    </div>

                                    <div className="row">
                                      {this.state.filesDocuments && this.state.filesDocuments.length > 0
                                        ? this.state.filesDocuments.map((documents, i) => (
                                            <div className="docume-res" style={{ marginTop: "16px" }}>
                                              {documents.type === "application/pdf" ? (
                                                <div className="card-design-dash">
                                                  <div className="row mr-1 document-dashh">
                                                    <div
                                                      ref={"deletetestfile" + i}
                                                      name="urldelete"
                                                      key={this.state.deletekey}
                                                      onClick={this.deleteSelectedDoumentes.bind(this, documents.name)}
                                                    >
                                                      &times;
                                                    </div>
                                                  </div>

                                                  <div className="col-auto">
                                                    <div className="tags-house"></div>
                                                    <div className="text-c-blue mt-1">
                                                      <span className="text-single">
                                                        <img
                                                          alt=""
                                                          src={PDF}
                                                          style={{ height: "42px", marginRight: "8px" }}
                                                        />
                                                        {documents.name}
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                ""
                                              )}

                                              {documents.type ===
                                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                              documents.type === "application/doc" ? (
                                                <div className="card-design-dash">
                                                  <div className="row mr-1 document-dashh">
                                                    <div
                                                      ref={"deletetestfile" + i}
                                                      name="urldelete"
                                                      key={this.state.deletekey}
                                                      onClick={this.deleteSelectedDoumentes.bind(this, documents.name)}
                                                    >
                                                      &times;
                                                    </div>
                                                  </div>
                                                  <div className="col-auto">
                                                    <div className="tags-house"></div>
                                                    <div className="text-c-blue mt-1">
                                                      <span className="text-single">
                                                        <img
                                                          alt=""
                                                          src={WORD}
                                                          style={{ height: "42px", marginRight: "8px" }}
                                                        />
                                                        {documents.name}
                                                      </span>
                                                    </div>
                                                  </div>
                                                  {/* <div className="col text-right">
                                                                                                        <Button style={{ float: 'right' }}
                                                                                                            ref={"deletetestfile" + i} name="urldelete"
                                                                                                            key={this.state.deletekey}
                                                                                                            onClick={this.deleteSelectedDoumentes.bind(this, documents.name)}>
                                                                                                            X
                                                                                                       </Button>
                                                                                                    </div> */}
                                                </div>
                                              ) : (
                                                ""
                                              )}

                                              {documents.type ===
                                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                              documents.type === "application/vnd.ms-excel" ? (
                                                <div className="card-design-dash">
                                                  <div className="row mr-1 document-dashh">
                                                    <div
                                                      ref={"deletetestfile" + i}
                                                      name="urldelete"
                                                      key={this.state.deletekey}
                                                      onClick={this.deleteSelectedDoumentes.bind(this, documents.name)}
                                                    >
                                                      &times;
                                                    </div>
                                                  </div>
                                                  <div className="col-auto">
                                                    <div className="tags-house"></div>
                                                    <div className="text-c-blue mt-1">
                                                      <span className="text-single">
                                                        <img
                                                          alt=""
                                                          src={XCEL}
                                                          style={{ height: "42px", marginRight: "8px" }}
                                                        />{" "}
                                                        {documents.name}
                                                      </span>
                                                    </div>
                                                  </div>
                                                  {/* <div className="col text-right">
                                                                                                        <Button style={{ float: 'right' }}
                                                                                                            ref={"deletetestfile" + i} name="urldelete"
                                                                                                            key={this.state.deletekey}
                                                                                                            onClick={this.deleteSelectedDoumentes.bind(this, documents.name)}>
                                                                                                            &times;
                                                                                                       </Button>
                                                                                                    </div> */}
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                              {documents.type === "application/rtf" ? (
                                                <div className="card-design-dash">
                                                  <div className="row mr-1 document-dashh">
                                                    <div
                                                      ref={"deletetestfile" + i}
                                                      name="urldelete"
                                                      key={this.state.deletekey}
                                                      onClick={this.deleteSelectedDoumentes.bind(this, documents.name)}
                                                    >
                                                      &times;
                                                    </div>
                                                  </div>
                                                  <div className="col-auto">
                                                    <div className="tags-house"></div>
                                                    <div className="text-c-blue mt-1">
                                                      <span className="text-single">
                                                        <img
                                                          alt=""
                                                          src={RTF}
                                                          style={{ height: "42px", marginRight: "8px" }}
                                                        />{" "}
                                                        {documents.name}
                                                      </span>
                                                    </div>
                                                  </div>
                                                  {/* <div className="col text-right">
                                                                                                        <Button style={{ float: 'right' }}
                                                                                                            ref={"deletetestfile" + i} name="urldelete"
                                                                                                            key={this.state.deletekey}
                                                                                                            onClick={this.deleteSelectedDoumentes.bind(this, documents.name)}>
                                                                                                            X
                                                                                                       </Button>
                                                                                                    </div> */}
                                                </div>
                                              ) : (
                                                ""
                                              )}

                                              {documents.type === "text/plain" ? (
                                                <div className="card-design-dash">
                                                  <div className="row mr-1 document-dashh">
                                                    <div
                                                      ref={"deletetestfile" + i}
                                                      name="urldelete"
                                                      key={this.state.deletekey}
                                                      onClick={this.deleteSelectedDoumentes.bind(this, documents.name)}
                                                    >
                                                      &times;
                                                    </div>
                                                  </div>
                                                  <div className="col-auto">
                                                    <div className="tags-house"></div>
                                                    <div className="text-c-blue mt-1">
                                                      <span className="text-single">
                                                        <img
                                                          alt=""
                                                          src={TEXT}
                                                          style={{ height: "42px", marginRight: "8px" }}
                                                        />{" "}
                                                        {documents.name}
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                ""
                                              )}

                                              {/* 
                                                                                    {
                                                                                        documents.type === "text/plain" ?
                                                                                            <div className="card-design-dash">
                                                                                                <div className="row mr-1 document-dashh">
                                                                                                    <div
                                                                                                        ref={"deletetestfile" + i} name="urldelete"
                                                                                                        key={this.state.deletekey}
                                                                                                        onClick={this.deleteSelectedDoumentes.bind(this, documents.name)}>
                                                                                                        &times;
                                                                                                       </div>
                                                                                                    <div className="col-auto">
                                                                                                        <div className="tags-house"></div>
                                                                                                        <div className="text-c-blue mt-1">
                                                                                                            <span className="text-single">
                                                                                                                <img src={txtplain} style={{ height: '42px' ,marginRight: '8px' }} /> {documents.name}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                </div>
                                                                                            </div>
                                                                                            : ""
                                                                                    } */}
                                            </div>
                                          ))
                                        : ""}
                                    </div>

                                    <div style={{ marginTop: "36px" }}>
                                      <Button onClick={this.uploaddocumentapi} className="button-images-doc">
                                        Upload
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="row">
                                      <div className="document-files col-md-12 float-right box-imnages">
                                        <input
                                          accept="image/png,image/jpeg,image/jpg"
                                          id="selectFile"
                                          type="file"
                                          key={this.state.inputKey}
                                          multiple
                                          onChange={this.fileSelectedHandler}
                                        />
                                        <div style={{ textAlign: "center" }}>Or Drag It Here</div>
                                      </div>

                                      <div>
                                        {this.state.errormessage === true ? (
                                          <div style={{ color: "red" }}>
                                            Warning : Please Select File of size up to 5mb
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <div className="row m-0">
                                        {this.validator.message("File", this.state.files, "required")}
                                      </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                      {this.state.files && this.state.files.length > 0
                                        ? this.state.files.map((image, i) => (
                                            <div class="img-wrap d-flex" style={{ marginRight: "10px" }}>
                                              <span
                                                class="close"
                                                ref={"testfile" + i}
                                                name="url"
                                                key={this.state.inputKey}
                                                onClick={this.deleteSelectedImage.bind(this, image.name)}
                                              >
                                                &times;
                                              </span>
                                              <img alt="" src={image.url} className="first-images" />
                                            </div>
                                          ))
                                        : ""}
                                    </div>

                                    <div style={{ marginTop: "36px" }}>
                                      <Button onClick={this.uploadimageapi} className="button-images-doc">
                                        Upload
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
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
export default withRouter(Dashboard);
