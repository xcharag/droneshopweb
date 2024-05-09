import React from "react";
import Staticsidebar from "./staticsidebar.jsx";
import AdmClient from "../admClients/admClient.jsx";

function AdmClientSidebar() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: '100vh' }}>
            <div>
                <Staticsidebar />
            </div>
            <div style={{ overflow: 'auto', padding: '20px', borderLeft: 'none !important'}}>
                <AdmClient />
            </div>
        </div>
    );
}

export default AdmClientSidebar;