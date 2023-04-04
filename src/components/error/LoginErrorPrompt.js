import React from 'react';

const LoginErrorPrompt = ({ error }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
};

export default LoginErrorPrompt;