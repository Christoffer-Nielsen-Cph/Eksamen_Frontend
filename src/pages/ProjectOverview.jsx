import React, {useEffect, useState} from 'react';

function ProjectOverview({adminFacade,userFacade}) {

    const [project, setProject] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [createHidden, setCreateHidden] = useState(true);
    const [newProject, setNewProject] = useState({projectName: "", projectDescription: ""})
    const [assign, setAssign] = useState({userName:"",projectId:""})
    const [assignHidden, setAssignHidden] = useState(true);

    useEffect(() => {
        const getData = async () => {
            adminFacade.fetchAllProjects((data) => {
                setProject(data);
            }, "Some error")
        }
        getData();
    }, [refresh]);



    const btnTextCreate = () => {
        if (createHidden) {
            return "Create new project"
        } else {
            return "Close"
        }
    }

    const btnTextAssign = () => {
        if(assignHidden){
            return "Assign a developer to a project"
        } else {
            return "Close"
        }
    }

    const onChange = (evt) => {
        setNewProject({...newProject, [evt.target.id]: evt.target.value})
    }

    const createNewProject = (projectName, projectDescription) => {
        adminFacade.createProject(projectName, projectDescription)
    }
    
    const assignDeveloperToProject = (userName,projectId) => {
        adminFacade.assignDeveloperToProject(userName,projectId)
    }

    const assignFormOnChange = (evt) => {
        setAssign({...assign, [evt.target.id]: evt.target.value})
    }

    const handleAssignDeveloper = (evt) => {
        evt.preventDefault();
        assignDeveloperToProject(assign.userName,assign.projectId)
    }
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        createNewProject(newProject.projectName, newProject.projectDescription);
    }
    const handleRefresh = (evt) => {
        evt.preventDefault
    }

    return (
        <div className={"tableBody"} align="center">
            <h1>List of projects </h1>
            <button onClick={() => setCreateHidden(s => !s)}>{btnTextCreate()}</button>
            {!createHidden ? (<div>
                <h3>Please fill out the information below:</h3>
                <form onSubmit={handleSubmit} onClick={handleRefresh}>
                    <label>Name of the project:</label>
                    <input type="text" placeholder="Enter name:" onChange={onChange} id={"projectName"}/>
                    <label>Description of the project:</label>
                    <input type="text" placeholder="Enter description:" onChange={onChange} id={"projectDescription"}/>
                    <button>Create</button>
                </form>

            </div>) : null

            }

            <button onClick={() => setAssignHidden(s => !s)}>{btnTextAssign()}</button>
            {!assignHidden ? (<div>
                <h3>Please fill out the information below:</h3>
                <form onSubmit={handleAssignDeveloper} onClick={handleRefresh}>
                    <label>Name of the developer:</label>
                    <input type="text" placeholder="Enter name:" onChange={assignFormOnChange} id={"userName"}/>
                    <label>Id of the project you want to add him to:</label>
                    <input type="text" placeholder="Enter id:" onChange={assignFormOnChange} id={"projectId"}/>
                    <button onSubmit={handleAssignDeveloper}>Assign</button>
                </form>

            </div>) : null

            }

            <table className={"blue"}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>Developers</th>
                    <th>Invoice</th>
                </tr>
                </thead>
                <tbody>{project.map((data) => {
                    return (<tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.projectName}</td>
                        <td>{data.projectDescription}</td>
                        <td>{data.users}</td>
                    </tr>)
                })} </tbody>
            </table>
        </div>

    );
}


export default ProjectOverview;