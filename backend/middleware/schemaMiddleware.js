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

export function middlewareValidateHeader() {
	return (req, res, next) => {
		let header = req.headers['content-type'];
		const headerAccept = ['image/jpeg', 'image/png', 'image/jpg'];
		if (!headerAccept.includes(header)) {
			return res.sendStatus(400);
		}
		next();
	}
}