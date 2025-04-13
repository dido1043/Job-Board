import React from 'react';

const StatusComponent = ({ status, message }) => {
    return (<span>{status}- {message}</span>);
}
export default StatusComponent;