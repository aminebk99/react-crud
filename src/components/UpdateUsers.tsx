import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';

const UpdateUsers = ({ id, updateUser }) => {
    const [oldUser, setOldUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        fetchUsersValues();
    }, []);

    useEffect(() => {
        setFormData({
            firstname: oldUser.firstname || '',
            lastname: oldUser.lastname || '',
            username: oldUser.username || '',
            email: oldUser.email || '',
            password: oldUser.password || ''
        });
    }, [oldUser]);

    const fetchUsersValues = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${id}`);
            setOldUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        fetchUsersValues();
        setShowModal(true);
    };

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e : Event) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/users/${id}`, formData);
            const updatedUser = response.data;
            updateUser(updatedUser); // Update the UI with the newly updated user
            handleClose();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <>
            <Container >
                <Button variant="warning" onClick={handleShow}>Update</Button>
            </Container>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                            Update
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

export default UpdateUsers;
