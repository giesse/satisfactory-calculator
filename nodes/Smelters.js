module.exports = (node, graph) => {
  const recipes = {"caterium-ore":{"ingredientName":"Caterium Ore","ingredientAmount":45,"productSlug":"caterium-ingot","productName":"Caterium Ingot","productAmount":15},"copper-ore":{"ingredientName":"Copper Ore","ingredientAmount":30,"productSlug":"copper-ingot","productName":"Copper Ingot","productAmount":30},"iron-ore":{"ingredientName":"Iron Ore","ingredientAmount":30,"productSlug":"iron-ingot","productName":"Iron Ingot","productAmount":30},"aluminum-scrap":{"ingredientName":"Aluminum Scrap","ingredientAmount":60,"productSlug":"aluminum-ingot","productName":"Aluminum Ingot","productAmount":30}},
    inputOre = node.in("Input Ore", {}),
    outputIngots = node.out("Output", {})
  
  function update() {
    if (inputOre.value.slug) {
      const recipe = recipes[inputOre.value.slug]
      if (recipe) {
        const smeltersPerFloor = 6,
          floors = Math.ceil(inputOre.value.amount / (recipe.ingredientAmount * smeltersPerFloor)),
          clock = inputOre.value.amount / (floors * smeltersPerFloor * recipe.ingredientAmount)
        outputIngots.setValue({slug: recipe.productSlug, amount: recipe.productAmount * floors * smeltersPerFloor * clock})
        node.comment = `${floors} floors of ${smeltersPerFloor} smelters @ ${Math.round(clock * 10000) / 100}%
Producing ${outputIngots.value.amount} ${recipe.productName}/min`
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
  inputOre.onChange = update
};