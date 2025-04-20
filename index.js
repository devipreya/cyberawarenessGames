const express = require("express");
const app = express();
const path = require("path");
const collection = require("./mongo");  // Assuming this is your MongoDB connection file

const port = process.env.PORT || 5001;

// Paths setup
const templatePath = path.join(__dirname, '../template');
app.use('/images', express.static(path.join(__dirname, "../images")));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine setup
app.set("view engine", "hbs");
app.set("views", templatePath);



app.get("/", (req, res) => {
    res.render("main");  // Assuming you have a 'main.hbs' template
});

app.get("/levels", (req, res) => {
    res.render("levels");  // Render levels.hbs when /levels is accessed
});

app.get('/learnmore2', (req, res) => {
    res.render('learnmore2');  // 'learnmore' refers to the learnmore.hbs view
  });
 
  app.get('/level1', (req, res) => {
    res.render('level1');  // 'learnmore' refers to the learnmore.hbs view
  });

  app.get('/level2', (req, res) => {
    res.render('level2');  // 'learnmore' refers to the learnmore.hbs view
  });

  app.get('/level3', (req, res) => {
    res.render('level3');  // 'learnmore' refers to the learnmore.hbs view
  });
  app.get('/aboutus', (req, res) => {
    res.render('aboutus');  // 'learnmore' refers to the learnmore.hbs view
  });
// Routes
app.get("/login", (req, res) => {
    res.render("login");  // Render login page
});

app.get("/signup", (req, res) => {
    res.render("signup");  // Render signup page
});

// Sign-up Route
app.post("/signup", async (req, res) => {
    try {
        const data = { name: req.body.name, password: req.body.password };
        // Use insertOne for inserting a single document
        await collection.insertOne(data);
        res.status(200).json({ message: "Account created successfully!" });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ message: "Error creating account." });
    }
});

// Login Route with Rendering main.hbs After Successful Login
app.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await collection.findOne({ name, password });

        if (user) {
            console.log("Login successful for user:", name);
            // Send a success response
            return res.status(200).json({ message: "Login successful" });
        } else {
            console.log("Login failed for user:", name);
            return res.status(401).json({ message: "Incorrect username or password" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});  
const shutdown = () => {
    server.close(() => {
      console.log('Server terminated gracefully.');
      process.exit(0);
    });
  };
  
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  