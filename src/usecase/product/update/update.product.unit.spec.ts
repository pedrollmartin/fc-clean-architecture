import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

const product = new Product("123", "Product A", 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Product A Updated",
      price: 150,
    };

    const output = {
      id: "123",
      name: "Product A Updated",
      price: 150,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
    expect(productRepository.update).toHaveBeenCalled();
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "invalid-id",
      name: "Product A Updated",
      price: 150,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });

  it("should throw an error when name is empty", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "",
      price: 150,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is negative", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Product A Updated",
      price: -10,
    };

    await expect(usecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
