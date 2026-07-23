module.exports = (temp, recipe) => {
  let output = temp.replace(/{%RECIPENAME%}/g, recipe.name);
  output = output.replace(/{%IMAGE%}/g, recipe.image);
  output = output.replace(/{%CATEGORY%}/g, recipe.category);
  output = output.replace(/{%COOKTIME%}/g, recipe.cookTime);
  output = output.replace(/{%SERVINGS%}/g, recipe.servings);
  output = output.replace(/{%INGREDIENTS%}/g, recipe.ingredients);
  output = output.replace(/{%INSTRUCTIONS%}/g, recipe.instructions);
  output = output.replace(/{%ID%}/g, recipe.id);

  if (!recipe.vegetarian)
    output = output.replace(/{%NOT_VEGETARIAN%}/g, 'not-vegetarian');

  return output;
};
