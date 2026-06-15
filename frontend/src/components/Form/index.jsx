import Input from "../Input";
import Links from "../Links";
import styles from "./style.module.css"



function Form ( { user, setUser, password, setPassword, submitAdmin}) {

    return<form className={`flex flex-col justify-center items-center gap-2 ${styles.formAdmin}`} onSubmit={submitAdmin} autoComplete="off">
                    

                    <Input 
                        placeholder="Usuário"
                        type="text"
                        id="userAdmin"
                        name="userAdmin"

                        value={user}
                        onChange={ (ev) => setUser(ev.target.value)}
                    />

                    <Input
                        placeholder="Senha"
                        type="password"
                        id="passwordAdmin"
                        name="passwordAdmin"

                        value={password}
                        onChange={ (ev) => setPassword(ev.target.value)}
                    />


                    <input type="submit" value="Entrar"/>

                <div className="flex gap-5">
                    <Links 
                        path={'/'}
                        text={'Usuário'}
                        className={styles.btnAdmin}
                    />
                    
                    <Links 
                        path={'/admin'}
                        text={'Administrador'}
                        className={styles.btnAdmin}
                    />
                </div>
                    
                </form>
}

export default Form;