import axios from 'axios'
export const getFio = (data) => dispatch => {

    const url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio"

    var token = "e485eb2ea7c95a4721ac6fa303d35800830ace1d"
    const headers = {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        'Authorization': "Token " + token
    }

    axios.post(url, { query:data }, {
        headers: headers
    })
        .then((response) => {
            dispatch({
                type:"GET_DATA",
                payload:{data:response.data}
            })
        })
        .catch((error) => {
            dispatch({
                type: "Err"
            })
        })

}
