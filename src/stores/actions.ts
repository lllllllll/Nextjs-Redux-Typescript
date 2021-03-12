import { del, get, patch, post } from './services';
import types from './types';

const api = 'https://api.github.com'

export const fetchUsers = () => (dispatch: any) => get(dispatch, types.getUsers, `${api}/users`);