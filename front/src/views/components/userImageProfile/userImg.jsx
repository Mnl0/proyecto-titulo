import React from "react";
import styles from './userImg.module.css';
import { FaCheck, FaUser } from "react-icons/fa6";

const UserImg = (props) => {

    return (
        /*
        <div className={styles.imgContainer}>
            {
                props.isVerified === true ? <div className={styles.verified}>
                    <FaCheck />
                </div> : null
            }
            <FaUser />
        </div>
        */

        <form id="uploadForm">
            <img id="preview" src="./userMaleAvatar.jpeg" alt="Vista previa" />
            <input type="file" id="fileInput" accept="image/*" />
            <button type="submit">Subir</button>
        </form>
    )
}

export default UserImg;
