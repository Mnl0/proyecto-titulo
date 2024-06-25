import React, { useRef, useState, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import userMaleAvatar from './userMaleAvatar.jpeg'; // Ajusta la ruta según sea necesario
import style from './avatarEditor.module.css';

const MyAvatarEditor = ({ user, userType }) => {
  const editorRef = useRef(null);
  const [imageURL, setImageURL] = useState(userMaleAvatar); // Estado para almacenar la URL de la imagen
  const [open, setOpen] = useState(false); // Estado para controlar el diálogo
  const [selectedFile, setSelectedFile] = useState(null); // Estado para almacenar el archivo seleccionado
  const [imgUser, setImgUser] = useState('');
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {

    const img = new Image();
    const userImageURL = user.imageProfile ? `${url}/storage/${user.imageProfile}` : userMaleAvatar;
    //const userImageURL = user.imageProfile //? `http://localhost:3000/storage/${user.imgURL}.png` : userMaleAvatar;
    img.src = userImageURL;
    img.onload = () => setImgUser(userImageURL);
    img.onerror = () => setImgUser(userMaleAvatar);
    //console.log('img', img)
    //console.log('userImageURL: ', userImageURL)
  }, [])

  useEffect(() => {
    setImageURL(imgUser)
  }, [imgUser])

  const handleClickOpen = () => {
    setOpen(true); // Abrir el diálogo
  };

  const handleClose = () => {
    setOpen(false); // Cerrar el diálogo sin guardar
  };

  const handleSave = async () => {
    console.log('dentro del handleSave')
    if (editorRef.current) {
      // Obtener el canvas con la imagen editada
      const canvas = editorRef.current.getImage();
      const dataURL = canvas.toDataURL(); // Convertir a data URL
      //console.log(dataURL); // Puedes guardar el dataURL o hacer algo con la imagen editada

      // Si deseas la imagen escalada al tamaño del canvas
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const dataURLScaled = canvasScaled.toDataURL();
      //console.log(dataURLScaled); // Puedes guardar el dataURL escalado o hacer algo con él

      const blob = base64ToBlob(dataURLScaled, 'image/png');  // Convertir base64 a Blob
      const success = await uploadImage(blob);  // Enviar la imagen al servidor

      console.log('Success:', success);

      if (success) {
        const blobUrl = URL.createObjectURL(blob); // Crear una URL a partir del Blob
        setImgUser(blobUrl);
      }

      setOpen(false); // Cerrar el diálogo después de guardar
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const base64ToBlob = (base64, mimeType) => {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  };

  const uploadImage = async (blob) => {
    try {
      const response = await fetch(`${url}/api/${userType}/addImageOrEditInServer/` + user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/png',
        },
        body: blob
      });
      console.log('Response status:', response.status)

      if (!response.ok) {
        throw new Error('Error en la carga de la imagen en el servidor(Fetch)');
      }

      console.log('Imagen cargada exitosamente');
      return true;
    } catch (error) {
      console.error('Error al cargar la imagen(Fetch):', error);
      return false;
    }
  };

  return (
    <div className={style.globalContainer}>
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
                  //scale={1} // No aplicar escala inicial
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

export default MyAvatarEditor;
