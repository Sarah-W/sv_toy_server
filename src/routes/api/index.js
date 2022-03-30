import { get_animals, put_animal } from "$lib/animal_db";
import "dotenv/config";
const TOKEN = process.env.MAGIC_WORD;
import { validate_my_animal } from "$lib/animal_validator";

export async function get() {
  return { status: 200, body: await get_animals() };
}

export async function put({ request }) {
  try {
    const auth = request.headers.get("authorization");

    if (!(auth === TOKEN)) {
      return {
        status: 403,
        body: {
          acknowledged: false,
          message: "You are not allowed to add animals",
        },
      };
    }

    const animal = await request.json();
    const validation_result = validate_my_animal(animal);

    if (validation_result.errors.length) {
      let errors = validation_result.errors.map((d) => d.stack);
      return {
        status: 400,
        body: {
          message: "Your animal is not a valid animal",
          errors,
        },
      };
    }
    // and if everything is ok!

    return { status: 200, body: await put_animal(animal) };
  } catch (ex) {
    console.log({ ex });
    return {
      status: 400,
      body: {
        message: "Something went wrong. Is your JSON ok?",
      },
    };
  }
}
