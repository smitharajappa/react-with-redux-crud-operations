import axios from 'axios';
import * as types from './constants';

const getDeliveries = (deliveries) => ({
    type: types.GET_ALL_DELIVERIES,
    payload: deliveries
})

const deleteDelivery = () => ({
    type: types.DELETE_DELIVERY_BY_ID,
})

const addEvent = () => ({
    type: types.ADD_DELIVERY,
})

const editEvent = () => ({
    type: types.UPDATE_DELIVERY_BY_ID,
})
const getEvent = (delivery) => ({
    type: types.GET_DELIVERY_BY_ID,
    payload: delivery
})


export const loadDeliveries = () => {
    return (dispatch) => {
        axios.get('http://localhost:8080/deliveries').then((resp)=>{
            const data = resp.data.sort((a,b)=> b.id - a.id)
            dispatch(getDeliveries(data))
        }).catch(error => console.log(error))
    }
}

export const deleteDeliveries = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:8080/deliveries/${id}`).then((resp)=>{
            dispatch(deleteDelivery())
            dispatch(loadDeliveries())
        }).catch(error => console.log(error))
    }
}

export const addDeliveries = (delivery) => {
    return (dispatch) => {
        axios.post(`http://localhost:8080/deliveries`, delivery).then((resp)=>{
            dispatch(addEvent())
            dispatch(loadDeliveries())
        }).catch(error => console.log(error))
    }
}

export const getDeliveryById = (id) => {
        return (dispatch) => {
            axios.get(`http://localhost:8080/deliveries/${id}`).then((resp)=>{
                dispatch(getEvent(resp.data))
            }).catch(error => console.log(error))
        }
    }

export const editDeliveries = (id,delivery) => {
    return (dispatch) => {
        axios.put(`http://localhost:8080/deliveries/${id}`, delivery).then((resp)=>{
            dispatch(editEvent())
            dispatch(loadDeliveries())
        }).catch(error => console.log(error))
    }
}