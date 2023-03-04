import { User } from '../../../models/User';
import { userRepository } from '../../../repository/UserRepository';
import { BadRequestException } from '../../errors/BadRequestException';
import { UserType } from '../../types/UserTypes';

interface Field{
	name: string;
	value: any
}

class Validate{
	required(fields: Field[]){
		for (const field of fields) {
			if (!field.value) {
				throw new BadRequestException(`${field.name} is required`);
			}
		}
		return true;
	}

	async userIsRegistered(user: string){
		const userAlreadyExists = await userRepository.findUser(user);

		if (userAlreadyExists) throw new BadRequestException('User or email already exists!');
		return true;
	}

	emailFormat(email: string) {
		const regEmail = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		if (!regEmail.test(String(email))) throw new BadRequestException('Email format is invalid!');
		return true;
	}

	async emailIsRegistered(email: string) {
		const validatedEmail = await User.find({}).where('email').equals(email);
		if (validatedEmail) throw new BadRequestException('Email is already registered!');
		return true;
	}
}

export const validate = new Validate();