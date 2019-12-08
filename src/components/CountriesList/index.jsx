import React from 'react';

export const CountriesList = ({ children, list }) => {
  if (!list) {
    return <div>Loading...</div>;
  }
  if (list && list.length === 0) return <div>There is no suggestions. Type more.</div>;
  return children(list);
};
