import express, { Express } from "express";
import { getAllPlayers, getPlayerById, calculateRating } from "./services/playerService";

// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Health check.
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Get all players.
app.get("/api/v1/players", (req, res) => {
    const players = getAllPlayers();
    // Will return all players with a count.
    res.json({ count: players.length, players })
});

// Get player by ID.
app.get("/api/v1/players/:id", (req, res) => {
    const id = Number(req.params.id);
    const player = getPlayerById(id);

    if (!player)
        return res.status(404).json({ message: "Player not found" });

    res.json(player);
});

// Get player rating.
app.get("/api/v1/players/:id/rating", (req, res) => {
    const id = Number(req.params.id);
    const player = getPlayerById(id);

    if (!player)
        return res.status(404).json({ message: "Player not found" });

    const { rating, totalGames } = calculateRating(player);
    
    res.json({ id: player.id, name: player.name, rating, totalGames });
});

export default app;
