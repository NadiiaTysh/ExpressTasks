import { classes } from '../odm';
import { students } from '../odm';
import { errorLogger } from '../utils';

export class Classes {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await classes.create(this.data);

        return data;
    }

    async getAllRecords(pageNum = 1, perPage = 10) {
        const data = await classes.find({})
            .skip((pageNum - 1) * perPage)
            .limit(perPage)
            .populate({ path: 'students.user', select: '-_id -__v'})
            .populate({ path: 'lessons.lesson', select: '-_id -__v'})
            .select('-_id -__v')
            .lean();

        return data;
    }

    async getOneRecord(hash) {
        const data = await classes.findOne({ hash })
            .populate({ path: 'students.user', select: '-_id -__v'})
            .populate({ path: 'lessons.lesson', select: '-_id -__v'})
            .select('-_id -__v')
            .lean();

        return data;
    }

    async modifyOneRecord(hash, payload) {
        const data = await classes.findOneAndUpdate({ hash }, payload, { new: true });

        return data;
    }

    async removeOneRecord(hash) {
        const data = await classes.findOneAndRemove({ hash });

        return data;
    }

    async enrollStudent(classHash, payload) {
        try {
            const { user: userHash } = payload;
            const userToEnroll = await students.findOne({ hash: userHash });

            if (!userToEnroll) {
                throw Error(`User ${userHash} does not exist`);
            }

            const selectedClass = await classes.findOne({ hash: classHash });
            const studentsArray = selectedClass.students;
            let isInArray = true;

            if (studentsArray) {
                isInArray = studentsArray.some((item) => {
                    return item.user.toJSON() === userToEnroll._id.toJSON();
                });
            }

            payload.user = userToEnroll._id;

            if (isInArray) {
                throw Error(`User ${userHash} is already added to this class`);
            } else {
                await classes.findOneAndUpdate({ hash: classHash },
                    { $push: { students: payload } });
            }
        } catch (error) {
            //eslint-disable-next-line
            console.log(`The error '${error.message}' occured`);
            errorLogger.error(error.message);
        }
    }

    async expelStudent(classHash, payload) {
        try {
            const { user: userHash } = payload;
            const userToExpel = await students.findOne({ hash: userHash });

            if (!userToExpel) {
                throw Error(`User ${userHash} does not exist`);
            }

            const selectedClass = await classes.findOne({ hash: classHash });
            const studentsArray = selectedClass.students;
            let isInArray = true;
            let isExpelled = false;

            if (studentsArray) {
                isInArray = studentsArray.some((item) => {
                    isExpelled = item.expelled;

                    return item.user.toJSON() === userToExpel._id.toJSON();
                });
            }

            if (!isInArray) {
                throw Error(`User ${userHash} is not added to this class`);
            } else if (isExpelled) {
                throw Error(`User ${userHash} is already expelled`);
            } else {
                await classes.findOneAndUpdate({ hash: classHash, 'students.user': userToExpel._id },
                    { $set: { 'students.$.expelled': true } });
            }
        } catch (error) {
            //eslint-disable-next-line
            console.log(`The error '${error.message}' occured`);
            errorLogger.error(error.message);
        }
    }
}
