import React from 'react';
import Signin from './SignIn';

const SigninMain = () => {
  return (
    <div style={{ 
      backgroundColor: '#171b2d', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      margin: 0
    }}>
      <Signin />
    </div>
  );
};

export default SigninMain;
