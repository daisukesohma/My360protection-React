import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Views/Home/home';
import Dashboard from './Views/Dashboard/Dashboard';
import Image from './Views/Upload/images'
import userinfo from './Views/Userinformation/userinfo';
import information from './Views/Information/information';
import informationResponser from './Views/Information/information-responser';
import Terms from './Views/Terms/Terms';
import Privacy from './Views/Privacy/Privacy';
import ResetPassword from './Views/ResetPassword/ResetPassword';
import Subscription from './Views/Subscription/Subscription';
import wrongpage from './Views/404Page/404Page';
// import Trial from './Views/Dashboard/Trial';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        
        <Switch>
          <Route path="/" exact={true} title="Home" component={Home} />
          <Route path="/reset-password/:token" exact={true} title="Reset Password" component={ResetPassword} />      
          <Route path="/terms" exact={true} title="Terms" component={Terms} />
          <Route path="/privacy" exact={true} title="Terms" component={Privacy} />
          {/* <Route path="/stripe" title="Dahs" component={Dahbortril}/> */}
          {/* <Route path="/trial" title="Trial" component={Trial}/>
           */}
          <Route path="/subscription" title="Subscription Plan" component={Subscription}/>

          <Route path="/dashboard" exact={true} title="Login" component={Dashboard} />
          <Route path="/images" exact={true} title="Image" component={Image} />
          <Route path="/userinformation" exact={true} title="User" component={userinfo} />
          <Route path="/information" exact={true} title="Information" component={information} />
          <Route path="/information-responser" exact={true} title="Information Responser" component={informationResponser} />

          <Route  exact={true} title="404Page" component={wrongpage} />

        </Switch>
      </div>
    );
  }
}

export default App;


// import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import { ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import Dashboard from './Views/Dashboard/Dashboard';
// //Pages
// import InformationResponser from './Views/Information/information-responser';
// import Home from './Views/Home/home';
// const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// // Containers
// const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout/DefaultLayout'));






// class App extends Component {
//   render() {
//     return (
//       <div>
       
//         <Router basename={process.env.REACT_APP_ROUTE_FLAG}>
//           <React.Suspense fallback={loading()} >
//             <Switch>
//               <Route exact path="/login" name="Login Page" render={props => <Dashboard {...props} />} />
//               <Route exact path="/information-responser" name="Home" name="Information Responser" render={props => <InformationResponser {...props} />} />
//               <Route exact path="/" name="Home" name="Home Page" render={props => <Home {...props} />} />

//             </Switch>
//           </React.Suspense>
//           <ToastContainer />
//         </Router>
//       </div>
//     );
//   }
// }
// export default App;
