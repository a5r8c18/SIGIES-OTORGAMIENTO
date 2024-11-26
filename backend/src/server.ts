import express, { Request, Response } from "express";
import db from "./db";
import cors from "cors";
import {
  sample_cip_student,
  sample_diul_student,
  sample_official,
  sample_student,
} from "./data";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

// Obtener todos Funcionarios
app.get("/api/official", async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      `SELECT id, name, lastname, "position", prosecution, convocation
	FROM pkt_grant.official`
    );
<<<<<<< HEAD
    res.send(result.rows.reverse());
=======
    res.send(result.rows);
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la consulta");
  }
});

//Filter
app.post("/api/official/", (req, res) => {
  const { name, lastname, position, prosecution, convocation } = req.body;
  const query = `
  SELECT *
  FROM pkt_grant.official
  WHERE 
      (name ILIKE $1 OR $1 IS NULL) AND
      (lastname ILIKE $2 OR $2 IS NULL) AND
      ("position" ILIKE $3 OR $3 IS NULL) AND
      (prosecution::text ILIKE $4 OR $4 IS NULL) AND
      (convocation::text ILIKE $5 OR $5 IS NULL               );
`;
  const params = [
    name ? `%${name}%` : null,
    lastname ? `%${lastname}%` : null,
    position ? `%${position}%` : null,
    prosecution ? `%${prosecution}%` : null,
    convocation ? `%${convocation}%` : null,
  ];

  db.query(query, params)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).send("Error en la base de datos");
    });
});

//GEt by ID
app.get("/api/official/officialId/:officialId", (req, res) => {
  const officialId = req.params.officialId;
  const query = `
  SELECT *
  FROM pkt_grant.official
  WHERE id = $1;
`;

  db.query(query, [officialId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.send(result.rows[0]); // Enviar la fila encontrada
      } else {
        res.status(404).send("No se encontró el registro");
      }
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).send("Error en la base de datos");
    });
});

//Añadir Funcionario
app.post("/api/include-official", (req, res) => {
  // const { name, lastname, position, convocation, prosecution } = req.body;
  const official = req.body;
  const query = `
    INSERT INTO pkt_grant.official (name, lastname, "position", prosecution, convocation)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    official.name,
    official.lastname,
    official.position,
    official.prosecution,
    official.convocation,
  ];

  db.query(query, values)
    .then((result) => {
      // res.status(201).json(result.rows[0]               ); // Enviar el nuevo registro creado en formato JSON
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" }); // Respuesta en JSON
    });
});

//Modificar Official
app.put("/api/modify-official", (req, res) => {
  const { name, lastname, position, prosecution, convocation, id } = req.body;

  const query = `
    UPDATE pkt_grant.official
	SET name=$1, lastname=$2, "position"=$3, prosecution=$4, convocation=$5
	WHERE id = $6;
  `;

  const values = [name, lastname, position, prosecution, convocation, id];

  db.query(query, values)
    .then((result) => {
      // res.status(201).json(result.rows[0]               ); // Enviar el nuevo registro creado en formato JSON
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" }); // Respuesta en JSON
    });

  // Encontrar el índice del official que se va a actualizar
  // const index = sample_official.findIndex((official) => official.id == id               );
  // if (index !== -1) {
  //   // Actualizar el official existente
  //   sample_official[index] = { ...sample_official[index], ...officialReq };
  //   res.send(sample_official               );
  // }
});

//Eliminar un solo official por Id
app.delete("/api/official/remove-official/:officialId", (req, res) => {
  const officialId = req.params.officialId;

  const query = `
  DELETE FROM pkt_grant.official
	WHERE id = $1;
`;
  const selectQuery = `
  SELECT * FROM pkt_grant.official;
`;

  db.query(query, [officialId])
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" }); // Respuesta en JSON
    });
});
//Eliminar funcionarios seleccionados
app.delete("/api/official/remove-officials-check", (req, res) => {
  const { officialsCheck } = req.body;

  const query = `
  DELETE FROM pkt_grant.official
  WHERE id = ANY($1::int[]               );
`;
  const selectQuery = `
  SELECT * FROM pkt_grant.official;
`;

  db.query(query, [officialsCheck])
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" });
    });
});

/////////////////////////////Estudiante SIES-3/////////////////////////////////////////

//Obtener todos los estudiantes
app.get("/api/student", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT name, lastname, ci_passport, awarded_specialty, gender, address, isforeign, country, pre_university, academic_index, grade_average, scholarship_right, ces
	FROM pkt_grant.student;`
    );
<<<<<<< HEAD
    res.send(result.rows.reverse());
=======
    res.send(result.rows);
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la consulta");
  }
});

