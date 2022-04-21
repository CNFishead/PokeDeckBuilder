const expressAsyncHandler = require("../../middleware/async");
const Dynamic = require("../../models/dynamicModel");

/**
 * @description: Returns dynamic content
 * @access:      Public
 * @route:       GET /api/dynamic/:type
 */
module.exports = expressAsyncHandler(async (req, res) => {
  try {
    const content = await Dynamic.findOne({ type: req.params.type });
    // Check to see if the content exist in the system
    if (!content) {
      return res.status(404).json({
        message: `Cannot find content: ${req.params.type} on Server`,
      });
    }
    res.status(200).json(content);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Cannot find content on Server" });
    }
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
