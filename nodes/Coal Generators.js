module.exports = (node, graph) => {
  const satisfactory = require('satisfactory'),
    data = satisfactory.data.generators.coal,
    inputItems = node.in("Input Items", {})
  
  function update() {
    const fuel = data.fuels[inputItems.value.slug]
    if (fuel) {
      const generators = satisfactory.computeGenerators(data, fuel, inputItems.value.amount)
      node.comment = satisfactory.renderGenerators(generators, 'coal generators')
    } else {
      node.comment = "Invalid input fuel!"
    }
  }
  update()
  inputItems.onChange = update
};
