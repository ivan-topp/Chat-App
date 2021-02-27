import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/AuthContext';

export const LoginPage = () => {

    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: 'ivan.topp.sandoval@gmail.com',
        password: '123',
        rememberMe: false,
    });

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email){
            setForm((form)=>({
                ...form,
                email,
                rememberMe: true,
            }));
        }
    }, [])

    const isFormValid = () => {
        return (form.email.length > 0 && form.password.length > 0);
    };

    const onChange = ( { target } ) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const toggleCheck = () => {
        setForm({
            ...form,
            rememberMe: !form.rememberMe,
        });
    };

    const onSubmit = async ( e ) => {
        e.preventDefault();
        if(form.rememberMe) localStorage.setItem('email', form.email);
        else localStorage.removeItem('email');
        const { email, password } = form;
        const resp = await login(email, password);
        if(!resp.ok) Swal.fire('Error', 'Verifique el usuario y contraseña', 'error');
    };

    return (
        <form 
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={onSubmit}
        >
            <span className="login100-form-title mb-3">Chat - Ingreso</span>

            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={onChange}
                />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={onChange}
                />
                <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
                <div 
                    className="col"
                    onClick={() => toggleCheck()}
                >
                    <input
                        className="input-checkbox100"
                        id="ckb1"
                        type="checkbox"
                        name="rememberMe"
                        checked={form.rememberMe}
                        readOnly
                    />
                    <label className="label-checkbox100">Recordarme</label>
                </div>

                <div className="col text-right">
                    <Link to="/auth/register" className="txt1">Nueva cuenta?</Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button
                    className="login100-form-btn"
                    type='submit'
                    disabled={!isFormValid()}
                >
                    Ingresar
                </button>
            </div>

        </form>
    )
}
