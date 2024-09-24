export const parseDate = (dateStr: string): Date | null => {
  const [day, month, year] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  // Check if the parsed date is valid
  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
};

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};