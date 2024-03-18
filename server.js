import express from 'express'

const app = express()

const PORT = process.env.PORT ?? 3000;

app.use(express.static('views'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
	next();
});


app.get('/', (req, res) => {
	res.send('hola mundo');
});

app.listen(3000, () => {
	console.log('serviror corriendo en el puerto 3000')
})