import React, {useState} from 'react';

function Invoice(props) {

    const [invoice,setInvoice] = useState({projectDescription:"",hoursSpent:""})

    return (
        <div>
            <h1>Generate an invoice for a project</h1>

        </div>
    );
}

export default Invoice;