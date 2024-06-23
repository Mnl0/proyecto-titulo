import styles from './buttonGoogle.module.css';

export const ButtonGoogle = ({ clicEvent }) => {

    return (
        <button className={styles.buttonGoogle} onClick={clicEvent}>Buscar Trabajador</button>
    )
}