//Obtener estudiante por Ci/pasaporte
app.get("/api/student/ci_passport/:ci_passport", (req, res) => {
  const ci_passport = req.params.ci_passport;
  const query = `
  SELECT s.*, e.name AS exam_name
  FROM pkt_grant.student s
  LEFT JOIN pkt_grant.entrance_exams e ON s.ci_passport = e.student_ci_passport
  WHERE s.ci_passport = $1;
`;
  db.query(query, [ci_passport])
    .then((result) => {
      if (result.rows.length > 0) {
        const studentData = result.rows[0]; // Obtener los datos del estudiante
        const exams = result.rows
          .map((row) => row.exam_name)
          .filter((name) => name); // Obtener los nombres de los exámenes en un arreglo

        // Crear un objeto con la información del estudiante y sus exámenes
        const response = {
          ...studentData, // Propiedades del estudiante
          entrance_exams: exams, // Agregar el arreglo de exámenes
        };

        res.send(response); // Enviar el objeto completo
        console.log(response);
      } else {
        res.status(404).send("No se encontró el registro");
      }
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).send("Error en la base de datos");
    });
});

//Añadir nuevo estudiante
app.post("/api/include-student", (req, res) => {
  const {
    name,
    lastname,
    ci_passport,
    awarded_specialty,
    gender,
    address,
    isforeign,
    country,
    pre_university,
    academic_index,
    grade_average,
    scholarship_right,
    ces,
    entrance_exams,
  } = req.body;
<<<<<<< HEAD
=======

>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  // Consulta para insertar un nuevo estudiante
  const studentQuery = `
  INSERT INTO pkt_grant.student(
    name, lastname, ci_passport, awarded_specialty, gender, address, isforeign, country, pre_university, academic_index, grade_average, scholarship_right, ces)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  RETURNING ci_passport;
`;

  const values = [
    name,
    lastname,
    ci_passport,
    awarded_specialty,
    gender,
    address,
    isforeign,
    country,
    pre_university,
    academic_index,
    grade_average,
    scholarship_right,
    ces,
  ];

  // Ejecutar la consulta para insertar el estudiante
  db.query(studentQuery, values)
    .then((result) => {
      const newCiPassport = result.rows[0].ci_passport; // Obtener el ci_passport del nuevo estudiante
<<<<<<< HEAD
      // (name, points, student_ci_passport)
      // Preparar la consulta para insertar los exámenes
      const examsQuery = `
      INSERT INTO pkt_grant.entrance_exams (name, student_ci_passport)
      VALUES ($1, $2);
    `;
=======

      // Preparar la consulta para insertar los exámenes
      const examsQuery = `
      INSERT INTO pkt_grant.entrance_exams (name, points, student_ci_passport)(name, student_ci_passport)
      VALUES ($1, $2               );
    `;

>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
      // Insertar cada examen en la tabla entrance_exams
      const examPromises = entrance_exams.map((exam: any) => {
        return db.query(examsQuery, [exam, newCiPassport]);
      });

      // Ejecutar todas las inserciones de exámenes
      return Promise.all(examPromises);
    })
    .then(() => {})
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" });
    });
});

