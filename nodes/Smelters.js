module.exports = (node, graph) => {
  const satisfactory = require('satisfactory'),
        recipes = satisfactory.data.recipes.smelters,
        inputOre = node.in("Input Ore", {}),
        smeltersPerFloor = node.in("Smelters per floor", 6),
        powerShards = node.in("Power shards", 0),
        outputIngots = node.out("Output", {})
  
  function update() {
    if (inputOre.value.slug) {
      const recipe = recipes[inputOre.value.slug]
      if (recipe) {
        const machines = satisfactory.computeMachines({
            inputAmount: inputOre.value.amount,
            recipeInputAmount: recipe.ingredientAmount,
            recipeOutputAmount: recipe.productAmount,
            perFloor: smeltersPerFloor.value,
            powerShards: powerShards.value
        })
        outputIngots.setValue({slug: recipe.productSlug, amount: machines.outputAmount})
        node.comment = satisfactory.renderMachines(machines, {machinesName: 'smelters', productName: recipe.productName})
      } else {
        node.comment = "Invalid input!"
        outputIngots.setValue({})
      }
    } else {
      node.comment = "No input!"
      outputIngots.setValue({})
    }
  }
  update()
  for (inp of [inputOre, smeltersPerFloor, powerShards]) inp.onChange = update
};
