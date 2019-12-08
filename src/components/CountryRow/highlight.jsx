import React from 'react';

export const highlight = (word, value, className) => {
  const index = word.indexOf(value);
  if (index > -1) {
    const mW = word.slice(index, index + value.length);
    const sW = word.slice(0, index);
    const eW = word.slice(index + value.length);
    word = (
      <>
        {sW}
        <span className={className}>{mW}</span>
        {eW}
      </>
    );
    return word;
  }
};
