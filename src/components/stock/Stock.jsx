import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Table} from "react-bootstrap";
import AddProductModal from "./modals/AddProductModal.jsx";
import EditProductModal from "./modals/EditProductModal.jsx";
import {useLazyQuery} from "@apollo/client";
import {GET_PRODUCTS} from "./gql/query.js";
import DeleteProductModal from "./modals/DeleteProductModal.jsx";
import MostSoldDronesModal from "./modals/MostSoldDronesModal.jsx";

const Stock = () => {
    const [products, setProducts] = useState([]);
    const [showEditProductModal, setShowEditProductModal] = useState(false);
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);
    const [showMostSoldDronesModal, setShowMostSoldDronesModal] = useState(false);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        stock: 0,
        price: 0,
        created: '',
        model: '',
        specifications: ''
    });

    const [getAllProducts] = useLazyQuery(GET_PRODUCTS);

    useEffect(() => {
        getProducts();
    }, []);

    let seller = '';

    const getProducts = async () => {
        try {
            const products = await getAllProducts({fetchPolicy: 'network-only'});
            if (products) {
                setProducts(products.data.getAllProducts);
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

    const openDeleteModal = () => {
        setShowDeleteProductModal(true);
    }

    const closeDeleteModal = () => {
        setShowDeleteProductModal(false);
    }

    const openMostSoldDronesModal = () => {
        setShowMostSoldDronesModal(true);
    }

    const closeMostSoldDronesModal = () => {
        setShowMostSoldDronesModal(false);
    }

    return (
        <div className='text-white p-4 mt-5 m-5'>
            <div className='d-flex justify-content-between mb-2'>
                <h2>Administrar Productos</h2>
                <Button variant='success' size='sm' onClick={openMostSoldDronesModal}>Drones más vendidos</Button>
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
                    <th>Acciones</th>
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
                            <Button variant='danger' className='m-lg-2' onClick={() => {
                                setProductToDelete(product);
                                openDeleteModal();
                            }}>Eliminar</Button>
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
                reloadProducts={getProducts}
            />
            <EditProductModal
                show={showEditProductModal}
                handleClose={closeEditModal}
                productData={productToEdit}
                reloadProducts={getProducts}
            />

            <DeleteProductModal
                show={showDeleteProductModal}
                handleClose={closeDeleteModal}
                product={productToDelete}
                reloadProducts={getProducts}
            />

            <MostSoldDronesModal
                show={showMostSoldDronesModal}
                handleHide={closeMostSoldDronesModal}
            />
        </div>
    );
}

export default Stock;