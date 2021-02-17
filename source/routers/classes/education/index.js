import { Classes } from '../../../controllers';

export const enroll = async (req, res) => {
    try {
        const classes = new Classes();
        const { classHash } = req.params;
        await classes.enrollStudent(classHash, req.body);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const expel = async (req, res) => {
    try {
        const classes = new Classes();
        const { classHash } = req.params;
        await classes.expelStudent(classHash, req.body);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
