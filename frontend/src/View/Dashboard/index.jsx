import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css"

import { useEffect, useState } from "react";


function Dashboard () {

    const [obj, setObj] = useState([])
    const [recentes, setRecentes] = useState([])
    const [acabando, setAcabando] = useState([])

    const navigate = useNavigate()
    useEffect( () => {

        async function rotaProtegida () {
            const result = await fetch('http://localhost:3000/app', {
                credentials: "include"
            })
            const data = await result.json()
            setObj(data.obj)
            setRecentes(data.obj.recentesItens)
            setAcabando(data.obj.acabandoItens)


            if (data.erro) { navigate('/') }
        }
        rotaProtegida()


    }, [navigate])



    return (
        <>
            <h2>Dashboard</h2>

            <div className={`${style.dashb} flex justify-between flex-wrap gap-3`}>
                <div className={style.divDashBoard}>
                    <p className="font-bold">Diversidade de itens</p>
                    <p className={`${style.pNumber} font-bold text-center`}>{ obj.diversidade }</p>
                </div>

                <div className={style.divDashBoard}>
                    <p className="font-bold">Inventário total</p>
                    <p className={`${style.pNumber} font-bold text-center`}>{ obj.totalItens }</p>
                </div>

                <div className={style.divDashBoard}>
                    <p className="font-bold">Itens recentes</p>
                    <p className={`${style.pNumber} font-bold text-center`}>{ obj.recentesQuantidade }</p>
                </div>

                <div className={style.divDashBoard}>
                    <p className="font-bold">Itens acabando</p>
                    <p className={`${style.pNumber} font-bold text-center`}>{ obj.acabandoQuantidade }</p>
                </div>
            </div>
            
            <div className={`${style.prodRecentesAcabando} flex justify-between flex-wrap`}>

                <div className={style.divRecentes}>
                    <div className={`${style.colunaRecentesAcabando} flex justify-between`}>
                        <p className="font-bold">Itens recentes</p>
                        <p>Ações</p>
                    </div>

                    {
                        recentes.map( (p) => (
                            <div key={p.id}>
                                <p>{p.nome}</p>
                            </div>
                        ))
                    }
                </div>
                

                <div className={style.divAcabando}>
                    <div className={`${style.colunaRecentesAcabando} flex justify-between`}>
                        <p className="font-bold">Itens acabando</p>
                        <p>Qtd</p>
                        <p>Ações</p>
                    </div>

                    {
                        acabando.map( (p) => (
                            <div key={p.id} className="flex justify-between">
                                <p>{p.nome}</p>
                                <p>{p.quantidade}</p>
                                <p>{}</p>
                            </div>
                        ))
                    }

                </div>


            </div>
        </>
    )
}

export default Dashboard;