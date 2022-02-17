import React, {useEffect} from "react";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { Routes, Route, Link, BrowserRouter, Navigate } from 'react-router-dom';
import { Loading } from "../../components/Loading";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const TextListing = props => {
    const [state, setState] = React.useState({data: {}});
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        fetch('https://polynomialai-backend.herokuapp.com/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(res => {
            setState(new_state => ({
                ...new_state,
                data:{
                    ...new_state.data,
                    texts: res
                }
            }))
            setLoading(false);
        })
    }, [])

    function handleRenew(text_id, text_data){
        console.log(text_id)
        fetch(`https://polynomialai-backend.herokuapp.com/${text_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: text_data})
        })
        .then(res => res.json())
        .then(res => console.log("update", res))
        .catch(err => console.log(err))
        window.location.reload()
    }

    function handleDelete(text_id){
        console.log(text_id)
        fetch(`https://polynomialai-backend.herokuapp.com/${text_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
        window.location.reload()
    }

    console.log("res", state)

    return(
        <>
        {
            loading ? <Loading /> : null
        }
        <div style={{padding: '0px 32px 32px 32px'}}>
        <p className="primaryHeading mb-5">Recently Created</p>
        <table className="table table-responsive" style={{backgroundColor: '#fff'}}>
            <thead style={{borderBottom: '1px solid #dedede', backgroundColor: '#fff' }}>
                <tr>
                    <th>Text Data</th>
                    <th>Created At</th>
                    <th>Access URL</th>
                    <th className="text-right"></th>
                </tr>
            </thead>
                              
            <tbody style={{ height: '350px', overflowY: 'auto' }}>                       
                {
                    state.data.texts && state.data.texts.map(text => (

                        <tr>
                            <td>
                                {
                                    text.data.length > 15 ?
                                    <Tooltip title={text.data}>
                                        <span>{text.data.slice(0,14)}...</span>
                                    </Tooltip>
                                    :
                                    <span>{text.data}</span>
                                }
                            </td>
                            <td>{text.created}</td>
                            {
                                text.data.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) ?
                                <td><a href={text.data.includes("http") ? `${text.data}` : `http://${text.data}`}>{text.short_url}</a></td>
                                :
                                <td><Link to={`/${text.short_url}`}>{text.short_url}</Link></td>
                            }
                            <td className="text-right">
                                    <Tooltip title="Copy URL" sx={{fontSize: "25px"}}>
                                        <span><ContentCopyIcon onClick={() => {navigator.clipboard.writeText(`https://polynomial-frontend.netlify.app/#/${text.short_url}/`)}} fontSize="large" color="success" sx={{marginRight: 2, cursor: "pointer"}} /></span>
                                    </Tooltip>
                                    <Tooltip title="Renew Expiry Date" sx={{fontSize: "25px"}}>
                                        <span><AutorenewIcon fontSize="large" color="primary" sx={{marginRight: 2, cursor: "pointer"}} onClick={() => handleRenew(text.id, text.data)} /></span>
                                    </Tooltip>
                                    <Tooltip title="Delete" sx={{fontSize: "25px"}}>
                                        <span><DeleteIcon fontSize="large" sx={{color: "red", cursor: "pointer"}} onClick={() => handleDelete(text.id)} /></span>
                                    </Tooltip>
                                    
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
        </>
    );
}

export default TextListing;