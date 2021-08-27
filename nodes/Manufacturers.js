module.exports = (node, graph) => {
  const satisfactory = require('satisfactory'),
    recipes = satisfactory.data.recipes.manufacturers,
    input1 = node.in("Input 1", {}),
    input2 = node.in("Input 2", {}),
    input3 = node.in("Input 3", {}),
    input4 = node.in("Input 4", {}),
    recipeSelector = node.in("Recipe", "Computer", {type: 'dropdown', values: Object.keys(recipes)}),
    manufacturersPerFloor = node.in("Manufacturers per floor", 1),
    powerShards = node.in("Power shards", 0),
    output = node.out("Output", {})

  function update() {
    const recipe = recipes[recipeSelector.value]
    try {
      // use first input as a base
      if (!(input1.value.slug && recipe.ingredients[input1.value.slug])) throw {error: "Missing or invalid first input!"}
      const machines = satisfactory.computeMachines({
          inputAmount: input1.value.amount,
          recipeInputAmount: recipe.ingredients[input1.value.slug].amount,
          recipeOutputAmount: recipe.product.amount,
          perFloor: manufacturersPerFloor.value,
          powerShards: powerShards.value
      })
      satisfactory.checkInputs([input1, input2, input3, input4], machines, recipe)
      output.setValue({slug: recipe.product.slug, amount: machines.outputAmount})
      node.comment = satisfactory.renderMachines(machines, {machinesName: 'manufacturers', productName: recipe.product.name})
    } catch (error) {
      output.setValue({})
      node.comment = error.error
      if (error.inputs) node.comment += "\nGetting: " + error.inputs
      if (error.expectedInputs) node.comment += "\nExpected: " + error.expectedInputs
      node.comment += "\n" + (error.recipe || satisfactory.renderRecipe(recipe))
    }
 }
  update()
  for (let inp of [input1, input2, input3, input4, recipeSelector, manufacturersPerFloor, powerShards]) {
    inp.onChange = update
  }
};
