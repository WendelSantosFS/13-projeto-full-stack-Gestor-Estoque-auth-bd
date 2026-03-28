const btnSubmit = document.getElementById('btn-submit')

const user = document.getElementById('user')
const password = document.getElementById('password')
const userSQL = document.getElementById('userSQL')
const passwordSQL = document.getElementById('passwordSQL')






btnSubmit.addEventListener('click', async (ev) => {
    ev.preventDefault()

    const user1 = user.value
    const password1 = password.value
    const userSQL1 = userSQL.value
    const passwordSQL1 = passwordSQL.value

    const fetchResult = await fetch('http://localhost:3001/createUser', {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify( { user1, password1, userSQL1, passwordSQL1})
    })

    console.log(fetchResult)

    console.log('Enviando para o servidor!')
    console.log(user1, password1, userSQL1, passwordSQL1)
})