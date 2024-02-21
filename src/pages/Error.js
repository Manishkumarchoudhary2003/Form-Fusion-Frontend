import React from 'react';

const ErrorPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url("https://www.cloudns.net/blog/wp-content/uploads/2023/10/Error-404-Page-Not-Found.png")`,
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
        width: '100%',
        height: '100vh',
      }}
    />
  );
};

export default ErrorPage;
