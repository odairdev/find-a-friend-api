import { AuthenticationError } from "./../../../useCases/errors/AuthenticationError";
import { makeAutehnticateUseCase } from "@/useCases/factories/makeAuthenticateUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAutehnticateUseCase();
    const { organization } = await authenticateUseCase.execute(email, password);

    const token = await reply.jwtSign(
      {
        city: organization.city
      },
      {
        sign: {
          sub: organization.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        city: organization.city
      },
      {
        sign: {
          sub: organization.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .status(200)
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ organization, token });
  } catch (err) {
    if (err instanceof AuthenticationError) {
      return reply.status(403).send({ message: err.message });
    } else {
      return reply.status(500);
    }
  }
}
