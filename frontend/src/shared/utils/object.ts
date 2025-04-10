// Disabled due to object type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanObjectProperties = (obj: any) => {
  const clone = { ...obj };
  Object.keys(clone).forEach((key) => {
    if (clone[key] === null || clone[key] === undefined) {
      delete clone[key];
    }
  });
  return clone;
};

// Disabled due to object type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanObjectPropertiesAndEmpty = (obj: any) => {
  const clone = { ...obj };
  Object.keys(clone).forEach((key) => {
    if (clone[key] === null || clone[key] === undefined || clone[key] === "") {
      delete clone[key];
    }
  });
  return clone;
};
