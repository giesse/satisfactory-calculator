module.exports = (node, graph) => {
  const data = {
      "fuels": {
        "coal": {
          "name": "Coal",
          "amount": 15
        },
        "compacted-coal": {
          "name": "Compacted Coal",
          "amount": 7.142857142857143
        },
        "petroleum-coke": {
          "name": "Petroleum Coke",
          "amount": 25
        }
      },
      "waterToPowerRatio": 10,
      "powerProduction": 75,
      "powerProductionExponent": 1.3
    },
    inputItems = node.in("Input Items", {})
  
  function update() {
    let fuel = data.fuels[inputItems.value.slug]
    if (fuel) {
      let generators = Math.ceil(inputItems.value.amount / fuel.amount),
        clock = Math.pow(inputItems.value.amount / (generators * fuel.amount), data.powerProductionExponent),
        power = data.powerProduction * Math.pow(clock, 1 / data.powerProductionExponent) * generators,
        water = power * data.waterToPowerRatio * 60 / 1000,
        extractors = Math.ceil(water / 120),
        extractorClock = water / (extractors * 120)
      node.comment = `${generators} Coal Generators @ ${Math.round(clock * 10000) / 100}%
Producing ${Math.round(power)} MW
Needs ${Math.round(water * 100) / 100} m³/min of Water from ${extractors} extractors @ ${Math.round(extractorClock * 10000) / 100}%`
    } else {
      node.comment = "Invalid input fuel!"
    }
  }
  update()
  inputItems.onChange = update
};