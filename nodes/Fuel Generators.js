module.exports = (node, graph) => {
  const satisfactory = require('satisfactory'),
    data = satisfactory.data.generators.fuel,
    inputFluid = node.in("Input Fluid", {})
  
  function update() {
    const fuel = data.fuels[inputFluid.value.slug]
    if (fuel) {
      const generators = satisfactory.computeGenerators(data, fuel, inputFluid.value.amount)
      node.comment = satisfactory.renderGenerators(generators, 'fuel generators')
    } else {
      node.comment = "Invalid input fuel!"
    }
  }
  update()
  inputFluid.onChange = update
};
