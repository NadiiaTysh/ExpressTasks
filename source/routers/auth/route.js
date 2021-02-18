import { Auth } from '../../controllers';

export const login = async (req, res) => {
    try {
        const header = req.get('authorization');
        const auth = new Auth(header);

        const data = await auth.login();
        req.session.user = data;

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
