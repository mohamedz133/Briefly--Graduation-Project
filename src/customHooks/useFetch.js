import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actions } from '../redux/slices/NotifySlice';

function useFetch() {

    const [data, setData] = useState('');
    const dispatch = useDispatch()

    async function sendRequest(url, options) {

        let response
        // this .? handle if the options. is not exist
        console.log(`Request  ${options.name}`);
        if (options.method.toUpperCase() === 'GET') {

            response = await fetch(url, {
                method: 'GET',
                headers: {

                    ...(options.token && { Authorization: `Bearer ${options.token}` }),
                },

            });
        }
        else {
            // #debug console.log(options.body);
            response = await fetch(url, {
                method: options.method,
                headers: {
                    ...(options.method === 'POST' && { 'Content-Type': 'application/json' }),
                    ...(options.token && { Authorization: `Bearer ${options.token}` }),
                },
                body: (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH') && JSON.stringify(options.body)
            });



        }

        try {
            console.log('Response object');
            console.log(response);

            if (response.ok) {

                if (options?.onOk) {
                    options.onOk(response)
                    console.log('fffffffffff')
                }
                let jsonData = await response.json()
                console.log(jsonData)
                if (jsonData.statusCode === 200 || jsonData.statusCode === 201) {
                    if (options?.onSucceed) {
                        options.onSucceed(jsonData)
                    }

                    console.log(` response.ok success , jsonData.statusCode success in ${options?.name} ...`)//for devs
                    if (options?.jsonSuccessProp) {
                        

                        dispatch(actions.setSuccess(`${jsonData[options.jsonSuccessProp]}`))//for user
                        setTimeout(() => dispatch(actions.setSuccess(``)), 3000)

                    }
                    console.log(`jsonData`)
                    console.log(jsonData)
                    setData(jsonData)
                    // call the callback 
                    // 1. ex add Token to local Storage
                    // 2. navigate to other route
                    // call onSuccess with the new state


                }

                else {
                    console.log(` response.ok success , jsonData.statusCode failed in ${options?.name} ...`)//for devs
                    //an api have jsonData.errors
                    if (options?.onFailed) {
                        options.onFailed(jsonData)
                    }
                    if (options?.jsonFailProp) {
                        //if method exist its arrary
                        if (options.jsonFailProp.foreach) {
                            console.log(jsonData[options.jsonFailProp][0]);
                            dispatch(actions.setError(`${jsonData[options.jsonFailProp][0]}`))

                        }
                        else {
                            dispatch(actions.setError(`${jsonData[options.jsonFailProp]}`))

                        }
                        setTimeout(() => dispatch(actions.setError(``)), 2000)


                    }
                    setData(jsonData)
                    console.log(`jsonData`)
                    console.log(jsonData)



                }




            } else {
                if (options?.onOkFailed) {
                    options.onOkFailed(response)
                }
                let jsonData = await response.json()

                console.log(` response.ok failed   ${options?.name} ...`)//for devs
                if (options?.jsonFailProp) {
                    //if method exist its arrary
                    if (options.jsonFailProp.foreach) {
                        console.log(jsonData[options.jsonFailProp][0]);
                        dispatch(actions.setError(`${jsonData[options.jsonFailProp][0]}`))
                    }
                    else {
                        dispatch(actions.setError(`${jsonData[options.jsonFailProp]}`))

                    }
                    setTimeout(() => dispatch(actions.setError(``)), 3000)

                }
                setData(jsonData)

                console.log(`jsonData`)
                console.log(jsonData)
                if (options?.onSucceedFailed) {
                    options.onSucceedFailed(jsonData)
                }


            }

            // throw new Error(`throw Err from response.ok ${options?.name} ...`)
        }


        catch (err) {

            console.log(err)//for devs

            dispatch(actions.setError(err))//for user

        }


    }


    return [data, setData, sendRequest]//return the result state


}

export default useFetch