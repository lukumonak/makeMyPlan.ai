import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Travel plan for location: Las Vegas for 3 days for couple with a cheap budget, Give me a hotel option list with HotelName, HotelAddress, Price, Hotel image url, Geo coordinates, rating, descriptions and suggest itinerary with PlaceName, Place Details, place image url, Geo Coordinate, ticket pricing, rating, Time travel each location for 3 days with each day plan with best time to visit in JSON format"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "I cannot access real-time information, including live pricing for hotels, availability, or dynamically generated images.  Therefore, I cannot provide URLs for hotel images or place images.  Also, ticket pricing is highly variable and needs to be checked on the official website closer to your travel dates.  The Geo coordinates are approximations and should be verified using a mapping service before your trip.\n\n\nHere's a JSON representation of a possible Las Vegas itinerary for a couple on a cheap budget for 3 days. Remember to verify all prices and availability independently.\n\n```json\n{\n  \"tripName\": \"Las Vegas Budget Trip for Couples (3 Days)\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"priceRange\": \"$50-$100 (approx. per night)\", \n      \"hotelImageUrl\": \"N/A - Search online for images\",\n      \"geoCoordinates\": { \"latitude\": 36.1215, \"longitude\": -115.1739 },\n      \"rating\": \"3.5 stars (approx.)\",\n      \"description\": \"A classic Vegas hotel with affordable rooms and a circus theme.  May be a bit dated but offers good value.\"\n    },\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"300 Fremont St, Las Vegas, NV 89101\",\n      \"priceRange\": \"$60-$120 (approx. per night)\",\n      \"hotelImageUrl\": \"N/A - Search online for images\",\n      \"geoCoordinates\": { \"latitude\": 36.1673, \"longitude\": -115.1400 },\n      \"rating\": \"3.8 stars (approx.)\",\n      \"description\": \"Downtown location with a more retro vibe. Offers good value and is close to Fremont Street Experience.\"\n    },\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"priceRange\": \"$40-$90 (approx. per night)\",\n      \"hotelImageUrl\": \"N/A - Search online for images\",\n      \"geoCoordinates\": { \"latitude\": 36.1046, \"longitude\": -115.1725 },\n      \"rating\": \"3.5 stars (approx.)\",\n      \"description\": \"Another budget-friendly option on the Strip with a medieval theme. Offers various amenities at a lower cost.\"\n\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience (if staying downtown)\",\n        \"placeDetails\": \"Free walking area with light shows, street performers, and casinos.\",\n        \"placeImageUrl\": \"N/A - Search online for images\",\n        \"geoCoordinates\": { \"latitude\": 36.1694, \"longitude\": -115.1403 },\n        \"ticketPricing\": \"Free\",\n        \"rating\": \"4 stars (approx.)\",\n        \"timeToSpend\": \"3-4 hours (Evening is best for the light show)\"\n      },\n      {\n        \"placeName\": \"Strip Walk (if staying on the Strip)\",\n        \"placeDetails\": \"Walk the length of the Las Vegas Strip, admire the hotels and attractions.\",\n        \"placeImageUrl\": \"N/A - Search online for images\",\n        \"geoCoordinates\": { \"latitude\": 36.1146, \"longitude\": -115.1729 },\n        \"ticketPricing\": \"Free\",\n        \"rating\": \"4.5 stars (approx.)\",\n        \"timeToSpend\": \"2-3 hours (any time, but evening is more vibrant)\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Outdoor art installation south of Las Vegas. Requires transportation.\",\n        \"placeImageUrl\": \"N/A - Search online for images\",\n        \"geoCoordinates\": { \"latitude\": 36.0631, \"longitude\": -114.9109 },\n        \"ticketPricing\": \"Free (parking may apply)\",\n        \"rating\": \"4 stars (approx.)\",\n        \"timeToSpend\": \"1-2 hours (go early to avoid crowds)\"\n      },      \n      {\n        \"placeName\": \"Free Shows (various locations)\",\n        \"placeDetails\": \"Many casinos offer free shows – check schedules.\",\n        \"placeImageUrl\": \"N/A - Search online for images\",\n        \"geoCoordinates\": \"Varies\",\n        \"ticketPricing\": \"Free\",\n        \"rating\": \"Varies\",\n        \"timeToSpend\": \"2-3 hours (check show times)\"\n      }\n\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Hoover Dam (day trip, requires transport)\",\n        \"placeDetails\": \"Impressive dam on the Colorado River.  Consider a tour or self-drive.\",\n        \"placeImageUrl\": \"N/A - Search online for images\",\n        \"geoCoordinates\": { \"latitude\": 36.0196, \"longitude\": -114.7484 },\n        \"ticketPricing\": \"Varies (tour costs extra)\",\n        \"rating\": \"4.5 stars (approx.)\",\n        \"timeToSpend\": \"4-6 hours (allow time for travel)\"\n      },\n      {\n        \"placeName\": \"Downtown Las Vegas exploration\",\n        \"placeDetails\": \"Explore more of Downtown, visit the Mob Museum (optional, ticketed)\",\n        \"placeImageUrl\": \"N/A - Search online for images\",\n        \"geoCoordinates\": { \"latitude\": 36.1694, \"longitude\": -115.1403 },\n        \"ticketPricing\": \"Varies (Mob Museum has entry fee)\",\n        \"rating\": \"4 stars (approx.)\",\n        \"timeToSpend\": \"2-3 hours\"\n      }\n    ]\n  }\n}\n```\n\n\n**Important Notes:**\n\n* **Transportation:** This itinerary assumes you'll use ride-sharing services (Uber/Lyft) or the public bus system to get around, which is more budget-friendly than renting a car.  Consider the cost of these services when budgeting.\n* **Food:**  The budget assumes you'll eat at affordable restaurants and cafes.  Las Vegas has many cheap eats options!\n* **Entertainment:**  This itinerary focuses on free or low-cost activities.  Avoid expensive shows unless you've factored them into your budget.\n* **Flexibility:** This is a suggestion. Feel free to adjust based on your preferences and interests.\n\n\nRemember to book your hotel in advance, especially during peak season.  Always check the latest prices and availability on booking websites.\n"},
        ],
      },
    ],
  });




