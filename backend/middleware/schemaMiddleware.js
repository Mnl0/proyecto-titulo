export function middlewareValidateBody(schema) {
	return (req, res, next) => {
		try {
			req.validateBody = schema.validateSync(req.body, {
				stripUnknow: true,
				strict: true,
			});
		} catch (ex) {
			return res.status(400).send(ex);
		}
		next();
	}
}

export function middlewareValidateParams(schema) {
	return (req, res, next) => {
		try {
			req.validateParams = schema.validateSync(req.params, {
				stripUnknow: true,
				strict: true,
			})
		} catch (ex) {
			return res.status(400).send(ex);
		}
		next();
	}
}