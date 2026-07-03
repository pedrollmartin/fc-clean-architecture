import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Product A", 100);
    await productRepository.create(product);

    const input = {
      id: "123",
      name: "Product A Updated",
      price: 150,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: "123",
      name: "Product A Updated",
      price: 150,
    });

    const updatedProduct = await productRepository.find("123");
    expect(updatedProduct.name).toBe("Product A Updated");
    expect(updatedProduct.price).toBe(150);
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "non-existent",
      name: "Product Updated",
      price: 150,
    };

    await expect(usecase.execute(input)).rejects.toThrow();
  });
});
