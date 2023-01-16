import React, {useState} from 'react';

function ProjectHourPage(props) {

    const [myRecords,setMyRecords] = useState()

    return (
        <div>
            <h1>My records</h1>
            <h3>Search for a specific project (name) to see your project hours for it.</h3>
        </div>
    );
}

export default ProjectHourPage;