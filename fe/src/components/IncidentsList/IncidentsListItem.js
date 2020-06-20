import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

export default function IncidentsListItem(props) {
    const { item, handleDeleteIncident } = props;
    return(
        <li>
            <strong>CASO:</strong>
            <p>{item.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{item.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</p>

            <button onClick={() => handleDeleteIncident(item.id)} type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
            </button>
        </li>
    );
}