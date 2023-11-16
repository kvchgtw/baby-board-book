export default async function handler(req, res) {
    // 只允許 POST 請求
    try{
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    console.log(req.body)
    const generationId = await req.body.generationId
    const userId = await req.body.userId
    //操作DB
    



    return res.json({ message: 'OK' });
    } catch (error){
        console.error('receiving generationId error: ',error)
    }
   
  }
  

