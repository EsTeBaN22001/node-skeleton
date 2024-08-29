import { generateToken } from '../Middlewares/jwt.js'
import { UserModel } from '../Models/User.model.js'
import bcrypt from 'bcrypt'

export const registerController = async (req, res) => {
  const { name, username, password } = req.body

  const user = {
    name,
    username,
    password: await bcrypt.hash(password, 5)
  }

  const registerUser = await UserModel.registerUser(user)

  if (!registerUser) {
    res.status(400)
    return res.send({
      success: false,
      message: 'Hubo un error al registrar al usuario'
    })
  }

  res.status(200)
  res.send(registerUser)
}

export const loginController = async (req, res) => {
  const { username, password } = req.body

  const userExists = await UserModel.userExistsByUsername(username)

  if (!userExists) {
    res.status(404)
    return res.send({
      success: false,
      message: 'El usuario no existe'
    })
  }

  const verifyPassword = await bcrypt.compare(password, userExists.password)

  if (!verifyPassword) {
    res.status(400)
    return res.send({
      success: false,
      message: 'La contraseña es incorrecta'
    })
  }

  const token = generateToken(userExists.name, userExists.username)

  res.status(200)
  res.send({ token })
}
