import getPeople from './service.js'

Array.prototype.myReduce = function(callback, initialValue) {
    let finalValue = typeof initialValue !== undefined ? initialValue : this[0]
    for(let index = 0; index <= this.length -1; index++) {
        finalValue = callback(finalValue, this[index], this)
    }
    return finalValue
}

async function main() {
    try {

        const { results } = await getPeople('a')
        const height = results.map(item => parseInt(item.height))
        console.log('height:', height)
        // const total = height.reduce((previous, current) => previous + current, 0)
        const myList = [['Caio', 'Bernardo'], ['Dev', 'Code']]
        const total = myList.myReduce((previous, current) => previous.concat(current), []).join(', ')
        console.log('total:', total)

    } catch(error) {
        console.error('DEU RUIM', error)
    }
}
main()