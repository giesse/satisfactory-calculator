module.exports = (node, graph) => {
  const resourceMap = {"Coal":"coal","Crude Oil":"crude-oil","Nitrogen Gas":"nitrogen-gas","Bauxite":"bauxite","Copper Ore":"copper-ore","Caterium Ore":"caterium-ore","Iron Ore":"iron-ore","Uranium":"uranium","Raw Quartz":"raw-quartz","Limestone":"limestone","Sulfur":"sulfur","Water":"water"},
    resources = ["Coal","Crude Oil","Nitrogen Gas","Bauxite","Copper Ore","Caterium Ore","Iron Ore","Uranium","Raw Quartz","Limestone","Sulfur","Water"],
    resource = node.in('Resource', 'Coal', {type: 'dropdown', values: resources}),
    amount = node.in('Amount', 60),
    output = node.out('Output', {slug:'coal',amount:60})

  function update() {
    output.setValue({slug: resourceMap[resource.value], amount: amount.value})
    node.comment = `${amount.value} ${resource.value}/min`
  }
  update()
  for (inp of [resource, amount]) {
    inp.onChange = update
  }
};