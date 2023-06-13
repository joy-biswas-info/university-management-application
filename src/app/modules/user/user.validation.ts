import { z } from 'zod'

// request validation with zod
const createUserZodSchema = z.object({
  body: z.object({
    role: z
      .string({
        required_error: 'this field is required',
      })
      .catch(''),
    password: z.string().optional(),
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
