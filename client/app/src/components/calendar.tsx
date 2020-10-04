import React, { useState, } from "react";
import "./calendar.css";

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const Calendar = () => {
    return (
        <div className="calendar">
            <p className="calendar-title">2020 08</p>
            <div className="calendar-container">
                {
                    weekdays.map(wd =>
                        <div className="weekday-wrapper">
                            <label className="weekday">{wd}</label>
                        </div>
                    )
                }
            </div>
        </div>
    );
};