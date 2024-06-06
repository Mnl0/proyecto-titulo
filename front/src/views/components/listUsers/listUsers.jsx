import React, { useState } from 'react';
import style from './listUsers.module.css';
import defaultUserPhoto from './maleAvatarImg.png';

const TableUsers = ({ people }) => {

    const [usersData, setUsersData] = useState(null);

    return (
        <div className={style.tableContainer}>
            {
                people ?
                    (
                        people.length > 0 ?
                            (
                                <table className={style.worker}>
                                    <thead>
                                        <tr>
                                            <th>Foto</th>
                                            <th>Nombre</th>
                                            <th>Especialidad</th>
                                            <th>Calificación</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            people.map((person) => (
                                                <tr key={person.id}>
                                                    <td>
                                                        <img src={person.photo || defaultUserPhoto} alt={person.name} className={style.imgWorker} />
                                                    </td>
                                                    <td>{person.name}</td>
                                                    <td>{person.category}</td>
                                                    <td>
                                                        {person.rate}
                                                    </td>
                                                    <td>
                                                        <button onClick={() => {console.log('hola '+person.name)}}>Conocer su trabajo</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            ) :
                            <p>No se encontraron registros.</p>
                    )
                    :
                    <p>Ups! Ocurrió un error al buscar trabajadores. Porfavor comuníquese con un administrador.</p>
            }
        </div>
    );
};

export default TableUsers;
