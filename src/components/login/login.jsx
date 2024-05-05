import React from 'react';

const Login = () => {
    return (
        <div className="login d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#508CA4' }}>
            <div className='p-5 bg-light rounded'>
                <form>
                    <h3 className="mb-4"> Login </h3>
                    <div id="formEmail" className="mb-3">
                        <label htmlFor="email"> Email </label>
                        <input type="email" id="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div id="formPassword" className='mb-3'>
                        <label htmlFor="password"> Password </label>
                        <input type="password" id="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;
