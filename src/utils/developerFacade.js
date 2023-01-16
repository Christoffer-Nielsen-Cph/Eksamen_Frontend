import apiFacade from "./apiFacade.js";
import loginFacade from "./loginFacade.js";
import userFacade from "./userFacade.js";

import {API_URL} from "../../settings.js";

function DeveloperFacade () {

    const myProjects = (userName,updateAction,setErrorMessage) => {
        return apiFacade.fetchData("developer/myProjects/"+userFacade.getUserName(),updateAction,setErrorMessage)
            .then(apiFacade.handleHttpErrors)

    }

    const recordProjectHours = (projectId,userName,hoursSpent,userStory,description) => {
        const options = apiFacade.makeOptions("POST", null,
            {"projectId": projectId,
                "userName": userName,
                "hoursSpent":hoursSpent,
                "userStory":userStory,
                "description":description
            }
        )
        return fetch(API_URL + "/api/developer/record", options)
            .then(apiFacade.handleHttpErrors)
    }

    const myProjectHoursOnSpecificProject = (userName,projectId, updateAction,setErrorMessage) => {
        return apiFacade.fetchData("developer/timeSpent/"+userName+"/"+projectId,updateAction)
            .then(apiFacade.handleHttpErrors)
    }

    const deleteRecording = (recordId) => {
        const options = apiFacade.makeOptions("DELETE",null,null);
        return fetch(API_URL +"/api/developer/"+recordId,options)
            .then(apiFacade.handleHttpErrors)
    }

    const updateMyRecording = (projectId,recordId,userName,hoursSpent,userStory,description) => {
        const options = apiFacade.makeOptions("PUT",null,
            {"id":recordId,
                "projectId":projectId,
                "userName":userName,
                "hoursSpent":hoursSpent,
                "userStory":userStory,
                "description":description

            })
        return fetch(API_URL+"/api/developer/"+recordId,options)
            .then(apiFacade.handleHttpErrors)
    }



    return {

        myProjects,
        recordProjectHours,
        myProjectHoursOnSpecificProject,
        deleteRecording,
        updateMyRecording
    }
}

const developerFacade = DeveloperFacade();
export default developerFacade;
