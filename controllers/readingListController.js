const { UserReading, Blog, User, Reading } = require("../models");

exports.addBlogToReadingList = async (req, res) => {
  console.log(req.body);

  const blog = await Blog.findByPk(req.body.blog_id);
  const user = await User.findByPk(req.body.user_id);

  if (!blog) {
    return res.status(400).json({
      status: "fail",
      message: "No blog with that ID",
    });
  }
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "No user with that ID",
    });
  }

  const reading = await Reading.create({
    BlogId: blog.dataValues.id,
  });

  const userReading = await UserReading.create({
    UserId: user.dataValues.id,
    ReadingId: reading.dataValues.id,
  });

  res.status(201).json(userReading);
};

exports.changeReadedToTrue = async (req, res) => {
  const currentUserInfo = await User.findByPk(req.user.dataValues.id, {
    include: {
      model: Reading,
    },
  });

  const isMyReading = currentUserInfo
    .toJSON()
    .Readings.map((reading) => reading.id)
    .includes(Number(req.params.id));

  if (!isMyReading) {
    return res.status(401).json({
      status: "fail",
      message: "You can only modify status of your own readings",
    });
  }

  const reading = await Reading.findByPk(req.params.id);

  if (!reading) {
    return res.status(400).json({
      status: "fail",
      message: "No reading with that ID",
    });
  }
  if (!req.body.hasOwnProperty("read")) {
    return res.status(400).json({
      status: "fail",
      message: "No new readed status on request body",
    });
  }

  reading.readed = req.body.read;

  const updatedReding = await reading.save();

  res.status(200).json(updatedReding);
};

exports.deleteById = async (req, res) => {
  await Reading.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).end();
};

exports.getAllReadings = async (req, res) => {
  const readings = await Reading.findAll();

  res.json(readings);
};

exports.getAllUserReadings = async (req, res) => {
  const user_readings = await UserReading.findAll();

  res.json(user_readings);
};