//Modificar estudiante
app.put("/api/modify-student", (req, res) => {
<<<<<<< HEAD
  console.log(req.body);
=======
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  const {
    name,
    lastname,
    ci_passport,
    awarded_specialty,
    gender,
    address,
    isforeign,
    country,
    pre_university,
    academic_index,
    grade_average,
    scholarship_right,
    ces,
    entrance_exams,
<<<<<<< HEAD
    old_ci_passport,
=======
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  } = req.body;

  const studentQuery = `
    UPDATE pkt_grant.student
	SET name=$1, lastname=$2, ci_passport=$3, awarded_specialty=$4, gender=$5, address=$6, isforeign=$7, country=$8, pre_university=$9, academic_index=$10, grade_average=$11, scholarship_right=$12, ces=$13
<<<<<<< HEAD
	WHERE ci_passport = $14;
  `;

  const deleteExamsQuery = `
      DELETE FROM pkt_grant.entrance_exams
      WHERE student_ci_passport = $1;
  `;

=======
	WHERE ci_passport = $3
  RETURNING ci_passport;
  `;

>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  const values = [
    name,
    lastname,
    ci_passport,
    awarded_specialty,
    gender,
    address,
    isforeign,
    country,
    pre_university,
    academic_index,
    grade_average,
    scholarship_right,
    ces,
<<<<<<< HEAD
    old_ci_passport,
  ];
  // Ejecutar la consulta para insertar el estudiante
  db.query(deleteExamsQuery, [old_ci_passport])
    .then((result) => {
      // Eliminar los exámenes existentes
      return db.query(studentQuery, values);
=======
  ];

  // Ejecutar la consulta para insertar el estudiante
  db.query(studentQuery, values)
    .then((result) => {
      const updatedCiPassport = result.rows[0].ci_passport; // Obtener el ci_passport del nuevo estudiante

      //       // Preparar la consulta para actualizar los exámenes
      //       const updateExamsQuery = `
      //      UPDATE pkt_grant.entrance_exams
      //      SET name = $1
      //      WHERE student_ci_passport = $2 AND name = $3;
      //  `;

      //       // Crear promesas para actualizar los exámenes
      //       const examPromises = entrance_exams.map((exam: any) => {
      //         return db.query(updateExamsQuery, [exam, updatedCiPassport, exam]               ); // Puedes usar un identificador único si es necesario
      //       }               );

      // Preparar la consulta para eliminar los exámenes existentes
      const deleteExamsQuery = `
      DELETE FROM pkt_grant.entrance_exams
      WHERE student_ci_passport = $1;
  `;

      // Eliminar los exámenes existentes
      return db.query(deleteExamsQuery, [updatedCiPassport]);
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
    })
    .then(() => {
      // Preparar la consulta para insertar los nuevos exámenes
      const examsQuery = `
<<<<<<< HEAD
      INSERT INTO pkt_grant.entrance_exams (name, student_ci_passport)
      VALUES ($1, $2);
  `;
=======
      INSERT INTO pkt_grant.entrance_exams (name, points, student_ci_passport)(name, student_ci_passport)
      VALUES ($1, $2               );
  `;

>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
      // Insertar cada examen en la tabla entrance_exams
      const examPromises = entrance_exams.map((exam: any) => {
        return db.query(examsQuery, [exam, ci_passport]); // Usar ci_passport para la clave foránea
      });

      // Ejecutar todas las actualizaciones de exámenes
      return Promise.all(examPromises);
    })
<<<<<<< HEAD
=======
    .then(() => {})
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" });
    });
});

//Eliminar estudiante
app.delete("/api/student/remove-student/:ci_passport", (req, res) => {
  const ci_passport = req.params.ci_passport;
  const query = `
  DELETE FROM pkt_grant.student
	WHERE ci_passport = $1;
`;
  const selectQuery = `
SELECT * FROM pkt_grant.student;
`;

  db.query(query, [ci_passport])
    .then((result) => {
      // res.status(201).json(result.rows[0]               ); // Enviar el nuevo registro creado en formato JSON
    })
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" }); // Respuesta en JSON
    });
});
//Eliminar estudiantes seleccionados
app.delete("/api/student/remove-students-check", (req, res) => {
  const { studentsCheck } = req.body;

  const query = `
  DELETE FROM pkt_grant.student
  WHERE ci_passport = ANY($1::text[]               );
`;
  const selectQuery = `
  SELECT * FROM pkt_grant.student;
`;

  db.query(query, [studentsCheck])
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" });
    });
});

//Filter Estudiante
app.post("/api/student/", (req, res) => {
  const { name, lastname, ci_passport, gender, awarded_specialty } = req.body;
  const query = `
  SELECT *
  FROM pkt_grant.student
  WHERE 
      (name ILIKE $1 OR $1 IS NULL) AND
      (lastname ILIKE $2 OR $2 IS NULL) AND
      (ci_passport ILIKE $3 OR $3 IS NULL) AND
      (gender::text ILIKE $4 OR $4 IS NULL) AND
      (awarded_specialty::text ILIKE $5 OR $5 IS NULL               );
`;
  const params = [
    name ? `%${name}%` : null,
    lastname ? `%${lastname}%` : null,
    ci_passport ? `%${ci_passport}%` : null,
    gender ? `%${gender}%` : null,
    awarded_specialty ? `%${awarded_specialty}%` : null,
  ];

  db.query(query, params)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).send("Error en la base de datos");
    });
});

///////////////////////////////////////////////Estudiantes SIES-3 Cip///////////////////////////////////////////
//Obtener todos E.Cip
app.get("/api/cip-student", async (req, res) => {
  try {
    const result = await db.query(
      //     `SELECT id, ci_passport, student_type, description, authorizing_officials,commission
      // FROM pkt_grant.cip_student;`
      `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.cip_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id;
`
    );

<<<<<<< HEAD
    res.send(result.rows.reverse());
=======
    res.send(result.rows);
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la consulta");
  }
});

