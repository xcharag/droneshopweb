import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import QRCode from 'qrcode.react';

function randomCatUrl() {
    return `https://cataas.com/cat?${Math.random()}`;
}

const QRPayForm = () => {
    const [qrValue, setQRValue] = useState('');

    const generateQR = () => {
        const url = randomCatUrl();
        setQRValue(url);
    }

    return (
        <div className="mt-3 text-center">
            <Form.Group className="mb-3">
                <Form.Label className="text-white">Escribe el numero de transaccion</Form.Label>
                <Form.Control type="text" placeholder="Scan QR code" />
            </Form.Group>
            <div className="d-inline-block">
                <Button variant="primary" type="button" onClick={generateQR}>
                    Generar QR
                </Button>
            </div>
            {qrValue &&
                <div className="mt-3">
                    <QRCode value={qrValue} />
                </div>
            }
        </div>
    );
};

export default QRPayForm;
