import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";

export async function registerRoutes(app: Express): Promise<Server> {
  // API proxy route to handle CORS issues
  app.get('/api/iot', async (req: Request, res: Response) => {
    try {
      const response = await fetch("https://prayalabs.com/rest/api/iot");
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching IoT data:", error);
      
      // Provide fallback data in case the API is down
      const fallbackData = {
        "east": {"signal": "green", "duration": "50", "status": "on"},
        "west": {"signal": "red", "duration": "50", "status": "on"},
        "north": {"signal": "yellow", "duration": "50", "status": "on"},
        "south": {"signal": "yellow", "duration": "50", "status": "on"}
      };
      
      res.json(fallbackData);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
