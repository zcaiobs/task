import axios from 'axios'
const URL = 'https://swapi.dev/api/people'

async function getPeople(name) {
    const url = `${URL}/?search=${name}&format=json`
    const resp = await axios.get(url)
    return resp.data
}

export default getPeople


