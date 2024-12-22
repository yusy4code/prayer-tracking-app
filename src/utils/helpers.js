export const isValidDate = (dateString) => {
  return (new Date(dateString)).toString !== 'Invalid Date';
};