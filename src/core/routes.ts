import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import {
    UserController,
    CatalogController,
    ProductController,
    FactoryController,
    NewsController,
    CommentController,
    OrderController
} from "../controllers";
import { checkAuth } from "../middlewares";

const createRoutes = (app: express.Express, upload: any) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(checkAuth);

    const User = new UserController();
    const Catalog = new CatalogController();
    const Product = new ProductController();
    const Factory = new FactoryController();
    const News = new NewsController();
    const Comment = new CommentController();
    const Order = new OrderController();

    app.get("/user/me", User.getMe);
    app.get("/user/stats", User.getCount);
    app.post("/user/signup", User.create);
    app.post("/user/signin", User.login);
    app.put("/user/update", User.update);

    app.get("/catalog/:path", Catalog.showByPath);
    app.post("/catalog/create", Catalog.create);

    app.get("/product/new", Product.getNew);
    app.get("/product/popular", Product.getPopular);
    app.get("/product/:id", Product.showById);
    app.post("/product/create", upload.array("files"), Product.create);
    app.put("/product/:id", upload.array("files"), Product.update);
    app.delete("/product/:id", Product.delete);

    app.get("/info/about", Factory.showAbout);
    app.get("/info/service", Factory.showService);
    app.get("/info/contacts", Factory.showContacts);
    app.put("/info/update", Factory.update);

    app.get("/news", News.showByPage);
    app.get("/news/all", News.showAll);
    app.get("/news/last", News.showLast);
    app.get("/news/:id", News.showById);
    app.post("/news/create", upload.single("file"), News.create);
    app.put("/news/:id", upload.single("file"), News.update);
    app.delete("/news/:id", News.delete);

    app.get("/comments", Comment.showByPage);
    app.get("/comments/all", Comment.showAll);
    app.get("/comments/last", Comment.showLast);
    app.get("/comments/stats", Comment.getCount);
    app.post("/comments/create", Comment.create);
    app.put("/comments/:id", Comment.update);
    app.delete("/comments/:id", Comment.delete);

    app.get("/orders", Order.showAll);
    app.get("/orders/stats", Order.getCount);
    app.get("/orders/:id", Order.showById);
    app.post("/orders/create", Order.create);
    app.put("/orders/:id", Order.update);
    app.delete("/orders/:id", Order.delete);
};

export default createRoutes;
