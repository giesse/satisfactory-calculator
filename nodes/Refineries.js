module.exports = (node, graph) => {
  const satisfactory = require("satisfactory"),
    recipes = satisfactory.data.recipes.refineries,
    inputItems = node.in("Input Items", {}),
    inputFluid = node.in("Input Fluid", {}),
    outputItems = node.out("Output Items", {}),
    outputFluid = node.out("Output Fluid", {}),
    recipeSelector = node.in("Recipe", "Plastic", {type: "dropdown", values: Object.keys(recipes)}),
    powerShards = node.in("Power shards", 0)

  function update() {
    const recipe = recipes[recipeSelector.value]
    try {
      let baseAmount = null, baseRecipeAmount = null
      // if the recipe has items as input, use that as the base for calculation; otherwise, use the fluid input
      if (recipe.ingredients.items) {
        if (recipe.ingredients.items.slug != inputItems.value.slug) throw {error: "Invalid item input!"}
        baseAmount = inputItems.value.amount
        baseRecipeAmount = recipe.ingredients.items.amount
      } else {
        baseAmount = inputFluid.value.amount
        baseRecipeAmount = recipe.ingredients.fluid.amount
      }
      if (recipe.ingredients.fluid && recipe.ingredients.fluid.slug != inputFluid.value.slug) {
        throw {error: "Invalid fluid input!"}
      }
      const machines = satisfactory.computeMachines({
        inputAmount: baseAmount,
        recipeInputAmount: baseRecipeAmount,
        recipeOutputAmount: recipe.products.items ? recipe.products.items.amount : 0,
        recipeOutputFluidAmount: recipe.products.fluid ? recipe.products.fluid.amount : 0,
        perFloor: 1,
        powerShards: powerShards.value,
      })
      if (recipe.ingredients.items && recipe.ingredients.fluid) {
        // if both inputs are required, check that the fluid input matches the item input
        const expectedFluidAmount = machines.machines * machines.clock * recipe.ingredients.fluid.amount
        if (expectedFluidAmount != inputFluid.value.amount) {
          throw {error: "Fluid input amount does not match item input amount!", expectedFluidAmount}
        }
      }
      node.comment = satisfactory.renderMachines(machines, {
        machinesName: "refineries",
        productName: recipe.products.items?.name,
        fluidName: recipe.products.fluid?.name,
      })
      if (recipe.products.items) {
        outputItems.setValue({slug: recipe.products.items.slug, amount: machines.outputAmount})
      } else outputItems.setValue({})
      if (recipe.products.fluid) {
        outputFluid.setValue({slug: recipe.products.fluid.slug, amount: machines.outputFluidAmount})
      } else outputFluid.setValue({})
    } catch (error) {
      outputItems.setValue({})
      outputFluid.setValue({})
      node.comment = error.error
      if (error.expectedFluidAmount) {
        node.comment += `\nExpected ${error.expectedFluidAmount} m³/min of ${recipe.ingredients.fluid.name}, getting ${inputFluid.value.amount}`
      }
      node.comment += "\n" + satisfactory.renderFluidRecipe(recipe)
    }
  }
  update()
  for (inp of [inputItems, inputFluid, recipeSelector, powerShards])
    inp.onChange = update
}
