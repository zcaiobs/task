const util = require('util')

const getUser = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                id: 1,
                name: 'Maria',
                dateBirth: new Date()
            })
        }, 2000)
    })
}

const getPhone = idUser => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                phone: '2563-2563',
                ddd: 11
            })
        }, 2000)
    })
}

const getAdress = (idUser, callback) => {
    setTimeout(() => {
        return callback(null, {
            street: 'blue street',
            number: 156
        })
    }, 3000)
}

const getAdressAsync = util.promisify(getAdress)


const main = async () => {
    try {
        console.time('time')

        const user = await getUser()
        const result = await Promise.all([
            getPhone(user.id),
            getAdressAsync(user.id)
        ])

        const phone = result[0]
        const adress = result[1]

        console.log(`
            Nome: ${user.name}
            Telefone: (${phone.ddd}) ${phone.phone}
            Endereço: ${adress.street}, ${adress.number}
        `)

        console.timeEnd('time')
    } catch(error) {
        console.error('DEU RUIM', error)
    }
}
main()




// const user = getUser()
// user.then(userResult => {
//         return getPhone(userResult.id)
//             .then(phoneResult => {
//                 return {
//                     user: {
//                         name: userResult.name,
//                         id: userResult.id,
//                         dateBirth: userResult.dateBirth
//                     },
//                     phone: phoneResult
//                 }
//             })
//     })
//     .then(result => {
//         const adress = getAdressAsync(result.user.id)
//         return adress.then(adressResult => {
//             return {
//                 user: result.user,
//                 phone: result.phone,
//                 adress: adressResult
//             }
//         })
//     })
//     .then(result => {
//         console.log(`
//             Nome: ${result.user.name}
//             Endereço: ${result.adress.street}, ${result.adress.number}
//             Telefone: (${result.phone.ddd}) ${result.phone.phone}
//         `)
//     })
//     .catch(error => console.error('DEU RUIM EM USER', error))

// const user = getUser((error, user) => {
//     if (error) {
//         console.log('DEU RUIM EM USER')
//         return
//     }

//     getPhone(user.id, (error, phone) => {
//         if (error) {
//             console.log('DEU RUIM EM PHONE')
//             return
//         } 
        
//         getAdress(user.id, (error, adress) => {
//             if (error) {
//                 console.log('DEU RUIM EM ADRESS')
//                 return
//             }

//             console.log(`
//                 Nome: ${user.name}
//                 Telefone: (${phone.ddd}) ${phone.phone}
//                 Endereço: ${adress.street}, ${adress.number}         
//             `)
//         })
//     }
// )})
