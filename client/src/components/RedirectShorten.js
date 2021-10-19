import React from 'react';
import axios from 'axios';
import Loader from "react-js-loader";

const RedirectShorten = ({ match }) => {
    const { slug } = match.params || '';

    axios.get('http://localhost:4000/redirectOriginUrl/' + slug,).then(res => {
        if (res.status === 200) {
            window.open(res.data.url, '_self');
        }
    });

    return (
        <div>
            <div className="loader-area">
                <div className={"item"}>
                    <Loader type="spinner-default" bgColor={"#007bff"} title={""} color={'#007bff'} size={100} />
                </div>
            </div>
        </div >
    )
}

export default RedirectShorten;