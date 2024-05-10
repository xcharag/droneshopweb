import React from "react";
import Staticsidebar from "./staticsidebar.jsx";
import Stock from "../stock/Stock.jsx";

function StockSidebar() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: 'auto' }}>
            <div>
                <Staticsidebar />
            </div>
            <div style={{ overflow: 'auto', padding: '20px', borderLeft: 'none !important'}}>
                <Stock />
            </div>
        </div>
    );
}

export default StockSidebar;