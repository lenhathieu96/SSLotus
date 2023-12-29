const Helper = {
  isNumeric: (input: string): boolean => {
    const regex = /^\d+$/;
    return regex.test(input);
  },
};

export default Helper;
