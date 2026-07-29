import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
      const response = await request(app)
        .post("/product")
        .send({
          name: "Product A",
          price: 100,
          type: "a",
        });
  
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Product A");
      expect(response.body.price).toBe(100);
      expect(response.body.id).toBeDefined();
  });

  it("should not create a product", async () => {
      const response = await request(app)
        .post("/product")
        .send({
          name: "Product A",
          price: 100,
          type: "123",
        });
  
      expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product A",
        price: 100,
        type: "a",
      });

    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product B",
        price: 200,
        type: "b",
      });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products).toHaveLength(2);
    expect(listResponse.body.products[0]).toMatchObject({
      id: response.body.id,
      name: "Product A",
      price: 100,
    });
    expect(listResponse.body.products[1]).toMatchObject({
      id: response2.body.id,
      name: "Product B",
      price: 400,
    });

    const listResponseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product A</name>`);
    expect(listResponseXML.text).toContain(`<price>100</price>`);
    expect(listResponseXML.text).toContain(`<name>Product B</name>`);
    expect(listResponseXML.text).toContain(`<price>400</price>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });

  it("should find a product", async () => {
    const createResponse = await request(app)
      .post("/product")
      .send({
        name: "Product C",
        price: 300,
        type: "a",
      });

    expect(createResponse.status).toBe(200);

    const response = await request(app)
      .get(`/product/${createResponse.body.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createResponse.body.id);
    expect(response.body.name).toBe("Product C");
    expect(response.body.price).toBe(300);

    const responseXML = await request(app)
      .get(`/product/${createResponse.body.id}`)
      .set("Accept", "application/xml")
      .send();

    expect(responseXML.status).toBe(200);
    expect(responseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(responseXML.text).toContain(`<product>`);
    expect(responseXML.text).toContain(`<name>Product C</name>`);
    expect(responseXML.text).toContain(`<price>300</price>`);
  });
});