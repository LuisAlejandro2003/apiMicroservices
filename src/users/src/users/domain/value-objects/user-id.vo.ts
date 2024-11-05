// src/users/domain/value-objects/user-id.vo.ts
export class UserId {
  constructor(private readonly _value: string) {
    if (!_value) throw new Error('UserId cannot be empty');
  }

  get value(): string {
    return this._value;
  }
}
