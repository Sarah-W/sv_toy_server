import {get_animals} from '$lib/animal_db'

export async function get(){
  return {status:200,body:await get_animals()}
}

export async function put({request}){

  console.log(await request.json())
  return {status:200,body:{message:'hi there'}}
}
