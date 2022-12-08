import { format, addDays } from 'date-fns';
import React, { useState } from 'react';
import { DateRange, DateRangePicker } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { IoCalendarSharp } from 'react-icons/io5';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const Datepicker = () => {
  const [openDate, setOpenDate] = useState(false);
  const [disabled, setDisabled] = useState();

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const date1 = date[0].startDate;
  const date2 = date[0].endDate;
  const start = new Date();

  // console.log(date1);

  const numberOfDays = (date1: any, date2: any) => {
    const diff = Math.abs(date1 - date2);
    // console.log(diff);
    return diff / (1000 * 60 * 60 * 24);
  };
  // console.log(numberOfDays);
  const Days = numberOfDays(date1, date2);

  return (
    <>
      {/* <div
        onClick={() => setOpenDate(!openDate)}
        className='p-4 bg-slate-400 item-center text-center text-white cursor-pointer'>
        <div>
          <IoCalendarSharp />
          <span>{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
            date[0].endDate,
            'MM/dd/yyyy'
          )}`}</span>
        </div>
      </div> */}
      <div>
        {Days} {Days > 1 ? 'Nights in room' : 'Night in room'}
      </div>
      <div className='w-fit h-fit mx-auto rounded-lg md:hidden'>
        {/* <span>{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
          date[0].endDate,
          'MM/dd/yyyy'
        )}`}</span> */}
        <br />
        {/* <div className='flex justify-end mb-4 rounded-full drop-shadow-6x'>
          <IoMdCloseCircleOutline
            onClick={() => setOpenDate(false)}
            className='text-red-400 text-2xl font-bold cursor-pointer'
          />
        </div> */}
        <DateRange
          editableDateInputs={true}
          onChange={(item: any) => {
            setDate([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={date}
          minDate={new Date()}
          // maxDate={date2}
          disabledDates={[addDays(new Date(date1), 1 - 4)]}

          // maxDate={addDays(new Date(), 4)}
        />
      </div>
      <div className='hidden md:block'>
        <DateRangePicker
          onChange={(item: any) => setState([item.selection])}
          // showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction='horizontal'
          preventSnapRefocus={true}
          staticRanges={[]}
          inputRanges={[]}
          calendarFocus='forwards'
          minDate={new Date()}
        />
      </div>
    </>
  );
};

export default Datepicker;
