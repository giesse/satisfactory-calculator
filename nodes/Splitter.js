module.exports = (node, graph) => {
  const input = node.in("Input", {}),
    left = node.out("Left", {}),
    right = node.out("Right", {}),
    mode = node.in("Mode", "Set left", {type: 'dropdown', values: ['Set left', 'Set right']}),
    split = node.in("Split", 30),
    resources = {"alumina-solution":"Alumina Solution","aluminum-casing":"Aluminum Casing","aluminum-ingot":"Aluminum Ingot","heat-sink":"Heat Sink","alclad-aluminum-sheet":"Alclad Aluminum Sheet","aluminum-scrap":"Aluminum Scrap","battery":"Battery","paleberry":"Paleberry","solid-biofuel":"Solid Biofuel","cable":"Cable","rifle-cartridge":"Rifle Cartridge","concrete":"Concrete","chainsaw":"Chainsaw","ai-limiter":"AI Limiter","circuit-board":"Circuit Board","coal":"Coal","color-cartridge":"Color Cartridge","compacted-coal":"Compacted Coal","supercomputer":"Supercomputer","computer":"Computer","cooling-system":"Cooling System","copper-powder":"Copper Powder","copper-ingot":"Copper Ingot","copper-sheet":"Copper Sheet","crystal-oscillator":"Crystal Oscillator","power-shard":"Power Shard","green-power-slug":"Green Power Slug","yellow-power-slug":"Yellow Power Slug","purple-power-slug":"Purple Power Slug","electromagnetic-control-rod":"Electromagnetic Control Rod","fabric":"Fabric","gas-filter":"Gas Filter","flower-petals":"Flower Petals","empty-canister":"Empty Canister","packaged-fuel":"Packaged Fuel","empty-fluid-tank":"Empty Fluid Tank","biomass":"Biomass","caterium-ingot":"Caterium Ingot","factory-cart":"Factory Cart™","black-powder":"Black Powder","hub-parts":"HUB Parts","iodine-infused-filter":"Iodine Infused Filter","heavy-oil-residue":"Heavy Oil Residue","high-speed-connector":"High-Speed Connector","quickwire":"Quickwire","alien-carapace":"Alien Carapace","iron-ingot":"Iron Ingot","reinforced-iron-plate":"Reinforced Iron Plate","iron-plate":"Iron Plate","iron-rod":"Iron Rod","screw":"Screw","leaves":"Leaves","liquid-biofuel":"Liquid Biofuel","fuel":"Fuel","crude-oil":"Crude Oil","turbofuel":"Turbofuel","medicinal-inhaler":"Medicinal Inhaler","fused-modular-frame":"Fused Modular Frame","heavy-modular-frame":"Heavy Modular Frame","radio-control-unit":"Radio Control Unit","modular-frame":"Modular Frame","turbo-motor":"Turbo Motor","motor":"Motor","mycelia":"Mycelia","nitric-acid":"Nitric Acid","nitrogen-gas":"Nitrogen Gas","nobelisk":"Nobelisk","non-fissile-uranium":"Non-fissile Uranium","uranium-fuel-rod":"Uranium Fuel Rod","uranium-waste":"Uranium Waste","beryl-nut":"Beryl Nut","bauxite":"Bauxite","copper-ore":"Copper Ore","caterium-ore":"Caterium Ore","iron-ore":"Iron Ore","uranium":"Uranium","packaged-alumina-solution":"Packaged Alumina Solution","packaged-liquid-biofuel":"Packaged Liquid Biofuel","packaged-nitric-acid":"Packaged Nitric Acid","packaged-nitrogen-gas":"Packaged Nitrogen Gas","packaged-heavy-oil-residue":"Packaged Heavy Oil Residue","packaged-oil":"Packaged Oil","packaged-sulfuric-acid":"Packaged Sulfuric Acid","packaged-water":"Packaged Water","parachute":"Parachute","petroleum-coke":"Petroleum Coke","plastic":"Plastic","encased-plutonium-cell":"Encased Plutonium Cell","plutonium-fuel-rod":"Plutonium Fuel Rod","plutonium-pellet":"Plutonium Pellet","polymer-resin":"Polymer Resin","pressure-conversion-cube":"Pressure Conversion Cube","quartz-crystal":"Quartz Crystal","raw-quartz":"Raw Quartz","rebar-gun":"Rebar Gun","rotor":"Rotor","rubber":"Rubber","bacon-agaric":"Bacon Agaric","silica":"Silica","smart-plating":"Smart Plating","versatile-framework":"Versatile Framework","automated-wiring":"Automated Wiring","modular-engine":"Modular Engine","adaptive-control-unit":"Adaptive Control Unit","magnetic-field-generator":"Magnetic Field Generator","assembly-director-system":"Assembly Director System","thermal-propulsion-rocket":"Thermal Propulsion Rocket","nuclear-pasta":"Nuclear Pasta","spiked-rebar":"Spiked Rebar","alien-organs":"Alien Organs","stator":"Stator","steel-ingot":"Steel Ingot","steel-pipe":"Steel Pipe","encased-industrial-beam":"Encased Industrial Beam","steel-beam":"Steel Beam","limestone":"Limestone","sulfur":"Sulfur","sulfuric-acid":"Sulfuric Acid","packaged-turbofuel":"Packaged Turbofuel","encased-uranium-cell":"Encased Uranium Cell","water":"Water","wire":"Wire","wood":"Wood"}

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
  for (let inp of [input, mode, split]) {
    inp.onChange = update
  }
};