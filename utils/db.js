const Sequelize = require("sequelize");
const { DATABASE_URL } = require("../utils/config");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const runMigrations = async () => {
  const migrator = new Umzug({
    // storage: "sequelize",
    // storageOptions: {
    //   sequelize,
    //   tableName: "migrations",
    // },
    storage: new SequelizeStorage({
      sequelize,
    }),

    migrations: {
      //params: [sequelize.getQueryInterface()],
      //path: `${process.cwd()}/migrations`,
      //pattern: /\.js$/,
      glob: "migrations/*.js",
    },
    context: sequelize.getQueryInterface(),
  });
  // const down = await migrator.down();
  // console.log(down);
  const migrations = await migrator.up();
  console.log("EXECUTED MIGRATIONS");
  console.log(migrations);
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.file),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("database connected");
  } catch (err) {
    console.log("connecting database failed");
    console.log(err);
    return process.exit(1);
  }

  return null;
};

module.exports = {
  sequelize,
  connectToDatabase,
};
