import {get_animal, delete_animal} from '$lib/animal_db'

import 'dotenv/config'
const TOKEN = process.env.MAGIC_WORD

export async function get({ params }) {
  return { 
    status: 200, 
    body: await get_animal(params._id) 
  }
}

export async function del({request, params }) {
  const auth = request.headers.get('authorization')
  
  if (!(auth === TOKEN)){
    return {
      status:403,
      body:{
        acknowledged:false, 
        message: 'You are not allowed to delete animals' 
        }
      }
    }

  return { 
    status: 200, 
    body: {
      acknowledged:true,  
      message: await delete_animal(params._id) 
    } 
  }
}