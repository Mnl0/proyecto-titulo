import styles from './about.module.css';

const About = () => {

    return (
        <div>
            <section className={styles.aboutus}>
                <div className={styles.container}>
                    <h2>Nuestra Historia</h2>
                    <p>En nuestra ciudad, la búsqueda de servicios particulares a domicilio, como gasfiteros, carpinteros, electricistas, albañiles y otros trabajadores de oficio, ha sido tradicionalmente un proceso complicado. Las personas deben recurrir a redes sociales, contactos tradicionales como tarjetas y afiches, o recomendaciones boca a boca, lo que no siempre garantiza la calidad del servicio y genera desconfianza en la relación cliente-trabajador.</p>
                </div>
                <div className={styles.container}>
                    <h2>Nuestra Misión</h2>
                    <p>Nuestra misión es simplificar la búsqueda y contratación de servicios a domicilio mediante una plataforma confiable en tiempo real. Permitimos a los clientes encontrar fácilmente trabajadores cercanos, verificar su experiencia y calidad de trabajo mediante perfiles detallados con imágenes y calificaciones de otros usuarios, coordinando trabajos de manera transparente para garantizar la satisfacción de todos.</p>
                </div>
                <div className={styles.container}>
                    <h2>Nuestro Equipo</h2>
                    <p>Contamos con un equipo multidisciplinario de profesionales apasionados por la tecnología y el servicio al cliente. Cada miembro del equipo aporta su experiencia y conocimientos para garantizar el éxito de la aplicación. Creemos en la importancia de la tecnología para mejorar la vida de las personas y las empresas, y estamos comprometidos con la innovación y la excelencia en cada uno de nuestros proyectos.</p>
                </div>
            </section>
        </div>
    )
}

export default About;