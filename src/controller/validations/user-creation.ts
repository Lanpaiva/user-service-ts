import * as EmailValidator from 'email-validator';
import { InvalidPayloadException } from '../../exceptions/invalid-payload-excepection';
import { UserRequestDTO } from '../dto/user-request';

export interface ErrorResponse {
  code: number;
  message: string;
}

export const REQUIRED_FIELDS = [
  'name',
  'email',
  'password',
  'confirm_password'
];

export const validateUserPayload = (user: UserRequestDTO) => {
  for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
    if (!user[REQUIRED_FIELDS[i]]?.trim()) {
      throw new InvalidPayloadException(
        `invalid payload: field ${REQUIRED_FIELDS[i]} should be informed!`
      );
    }
  }

  if (!EmailValidator.validate(user.email)) {
    throw new InvalidPayloadException('message: field email invalid');
  }

  if (user.password !== user.confirm_password) {
    throw new InvalidPayloadException(
      `message: password and confirm_password must be equals`
    );
  }

  return null;
};
