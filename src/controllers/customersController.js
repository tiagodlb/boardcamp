import connection from "../dbStrategy/postgres.js";

export async function getCustomer(req, res) {
  const search = req.query.cpf;
  try {
      if (search) {
      if (/^[0-9]+$/.test(search) === false) return res.sendStatus(404);
      const { rows: users } = await connection.query(
        `SELECT * FROM customers WHERE cpf LIKE '%${search}%'`
      );
      if (users.length === 0)
        return res
          .status(404)
          .send("Não existe nenhum resultado para a pesquisa");
      res.status(200).send(users);
    } else {
      const { rows: users } = await connection.query(`SELECT * FROM customers`);
      res.status(200).send(users);
    }
  } catch (error) {
    return res.status(500).send("Error when you're trying to get customers.");
  }
}

export async function getCustomerId(req, res) {
  const id = parseInt(req.params.id);
  try {
    const { rows: users } = await connection.query(
      `SELECT * FROM customers WHERE id = ${id}`
    );
    console.log(users);
    if (users.length === 0) return res.sendStatus(404);
    res.status(200).send(users);
  } catch (error) {
    return res
      .status(500)
      .send("Error when you're trying to get customers through id.");
  }
}

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    const { rows: users } = await connection.query(
      `SELECT * FROM customers WHERE cpf = '${cpf}'`
    );
    if (users.length > 0) return res.sendStatus(409);
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}','${phone}','${cpf}','${birthday}')`
    );
    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send("Error when you're trying to post a customer");
  }
}

export async function putCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const id = parseInt(req.params.id);
  try {
    const { rows: users } = await connection.query(
      `SELECT * FROM customers WHERE cpf = '${cpf}'`
    );
    if (users.length > 0) return res.sendStatus(409);
    await connection.query(
      `UPDATE customers SET name='${name}', phone='${phone}', cpf='${cpf}', birthday='${birthday}' WHERE id = ${id}`
    );
    res.sendStatus(200);
  } catch (error) {
    return res.status(500).send("Error when you're trying to post a customer");
  }
}
