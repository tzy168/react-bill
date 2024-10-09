import { NavBar } from "antd-mobile";
import './index.scss';
import dayjs from "dayjs";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBillList } from "@/store/reducer/bill";
import _ from "lodash";
import { DatePicker } from "antd-mobile";
import classNames from "classnames";
import { FrownOutline, SmileFill } from 'antd-mobile-icons';

const Month = () => {
    const [dateVisible, setDateVisible] = useState(false);
    const dispatch = useDispatch();
    const billList = useSelector(state => state.bill.billList);
    const [total, setTotal] = useState(500);
    const [pay, setPay] = useState(0);
    const [income, setIncome] = useState(0);
    const [currentDate, setCurrentDate] = useState(dayjs(new Date()).format('YYYY-MM'));
    const [currentMonthData, setCurrentMonthData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchBillList());
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const filteredData = billList.filter(item => dayjs(item.date).format('YYYY-MM') === currentDate);
        setCurrentMonthData(filteredData);
        caculate(); // 更新计算结果
    }, [currentDate, billList]);

    const caculate = () => {
        const { payAmount, incomeAmount } = billList.reduce((acc, item) => {
            if (dayjs(item.date).format('YYYY-MM') === currentDate) {
                if (item.type === 'pay') {
                    acc.payAmount += item.money;
                } else if (item.type === 'income') {
                    acc.incomeAmount += item.money;
                }
            }
            return acc;
        }, { payAmount: 0, incomeAmount: 0 });

        setPay(payAmount);
        setIncome(incomeAmount);
        setTotal(payAmount + incomeAmount);
    };


    return (
        <div className="monthitem">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(!dateVisible)}>
                        <span className="text">
                            {currentDate}账单
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    <div className='twoLineOverview'>
                        <div className="tongji">
                            <span className="money">{pay} </span>
                            <span className="type">PAY</span>
                        </div>
                        <div className="tongji">
                            <span className="money">{income} </span>
                            <span className="type">INCOME</span>
                        </div>
                        <div className="tongji">
                            <span className="money">{total} </span>
                            <span className="type">TOTAL</span>
                        </div>
                    </div>


                    <ul className="bill-list">
                        {currentMonthData.length === 0 ?
                            <span className="noData">没有账单记录</span>
                            : currentMonthData.map(item => (
                                <li key={item.id} className="bill-item">
                                    <div className='icon'>
                                        {item.type === 'pay' ? <FrownOutline /> : <SmileFill />}
                                    </div>
                                    <div className="info">
                                        <span className="type">{item.type}</span>
                                        <span className="useFor">{item.useFor}</span>
                                        <span className="date">{item.date}</span>
                                    </div>
                                    <span className="money">{item.money}</span>
                                </li>
                            ))
                        }
                    </ul>

                </div>
                <DatePicker
                    className="datePicker"
                    title='日期选择'
                    precision="month"
                    max={new Date()}
                    visible={dateVisible}
                    onClose={() => { setDateVisible(false); }}
                    onConfirm={(val) => setCurrentDate(dayjs(val).format('YYYY-MM'))}
                />
            </div>
        </div>
    );
};

export default Month;
