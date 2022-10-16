export const pagination = (query: any) => {
  const option: Record<string, any> = {};
  let { per_page } = query;
  const { page } = query;
  per_page = per_page || 10;
  if (page !== 0 && page) {
    option.take = per_page;
    option.skip = option.take * (page - 1);
  }
  return option;
};
