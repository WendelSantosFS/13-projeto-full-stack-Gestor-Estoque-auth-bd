import { Link } from "react-router-dom";
import style from "./style.module.css"

function Dashboard () {
    return (
        <>
            <h2>Dashboard</h2>

            <div className={`${style.dashb} flex justify-between flex-wrap gap-3`}>
                <div>
                    <p className="font-bold">Diversidade de itens</p>
                    <p className={`${style.pNumber} font-bold text-center`}>{ 0 }</p>
                </div>

                <div>
                    <p className="font-bold">Inventário total</p>
                    <p className={`${style.pNumber} font-bold text-center`}>{ 0 }</p>
                </div>

                <div>
                    <p className="font-bold">Itens recentes</p>
                    <p className={`${style.pNumber} font-bold text-center`}>{ 0 }</p>
                </div>

                <div>
                    <p className="font-bold">Itens acabando</p>
                    <p className={`${style.pNumber} font-bold text-center`}>{ 0 }</p>
                </div>
            </div>
            
            <div className={`${style.prodRecentesAcabando} flex justify-between flex-wrap`}>

                <div className={style.divRecentes}>
                    <div className={`${style.colunaRecentesAcabando} flex justify-between`}>
                        <p className="font-bold">Itens recentes</p>
                        <p>Ações</p>
                    </div>

                    {} /*buscar os produtos recentes */
                </div>
                

                <div className={style.divAcabando}>
                    <div className={`${style.colunaRecentesAcabando} flex justify-between`}>
                        <p className="font-bold">Itens acabando</p>
                        <p>Qtd</p>
                        <p>Ações</p>
                    </div>

                    {} /* Buscar os itens acabando*/
                </div>


            </div>
        </>
    )
}

export default Dashboard;