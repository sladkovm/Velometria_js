// Convert m/s to km/h
export const mps2kph = (data) => (
  data.map(d => d * 3.6)
);
