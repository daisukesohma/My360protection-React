import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState } from "react";
import Api from "../../Api/ApiUtils";
import {Modal } from "antd";
import Loader from "../Loader/Loader";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

// const App=()=> {
//   let history = useHistory();
// }

const CARD_ELEMENT_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: 'black',
      color: 'black',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#black' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

  const CheckoutForm = (props) => {
  const stripe = useStripe();
  const { planme } = props;
  const elements = useElements();
  const [name, setName] = useState('Emmanuel');
  const [error, setError] = useState(null);
  const [payData, setpayData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [redirectionss,redirectio] = useState(false);
  //console.log("redirect",redirectionss)

  const handleSubmit = async (event) => {
    setLoading(true)
    
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (error) {
      setLoading(false)
      setError(error.message)
    } else {
      setError(false)
      setLoading(false)
      setpayData(paymentMethod && paymentMethod.id)
      stripeTokenHandler(paymentMethod && paymentMethod.id);
    }
  };

  const stripeTokenHandler = async (token) => {
    setLoading(true)
    const payload = {
      payment_method_id: token,
      user_id: localStorage.getItem("id"),
    };
    Api.stripeCustomer(payload)
      .then((response) => {
        getsubscription(token);
        if (response.data) {
        
        }
        else {
        }
      })
      .catch(err => {
      })
  }

  const getsubscription = async (token) => {
    setLoading(true)
    const payload = {
      user_id: localStorage.getItem("id"),
      plan_name: planme,
      payment_method_id: token
    };
    Api.stripeSubscription(payload)
      .then((response) => {
        setLoading(false)
        toast.success("Your Plan Has Subscribed")
        handleCancelforgotpassword()
        //history.push('/someRoute')
        if (response.data) {
    
        }
        else {
        }
      })
      .catch(err => {
      })
  }




  const handleChange = (event) => {
    if (event.error) setError(event.error.message);
    else setError(null);
  };

  const handleCancelforgotpassword = () => {
    setModalIsOpen(false)
    redirectio(true)
    window.location.reload()
  };

  return (
    
    <Modal visible={modalIsOpen}
      onCancel={handleCancelforgotpassword}
      width={500}
      height={539}>
        
       {loading  && <Loader></Loader>}

       {redirectionss ?  <Redirect to="/dashboard"></Redirect>:""}
      <form onSubmit={handleSubmit}>
      
        <div className="row m-0" style={{ marginTop: '30px' }}>
        <div className="cardetails">Card Details</div>
          <div className="col-12">
            <CardElement id="card-element"
              options={CARD_ELEMENT_OPTIONS}
              onChange={handleChange} />
          </div>
        </div>
        <div className="error-credit">
          {error}
        </div>
        <div className="row m-0">
          <div className="col-12" style={{textAlign:'center'}}>
          <button type="submit" className="Pay-button"
            disabled={!stripe} style={{ marginTop: '15px' }}>
            Pay
         </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default CheckoutForm