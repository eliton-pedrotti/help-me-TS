import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/Files';
import { getRepository } from 'typeorm';

export default {

    async store(req: Request, res: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome inválido!'),
            email: Yup.string().email().required('Digite um email válido'),
            password: Yup.string().required('A senha precisa de no mínimo 6 dígitos').min(6)
        });

        if (!(await schema.validate(req.body, { abortEarly: false, strict: true }))) {
            return res.status(400).json({ error: 'Erro na validação!' });
        }

        const { name, email, password } = req.body

        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email }
        });

        if (checkUserExists) {
            return res.status(400).json({ error: 'Usuário existente!' });
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await usersRepository.save(user)

        return res.json({
            name,
            email
        });

    }
}