import user from 'focus-core/user';

export default () => {
    console.info('|--- USER');
    user.setRoles(['DEFAULT_ROLE']);
}
