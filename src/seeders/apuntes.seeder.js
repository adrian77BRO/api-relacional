const mysql = require("mysql2");
const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

const connection = mysql.createConnection(dbconfig);

const apuntes = [
  { contenido: "Primer apunte de prueba", created_at: new Date(), deleted: 0 },
  { contenido: "Segundo apunte de prueba", created_at: new Date(), deleted: 0 },
  { contenido: "Tercer apunte de prueba", created_at: new Date(), deleted: 0 },
  // Puedes agregar más apuntes según sea necesario
];

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }

  console.log("Conexión a la base de datos exitosa.");

  const insertQuery =
    "INSERT INTO apunte (id_apunte, contenido, created_at, deleted ) VALUES (?,?,?,?)";

  apuntes.forEach((apunte) => {
    connection.query(
      insertQuery,
      [apunte.id_apunte, apunte.contenido, apunte.created_at, apunte.deleted],
      (error, results) => {
        if (error) {
          console.error("Error al insertar apunte:", error);
        } else {
          console.log(`Apunte insertado con ID: ${results.insertId}`);
        }
      }
    );
  });

  connection.end((endErr) => {
    if (endErr) {
      console.error("Error al cerrar la conexión:", endErr);
    } else {
      console.log("Conexión cerrada correctamente.");
    }
  });
});