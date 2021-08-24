module.exports = (node, graph) => {
  const input = node.in("Input", {}),
    output = node.out("Output", {}),
    storage = node.in("Storage", 10),
    resources = {"coal":"Coal","crude-oil":"Crude Oil","nitrogen-gas":"Nitrogen Gas","bauxite":"Bauxite","copper-ore":"Copper Ore","caterium-ore":"Caterium Ore","iron-ore":"Iron Ore","uranium":"Uranium","raw-quartz":"Raw Quartz","limestone":"Limestone","sulfur":"Sulfur","water":"Water"}

  function update() {
    let inp = input.value, sto = storage.value
    if (inp.slug && inp.amount) {
      if (inp.amount < sto) {
        output.setValue({slug: inp.slug, amount: 0})
        node.comment = "Not enough input for storage!"
      } else {
        output.setValue({slug: inp.slug, amount: inp.amount - sto})
        node.comment = `Input: ${inp.amount} ${resources[inp.slug]}/min
Storage: ${sto} ${resources[inp.slug]}/min
Output: ${output.value.amount} ${resources[inp.slug]}/min`
      }
    } else {
      output.setValue({})
      node.comment = "No input!"
    }
  }
  update()
  for (let inp of [input, storage]) {
    inp.onChange = update
  }
};