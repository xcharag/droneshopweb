import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/footer/footer.jsx';
import Header from './components/header/header.jsx';
import Login from './components/login/login.jsx';
import Home from './components/home/home.jsx';
import SignUp from './components/sign-up/signUp.jsx';
import Cart from "./components/cart/cart.jsx";
import Products from "./components/products/products.jsx";
import AdmClientSidebar from "./components/sidebar/admClientSideBar.jsx";
import StockSidebar from "./components/sidebar/stockSideBar.jsx";
import AuthProvider from './AuthContext';
import PrivateRoute from './PrivateRoute'; // Extract the PrivateRoute component into its own file
import { createApolloClient } from './apolloClient';
import AdmOrdersSideBar from "./components/sidebar/locations/admOrdersSideBar.jsx";

const containerStyle = {
    paddingTop: '70px',
    paddingBottom: '70px',
    height: '100vh',
    backgroundColor: '#242424'
};

const DefaultLayout = ({ children }) => (
    <>
        <Header />
        <Container fluid style={containerStyle}>
            {children}
        </Container>
        <Footer />
    </>
);

function App() {
    const apolloClient = createApolloClient();

    return (
        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
                        <Route path="/login" element={<DefaultLayout><Login /></DefaultLayout>} />
                        <Route path="/cart" element={<PrivateRoute element={<DefaultLayout><Cart /></DefaultLayout>} allowedRoles={['SELLER', 'CLIENT']} />} />
                        <Route path="/products" element={<DefaultLayout><Products /></DefaultLayout>} />
                        <Route path="/signUp" element={<DefaultLayout><SignUp /></DefaultLayout>} />
                        <Route path="/admClient" element={<PrivateRoute element={<AdmClientSidebar />} allowedRoles={['SELLER']} />} />
                        <Route path="/stock" element={<PrivateRoute element={<StockSidebar />} allowedRoles={['SELLER']} />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;
