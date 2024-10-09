import React, { useEffect, useMemo } from 'react';
import { fetchBillList } from '@/store/reducer/bill';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { NavBar } from 'antd-mobile';
import { FrownOutline, SmileFill } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import _ from 'lodash';

const BillItem = ({ bill }) => (
    <li key={bill.id}>
        <div className='icon'>
            {bill.type === 'pay' ? <FrownOutline /> : <SmileFill />}
        </div>
        <div className="info">
            <span className="type">{bill.type}</span>
            <span className="useFor">{bill.useFor}</span>
            <span className="date">{bill.date}</span>
        </div>
        <span className="money">{bill.money}</span>
    </li>
);

const MonthData = React.memo(({ monthGroup }) => (
    <>
        {Object.entries(monthGroup).map(([month, bills]) => (
            <div key={month}>
                <h2>{month}</h2>
                <ul>
                    {bills.map(bill => (
                        <BillItem bill={bill} key={bill.id} />
                    ))}
                </ul>
            </div>
        ))}
    </>
));

function Year() {
    const dispatch = useDispatch();
    const billList = useSelector(state => state.bill.billList);

    const monthGroup = useMemo(() =>
        _.groupBy(billList, item => dayjs(item.date).format('YYYY')),
        [billList]
    );

    useEffect(() => {
        dispatch(fetchBillList());
    }, [dispatch]);

    return (
        <div className="Year">
            <NavBar className="nav" backArrow={false}>
                ALL BILL
            </NavBar>
            <MonthData monthGroup={monthGroup} />
        </div>
    );
}

export default Year;
