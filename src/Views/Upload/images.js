import React, { Component } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import Api from "../../Api/ApiUtils";
import { PDF,WORD ,XCEL,RTF , TEXT , edit,trash, eye} from '../../Views/s3Links';
import { withRouter, Redirect } from "react-router-dom";
import Loader from '../../Views/Loader/Loader';
import LocalStorage from "../../Api/LocalStorage";
import { Button, Modal,Popover } from "antd";

import Headerafterlogin from "../Header/Headerafterlogin";
import ModalImage from "react-modal-image";

const editt = (
    <div>
        <p>Edit</p>
    </div>
);

const heredoc = (
    <div>
        <p>Click Here</p>
    </div>
)


const eyes = (
    <div>
        <p>View</p>
    </div>
);


const delet = (
    <div>
        <p>Delete</p>
    </div>
);


class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editmodal: false,
            viewmodal: false,
            showimages: true,
            viewdocumentmodal: false,
            editdocumentmodal: false,
            deletemodaldocument: false,
            deletemodal: false,
            editid: "",
            edittitle: "",
            editdescription: "",
            editname: "",
            showdouments: false
        };
        this.addValidator = new SimpleReactValidator();
        this.imagesValidator = new SimpleReactValidator();
        this.DocumentValidator = new SimpleReactValidator();

    }

    componentDidMount() {
        if (this.props.location.state.pages === "images") {
            this.setState({
                showimages: true
            })
        }
        else if (this.props.location.state.pages == "documents") {
            this.setState({
                showimages: false
            }, () => { console.log("sttae", this.state.showimages) })
        }
        else {
            this.setState({
                showimages: true
            })
        }
        var _this = this;
        if (localStorage.getItem("user_token") !== null) {
            LocalStorage.getItem("user_management").then(user => {
                _this.setState({
                    user: user.id,
                    userinfo: user.is_info_added,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    loader: false
                }, () => { _this.getdata() })
            });
        }
        else {
            _this.props.history.push("/");
        }
    }


    setStateFromInputAdd(event) {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    getdata() {
        this.setState({ loader: true })
        let payload = {
            id: this.state.user
        }
        Api.getdata(payload)
            .then((res) => {
                if (res) {
                    if (res.data) {
                        this.setState({
                            loader: false,
                            data: res.data,
                            userinfo: res.data && res.data.user_info,
                            imagesAdd: res.data && res.data.images,
                            documentsAdd: res.data && res.data.documents
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
            });
    }

    /*-- Show modal Edit*/
    showModalEdit = (id, title, name, description) => {
        this.setState({
            editmodal: true,
            viewmodal: false,
            deletemodal: false,
            editid: id,
            edittitle: title,
            editname: name,
            editdescription: description
        });
    };

    /*-- Cancel modal Edit*/
    handleCanceleditmodal = e => {
        this.setState({
            editmodal: false,
        });
    };


    /*-- Show modal Edit document*/
    showModalEditDoucument = (id, name, title, description, type) => {
        this.setState({
            editdocumentmodal: true,
            viewdocumentmodal: false,
            deletedoucmentmodal: false,
            documenteditid: id,
            documenteditname: name,
            documentedittitle: title,
            documenteditdescription: description,
            documentedittype: type
        });
    };

    /*-- Cancel modal Edit*/
    handleCanceleditDocument = e => {
        this.setState({
            editdocumentmodal: false,
        });
    };


    showModalViewDocument = (id, name, title, description, type) => {
        this.setState({
            editdocumentmodal: false,
            viewdocumentmodal: true,
            deletedoucmentmodal: false,
            documentviewid: id,
            documentviewname: name,
            documentviewtitle: title,
            documentviewdescription: description,
            documentviewtype: type
        });
    };


    handleCancelviewDocument = e => {
        this.setState({
            viewdocumentmodal: false,
        });
    };




    showModalDeleteDocument = (id) => {
        this.setState({
            editdocumentmodal: false,
            viewdocumentmodal: false,
            deletemodaldocument: true,
            documentdeleteid: id
        });
    };


    handleCancelDeleteDocument = e => {
        this.setState({
            deletemodaldocument: false,
        });
    };


    /*-- Show modal View*/
    showModalView = (id, title, name, description) => {
        this.setState({
            editmodal: false,
            viewmodal: true,
            deletemodal: false,
            viewid: id,
            viewtitle: title,
            viewname: name,
            viewdescription: description
        });
    };

    /*-- Cancel modal View*/
    handleCancelviewmodal = e => {
        this.setState({
            viewmodal: false,
        });
    };

    /*-- Show modal Delete*/
    showModalDelete = (id) => {
        this.setState({
            editmodal: false,
            viewmodal: false,
            deletemodal: true,
            deleteid: id
        });
    };

    /*-- Cancel modal View*/
    handleCanceldeletemodal = e => {
        this.setState({
            deletemodal: false,
        });
    };


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


    deleteimages = () => {
        let payload = {
            id: this.state.deleteid
        }
        Api.deleteimages(payload)
            .then((res) => {
                if (res) {
                    toast.success("Deleted")
                    this.getdata();
                    this.setState({
                        loader: false,
                        deletemodal: false
                    });
                }
                else {
                    this.setState({ loader: false, deletemodal: false });
                }
            })
            .catch(function (err) {
                console.log("err", err)
                if (err) {
                }
                else {
                    toast.error("Some error occured")
                }
            });
    }


    editimagessave = () => {
        if (this.imagesValidator.allValid()) {
            this.setState({ loader: true })
            const payload = {
                title: this.state.edittitle,
                id: this.state.editid,
                description: this.state.editdescription,
            };
            Api.editimages(payload)
                .then((response) => {
                    if (response.data) {
                        this.setState({
                            loader: false,
                            editmodal: false,
                            edittitle: "",
                            editdescription: ""
                        })
                        this.getdata();
                        toast.success("Update Successfully")
                        this.imagesValidator.hideMessages();
                    }
                    else {
                    }
                })
                .catch(err => {
                })
        }
        else {
            this.imagesValidator.showMessages();
            this.forceUpdate();
            this.setState({ loader: false });
        }
    }



    documenteditsave = () => {
        if (this.DocumentValidator.allValid()) {
            this.setState({ loader: true })
            const payload = {
                title: this.state.documentedittitle,
                id: this.state.documenteditid,
                description: this.state.documenteditdescription,
            };
            Api.editdocuments(payload)
                .then((response) => {
                    if (response.data) {
                        this.setState({
                            loader: false,
                            editdocumentmodal: false
                        })
                        this.getdata();
                        toast.success("Update Successfully")
                        this.DocumentValidator.hideMessages();
                    }
                    else {
                    }
                })
                .catch(err => {
                })
        }
        else {
            this.DocumentValidator.showMessages();
            this.forceUpdate();
            this.setState({ loader: false });
        }
    }


    deletedoument = () => {
        let payload = {
            id: this.state.documentdeleteid
        }
        Api.deletedocument(payload)
            .then((res) => {
                if (res) {
                    toast.success("Deleted")
                    this.getdata();
                    this.setState({
                        loader: false,
                        deletemodaldocument: false
                    });
                }
                else {
                    this.setState({ loader: false, deletemodal: false });
                }
            })
            .catch(function (err) {
                console.log("err", err)
                if (err) {

                }
                else {
                    toast.error("Some error occured")
                }

            });
    }


    downloadMaterial(name) {
        window.open(
            name,
            '_blank'
        );
    }


    render() {
        return (
            <div>
                {localStorage.getItem('user_token') !== null ?
                    //with token
                    <div>
                        <div data-spy="scroll" data-target=".navbar">
                            <div>
                                <div>
                                    <Headerafterlogin />
                                </div>
                                <div className="row m-0 border-styling">
                                    <div className="welcome-name">
                                        Welcome {this.state.first_name}  {this.state.last_name}
                                    </div>
                                </div>


                                <div className="container images-containeradd">
                                    <div className="row ml-0">
                                        <div>
                                            <Button className={this.state.showimages === true ? "button-images-images button-images-doc" : "button-images-images"}
                                                onClick={this.showimagesmodal}>Images</Button>

                                        </div>
                                        <div>

                                            <Button className={this.state.showimages === false ? "documents button-images-doc" : "documents"} onClick={this.showdoumentsmodal}>Documents</Button>
                                        </div>
                                    </div>
                                </div>
                                {this.state.showimages === false ? <div>
                                    <div className="container images-containeradd">
                                        <div className="row">
                                            {this.state.documentsAdd && this.state.documentsAdd.length > 0 ?
                                                this.state.documentsAdd.map((document, i) =>

                                                    <div className="col-3 colresponsive lastrow-responsive ">
                                                        <div className="cards-images-imagess">
                                                            <div style={{ textAlign: 'center' }}>
                                                                {
                                                                    document.type === "application/pdf" ?
                                                                        <Popover content={heredoc}>
                                                                            <img alt="" src={PDF} className="images-uploades-doucments"
                                                                                onClick={this.downloadMaterial.bind(this, document.name)}
                                                                            />
                                                                        </Popover>
                                                                        : ""
                                                                }

                                                                {
                                                                    document.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || document.type === "application/doc" ?
                                                                        <Popover content={heredoc}>
                                                                            <img alt="" src={WORD} className="images-uploades-doucments"
                                                                                onClick={this.downloadMaterial.bind(this, document.name)}
                                                                            />
                                                                        </Popover>
                                                                        : ""
                                                                }

                                                                {
                                                                    document.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || document.type === "application/vnd.ms-excel" ?
                                                                        <Popover content={heredoc}>
                                                                            <img alt="" src={XCEL} className="images-uploades-doucments"
                                                                                onClick={this.downloadMaterial.bind(this, document.name)}
                                                                            />
                                                                        </Popover>
                                                                        : ""
                                                                }


                                                                {
                                                                    document.type === "application/rtf" ?
                                                                        <Popover content={heredoc}>
                                                                            <img alt="" src={RTF} className="images-uploades-doucments"
                                                                                onClick={this.downloadMaterial.bind(this, document.name)}
                                                                            />
                                                                        </Popover>
                                                                        : ""
                                                                }

                                                                {
                                                                    document.type === "text/plain" ?
                                                                        <Popover content={heredoc}>
                                                                            <img alt="" src={TEXT} className="images-uploades-doucments"
                                                                                onClick={this.downloadMaterial.bind(this, document.name)}
                                                                            />
                                                                        </Popover>
                                                                        : ""
                                                                }
                                                            </div>
                                                            <div>
                                                                <div className="bed-text">
                                                                    {document && document.title ? document.title : "-"}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-data">
                                                                    {document && document.description ? document.description : "-"}
                                                                </div>
                                                            </div>

                                                            <div className="row m-0">
                                                                <div className="col-6">

                                                                </div>
                                                                <div className="col-6 text-align-end">
                                                                    <div>
                                                                        <Popover content={editt}>
                                                                            <img alt="" src={edit} className="edit-icon mr-10" onClick={this.showModalEditDoucument.bind(this, document.id, document.name, document.title, document.description, document.type)}></img>
                                                                        </Popover>
                                                                        <Popover content={eyes}>
                                                                            <img alt="" src={eye} className="view-icon mr-10" onClick={this.showModalViewDocument.bind(this, document.id, document.name, document.title, document.description, document.type)}></img>
                                                                        </Popover>
                                                                        <Popover content={delet}>
                                                                            <img alt="" src={trash} className="trash-icon" onClick={this.showModalDeleteDocument.bind(this, document.id)}></img>
                                                                        </Popover>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : <div>
                                                    <div className="card-body">
                                                        <div className="text-name-medical">

                                                            <div style={{ textAlign: 'center' }}>
                                                                No Data Found
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>

                                    {/* edit modal*/}

                                    <Modal visible={this.state.editdocumentmodal}
                                        width={475}
                                        onCancel={this.handleCanceleditDocument} >
                                        {this.state.loader ? <Loader /> : null}
                                        <div style={this.state.loader ? { opacity: '0.4' } : null}>
                                            <div id="head-modal-documents">
                                                <div>
                                                    Edit Doucment
                                               </div>
                                            </div>
                                            <div id="modalheaderdoucment">
                                                {this.state.documentedittype === "application/pdf" ?
                                                    <div>
                                                        <img alt="" src={PDF} className="documents-iamgess" />
                                                    </div> : ""}


                                                {this.state.documentedittype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ?
                                                    <div>
                                                        <img alt="" src={WORD} className="documents-iamgess" />
                                                    </div> : ""}


                                                {this.state.documentedittype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ?
                                                    <div>
                                                        <img alt="" src={XCEL} className="documents-iamgess" />
                                                    </div> : ""}


                                                {this.state.documentedittype === "application/rtf" ?
                                                    <div>
                                                        <img alt="" src={RTF} className="documents-iamgess" />
                                                    </div> : ""}


                                                {this.state.documentedittype === "text/plain" ?
                                                    <div>
                                                        <img alt="" src={TEXT} className="documents-iamgess" />
                                                    </div> : ""}

                                            </div>
                                            <div className="row title-mode">
                                                <div className="titiles">
                                                    Title
                                              </div>
                                            </div>
                                            <div className="row mt-1">
                                                <input type="text" className="col-md-10 editmodal form-control mt-1"
                                                    placeholder="Enter title Here" name='documentedittitle' value={this.state.documentedittitle}
                                                    onChange={this.setStateFromInputAdd.bind(this)} />
                                                <div className="err-msg-set">
                                                    {this.DocumentValidator.message('Title', this.state.documentedittitle, 'required')}
                                                </div>
                                            </div>
                                            <div className="row desc-modal" >
                                                <div className="titiles">
                                                    Description
                                             </div>
                                            </div>
                                            <div className="row mt-1">

                                                <textarea placeholder="Enter Description Here"
                                                    name='documenteditdescription' value={this.state.documenteditdescription}
                                                    onChange={this.setStateFromInputAdd.bind(this)}

                                                    className="col-md-10 edit-name form-control mt-1">

                                                </textarea>
                                                <div className="err-msg-set">
                                                    {this.DocumentValidator.message('Description', this.state.documenteditdescription, 'required')}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <Button className="verfiy-button-edit" onClick={this.documenteditsave}>Save</Button>
                                            </div>
                                        </div>
                                    </Modal>



                                    {/* view modal*/}
                                    <Modal visible={this.state.viewdocumentmodal}
                                        width={475}
                                        onCancel={this.handleCancelviewDocument} >
                                        {this.state.loader ? <Loader /> : null}
                                        <div style={this.state.loader ? { opacity: '0.4' } : null}>
                                            <div id="head-modal">
                                                <div>
                                                    View Document
                                    </div>

                                            </div>
                                            <div id="modalheaderimagedoumm">


                                                {this.state.documentviewtype === "application/pdf" ?
                                                    <div>
                                                        <img alt="" src={PDF} className="documents-iamgess" />
                                                    </div> : ""}
                                                {this.state.documentviewtype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ?
                                                    <div>
                                                        <img alt="" src={WORD} className="documents-iamgess" />
                                                    </div> : ""}


                                                {this.state.documentviewtype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ?
                                                    <div>
                                                        <img alt="" src={XCEL} className="documents-iamgess" />
                                                    </div> : ""}


                                                {this.state.documentviewtype === "application/rtf" ?
                                                    <div>
                                                        <img alt="" src={RTF} className="documents-iamgess" />
                                                    </div> : ""}


                                                {this.state.documentviewtype === "text/plain" ?
                                                    <div>
                                                        <img alt="" src={TEXT} className="documents-iamgess" />
                                                    </div> : ""}


                                            </div>
                                            <div className="row title-mode">
                                                <div className="titiles">
                                                    Title:
                               </div>
                                                <div className="titiles viewtitle">
                                                    {this.state.documentviewtitle && this.state.documentviewtitle ? this.state.documentviewtitle : "-"}
                                                </div>
                                            </div>
                                            <div className="row desc-modal" >
                                                <div className="titiles">
                                                    Description:
                               </div>
                                                <div className="titiles viewtitle">
                                                    {this.state.documentviewdescription && this.state.documentviewdescription ? this.state.documentviewdescription : "-"}
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>

                                    {/* delete modal*/}
                                    <Modal visible={this.state.deletemodaldocument}
                                        width={370}
                                        onCancel={this.handleCancelDeleteDocument} >
                                        {this.state.loader ? <Loader /> : null}
                                        <div style={this.state.loader ? { opacity: '0.4' } : null}>
                                            <div id="head-modal">
                                                <div>
                                                    Are You Sure You Want to Delete?
                                    </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-6 aligntxt">
                                                    <Button className="verfiy-button-edit" onClick={this.deletedoument}>
                                                        Delete
                                </Button>
                                                </div>
                                                <div className="col-6">
                                                    <Button className="verfiy-button-edit" onClick={this.handleCancelDeleteDocument}>
                                                        Cancel
                                </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                                </div> :
                                    <div>
                                        {this.state.loader ? <Loader /> : null}
                                        <div style={this.state.loader ? { opacity: '0.4' } : null}>
                                            <div className="container images-containeradd">
                                                <div className="row">
                                                    {this.state.imagesAdd && this.state.imagesAdd.length > 0 ?
                                                        this.state.imagesAdd.map((image, i) =>

                                                            <div className="col-3 colresponsive lastrow-responsive ">
                                                                <div className="cards-images">
                                                                    <div>
                                                                        <img alt="" src={image.name} className="images-uploades">
                                                                        </img>
                                                                    </div>
                                                                    <div>
                                                                        <div className="bed-text">
                                                                            {image && image.title ? image.title : "-"}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-data">
                                                                            {image && image.description ? image.description : "-"}
                                                                        </div>
                                                                    </div>

                                                                    <div className="row m-0">
                                                                        <div className="col-6">

                                                                        </div>
                                                                        <div className="col-6 text-align-end">
                                                                            <div>
                                                                                <Popover content={editt}>
                                                                                    <img alt="" src={edit} className="edit-icon mr-10" onClick={this.showModalEdit.bind(this, image.id, image.title, image.name, image.description)}></img>

                                                                                </Popover>

                                                                                <Popover content={eyes}>
                                                                                    <img alt="" src={eye} className="view-icon mr-10"
                                                                                        onClick={this.showModalView.bind(this, image.id, image.title, image.name, image.description)}></img>
                                                                                </Popover>
                                                                                <Popover content={delet}>
                                                                                    <img alt="" src={trash} className="trash-icon" onClick={this.showModalDelete.bind(this, image.id)}></img>
                                                                                </Popover>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : <div>
                                                            <div className="card-body">
                                                                <div className="text-name-medical">

                                                                    <div style={{ textAlign: 'center' }}>
                                                                        No Data Found
                                                                </div>

                                                                </div>
                                                            </div>
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* edit modal*/}
                                        <Modal visible={this.state.editmodal}
                                            width={606}
                                            onCancel={this.handleCanceleditmodal} >
                                            {this.state.loader ? <Loader /> : null}
                                            <div style={this.state.loader ? { opacity: '0.4' } : null}>
                                                <div id="head-modal">
                                                    <div>
                                                        Edit Image
                                    </div>
                                                </div>
                                                <div id="modalheaderimage">
                                                    <img alt="" src={this.state.editname} className="modal-edit" />
                                                </div>
                                                <div className="row title-mode" >
                                                    <div className="titiles">

                                                        Title
                               </div>
                                                </div>
                                                <div className="row mt-1">
                                                    <input type="text" className="col-md-10 editmodal form-control mt-1 "
                                                        placeholder="Enter Title Here" name='edittitle' value={this.state.edittitle}
                                                        onChange={this.setStateFromInputAdd.bind(this)} />

                                                </div>
                                                <div className="err-msg-set">
                                                    {this.imagesValidator.message('Title', this.state.edittitle, 'required')}
                                                </div>
                                                <div className="row desc-modal" >
                                                    <div className="titiles">
                                                        Description
                               </div>
                                                </div>
                                                <div className="row mt-1">

                                                    <textarea
                                                        placeholder="Enter Description Here" name='editdescription' value={this.state.editdescription}
                                                        onChange={this.setStateFromInputAdd.bind(this)}
                                                        className="col-md-10 edit-name form-control mt-1">

                                                    </textarea>
                                                </div>
                                                <div className="err-msg-set">
                                                    {this.imagesValidator.message('Description', this.state.editdescription, 'required')}
                                                </div>
                                                <div className="row">
                                                    <Button className="verfiy-button-edit" onClick={this.editimagessave}>Save</Button>
                                                </div>
                                            </div>
                                        </Modal>



                                        {/* view modal*/}
                                        <Modal visible={this.state.viewmodal}
                                            width={606}
                                            onCancel={this.handleCancelviewmodal} >
                                            <div id="head-modal">
                                                <div>
                                                    View Image
                                    </div>

                                            </div>
                                            <div id="modalheaderimage">
                                                
                                                    <ModalImage
                                                        small={this.state.viewname}
                                                        large={this.state.viewname}
                                                       // alt="main"
                                                        className="modal-edit"
                                                    />
                                                    {/* <img alt="" src={this.state.viewname} className="modal-edit" /> */}
                                                    <div>
                                                        Click on the Image
                                                </div>
                                            </div>
                                            <div className="row title-mode">
                                                <div className="titiles">
                                                    Title:
                               </div>
                                                <div className="titiles viewtitle">
                                                    {this.state.viewtitle && this.state.viewtitle ? this.state.viewtitle : ""}
                                                </div>
                                            </div>
                                            <div className="row desc-modal" >
                                                <div className="titiles">
                                                    Description:
                               </div>
                                                <div className="titiles viewtitle">
                                                    {this.state.viewdescription && this.state.viewdescription ? this.state.viewdescription : ""}
                                                </div>
                                            </div>

                                        </Modal>

                                        {/* delete modal*/}
                                        <Modal visible={this.state.deletemodal}
                                            width={370}
                                            onCancel={this.handleCanceldeletemodal} >
                                            {this.state.loader ? <Loader /> : null}
                                            <div style={this.state.loader ? { opacity: '0.4' } : null}>
                                                <div id="head-modal">
                                                    <div>
                                                        Are You Sure You Want to Delete?
                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-6 aligntxt">
                                                        <Button className="verfiy-button-edit" onClick={this.deleteimages}>
                                                            Delete
                                                      </Button>
                                                    </div>
                                                    <div className="col-6">
                                                        <Button className="verfiy-button-edit" onClick={this.handleCanceldeletemodal}>
                                                            Cancel
                                                      </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                    </div>
                                }


                            </div>
                        </div>
                    </div> :
                    //without token
                    <div>
                        <Redirect to={{
                            pathname: "/"
                        }} />
                    </div>}

            </div >
        );
    }
}
export default withRouter(Image);
