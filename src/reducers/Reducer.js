const initState = {
}


const Reducer = (state = initState, action) => {
    switch (action.type) {

        case 'GET_DATA':
            state.fio=  action.payload.data.suggestions.map((data)=>{
                return data.value
            })

            return {
                ...state,
            }

        default:
            return state
    }
}

export default Reducer;
