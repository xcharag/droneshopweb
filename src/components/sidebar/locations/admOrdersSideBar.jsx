import React from "react";
import AdmOrders from "../../orders/admOrders.jsx";
import Staticsidebar from "../staticsidebar.jsx";
const AdmOrdersSideBar = () => {
    return (
        <div style={{display: 'grid', gridTemplateColumns: '200px 1fr', height: 'auto'}}>
            <div>
                <Staticsidebar/>
            </div>
            <div style={{overflow: 'auto', padding: '20px', borderLeft: 'none !important'}}>
                <AdmOrders/>
            </div>
        </div>
    );
}
export default AdmOrdersSideBar;