import apiFacade from "./apiFacade.js";
import loginFacade from "./loginFacade.js";

import {API_URL} from "../../settings.js";

function AdminFacade () {

    const fetchAllProjects = (updateAction,setErrorMessage) => {
        return apiFacade.fetchData("admin/all",updateAction,setErrorMessage)
    }

    const createProject = (name, description) => {
        const options = apiFacade.makeOptions("POST", null,
            {"projectName": name,
                "projectDescription": description
            }
        )
        return fetch(API_URL + "/api/admin", options)
            .then(apiFacade.handleHttpErrors)
    }

    const assignDeveloperToProject = (userName,projectId) => {
        const options = apiFacade.makeOptions("POST",null)
        return fetch(API_URL+"/api/admin/add/"+userName+"/"+projectId,options)
            .then(apiFacade.handleHttpErrors)
    }


    return {

        fetchAllProjects,
        createProject,
        assignDeveloperToProject

    }
}

const adminFacade = AdminFacade();
export default adminFacade;