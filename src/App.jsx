import React, { useState, useCallback, useMemo } from 'react';
import { useGetCountries } from './hooks/useGetCountries';
import { useGetRegions } from './hooks/useGetRegions';
import { getListOptions } from './helpers/getListOptions';

import { Select } from './components/Select';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [optionValue, setOption] = useState(null);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const countries = useGetCountries(inputValue);
  const regions = useGetRegions();

  let optionList = useMemo(() => getListOptions(regions, countries), [countries, regions]);
  let list = useMemo(() => {
    if (countries) {
      return countries.filter((country) => country.name.includes(inputValue));
    }
  }, [countries, inputValue]);

  if (optionList) {
    optionList = optionList.filter((category) => {
      category.countries =
        category.countries &&
        category.countries.filter((country) => country.name.includes(inputValue));
      return category.countries && category.countries.length;
    });
  }

  const handlerSetOption = useCallback(
    (option) => {
      setOption(option);
      setInputValue(option ? option.name : '');
      setOpenMenu(false);
      if (option) {
        sessionStorage.setItem('regionCode', option.code);
      } else {
        sessionStorage.removeItem('regionCode');
      }
    },
    [setOpenMenu, setOption]
  );

  const handlerOnChange = useCallback(
    (val) => {
      setInputValue(val);
      if (val && !isOpenMenu) {
        setOpenMenu(true);
      }
    },
    [isOpenMenu]
  );

  return (
    <Select
      optionValue={optionValue}
      setOption={handlerSetOption}
      value={inputValue}
      options={optionList}
      handleOnChange={handlerOnChange}
      isOpen={isOpenMenu}
      list={list}
      toggleMenu={setOpenMenu}
      valueKey="name"
      itemsName="countries"
    />
  );
};
