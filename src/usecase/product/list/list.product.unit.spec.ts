import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

const product1 = new Product("1", "Product A", 100);
const product2 = new Product("2", "Product B", 200);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test list product use case", () => {
  it("should list all products", async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUseCase(productRepository);

    const input = {};

    const output = {
      products: [
        {
          id: "1",
          name: "Product A",
          price: 100,
        },
        {
          id: "2",
          name: "Product B",
          price: 200,
        },
      ],
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should return empty list when no products exist", async () => {
    const productRepository = MockRepository();
    productRepository.findAll.mockReturnValue(Promise.resolve([]));
    const usecase = new ListProductUseCase(productRepository);

    const input = {};

    const output: any = {
      products: [],
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
