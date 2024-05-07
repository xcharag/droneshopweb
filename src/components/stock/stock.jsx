import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Table} from "react-bootstrap";
import AddProductModal from "./modals/AddProductModal.jsx";
import EditProductModal from "./modals/EditProductModal.jsx";

const Stock = () => {
    const [products, setProducts] = useState([]);
    const [showEditProductModal, setShowEditProductModal] = useState(false);
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        stock: 0,
        price: 0,
        created: '',
        model: '',
        specifications: ''
    });

    useEffect(() => {
        getProducts();
    }, []);

    let seller = '';

    const getProducts = async () => {
        try {
            seller = JSON.parse(localStorage.getItem('seller'));
            const response = await fetch('http://localhost:4000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    'query': `
                   query GetAllProducts {
                      getAllProducts {
                        id
                        name
                        stock
                        price
                        created
                        model
                        specifications
                      }
                    }
                   `,
                })
            });
            const responseData = await response.json();

            if (responseData.data && responseData.data.getAllProducts) {
                setProducts(responseData.data.getAllProducts);
            } else {
                console.error('No hay productos');
            }
        } catch (e) {
            throw new Error(e.message);
        }
    }

    const openAddModal = () => {
        setShowAddProductModal(true);
    }

    const closeAddModal = () => {
        setShowAddProductModal(false);
    }

    const openEditModal = () => {
        setShowEditProductModal(true);
    }
    const closeEditModal = () => {
        setShowEditProductModal(false);
    }

    return (
        <div className='text-white p-4 mt-5'>
            <div className='d-flex justify-content-between'>
                <h2>Administrar Productos</h2>
            </div>

            <Table striped bordered hover variant='dark'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Modelo</th>
                    <th>Especificaciones</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.stock}</td>
                        <td>{product.price}</td>
                        <td>{product.model}</td>
                        <td>{product.specifications}</td>
                        <td>
                            <Button variant='primary' onClick={() => {
                                setProductToEdit(product);
                                openEditModal();
                            }}>Editar</Button>
                            <Button variant='danger' className='m-lg-2'>Eliminar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <div className='d-flex justify-content-end'>
                <Button variant='primary' onClick={() => openAddModal()}>Agregar Producto</Button>
            </div>
            <AddProductModal
                show={showAddProductModal}
                handleClose={closeAddModal}
            />
            <EditProductModal
                show={showEditProductModal}
                handleClose={closeEditModal}
                productData={productToEdit}/>
        </div>
    );
}

export default Stock;