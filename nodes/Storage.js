module.exports = (node, graph) => {
  const input = node.in("Input", {}),
    output = node.out("Output", {}),
    mode = node.in("Mode", "Set Storage", {type: 'dropdown', values: ['Set Storage', 'Set Output']}),
    value = node.in("Value", 10),
    satisfactory = require('satisfactory'),
    resources = satisfactory.data.items

  function update() {
    let inp = input.value, val = value.value
    if (inp.slug && inp.amount) {
      if (inp.amount < val) {
        output.setValue({slug: inp.slug, amount: mode.value == 'Set Storage' ? 0 : inp.amount})
        node.comment = "Not enough input for storage!"
      } else {
        const outputAmount = mode.value == 'Set Storage' ? inp.amount - val : val,
          storage = inp.amount - outputAmount
        output.setValue({slug: inp.slug, amount: outputAmount})
        node.comment = `Input: ${inp.amount} ${resources[inp.slug]}/min
Storage: ${storage} ${resources[inp.slug]}/min
Output: ${outputAmount} ${resources[inp.slug]}/min`
      }
    } else {
      output.setValue({})
      node.comment = "No input!"
    }
  }
  update()
  for (let inp of [input, mode, value]) inp.onChange = update
};
