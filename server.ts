import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // === MOCK DATABASE ===
  const categories = [
    { id: "politics", name: "राजनीति" },
    { id: "technology", name: "टेक्नोलॉजी" },
    { id: "sports", name: "खेल" },
    { id: "entertainment", name: "मनोरंजन" },
  ];

  let posts = [
    {
      id: "1",
      title: "ग्लोबल समिट में ऐतिहासिक जलवायु समझौता",
      slug: "global-summit-climate-agreement",
      excerpt: "दुनिया भर के नेताओं ने उत्सर्जन को 50% तक कम करने के लिए एक ऐतिहासिक समझौते पर हस्ताक्षर किए हैं।",
      content: "इस समझौते के तहत सभी बड़े देश कार्बन उत्सर्जन को तेजी से कम करने के लिए काम करेंगे। विशेषज्ञों का मानना है कि यह जलवायु परिवर्तन से निपटने के लिए एक बड़ा कदम साबित हो सकता है। यह सम्मेलन पिछले कई हफ्तों से चल रहा था और अंततः एक सर्वसम्मति पर पहुंच गया है।",
      categoryId: "politics",
      imageUrl: "https://images.unsplash.com/photo-1620023616238-6b801a221fbc?auto=format&fit=crop&q=80&w=800",
      date: new Date().toISOString(),
      author: "अमित कुमार",
      featured: true,
      trending: true,
      status: "published"
    },
    {
      id: "2",
      title: "AI का भविष्य: 2027 में क्या होने वाला है?",
      slug: "future-of-ai-2027",
      excerpt: "आर्टिफिशियल इंटेलिजेंस तेजी से विकसित हो रहा है। यहां प्रमुख रुझान हैं जो अगले दशक को परिभाषित करेंगे।",
      content: "कंपनियां AI अनुसंधान में भारी निवेश कर रही हैं। नई मशीन लर्निंग तकनीकें विकसित की जा रही हैं जो इंसानों की तरह सोच सकती हैं। शिक्षा से लेकर स्वास्थ्य सेवा तक, हर क्षेत्र में AI का उपयोग बढ़ रहा है।",
      categoryId: "technology",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      date: new Date(Date.now() - 86400000).toISOString(),
      author: "नेहा शर्मा",
      featured: true,
      trending: false,
      status: "published"
    },
    {
      id: "3",
      title: "विश्व कप 2027: फाइनल में एक रोमांचक मुकाबला",
      slug: "championship-finals-showdown",
      excerpt: "अंडरडॉग टीम ने फाइनल मैच में मौजूदा चैंपियन को हराकर इतिहास रच दिया।",
      content: "मैच के अंतिम मिनटों में किया गया गोल निर्णायक साबित हुआ। कप्तान ने अपने शानदार प्रदर्शन से टीम को जीत दिलाई। पूरे देश में जश्न का माहौल है।",
      categoryId: "sports",
      imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800",
      date: new Date(Date.now() - 172800000).toISOString(),
      author: "राहुल सिंह",
      featured: false,
      trending: true,
      status: "published"
    },
    {
      id: "4",
      title: "नई ब्लॉकबस्टर फिल्म ने बॉक्स ऑफिस के सभी रिकॉर्ड तोड़े",
      slug: "blockbuster-breaks-records",
      excerpt: "नवीनतम एक्शन-थ्रिलर फिल्म ने दुनिया भर में अपने पहले ही सप्ताह में 500 करोड़ रुपये की कमाई की है।",
      content: "इस फिल्म के वीएफएक्स और कहानी की हर जगह तारीफ हो रही है। मुख्य अभिनेता के दमदार अभिनय ने दर्शकों का दिल जीत लिया है। ऐसा माना जा रहा है कि यह फिल्म इस साल की सबसे बड़ी हिट साबित होगी।",
      categoryId: "entertainment",
      imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
      date: new Date(Date.now() - 259200000).toISOString(),
      author: "प्रिया गुप्ता",
      featured: false,
      trending: true,
      status: "published"
    }
  ];

  // === API ROUTES ===
  app.get("/api/categories", (req, res) => {
    res.json(categories);
  });

  app.get("/api/posts", (req, res) => {
    const { category, featured, trending, status, all } = req.query;
    let filtered = posts;
    
    // Default to published only, unless all or explicitly requested
    if (!all) {
      filtered = filtered.filter(p => p.status === (status || "published"));
    }
    
    if (category) filtered = filtered.filter(p => p.categoryId === category);
    if (featured === 'true') filtered = filtered.filter(p => p.featured);
    if (trending === 'true') filtered = filtered.filter(p => p.trending);
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    res.json(filtered);
  });

  app.get("/api/posts/:slug", (req, res) => {
    const post = posts.find(p => p.slug === req.params.slug);
    if (post) res.json(post);
    else res.status(404).json({ error: "Post not found" });
  });

  app.post("/api/posts", (req, res) => {
    const newPost = {
      ...req.body,
      id: String(Date.now()),
      date: new Date().toISOString()
    };
    posts.push(newPost);
    res.json(newPost);
  });

  app.delete("/api/posts/:id", (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.json({ success: true });
  });

  app.post("/api/generate-article", async (req, res) => {
    try {
      const { topic, category } = req.body;
      const { GoogleGenAI, Type } = await import("@google/genai");
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key is not configured" });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      }); // Initialization as per SKILL.md

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Write a compelling Hindi news article about the following topic: "${topic}". 
                   The category is "${category}".
                   Provide a title, an excerpt (short summary), the full detailed content, and a fictional Indian journalist author name.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Article title in Hindi" },
              excerpt: { type: Type.STRING, description: "Short summary in Hindi" },
              content: { type: Type.STRING, description: "Full detailed article content in Hindi" },
              author: { type: Type.STRING, description: "Author name in Hindi" }
            },
            required: ["title", "excerpt", "content", "author"]
          }
        }
      });
      
      const textResponse = response.text;
      if (!textResponse) {
        throw new Error("Failed to generate content.");
      }
      
      const generated = JSON.parse(textResponse);
      res.json(generated);
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate AI article draft" });
    }
  });

  // === VITE MIDDLEWARE ===
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
