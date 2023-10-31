import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const authController = {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(422).json({ error: 'As credenciais são obrigatórias para fazer o login!' });
            }

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(422).json({ error: 'Esta conta não existe' });
            }

            const correctPassword = await bcrypt.compare(password, user.password);

            if (!correctPassword) {
                return res.status(422).json({ error: 'Senha incorreta!' });
            }

            const secret = process.env.jwt_secret;
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: '5min' });

            res.status(200).json({ token: token, userId: user.id });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao fazer login.' });
        }
    },

    async verifyToken(req, res, next) {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ error: 'Acesso negado. É necessário um token de autenticação.' });
        }
        try {
            const secret = process.env.jwt_secret;
            const verified = jwt.verify(token, secret);
            req.user = { userId: verified.id }; // Corrigido para passar o objeto corretamente
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token inválido.' });
        }
    }

};

export default authController;
