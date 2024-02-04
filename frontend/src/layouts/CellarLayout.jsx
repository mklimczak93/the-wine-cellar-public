//main imports
import React from 'react';
import { Outlet } from "react-router-dom";

//css
import '../index.css';

export default function CellarLayout() {
    return (
        <div className="cellar-layout">
            <Outlet />
        </div>
    )
}