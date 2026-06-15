import style from  "./style.module.css"
import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout () {
    const navigate = useNavigate()

    async function sairApp () {
        await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include'
        })
        navigate('/')
    }

    return(

        <div className={style.headerMenu}>

            <header className={`${style.spaceLayoutOutlet} flex justify-between`}>
                <h1>Gestor de Estoque</h1>

                <div className="flex gap-5">
                    <Link to="/app" className={style.btnLinkDashboard}>Início</Link>
                    <Link to="itens" className={style.btnLinkDashboard}>Itens</Link>
                    <Link onClick={ () => sairApp()} className={style.btnLinkDashboard}>Sair</Link>
                </div>
            </header>

            <Outlet />

            <footer className={style.footerLayout}>Feito por gitHub: WendelSantosFs</footer>
            
        </div>
    )

}

export default Layout;