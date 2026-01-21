//=========================================
// Storing player data (name, wins, losses, total score).
//=========================================
// The data structure for a Player.
export interface Player {
    id: number; // Unique identifier.
    name: string; // Player's display name.
    wins: number; // Total wins.
    losses: number; // Total losses.
    totalScore: number; // Cumulative score across all games.
}

// Hard-coded Sample Data.
const players: Player[] = [
    { id: 1, name: "ShadowStrike", wins: 15, losses: 5, totalScore: 28500 },
    { id: 2, name: "NoobMaster", wins: 3, losses: 12, totalScore: 4200 },
    { id: 3, name: "ProGamer99", wins: 0, losses: 0, totalScore: 0 }
];

//=========================================
// Retrieving individual players stats by ID.
//=========================================
export function getPlayerById(id: number): Player | undefined {
    return players.find((player) => player.id === id);
}

//=========================================
// Retrieving all players.
//=========================================
export function getAllPlayers(): Player[] {
    return players;
}

//=========================================
// Calculating a player's "performance rating" based on their stats.
//=========================================
export function calculateRating(player: Player): { rating: number; totalGames: number } {
    const totalGames = player.wins + player.losses;

    // Player with 0 total games should return their rating as 0. 
    if (totalGames === 0) 
        return { rating: 0, totalGames: 0 };

    const rating = (player.wins / totalGames) * 100 + (player.totalScore / totalGames);
    
    // Rating will be rounded to 2 decimal places.
    return { rating: Number(rating.toFixed(2)), totalGames };
}