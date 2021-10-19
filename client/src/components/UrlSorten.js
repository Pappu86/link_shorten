import { React, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import validator from 'validator';
import copy from 'copy-text-to-clipboard';

const UrlSorten = () => {
    const inputRef = useRef(null);
    const [shortenURLs, setShortenURLs] = useState([]);
    const [inputText, setInput] = useState(''); // '' is the initial state value
    const [errMsg, setErrMsg] = useState('');
    const [isCopy, setCopy] = useState('');
    const baseUrl = 'http://localhost:3000/';

    useEffect(() => {
        // Get all shorted link list
        axios.get('http://localhost:4000/allShortenUrls').then(res => {
            const { shortenUrls } = res.data || [];
            setShortenURLs(shortenUrls);
        });
    }, [shortenURLs]);

    const handelShortenUrl = (e) => {
        let url = inputText;
        let isValidDomain = validator.isURL(url, { require_valid_protocol: false }); // Domain validation check

        if (!url || !isValidDomain) {
            setErrMsg("Please, provide a valid url");
            destroyNotification(true, setErrMsg);
        } else {
            axios.post('http://localhost:4000/generateShortenUrl', { url }).then(res => {
                const { slug } = res.data;
                if (slug) {
                    setInput(baseUrl + slug);
                    setCopy(true);
                }
            });
        }
    };

    // Copied input text
    const handelCopyShortenUrl = (e) => {
        inputRef.current.select();
        copy(inputText);
    };

    // Copied short link url 
    const handelCopyShortenLink = (id) => {
        let text = document.getElementById('616e87fa4aa6f85cbaba63f5').innerText;
        copy(text);
    };

    // Destroy error notification
    const destroyNotification = (isError, setErrMsg) => {
        if (isError) {
            setTimeout(function () {
                setErrMsg('');
            }, 2000);
        }
    };

    return (
        <div className="container">
            <div><h1 className="page-title">Generate Short Link</h1></div>
            <div className="form-row align-items-center">
                <div className="col-auto">
                    <input type="text" ref={inputRef} className="form-control sorten-link" placeholder="Shorten your link" onInput={e => setInput(e.target.value)} value={inputText} />
                    {isCopy ? (
                        <button className="btn btn-primary shorten-btn" onClick={handelCopyShortenUrl}>Copy</button>
                    ) : (
                        <button className="btn btn-primary shorten-btn" onClick={handelShortenUrl}>Sorten</button>
                    )}
                </div>
                {errMsg &&
                    <div className="alert alert-danger mt-20" role="alert">
                        {errMsg}
                    </div>
                }
                <div className="card mt-20">
                    <div className="card-body">
                        {shortenURLs.map((shortenURL, index) => (
                            <div className="row url-row" key={index}>
                                <div className="col-sm-6">{shortenURL.url}</div>
                                <div className="col-sm-6 text-right">
                                    <a className="mr-20" href={baseUrl + shortenURL.slug} id={shortenURL._id} target="_blank">{baseUrl}{shortenURL.slug}</a>
                                    <button className="btn btn-primary" onClick={() => handelCopyShortenLink(shortenURL._id)}>Copy</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UrlSorten;