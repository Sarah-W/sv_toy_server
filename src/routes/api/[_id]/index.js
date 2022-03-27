export async function get({ params }) {
  return { 
    status: 200, 
    body: { message: `hi there ${params._id}` } 
  }
}