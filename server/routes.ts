import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertPropertySchema, 
  insertSavedPropertySchema, 
  insertHousingProgramSchema, 
  insertTestimonialSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create sample properties data
  await setupSampleData();

  // PROPERTIES ENDPOINTS
  
  // Get all properties with optional filters
  app.get("/api/properties", async (req, res) => {
    try {
      const city = req.query.city as string | undefined;
      const state = req.query.state as string | undefined;
      const zipCode = req.query.zipCode as string | undefined;
      const minPrice = req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined;
      const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined;
      const bedrooms = req.query.bedrooms ? parseInt(req.query.bedrooms as string) : undefined;
      const bathrooms = req.query.bathrooms ? parseFloat(req.query.bathrooms as string) : undefined;
      const programType = req.query.programType as string | undefined;
      const isPetFriendly = req.query.isPetFriendly === 'true';
      const isAccessible = req.query.isAccessible === 'true';
      
      const properties = await storage.getPropertiesWithFilters({
        city,
        state,
        zipCode,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        programType,
        isPetFriendly,
        isAccessible
      });
      
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Error fetching properties" });
    }
  });

  // Get property by ID
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Error fetching property" });
    }
  });

  // Get featured properties
  app.get("/api/properties/featured", async (req, res) => {
    try {
      const featuredProperties = await storage.getFeaturedProperties();
      res.json(featuredProperties);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured properties" });
    }
  });

  // HOUSING PROGRAMS ENDPOINTS
  
  // Get all housing programs
  app.get("/api/housing-programs", async (req, res) => {
    try {
      const programs = await storage.getHousingPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching housing programs" });
    }
  });

  // Get housing program by ID
  app.get("/api/housing-programs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const program = await storage.getHousingProgram(id);
      
      if (!program) {
        return res.status(404).json({ message: "Housing program not found" });
      }
      
      res.json(program);
    } catch (error) {
      res.status(500).json({ message: "Error fetching housing program" });
    }
  });

  // TESTIMONIALS ENDPOINTS
  
  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Error fetching testimonials" });
    }
  });

  // USER ENDPOINTS

  // Register user
  app.post("/api/users/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser(userData);
      
      // Don't send password back
      const { password, ...userWithoutPassword } = newUser;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      
      res.status(500).json({ message: "Error creating user" });
    }
  });

  // Login
  app.post("/api/users/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Don't send password back
      const { password: _, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error during login" });
    }
  });

  // SAVED PROPERTIES ENDPOINTS

  // Save a property
  app.post("/api/saved-properties", async (req, res) => {
    try {
      const savedPropertyData = insertSavedPropertySchema.parse(req.body);
      const newSavedProperty = await storage.saveProperty(savedPropertyData);
      res.status(201).json(newSavedProperty);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      
      res.status(500).json({ message: "Error saving property" });
    }
  });

  // Get user's saved properties
  app.get("/api/users/:userId/saved-properties", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const savedProperties = await storage.getUserSavedProperties(userId);
      res.json(savedProperties);
    } catch (error) {
      res.status(500).json({ message: "Error fetching saved properties" });
    }
  });

  // Delete a saved property
  app.delete("/api/saved-properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSavedProperty(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting saved property" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function setupSampleData() {
  // Sample housing programs
  const programs = [
    {
      name: "Section 8 Housing",
      description: "Housing Choice Voucher program that helps very low-income families, the elderly, and the disabled afford housing in the private market.",
      details: "The Housing Choice Voucher Program provides assistance to very low-income families to afford decent, safe, and sanitary housing. Housing can include single-family homes, townhouses and apartments and is not limited to units located in subsidized housing projects. Housing choice vouchers are administered locally by public housing agencies (PHAs).",
      icon: "fas fa-home",
      iconBg: "bg-secondary/10",
    },
    {
      name: "Low-Income Housing",
      description: "Subsidized housing where rent is based on your income, typically limited to 30% of your adjusted monthly income.",
      details: "Low-Income Housing programs provide affordable apartments for low income families, the elderly and persons with disabilities. Residents generally pay 30% of their adjusted income as rent.",
      icon: "fas fa-building",
      iconBg: "bg-secondary/10",
    },
    {
      name: "Housing Assistance",
      description: "Emergency rental assistance programs and housing grants that help with rent payments, security deposits, and more.",
      details: "Housing Assistance Programs provide emergency financial assistance to individuals and families who are experiencing a housing crisis or are at imminent risk of homelessness.",
      icon: "fas fa-hand-holding-heart",
      iconBg: "bg-secondary/10",
    }
  ];

  // Add sample housing programs
  for (const program of programs) {
    const existingPrograms = await storage.getHousingPrograms();
    if (existingPrograms.length === 0) {
      await storage.addHousingProgram(program);
    }
  }

  // Sample properties
  const properties = [
    {
      title: "Parkview Apartments",
      description: "Modern apartments with great amenities in a quiet neighborhood. Close to public transportation and shopping centers.",
      address: "123 Main Street",
      city: "Portland",
      state: "OR",
      zipCode: "97205",
      price: 950,
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 850,
      propertyType: "Apartment",
      programType: "Section 8",
      isPetFriendly: true,
      isAccessible: false,
      amenities: ["Parking", "Laundry", "Dishwasher"],
      availableDate: "2023-08-01",
      imageUrls: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
      latitude: 45.52345,
      longitude: -122.68282,
      rating: 4.5,
      reviewCount: 26
    },
    {
      title: "Riverdale Commons",
      description: "Affordable community with spacious layouts. Enjoy riverside views and community gardens.",
      address: "456 River Road",
      city: "Chicago",
      state: "IL",
      zipCode: "60607",
      price: 800,
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 650,
      propertyType: "Apartment",
      programType: "Income Restricted",
      isPetFriendly: false,
      isAccessible: true,
      amenities: ["Elevator", "Community Room", "On-site Management"],
      availableDate: "2023-07-15",
      imageUrls: ["https://images.unsplash.com/photo-1605283176568-9b41fde3672e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
      latitude: 41.87811,
      longitude: -87.62980,
      rating: 4.2,
      reviewCount: 18
    },
    {
      title: "Golden Horizons",
      description: "Senior living community with accessible features and supportive services. Peaceful neighborhood with walking trails.",
      address: "789 Oak Drive",
      city: "Atlanta",
      state: "GA",
      zipCode: "30308",
      price: 1100,
      bedrooms: 1,
      bathrooms: 1.5,
      squareFeet: 700,
      propertyType: "Apartment",
      programType: "Senior Housing",
      isPetFriendly: true,
      isAccessible: true,
      amenities: ["Elevator", "Grab Bars", "Emergency Pull Cords", "Social Activities"],
      availableDate: "2023-06-30",
      imageUrls: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
      latitude: 33.77196,
      longitude: -84.38799,
      rating: 4.8,
      reviewCount: 32
    }
  ];

  // Add sample properties
  // Always add the properties for testing
  for (const property of properties) {
    await storage.addProperty(property);
  }

  // Sample testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Portland, OR",
      content: "After months of struggling to find affordable housing, we found our apartment through AffordableHomes. The application process was simple, and we qualified for a Section 8 voucher that made it possible.",
      rating: 5
    },
    {
      name: "Robert Williams",
      location: "Chicago, IL",
      content: "As a senior on a fixed income, I was worried about finding a place I could afford. This platform helped me find a senior living community with rent assistance that fits my budget perfectly.",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      location: "Atlanta, GA",
      content: "The mobile app made it so easy to find an affordable home for my family. We got notifications as soon as a new unit became available, and were able to apply immediately. Game changer!",
      rating: 4
    }
  ];

  // Add sample testimonials
  for (const testimonial of testimonials) {
    const existingTestimonials = await storage.getTestimonials();
    if (existingTestimonials.length === 0) {
      await storage.addTestimonial(testimonial);
    }
  }
}
