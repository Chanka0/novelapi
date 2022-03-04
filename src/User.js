import fetch from 'node-fetch';

export class User
{
    auth;
    constructor(auth)
    {
        this.auth = auth;
    }

    async Login()
    {
        return await ULogin(this.auth)
    }
    async GetUser()
    {
        return await UGetUser(this.auth)
    }
    async GetPriority()
    {
        return await UPriority(this.auth)
    }
    async GetSubscription()
    {
        return await UUserSubscription(this.auth)
    }
    async GetKeystore()
    {
        return await UGetKeystore(this.auth)
    }
    async SetKeystore(keystore, index)
    {
        return await UPutKeystore(this.auth, keystore, index)
    }
    async GetClientSettings()
    {
        return await UGetSettings(this.auth)
    }
    async SetClientSettings(settings)
    {
        return await UPutSettings(this.auth, settings)
    }
}


/**
 * 
 * @param {String} accessKey 64 character string.
 * @returns JSON: authToken on successful login
 */
async function ULogin(authToken, accessKey)
{
    const response = await fetch('https://api.novelai.net/user/login', 
        {
        method: 'POST', 
        headers: {'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json'}, 
        body: JSON.stringify({'key': accessKey})
    });
    return await response.json();
}
/**
 * 
 * @param {String} authToken 
 * @returns JSON: User Account Information
 */
async function UGetUser(authToken)
{
    const response = await fetch('https://api.novelai.net/user/information', 
        {
        method: 'GET', 
        headers: {'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json'}
    });
    return await response.json();
}
/**
 * 
 * @param {String} authToken 
 * @returns JSON: User Priority Info
 */
async function UPriority(authToken)
{
    const response = await fetch('https://api.novelai.net/user/priority', 
        {
        method: 'GET', 
        headers: {'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json'}
    });
    return await response.json();
}
/**
 * Returns subscription info.
 * @param {String} authToken 
 * @returns JSON: User Subscription Info
 */
async function UUserSubscription(authToken)
{
    const response = await fetch('https://api.novelai.net/user/subscription', 
        {
        method: 'GET', 
        headers: {'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json'} 
    });
    return await response.json();
}
/**
 * Retrieves user keystore. Much larger than an authkey, unsure of use.
 * @param {String} authToken 
 * @returns JSON: User Keystore.
 */
async function UGetKeystore(authToken)
{
    const response = await fetch('https://api.novelai.net/user/keystore', 
        {
        method: 'GET', 
        headers: {'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json'}
    });
    return await response.json();
}

/**
 * Changes the keystore and the index. Unsure of use.
 * @param {String} authToken 
 * @param {String} keystore
 * @param {Number} index
 * @returns HTTPS Status 200
*/
async function UPutKeystore(authToken, keystore, index)
{
     const response = await fetch('https://api.novelai.net/user/keystore', 
         {
         method: 'PUT', 
         headers: {'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json'},
         body: JSON.stringify({'keystore': keystore, 'changeIndex': index})
     });
     return await response;
}

/**
 * Retrieves user client settings.
 * @param {String} authToken 
 * @returns JSON: User Settings
 */
async function UGetSettings(authToken)
{
    const response = await fetch('https://api.novelai.net/user/clientsettings', 
        {
        method: 'GET', 
        headers: {'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json'}
    });
    return await response.json();
}

/**
 * This is a weird one. Doesn't accept JSON body, just a single string. ¯\_(ツ)_/¯
 * @param {String} authToken 
 * @param {String} settings 
 * @returns HTTPS Status 200
 */
async function UPutSettings(authToken, settings)
{
    const response = await fetch('https://api.novelai.net/user/clientsettings', 
        {
        method: 'PUT', 
        headers: {'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json'},
        body: {settings}
    });
    return await response;
}