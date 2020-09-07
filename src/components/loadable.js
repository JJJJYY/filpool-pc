import React from 'react';
import Loadable from 'react-loadable';

const loadingComponent =()=>{
    return (
        <div></div>
    )
};

export default (router, loading) => {
    return Loadable({
        loader: router,
        loading: loading || loadingComponent
    });
}