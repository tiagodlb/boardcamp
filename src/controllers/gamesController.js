import connection from "../dbStrategy/postgres.js";

export async function getGames(req, res) {
  const search = req.query.name;
  try {
    if (search) {
      const { rows: users } = await connection.query(
        `SELECT games.*, categories.name AS "categoryName" 
        FROM games 
        JOIN categories ON categories.id=games."categoryId" 
        WHERE games.name ILIKE $1%`,[search]
      );
      console.log(search);
      if (users.length === 0)
        return res
          .status(200)
          .send("Não existe nenhum resultado para a pesquisa");
      res.status(200).send(users);
    } else {
      const { rows: users } = await connection.query("SELECT * FROM games");
      res.status(200).send(users);
    }
  } catch (error) {
    return res.status(500).send("Error when you're trying to get some games.");
  }
}

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    const { rows: id } = await connection.query(
      `SELECT id FROM categories WHERE id = $1`,
      [categoryId]
    );
    if (id.length === 0) return res.sendStatus(400);
    const nameExists = await connection.query(
      `SELECT name FROM games WHERE name = $1 AND "categoryId" = $2;`,[name, categoryId]);
    if (nameExists.rows.length > 0) return res.sendStatus(409);
    await connection.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2, $3, $4, $5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send("Error when you're trying to post a game.");
  }
}
