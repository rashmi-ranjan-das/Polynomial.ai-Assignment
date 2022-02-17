import React from "react";
import { useParams } from "react-router-dom";
import TopNav from "../../components/TopNav";
import TextEditor from "../texteditor/TextEditor";
import TextListing from "../texteditor/TextListing";
import TextViewer from "../texteditor/TextViewer";
import { Loading } from "../../components/Loading";

const Home = props => {
    const {text_url} = useParams();

    return(
        <>
        {
            !text_url ?
            <>
                <TopNav />
                <TextEditor />
                <TextListing />
            </>
            :
            <>
                <TopNav />
                <TextViewer text_url={text_url}/>
            </>
        }
        </>
    )
}

export default Home;