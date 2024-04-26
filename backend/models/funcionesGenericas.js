
export function funcionGenericaBuscar(arg, schema, pref) {
	return new Promise((resolve, reject) => {
		const searchItem = schema.findOne({ where: { [`${pref}_email`]: arg } })
		if (searchItem === null) {
			reject(null)
		} else {
			resolve(searchItem)
		}
	})
}