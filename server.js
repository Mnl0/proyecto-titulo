import express from 'express'

const app = express()

app.get('/', (req, res) => {
	res.send('hola mundo');
});

app.listen(3000, () => {
	console.log('serviror corriendo en el puerto 3000')
})