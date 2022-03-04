import fetch from 'node-fetch';

/**
 * 
 * @param {String} auth 
 * @param {String} input Input text for generation.
 * @param {String} model Model for text generation. Available models are: [ 2.7B, 6B-v4, euterpe-v0, euterpe-v2, genji-python-6b, genji-jp-6b, genji-jp-6b-v2, pile-test ]
 * @param {*} parameters Generation parameters. Defaults are created upon NovelAPI initialization, but can be adjusted or fed through here.
 * @returns JSON: Generated Text
 */
export async function generateText(auth, input, model, parameters)
{
    
    const response = await fetch('https://api.novelai.net/ai/generate', 
        {
        method: 'POST', 
        headers: {'Authorization': 'Bearer ' + auth, 'Content-Type': 'application/json'}, 
        body: JSON.stringify({'input': input, 'model': model, 'parameters': parameters})
    });
    return await response.json();
}

/**
 * 
 * @param {String} auth 
 * @param {String} input Text to classify. Does not function on retail clients. Last checked 03/25/2022
 * @returns JSON
 */
export async function classifyText(auth, input)
{
    
    const response = await fetch('https://api.novelai.net/ai/classify', 
        {
        method: 'POST', 
        headers: {'Authorization': 'Bearer ' + auth, 'Content-Type': 'application/json'}, 
        body: JSON.stringify({'input': input})
    });
    return await response.json();
}