import { ClientEntity } from "./client.entity";
import { ArchitectEntity } from "../../architect/entities/architect.entity";
import { v4 as UUIDv4 } from "uuid";
import { fakeArchitect } from "../../architect/entities/fake.architect";
import { faker } from "@faker-js/faker";
import { fakeAddress } from "../../common/fake-simple-values";

/**
 * Fake a client as is in database.
 * @param architect
 */
export const fakeClient = (): ClientEntity => {
  const client = new ClientEntity();
  client.id = UUIDv4();
  client.name = "Client";
  client.address = fakeAddress();
  client.phone = faker.phone.number("###-###-###");
  client.createdAt = new Date();
  client.updatedAt = new Date();

  return client;
};
