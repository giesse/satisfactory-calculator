module.exports = (node, graph) => {
  const input = node.in("Input", {}),
    output = node.out("Output", {}),
    storage = node.in("Storage", 10),
    resources = {"alumina-solution":"Alumina Solution","aluminum-casing":"Aluminum Casing","aluminum-ingot":"Aluminum Ingot","heat-sink":"Heat Sink","alclad-aluminum-sheet":"Alclad Aluminum Sheet","aluminum-scrap":"Aluminum Scrap","battery":"Battery","paleberry":"Paleberry","solid-biofuel":"Solid Biofuel","cable":"Cable","rifle-cartridge":"Rifle Cartridge","concrete":"Concrete","chainsaw":"Chainsaw","ai-limiter":"AI Limiter","circuit-board":"Circuit Board","coal":"Coal","color-cartridge":"Color Cartridge","compacted-coal":"Compacted Coal","supercomputer":"Supercomputer","computer":"Computer","cooling-system":"Cooling System","copper-powder":"Copper Powder","copper-ingot":"Copper Ingot","copper-sheet":"Copper Sheet","crystal-oscillator":"Crystal Oscillator","power-shard":"Power Shard","green-power-slug":"Green Power Slug","yellow-power-slug":"Yellow Power Slug","purple-power-slug":"Purple Power Slug","electromagnetic-control-rod":"Electromagnetic Control Rod","fabric":"Fabric","gas-filter":"Gas Filter","flower-petals":"Flower Petals","empty-canister":"Empty Canister","packaged-fuel":"Packaged Fuel","empty-fluid-tank":"Empty Fluid Tank","biomass":"Biomass","caterium-ingot":"Caterium Ingot","factory-cart":"Factory Cart™","black-powder":"Black Powder","hub-parts":"HUB Parts","iodine-infused-filter":"Iodine Infused Filter","heavy-oil-residue":"Heavy Oil Residue","high-speed-connector":"High-Speed Connector","quickwire":"Quickwire","alien-carapace":"Alien Carapace","iron-ingot":"Iron Ingot","reinforced-iron-plate":"Reinforced Iron Plate","iron-plate":"Iron Plate","iron-rod":"Iron Rod","screw":"Screw","leaves":"Leaves","liquid-biofuel":"Liquid Biofuel","fuel":"Fuel","crude-oil":"Crude Oil","turbofuel":"Turbofuel","medicinal-inhaler":"Medicinal Inhaler","fused-modular-frame":"Fused Modular Frame","heavy-modular-frame":"Heavy Modular Frame","radio-control-unit":"Radio Control Unit","modular-frame":"Modular Frame","turbo-motor":"Turbo Motor","motor":"Motor","mycelia":"Mycelia","nitric-acid":"Nitric Acid","nitrogen-gas":"Nitrogen Gas","nobelisk":"Nobelisk","non-fissile-uranium":"Non-fissile Uranium","uranium-fuel-rod":"Uranium Fuel Rod","uranium-waste":"Uranium Waste","beryl-nut":"Beryl Nut","bauxite":"Bauxite","copper-ore":"Copper Ore","caterium-ore":"Caterium Ore","iron-ore":"Iron Ore","uranium":"Uranium","packaged-alumina-solution":"Packaged Alumina Solution","packaged-liquid-biofuel":"Packaged Liquid Biofuel","packaged-nitric-acid":"Packaged Nitric Acid","packaged-nitrogen-gas":"Packaged Nitrogen Gas","packaged-heavy-oil-residue":"Packaged Heavy Oil Residue","packaged-oil":"Packaged Oil","packaged-sulfuric-acid":"Packaged Sulfuric Acid","packaged-water":"Packaged Water","parachute":"Parachute","petroleum-coke":"Petroleum Coke","plastic":"Plastic","encased-plutonium-cell":"Encased Plutonium Cell","plutonium-fuel-rod":"Plutonium Fuel Rod","plutonium-pellet":"Plutonium Pellet","polymer-resin":"Polymer Resin","pressure-conversion-cube":"Pressure Conversion Cube","quartz-crystal":"Quartz Crystal","raw-quartz":"Raw Quartz","rebar-gun":"Rebar Gun","rotor":"Rotor","rubber":"Rubber","bacon-agaric":"Bacon Agaric","silica":"Silica","smart-plating":"Smart Plating","versatile-framework":"Versatile Framework","automated-wiring":"Automated Wiring","modular-engine":"Modular Engine","adaptive-control-unit":"Adaptive Control Unit","magnetic-field-generator":"Magnetic Field Generator","assembly-director-system":"Assembly Director System","thermal-propulsion-rocket":"Thermal Propulsion Rocket","nuclear-pasta":"Nuclear Pasta","spiked-rebar":"Spiked Rebar","alien-organs":"Alien Organs","stator":"Stator","steel-ingot":"Steel Ingot","steel-pipe":"Steel Pipe","encased-industrial-beam":"Encased Industrial Beam","steel-beam":"Steel Beam","limestone":"Limestone","sulfur":"Sulfur","sulfuric-acid":"Sulfuric Acid","packaged-turbofuel":"Packaged Turbofuel","encased-uranium-cell":"Encased Uranium Cell","water":"Water","wire":"Wire","wood":"Wood"}

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