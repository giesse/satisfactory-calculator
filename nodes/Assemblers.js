module.exports = (node, graph) => {
  const satisfactory = require('satisfactory'),
    recipes = satisfactory.data.recipes.assemblers,
    input1 = node.in("Input 1", {}),
    input2 = node.in("Input 2", {}),
    recipeSelector = node.in("Recipe", "AI Limiter", {type: 'dropdown', values: Object.keys(recipes)}),
    assemblersPerFloor = node.in("Assemblers per floor", 3),
    powerShards = node.in("Power shards", 0),
    output = node.out("Output", {})

  function update() {
    const recipe = recipes[recipeSelector.value]
    try {
      if (!(input1.value.slug && input2.value.slug)) throw {error: "Missing inputs!"}
      // always uses first input as base
      const machines = satisfactory.computeMachines({
          inputAmount: input1.value.amount,
          recipeInputAmount: recipe.ingredients[input1.value.slug].amount,
          recipeOutputAmount: recipe.product.amount,
          perFloor: assemblersPerFloor.value,
          powerShards: powerShards.value
      })
      satisfactory.checkInputs([input1, input2], machines, recipe)
      output.setValue({slug: recipe.product.slug, amount: machines.outputAmount})
      node.comment = satisfactory.renderMachines(machines, {machinesName: 'assemblers', productName: recipe.product.name})
    } catch (error) {
      output.setValue({})
      node.comment = error.error
      if (error.inputs) node.comment += "\nGetting: " + error.inputs
      if (error.expectedInputs) node.comment += "\nExpected: " + error.expectedInputs
      node.comment += "\n" + (error.recipe || satisfactory.renderRecipe(recipe))
    }
  }
  update()
  for (let inp of [input1, input2, recipeSelector, assemblersPerFloor, powerShards]) inp.onChange = update
};
