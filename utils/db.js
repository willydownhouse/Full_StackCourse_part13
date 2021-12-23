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
    logger: console,
  });
  //const down = await migrator.down();
  //console.log(down);
  const a = await migrator.up();

  console.log("a");
  console.log(a);

  const migrations = await migrator.executed();

  console.log("MIGRATIONS executed:");
  console.log(migrations);
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
