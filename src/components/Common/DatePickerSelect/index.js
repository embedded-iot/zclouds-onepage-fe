import React from 'react';
import { Button, DatePicker } from 'antd';
import './style.scss';
import Icon from 'components/Common/Icon';
import closeIcon from 'images/close-icon.svg';
import moment from 'moment/moment';
import { DATA_DATE_FORMAT } from 'components/contants';
import { datetime } from 'utils';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';

const { RangePicker } = DatePicker;

export default function DatePickerSelect({ name, defaultValue, value, options, onChange, placeholder, isSingleSelection = false, isShowExtraFooter = true, theme, ...restProps }) {
  const handlerOnChange = (date, dateString) => {
    onChange(date, dateString, name);
  };
  const DatePickerWrapper = isSingleSelection ? DatePicker : RangePicker;
  const handleExtraButtonSelect = (fromDate = new Date(), toDate= new Date()) => {
    onChange([moment(fromDate, DATA_DATE_FORMAT), moment(toDate, DATA_DATE_FORMAT)],
      [datetime.convert(fromDate, DATA_DATE_FORMAT), datetime.convert(toDate, DATA_DATE_FORMAT)],
      name);
  };
  const today = new Date();
  const buttonList = [
    <Button onClick={() => handleExtraButtonSelect(today)}>Today</Button>,
    <Button onClick={() => handleExtraButtonSelect(datetime.getPreviousDay(today, 6))}>Last 7 days</Button>,
    <Button onClick={() => handleExtraButtonSelect(datetime.getPreviousDay(today, 13))}>Last 14 days</Button>,
    <Button onClick={() => handleExtraButtonSelect(datetime.getPreviousDay(today, 29))}>Last 30 days</Button>,
    <Button onClick={() => handleExtraButtonSelect(datetime.getPreviousDay(today, 59))}>Last 60 days</Button>,
  ];

  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };

  return (
    <DatePickerWrapper
      className={`date-picker-select ${theme}`}
      onChange={handlerOnChange}
      clearIcon={<Icon src={closeIcon} width={18} height={18} />}
      value={value}
      disabledDate={disabledDate}
      renderExtraFooter={() => isShowExtraFooter && <ButtonListWrapper className="date-picker-select__extra-footer" buttonList={buttonList} />}
      {...restProps}
    />
  )
}
