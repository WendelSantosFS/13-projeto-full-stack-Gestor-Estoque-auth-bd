const btnSubmit = document.getElementById('btn-submit')


let user = document.getElementById('user')
let password = document.getElementById('password')

let userSQL = document.getElementById('userSQL')
let passwordSQL = document.getElementById('passwordSQL')

let nomeBD = document.getElementById('nomeBd')
let nomeTable = document.getElementById('table')
let localHost = document.getElementById('localHost')
let funcao = document.getElementById('funcao')






btnSubmit.addEventListener('click', async (ev) => {
    ev.preventDefault()


    let user1 = user.value
    let password1 = password.value

    let userSQL1 = userSQL.value
    let passwordSQL1 = passwordSQL.value

    let nomeBd1 = nomeBD.value
    let table = nomeTable.value
    let localHost1 = localHost.value
    let funcao1 = funcao.value


    const validacao = 
    user1.replace( / /g, '').length < 1 || 
    password1.replace( / /g, '').length < 1 || 
    userSQL1.replace( / /g, '').length < 1 || 
    passwordSQL1.replace( / /g, '').length < 1 || 
    nomeBd1.replace( / /g, '').length < 1 ||
    table.replace( / /g, '').length < 1 || 
    localHost1.replace( / /g, '').length < 1 || 
    funcao1.replace( / /g, '').length < 1


    if ( validacao ) {  console.log('Campo vazio!') } 
    else {
        console.log('Entrou no FECTH')
        const fetchResult = await fetch('http://localhost:3000/createUser', {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify( { 
                user1, password1, 
                userSQL1, passwordSQL1,
                nomeBd1, table,
                localHost1, funcao1
         })
        })

        console.log('resultado fetch: ', fetchResult)

        user.value = ''
        password.value = ''
        userSQL.value = ''
        passwordSQL.value = ''
        nomeBD.value = ''



        if ( fetchResult.message == 'usuario ja existe') {
            alert('Usuário já existe')
        }
    }
})