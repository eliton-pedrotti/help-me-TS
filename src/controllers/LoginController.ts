import { Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';
import * as Yup from 'yup';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import File from '../models/Files';
import { getRepository } from 'typeorm';
import authConfig from '../config/auth';


export default {
    async store(req: Request, res: Response) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Erro na validação!' });
        }

        const { email, password } = req.body;

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email }
        })

        if (!user) {
            return res.status(400).json({ error: 'Email/Senha incorretos!' });
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            return res.status(400).json({ error: 'Email/Senha incorretos!' });
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        const data = {
            id: user.id,
            name: user.name,
            email: user.email,
            token
        };

        return res.json(data)


    }
}