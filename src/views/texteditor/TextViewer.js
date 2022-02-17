import React, {useEffect} from "react";
import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";
import { Loading } from "../../components/Loading";
import { Navigate, useParams } from "react-router-dom";
import { styled } from '@mui/system';
import CopyToClipboard from "@uxui/copy-to-clipboard-react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SelectInput from "@mui/material/Select/SelectInput";

const Pane = styled("div")({
    padding: "8px 10px",
    backgroundColor: "#fafafa",
    borderRadius: "3px",
    border: "1px solid #dddddd",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    fontFamily: "sans-serif",
    fontSize: "16px"
  });
  
  const Container = styled("div")({
    width: "320px",
    margin: "10px auto",
    marginTop: '-12px'
  });

const TextViewer = props => {
    const textRef = React.useRef();
    const text_url = props.text_url;
    const [code, setCode] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [ip, setIp] = React.useState('');
    const [state, setState] = React.useState({data:{}})
    

    useEffect(() => {
        setLoading(true);
        fetch(`https://polynomialai-backend.herokuapp.com/${text_url}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(res=> {
            console.log("pppp", res)
            var user_text_id = res.id
            setCode(res);
            if (res.data.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
                if (res.data.includes("http")){
                    var ok = window.confirm("Do you want to redirect ?")
                    if(ok){
                        window.location.replace(res.data)
                    }
                } else {
                    var ok = window.confirm("Do you want to redirect ?")
                    if(ok){
                        window.location.replace(`https://${res.data}`)
                    }
                }
            }
            fetch('https://api.bigdatacloud.net/data/client-ip/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log("qqqq", res)
                setIp(res.ipString)
                fetch('https://polynomialai-backend.herokuapp.com/api/ip/', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ip_address: res.ipString,
                        user_text: user_text_id
                    })
                })
                .then(res => res.json())
                .then(res => {
                    console.log("aaaa", res)
                    fetch(`https://polynomialai-backend.herokuapp.com/api/ip?text=${text_url}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(res => res.json())
                    .then(res => {
                        console.log("iiii", res)
                        setState(new_state => ({
                            ...new_state,
                            data:{
                                ...new_state.data,
                                ip_list: res
                            }
                        }))
                        setLoading(false);
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))
    }, []);

    function handleDecryptData(){
        var key = prompt("Enter Decryption Key")
        fetch("https://classify-web.herokuapp.com/api/decrypt", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: code.data, key: key})
        })
        .then(res => res.json())
        .then(res => {
            console.log("wwww", res)
            const element = document.createElement("a");
            const file = new Blob([res.result], {
            type: "text/plain"
            });
            element.href = URL.createObjectURL(file);
            element.download = "myFile.txt";
            document.body.appendChild(element);
            element.click();
        })
        .catch(err => console.log(err))
    }

    function handleDecryptDataView(){
        var key = prompt("Enter Decryption Key")
        fetch("https://classify-web.herokuapp.com/api/decrypt", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: code.data, key: key})
        })
        .then(res => res.json())
        .then(res => {
            console.log("wwww", res)
            setCode({data: res.result})
        })
        .catch(err => console.log(err))
    }


    console.log(text_url)
    return (
        <>
        {
            loading ? <Loading />
            :
            <>
            <div style={{padding: "32px"}}>
                <CodeEditor
                    value={code.data}
                    ref={textRef}
                    language="text"
                    placeholder="Please Enter or Paste your text here"
                    disabled
                    padding={15}
                    style={{
                        backgroundColor: "#ffffff",
                        marginTop: '100px',
                        fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        fontSize: 14,
                        height: "300px",
                        overflowY: "scroll"
                    }}
                />
                {
                    code.encrypted ? 
                    <>
                        <button className="btn btn-primary mt-15 ml-10" onClick={handleDecryptData}>Decrypt Data and Download</button>
                        <button className="btn btn-primary mt-15 ml-10" onClick={handleDecryptDataView}>Decrypt Data and View</button>
                    </>
                    :
                    null
                }
            </div>
                    <Container>
                        <b>Generated URL</b>
                        <Pane role="button" onClick={() => {navigator.clipboard.writeText(`https://polynomial-frontend.netlify.app/#/${text_url}/`)}} style={{cursor: "pointer"}}>
                        <span>{`https://polynomial-frontend.netlify.app/#/${text_url}/`}</span>
                        <div
                            role="button"
                            onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}
                            tabIndex={0}
                        >
                            <ContentCopyIcon />
                        </div>
                        </Pane>
                    </Container>
            </>
        }
        {
            state.data.ip_list && state.data.ip_list.length > 0 ?
            <>
            <div style={{padding: '0px 32px 32px 32px'}}>
                <p className="primaryHeading mb-5">Access Details</p>
                <table className="table table-responsive" style={{backgroundColor: '#fff'}}>
                    <thead style={{borderBottom: '1px solid #dedede', backgroundColor: '#fff' }}>
                        <tr>
                            <th>Accessed At</th>
                            <th>Ip Address</th>
                            <th className="text-right"></th>
                        </tr>
                    </thead>
                                    
                    <tbody style={{ height: '350px', overflowY: 'auto' }}>                       
                        {
                            state.data.ip_list && state.data.ip_list.map(text => (

                                <tr>
                                    <td>{text.accessed}</td>
                                    <td>
                                        {text.ip_address}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </>
            :
            null
        }
        </>
    );
}

export default TextViewer;