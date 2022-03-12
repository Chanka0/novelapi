import fetch from 'node-fetch';

export class Generator
{
    auth;
    defaultModel = 'euterpe-v2'
    generationOptions = defaultGeneration;
    constructor(auth)
    {
        this.auth = auth;
    }

    /**
     * What this module is built for. AI text generation.
     * @param {String} input Input text for generation. Maximum length is 14000 characters.
     * @param {String} model Model for text generation. Available models are: [ 2.7B, 6B-v4, euterpe-v2, genji-python-6b, genji-jp-6b, genji-jp-6b-v2, krake-v1 ]
     * @param {*} parameters Generation parameters. Defaults are based on Genisis preset, but can be adjusted or fed through here. Default presets based on Genisis, additional options can be found in the parameters section of AiGenerateRequest: https://api.novelai.net/docs/static/index.html#/
     * @returns JSON: Generated Text
     */
    async Generate(input, model = this.defaultModel, parameters = this.generationOptions)
    {
        return await GGenerateText(this.auth, input, model, parameters)
    }
    
    /**
     * Classifies text based on content. Returns score based on explict words used. Does not function on retail clients. Last checked 03/25/2022
     * @param {String} input Text to classify.
     * @returns JSON
     */
    async Classify(input)
    {
        return await GClassify(this.auth, input);
    }
}

const defaultGeneration = {
    "use_string": true,
    "repetition_penalty": 2.975,
    "repetition_penalty_frequency": 0,
    "repetition_penalty_presence": 0,
    "repetition_penalty_range": 2048,
    "repetition_penalty_slope": 0.09,
    "temperature": 0.63,
    "top_k": 0,
    "top_p": 0.975,
    "tail_free_sampling": 0.975,
    //Minimum: 1
    "min_length": 1,
    //Maximum: 2048
    "max_length": 160,
    "generate_until_sentence": true
}

export async function GGenerateText(auth, input, model, parameters)
{
    const response = await fetch('https://api.novelai.net/ai/generate', 
        {
        method: 'POST', 
        headers: {'Authorization': 'Bearer ' + auth, 'Content-Type': 'application/json'}, 
        body: JSON.stringify({'input': input, 'model': model, 'parameters': parameters})
    });
    return await response.json();
}

export async function GClassify(auth, input)
{
    
    const response = await fetch('https://api.novelai.net/ai/classify', 
        {
        method: 'POST', 
        headers: {'Authorization': 'Bearer ' + auth, 'Content-Type': 'application/json'}, 
        body: JSON.stringify({'input': input})
    });
    return await response.json();
}