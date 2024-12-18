import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Redirecting = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');

  useEffect(() => {
    if (url) {
      window.location.href = url;
    }
  }, [url]);

  return (
    <div>
      <h2>Redirecting to payment...</h2>
    </div>
  );
};

export default Redirecting;
