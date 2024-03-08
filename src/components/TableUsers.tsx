import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import AddUsers from './AddUsers';
import UpdateUsers from './UpdateUsers'; // Import the UpdateUsers component

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
}

export const TableUsers = () => {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>("http://localhost:8080/users");
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUsers = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/users/${id}`);
            setData(prevData => prevData.filter(user => user.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const addUser = (newUser) => {
        setData(prevData => [...prevData, newUser]);
    };

    const updateUser = (updatedUser) => {
        setData(prevData => prevData.map(user => user.id === updatedUser.id ? updatedUser : user));
    };

    return (
        <>
            <AddUsers data={{ addUser: addUser }} />
            <Container className='mt-5'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>E-mail</th>
                            <th>Password</th>
                            <th>Roles</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.roles}</td>
                                <td>
                                    <UpdateUsers data={user} id={user.id} updateUser={updateUser} />
                                </td>
                                <td>
                                    <Button onClick={() => deleteUsers(user.id)} style={{ border: "none" }} className='bg-danger'>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};
