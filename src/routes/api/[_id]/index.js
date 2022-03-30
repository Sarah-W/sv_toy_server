import { get_animal, delete_animal } from "$lib/animal_db";

export async function get({ params }) {
  return {
    status: 200,
    body: await get_animal(params._id),
  };
}

export async function del({ params }) {
  return {
    status: 200,
    body: { message: await delete_animal(params._id) },
  };
}
