import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"
import { registrar, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner"


const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message } = useSelector((state)=> state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2){
            toast.error('Password does not match')
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(registrar(userData))
        }
    }

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate("/login")
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, dispatch, navigate])

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
            <h4>
                <FaUser /> Register
            </h4>
            <p>Please create a user.</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        id='name'
                        name='name'
                        value={name}
                        placeholder="Please write your name"
                        onChange={onChange}
                    />
                    <input 
                        type="email"
                        className="form-control"
                        id='email'
                        name='email'
                        value={email}
                        placeholder="Please write your email"
                        onChange={onChange}
                    />
                    <input 
                        type="password"
                        className="form-control"
                        id='password'
                        name='password'
                        value={password}
                        placeholder="Please write your password"
                        onChange={onChange}
                    />
                    <input 
                        type="password"
                        className="form-control"
                        id='password2'
                        name='password2'
                        value={password2}
                        placeholder="Please confirm your password"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register