//Obtener E.Cip by Id
app.get("/api/cip-student/id/:id", (req, res) => {
  const id = req.params.id;
  //   const query = `
  //   SELECT *
  //   FROM pkt_grant.cip_student
  //   WHERE id = $1;
  // `;
  const query = `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name,e.name as exam_name
  FROM pkt_grant.cip_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id
  LEFT JOIN pkt_grant.entrance_exams e ON s.ci_passport = e.student_ci_passport
  WHERE cs.id = $1;
`;
  db.query(query, [id])
    .then((result) => {
      const studentData = result.rows[0]; // Obtener los datos del estudiante
      const exams = result.rows
        .map((row) => row.exam_name)
        .filter((name) => name); // Obtener los nombres de los exámenes en un arreglo

      // Crear un objeto con la información del estudiante y sus exámenes
      const response = {
        ...studentData, // Propiedades del estudiante
        entrance_exams: exams, // Agregar el arreglo de exámenes
      };

      res.send(response); // Enviar el objeto completo
      console.log(response);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).send("Error en la base de datos");
    });
});

//Añadir nuevo E.Cip
app.post("/api/include-cip-student", (req, res) => {
  const {
    ci_passport,
    student_type,
    description,
    authorizing_officials,
    commission,
    id_official,
  } = req.body;
  const query = `
    INSERT INTO pkt_grant.cip_student(
	ci_passport, student_type, description, authorizing_officials,commission,id_official)
	VALUES ($1, $2, $3, $4, $5,$6);`;

  const values = [
    ci_passport,
    student_type,
    description,
    authorizing_officials,
    commission,
    id_official,
  ];

  const selectQuery = `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.cip_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id;
`;

  db.query(query, values)
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" }); // Respuesta en JSON
    });
});

//Modificar E.Cip
app.put("/api/modify-cip-student", (req, res) => {
  const {
    id,
    ci_passport,
    student_type,
    description,
    authorizing_officials,
    commission,
    id_official,
  } = req.body;
  console.log(id);
  console.log(req.body);
  const query = `
    UPDATE pkt_grant.cip_student
	SET ci_passport=$2, student_type=$3, description=$4, authorizing_officials=$5 ,commission=$6,
    id_official=$7
	WHERE id = $1 
  RETURNING id;`;

  const values = [
    id,
    ci_passport,
    student_type,
    description,
    authorizing_officials,
    commission,
    id_official,
  ];

  const selectQuery = `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.cip_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id;
`;

  db.query(query, values)
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" }); // Respuesta en JSON
    });
});

//Eliminar E.Cip by Id
app.delete("/api/cip-student/remove-cip-student/:id", (req, res) => {
  const id = req.params.id;

  const query = `
  DELETE FROM pkt_grant.cip_student
	WHERE id = $1;
`;
  const selectQuery = `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.cip_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id
<<<<<<< HEAD
=======
  WHERE cs.id = $1;
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
`;

  db.query(query, [id])
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" }); // Respuesta en JSON
    });
});

