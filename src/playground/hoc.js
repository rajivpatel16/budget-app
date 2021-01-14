// Higher order component (HOC) - A component that render the another component.
// These are advantage of the HOC component.
// 1. reuse of the code.
// 2. Render hijacking.
// 3. Prop manipulation.
// 4. Abstract state.

import React from 'react';

const info = (props) => {
<div> 
<h1>Info</h1>
<p>the info is : {props.info}</p>
</div>
}

const withAdminwarning = (WrappedComponent) => {
 return (props) => {
    <div>
    <h1>info</h1>
    {props.isAdmin && <p>this is private info. Please don't share!</p> }
    <WrappedComponent  {...props} />
    </div>
 }
}

const requireAuthentication = (WrappedComponent) => {
  return (props) => {
    <div>
    <h1>info</h1>
    {!props.isAuthenticated && <p>Please login to view  the info</p> }
    <WrappedComponent  {...props} />
    </div>
  }
}

const AdminInfo = withAdminwarning(info);
const AuthInfo = requireAuthentication(info);