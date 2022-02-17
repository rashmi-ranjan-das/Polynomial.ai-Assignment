import React, {useEffect} from "react";
import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";
import { Loading } from "../../components/Loading";
import { useParams, Navigate } from "react-router-dom";

const TextEditor = props => {
    const textRef = React.useRef();
    const {text_url} = useParams(); 
    const [code, setCode] = React.useState('');
    const [redirect, setRedirect] = React.useState(false);
    const [url, setUrl] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (textRef.current) {
            const obj = new SelectionText(textRef.current);
            console.log("obj:", obj);
        }
    }, []);

    function handleEncryptSubmit(){
        console.log("papu", code);
        var key = prompt('Enter Encyption Key')
        setLoading(true);
        fetch("https://classify-web.herokuapp.com/api/encrypt", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: code, key: key})
        })
        .then(res => res.json())
        .then(res => {
            fetch('https://polynomialai-backend.herokuapp.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: res.result, encrypted: true})
            })
            .then(res => res.json())
            .then(res => {
                console.log("res", res);
                setUrl(`/${res.short_url}/`)
                setRedirect(true);
                setLoading(false)
            })
            .catch(err => console.log("err", err))
        })
        .catch(err => console.log(err))
    }

    function handleSubmit() {
        console.log("papu", code);
        setLoading(true);
        fetch('https://polynomialai-backend.herokuapp.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: code})
        })
        .then(res => res.json())
        .then(res => {
            console.log("res", res);
            setUrl(`/${res.short_url}/`)
            setRedirect(true);
            setLoading(false)
        })
        .catch(err => console.log("err", err))
    }

    console.log(text_url)
    return (
        <>
        {
            redirect ? <Navigate to={url} /> : null
        }
        {
            loading ? <Loading /> : null
        }
            <div style={{padding: "32px"}}>
                <p className="primaryHeading" style={{marginTop: '60px'}}>Enter or Paste Text Below</p>
                <CodeEditor
                    value={code}
                    ref={textRef}
                    language="text"
                    placeholder="Please Enter or Paste your text here"
                    onChange={(evn) => setCode(evn.target.value)}
                    padding={15}
                    style={{
                        backgroundColor: "#ffffff",
                        marginTop: '5px',
                        fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        fontSize: 14,
                        height: "400px",
                        overflowY: "scroll"
                    }}
                />
                <button className="btn btn-primary mt-15" onClick={handleSubmit}>Save and Generate URL</button>
                <button className="btn btn-primary mt-15 ml-10" onClick={handleEncryptSubmit}>Encrypt, Save and Generate URL</button>
            </div>
        </>
    );
}

export default TextEditor;