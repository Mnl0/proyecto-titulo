import styles from './buttonGoogle.module.css';

export const ButtonGoogle = ({ clicEvent }) => {

    return (
        <button className={styles.buttonGoogle} onClick={clicEvent}  role="button">Buscar Trabajador</button>
    )
}