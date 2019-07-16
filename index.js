const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const database = require("./config/database");
const bodyParser = require("body-parser");
const routes = express.Router();
const server = require("http").Server(app);
const io = require("socket.io")(server);

//Import Controllers
const UserController = require("./src/controllers/UserController");
const SessionController = require("./src/controllers/SessionController");
const PostController = require("./src/controllers/PostController");
const LikeController = require("./src/controllers/LikeController");
const CommentController = require("./src/controllers/CommentController");

//Import Middlewares
const authMiddleware = require("./src/middleware/auth");

app.use((req, res, next) => {
    req.io = io;

    return next();
});

mongoose.connect(database.url, {
    useCreateIndex: true,
    useNewUrlParser: true
});

mongoose.connection.on("open", () => {
    console.log("Conectado");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Rotas SignIn SignUp
app.post("/users/signup", UserController.store);
app.post("/users/signin", SessionController.store);

//Rota de Logout em breve

// -------------------------------------------- //
//Middleware de autenticação
app.use(authMiddleware);
//Rota para saber o author do comentário
app.get("/user/:id", UserController.show);


//Rotas Posts
app.get("/posts", PostController.index);
app.post("/posts", PostController.store);
app.delete("/posts/:id", PostController.destroy);
app.put("/posts/:id", PostController.put);

//Rota Like
app.post("/posts/like/:id", LikeController.store);

//Rotas Comment
app.post("/posts/:id/comment", CommentController.store);
//Test

server.listen(process.env.PORT || 3000, () => {
    console.log("Server 3000");
});