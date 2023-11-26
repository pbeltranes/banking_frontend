export const isNumeric = (value: string): boolean => {
  const regexPattern = /^\d+$/;
  return regexPattern.test(value);
};



export const formatter  = (currency: string) => { 
    const digit = new Intl.NumberFormat(`es-${currency.slice(0, -1)}`, {
    style: "currency",
    currency,
  })
  return digit
}
