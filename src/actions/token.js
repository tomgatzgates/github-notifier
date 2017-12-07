import { AUTHENTICATE, INVALIDATE_TOKEN } from './types';

export function authenticate(token) {
  return { type: AUTHENTICATE, payload: token };
}

export function invalidateToken() {
  return { type: INVALIDATE_TOKEN };
}
