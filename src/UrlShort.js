import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function UrlShort() {
    const navigate = useNavigate()
    const [urlCard, setUrlcard] = useState([])
    useEffect(async () => {
        fetchUsers()
    }, [])

    let fetchUsers = async () => {
        try {
            let value = await axios.get("https://url-short-api-back.herokuapp.com/shortly/shorturl", {
                headers: {
                    Authorization : window.localStorage.getItem("auth_token")
                }
            })
            setUrlcard(value.data)
        } catch (error) {
            console.log(error)
        }
    }

    let handleDelete = async (id) => {
        try {
            let result = window.confirm("Are you sure want to delete?")
            if (result) {
                await axios.delete(`https://url-short-api-back.herokuapp.com/shortly/delete/${id}`)
                fetchUsers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            longUrl: ''
        },
        onSubmit: async (values) => {
            try {
                axios.post(`https://url-short-api-back.herokuapp.com/shortly/create`, values)
                fetchUsers()
            } catch (error) {
                console.log(error)
            }
        },
    });

    const logoutHandler = () => {
        localStorage.removeItem('auth_token');
        navigate("/")
    }
    return (
        <>
            <div className='container'>
                <div className='row justify-content-end'>
                    <div className='col-4' onClick={logoutHandler}><i class="fa-solid fa-arrow-right-from-bracket"></i></div>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Past long url" aria-label="Past long url" aria-describedby="button-addon2" name="longUrl" onChange={formik.handleChange} value={formik.values.longUrl} />
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Button</button>
                </div>
            </form>
            <div class="container">
                <div class="row">
                    {
                        urlCard.map((elem) => {
                            return (
                                <div class="col-lg-3">
                                    <div class="card row">
                                        <div class="card-body">
                                            <h5 class="card-title">Click Count: {elem.clickCount}</h5>
                                            <p class="card-text">{elem.longUrl}</p>
                                            <a href={`http://localhost:3001/shortly/${elem.shortUrl}`} class="btn btn-primary">{`http://localhost:3001/shortly/${elem.shortUrl}`}</a>
                                            <button onClick={() => handleDelete(elem._id)} className='btn btn-danger'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default UrlShort