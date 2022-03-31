import axios from "axios";
import LocalStorage from "./LocalStorage";
//const API_URL = "http://jenkins.openxcell.info:6541/";
//const API_URL = "http://f17abe19c0ae.ngrok.io/";
const API_URL = "https://dev.my360protection.com/api/";
// const API_URL = "https://my360protection.com/api/";

// const API_URL ="http://localhost:6541/api/";

const ApiUtils = {
    // verfiy pin
    login: function (payload) {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        };
        return axios.post(API_URL + "user/verifyPin", payload, {
            headers: headers,
            
        })
            .then(response => {
                if (response && response.data) {
                    const responses = {
                        data: response.data,
                        status: response.status
                    }
                    return responses
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }

            });
    },





    //first responsder user address
    getUserAddress: async function (payload) {
        const headers = {
            "Content-Type": "application/json",
        };
        return axios.post(API_URL + "user/allUsers", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },

    //first responder form login
    submitForm: async function (payload) {
        const headers = {
            "Content-Type": "application/json",
        };
        return axios.post(API_URL + "user/submit", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },


    //signin 

    signin: async function (payload) {
        const headers = {
            "Content-Type": "application/json",
        };
        return axios.post(API_URL + "user/login", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },


   //singup
    signup: async function (payload) {
        const headers = {
            "Content-Type": "application/json"
        };
        return axios.post(API_URL + "user/register", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },

    //aading user information
    userinfo: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/addUserInfo", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    const responses = {
                        data: response.data,
                        status: response.status
                    }
                    return responses
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },


    // adding medical history
    addmedicalhistory: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/addMedicalHistory", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },

   //getting user data
    getdata: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/getUserInfo", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },

    //get count of images and documents
    getcountdata: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/getImagesAndDocumentCount", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },



     // getting daat os user logined in as first responder
    getdatafirstresponser: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("firstresponser_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/getUserInfo", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },


    //updating user infomartion
    userinfoedit: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/updateUserInfo", payload, {
            headers: headers
        })
            .then(response => {
                const responses = {
                    data: response.data,
                    status: response.status
                }
                return responses
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },


    //Get App content
    getAppContent: async function () {
        const headers = {
            "Content-Type": "application/json",
        };
        return axios.get(API_URL + "appcontent/all", {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },

   //fectching data of medical history
    getdatamedical: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/fetchMedicalHistory", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },

   // update medical history
    updatemedicalhistory: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/updateMedicalHistory", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },


    // delete medical history
    deletemedicalmodal: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/deleteMedicalHistory", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },

    //forgot password
    forgotpassword: async function (payload) {
        const headers = {
            "Content-Type": "application/json",
        };
        return axios.post(API_URL + "user/forgotPassword", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },

    //reset password
    resetPassword: async function (payload) {
        const headers = {
            "Content-Type": "application/json",
        };
        return axios.post(API_URL + "user/resetPassword", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },



  //uploading image
    uploadimage: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/uploadImage",payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    const responses = {
                        data: response.data,
                        status: response.status
                    }
                    return responses
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }

            });
    },

   //uploading documents
    uploadimagedocuemnst: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/uploadDocument",payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    const responses = {
                        data: response.data,
                        status: response.status
                    }
                    return responses
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }

            });
    },

   //contact us form
    conatctus: async function (payload) {
        const headers = {
            "Content-Type": "application/json",
        };
        return axios.post(API_URL + "user/contactUs", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },


    // cancel membership form
    cancelmembership: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/cancelMembership", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    const responses = {
                        data: response.data,
                        status: response.status
                    }
                    return responses
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }

            });
    },
   
    //delete images
    deleteimages: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/deleteImage", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },



    
   // delete documents
    deletedocument: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/deleteDocument", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },

   //edit images
    editimages: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/updateImage", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },


   // edit documents
    editdocuments: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/updateDocument", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },


    //checkUserstorage
    getbaiscplan: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "stripe/checkUserStorage", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },

    //stripeCustomer

    stripeCustomer: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "stripe/createCustomer", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },

   //stripe Subscription plan
    stripeSubscription: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "stripe/createSubscription", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },

    //fetching subdcription plan
    fetchSubcription: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "user/getAllSubscriptionPlan", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },

    
    support: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            //"api_key": TOKEN
        };
        return axios.post(API_URL + "user/contactSupport", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },


    getallPlanhome: async function () {
        let TOKEN;
        await LocalStorage.getItem("user_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            //"api_key": TOKEN
        };
        return axios.post(API_URL + "user/getAllSubscriptionPlan", {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },



    landingPageContent: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("assets_management")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            'Content-Type': 'application/json',
            //"api_key": TOKEN
        };
        return axios.post(API_URL + "admin/landingPageContent", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response.data
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },




}
export default ApiUtils;