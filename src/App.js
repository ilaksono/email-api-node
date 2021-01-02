import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmailView from './views/EmailView';
import Link from 'next/link';
const App = () => {

  return <div>
    <div>
      Send Ian Laksono an email.
      </div>
    <EmailView />
  </div>;

};
export default App;