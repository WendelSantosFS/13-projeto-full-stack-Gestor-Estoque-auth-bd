import style from "./style.module.css"
import { Link, Outlet } from "react-router-dom";

function Layout () {

    return(

        <div className={`${style.headerMenu}`}>

            <header className={`${style.spaceLayoutOutlet} flex justify-between`}>
                <h1>Gestor de Estoque</h1>

                <div className="flex gap-5">
                    <Link to="/" className={style.btnLinkDashboard}>Início</Link>
                    <Link to="/items" className={style.btnLinkDashboard}>Itens</Link>
                </div>
            </header>

            <Outlet />

            <footer>Feito por gitHub: WendelSantosFs</footer>
            
        </div>
    )

}

export default Layout;