import connectMongo from '@/lib/database';
import Data from '@/models/DataModel';

export default async function handler(req, res) {
  try {
    await connectMongo(); // Connect to MongoDB within the handler
    
    const { endYear, topic, sector, region, pestle, source, country, city } = req.query;
  
    const filters = {};
    if (endYear) filters.end_year = endYear;
    if (topic) filters.topic = topic;
    if (sector) filters.sector = sector;
    if (region) filters.region = region;
    if (pestle) filters.pestle = pestle;
    if (source) filters.source = source;
    if (country) filters.country = country;
    if (city) filters.city = city;
  
    const data = await Data.find(filters); // Fetch data based on filters
    res.status(200).json(data);
    // console.log(data.length);
    
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}
