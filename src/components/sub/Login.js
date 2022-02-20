import { NavLink } from "react-router-dom";


export default function Login(){
    return (
        <main className="content login">
            <div className="inner">
                <h1>LOGIN</h1>
                <div className="loginBox">
                    <div className="pic">
                        <p>Have an Account?</p>
                    </div>
                    <form action="#" method="post">
                        <fieldset>
                            <legend>LOG IN</legend>
                                <input type="text" name="account" placeholder="Account*" />
                                <input type="password" name="pwd" placeholder="Password*" />
                                <input type="checkbox" />
                                <label htmlFor="">Remember me</label>
                                <button>LOG IN</button>
                                <p>You don't have a acoount?</p>
                                <NavLink to='/Join'>Sign up</NavLink>
                        </fieldset>
                    </form>
                </div>
            </div>
        </main>    
    )
}