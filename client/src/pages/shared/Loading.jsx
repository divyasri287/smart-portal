import React from 'react';
import Loader from '../../components/loader/Loader';

export const Loading = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader text="Fetching government portal data..." />
    </div>
  );
};

export default Loading;
