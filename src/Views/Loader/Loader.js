// Remove this loader later
import Loader from 'react-loader-spinner'
import React from 'react';

export default class LoaderComponent extends React.Component {
   //other logic
   render() {
      return (
            <Loader
               type="TailSpin"
               color="#66b6e0"
               className="set-loader"
            />
      );
   }
}
