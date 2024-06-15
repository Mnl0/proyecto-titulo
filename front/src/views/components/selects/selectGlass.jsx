import React, { useEffect, useState } from "react";
import styles from './selectGlass.module.css';

const SelectGlass = ({ onSelect, categories }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        //console.log(categories)
        //console.log(typeof categories)
        const selectedValue = event.target.value; //Toma el índice.
        const selectedText = event.target.options[event.target.selectedIndex].text; // Obtener el texto de la opción seleccionada
        setSelectedOption(selectedValue);
        onSelect(selectedText); // Notificar al componente padre sobre el cambio de selección
    };

    return (
        <select value={selectedOption} onChange={handleChange} className={styles.selectGlass}>
            <option value="">Selecciona una especialidad</option>
            {categories.map((category, index) => (
                <option key={index} value={category.name}>{category.name}</option>
          ))}
        </select>
    )
}

export default SelectGlass;