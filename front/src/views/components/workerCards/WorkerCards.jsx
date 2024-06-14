import UserCard from './card/WorkerCard.jsx';
import styles from './WorkerCards.module.css';

const CardWorkerList = ({ workers }) => {

    return (
        <div className={styles.cardsContainer}>
            {workers.map((user, index) => (
                <UserCard key={index} user={user} />
            ))}
        </div>

    )
}

export default CardWorkerList;