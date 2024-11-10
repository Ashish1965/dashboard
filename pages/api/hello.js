import connectMongo from '@/lib/database';
import Data from '@/models/DataModel'
import jsonData from '@/json';

connectMongo();
export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {
      

      const result = await Data.insertMany(jsonData);
      res.status(200).json({ message: 'Data inserted successfully', result });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Error inserting data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
