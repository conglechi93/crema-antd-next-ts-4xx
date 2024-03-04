import { authRole } from '@crema/constants/AppConst';
import EmptyAvatar from 'assets/profile/empty-avatar.svg';

export const getUserFromAuth0 = (user: any) => {
  if (user)
    return {
      id: 1,
      uid: user.sub,
      displayName: user.name,
      email: user.email,
      photoURL: user.picture,
      role: authRole.User,
    };
  return user;
};

export const getUserFromFirebase = (user: any) => {
  if (user)
    return {
      id: 1,
      uid: user.uid,
      displayName: user.displayName ? user.displayName : 'Nô',
      email: user.email,
      photoURL: user.photoURL ? user.photoURL : EmptyAvatar.src,
      role: authRole.User,
    };
  return user;
};
export const getUserFromAWS = (user: any) => {
  if (user)
    return {
      id: 1,
      uid: user.username,
      displayName: user.attributes.name ? user.attributes.name : 'Nô',
      email: user.attributes.email,
      photoURL: user.photoURL,
      role: authRole.User,
    };
  return user;
};

export const getUserFromJwtAuth = (user: any) => {
  if (user)
    return {
      id: 1,
      uid: user._id,
      displayName: user.name,
      email: user.email,
      photoURL: user.avatar,
      role: authRole.User,
    };
  return user;
};
