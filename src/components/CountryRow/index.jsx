import React from 'react';
import './styles.scss';
import { highlight } from './highlight';
import Flag from 'react-flags';

export const CountryRow = ({ option, isSelected, setOption, onMousEnter, value, valueKey }) => {
  const selected = isSelected ? 'selected' : '';
  let word = option.name;
  if (value) {
    word = highlight(word, value, 'highlight');
  }
  return (
    <div
      onClick={() => setOption(option)}
      onMouseEnter={onMousEnter}
      className={`CountryRow ${selected}`}
    >
      <Flag
        basePath="img/flags"
        name={option.code}
        pngSize={24}
        format="png"
        shiny={true}
        alt="Canada Flag"
      />
      {word}
    </div>
  );
};
