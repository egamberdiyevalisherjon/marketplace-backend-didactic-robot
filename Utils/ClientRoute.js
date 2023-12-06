const { decode } = require("./jwt");
const Client = require("../Models/Client");

module.exports = ClientRoute = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ");
  if (!token || !token[0] === "Bearer")
    return res.status(401).json({
      message: "Unauthorized",
    });

  const { client: id } = decode(token[1]);
  const client = await Client.findById(id);
  if (!client)
    return res.status(404).json({
      message: "Client Not Found",
    });
  req.client = client;
  return next();
};
