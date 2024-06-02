import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export function searchForModel(value, schema, pref, nameColumn) {
	return new Promise((resolve, reject) => {
		const searchItem = schema.findOne({ where: { [`${pref}_${nameColumn}`]: value } })
		if (!searchItem) {
			reject(null)
		} else {
			resolve(searchItem)
		}
	})
}

export function createForModel(schema, user) {
	return new Promise((resolve, rejec) => {
		const newUser = schema.create(user);
		if (newUser) {
			resolve(newUser);
		} else {
			rejec(null)
		}
	})
}

export function validatePasswordGeneral(password, hash) {
	const [salt, key] = hash.split(':');
	const hashedBuffer = scryptSync(password, salt, 64);
	const keyBuffer = Buffer.from(key, 'hex');
	return timingSafeEqual(hashedBuffer, keyBuffer);
}

export function passwordHashedGeneral(password) {
	const salt = randomBytes(16).toString('hex');
	const hashedPassword = scryptSync(password, salt, 64).toString('hex');
	return [hashedPassword, salt]
}

export async function searchBeforeRecoverForModel(user, schema, pref) {
	return await schema.findOne({
		where: {
			[`${pref}_email`]: user[`${pref}_email`],
			[`${pref}_firtName`]: user[`${pref}_firtName`],
			[`${pref}_cellphone`]: user[`${pref}_cellphone`]
		}
	})
}

export async function updatePasswordForModel(user, schema, pref) {
	const [hashedPassword, salt] = passwordHashedGeneral(user[`${pref}_password`]);
	const newPassword = `${salt}:${hashedPassword}`;
	return await schema.update(
		{
			[`${pref}_password`]: newPassword,
			[`${pref}_passwordSinScriptar`]: user[`${pref}_password`]
		}, {
		where: {
			[`${pref}_id`]: user[`${pref}_id`],
		}
	})
}