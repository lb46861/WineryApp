const formatModelName = (modelName) => {
  let formattedModelName = modelName[0].toUpperCase() + modelName.slice(1);

  // Add space before every capital letter
  formattedModelName = formattedModelName.charAt(0) + formattedModelName.slice(1).replace(/([A-Z])/g, ' $1');

  return formattedModelName;
};

const responseMessages = {
  CREATE_SUCCESS: (modelName) => `${formatModelName(modelName)} successfully created!`,
  UPDATE_SUCCESS: (modelName) => `${formatModelName(modelName)} successfully updated!`,
  DELETE_SUCCESS: (modelName) => `${formatModelName(modelName)} successfully deleted!`,
  NOT_FOUND: (modelName) => `${formatModelName(modelName)} not found!`,

  INVALID_CREDENTIALS: 'Invalid username or password!',
  ASSOCIATED_TABLE: 'You cannot delete this model, it is associated with other models.'
};

module.exports = responseMessages;
