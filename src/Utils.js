import fetch from 'node-fetch';
/**
 * Queries the NovelAI API for status.
 * @returns HTTPS Status
 */
export async function checkAPI()
{
    const response = await fetch('https://api.novelai.net/');
    return response;
}