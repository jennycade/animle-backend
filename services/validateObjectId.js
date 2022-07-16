exports.validateObjectId = (paramId) => {
  const objectIdPattern = /^[a-f\d]{24}$/i;
  return objectIdPattern.test(paramId);
}

exports.validateUuid4 = (paramId) => {
  const uuid4Pattern = /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i;
  return uuid4Pattern.test(paramId);
}