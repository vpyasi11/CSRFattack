
// import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './ResetPassword.css'
import axios from 'axios'


export default function ResetPassword() {
    const [token,setToken] = useState()
    useEffect(() => {
        async function csrfToken(){
            const res = await axios.get('http://localhost:8000/')
            console.log(`Token coming from bakend: ${res.data}`)
            setToken(res.data)
        }
        csrfToken()
      }, [])
      const handleSubmit = async (e)=>{

        await axios.post('http://localhost:8000/response',{token:token})
        .then((res)=>console.log(res.data))
        e.preventDefault()
      }
    
    return (
        <>
            
                <div className="box-form-reset">

                    <div className="right">
                        <h5>Reset Password</h5>
                        {/* <p>Wish to Try again ? <Link to="/login">Go Back</Link></p> */}
                        <div className="inputs">
                            <input type="password" placeholder="Old Password" />
                            <br />
                            <input type="password" placeholder="New Password" />
                            <br />
                            <input type="password" placeholder="Confirm Password" />
                        </div>

                        <br /><br />



                        <button onClick={handleSubmit} type='submit'>Confirm</button>
                    </div>


                </div>
            
        </>
    )
}

