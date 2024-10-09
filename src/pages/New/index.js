import { addBill } from "@/store/reducer/bill";
import { Space, Input, Button, DatePicker, notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidV4 } from 'uuid';
import dayjs from 'dayjs';
import './index.scss';

const New = () => {
    const dispatch = useDispatch();
    const [billMoney, setBillMoney] = useState('');
    const [billType, setBillType] = useState('pay');
    const [billUseFor, setBillUseFor] = useState('');
    const [billDate, setBillDate] = useState(dayjs().format('YYYY-MM-DD HH:mm'));
    const finalMoney = billType === 'pay' ? -Math.abs(billMoney) : Math.abs(billMoney);

    const disabledDate = (current) => current && current > dayjs().endOf('day');

    const handleNew = () => {
        if (billMoney && billUseFor && billType && billDate) {
            dispatch(addBill({
                type: billType,
                money: finalMoney,
                date: billDate,
                useFor: billUseFor,
                id: uuidV4()
            }));
            notification.success({ message: '成功', description: '新账单已添加' });
            resetForm();
        } else {
            notification.error({ message: '错误', description: '请填写所有信息' });
        }
    };

    const resetForm = () => {
        setBillMoney('');
        setBillUseFor('');
        setBillDate(dayjs().format('YYYY-MM-DD HH:mm'));
        setBillType('pay');
    };

    const onChange = (date, dateString) => {
        if (date) {
            setBillDate(dateString + ' 23:59');
        }
    };

    return (
        <div className="New">
            <h2>记一笔</h2>
            <Input
                size="large"
                addonBefore="￥"
                className="bill-input"
                type="number"
                placeholder="0.00"
                value={billMoney}
                onChange={e => setBillMoney(e.target.value)}
            />
            <Space direction="vertical">
                <DatePicker onChange={onChange} disabledDate={disabledDate} />
            </Space>
            <div className="button-group">
                <Button
                    type={billType === 'pay' ? 'primary' : 'default'}
                    onClick={() => setBillType('pay')}
                >
                    支出
                </Button>
                <Button
                    type={billType === 'income' ? 'primary' : 'default'}
                    onClick={() => setBillType('income')}
                >
                    收入
                </Button>
            </div>
            <Input
                className="bill-input"
                type="text"
                placeholder="用途"
                value={billUseFor}
                onChange={e => setBillUseFor(e.target.value)}
            />
            <Button className="submit-button" onClick={handleNew}>记一笔</Button>
        </div>
    );
};

export default New;
