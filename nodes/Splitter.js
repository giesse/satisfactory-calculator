module.exports = (node, graph) => {
  const input = node.in("Input", {}),
    left = node.out("Left", {}),
    right = node.out("Right", {}),
    mode = node.in("Mode", "Set left", {type: 'dropdown', values: ['Set left', 'Set right']}),
    split = node.in("Split", 30),
    satisfactory = require('satisfactory'),
    resources = satisfactory.data.items

  function update() {
    const inp = input.value, spl = split.value
    if (inp.slug && inp.amount) {
      if (inp.amount <= spl) {
        const leftValue = mode.value == 'Set left' ? spl : 0,
          rightValue = mode.value == 'Set right' ? spl : 0
        left.setValue({slug: inp.slug, amount: leftValue})
        right.setValue({slug: inp.slug, amount: rightValue})
        node.comment = "Not enough input for both sides!"
      } else {
        const leftValue = mode.value == 'Set left' ? spl : inp.amount - spl,
          rightValue = mode.value == 'Set right' ? spl : inp.amount - spl
        left.setValue({slug: inp.slug, amount: leftValue})
        right.setValue({slug: inp.slug, amount: rightValue})
        node.comment = `${leftValue}← ${resources[inp.slug]}/min →${rightValue}`
      }
    } else {
      left.setValue({})
      right.setValue({})
      node.comment = "No input!"
    }
  }
  update()
  for (let inp of [input, mode, split]) inp.onChange = update
};
