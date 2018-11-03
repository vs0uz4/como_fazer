const axios = require('axios')
const baseURL = 'https://como-fazer-add43.firebaseio.com/'

const echo = async() => {
    const result = await axios.get(baseURL + '/api_echo.json')
    const content = !(result.data) ? 'Enjoy the Silence!' : result.data

    return content
}

const list = async(key) => {
    const result = await axios.get(baseURL + key + '.json')
    const content = !(result.data) ? [] : result.data

    const objects = Object
                        .keys(content)
                        .map(key => {
                            return {
                                id: key,
                                ...content[key]
                            }
                        })
    return objects
}

const get = async(key, id) => {
    const content = await axios.get(`${baseURL}/${key}/${id}.json`)
    return {
        id: id,
        ...content.data
    }
}

const create = async(key, data) => {
    await axios.post(`${baseURL}/${key}.json`, data)
    return true
}

const update = async(key, id, data) => {
    await axios.put(`${baseURL}/${key}/${id}.json`, data)
    return true
}

const destroy = async(key, id) => {
    await axios.delete(`${baseURL}/${key}/${id}.json`)
    return true
}

module.exports = {
    echo, list, get, create, update, destroy
}
