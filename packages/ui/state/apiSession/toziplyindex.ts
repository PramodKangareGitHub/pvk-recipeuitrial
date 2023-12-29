"use client"
import { RecipeSessionFolder } from "types/database";
import { APISessionConfig, APISessionParameters } from ".";
import { RecipeSession, SessionOutput } from "../recipeSession";



export function getDomainName(){
    return  window.location.host.includes('localhost') ? `http://${window.location.host}` : `https://${window.location.host}` ;
}

export async function getSessionsFromMongoDB() {
    const APIHostname = getDomainName();
    const getSessionsResponse = await fetch(`${APIHostname}/api/sessions`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    });
    const data = await getSessionsResponse.json();
    return data.sessions;
}


export async function saveSessionsToMongoDB({ sessions }: { sessions: RecipeSession[] }) {
    const APIHostname = getDomainName();
    const postSessionsResponse = await fetch(`${APIHostname}/api/sessions`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ sessions: sessions }),
    });
    const data = await postSessionsResponse.json();
    return data.message;
}


//#region Parameters

export async function getParametersFromMongoDB({
    session,
}: {
    session: string;
}) {
    const APIHostname = getDomainName();
    const getParametersResponse = await fetch(`${APIHostname}/api/parameters?key=${session}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    });
    const data = await getParametersResponse.json();
    return data.parameter;
}


export async function saveParametersToMongoDB({
    session,
    parameters,
}: {
    session: string;
    parameters: APISessionParameters;
}) {
    const APIHostname = getDomainName();
    const postParameterResponse = await fetch(`${APIHostname}/api/parameters`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ key: session, value: parameters }),
    });
    const response = await postParameterResponse.json();
    return response;
}



export async function deleteParametersFromMongoDB({
    session,
}: {
    session: string;
}) {
    const APIHostname = getDomainName();
    const deleteParamResponse = await fetch(`${APIHostname}/api/parameters`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ key: session }),
    });
    const data = await deleteParamResponse.json();
    return data.message;
}

//#endregion Parameters


//#region CONFIG

export async function getConfigFromMongoDB({
    recipeId,
}: {
    recipeId: string | number;
}) {
    const APIHostname = getDomainName();
    const getConfigResponse = await fetch(`${APIHostname}/api/config?key=${recipeId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    });
    const data = await getConfigResponse.json();
    return data.config;
}


export async function saveConfigToMongoDB({
    recipeId,
    config,
}: {
    recipeId: string | number;
    config: APISessionConfig;
}) {
    const APIHostname = getDomainName();
    const postConfigResponse = await fetch(`${APIHostname}/api/config`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ key: recipeId, value: config }),
    });
    const response = await postConfigResponse.json();
    return response.config;
}


export async function deleteConfigFromMongoDB({
    recipeId,
}: {
    recipeId: string;
}) {
    const APIHostname = getDomainName();
    const deleteParamResponse = await fetch(`${APIHostname}/api/config`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ key: recipeId }),
    });
    const data = await deleteParamResponse.json();
    return data.message;
}


//#endregion CONFIG


//#region Secrets

export async function saveSecretsToMongoDB({
    secretId,
    secretValue,
}: {
    secretId: string;
    secretValue: string;
}) {
    const APIHostname = getDomainName();
    const postSecreteResponse = await fetch(`${APIHostname}/api/secrets`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ key: secretId, value: secretValue }),
    });
    const response = await postSecreteResponse.json();
    return response;
}

export async function getSecretsFromMongoDB({
    secretId,
}: {
    secretId: string;
}) {
    const APIHostname = getDomainName();
    const getSecretResponse = await fetch(`${APIHostname}/api/secrets?key=${secretId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    });
    const data = await getSecretResponse.json();
    return data.secrets;
}



export async function deleteSecretFromMongoDB({
    secretId,
}: {
    secretId: string;
}) {
    const APIHostname = getDomainName();
    const deleteSecreteResponse = await fetch(`${APIHostname}/api/secrets`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ key: secretId }),
    });
    const data = await deleteSecreteResponse.json();
    return data.message;
}
//#endregion Secrets



//#region SessionFolder

export async function getSessionFoldersFromMongoDB() {
    const APIHostname = getDomainName();
    const getSessionFoldersResponse = await fetch(`${APIHostname}/api/sessionfolder`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    });
    const data = await getSessionFoldersResponse.json();
    return data.sessionFolders;
}


export async function saveSessionFoldersToMongoDB({ sessionFolders }: { sessionFolders: RecipeSessionFolder[] }) {
    const APIHostname = getDomainName();
    const postSessionFoldersResponse = await fetch(`${APIHostname}/api/sessionfolder`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ sessionfolders: sessionFolders }),
    });
    const response = await postSessionFoldersResponse.json();
    return response.sessionFolders;
}

//#endregion SessionFolder



//#region Output

export async function getOutputFromMongoDB({
    sessionId,
}: {
    sessionId: string;
}) {
    const APIHostname = getDomainName();
    const getOutputResponse = await fetch(`${APIHostname}/api/output?key=${sessionId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    });
    const data = await getOutputResponse.json();
    return data.outputs;
}

export async function saveOutputToMongoDB({ sessionId, sessionOutput }: {
    sessionId: string;
    sessionOutput: SessionOutput[]
}) {
    const APIHostname = getDomainName();
    const postOutputResponse = await fetch(`${APIHostname}/api/output`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ key: sessionId, value: sessionOutput }),
    });
    const response = await postOutputResponse.json();
    return response.sessionFolders;
}



export async function deleteOutputFromMongoDB({
    sessionId,
}: {
    sessionId: string;
}) {
    const APIHostname = getDomainName();
    const deleteOutputResponse = await fetch(`${APIHostname}/api/output`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ key: sessionId }),
    });
    const data = await deleteOutputResponse.json();
    return data.message;
}

//#endregion Output

