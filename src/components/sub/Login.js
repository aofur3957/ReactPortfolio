import { NavLink } from "react-router-dom";

export default function Login(){
    const path = process.env.PUBLIC_URL; 

    return (
        <main className="content login">
            <div className="inner">
                <div>
                    <div className="loginModal">
                        <div className="title">
                            <h1>login</h1>
                            <span></span>
                        </div>
                        <div className="insert">
                            <div className="pic">
                                <img src={`${path}/img/joinBackground.jpg`}  />
                                <p>Have an account?</p>
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
                </div>
            </div>
        </main>    
    )
}