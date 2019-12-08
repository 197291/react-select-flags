import React, { useCallback, useState, useMemo, useRef } from 'react';

import { CountryRow } from '../CountryRow';
import { CountriesList } from '../CountriesList';

import './styles.scss';
import { getOptionBySelectIndex, getCountVisibleTitles } from './utils';

const ROW_HEIGHT = 50;
const TITLE_HEIGHT = 30;
const PADDING_TOP_LIST = 10;
const BUFFER_HEIGHT = 20;

export const Select = ({
  value,
  itemsName,
  valueKey,
  options,
  handleOnChange,
  isOpen,
  setOption,
  list,
  toggleMenu
}) => {
  const [selected, setSelected] = useState(-1);
  let tip = '';
  const listRef = useRef(null);

  const listLength = useMemo(() => {
    let len = 0;
    options.forEach((option) => (len += option[itemsName].length));
    return len;
  }, [itemsName, options]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'ArrowDown') {
        const fullHeight = listRef.current.scrollTop + listRef.current.offsetHeight;
        if (selected >= listLength - 1) {
          listRef.current.scrollTop = 0;
          return setSelected(0);
        }
        const countTitlesIsVisible = getCountVisibleTitles(options, selected, itemsName);

        const heightToSelectedRow = (selected + 1) * ROW_HEIGHT;
        const diff =
          fullHeight -
          (heightToSelectedRow + countTitlesIsVisible * TITLE_HEIGHT) -
          BUFFER_HEIGHT -
          PADDING_TOP_LIST;
        if (diff <= ROW_HEIGHT) {
          listRef.current.scrollTop += ROW_HEIGHT + 10;
        }
        return setSelected(selected + 1);
      }
      if (e.key === 'ArrowUp' && selected > -1) {
        if (selected <= 0) {
          return setSelected(listLength - 1);
        }
        const heightToSelectedRow = (selected - 1) * ROW_HEIGHT;
        if (heightToSelectedRow <= listRef.current.scrollTop) {
          listRef.current.scrollTop -= ROW_HEIGHT;
        }
        return setSelected(selected - 1);
      }
      if ((e.key === 'ArrowRight' || e.key === 'Enter') && value) {
        if (selected > -1) {
          const item = getOptionBySelectIndex(options, selected, itemsName);
          if (item) {
            setOption(item);
          }
        } else {
          const item = list.find((item) => item[valueKey].trim().startsWith(tip));
          if (item && tip) {
            setOption(item);
          }
        }
      }
    },

    [selected, value, listLength, options, itemsName, setOption, list, tip, valueKey]
  );

  if (options && value) {
    options.some((category) => {
      const item = category[itemsName].find((_item) => _item[valueKey].trim().startsWith(value));
      if (item) {
        tip = item[valueKey];
        return true;
      }
      return false;
    });
  }

  return (
    <div className="select-container">
      <div className="input-wrapper">
        <input
          type="text"
          onKeyUp={handleKeyPress}
          onChange={(e) => {
            if (!e.target.value) {
              setSelected(-1);
            }
            handleOnChange(e.target.value);
          }}
          value={value}
          placeholder="Type country"
          className="select-input"
          onFocus={() => toggleMenu(true)}
        />
        <input type="text" className="placeholder" value={tip} disabled />

        {value && (
          <span
            className="close"
            onClick={() => {
              setSelected(-1);
              setOption(null);
            }}
          >
            x
          </span>
        )}
      </div>
      {value && isOpen && (
        <CountriesList list={options}>
          {(list) => {
            let lastLength = 0;
            return (
              <div className="wrap-select-list" onMouseLeave={() => setSelected(-1)}>
                <div className="square" />
                <div ref={listRef} className="select-list">
                  {list.map((category, i) => {
                    lastLength += i > 0 ? list[i - 1][itemsName].length : 0;
                    return (
                      <div key={category.id}>
                        <div className="region">{category[valueKey]}</div>
                        {category.countries.map((item, j) => {
                          return (
                            <CountryRow
                              key={j + item[valueKey]}
                              value={value}
                              onMousEnter={(function(lastLength) {
                                const index = i > 0 ? lastLength + j : j;
                                return () => setSelected(index);
                              })(lastLength)}
                              isSelected={selected === lastLength + j}
                              option={item}
                              setOption={setOption}
                              valueKey={valueKey}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }}
        </CountriesList>
      )}
    </div>
  );
};
