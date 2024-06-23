import styles from './buttonGoogle.module.css';

export const ButtonGoogle = ({ clicEvent, text }) => {

    return (
        <button className={styles.buttonGoogle} onClick={clicEvent}>{text}</button>
    )
}