import { 
  users, 
  properties, 
  savedProperties, 
  housingPrograms, 
  testimonials,
  type User, 
  type InsertUser,
  type Property,
  type InsertProperty,
  type SavedProperty,
  type InsertSavedProperty,
  type HousingProgram,
  type InsertHousingProgram,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { PropertyFilters } from "@/lib/types";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property methods
  getProperty(id: number): Promise<Property | undefined>;
  getPropertiesWithFilters(filters: PropertyFilters): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  addProperty(property: InsertProperty): Promise<Property>;
  
  // Saved Properties methods
  saveProperty(savedProperty: InsertSavedProperty): Promise<SavedProperty>;
  getUserSavedProperties(userId: number): Promise<any[]>;
  deleteSavedProperty(id: number): Promise<void>;
  
  // Housing Programs methods
  getHousingPrograms(): Promise<HousingProgram[]>;
  getHousingProgram(id: number): Promise<HousingProgram | undefined>;
  addHousingProgram(program: InsertHousingProgram): Promise<HousingProgram>;
  
  // Testimonials methods
  getTestimonials(): Promise<Testimonial[]>;
  addTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private savedProperties: Map<number, SavedProperty>;
  private housingPrograms: Map<number, HousingProgram>;
  private testimonials: Map<number, Testimonial>;
  
  // Track IDs for each entity
  private userIdCounter: number;
  private propertyIdCounter: number;
  private savedPropertyIdCounter: number;
  private housingProgramIdCounter: number;
  private testimonialIdCounter: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.savedProperties = new Map();
    this.housingPrograms = new Map();
    this.testimonials = new Map();
    
    this.userIdCounter = 1;
    this.propertyIdCounter = 1;
    this.savedPropertyIdCounter = 1;
    this.housingProgramIdCounter = 1;
    this.testimonialIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date().toISOString();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      phoneNumber: insertUser.phoneNumber || null
    };
    this.users.set(id, user);
    return user;
  }
  
  // Property methods
  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }
  
  async getPropertiesWithFilters(filters: PropertyFilters): Promise<Property[]> {
    let filteredProperties = Array.from(this.properties.values());
    
    // Apply filters
    if (filters.city) {
      filteredProperties = filteredProperties.filter(p => 
        p.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    
    if (filters.state) {
      filteredProperties = filteredProperties.filter(p => 
        p.state.toLowerCase() === filters.state!.toLowerCase()
      );
    }
    
    if (filters.zipCode) {
      filteredProperties = filteredProperties.filter(p => 
        p.zipCode === filters.zipCode
      );
    }
    
    if (filters.minPrice !== undefined) {
      filteredProperties = filteredProperties.filter(p => 
        p.price >= filters.minPrice!
      );
    }
    
    if (filters.maxPrice !== undefined) {
      filteredProperties = filteredProperties.filter(p => 
        p.price <= filters.maxPrice!
      );
    }
    
    if (filters.bedrooms !== undefined) {
      filteredProperties = filteredProperties.filter(p => 
        p.bedrooms >= filters.bedrooms!
      );
    }
    
    if (filters.bathrooms !== undefined) {
      filteredProperties = filteredProperties.filter(p => 
        p.bathrooms >= filters.bathrooms!
      );
    }
    
    if (filters.programType) {
      filteredProperties = filteredProperties.filter(p => 
        p.programType === filters.programType
      );
    }
    
    if (filters.isPetFriendly !== undefined) {
      filteredProperties = filteredProperties.filter(p => 
        p.isPetFriendly === filters.isPetFriendly
      );
    }
    
    if (filters.isAccessible !== undefined) {
      filteredProperties = filteredProperties.filter(p => 
        p.isAccessible === filters.isAccessible
      );
    }
    
    return filteredProperties;
  }
  
  async getFeaturedProperties(): Promise<Property[]> {
    // Return top-rated properties as featured
    const allProperties = Array.from(this.properties.values());
    return allProperties
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  }
  
  async addProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.propertyIdCounter++;
    const createdAt = new Date().toISOString();
    
    // Convert Date objects to ISO strings
    const available = insertProperty.availableDate 
      ? new Date(insertProperty.availableDate).toISOString()
      : null;
      
    const property: Property = { 
      id,
      title: insertProperty.title,
      description: insertProperty.description,
      address: insertProperty.address,
      city: insertProperty.city,
      state: insertProperty.state,
      zipCode: insertProperty.zipCode,
      price: insertProperty.price,
      bedrooms: insertProperty.bedrooms,
      bathrooms: insertProperty.bathrooms,
      squareFeet: insertProperty.squareFeet || null,
      propertyType: insertProperty.propertyType,
      programType: insertProperty.programType,
      isPetFriendly: insertProperty.isPetFriendly || false,
      isAccessible: insertProperty.isAccessible || false,
      amenities: insertProperty.amenities || [],
      availableDate: available,
      imageUrls: insertProperty.imageUrls || [],
      latitude: insertProperty.latitude || null,
      longitude: insertProperty.longitude || null,
      rating: insertProperty.rating || null,
      reviewCount: insertProperty.reviewCount || null,
      createdAt: createdAt
    };
    
    this.properties.set(id, property);
    return property;
  }
  
  // Saved Properties methods
  async saveProperty(insertSavedProperty: InsertSavedProperty): Promise<SavedProperty> {
    const id = this.savedPropertyIdCounter++;
    const savedAt = new Date().toISOString();
    const savedProperty: SavedProperty = { ...insertSavedProperty, id, savedAt };
    this.savedProperties.set(id, savedProperty);
    return savedProperty;
  }
  
  async getUserSavedProperties(userId: number): Promise<any[]> {
    const userSavedProperties = Array.from(this.savedProperties.values())
      .filter(sp => sp.userId === userId);
    
    // Join with properties
    return userSavedProperties.map(saved => {
      const property = this.properties.get(saved.propertyId);
      return {
        id: saved.id,
        userId: saved.userId,
        propertyId: saved.propertyId,
        savedAt: saved.savedAt,
        property
      };
    });
  }
  
  async deleteSavedProperty(id: number): Promise<void> {
    this.savedProperties.delete(id);
  }
  
  // Housing Programs methods
  async getHousingPrograms(): Promise<HousingProgram[]> {
    return Array.from(this.housingPrograms.values());
  }
  
  async getHousingProgram(id: number): Promise<HousingProgram | undefined> {
    return this.housingPrograms.get(id);
  }
  
  async addHousingProgram(insertProgram: InsertHousingProgram): Promise<HousingProgram> {
    const id = this.housingProgramIdCounter++;
    const program: HousingProgram = { 
      id,
      name: insertProgram.name,
      description: insertProgram.description,
      details: insertProgram.details || null,
      icon: insertProgram.icon,
      iconBg: insertProgram.iconBg
    };
    this.housingPrograms.set(id, program);
    return program;
  }
  
  // Testimonials methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async addTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
