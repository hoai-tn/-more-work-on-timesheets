import { ClientEntity, fakeClient } from "@cupola/types";
import { AxiosResponse } from "axios";
export const getAllClients = async (
  filter?: Partial<ClientEntity>
): Promise<AxiosResponse> => {
  return new Promise<AxiosResponse>((resolve) =>
    resolve({
      data: [
        {
          id: "1",
          name: "Client",
          pointOfContactFullName: "John Doe",
          address: {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345",
          },
          email: "john@abccorp.com",
          phone: "555-123-4567",
          likelihoodOfSuccess: { value: 80 },
          totalEstimatedValue: { value: 1000000, currency: "USD" },
        },
      ],
      status: 201,
      statusText: "OK",
      headers: {
        ContentLocation: `/timesheet`,
      },
      config: {},
    })
  );
};