//Eliminar estudiantes seleccionados
app.delete("/api/cip-student/remove-cip-students-check", (req, res) => {
  const { studentsCipCheck } = req.body;
  const query = `
  DELETE FROM pkt_grant.cip_student
  WHERE id = ANY($1::int[]               );
`;
  //   const selectQuery = `
  //   SELECT * FROM pkt_grant.student;
  // `;
  const selectQuery = `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.cip_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id
`;

  db.query(query, [studentsCipCheck])
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" });
    });
});

//Filter Estudiante CIP
app.post("/api/cip-student/", (req, res) => {
  const {
    name,
    lastname,
    ci_passport,
    authorizing_officials,
    awarded_specialty,
    commission,
    convocation,
    prosecution,
    official_name,
  } = req.body;

  const query = `
  SELECT c.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.cip_student c
  LEFT JOIN pkt_grant.official o ON c.id_official = o.id
  LEFT JOIN pkt_grant.student s ON c.ci_passport = s.ci_passport
  WHERE 
      (s.name ILIKE $1 OR $1 IS NULL) AND
      (s.lastname ILIKE $2 OR $2 IS NULL) AND
      (s.ci_passport ILIKE $3 OR $3 IS NULL) AND
      (c.authorizing_officials::text ILIKE $4 OR $4 IS NULL) AND
      (s.awarded_specialty::text ILIKE $5 OR $5 IS NULL) AND
      (c.commission ILIKE $6 OR $6 IS NULL) AND
      (o.convocation ILIKE $7 OR $7 IS NULL) AND
      (o.prosecution ILIKE $8 OR $8 IS NULL) AND
      (o.name ILIKE $9 OR $9 IS NULL               );
`;
  const params = [
    name ? `%${name}%` : null,
    lastname ? `%${lastname}%` : null,
    ci_passport ? `%${ci_passport}%` : null,
    authorizing_officials ? `%${authorizing_officials}%` : null,
    awarded_specialty ? `%${awarded_specialty}%` : null,

    commission ? `%${commission}%` : null,
    convocation ? `%${convocation}%` : null,
    prosecution ? `%${prosecution}%` : null,
    official_name ? `%${official_name}%` : null,
  ];

  db.query(query, params)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).send("Error en la base de datos");
    });
});

///////////////////////////////////////////////Estudiantes SIES-3 Diul///////////////////////////////////////////

//Obtener todos E.Diul
app.get("/api/diul-student", async (req, res) => {
  try {
    const result = await db.query(
      //     `SELECT id, ci_passport, student_type, description, authorizing_officials,commission
      // FROM pkt_grant.cip_student;`
      `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.diul_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id;
`
    );

<<<<<<< HEAD
    res.send(result.rows.reverse());
=======
    res.send(result.rows);
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la consulta");
  }
});

//Obtener E.Diul by Id
app.get("/api/diul-student/id/:id", (req, res) => {
  const id = req.params.id;
  //   const query = `
  //   SELECT *
  //   FROM pkt_grant.cip_student
  //   WHERE id = $1;
  // `;
  const query = `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name,e.name as exam_name
  FROM pkt_grant.diul_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id
  LEFT JOIN pkt_grant.entrance_exams e ON s.ci_passport = e.student_ci_passport
  WHERE cs.id = $1;
`;
  db.query(query, [id])
    .then((result) => {
      const studentData = result.rows[0]; // Obtener los datos del estudiante
      const exams = result.rows
        .map((row) => row.exam_name)
        .filter((name) => name); // Obtener los nombres de los exámenes en un arreglo

      // Crear un objeto con la información del estudiante y sus exámenes
      const response = {
        ...studentData, // Propiedades del estudiante
        entrance_exams: exams, // Agregar el arreglo de exámenes
      };

      res.send(response); // Enviar el objeto completo
      console.log(response);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).send("Error en la base de datos");
    });
});

//Añadir nuevo E.Diul
app.post("/api/include-diul-student", (req, res) => {
  const {
    ci_passport,
    student_type,
    description,
    authorizing_officials,
    commission,
    id_official,
    student_of,
  } = req.body;
  const query = `
    INSERT INTO pkt_grant.diul_student(
	ci_passport, student_type, description, authorizing_officials,commission,id_official,student_of)
	VALUES ($1, $2, $3, $4, $5,$6,$7               );`;

  const values = [
    ci_passport,
    student_type,
    description,
    authorizing_officials,
    commission,
    id_official,
    student_of,
  ];

  const selectQuery = `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.diul_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id;
`;

  db.query(query, values)
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" }); // Respuesta en JSON
    });
});

