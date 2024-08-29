import { Router } from 'express'
import { loginController } from '../Controllers/auth.controller.js'
import { sanitizeLoginUser } from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'

const router = Router()

router.post('/login', sanitizeLoginUser, validateInputs, loginController)

export default router
