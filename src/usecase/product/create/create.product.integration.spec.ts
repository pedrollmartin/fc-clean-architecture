import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product of type a", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      type: "a",
      name: "Product A",
      price: 100,
    };

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe("Product A");
    expect(output.price).toBe(100);

    const product = await productRepository.find(output.id);
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(100);
  });

  it("should create a product of type b", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      type: "b",
      name: "Product B",
      price: 100,
    };

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe("Product B");
    expect(output.price).toBe(200); // ProductB multiplica o preço por 2

    const product = await productRepository.find(output.id);
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(200); // ProductB multiplica o preço por 2
  });

  it("should throw an error when product type is not supported", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      type: "invalid",
      name: "Invalid Product",
      price: 100,
    };

    await expect(usecase.execute(input)).rejects.toThrow(
      "Product type not supported"
    );
  });
});
