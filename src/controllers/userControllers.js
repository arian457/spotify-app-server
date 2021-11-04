const userService = require("../services/userService");

const deleteUser = (req, res, next) => {
  const { id } = req.params;
  userService.deleteUserById(id).then(resolved => {
    resolved
      ? res
          .status(200)
          .json({ status: "ok", message: "Usuario eliminado correctamente." })
      : res
          .status(404)
          .json("El usuario especificado no existe en la base de datos");
  });
};

const usersList = async (req, res, next) => {
  try {
    const list = await userService.getUsersList();
    list.length < 1
      ? res.status(200).json({ message: "No se encontraron usuarios." })
      : res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const newParams = req.body;

  try {
    const userUpdated = await userService.update(id, newParams);
    res.status(200).json({
      status: "ok",
      message: "Usuario actualizado correctamente.",
      data: userUpdated,
    });
  } catch (error) {
    res
      .status(404)
      .json("El usuario especificado no existe en la base de datos");
  }
};

module.exports = {
  deleteUser,
  usersList,
  updateUser,
};
