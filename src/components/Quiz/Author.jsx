import React from 'react';
import {useContext} from "react";
import { LangContext } from "../App";

export default function Author(props) {
    const lang = useContext(LangContext);
    const authorStr = (props.author !== null && props.author.username !== null) ? props.author.username : (props.author !== null && props.author.profileName !== null) ? props.author.profileName : lang.dictionary["anonymous"];
    return(
        <div className="flexbox-container-row" style={{alignContent: "right"}}>
            <div  style={{marginTop: "20px"}}>
                <p>{authorStr}</p>
            </div>
            <div style={{padding: "20px"}}>
                {(props.author !== null && props.author.photo !== null && props.author.photo.url !== null) ? <img src={props.author.photo.url} width={50} height={50} style={{borderRadius: 50/2}} alt={lang.dictionary["altImgAuthor"]+authorStr}></img> : <></>}
            </div>
        </div>
    );
}