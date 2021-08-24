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

save %output.json output
