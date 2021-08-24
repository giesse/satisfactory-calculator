Red []

data: load %../assets/data.json
output: #()

foreach [word name] [recipes "Recipes:" items "Items:" schematics "Schematics:" generators "Generators:" resources "Resources:" miners "Miners:" buildings "Buildings:"] [
    print name
    foreach key keys-of select data word [print [tab key]]
]

output/resources: #()
output/reverse-resources: #()
output/resource-list: []
foreach resource values-of data/resources [
    resource/item: select data/items to word! resource/item
    put output/resources resource/item/name resource/item/slug
    put output/reverse-resources resource/item/slug resource/item/name
    append output/resource-list resource/item/name
]

foreach miner values-of data/miners [
    miner/building: select data/buildings to word! replace copy miner/className "Build_" "Desc_"
]

output/recipes: #(refineries: #() constructors: #() assemblers: #() manufacturers: #() blenders: #() packagers: #() smelters: #() foundries: #())
output-recipe-items: function [per-min recipe-items output-items] [
    foreach item recipe-items [
        put output-items item/item/slug outing: copy #()
        outing/name: item/item/name
        outing/amount: item/amount * per-min
    ]
]
output-recipe: function [output-bin recipe] [
    put output-bin recipe/name outrec: copy #()
    ;outrec/name: recipe/name
    per-min: 60 / recipe/time
    outrec/ingredients: copy #()
    outrec/products: copy #()
    output-recipe-items per-min recipe/ingredients outrec/ingredients
    output-recipe-items per-min recipe/products outrec/products
]
output-refinery-ingredient: function [outing item per-min] [
    outing/name: item/item/name
    outing/slug: item/item/slug
    outing/amount: item/amount * per-min
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
                put output/recipes/refineries recipe/name outrec: copy #()
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
            "Desc_ConstructorMk1_C" [
                output-recipe output/recipes/constructors recipe
            ]
            "Desc_Blender_C" [
                output-recipe output/recipes/blenders recipe
            ]
            "Desc_Packager_C" [
                output-recipe output/recipes/packagers recipe
            ]
            "Desc_AssemblerMk1_C" [
                output-recipe output/recipes/assemblers recipe
            ]
            "Desc_HadronCollider_C" []
            "Desc_ManufacturerMk1_C" [
                output-recipe output/recipes/manufacturers recipe
            ]
            "Desc_SmelterMk1_C" [
                output-recipe output/recipes/smelters recipe
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

;write %output.json to-json/pretty output "  "
save %output.json output
