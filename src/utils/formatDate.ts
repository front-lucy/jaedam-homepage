export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}.${month}.${day}`;
  };