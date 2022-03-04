import { checkAPI } from './Utils.js';
import { User } from './User.js';
import { defaultGeneration } from './GenerationOptions.js';
import { generateText, classifyText } from './Generation.js';

export class Client {
    auth;
    User;
    defaultModel = 'euterpe-v2';
    generationOptions = defaultGeneration;
    /**
     * Initializes the NovelAI client.
     * @param {String} auth Can be found in browser local storage as auth_token.
     */
    constructor(auth)
    {
        //TODO: Check token validity through basic length check. Seems to be 205, need key another to verify.
        if(auth.length == 205)
        {
            this.auth = auth;
            this.User = new User(auth);
        } else {console.error('ERROR: Invalid Authentication Token')}
    }
    /**
     * Returns current status of API.
     * @returns HTTPS Status Code
     */
    async APIStatus()
    {
        return await checkAPI();
    }
    /**
     * Generates text using given input.
     * @param {String} input 
     * @param {String} model 
     * @param {Object} parameters 
     * @returns json
     */
    async generateText(input, model = this.defaultModel, parameters = this.generationOptions)
    {
        //TODO: Input sanitization
        if(input.length >= 1 && input.length <= 14000){
            return await generateText(this.auth, input, model, parameters);
        } else {
            console.error("Input size not within range of 1 to 14000 characters.");
        }
    }
    /**
     * Currently does not function for retail accounts. Unable to be tested during development as developer lacks access to non-retail accounts.
     * @param {String} input 
     * @returns json
     */
    async Classify(input)
    {
        return await classifyText(this.auth, input);
    }
}