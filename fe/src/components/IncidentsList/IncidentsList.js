import React from 'react'
import IncidentsListItem from './IncidentsListItem';

export default function IncidentsList(props) {
    const { incidents = [], handleDeleteIncident } = props;
    return(
        <ul>
           { incidents.map( item => (
                <IncidentsListItem 
                    key={item.id} 
                    item={item}
                    handleDeleteIncident={handleDeleteIncident}
                />
            ))
           }
        </ul>
    )
}