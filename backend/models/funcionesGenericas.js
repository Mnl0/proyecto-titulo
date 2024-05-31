export function funcionGenericaBuscar(email, schema, pref) {
	return new Promise((resolve, reject) => {
		const searchItem = schema.findOne({ where: { [`${pref}_email`]: email } })
		if (!searchItem) {
			reject(null)
		} else {
			resolve(searchItem)
		}
	})
}