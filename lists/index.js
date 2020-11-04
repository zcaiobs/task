import getPeople from './service.js'

Array.prototype.myFilter = function(callback) {
    const list = []
    for (let index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        if (!result) continue
        list.push(item)
    }
    return list
}

async function main() {
    try {
        const { results } = await getPeople('a')
        
        const familyLars1 = results.filter(item => {
            const result = item.name.toLowerCase().indexOf('lars') !== -1
            return result
        })

        const familyLars2 = results.myFilter((item, index, list) => {
            console.log(`index:${index}`, list.name)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })

        const names = familyLars2.map(people => people.name)
        console.log(names)
    } catch(error){
        console.error('Internal error', error)
    }
}
main()