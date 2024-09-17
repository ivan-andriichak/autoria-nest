import { SetMetadata } from '@nestjs/common';
import { AccountType } from '../enums/account-name.enum';

export const ACCOUNT_TYPE_KEY = 'accountType';

export const AccountTypes = (...accountTypes: AccountType[]) => SetMetadata(ACCOUNT_TYPE_KEY, accountTypes);
