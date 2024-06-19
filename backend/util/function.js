import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import path from 'node:path';
import fs from 'node:fs';
import { __dirname } from '../server.js';

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

export function createForModel(schema, data) {
	return new Promise((resolve, rejec) => {
		const newUser = schema.create(data);
		if (newUser) {
			resolve(newUser);
		} else {
			rejec(null)
		}
	})
}

//=============chechear de manera asyncrona ===============\\
export function validatePasswordGeneral(password, hash) {
	const [salt, key] = hash.split(':');
	const hashedBuffer = scryptSync(password, salt, 64);
	const keyBuffer = Buffer.from(key, 'hex');
	return timingSafeEqual(hashedBuffer, keyBuffer);
}

export function passwordHashedGeneral(password) {
	const salt = randomBytes(16).toString('hex');
	const hashedPassword = scryptSync(password, salt, 64).toString('hex');
	return [salt, hashedPassword]
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
	const [salt, hashedPassword] = passwordHashedGeneral(user[`${pref}_password`]);
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

export async function updateImageForModel(image, id, pref, schema) {
	const imageBuffer = Buffer.from(image, 'base64');
	return await schema.update({ [`${pref}_imageProfile`]: imageBuffer }, {
		where: { [`${pref}_id`]: id }
	})
}

export async function addImageOrEditInServerForModel(image, id, pref, schema) {
	try {
		const folderStorageImage = createDirectoryStorage();
		fs.writeFileSync(`${folderStorageImage}/${pref}_${id}.png`, image);
		const pathImage = getImageFromServerForModel(id, pref);
		const urlImage = path.basename(pathImage);
		await updateForColumnModel(urlImage, id, pref, schema);
		return { success: true, urlImage };
	} catch (err) {
		return { success: false, error: err };
	}
}

function createDirectoryStorage() {
	const folderStorageImage = path.join(__dirname, 'storage');
	if (!fs.existsSync(folderStorageImage)) {
		fs.mkdirSync(folderStorageImage);
	}
	return folderStorageImage;
}

export function getImageFromServerForModel(id, pref) {
	const folderStorageImage = createDirectoryStorage();
	return path.join(folderStorageImage, `${pref}_${id}.png`);
}

//podria pasar columna y valor como argumento
export async function updateForColumnModel(imagePath, id, pref, schema) {
	return await schema.update({ [`${pref}_imagePath`]: imagePath }, {
		where: { [`${pref}_id`]: id }
	})
}

export function searchAllForModel(value, schema, pref, nameColumn) {
	return new Promise((resolve, reject) => {
		const searchItem = schema.findAll({
			attributes: [
				['wr_firstName', 'firstName'],
				['wr_lastName', 'lastName'],
				['wr_email', 'email'],
				['wr_cellPhone', 'cellPhone'],
				['wr_address', 'address'],
				['wr_imagePath', 'imagePath'],
				['wr_category', 'category'],
				['wr_id', 'id']
			],
			where: { [`${pref}_${nameColumn}`]: value }
		})
		if (!searchItem) {
			reject(null)
		} else {
			resolve(searchItem)
		}
	})
}