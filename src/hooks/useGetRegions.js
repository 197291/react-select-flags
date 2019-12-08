import { useEffect, useState } from 'react';

export const useGetRegions = () => {
  const [list, setList] = useState(null);
  useEffect(() => {
    fetch('https://edo-api.dev.happytravel.com/en/api/1/locations/regions')
      .then((res) => res.json())
      .then((res) => {
        setList(res);
      });
  }, []);
  return list;
};
