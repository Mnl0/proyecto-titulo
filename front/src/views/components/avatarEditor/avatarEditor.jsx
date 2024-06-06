import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import userMaleAvatar from './userMaleAvatar.jpeg'; // Ajusta la ruta según sea necesario
import style from './avatarEditor.module.css';

const AvatarEditor4 = () => {
  const editorRef = useRef(null);
  const [imageURL, setImageURL] = useState(userMaleAvatar); // Estado para almacenar la URL de la imagen
  const [open, setOpen] = useState(false); // Estado para controlar el diálogo
  const [selectedFile, setSelectedFile] = useState(null); // Estado para almacenar el archivo seleccionado


  const handleClickOpen = () => {
    setOpen(true); // Abrir el diálogo
  };

  const handleClose = () => {
    setOpen(false); // Cerrar el diálogo sin guardar
  };

  const handleSave = () => {
    if (editorRef.current) {
        // Obtener el canvas con la imagen editada
        const canvas = editorRef.current.getImage();
        const dataURL = canvas.toDataURL(); // Convertir a data URL
        console.log(dataURL); // Puedes guardar el dataURL o hacer algo con la imagen editada

        // Si deseas la imagen escalada al tamaño del canvas
        const canvasScaled = editorRef.current.getImageScaledToCanvas();
        const dataURLScaled = canvasScaled.toDataURL();
        console.log(dataURLScaled); // Puedes guardar el dataURL escalado o hacer algo con él

        // Guardar el dataURL en el estado
        setImageURL(dataURLScaled);
        setOpen(false); // Cerrar el diálogo después de guardar

        // Enviar la imagen al servidor
        uploadImage(dataURLScaled);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setSelectedFile(file);
    }
  };

    const uploadImage = async (imageData) => {
        try {
            const response = await fetch('https://tu-servidor.com/api/upload', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageData })
            });

            if (!response.ok) {
                throw new Error('Error en la carga de la imagen en el servidor(Fetch)');
            }

            const data = await response.json();
            console.log('Imagen cargada exitosamente', data);
        } catch (error) {
            console.error('Error al cargar la imagen(Fetch):', error);
        }
    };

  return (
    <div className={style.globalContainer}>
      {/*imageURL && <img src={imageURL} alt="Edited Avatar" style={{ borderRadius: '50%' }} />*/} {/* Mostrar la imagen si existe */}
      <div className={style.imgContainer}><img onClick={handleClickOpen} className={style.imgAvatar} src={imageURL} alt="Edited Avatar" style={{ borderRadius: '50%' }} /></div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Imagen de Perfil</DialogTitle>
        <DialogContent>
            <div className={style.editorContainer}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {
                selectedFile && (
                    <AvatarEditor
                        ref={editorRef}
                        image={selectedFile}
                        width={250}
                        height={250}
                        border={30}
                        borderRadius={125} // Hacer el área de recorte circular
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={1.2}
                        rotate={0}
                    />
                )}
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};  

export default AvatarEditor4;
