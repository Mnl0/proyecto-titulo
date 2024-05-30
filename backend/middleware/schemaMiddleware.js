export function funcionGenericaSchemas(schema) {
	return (req, res, next) => {
		try {
			req.validateBody = schema.validateBody(req.body, {
				stripUnknow: true,
				strict: true,
			});
		} catch (ex) {
			return res.status(400).send(ex)
		}
		next()
	}
}