import UserCard from './card/WorkerCard.jsx';
import styles from './WorkerCards.module.css';

const CardWorkerList = ({ workers, onWorkerClick }) => {

    return (
        <div className={styles.cardsContainer}>
            {workers.map((worker, index) => (
                <UserCard key={index} user={worker} onWorkerClick={onWorkerClick}/>
            ))}
        </div>

    )
}

export default CardWorkerList;