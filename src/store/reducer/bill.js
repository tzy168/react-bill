import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from 'lodash';
import dayjs from "dayjs";
const billStore = createSlice({
    name: 'bill',
    initialState: {
        yearBillList: [],
        monthBillList: [],
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload;
        },
        add: (state, action) => {
            state.billList.push({
                ...action.payload,
            });
        },
        addMonthBill: (state, action) => {
            state.monthBillList.push({
                ...action.payload,
            });
        }
    }
})

const { setBillList, add, addMonthBill } = billStore.actions;

const billReducer = billStore.reducer
const fetchBillList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3001/ka');
        //console.log(res.data);  // for testing, remove before production
        dispatch(setBillList(_.sortBy(res.data, 'date').reverse()));
    }
}

const addBill = (value) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:3001/ka', value);
        const bill = res.data;
        // if (bill.date === dayjs(new Date()).format('YYYY-MM-DD')) {
        dispatch(add(bill));
        // }
        // if (bill.date === dayjs(new Date()).format('YYYY-MM')) {
        //     dispatch(addMonthBill(res.data));
        // }

    }
}

export { fetchBillList, addBill }
export default billReducer;