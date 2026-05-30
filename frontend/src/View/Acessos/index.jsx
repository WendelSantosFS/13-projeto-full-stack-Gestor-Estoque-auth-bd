

function Acessos() {

    async function acessGet () {
        const resultFetch = await fetch('http://localhost:3000/admin/acessos')
        const data = await resultFetch.json()
        console.log(data)
    }

    acessGet()

    return(
        <div>
            <h1>Hello wordl</h1>
        </div>
    )
}







export default Acessos;