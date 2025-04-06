import { DataSource } from "typeorm";
import { Datasource } from "../src/configurations/datasource.config";
import { User } from "../src/entities/user.entitiy";
import { Role } from "../src/entities/role.entity";
import { Address } from "../src/entities/address.entity";
import { UserRepository } from "../src/repositories/user.repository";

describe("TYPEORM TEST", () => {
  let datasource: DataSource;

  beforeAll(async () => {
    datasource = await Datasource.initialize();
  });
  test("test connection", async () => {
    expect(datasource).toBeTruthy();
  });

  test("test create user", async () => {
    const userRepository = datasource.getRepository("User");
    const user = new User();
    user.name = "Alliano";
    user.email = "allianoanoanymous@gmail.com";
    user.password = "12341234";

    await userRepository.save(user);
  });

  test("create user include roles", async () => {
    const roles = new Array<Role>();
    const role1 = new Role();
    const role2 = new Role();
    const role3 = new Role();

    role1.name = "admin";
    role1.description = "admin role";

    role2.name = "user";
    role2.description = "user role";

    role3.name = "Maintainer";
    role3.description = "Maintainer role";

    roles.push(role1, role2, role3);

    const roleRepository = datasource.getRepository("Role");
    await roleRepository.save(roles);

    const userRepository = datasource.getRepository("User");
    const user = new User();
    user.roles = roles;
    user.name = "Alliano";
    user.email = "alliano@gmail.com";
    user.password = "12345678";
    await userRepository.save(user);

    const userWithRoles = await userRepository.findOneBy({ id: 1, roles: true });
    expect(userWithRoles).toBeTruthy();
    expect(userWithRoles?.roles.length).toBe(3);
    console.log(userWithRoles);
    console.log(userWithRoles?.roles[0].name);
    console.log(userWithRoles?.roles[1].name);
    console.log(userWithRoles?.roles[2].name);
  });
});

describe("one to many", () => {
  let datasource: DataSource;

  beforeAll(async () => {
    datasource = await Datasource.initialize();
  });
  it("one to many relation", async () => {
    const userRepository = datasource.getRepository("User");
    const addressRepository = datasource.getRepository("Address");
    const roleRepository = datasource.getRepository("Role");

    const user = new User();
    const address = new Address();
    const role = new Role();
    user.name = "Alliano";
    user.email = "alliano@gmail.com";
    user.password = "12345678";

    address.country = "Indonesia";
    address.city = "Jakarta";
    address.street = "Jl. Kebon Jeruk";
    address.state = "DKI Jakarta";
    address.zipCode = "11530";
    address.user = user;

    role.name = "admin";
    role.description = "admin role";

    user.roles = [role];
    user.addresses = [address];

    await userRepository.save(user);
    await roleRepository.save(role);
    await addressRepository.save(address);

    const userWithAddress = await userRepository.findOneBy({
      id: 1,
      addresses: true,
      roles: true,
    });
    expect(userWithAddress).toBeTruthy();
  });
});

describe("custom repository", () => {
  let datasource: DataSource;

  beforeAll(async () => {
    datasource = await Datasource.initialize();
    await initUser(datasource);
  });

  it("custom user repository", async () => {
    const user = await UserRepository.findByEmail("alliano@gmail.com");
    expect(user).toBeTruthy();
    console.log(user);
  });
});


describe("pagination", () => {
  let datasource: DataSource;

  beforeAll(async () => {
    datasource = await Datasource.initialize();
    await initUser(datasource);
  });

  it("pagination", async () => {
    const result = await UserRepository.findAll(0, 10, "DESC");
    console.log(result);
  });

  it('sof delete', async () => {
    const userRepository = datasource.getRepository("User");
    const user = await userRepository.findOneBy({ id: 1 });

    await userRepository.softRemove(user!);
    const deletedUser = await userRepository.findOneBy({ id: 1 });
    expect(deletedUser).toBeFalsy();
  }
  );
})













async function initUser(datasource: DataSource) {
  const userRepository = datasource.getRepository("User");
  const addressRepository = datasource.getRepository("Address");
  const roleRepository = datasource.getRepository("Role");

  const user = new User();
  const address = new Address();
  const role = new Role();
  user.name = "Alliano";
  user.email = "alliano@gmail.com";
  user.password = "12345678";
  

  address.country = "Indonesia";
  address.city = "Jakarta";
  address.street = "Jl. Kebon Jeruk";
  address.state = "DKI Jakarta";
  address.zipCode = "11530";
  address.user = user;

  role.name = "admin";
  role.description = "admin role";

  user.roles = [role];
  user.addresses = [address];

  await userRepository.save(user);
  await roleRepository.save(role);
  await addressRepository.save(address);
}
