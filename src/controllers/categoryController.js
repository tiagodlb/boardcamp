import connection from "../dbStrategy/postgres.js";

export async function getCategories(req, res) {
  try {
    const { rows: name } = await connection.query("SELECT * FROM categories");
    res.send(name);
  } catch (error) {
    return res
      .status(500)
      .send("Something is happening when you're trying to get the categories.");
  }
}

export async function postCategories(req, res) {
  const { name } = req.body;
  if (!name) return res.sendStatus(400);
  try {
    const { rows: id } = await connection.query(
      `SELECT id FROM categories WHERE name=$1;`,
      [name]
    );
    if (id.length) return res.sendStatus(409);
    await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [
      name
    ]);
    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send("Error when you're trying to post a category.");
  }
}
