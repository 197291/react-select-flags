export const getListOptions = (regions, countries) => {
  const mapRegions = {};

  if (regions && countries) {
    Object.values(regions).forEach((region) => (mapRegions[region.id] = { ...region }));
    countries.forEach((country) => {
      const region = mapRegions[country.regionId];
      if (region.countries) {
        region.countries.push(country);
      } else {
        region.countries = [];
        region.countries.push(country);
      }
    });
  }

  return Object.values(mapRegions);
};
