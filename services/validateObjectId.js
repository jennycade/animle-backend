exports.validateObjectId = (paramId) => {
  const objectIdPattern = /^[a-f\d]{24}$/i;
  return objectIdPattern.test(paramId);
}