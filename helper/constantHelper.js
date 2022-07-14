exports.constants = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE_NUMBER: 0,
};

exports.getValue = (key) => {
  return this.constants[key];
};
