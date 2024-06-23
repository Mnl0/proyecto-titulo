import React from "react";
import styles from './WorkerCard.module.css';
import userMaleAvatar from '../../avatarEditor/userMaleAvatar.jpeg';
import PublicationSlider from '../../carousel/Carousel.jsx';

const WorkerCard = ( { user , onWorkerClick }) => {
    const userImageURL = user.imagePath ? `http://localhost:3000/storage/${user.imagePath}` : userMaleAvatar; 
    //console.log(user)

    const publications = [
        {
            title: "Corrección filtración.",
            description: "Muy buen trabajo. Recomendado!",
            photo: 'https://cdn.pixabay.com/photo/2023/11/23/12/28/water-8407954_1280.jpg'
        },
        {
            title: "Pintura Casa de material.",
            description: "Muy buen maestro. Recomendadísimo.",
            photo: 'https://cdn.pixabay.com/photo/2016/09/25/16/42/gun-1694106_960_720.jpg'
        },
        {
            title: "Construcción Mueble",
            description: "Es muy profesional, creo que le llamare otra vez.",
            photo: 'https://cdn.pixabay.com/photo/2019/12/08/09/26/prune-4680692_1280.jpg'
        },
        {
            title: "Jardinería Hogar",
            description: "Tiene mucho talento. Es arte lo que hizo con mi jardín :)",
            photo: 'https://cdn.pixabay.com/photo/2015/07/31/12/06/box-hedge-topiary-869073_1280.jpg'
        },
        {
            title: "Instalación Lava platos.",
            description: "Quedó Impecable! Recomendado!",
            photo: 'https://cdn.pixabay.com/photo/2013/12/13/21/13/plumber-228010_960_720.jpg'
        }
    ]

    const handleClick = () => {
        onWorkerClick(user); // Envía el usuario al manejador de clic
    };
    
    return (

        <div className={styles.cardContainer}>
            <div className={styles.card}>
            <div className={`${styles.imge} ${user.online ? styles.online : styles.offline}`}>
                    <div className={styles.Usericon} style={{ backgroundImage: `url(${userImageURL})`, backgroundSize:'cover' }}></div>
                    <div className={styles.UserData}>
                        <p className={styles.UserName}>{user.firstName} {user.lastName}</p>
                        <p className={styles.Id}>{user.category}</p>
                    </div>
                </div>

                <div className={styles.Description}>
                    <button onClick={handleClick} className={styles.roundButton} style={user.online ? {display:"block"} : {display:"none"}}>Chatear!</button>
                    <PublicationSlider  publications={publications} />
                </div>

                <div className={styles.socialmedia}>
                    {user.online ? <p>En línea</p> : <p>Fuera de línea</p>}
                    <div className={styles.ratingstarscontainer}>
                        <input value="star-5" name="star" id="star-5" type="radio" />
                        <label htmlFor="star-5" className={styles.starlabel}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                pathLength="360"
                                ></path>
                            </svg>
                        </label>

                        <input value="star-4" name="star" id="star-4" type="radio" />
                        <label htmlFor="star-4" className={styles.starlabel}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                pathLength="360"
                                ></path>
                            </svg>
                        </label>

                        <input value="star-3" name="star" id="star-3" type="radio" />
                        <label htmlFor="star-3" className={styles.starlabel}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                pathLength="360"
                                ></path>
                            </svg>
                        </label>

                        <input value="star-2" name="star" id="star-2" type="radio" />
                        <label htmlFor="star-2" className={styles.starlabel}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                pathLength="360"
                                ></path>
                            </svg>
                        </label>

                        <input value="star-1" name="star" id="star-1" type="radio" />
                        <label htmlFor="star-1" className={styles.starlabel}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                pathLength="360"
                                ></path>
                            </svg>
                        </label>
                    </div>

                    {/*<a href="#">
                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                        </svg>
                    </a>
                        <a href="#">
                        <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                        </svg>
                    </a>
                    <a href="#">
                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                        </svg>
                    </a>
                    <a href="#">
                        <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                        </svg>
                    </a>*/}
                </div>
            </div>
        </div>
    )
}

export default WorkerCard;