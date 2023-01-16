import React, {useEffect, useState} from 'react';
import apiFacade from "../utils/apiFacade.js";

function DeveloperPage({developerFacade,userFacade}) {

    const [myProjects,setMyProjects] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [recordHidden, setRecordHidden] = useState(true);
    const [newRecord,setNewRecord] = useState ({projectId:"",hoursSpent:"",userStory:"",description:""});
    const [error,setError] = useState ();

    useEffect(() => {
        const getData = async () => {
            developerFacade.myProjects(userFacade.getUserName,(data) => {
                setMyProjects(data);
            }, "Some error")
        }
        getData();
    }, [refresh]);

    const btnTextRecord = () => {
        if(recordHidden){
            return "Click here to record your project hours"
        } else {
            return "Close"
        }
    }

    const onChange = (evt) => {
        setNewRecord({...newRecord, [evt.target.id]: evt.target.value})
        console.log(newRecord)
    }

    const createNewRecord = (projectId,userName,hoursSpent,userStory,description) => {
        developerFacade.recordProjectHours(projectId, userName,hoursSpent,userStory,description)
    }

    const handleNewRecord = (evt) => {
        evt.preventDefault();
        createNewRecord(newRecord.projectId,userFacade.getUserName(),newRecord.hoursSpent,newRecord.userStory,newRecord.description)
        alert("Your record has been saved!")
    }


    return (
        <div className={"tableBody"} align="center">
        <h1>My projects</h1>

            <button onClick={() => setRecordHidden(s => !s)}>{btnTextRecord()}</button>
            {!recordHidden ? (<div>
                <h3>Please fill out the information below:</h3>
                <form onSubmit={handleNewRecord}>
                    <label>Id of the project:</label>
                    <input type="text" placeholder="Enter id of the project:" onChange={onChange} id={"projectId"}/>
                    <label>User story id:</label>
                    <input type="text" placeholder="Enter id of the user story:" onChange={onChange} id={"userStory"}/>
                    <label>Hours spent:</label>
                    <input type="text" placeholder="Enter amount of hours you spent:" onChange={onChange} id={"hoursSpent"}/>
                    <label>Description of your work:</label>
                    <input type="text" placeholder="Enter description of your work:" onChange={onChange} id={"description"}/>
                    <p>{error}</p>
                    <button>Send information</button>
                </form>

            </div>) : null

            }
            <table className={"blue"}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Project Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>{myProjects.map((data) => {
                    return (<tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.projectName}</td>
                        <td>{data.projectDescription}</td>

                    </tr>)
                })} </tbody>
            </table>
        </div>
    );
}

export default DeveloperPage;