import React, { useState, useEffect } from 'react';
import {Button, Container, Table} from 'react-bootstrap';
import { useLazyQuery } from '@apollo/client';
import { GET_ORDERS_BY_SELLER } from './gql/query.js';

const SellerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [getOrdersBySeller] = useLazyQuery(GET_ORDERS_BY_SELLER);

    useEffect(() => {
        getOrders(); // Ejecutar la consulta al montar el componente
    }, []); // Dependencia vacía para ejecutar la consulta solo una vez

    const getOrders = async () => {
        try {
            const seller = JSON.parse(localStorage.getItem('seller'));
            console.log(seller.id);
            const responseData = await getOrdersBySeller({
                variables: {
                    getOrdersBySellerId: seller.id
                },
                context: {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            });
            console.log(responseData);
            setOrders(responseData.data.getOrdersBySeller);

        } catch (error) {
            console.error('Error al obtener las ordenes:', error);
        }
    };
    return (
        <div className="text-white p-4 mt-5 m-5" style={{minHeight: '100vh', backgroundColor: '#41484e'}}>
            <Container>
                <div className="d-flex justify-content-start mb-3">
                    <h2>Órdenes del Vendedor</h2>
                </div>
                <div className="overflow-auto">
                    <Table striped bordered hover variant="dark" responsive="sm">
                        <thead>
                        <tr>
                            <th>ID de Orden</th>
                            <th>ID de Producto</th>
                            <th>Cantidad</th>
                            <th>Cliente</th>
                            <th>Vendedor</th>
                            <th>Estado</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.order.map(o => o.id).join(', ')}</td>
                                <td>{order.order.map(o => o.quantity).join(', ')}</td>
                                <td>{order.client}</td>
                                <td>{order.seller}</td>
                                <td>{order.status}</td>
                                <td>{order.total}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
};
export default SellerOrders;
