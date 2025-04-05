import { FindOptionsOrderValue, IsNull, Repository } from "typeorm";
import { Datasource } from "../configurations/datasource.config";
import { User } from "../entities/user.entitiy";
import { PaginationResponse } from "../models/pagination.model";

const userRepository = Datasource.getRepository(User).extend({
  findByName(name: string): Promise<User[]> {
    return this.createQueryBuilder("user").where("user.name ilike :name", { name }).getMany();
  },

  findByEmail(email: string): Promise<User | null> {
    return this.findOne({
      where: {
        email: email,
        roles: true,
        addresses: true,
        deletedAt: IsNull(),
      },
    });
    // return this.createQueryBuilder("user").where("user.email = :email", { email }).getOne();
  },

 async findAll(skip: number, take: number, orderBy: FindOptionsOrderValue, search?: string): Promise<PaginationResponse<User>> {
    const [users, count] = await this.findAndCount({
      where: {
        name: search ? `%${search}%` : undefined,
        deletedAt: IsNull(),
      },
      skip: skip,
      take: take,
      order: {
        id: orderBy,
      },
    });
    return {
      items: users,
      totalItems: count,
      totalPages: Math.ceil(count / take),
      currentPage: Math.floor(skip / take) + 1,
      hasNextPage: skip + take < count,
      page: skip,
      pageSize: take,
    };
  },
});

export { userRepository as UserRepository };
