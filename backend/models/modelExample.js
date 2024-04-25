/*
#ejemplo de columna
 wr_telefono: {
    type: DataTypes.INTEGER(12),//tipo de dato para una foranea
    allowNull: true,
  autoIncrement: true,
  allowNull: true,acepta nulos para test
  references: { hace referencia a una foranea
      model: 'client', nombre de la tabla a referenciar
      key: 'cl_id',columna de la tabla a referenciar
    }
 },

#usar unique true en un atributo es como crear un index en el modelo
 indexes: [{ unique: true, fields: ['someUnique'] }],
 },

#elemento a ignorar 
defaultScope: {
 attributes: { exclude: ['id'] } no esta omitiendo el id predeterminado
}

#ejemplos de creacion de tabla
Worker.sync() crea si no existe
Model.sync({ force: true }) elimina si existe, luego crea
Model.sync({ alter: true }) compara y reemplaza

#ejemplo de modificar nombre de columna de una tabla
createdAt: 'cl_createdAt', darle nombre a las columnas personalizadas
updatedAt: 'cl_updatedAt',para que tengan el prefijo cl
tableName: 'tb_client'

# los modelos pueden trabajarse como clases ES6
class User extends Model {
  static classLevelMethod() {
  return 'foo';
  }
  instanceLevelMethod() {
  return 'bar';
  }
  getFullname() {
  return [this.firstname, this.lastname].join(' ');
  }
}
User.init(
  {
  firstname: Sequelize.TEXT,
  lastname: Sequelize.TEXT,
  },
  { sequelize },
);

console.log(User.classLevelMethod()); // 'foo'
const user = User.build({ firstname: 'Jane', lastname: 'Doe' });
console.log(user.instanceLevelMethod()); // 'bar'
console.log(user.getFullname()); // 'Jane Doe'


#formas de imprimir una vez obtenida la promesa de crear
console.log(e instanceof Client)
console.log(e.cl_nombre)
console.log(e.toJSON())//ta bueno
console.log(JSON.stringify(e, null, 4))//usar este para imprimir el objeto ta good

#pueden servir para procesar la informacion en el modelo
// e.update({ cl_nombre: 'eduardo' })//actualizar good
// e.save()//para confirmar los cambios
// e.destroy()//elimina
// e.reload()//
// console.log(e.toJSON())
 
#Conciencia del cambio de Guardar
El save método está optimizado internamente para actualizar solo los campos que realmente cambiaron. Esto significa que si no cambia nada y llama save, Sequelize sabrá que guardar es superfluo y no hará nada, es decir, no se generará ninguna consulta (aún así devolverá una Promesa, pero se resolverá inmediatamente).

Además, si solo algunos atributos cambiaron cuando llama save, solo esos campos se enviarán en la UPDATEconsulta para mejorar el rendimiento.

#buscar todos
Client.findAll().then((e)=>{
  console.log(JSON.stringify(e,null,2))
})

#buscar por atributo para filtrar puede ser util
Model.findAll({
  attributes: ['cl_nombre','cl_apellido']
})

Model.findAll({
  attributes: ['cl_nombre',['cl_apellido','apellido'],'cl_email']
})

equivale a SELECT cl_nombre, cl_apellido AS apellido, cl_email from ...

tambien se puede hacer agregaciones como count
Model.findAll({
  attributes: {
    include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']],
  },
});


SELECT id, foo, bar, baz, qux, hats, COUNT(hats) AS n_hats FROM ...

eliminar atributos, realizar where
Model.findAll({
  where: {
    authorId: 2,
    status: 'active'
  },
});

// SELECT * FROM Model WHERE authorId = 2 AND status = 'active';


// Client.create({ cl_nombre: 'manuel' }).then((e) => {
// console.log(e instanceof Client)
// console.log(e.cl_nombre)
// 	console.log(e.toJSON())//usar este para imprimir tiene colores xD
// console.log(JSON.stringify(e, null, 4))//usar este para imprimir el objeto ta good
// e.update({ cl_nombre: 'eduardo' }) //actualizar good
// e.save() //para confirmar los cambios en bd
// e.destroy() //elimina elemento devuelto por la promesa(e)
// e.reload() //realiza un tipo select
// console.log(e.toJSON())
// e.save({fiels: ['cl_nombre']})//actualiza el cambion en la bd
// })




*/
