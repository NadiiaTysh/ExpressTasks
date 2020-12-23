import { ExtractJwt } from 'passport-jwt';

import { getPassword } from '../env';

export const jwtOptions = {
    secretOrKey:    getPassword(),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
