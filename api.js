const axios = require('axios')
const baseURL = 'https://como-fazer-add43.firebaseio.com/'
const auth = '9VzM4j4d6YaMyG3P41HTvytxaazduyaxIWOwWGYt'

const echo = async() => {
    const result = await axios.get(baseURL + '/api_echo.json?auth=' + auth)
    const content = !(result.data) ? 'Enjoy the Silence!' : result.data
    return content
}

const list = async(key) => {
    const result = await axios.get(baseURL + key + '.json?auth=' + auth)
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

const listEntityByEntity = async(key) => {
    const result = await axios.get(baseURL + key + '.json?auth=' + auth)
    const content = !(result.data) ? [] : result.data
    const objects = Object
                    .keys(content)
                    .map(key => {
                        const posts = content[key]
                        const post = Object
                            .keys(posts)
                            .map(key => {
                                return {
                                    id: key,
                                    ...posts[key]
                                }
                            })
                        return {
                            id: key,
                            post: post 
                        }
                    })
    return objects
}

const get = async(key, id) => {
    const content = await axios.get(`${baseURL}/${key}/${id}.json?auth=${auth}`)
    return {
        id: id,
        ...content.data
    }
}

const create = async(key, data) => {
    await axios.post(`${baseURL}/${key}.json?auth=${auth}`, data)
    return true
}

const update = async(key, id, data) => {
    await axios.put(`${baseURL}/${key}/${id}.json?auth=${auth}`, data)
    return true
}

const destroy = async(key, id) => {
    await axios.delete(`${baseURL}/${key}/${id}.json?auth=${auth}`)
    return true
}

module.exports = {
    echo, list, listEntityByEntity, get, create, update, destroy
}
