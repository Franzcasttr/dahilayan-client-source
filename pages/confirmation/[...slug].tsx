import { useRouter } from 'next/router';
import React from 'react';

const Confirm = () => {
  const { query } = useRouter();
  console.log(query);
  return <div>Confirm</div>;
};

export default Confirm;
