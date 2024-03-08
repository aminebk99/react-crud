import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';

const AddUsers = ({ data }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        roles: 'USER',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleChange = (e : any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/users`, formData); // Use HTTPS instead of HTTP
            const newUser = response.data;
            data.addUser(newUser); // Update the UI with the newly added user
            handleClose();
            setFormData({
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                roles: 'USER',
                password: '',
            });
        } catch (error) {
            console.error('Error adding user:', error);
            setError('Error adding user. Please try again.'); 
        }
    };

    return (
        <>
            <Container className="d-flex justify-content-end">
                <Button variant="success" onClick={handleShow}>Add User</Button>
            </Container>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formFirstname">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" className='w-100' type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddUsers;
