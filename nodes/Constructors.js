module.exports = (node, graph) => {
  const satisfactory = require('satisfactory'),
        recipes = satisfactory.data.recipes.constructors,
        input = node.in("Input", {}),
        recipeSelector = node.in("Recipe", "Iron Plate", {type: 'dropdown', values: Object.keys(recipes)}),
        constructorsPerFloor = node.in("Constructors per floor", 4),
        powerShards = node.in("Power shards", 0),
        output = node.out("Output", {})

  function update() {
    const recipe = recipes[recipeSelector.value],
      ingredient = recipe.ingredients[input.value.slug]
    if (ingredient) {
      const machines = satisfactory.computeMachines({
          inputAmount: input.value.amount,
          recipeInputAmount: ingredient.amount,
          recipeOutputAmount: recipe.product.amount,
          perFloor: constructorsPerFloor.value,
          powerShards: powerShards.value
      })
      output.setValue({slug: recipe.product.slug, amount: machines.outputAmount})
      node.comment = satisfactory.renderMachines(machines, {machinesName: 'constructors', productName: recipe.product.name})
    } else {
      output.setValue({})
      node.comment = `Invalid input!\n${satisfactory.renderRecipe(recipe)}`
    }
  }
  update()
  for (let inp of [input, recipeSelector, constructorsPerFloor, powerShards]) inp.onChange = update
};
