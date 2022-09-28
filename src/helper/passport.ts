import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../repository/user.repository';

export const passportInit = (
  passport: PassportStatic,
  userRepository: UserRepository,
) => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.VERIFY_KEY,
      },
      async (jwtPayload, done) => {
        try {
          const user = await userRepository.find({ email: jwtPayload.email });
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      },
    ),
  );
};
