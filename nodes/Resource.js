module.exports = (node, graph) => {
  const satisfactory = require('satisfactory'),
        resourceMap = satisfactory.data.resources,
        resource = node.in('Resource', 'Coal', {type: 'dropdown', values: Object.keys(resourceMap)}),
        amount = node.in('Amount', 60),
        output = node.out('Output', {})

  function update() {
    output.setValue({slug: resourceMap[resource.value], amount: amount.value})
    node.comment = `${amount.value} ${resource.value}/min`
  }
  update()
  for (inp of [resource, amount]) {
    inp.onChange = update
  }
};
