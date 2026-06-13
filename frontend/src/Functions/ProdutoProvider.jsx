import { useState } from "react";
import ProdutoContext from "./ProdutoContext";

export default function ProdutoProvider ( {children} ) {
    const [produtos, setProdutos] = useState([])    

    return (
        <ProdutoContext.Provider value={ {produtos, setProdutos} }>
            {children}
        </ProdutoContext.Provider>
    )
}