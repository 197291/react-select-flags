import { useEffect, useState } from 'react';

export const useGetCountries = (val) => {
  const [list, setList] = useState(null);
  useEffect(() => {
    if (val) {
      fetch(`https://edo-api.dev.happytravel.com/en/api/1/locations/countries?query=${val}`)
        .then((res) => res.json())
        .then((res) => {
          setList(res);
        });
    }
  }, [val]);
  return list;
};
