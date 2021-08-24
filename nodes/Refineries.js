module.exports = (node, graph) => {
  const recipes = {"Alternate: Coated Cable":{"ingredients":{"items":{"name":"Wire","slug":"wire","amount":37.5},"fluid":{"name":"Heavy Oil Residue","slug":"heavy-oil-residue","amount":15.0}},"products":{"items":{"name":"Cable","slug":"cable","amount":67.5},"fluid":null}},"Alternate: Diluted Packaged Fuel":{"ingredients":{"items":{"name":"Packaged Water","slug":"packaged-water","amount":60},"fluid":{"name":"Heavy Oil Residue","slug":"heavy-oil-residue","amount":30}},"products":{"items":{"name":"Packaged Fuel","slug":"packaged-fuel","amount":60},"fluid":null}},"Alternate: Electrode - Aluminum Scrap":{"ingredients":{"items":{"name":"Petroleum Coke","slug":"petroleum-coke","amount":60},"fluid":{"name":"Alumina Solution","slug":"alumina-solution","amount":180}},"products":{"items":{"name":"Aluminum Scrap","slug":"aluminum-scrap","amount":300},"fluid":{"name":"Water","slug":"water","amount":105}}},"Alternate: Heavy Oil Residue":{"ingredients":{"items":null,"fluid":{"name":"Crude Oil","slug":"crude-oil","amount":30}},"products":{"items":{"name":"Polymer Resin","slug":"polymer-resin","amount":20},"fluid":{"name":"Heavy Oil Residue","slug":"heavy-oil-residue","amount":40}}},"Alternate: Recycled Plastic":{"ingredients":{"items":{"name":"Rubber","slug":"rubber","amount":30},"fluid":{"name":"Fuel","slug":"fuel","amount":30}},"products":{"items":{"name":"Plastic","slug":"plastic","amount":60},"fluid":null}},"Alternate: Polyester Fabric":{"ingredients":{"items":{"name":"Polymer Resin","slug":"polymer-resin","amount":80},"fluid":{"name":"Water","slug":"water","amount":50}},"products":{"items":{"name":"Fabric","slug":"fabric","amount":5},"fluid":null}},"Alternate: Polymer Resin":{"ingredients":{"items":null,"fluid":{"name":"Crude Oil","slug":"crude-oil","amount":60}},"products":{"items":{"name":"Polymer Resin","slug":"polymer-resin","amount":130},"fluid":{"name":"Heavy Oil Residue","slug":"heavy-oil-residue","amount":20}}},"Alternate: Pure Caterium Ingot":{"ingredients":{"items":{"name":"Caterium Ore","slug":"caterium-ore","amount":24},"fluid":{"name":"Water","slug":"water","amount":24}},"products":{"items":{"name":"Caterium Ingot","slug":"caterium-ingot","amount":12},"fluid":null}},"Alternate: Pure Copper Ingot":{"ingredients":{"items":{"name":"Copper Ore","slug":"copper-ore","amount":15.0},"fluid":{"name":"Water","slug":"water","amount":10.0}},"products":{"items":{"name":"Copper Ingot","slug":"copper-ingot","amount":37.5},"fluid":null}},"Alternate: Pure Iron Ingot":{"ingredients":{"items":{"name":"Iron Ore","slug":"iron-ore","amount":35},"fluid":{"name":"Water","slug":"water","amount":20}},"products":{"items":{"name":"Iron Ingot","slug":"iron-ingot","amount":65},"fluid":null}},"Alternate: Pure Quartz Crystal":{"ingredients":{"items":{"name":"Raw Quartz","slug":"raw-quartz","amount":67.5},"fluid":{"name":"Water","slug":"water","amount":37.5}},"products":{"items":{"name":"Quartz Crystal","slug":"quartz-crystal","amount":52.5},"fluid":null}},"Alternate: Recycled Rubber":{"ingredients":{"items":{"name":"Plastic","slug":"plastic","amount":30},"fluid":{"name":"Fuel","slug":"fuel","amount":30}},"products":{"items":{"name":"Rubber","slug":"rubber","amount":60},"fluid":null}},"Alternate: Sloppy Alumina":{"ingredients":{"items":{"name":"Bauxite","slug":"bauxite","amount":200},"fluid":{"name":"Water","slug":"water","amount":200}},"products":{"items":null,"fluid":{"name":"Alumina Solution","slug":"alumina-solution","amount":240}}},"Alternate: Steamed Copper Sheet":{"ingredients":{"items":{"name":"Copper Ingot","slug":"copper-ingot","amount":22.5},"fluid":{"name":"Water","slug":"water","amount":22.5}},"products":{"items":{"name":"Copper Sheet","slug":"copper-sheet","amount":22.5},"fluid":null}},"Alternate: Turbo Heavy Fuel":{"ingredients":{"items":{"name":"Compacted Coal","slug":"compacted-coal","amount":30.0},"fluid":{"name":"Heavy Oil Residue","slug":"heavy-oil-residue","amount":37.5}},"products":{"items":null,"fluid":{"name":"Turbofuel","slug":"turbofuel","amount":30.0}}},"Turbofuel":{"ingredients":{"items":{"name":"Compacted Coal","slug":"compacted-coal","amount":15.0},"fluid":{"name":"Fuel","slug":"fuel","amount":22.5}},"products":{"items":null,"fluid":{"name":"Turbofuel","slug":"turbofuel","amount":18.75}}},"Alternate: Wet Concrete":{"ingredients":{"items":{"name":"Limestone","slug":"limestone","amount":120},"fluid":{"name":"Water","slug":"water","amount":100}},"products":{"items":{"name":"Concrete","slug":"concrete","amount":80},"fluid":null}},"Alumina Solution":{"ingredients":{"items":{"name":"Bauxite","slug":"bauxite","amount":120},"fluid":{"name":"Water","slug":"water","amount":180}},"products":{"items":{"name":"Silica","slug":"silica","amount":50},"fluid":{"name":"Alumina Solution","slug":"alumina-solution","amount":120}}},"Aluminum Scrap":{"ingredients":{"items":{"name":"Coal","slug":"coal","amount":120},"fluid":{"name":"Alumina Solution","slug":"alumina-solution","amount":240}},"products":{"items":{"name":"Aluminum Scrap","slug":"aluminum-scrap","amount":360},"fluid":{"name":"Water","slug":"water","amount":120}}},"Liquid Biofuel":{"ingredients":{"items":{"name":"Solid Biofuel","slug":"solid-biofuel","amount":90},"fluid":{"name":"Water","slug":"water","amount":45}},"products":{"items":null,"fluid":{"name":"Liquid Biofuel","slug":"liquid-biofuel","amount":60}}},"Fuel":{"ingredients":{"items":null,"fluid":{"name":"Crude Oil","slug":"crude-oil","amount":60}},"products":{"items":{"name":"Polymer Resin","slug":"polymer-resin","amount":30},"fluid":{"name":"Fuel","slug":"fuel","amount":40}}},"Petroleum Coke":{"ingredients":{"items":null,"fluid":{"name":"Heavy Oil Residue","slug":"heavy-oil-residue","amount":40}},"products":{"items":{"name":"Petroleum Coke","slug":"petroleum-coke","amount":120},"fluid":null}},"Plastic":{"ingredients":{"items":null,"fluid":{"name":"Crude Oil","slug":"crude-oil","amount":30}},"products":{"items":{"name":"Plastic","slug":"plastic","amount":20},"fluid":{"name":"Heavy Oil Residue","slug":"heavy-oil-residue","amount":10}}},"Residual Fuel":{"ingredients":{"items":null,"fluid":{"name":"Heavy Oil Residue","slug":"heavy-oil-residue","amount":60}},"products":{"items":null,"fluid":{"name":"Fuel","slug":"fuel","amount":40}}},"Residual Plastic":{"ingredients":{"items":{"name":"Polymer Resin","slug":"polymer-resin","amount":60},"fluid":{"name":"Water","slug":"water","amount":20}},"products":{"items":{"name":"Plastic","slug":"plastic","amount":20},"fluid":null}},"Residual Rubber":{"ingredients":{"items":{"name":"Polymer Resin","slug":"polymer-resin","amount":40},"fluid":{"name":"Water","slug":"water","amount":40}},"products":{"items":{"name":"Rubber","slug":"rubber","amount":20},"fluid":null}},"Rubber":{"ingredients":{"items":null,"fluid":{"name":"Crude Oil","slug":"crude-oil","amount":30}},"products":{"items":{"name":"Rubber","slug":"rubber","amount":20},"fluid":{"name":"Heavy Oil Residue","slug":"heavy-oil-residue","amount":20}}},"Sulfuric Acid":{"ingredients":{"items":{"name":"Sulfur","slug":"sulfur","amount":50},"fluid":{"name":"Water","slug":"water","amount":50}},"products":{"items":null,"fluid":{"name":"Sulfuric Acid","slug":"sulfuric-acid","amount":50}}}},
    inputItems = node.in("Input Items", {}),
    inputFluid = node.in("Input Fluid", {}),
    outputItems = node.out("Output Items", {}),
    outputFluid = node.out("Output Fluid", {}),
    recipeSelector = node.in("Recipe", "Plastic", {type: 'dropdown', values: Object.keys(recipes)})

  function update() {
    let recipe = recipes[recipeSelector.value]
    if (recipe.ingredients.items && recipe.ingredients.fluid) {
      // both items and fluid required as input
      if (recipe.ingredients.items.slug != inputItems.value.slug) node.comment = "Invalid item input!"
      else if (recipe.ingredients.fluid.slug != inputFluid.value.slug) node.comment = "Invalid fluid input!"
      else {
        let refineries = inputItems.value.amount / recipe.ingredients.items.amount
        if (refineries * recipe.ingredients.fluid.amount != inputFluid.value.amount) {
          node.comment = `Fluid input amount does not match item input amount!
Needs: ${refineries * recipe.ingredients.fluid.amount}/min
Getting: ${inputFluid.value.amount}/min`
        } else {
          refineries = Math.ceil(refineries)
          let clock = inputItems.value.amount / (recipe.ingredients.items.amount * refineries)
          node.comment = `${refineries} refineries @ ${Math.round(clock * 10000) / 100}%`
          if (recipe.products.items) {
            outputItems.setValue({slug: recipe.products.items.slug, amount: recipe.products.items.amount * refineries * clock})
            node.comment += `\nProducing ${outputItems.value.amount} ${recipe.products.items.name}/min`
          } else outputItems.setValue({})
          if (recipe.products.fluid) {
            outputFluid.setValue({slug: recipe.products.fluid.slug, amount: recipe.products.fluid.amount * refineries * clock})
            node.comment += `\nProducing ${outputFluid.value.amount} m³/min of ${recipe.products.fluid.name}`
          } else outputFluid.setValue({})
        }
      }
    } else if (recipe.ingredients.items) {
      // only items input
      if (recipe.ingredients.items.slug != inputItems.value.slug) node.comment = "Invalid item input!"
      else {
        let refineries = Math.ceil(inputItems.value.amount / recipe.ingredients.items.amount),
          clock = inputItems.value.amount / (recipe.ingredients.items.amount * refineries)
        node.comment = `${refineries} refineries @ ${Math.round(clock * 10000) / 100}%`
        if (recipe.products.items) {
          outputItems.setValue({slug: recipe.products.items.slug, amount: recipe.products.items.amount * refineries * clock})
          node.comment += `\nProducing ${outputItems.value.amount} ${recipe.products.items.name}/min`
        } else outputItems.setValue({})
        if (recipe.products.fluid) {
          outputFluid.setValue({slug: recipe.products.fluid.slug, amount: recipe.products.fluid.amount * refineries * clock})
          node.comment += `\nProducing ${outputFluid.value.amount} m³/min of ${recipe.products.fluid.name}`
        } else outputFluid.setValue({})
      }
    } else if (recipe.ingredients.fluid) {
      // only fluid input
      if (recipe.ingredients.fluid.slug != inputFluid.value.slug) node.comment = "Invalid fluid input!"
      else {
        let refineries = Math.ceil(inputFluid.value.amount / recipe.ingredients.fluid.amount),
          clock = inputFluid.value.amount / (recipe.ingredients.fluid.amount * refineries)
        node.comment = `${refineries} refineries @ ${Math.round(clock * 10000) / 100}%`
        if (recipe.products.items) {
          outputItems.setValue({slug: recipe.products.items.slug, amount: recipe.products.items.amount * refineries * clock})
          node.comment += `\nProducing ${outputItems.value.amount} ${recipe.products.items.name}/min`
        } else outputItems.setValue({})
        if (recipe.products.fluid) {
          outputFluid.setValue({slug: recipe.products.fluid.slug, amount: recipe.products.fluid.amount * refineries * clock})
          node.comment += `\nProducing ${outputFluid.value.amount} m³/min of ${recipe.products.fluid.name}`
        } else outputFluid.setValue({})
      }
    }
  }
  update()
  for (inp of [inputItems, inputFluid, recipeSelector]) {
    inp.onChange = update
  }
};