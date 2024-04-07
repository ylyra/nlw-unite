import { isAxiosError } from "axios";
import {
  coerce,
  flatten,
  minValue,
  number,
  object,
  parse,
  ValiError,
} from "valibot";

import { EventBadge } from "@/@types/badge";
import { api } from "@/server/api";

type Response =
  | {
      success: true;
      data: {
        badge: EventBadge;
      };
    }
  | {
      success: false;
      error: string;
    };

export async function getAttendeeBadge(code: string): Promise<Response> {
  const schema = object({
    code: coerce(
      number("O código do ingresso deve ser um número inteiro", [
        minValue(1, "O código do ingresso deve ser maior que 0"),
      ]),
      (value) => {
        if (!isNaN(Number(value)) && Number.isInteger(Number(value))) {
          return Number(value);
        }

        return value;
      },
    ),
  });

  try {
    parse(schema, {
      code,
    });

    const response = await api.get<{
      badge: {
        name: string;
        email: string;
        eventTitle: string;
        checkInUrl: string;
      };
    }>(`/attendees/${code}/badge`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      switch (error.response?.status) {
        case 404:
          return {
            success: false,
            error:
              "Código do ingresso inválido. Verifique o código e tente novamente.",
          };
        default:
          return {
            success: false,
            error: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
          };
      }
    }

    if (error instanceof ValiError) {
      const errors = flatten<typeof schema>(error);

      if (errors.nested.code) {
        return {
          success: false,
          error: errors.nested.code[0],
        };
      }
    }

    return {
      success: false,
      error: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    };
  }
}
