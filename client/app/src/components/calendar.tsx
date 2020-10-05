import React, { useState, } from "react";
import moment from "moment";
import "./calendar.css";

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const Calendar = () => {
    const [date, setDate] = useState(moment());

    const firstDayOfMonth = () => {
        return Number(date.startOf("month").format("d"));
    };
    const daysInMonth = () => {
        return date.daysInMonth();
    };

    const range = (length: number) => {
        return Array.from({length}, (v, k) => k);
    };

    return (
        <div className="calendar">
            <p className="calendar-title">{date.format("YYYY MM")}</p>
            <div className="calendar-container">
                {
                    weekdays.map(wd =>
                        <div className="cell weekday-wrapper" key={wd}>
                            <label className="weekday">{wd}</label>
                        </div>
                    )
                }
                {
                    range(firstDayOfMonth()).map(i =>
                        <div className="cell day empty-day" key={i}></div>
                    )
                }
                {
                    range(daysInMonth()).map(day =>
                        <div className="cell day" key={day}>{day + 1}</div>
                    )
                }
            </div>
        </div>
    );
};