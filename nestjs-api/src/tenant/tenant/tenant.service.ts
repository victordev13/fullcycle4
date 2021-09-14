import { InjectModel } from '@nestjs/sequelize';
import { Account } from './../../accounts/entities/account.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantService {
  private account: Account | null = null;

  constructor(@InjectModel(Account) private accountModel: typeof Account) {}

  get tenant() {
    return this.account;
  }

  set tenant(account: Account) {
    this.tenant = account;
  }

  async setTenantBy(subdomain: string) {
    this.tenant = await this.accountModel.findOne({
      where: {
        subdomain,
      },
      rejectOnEmpty: true,
    });
  }
}