//Modificar E.Diul
app.put("/api/modify-diul-student", (req, res) => {
  const {
    id,
    ci_passport,
    student_type,
    description,
    authorizing_officials,
    commission,
    id_official,
    student_of,
  } = req.body;
  console.log(id);
  console.log(req.body);
  const query = `
    UPDATE pkt_grant.diul_student
	SET ci_passport=$2, student_type=$3, description=$4, authorizing_officials=$5 ,commission=$6,
    id_official=$7, student_of=$8
	WHERE id = $1 
  RETURNING id;`;

  const values = [
    id,
    ci_passport,
    student_type,
    description,
    authorizing_officials,
    commission,
    id_official,
    student_of,
  ];

  const selectQuery = `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.diul_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id;
`;

  db.query(query, values)
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" }); // Respuesta en JSON
    });
});

//Eliminar E.Diul by Id
app.delete("/api/diul-student/remove-diul-student/:id", (req, res) => {
  const id = req.params.id;

  const query = `
  DELETE FROM pkt_grant.diul_student
	WHERE id = $1;
`;
  const selectQuery = `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.diul_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id
<<<<<<< HEAD
=======
  WHERE cs.id = $1;
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
`;

  db.query(query, [id])
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" }); // Respuesta en JSON
    });
});
//Eliminar estudiantes seleccionados
app.delete("/api/diul-student/remove-diul-students-check", (req, res) => {
  const { studentsCipCheck } = req.body;
  const query = `
  DELETE FROM pkt_grant.diul_student
  WHERE id = ANY($1::int[]               );
`;
  //   const selectQuery = `
  //   SELECT * FROM pkt_grant.student;
  // `;
  const selectQuery = `
  SELECT cs.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.diul_student cs
  LEFT JOIN pkt_grant.student s ON cs.ci_passport = s.ci_passport
  LEFT JOIN pkt_grant.official o ON cs.id_official = o.id
`;

  db.query(query, [studentsCipCheck])
    .then((result) => {
      return db.query(selectQuery); // Realiza la consulta para obtener los nuevos officials
    })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).json({ message: "Error en la base de datos" });
    });
});

//Filter Estudiante CIP
app.post("/api/diul-student/", (req, res) => {
  const {
    name,
    lastname,
    ci_passport,
    authorizing_officials,
    awarded_specialty,
    commission,
    convocation,
    prosecution,
    official_name,
  } = req.body;

  const query = `
  SELECT c.*, s.*, o.convocation,o.prosecution,o.name AS official_name
  FROM pkt_grant.diul_student c
  LEFT JOIN pkt_grant.official o ON c.id_official = o.id
  LEFT JOIN pkt_grant.student s ON c.ci_passport = s.ci_passport
  WHERE 
      (s.name ILIKE $1 OR $1 IS NULL) AND
      (s.lastname ILIKE $2 OR $2 IS NULL) AND
      (s.ci_passport ILIKE $3 OR $3 IS NULL) AND
      (c.authorizing_officials::text ILIKE $4 OR $4 IS NULL) AND
      (s.awarded_specialty::text ILIKE $5 OR $5 IS NULL) AND
      (c.commission ILIKE $6 OR $6 IS NULL) AND
      (o.convocation ILIKE $7 OR $7 IS NULL) AND
      (o.prosecution ILIKE $8 OR $8 IS NULL) AND
      (o.name ILIKE $9 OR $9 IS NULL               );
`;
  const params = [
    name ? `%${name}%` : null,
    lastname ? `%${lastname}%` : null,
    ci_passport ? `%${ci_passport}%` : null,
    authorizing_officials ? `%${authorizing_officials}%` : null,
    awarded_specialty ? `%${awarded_specialty}%` : null,

    commission ? `%${commission}%` : null,
    convocation ? `%${convocation}%` : null,
    prosecution ? `%${prosecution}%` : null,
    official_name ? `%${official_name}%` : null,
  ];

  db.query(query, params)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error al ejecutar la consulta", err);
      res.status(500).send("Error en la base de datos");
    });
});
///////////////////////////////////////////////
//////////////////////////////////////////////

const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
