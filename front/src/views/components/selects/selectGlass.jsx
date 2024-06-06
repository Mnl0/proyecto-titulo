import React, { useState } from "react";
import styles from './selectGlass.module.css';

const SelectGlass = ({ onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(0);

    const handleChange = (event) => {
        const selectedValue = event.target.value; //Toma el índice.
        const selectedText = event.target.options[event.target.selectedIndex].text; // Obtener el texto de la opción seleccionada
        setSelectedOption(selectedValue);
        onSelect(selectedText); // Notificar al componente padre sobre el cambio de selección
    };

    return (
        <select value={selectedOption} onChange={handleChange} className={styles.selectGlass}>
            <option selected value="0">Selecciona una especialidad</option>
            <option value="1">Gasfitería</option>
            <option value="2">Electricidad</option>
            <option value="3">Pintura</option>
            <option value="4">Jardinería</option>
        </select>
    )
}

export default SelectGlass;