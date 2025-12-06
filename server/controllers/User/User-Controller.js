const User = require("../../models/User");
const Joi = require("joi");

const GetUserDetails = async (req, res) => {
  try {
    const GetUserDetailsSchema = Joi.object({
      userId: Joi.string().required(),
    });
    const { error, value } = GetUserDetailsSchema.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { userId } = value;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user: user,
      message: "User Details Fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while Getting User Details",
      error: error.message,
    });
  }
};
const GetUserNotifications = async (req, res) => {
  try {
    const GetUserNotificationsSchema = Joi.object({
      userId: Joi.string().required(),
    });
    const { error, value } = GetUserNotificationsSchema.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { userId } = value;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      notifications: {
        is2FAEnabled: user.is2FAEnabled || false,
        emailNotifications2FA: user.emailNotifications2FA || false,
        smsNotifications2FA: user.smsNotifications2FA || false,
      },
      message: "User Notifications Fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while Getting User Notifications",
      error: error.message,
    });
  }
};

const UpdateUserDetails = async (req, res) => {
  try {
    const UpdateUserDetailsSchema = Joi.object({
      userId: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
    });
    const { error, value } = UpdateUserDetailsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { userId, firstName, lastName, phone, email } = value;
    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, phone, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user: user,
      message: "User Details Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while Updating User Details",
      error: error.message,
    });
  }
};

module.exports = {
  GetUserDetails,
  GetUserNotifications,
  UpdateUserDetails,
};
