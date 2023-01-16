import React, {useState} from 'react';
import developerFacade from "../utils/developerFacade.js";
import apiFacade from "../utils/apiFacade.js";

function ProjectHourPage({developerFacade,userFacade}) {

    const [myRecords,setMyRecords] = useState([{id:"",projectId:"",userName:"",hoursSpent:"",userStory:"",description:""}])
    const [editMyRecord,setEditMyRecord] = useState ({id:"",projectId:"",userName:"",hoursSpent:"",userStory:"",description:""})
    const [input,setInput] = useState({projectId:""})
    const [edit, setEdit] = useState(false)

    const editBtnText = () => {
        if(edit){
            return "Click to edit recording"
        } else {
            return "Close"
        }
    }

    const onChange = (evt) => {
        setInput({...input, [evt.target.id]: evt.target.value})
    }

    const onChangeEdit = (evt) => {
        setEditMyRecord({...editMyRecord, [evt.target.id]: evt.target.value})
    }

    const findMyProjectHours = (userName, projectId) => {
        developerFacade.myProjectHoursOnSpecificProject(userName, projectId,(data) => {
            setMyRecords(data)});
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        findMyProjectHours(userFacade.getUserName(),input.projectId)
    }

    const deleteMyRecord = (recordId) => {
        developerFacade.deleteRecording(recordId)
            .then(apiFacade.handleHttpErrors)
    }

    const updateMySpecificRecord = (projectId,recordId,userName,hoursSpent,userStory,description) => {
        developerFacade.updateMyRecording(projectId,recordId,userName,hoursSpent,userStory,description)
    }
    const handleEditSubmit = (evt) => {
        evt.preventDefault();
        updateMySpecificRecord(editMyRecord.projectId,editMyRecord.id,userFacade.getUserName(),editMyRecord.hoursSpent
            ,editMyRecord.userStory,editMyRecord.description)
    }

    console.log(editMyRecord)

    return (
        <div>
            <h1>My records</h1>
            <h3>Search for a specific project id to see your project hours for it.</h3>
            <form onSubmit={handleSubmit}>
            <label>Project id: </label>
            <input style={{width: "350px"}} type="text" placeholder="Enter project id" onChange={onChange} id={"projectId"}/>
            <br/>
            <button>Find recordings</button>
            </form>
            <br/>
            <button onClick={() => setEdit(s => !s)}>{editBtnText()}</button>
            {!edit ? (<div>
                <h3>Please fill out the information below:</h3>
                <form onSubmit={handleEditSubmit}>
                    <label>Id of the project:</label>
                    <input style={{width: "350px"}} type="text" placeholder="Enter id of the project:" onChange={onChangeEdit} id={"projectId"}/>
                    <br/>
                    <label>Id of the record:</label>
                    <input style={{width: "350px"}} type="text" placeholder="Enter id of the record:" onChange={onChangeEdit} id={"id"}/>
                    <br/>
                    <label>User story id:</label>
                    <input style={{width: "350px"}} type="text" placeholder="Enter id of the user story:" onChange={onChangeEdit} id={"userStory"}/>
                    <br/>
                    <label>Hours spent:</label>
                    <input style={{width: "350px"}} type="text" placeholder="Enter amount of hours you spent:" onChange={onChangeEdit} id={"hoursSpent"}/>
                    <br/>
                    <label>Description of your work:</label>
                    <input style={{width: "350px"}} type="text" placeholder="Enter description of your work:" onChange={onChangeEdit} id={"description"}/>
                    <br/>
                    <button>Update recording</button>
                </form>

            </div>) : null

            }

            <div>
                <table className="tableBody">
                    <thead>
                    <tr>
                        <th>Project Id</th>
                        <th>Record Id</th>
                        <th>Hours Spent</th>
                        <th>User Story Id</th>
                        <th>Description</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {myRecords.map((data) => {
                        return (<tr key={data.id}>
                            <td>{data.projectId}</td>
                            <td>{data.id}</td>
                            <td>{data.hoursSpent}</td>
                            <td>{data.userStory}</td>
                            <td>{data.description}</td>
                            <input className = "deleteImage" type="image" src="src/images/delete-512.png" onClick={(e) => deleteMyRecord(data.id,e)}></input>
                        </tr>)
                    })} </tbody>
                </table>
            </div>
        </div>

    );
}

export default ProjectHourPage;