Red []

data: load %data.json
output: #()

foreach [word name] [recipes "Recipes:" items "Items:" schematics "Schematics:" generators "Generators:" resources "Resources:" miners "Miners:" buildings "Buildings:"] [
    print name
    foreach key keys-of select data word [print [tab key]]
]

output/items: #()
foreach item values-of data/items [
    if find/match item/className "Desc_" [
        put output/items item/slug item/name
    ]
]

output/resources: #()
;output/reverseResources: #()
foreach resource values-of data/resources [
    resource/item: select data/items to word! resource/item
    put output/resources resource/item/name resource/item/slug
    ;put output/reverseResources resource/item/slug resource/item/name
]

foreach miner values-of data/miners [
    miner/building: select data/buildings to word! replace copy miner/className "Build_" "Desc_"
]

output/recipes: #(refineries: #() constructors: #() assemblers: #() manufacturers: #() blenders: #() packagers: #() smelters: #() foundries: #())
output-recipe-items: function [per-min recipe-items output-items] [
    foreach item recipe-items [
        outing: copy #()
        put output-items item/item/slug outing
        outing/name: item/item/name
        outing/amount: item/amount * per-min
    ]
]
output-recipe: function [output-bin recipe] [
    put output-bin recipe/name outrec: copy #()
    ;outrec/name: recipe/name
    per-min: 60 / recipe/time
    outrec/ingredients: copy #()
    outrec/product: copy #()
    output-recipe-items per-min recipe/ingredients outrec/ingredients
    product: recipe/products/1
    outrec/product/slug: product/item/slug
    outrec/product/name: product/item/name
    outrec/product/amount: product/amount * per-min
]
output-refinery-ingredient: function [outing item per-min] [
    outing/name: item/item/name
    outing/slug: item/item/slug
    outing/amount: item/amount * per-min
]
output-fluid-recipe: function [output-bin recipe] [
    put output-bin recipe/name outrec: copy #()
    per-min: 60 / recipe/time
    outrec/ingredients: copy #(items: #[none] fluid: #[none])
    outrec/products: copy #(items: #[none] fluid: #[none])
    foreach item recipe/ingredients [
        either item/item/liquid [
            output-refinery-ingredient outrec/ingredients/fluid: copy #() item per-min
        ] [
            output-refinery-ingredient outrec/ingredients/items: copy #() item per-min
        ]
    ]
    foreach item recipe/products [
        either item/item/liquid [
            output-refinery-ingredient outrec/products/fluid: copy #() item per-min
        ] [
            output-refinery-ingredient outrec/products/items: copy #() item per-min
        ]
    ]
]
foreach recipe values-of data/recipes [
    foreach ing recipe/ingredients [
        ing/item: select data/items to word! ing/item
    ]
    foreach prod recipe/products [
        prod/item: select data/items to word! prod/item
    ]
    foreach building recipe/producedIn [
        switch/default building [
            "Desc_OilRefinery_C" [
                output-fluid-recipe output/recipes/refineries recipe
            ]
            "Desc_ConstructorMk1_C" [
                output-recipe output/recipes/constructors recipe
            ]
            "Desc_Blender_C" [
                output-fluid-recipe output/recipes/blenders recipe
            ]
            "Desc_Packager_C" [
                output-fluid-recipe output/recipes/packagers recipe
            ]
            "Desc_AssemblerMk1_C" [
                output-recipe output/recipes/assemblers recipe
            ]
            "Desc_HadronCollider_C" []
            "Desc_ManufacturerMk1_C" [
                output-recipe output/recipes/manufacturers recipe
            ]
            "Desc_SmelterMk1_C" [
                per-min: 60 / recipe/time
                put output/recipes/smelters recipe/ingredients/1/item/slug outrec: copy #()
                outrec/ingredientName: recipe/ingredients/1/item/name
                outrec/ingredientAmount: recipe/ingredients/1/amount * per-min
                outrec/productSlug: recipe/products/1/item/slug
                outrec/productName: recipe/products/1/item/name
                outrec/productAmount: recipe/products/1/amount * per-min
            ]
            "Desc_FoundryMk1_C" [
                output-recipe output/recipes/foundries recipe
            ]
        ] [
            print "Unknown building:"
            print building
        ]
    ]
]

; they made this way too complicated!
output/generators: #(coal: #() fuel: #())
foreach [key building description] [coal Build_GeneratorCoal_C Desc_GeneratorCoal_C fuel Build_GeneratorFuel_C Desc_GeneratorFuel_C] [
    coalgen: select output/generators key
    coalgen/fuels: copy #()
    gendata: select data/generators building
    coalgen/name: select select data/buildings description 'name
    coalgen/waterToPowerRatio: gendata/waterToPowerRatio
    coalgen/powerProduction: gendata/powerProduction
    coalgen/powerProductionExponent: gendata/powerProductionExponent
    foreach fuel gendata/fuel [
        fuel: select data/items to word! fuel
        put coalgen/fuels fuel/slug outfuel: copy #()
        outfuel/name: fuel/name
        ; return (((generator.powerProduction / fuel.energyValue) * 60) / (fuel.liquid ? 1000 : 1)) * Math.pow(overclock / 100, 1 / generator.powerProductionExponent);
        factor: either fuel/liquid [60 / 1000] [60]
        outfuel/amount: coalgen/powerProduction * factor / fuel/energyValue
    ]
]

write %../node_modules/satisfactory/data.json to-json/pretty output "  "
;save %output.json output
